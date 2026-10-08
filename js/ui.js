/* ==========================================================================
   ui.js —— 图标、提示、模态、共享展示组件
   ========================================================================== */

import { el } from "./util.js";
import Tex from "./tex.js";

/* ---------------------------------------------------------------- 图标 */

const P = {
  practice: '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
  mistakes:
    '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/><path d="M9.5 7.5l5 5M14.5 7.5l-5 5"/>',
  stats: '<path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/>',
  library:
    '<rect x="3" y="3" width="18" height="18" rx="2.5"/><circle cx="8.8" cy="9" r="1.6"/><path d="M21 15.5l-4.5-4.5L7 20.5"/>',
  papers:
    '<path d="M14 2H6.5A2.5 2.5 0 0 0 4 4.5v15A2.5 2.5 0 0 0 6.5 22h11a2.5 2.5 0 0 0 2.5-2.5V8Z"/><path d="M14 2v6h6"/><path d="M8.5 13h7M8.5 17h4.5"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  chevron: '<path d="m9 18 6-6-6-6"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
  redo: '<path d="M3 4v6h6"/><path d="M3.5 15a9 9 0 1 0 2-9.4L3 10"/>',
  sun: '<circle cx="12" cy="12" r="4.2"/><path d="M12 2v2.2M12 19.8V22M4.2 4.2l1.6 1.6M18.2 18.2l1.6 1.6M2 12h2.2M19.8 12H22M4.2 19.8l1.6-1.6M18.2 5.8l1.6-1.6"/>',
  moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z"/>',
  trash: '<path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>',
  alert:
    '<path d="M12 9v4"/><path d="M12 17h.01"/><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/>',
  flag: '<path d="M4 22V4"/><path d="M4 4h11l-1.2 3H20l-2 5 2 5H4"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4"/>',
  sparkle:
    '<path d="M12 3v4M12 17v4M3 12h4M17 12h4"/><path d="M12 8.5 13.4 12 12 15.5 10.6 12Z"/>',
};

/** 返回 SVG 字符串 */
export function iconHTML(name, size = 16) {
  const d = P[name] || "";
  return (
    `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" ` +
    `stroke="currentColor" stroke-width="1.8" stroke-linecap="round" ` +
    `stroke-linejoin="round" aria-hidden="true">${d}</svg>`
  );
}

/** 返回 SVG 元素 */
export function icon(name, size = 16) {
  const wrap = document.createElement("span");
  wrap.style.display = "contents";
  wrap.innerHTML = iconHTML(name, size);
  return wrap.firstElementChild;
}

/* ---------------------------------------------------------------- 提示 */

let toastTimer = null;

export function toast(message, ms = 2000) {
  const host = document.getElementById("toast-host");
  if (!host) return;
  host.textContent = message;
  host.classList.remove("hidden");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => host.classList.add("hidden"), ms);
}

/* ---------------------------------------------------------------- 模态 */

/**
 * macOS 风格确认面板
 * @returns {Promise<boolean>}
 */
export function confirmSheet({
  title = "确认操作",
  text = "",
  okText = "确定",
  cancelText = "取消",
  danger = false,
  icon: iconName = "alert",
} = {}) {
  return new Promise((resolve) => {
    const mask = el("div.sheet-mask");
    const sheet = el("div.sheet");

    const close = (v) => {
      mask.remove();
      document.removeEventListener("keydown", onKey);
      resolve(v);
    };

    const body = el("div.sheet__body", {}, [
      el("div.sheet__icon", { html: iconHTML(iconName, 42) }),
      el("div.sheet__title", { text: title }),
      text ? el("div.sheet__text", { text }) : null,
    ]);

    const foot = el("div.sheet__foot", {}, [
      el("button.btn.btn--bordered", { onclick: () => close(false) }, [cancelText]),
      el("button.btn" + (danger ? ".btn--danger" : ".btn--primary"), {
        onclick: () => close(true),
      }, [okText]),
    ]);

    sheet.append(body, foot);
    mask.appendChild(sheet);
    mask.addEventListener("click", (e) => {
      if (e.target === mask) close(false);
    });

    const onKey = (e) => {
      if (e.key === "Escape") close(false);
      if (e.key === "Enter") close(true);
    };
    document.addEventListener("keydown", onKey);

    document.querySelector(".window").appendChild(mask);
    setTimeout(() => sheet.querySelector(".btn--primary, .btn--danger")?.focus(), 30);
  });
}

/* ---------------------------------------------------------------- 数学渲染 */

/** 题干 / 选项：中文与 $LaTeX$ 混排 */
export function mathText(s) {
  return Tex.text(s || "");
}

/** 纯公式 */
export function mathOnly(s) {
  return Tex.math(s || "");
}

/** 去掉 LaTeX 记号的纯文本 */
export function mathPlain(s) {
  return Tex.plain(s || "");
}

/* ---------------------------------------------------------------- 动画 */

/** requestAnimationFrame 兜底（Node 测试环境没有） */
const raf =
  typeof requestAnimationFrame === "function"
    ? requestAnimationFrame
    : (fn) => setTimeout(() => fn(Date.now()), 16);

const now =
  typeof performance !== "undefined" && performance.now
    ? () => performance.now()
    : () => Date.now();

/** 用户是否要求减少动态效果 */
function reducedMotion() {
  return (
    typeof matchMedia === "function" &&
    matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * 让元素从初始状态过渡到目标状态。
 *
 * 关键点：CSS 的 transition 只在「计算样式发生变化」时触发。如果元素一创建
 * 就带着终值，浏览器不会把它当成一次变化，动画根本不会播。所以必须
 *   1. 先写入初始值
 *   2. 强制一次样式计算（读 offsetWidth）—— 这一步不能省
 *   3. 下一帧再改为目标值
 *
 * @param {Element} el
 * @param {(el: Element) => void} setInitial
 * @param {(el: Element) => void} setTarget
 * @param {number} delayMs 错峰延迟，用于列表逐条增长的级联效果
 */
export function animateTo(el, setInitial, setTarget, delayMs = 0) {
  if (!el) return;
  setInitial(el);
  if (reducedMotion()) {
    setTarget(el);
    return;
  }
  void el.offsetWidth; // 若元素已在文档中，这里立刻完成一次样式计算
  // 双重 rAF：本项目的视图是「先离屏构建、再整体插入」的，构建时读 offsetWidth
  // 拿不到真实布局。第一帧让浏览器带着初始值完成一次「样式→布局→绘制」，
  // 第二帧再改终值，transition 才一定会触发。
  raf(() => {
    raf(() => {
      if (delayMs > 0) setTimeout(() => setTarget(el), delayMs);
      else setTarget(el);
    });
  });
}

/**
 * 数字滚动增长
 * @param {Element} node 承载数字的节点
 * @param {number} to 目标值
 */
export function countUp(node, to, { ms = 1000, format = (v) => String(Math.round(v)) } = {}) {
  if (!node) return;
  if (reducedMotion()) {
    node.textContent = format(to);
    return;
  }
  const t0 = now();
  const tick = () => {
    const t = Math.min(1, (now() - t0) / ms);
    const eased = 1 - Math.pow(1 - t, 3); // ease-out，先快后慢
    node.textContent = format(to * eased);
    if (t < 1) raf(tick);
    else node.textContent = format(to);
  };
  raf(tick);
}

/* ---------------------------------------------------------------- 共享组件 */

export function progressBar(value, cls = "") {
  const fill = el("div.progress__fill");
  fill.style.width = Math.round(Math.max(0, Math.min(1, value)) * 100) + "%";
  return el("div.progress." + cls, {}, [fill]);
}

export function kpBadges(kps, { accent = false } = {}) {
  return (kps || []).map((k) =>
    el("span.badge" + (accent ? ".badge--accent" : ""), { text: k })
  );
}

/** 空状态 */
export function emptyState({ icon: iconName = "papers", title, desc, action }) {
  return el("div.empty", {}, [
    el("div.empty__icon", { html: iconHTML(iconName, 44) }),
    el("div.empty__title", { text: title }),
    desc ? el("div.empty__desc", { text: desc }) : null,
    action || null,
  ]);
}

/** 知识点掌握度条（带增长动画） */
export function kpBar(name, rate, { attempts = 0, dim = false, delay = 0 } = {}) {
  const practiced = rate !== null;
  const pct = practiced ? rate : 0;
  const targetPct = Math.round(pct * 100);

  const fill = el("div.kp-row__fill");
  fill.style.background = !practiced
    ? "var(--bg-inset-strong)"
    : pct >= 0.8
    ? "var(--green)"
    : pct >= 0.5
    ? "var(--accent)"
    : "var(--red)";

  const val = el("div.kp-row__val", { text: practiced ? "0%" : "未练习" });

  if (practiced) {
    animateTo(
      fill,
      (n) => {
        n.style.width = "0%";
      },
      (n) => {
        n.style.width = targetPct + "%";
      },
      delay
    );
    // 数字与进度条同步增长
    setTimeout(() => countUp(val, targetPct, { ms: 700, format: (v) => Math.round(v) + "%" }), delay);
  } else {
    fill.style.width = "0%";
  }

  return el("div.kp-row" + (dim ? ".dim" : ""), {}, [
    el("div.kp-row__name", {
      text: name,
      title: attempts ? `${name}（作答 ${attempts} 次）` : name,
    }),
    el("div.kp-row__bar", {}, [fill]),
    val,
  ]);
}
