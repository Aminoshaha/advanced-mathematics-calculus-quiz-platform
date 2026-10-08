/* ==========================================================================
   tools/render-check.mjs —— 端到端渲染冒烟测试
   --------------------------------------------------------------------------
   本机无浏览器、无网络（装不了 jsdom / playwright），因此这里实现一个最小
   DOM 桩，把真实的视图模块跑一遍真实题库数据，验证：
     · 每个页面都能渲染且不抛异常
     · 「逐题即时」模式完整走一遍：作答 → 出解析 → 下一题 → 结算报告
     · 「整组延迟」模式的整组复盘分支能进入
     · 错题本 / 掌握度 / 素材库 / 真题演练 页面可渲染
     · 不限题量时的队列自动补齐不会死循环
   点击事件走真实的 addEventListener 回调，而不是直接调内部函数。

   用法：node tools/render-check.mjs
   ========================================================================== */

/* ---------------------------------------------------------------- DOM 桩 */

class ClassList {
  constructor(node) {
    this.node = node;
  }
  _set() {
    return new Set(this.node.className.split(/\s+/).filter(Boolean));
  }
  _write(s) {
    this.node.className = [...s].join(" ");
  }
  add(...cs) {
    const s = this._set();
    cs.forEach((c) => s.add(c));
    this._write(s);
  }
  remove(...cs) {
    const s = this._set();
    cs.forEach((c) => s.delete(c));
    this._write(s);
  }
  contains(c) {
    return this._set().has(c);
  }
  toggle(c, force) {
    const has = this.contains(c);
    const on = force === undefined ? !has : !!force;
    if (on) this.add(c);
    else this.remove(c);
    return on;
  }
}

let NODE_ID = 0;

class StubNode {
  constructor(tag) {
    this.tagName = String(tag || "div").toUpperCase();
    this.nodeType = 1;
    this.childNodes = [];
    this.parentNode = null;
    this.className = "";
    this.style = {};
    this.dataset = {};
    this.attrs = {};
    this._text = "";
    this._html = "";
    this._listeners = {};
    this._id = ++NODE_ID;
    this.classList = new ClassList(this);
  }

  /* --- 树操作 --- */
  appendChild(n) {
    if (!n) throw new Error("appendChild(null)");
    if (n.parentNode) n.parentNode.removeChild(n);
    this.childNodes.push(n);
    n.parentNode = this;
    return n;
  }
  append(...ns) {
    ns.forEach((n) => this.appendChild(n && typeof n === "object" ? n : documentStub.createTextNode(n)));
  }
  insertBefore(n, ref) {
    const i = this.childNodes.indexOf(ref);
    if (i === -1) return this.appendChild(n);
    n.parentNode = this;
    this.childNodes.splice(i, 0, n);
    return n;
  }
  removeChild(n) {
    const i = this.childNodes.indexOf(n);
    if (i !== -1) this.childNodes.splice(i, 1);
    n.parentNode = null;
    return n;
  }
  remove() {
    if (this.parentNode) this.parentNode.removeChild(this);
  }
  replaceChildren(...ns) {
    this.childNodes.forEach((c) => (c.parentNode = null));
    this.childNodes = [];
    ns.forEach((n) => this.appendChild(n && typeof n === "object" ? n : documentStub.createTextNode(n)));
  }

  get firstChild() {
    return this.childNodes[0] || null;
  }
  get lastChild() {
    return this.childNodes[this.childNodes.length - 1] || null;
  }
  get firstElementChild() {
    return this.childNodes.find((c) => c.nodeType === 1) || null;
  }
  get lastElementChild() {
    const els = this.childNodes.filter((c) => c.nodeType === 1);
    return els[els.length - 1] || null;
  }
  get children() {
    return this.childNodes.filter((c) => c.nodeType === 1);
  }

  /* --- 属性 --- */
  setAttribute(k, v) {
    this.attrs[k] = v;
    if (k === "class") this.className = String(v);
    if (k === "id") this.id = String(v);
  }
  getAttribute(k) {
    if (k === "class") return this.className;
    return k in this.attrs ? this.attrs[k] : null;
  }
  hasAttribute(k) {
    return k === "class" ? !!this.className : k in this.attrs;
  }
  /* disabled 属性对 test 可见，便于确认按钮状态 */
  get disabled() {
    return "disabled" in this.attrs;
  }

  /* --- 内容 --- */
  set textContent(v) {
    this._text = String(v);
    this._html = "";
    this.childNodes = [];
  }
  get textContent() {
    return (
      this._text +
      this.childNodes.map((c) => (c.nodeType === 3 ? c.textContent : c.textContent)).join("")
    );
  }
  set innerHTML(v) {
    this._html = String(v);
    this._text = "";
    this.childNodes = [];
    // 极简解析：代码里用 innerHTML 只产出一个最外层元素（图标 svg、环形图 svg），
    // 之后用 firstElementChild / querySelector 取回它，因此需要把 class 也解析出来。
    const m = /^<([a-zA-Z][\w-]*)((?:\s+[^>]*?)?)\s*\/?>/.exec(this._html);
    if (m) {
      const node = new StubNode(m[1]);
      const attrs = m[2] || "";
      const cls = /\bclass\s*=\s*"([^"]*)"/.exec(attrs);
      if (cls) node.className = cls[1];
      const idm = /\bid\s*=\s*"([^"]*)"/.exec(attrs);
      if (idm) node.id = idm[1];
      node._html = this._html;
      node.parentNode = this;
      this.childNodes.push(node);
    }
  }
  get innerHTML() {
    return this._html;
  }

  /* --- 选择器 --- */
  _matchesSimple(sel) {
    sel = sel.trim();
    if (sel.includes(",")) return sel.split(",").some((s) => this._matchesSimple(s));
    if (!sel) return false;
    // 支持 tag、.class、tag.class1.class2
    const tagMatch = /^[a-zA-Z][\w-]*/.exec(sel);
    const wantTag = tagMatch ? tagMatch[0].toUpperCase() : null;
    const wantCls = (sel.match(/\.[\w-]+/g) || []).map((x) => x.slice(1));
    if (wantTag && this.tagName !== wantTag) return false;
    const have = new Set(this.className.split(/\s+/).filter(Boolean));
    return wantCls.every((c) => have.has(c));
  }
  _matches(sel) {
    if (sel.includes(",")) return sel.split(",").some((s) => this._matches(s));
    const parts = sel.trim().split(/\s+/);
    if (!this._matchesSimple(parts[parts.length - 1])) return false;
    let cur = this.parentNode;
    for (let i = parts.length - 2; i >= 0; i--) {
      let found = false;
      while (cur) {
        if (cur.nodeType === 1 && cur._matchesSimple(parts[i])) {
          found = true;
          cur = cur.parentNode;
          break;
        }
        cur = cur.parentNode;
      }
      if (!found) return false;
    }
    return true;
  }
  _walk(fn) {
    for (const c of this.childNodes) {
      if (c.nodeType !== 1) continue;
      if (fn(c)) return c;
      const r = c._walk(fn);
      if (r) return r;
    }
    return null;
  }
  querySelector(sel) {
    return this._walk((n) => n._matches(sel));
  }
  querySelectorAll(sel) {
    const out = [];
    const rec = (n) => {
      for (const c of n.childNodes) {
        if (c.nodeType !== 1) continue;
        if (c._matches(sel)) out.push(c);
        rec(c);
      }
    };
    rec(this);
    return out;
  }

  /* --- 事件 --- */
  addEventListener(type, fn) {
    (this._listeners[type] = this._listeners[type] || []).push(fn);
  }
  removeEventListener(type, fn) {
    const l = this._listeners[type] || [];
    const i = l.indexOf(fn);
    if (i !== -1) l.splice(i, 1);
  }
  click() {
    if (this.disabled) return;
    for (const fn of this._listeners.click || []) fn({ target: this, currentTarget: this, preventDefault() {} });
    return true;
  }
  focus() {}
}

const ID_REGISTRY = new Map();

const documentStub = {
  createElement: (t) => new StubNode(t),
  createTextNode: (t) => ({ nodeType: 3, textContent: String(t), parentNode: null }),
  getElementById: (id) => ID_REGISTRY.get(id) || null,
  querySelector: (sel) => documentStub.body.querySelector(sel),
  querySelectorAll: (sel) => documentStub.body.querySelectorAll(sel),
  addEventListener() {},
  removeEventListener() {},
  documentElement: (() => {
    const n = new StubNode("html");
    n.removeAttribute = function (k) {
      delete this.attrs[k];
    };
    return n;
  })(),
  fullscreenElement: null,
};

const body = new StubNode("body");
documentStub.body = body;

for (const id of ["content", "sidebar", "titlebar-title", "toast-host"]) {
  const n = new StubNode("div");
  n.id = id;
  ID_REGISTRY.set(id, n);
  body.appendChild(n);
}

const memoryStore = new Map();
globalThis.document = documentStub;
globalThis.window = globalThis;
globalThis.localStorage = {
  getItem: (k) => (memoryStore.has(k) ? memoryStore.get(k) : null),
  setItem: (k, v) => memoryStore.set(k, String(v)),
  removeItem: (k) => memoryStore.delete(k),
};

// 动画用：Node 没有 requestAnimationFrame，用 setTimeout 兜底。
// 这样 animateTo / countUp 的真实代码路径会被执行到，动画也确实会「跑完」。
globalThis.requestAnimationFrame = (fn) => setTimeout(() => fn(Date.now()), 16);
globalThis.cancelAnimationFrame = (h) => clearTimeout(h);
// 故意不提供 matchMedia：走「未要求减少动态效果」的正常分支

/* ---------------------------------------------------------------- 加载模块 */

const { el } = await import("../js/util.js");
const { bank, session, persist, mistakeList, masteryByKnowledgePoint } = await import("../js/store.js");
const practice = await import("../js/views/practice.js");
const report = await import("../js/views/report.js");
const others = await import("../js/views/others.js");
const { BANK } = await import("../data/questions.js");

bank.load(BANK);

/* ---------------------------------------------------------------- 测试框架 */

let pass = 0;
const failures = [];

function t(name, fn) {
  try {
    fn();
    pass++;
  } catch (err) {
    failures.push(`${name}\n      ${err && err.stack ? err.stack.split("\n").slice(0, 4).join("\n      ") : err}`);
  }
}

function assert(cond, msg) {
  if (!cond) throw new Error("断言失败：" + msg);
}

/* ---------------------------------------------------------------- 迷你 app */

function makeApp() {
  const app = {
    route: "practice",
    stage: "setup",
    report: null,
    libFilter: 0,
    setup: { kps: [], mode: "immediate", groupSize: 5, limit: 0, timed: false, order: "random" },
    _footer: [],
    setFooter(nodes) {
      this._footer = (nodes || []).filter(Boolean);
    },
    viewFor(route) {
      if (route === "practice") {
        if (this.stage === "quiz") return practice.quizView(this);
        if (this.stage === "report") return report.reportView(this);
        return practice.setupView(this);
      }
      if (route === "mistakes") return report.mistakesView(this);
      if (route === "stats") return others.statsView(this);
      if (route === "library") return others.libraryView(this);
      if (route === "papers") return others.papersView(this);
      return practice.setupView(this);
    },
    render() {
      this._footer = [];
      const content = ID_REGISTRY.get("content");
      content.replaceChildren();
      const view = this.viewFor(this.route);
      while (view.firstChild) content.appendChild(view.firstChild);
      if (this._footer.length) {
        const f = new StubNode("div");
        f.className = "content__footer";
        for (const n of this._footer) f.appendChild(n);
        content.appendChild(f);
      }
      return content;
    },
    go(route) {
      this.route = route;
      this.render();
    },
  };
  return app;
}

function optButtons() {
  return ID_REGISTRY.get("content").querySelectorAll(".opt");
}
function primaryBtn() {
  return ID_REGISTRY.get("content").querySelector(".content__footer .btn--primary");
}
function clickOption(key) {
  const b = optButtons().find((x) => x.dataset.key === key);
  if (!b) throw new Error("找不到选项按钮 " + key);
  b.click();
  return b;
}

/* ---------------------------------------------------------------- 测试项 */

console.log("=".repeat(70));
console.log("端到端渲染冒烟测试");
console.log("=".repeat(70));
console.log(`题库：${bank.questions.length} 题 / 解析 ${Object.keys(bank.analysis).length} 份\n`);

/* --- 1. 各页面能渲染 --- */
t("练习配置页渲染", () => {
  const app = makeApp();
  const node = app.render();
  assert(node.querySelector(".chip-wrap"), "应渲染知识点 chips");
  assert(node.querySelectorAll(".chip").length >= 2, "至少应有「全部」+ 若干知识点");
});

t("练习配置页：选中知识点后渲染", () => {
  const app = makeApp();
  app.setup.kps = ["等价替换", "间断点"];
  const node = app.render();
  assert(node.querySelector(".chip-wrap"), "chips 仍在");
});

t("练习配置页：整组延迟模式（显示每组题数）", () => {
  const app = makeApp();
  app.setup.mode = "batch";
  app.render();
  assert(true, "不应抛异常");
});

t("素材库渲染", () => {
  const app = makeApp();
  app.route = "library";
  const node = app.render();
  const shots = node.querySelectorAll(".shot");
  assert(shots.length === bank.questions.length, `截图卡片数应为 ${bank.questions.length}，实际 ${shots.length}`);
});

t("素材库：按测试卷筛选", () => {
  const app = makeApp();
  app.route = "library";
  app.libFilter = 1;
  const node = app.render();
  assert(node.querySelectorAll(".shot").length === 10, "Test1 应有 10 张");
});

t("真题演练页渲染", () => {
  const app = makeApp();
  app.route = "papers";
  assert(app.render().querySelector(".panel"), "应有面板");
});

t("掌握度页（无数据时的空状态）", () => {
  const app = makeApp();
  app.route = "stats";
  assert(app.render().querySelector(".empty"), "应显示空状态");
});

t("错题本（空）渲染", () => {
  const app = makeApp();
  app.route = "mistakes";
  assert(app.render().querySelector(".empty"), "应显示空状态");
});

/* --- 2. 逐题即时模式：完整走一遍 --- */

t("逐题即时模式：作答 → 出解析 → 下一题 → 结算", () => {
  const app = makeApp();
  app.setup = { kps: [], mode: "immediate", groupSize: 5, limit: 8, timed: false, order: "origin" };
  session.create(app.setup);
  app.stage = "quiz";
  app.render();

  let guard = 0;
  const picked = [];
  while (guard++ < 40) {
    if (app.stage !== "quiz") break;
    const q = session.current();
    if (!q) break;

    // 前两题故意答错，其余答对，以便后面验证错题本
    const answer = guard <= 2
      ? q.options.find((o) => o.key !== q.correctAnswer).key
      : q.correctAnswer;
    picked.push(answer);

    clickOption(answer);
    app.render();

    // 答完后应出现解析面板
    assert(
      ID_REGISTRY.get("content").querySelector(".analysis"),
      `第 ${guard} 题答完后应出现解析面板`
    );
    assert(persist.mistakes[q.id] || answer === q.correctAnswer, "错题应被记录");

    const nextBtn = primaryBtn();
    assert(nextBtn, "应有下一题按钮");
    nextBtn.click();
    app.render();
  }

  // 手动结束
  const rep = session.finish();
  app.report = rep;
  app.stage = "report";
  app.render();

  assert(rep.stats.total === 8, `应作答 8 题，实际 ${rep.stats.total}`);
  assert(rep.stats.wrong === 2, `应有 2 道错题，实际 ${rep.stats.wrong}`);
  assert(rep.kpBreakdown.length > 0, "应有知识点维度统计");

  const content = ID_REGISTRY.get("content");
  assert(content.querySelector(".ring__svg"), "报告应含环形正确率图");
  assert(content.querySelectorAll(".mistake").length === 2, "报告应列出 2 道错题");
  assert(content.querySelectorAll(".kp-row").length > 0, "报告应含知识点表现条");
});

/* --- 3. 整组延迟模式 --- */

t("整组延迟模式：进入整组复盘 → 继续下一组", () => {
  const app = makeApp();
  app.setup = { kps: [], mode: "batch", groupSize: 3, limit: 6, timed: false, order: "origin" };
  session.create(app.setup);
  app.stage = "quiz";
  app.render();

  let revealed = false;
  let guard = 0;
  while (guard++ < 30) {
    if (session.inGroupReview()) {
      revealed = true;
      break;
    }
    const q = session.current();
    if (!q) break;
    clickOption(q.correctAnswer);

    // 整组延迟模式下，答完不应立刻出现解析
    assert(
      !ID_REGISTRY.get("content").querySelector(".analysis"),
      "整组延迟模式答完单题不应立即显示解析"
    );

    const btn = primaryBtn();
    assert(btn, "应有前进按钮");
    btn.click();
    app.render();
  }

  assert(revealed, "第 1 组答完后应进入整组复盘页");
  const content = ID_REGISTRY.get("content");
  assert(content.querySelectorAll(".analysis").length === 3, "复盘页应含 3 份逐题解析");

  // 继续下一组
  const cont = primaryBtn();
  assert(cont, "应有继续按钮");
  cont.click();
  app.render();
  assert(!session.inGroupReview(), "应已离开复盘态");
});

/* --- 4. 不限题量只刷当前范围一遍 --- */

t("不限题量（limit=0）只刷题池一遍且无重复", () => {
  const app = makeApp();
  app.setup = { kps: ["等价替换"], mode: "immediate", groupSize: 5, limit: 0, timed: false, order: "random" };
  session.create(app.setup);
  app.stage = "quiz";
  app.render();

  const poolSize = bank.questions.filter((q) => q.knowledgePoints.includes("等价替换")).length;
  assert(poolSize > 0, "「等价替换」应有题目");

  const target = poolSize;
  const seen = new Set();
  for (let i = 0; i < target; i++) {
    const q = session.current();
    assert(q && !seen.has(q.id), `第 ${i + 1} 题存在且不重复`);
    seen.add(q.id);
    clickOption(q.correctAnswer);
    app.render();
    primaryBtn().click();
    app.render();
  }
  assert(session.active.attempts.length === target, "作答数应达到目标");
  assert(session.current() === null && session.isComplete(), "刷完题池后耗尽且标记完成");
  session.discard();
});

/* --- 5. 只刷错题（_onlyIds） --- */

t("错题重刷：只在指定错题集合内出题", () => {
  const app = makeApp();
  const ids = mistakeList().map((m) => m.qid);
  assert(ids.length >= 2, "前面应已积累错题");

  app.setup = { kps: [], mode: "immediate", groupSize: 5, limit: 0, timed: false, order: "random", _onlyIds: ids };
  session.create(app.setup);
  app.stage = "quiz";
  app.render();

  for (let i = 0; i < ids.length; i++) {
    const q = session.current();
    assert(q, "应有题");
    assert(ids.includes(q.id), `出题必须来自错题集合，实际出了 ${q.id}`);
    // 故意继续答错，保持错题处于「未订正」，供后续用例验证订正逻辑
    clickOption(q.options.find((o) => o.key !== q.correctAnswer).key);
    app.render();
    primaryBtn().click();
    app.render();
  }
  assert(session.active.attempts.every((a) => !a.correct), "本组应全部答错");
  session.discard();
});

/* --- 6. 错题订正后应标记为已订正 --- */

t("答对错题后标记「已订正」", () => {
  const before = mistakeList({ onlyUnresolved: true }).length;
  const app = makeApp();
  const one = mistakeList({ onlyUnresolved: true })[0];
  assert(one, "应存在未订正错题");
  app.setup = { kps: [], mode: "immediate", groupSize: 5, limit: 1, timed: false, order: "origin", _onlyIds: [one.qid] };
  session.create(app.setup);
  app.stage = "quiz";
  app.render();
  const q = session.current();
  clickOption(q.correctAnswer);
  app.render();
  const after = mistakeList({ onlyUnresolved: true }).length;
  assert(after === before - 1, `未订正数应从 ${before} 降到 ${before - 1}，实际 ${after}`);
  session.discard();
});

/* --- 7. 有数据时的错题本与掌握度 --- */

t("错题本（有数据）渲染", () => {
  const app = makeApp();
  app.route = "mistakes";
  const node = app.render();
  assert(node.querySelectorAll(".mistake").length > 0, "应列出错题");
  assert(node.querySelectorAll(".panel").length >= 1, "应有分组面板");
  assert(node.querySelectorAll(".stat").length === 3, "应有 3 个统计格");
});

t("掌握度（有数据）渲染", () => {
  const app = makeApp();
  app.route = "stats";
  const node = app.render();
  const rows = node.querySelectorAll(".kp-row");
  assert(rows.length === bank.knowledgePoints().length, `应有 ${bank.knowledgePoints().length} 行知识点`);
  const m = masteryByKnowledgePoint();
  assert(m.some((x) => x.attempts > 0), "应有已练习的知识点");
});

/* --- 8. 键盘作答路径（模拟真实 keydown 处理） --- */

t("会话状态自洽：attempts 与 cursor 不串位", () => {
  const app = makeApp();
  app.setup = { kps: [], mode: "immediate", groupSize: 5, limit: 5, timed: false, order: "origin" };
  session.create(app.setup);
  app.stage = "quiz";
  app.render();

  for (let i = 0; i < 5; i++) {
    const q = session.current();
    clickOption(q.correctAnswer);
    app.render();
    const idx = session.active.cursor;
    const a = session.active.attempts.find((x) => x.index === idx);
    assert(a && a.qid === q.id, `第 ${idx} 题的作答记录应指向 ${q.id}`);
    primaryBtn().click();
    app.render();
  }
  assert(session.active.attempts.length === 5, "应有 5 条作答");
  const ids = session.active.attempts.map((a) => a.qid);
  assert(new Set(ids).size === 5, "5 条作答应对应 5 道不同题目");
  session.discard();
});

/* --- 9. 结算页的增长动画 --- */

{
  const app = makeApp();
  app.setup = { kps: [], mode: "immediate", groupSize: 5, limit: 6, timed: false, order: "origin" };
  session.create(app.setup);
  app.stage = "quiz";
  app.render();

  for (let i = 0; i < 6; i++) {
    const q = session.current();
    clickOption(i < 2 ? q.options.find((o) => o.key !== q.correctAnswer).key : q.correctAnswer);
    app.render();
    primaryBtn().click();
    app.render();
  }

  const rep = session.finish();
  app.report = rep;
  app.stage = "report";
  app.render();

  const content = ID_REGISTRY.get("content");
  const fills = content.querySelectorAll(".kp-row__fill");
  const vals = content.querySelectorAll(".kp-row__val");
  const CIRC = (2 * Math.PI * 52).toFixed(2);
  const maxRate = Math.max(...app.report.kpBreakdown.map((k) => k.rate));

  /* 初始态：必须停在起点，否则说明动画根本没挂上（元素一创建就是终值） */
  try {
    assert(fills.length > 0, "报告页应有知识点进度条");
    assert(
      fills.every((f) => f.style.width === "0%"),
      `进度条初始宽度应为 0%，实际 ${fills.map((f) => f.style.width).join(", ")}`
    );
    assert(
      vals.every((v) => v.textContent === "0%"),
      `百分比初始应为 0%，实际 ${vals.map((v) => v.textContent).join(", ")}`
    );

    const svg = content.querySelector(".ring__svg");
    assert(svg, "应有环形图");
    assert(
      svg.innerHTML.includes(`stroke-dashoffset="${CIRC}"`),
      "环形初始应为一整周偏移（空环），描边才会从 12 点顺时针长出"
    );
    assert(
      content.querySelector(".ring__num").textContent === "0%",
      "环形百分比初始应为 0%"
    );
    pass++;
  } catch (err) {
    failures.push("结算页动画·初始态\n      " + err.message);
  }

  /* 等动画跑完，确认真的到达终值 */
  await new Promise((r) => setTimeout(r, 1800));

  try {
    const last = fills[fills.length - 1];
    assert(
      last.style.width === Math.round(maxRate * 100) + "%",
      `最快增长的一条应达到 ${Math.round(maxRate * 100)}%，实际 ${last.style.width}`
    );
    assert(
      vals.some((v) => v.textContent !== "0%"),
      "百分比数字应滚动到目标值"
    );
    assert(
      content.querySelector(".ring__num").textContent !== "0%",
      `环形百分比应滚到目标值，实际 ${content.querySelector(".ring__num").textContent}`
    );
    pass++;
  } catch (err) {
    failures.push("结算页动画·完成态\n      " + err.message);
  }
}

const storeForReview = await import("../js/store.js");

/* --- 审查回归：轮转、尾组、非法文本及 HTML 边界 --- */
const { default: Tex } = await import("../js/tex.js");
const { spawnSync } = await import("node:child_process");

t("未闭合公式分隔符按字面输出且不会卡死", () => {
  const source = `import Tex from ${JSON.stringify(new URL("../js/tex.js", import.meta.url).href)};
    for (const s of ["price $", "$$", "\\\\(", "x $y", "$x$ trailing $"]) {
      const html = Tex.text(s);
      if (!html) throw new Error("丢失文本");
    }`;
  // 必须在独立进程里跑：同进程一旦死循环就再也回不来，只有超时能证明它没挂。
  // stdio 用 "ignore" 而不是默认的管道——受限环境禁止被拉起的进程经管道捕获输出
  // （会 EPERM），而这里真正需要的信号是「是否超时」，不是子进程输出。
  const child = spawnSync(process.execPath, ["--input-type=module", "-e", source], {
    timeout: 2000,
    stdio: "ignore",
  });
  assert(
    child.status === 0 && !child.error,
    "渲染应在超时前完成（status=" +
      child.status +
      ", error=" +
      (child.error ? child.error.code || child.error.message : "无") +
      "）"
  );
});

t("小题池整组延迟：不足一组也正常结束且不补重复题", () => {
  for (const ids of [[bank.questions[0].id], bank.questions.slice(0, 2).map((q) => q.id)]) {
    session.create({ mode: "batch", groupSize: 3, limit: 0, order: "origin", _onlyIds: ids });
    for (let i = 0; i < ids.length; i++) {
      assert(!session.groupComplete(), "本位置未答时本组不能完成");
      const q = session.current();
      assert(q && ids.includes(q.id), "应在指定题池");
      session.submit(q.correctAnswer);
      assert(session.groupAttempts().length === i % 3 + 1, "本组记录应只包含当前组的位置");
      assert(session.groupComplete() === (i === ids.length - 1), "尾组实际题目答完即可完成");
      session.advance();
    }
    assert(session.isComplete() && !session.current(), "题池耗尽后不轮转");
  }
  session.discard();
});

t("有限题量最后不足一组也进入复盘", () => {
  const app = makeApp();
  session.create({ mode: "batch", groupSize: 3, limit: 5, order: "origin" });
  app.stage = "quiz";
  app.render();
  for (let i = 0; i < 5; i++) {
    clickOption(session.current().correctAnswer);
    primaryBtn().click();
    if (i === 2) {
      assert(session.inGroupReview(), "第一整组进入复盘");
      primaryBtn().click();
    }
  }
  assert(session.inGroupReview(), "最后两题必须进入复盘");
  assert(ID_REGISTRY.get("content").querySelectorAll(".analysis").length === 2, "尾组有两份解析");
  session.discard();
});

t("重复提交当前题不重复计分", () => {
  session.create({ limit: 1 });
  const q = session.current();
  session.submit(q.correctAnswer);
  assert(session.submit(q.correctAnswer) === null, "第二次提交应被拒绝");
  assert(session.active.attempts.length === 1, "只能保存一条作答");
  session.discard();
});

t("错对错序列清除过期订正时间", () => {
  const { recordMistake, resolveMistake } = storeForReview;
  const q = bank.questions[0];
  recordMistake(q, "wrong");
  resolveMistake(q.id);
  assert(persist.mistakes[q.id].resolvedAt, "答对时保存订正时间");
  recordMistake(q, "wrong");
  assert(!persist.mistakes[q.id].resolved && !("resolvedAt" in persist.mistakes[q.id]), "再次答错恢复待订正且清除旧时间");
});

t("根号与箭头可选参数只消费到右方括号", () => {
  assert(Tex.math(String.raw`\sqrt[3]{x}+1`) === '<span class="tex-sqrt"><span class="tex-sqrt__i">3</span><span class="tex-sqrt__r">√</span><span class="tex-sqrt__b"><i>x</i></span></span><span class="tex-bin">+</span>1', "根指数、被开方项与后续表达式不能串位");
  const arrow = Tex.math(String.raw`\xrightarrow[n]{m}x`);
  assert(arrow.includes('tex-stack__t"><i>m</i>') && arrow.includes('tex-stack__u"><i>n</i>') && arrow.endsWith('<i>x</i>'), "上下标及后续变量各自绑定");
});

t("重音与下划线命令不触发异常降级", () => {
  for (const command of ["overline", "underline", "vec", "hat", "tilde", "dot"]) {
    const html = Tex.math(`\\${command}{x}`);
    assert(!html.includes("tex-unknown") && html.includes("<i>x</i>"), "重音命令应保留变量：" + command);
  }
});

t("HTML 数据字段在备用答案与素材说明中转义", () => {
  const payload = '<img src=x onerror="alert(1)">';
  const q = { ...bank.questions[0], id: "review-no-analysis", correctAnswer: payload };
  assert(!practice.analysisPanel(q, "A").querySelector(".analysis__keyidea").innerHTML.includes("<img"), "缺失解析时的答案也必须转义");
  const old = bank.meta.totalImages;
  try {
    bank.meta.totalImages = payload;
    const html = others.libraryView(makeApp()).querySelector(".card__desc").innerHTML;
    assert(!html.includes("<img") && html.includes("&lt;img"), "素材元数据必须转义");
  } finally { bank.meta.totalImages = old; }
  for (const input of [payload, `$${payload}$`, String.raw`$\text{<img src=x onerror="alert(1)">}$`]) {
    assert(!Tex.text(input).includes("<img"), "正文及公式不得输出数据中的标签");
  }
});

t("DOM 桩：append 字符串转换与禁用按钮", () => {
  const node = document.createElement("div");
  node.append(null, undefined, "x", 2);
  assert(node.textContent === "nullundefinedx2", "append 按浏览器规则转成文本");
  let throws = false;
  try { node.appendChild(null); } catch { throws = true; }
  assert(throws, "appendChild(null) 在浏览器中同样应抛错");
  let clicks = 0;
  const button = el("button", { disabled: true, onclick: () => clicks++ });
  button.click();
  assert(clicks === 0, "禁用按钮的 click 不应触发回调");
});


const uiForReview = await import("../js/ui.js");
t("减少动态效果时数字直接写入终值", () => {
  const old = globalThis.matchMedia;
  globalThis.matchMedia = () => ({ matches: true });
  try {
    const node = document.createElement("span");
    uiForReview.countUp(node, 75, { format: (v) => v + "%" });
    assert(node.textContent === "75%", "无需等动画帧即可达到终值");
  } finally {
    if (old === undefined) delete globalThis.matchMedia;
    else globalThis.matchMedia = old;
  }
});

t("主题循环及跟随系统时删除属性", () => {
  const { theme } = storeForReview;
  const old = theme.current;
  try {
    theme.current = "system";
    theme.apply();
    assert(!document.documentElement.hasAttribute("data-theme"), "系统主题无强制属性");
    assert(theme.toggle() === "light" && document.documentElement.getAttribute("data-theme") === "light", "切换浅色");
    assert(theme.toggle() === "dark" && document.documentElement.getAttribute("data-theme") === "dark", "切换深色");
    assert(theme.toggle() === "system" && !document.documentElement.hasAttribute("data-theme"), "恢复系统");
  } finally { theme.current = old; theme.apply(); }
});

t("plain 基本分式与符号导出", () => {
  assert(Tex.plain(String.raw`值 $\frac{1}{2}+\alpha$`) === "值 (1)/(2)+α", "基本分式与希腊字母转换");
});

// 检查导出内容、临时链接和释放安排；实际下载仍需浏览器人工确认。
{
  const oldCreate = URL.createObjectURL;
  const oldRevoke = URL.revokeObjectURL;
  const oldTimeout = globalThis.setTimeout;
  let blob, revoked, cleanup, link, exportError;
  const before = document.body.childNodes.length;
  URL.createObjectURL = (value) => { blob = value; return "blob:review"; };
  URL.revokeObjectURL = (value) => { revoked = value; };
  globalThis.setTimeout = (fn, ms) => {
    if (ms === 4000) { cleanup = fn; return 0; }
    return oldTimeout(fn, ms);
  };
  const oldClick = StubNode.prototype.click;
  StubNode.prototype.click = function () {
    if (this.tagName === "A") { link = this; return; }
    return oldClick.call(this);
  };
  try {
    const q = bank.questions[0];
    report.exportReport({
      startedAt: 0, elapsedMs: 1000,
      config: { kps: [], mode: "immediate" },
      stats: { correct: 0, total: 1, rate: 0 }, kpBreakdown: [],
      attempts: [{ qid: q.id, picked: "wrong", correct: false }],
    });
    const content = await blob.text();
    cleanup();
    t("Markdown 导出生成 Blob、临时下载链接并安排释放", () => {
      assert(blob.type === "text/markdown;charset=utf-8", "正确的编码与类型");
      assert(content.includes(q.id) && content.includes("核心思路"), "包含错题及解析");
      assert(link.href === "blob:review" && link.download.endsWith(".md"), "下载链接及文件名");
      assert(document.body.childNodes.length === before && revoked === "blob:review", "临时链接移除且对象 URL 被释放");
    });
  } catch (err) { exportError = err; }
  finally {
    URL.createObjectURL = oldCreate;
    URL.revokeObjectURL = oldRevoke;
    globalThis.setTimeout = oldTimeout;
    StubNode.prototype.click = oldClick;
  }
  if (exportError) t("Markdown 导出生成 Blob、临时下载链接并安排释放", () => { throw exportError; });
}

/* ---------------------------------------------------------------- 报告 */

console.log(`通过 ${pass} 项，失败 ${failures.length} 项`);
if (failures.length) {
  console.log("\n" + "=".repeat(70));
  console.log("失败详情");
  console.log("=".repeat(70));
  for (const f of failures) console.log("\n  ✗ " + f);
  process.exit(1);
} else {
  console.log("\n所有页面与流程均可正常渲染，无运行时异常。");
}
