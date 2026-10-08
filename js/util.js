/* ==========================================================================
   util.js —— 通用工具
   ========================================================================== */

/** 创建元素：el('div.card', {id:'x'}, [子节点或字符串]) */
export function el(spec, attrs = {}, children = []) {
  const [tagPart, ...classes] = String(spec).split(".");
  const node = document.createElement(tagPart || "div");
  if (classes.length) node.className = classes.join(" ");

  for (const [k, v] of Object.entries(attrs || {})) {
    if (v === null || v === undefined || v === false) continue;
    if (k === "class") node.className = node.className ? node.className + " " + v : v;
    else if (k === "html") node.innerHTML = v;
    else if (k === "text") node.textContent = v;
    else if (k === "style" && typeof v === "object") Object.assign(node.style, v);
    else if (k.startsWith("on") && typeof v === "function") {
      node.addEventListener(k.slice(2).toLowerCase(), v);
    } else if (k === "dataset" && typeof v === "object") {
      Object.assign(node.dataset, v);
    } else node.setAttribute(k, v === true ? "" : v);
  }

  for (const c of [].concat(children)) {
    if (c === null || c === undefined || c === false) continue;
    node.appendChild(typeof c === "string" || typeof c === "number"
      ? document.createTextNode(String(c))
      : c);
  }
  return node;
}

/** HTML 转义 */
export function esc(s) {
  return String(s === null || s === undefined ? "" : s).replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
  );
}

/** 把秒数格式化为 3:05 / 1:02:33 */
export function fmtDuration(ms) {
  const total = Math.max(0, Math.round(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const pad = (n) => String(n).padStart(2, "0");
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`;
}

/** 百分比，保留一位小数（整数则不显示小数） */
export function fmtPct(x) {
  const v = x * 100;
  return (Math.abs(v - Math.round(v)) < 0.05 ? String(Math.round(v)) : v.toFixed(1)) + "%";
}

/** Fisher–Yates 洗牌，不改原数组 */
export function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** 按 key 求和的计数器 */
export function tally(items, keyFn) {
  const m = new Map();
  for (const it of items) {
    for (const k of [].concat(keyFn(it) || [])) {
      if (!k) continue;
      m.set(k, (m.get(k) || 0) + 1);
    }
  }
  return m;
}

/** 持久化（localStorage 不可用时静默降级） */
export const storage = {
  get(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  },
  del(key) {
    try {
      localStorage.removeItem(key);
    } catch {
      /* ignore */
    }
  },
};

/** 防抖 */
export function debounce(fn, wait = 250) {
  let t = null;
  return (...a) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...a), wait);
  };
}

/** 生成短 id */
export function uid(prefix = "s") {
  return prefix + "_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}
