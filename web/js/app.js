/* ==========================================================================
   app.js —— 应用外壳：macOS 窗口、侧边栏导航、路由
   ========================================================================== */

import { el, storage } from "./util.js";
import { bank, session, theme, mistakeList } from "./store.js";
import { iconHTML, toast, confirmSheet } from "./ui.js";
import { setupView, quizView } from "./views/practice.js";
import { reportView, mistakesView } from "./views/report.js";
import { statsView, libraryView, papersView } from "./views/others.js";
import { chaptersView } from "./views/chapters.js";
import { CHAPTERS } from "./chapters.js";

/* ==========================================================================
   应用状态
   ========================================================================== */

const app = {
  route: "chapters",
  stage: "setup", // practice 专用：setup | quiz | report
  report: null,
  libFilter: 0,
  sidebarCollapsed: storage.get("ghb.sidebar", false),
  setup: {
    kps: [],
    mode: "immediate",
    groupSize: 5,
    limit: 0,
    timed: false,
    order: "random",
  },
  _footer: [],

  setFooter(nodes) {
    this._footer = (nodes || []).filter(Boolean);
  },

  go(route) {
    // 重复点击「题库刷题」时，回到配置页（练习中会先确认）
    if (route === this.route) {
      if (route === "practice" && this.stage !== "setup") {
        if (this.stage === "quiz" && session.active && session.active.attempts.length) {
          this._pendingRoute = "practice";
          this._pendingReset = true;
          this._askLeave();
        } else {
          session.discard();
          this.stage = "setup";
          this.render();
        }
      }
      return;
    }

    // 离开刷题页时，若正有未结算的会话，先提醒
    if (
      this.route === "practice" &&
      this.stage === "quiz" &&
      session.active &&
      !session.active.finished &&
      session.active.attempts.length
    ) {
      this._pendingRoute = route;
      this._askLeave();
      return;
    }

    this.route = route;
    if (route === "practice" && (!session.active || session.active.finished)) {
      session.discard();
      this.stage = "setup";
    }
    this.render();
  },

  async _askLeave() {
    const st = session.stats();
    const ok = await confirmSheet({
      title: "练习还没结算",
      text: `已答 ${st.total} 题且尚未生成报告，离开会丢弃本次练习记录。`,
      okText: "丢弃并离开",
      cancelText: "留下继续",
      danger: true,
    });
    if (!ok) {
      this._pendingRoute = null;
      this._pendingReset = false;
      return;
    }
    session.discard();
    this.stage = "setup";
    const target = this._pendingRoute;
    const wasReset = this._pendingReset;
    this._pendingRoute = null;
    this._pendingReset = false;
    if (target && !wasReset && target !== this.route) this.route = target;
    this.render();
  },

  viewFor(route) {
    switch (route) {
      case "chapters":
        return chaptersView(this);
      case "practice":
        if (this.stage === "quiz") return quizView(this);
        if (this.stage === "report") return reportView(this);
        return setupView(this);
      case "mistakes":
        return mistakesView(this);
      case "stats":
        return statsView(this);
      case "library":
        return libraryView(this);
      case "papers":
        return papersView(this);
      default:
        return setupView(this);
    }
  },

  render() {
    // 最后一题作答后自动结算，点击和键盘作答共用同一个出口。
    if (this.route === "practice" && this.stage === "quiz" && session.isComplete()) {
      this.report = session.finish();
      this.stage = "report";
    }
    const content = document.getElementById("content");
    this._footer = [];
    content.replaceChildren();

    const view = this.viewFor(this.route);
    while (view.firstChild) content.appendChild(view.firstChild);

    if (this._footer.length) {
      const f = el("div.content__footer");
      for (const n of this._footer) f.appendChild(n);
      content.appendChild(f);
    }

    renderSidebar(this);
    renderTitlebar(this);
    startTimerIfNeeded(this);
  },
};

/* ==========================================================================
   侧边栏
   ========================================================================== */

const NAV = [
  { group: "学习" },
  { id: "chapters", label: "题库刷题", icon: "practice" },
  { group: "章节与小测" },
  ...CHAPTERS.map(chapter => ({
    id: chapter.available ? "practice" : chapter.id,
    label: chapter.title,
    icon: chapter.available ? "practice" : "doc",
    disabled: !chapter.available,
    badge: chapter.available ? null : () => "待开发",
  })),
  { group: "复习" },
  { id: "mistakes", label: "错题本", icon: "mistakes", badge: () => mistakeList().filter((m) => !m.resolved).length },
  { id: "stats", label: "掌握度", icon: "stats" },
  { group: "素材" },
  { id: "library", label: "素材库", icon: "library", badge: () => bank.questions.length },
  { id: "papers", label: "真题演练", icon: "papers", badge: () => "待导入" },
];

function renderSidebar(app) {
  const nav = document.getElementById("sidebar");
  nav.replaceChildren();

  for (const item of NAV) {
    if (item.group) {
      nav.appendChild(el("div.sidebar__group-label", { text: item.group }));
      continue;
    }
    const btn = el("button.nav-item", {
      "aria-current": app.route === item.id ? "page" : null,
      onclick: () => app.go(item.id),
      title: item.label,
      disabled: !!item.disabled,
    });
    btn.append(
      el("span.nav-item__icon", { html: iconHTML(item.icon, 16) }),
      el("span.nav-item__text", { text: item.label })
    );

    if (item.badge) {
      const v = item.badge();
      if (v !== 0 && v !== null && v !== undefined && v !== "") {
        btn.appendChild(el("span.nav-item__badge", { text: String(v) }));
      }
    }
    nav.appendChild(btn);
  }

  // 底部信息
  const foot = el("div.sidebar__foot");
  foot.append(
    el("div", { text: `题库 ${bank.questions.length} 题` }),
    el("div", { text: `${bank.knowledgePoints().length} 个知识点` }),
    el("div", {
      text: "极限章节 · 本地版",
      style: { marginTop: "4px", opacity: "0.7" },
    })
  );
  nav.appendChild(foot);
}

/* ==========================================================================
   标题栏
   ========================================================================== */

const TITLES = {
  practice: "极限 · 题库刷题",
  chapters: "章节与小测",
  mistakes: "错题本",
  stats: "掌握度",
  library: "素材库",
  papers: "真题演练",
};

function renderTitlebar(app) {
  const t = document.getElementById("titlebar-title");
  if (t) t.textContent = TITLES[app.route] || "高等数学题库";
}

/* ==========================================================================
   计时器
   ========================================================================== */

let timerHandle = null;

function startTimerIfNeeded(app) {
  clearInterval(timerHandle);
  timerHandle = null;
  const s = session.active;
  if (app.route !== "practice" || app.stage !== "quiz" || !s || !s.config.timed || s.finished) return;

  timerHandle = setInterval(() => {
    const node = document.getElementById("elapsed");
    if (!node) {
      clearInterval(timerHandle);
      timerHandle = null;
      return;
    }
    const ms = Date.now() - s.startedAt;
    const total = Math.max(0, Math.round(ms / 1000));
    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const sec = total % 60;
    const pad = (n) => String(n).padStart(2, "0");
    node.textContent = h > 0 ? `${h}:${pad(m)}:${pad(sec)}` : `${m}:${pad(sec)}`;
  }, 1000);
}

/* ==========================================================================
   键盘快捷键
   ========================================================================== */

function installKeyboard(app) {
  document.addEventListener("keydown", (e) => {
    // 模态打开时，快捷键不能继续操作被遮住的刷题页。
    if (document.querySelector(".sheet-mask")) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const tag = (e.target.tagName || "").toLowerCase();
    if (tag === "input" || tag === "textarea") return;

    // 刷题页
    if (app.route === "practice" && app.stage === "quiz" && !session.inGroupReview()) {
      const s = session.active;
      if (!s) return;
      const q = session.current();
      if (!q) return;

      const answered = session.answeredCurrent();
      const key = e.key.toUpperCase();
      const letter = "ABCD".includes(key) ? key : "1234".includes(key) ? "ABCD"["1234".indexOf(key)] : null;

      if (letter && q.options.some((o) => o.key === letter) && !answered) {
        e.preventDefault();
        session.submit(letter);
        app.render();
        return;
      }
      if ((e.key === "Enter" || e.key === " ") && answered) {
        e.preventDefault();
        const btn = document.querySelector(".content__footer .btn--primary");
        if (btn) btn.click();
      }
    }
  });
}

/* ==========================================================================
   启动
   ========================================================================== */

async function boot() {
  theme.apply();

  let data;
  try {
    // 注意：动态 import 的相对路径是相对「本模块」而非页面解析的。
    // 本文件位于 /js/ 下，data/questions.js 位于 /data/ 下，故必须是 "../data/"。
    const mod = await import("../data/questions.js");
    data = mod.BANK || mod.default;
  } catch (err) {
    document.getElementById("content").appendChild(
      el("div.empty", {}, [
        el("div.empty__title", { text: "题库数据加载失败" }),
        el("div.empty__desc", {
          text:
            "请确认已运行 python build.py 生成 data/questions.js，" +
            "并通过 python serve.py 以 http:// 方式打开（file:// 下无法加载模块）。",
        }),
        el("div.empty__desc.mono", {
          text: String((err && err.message) || err),
          style: { marginTop: "10px", fontSize: "11.5px", opacity: "0.75", wordBreak: "break-all" },
        }),
      ])
    );
    console.error(err);
    return;
  }

  bank.load(data);
  document.title = `高等数学题库 · ${bank.meta.chapter || ""}`;

  /* 红绿灯 */
  document.querySelector(".tl--close").addEventListener("click", () => {
    toast("这是本地网页应用，直接关闭浏览器标签页即可");
  });
  document.querySelector(".tl--min").addEventListener("click", () => {
    app.sidebarCollapsed = !app.sidebarCollapsed;
    storage.set("ghb.sidebar", app.sidebarCollapsed);
    document.querySelector(".sidebar").style.display = app.sidebarCollapsed ? "none" : "";
  });
  document.querySelector(".tl--zoom").addEventListener("click", () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen?.().catch(() => {});
  });

  /* 主题切换 */
  document.getElementById("theme-btn").addEventListener("click", () => {
    const t = theme.toggle();
    toast(t === "system" ? "跟随系统外观" : t === "light" ? "浅色外观" : "深色外观");
  });

  installKeyboard(app);
  app.render();
}

boot();
