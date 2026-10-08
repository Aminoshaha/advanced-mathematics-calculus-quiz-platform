/* ==========================================================================
   tools/tex-check.mjs —— 用真实题库数据校验 LaTeX 渲染器
   --------------------------------------------------------------------------
   迷你渲染器是本项目唯一的"自研关键件"，必须对全量真实公式做一次回归：
     1. 每个题干 / 选项都能渲染且不抛异常
     2. 不出现「渲染不了的命令」降级标记 .tex-unknown
     3. 输出结构基本健全（分式/极限/分段函数等关键结构确实被渲染出来了）

   用法：node tools/tex-check.mjs
   ========================================================================== */

import Tex from "../js/tex.js";
import { BANK } from "../data/questions.js";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

let checked = 0;
let failed = 0;
const unknownHits = [];
const softWarnings = [];
const residues = [];
const orphans = [];

/**
 * 「下标脱离算子」的结构性错误。
 *
 * 踩过的坑：\lim\limits_{x \to 0} 因为预处理正则里误用了 \b
 * （JS 正则中 "_" 也属于单词字符，而 \limits 后面正好紧跟 "_"），
 * 排版开关没被剥掉，它变成一个空节点，紧接着的 _ 就挂到了空节点上，渲染成：
 *
 *     <span class="tex-bigop tex-lim">lim</span>
 *     <span class="tex-script"><span style="display:inline-block;width:0"></span><sub>x→0</sub></span>
 *
 * 结果极限条件跑到 lim 的右边而不是正下方。
 * 只检查「.tex-lim 这个类是否存在」抓不到 —— 必须检查下标有没有真进到算子内部。
 */
const ORPHAN_SCRIPT = /tex-script"><span style="display:inline-block;width:0"/;

/** 取出渲染结果里「用户真正会看到的文字」 */
function visibleText(html) {
  return String(html)
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

/**
 * 渲染后可见文本里不该出现的东西。
 * 「未知命令」检查抓不到这类问题：像 \\[2pt] 这种写法能一路渲染成
 * 字面文本 "2pt"，页面上就会出现 "2pt0" 这种字样（真实踩过）。
 */
const RESIDUE = [
  [/\d+(pt|ex|mu|em|pc)\b/, "排版单位残留（如 2pt / 1em）"],
  [/\\/, "未解析的反斜杠"],
  [/\\?begin\{|\\?end\{/, "LaTeX 环境名残留"],
  [/[^&]&[^&]|^&/, "对齐符 & 残留"],
];

function check(label, src, expect = []) {
  checked++;
  let html;
  try {
    html = Tex.text(src || "");
  } catch (err) {
    failed++;
    console.log(`  ✗ 抛异常 [${label}] ${err.message}`);
    console.log(`      ${src}`);
    return;
  }

  if (html.includes("tex-unknown")) {
    const m = html.match(/tex-unknown">([^<]*)</g) || [];
    unknownHits.push({
      label,
      src,
      tokens: m.map((x) => x.replace(/tex-unknown">|</g, "")),
    });
  }

  // 可见文本残留
  const vis = visibleText(html);
  for (const [rx, why] of RESIDUE) {
    const m = rx.exec(vis);
    if (m) {
      residues.push({ label, src, vis, hit: m[0], why });
      break;
    }
  }

  // 下标是否脱离了算子
  if (ORPHAN_SCRIPT.test(html)) {
    orphans.push({ label, src, html });
  }

  for (const [token, desc] of expect) {
    if (!html.includes(token)) {
      softWarnings.push(`[${label}] 期望出现「${desc}」(${token})，但没渲染出来：${src}`);
    }
  }
  return html;
}

console.log("=".repeat(70));
console.log("LaTeX 渲染器 · 全量题库回归");
console.log("=".repeat(70));

/* ---------------- 题干与选项 ---------------- */

const STRUCTURE_HINTS = [
  ["tex-frac", "分式"],
  ["tex-lim", "极限下标"],
  ["tex-cases", "分段函数"],
  ["tex-sqrt", "根号"],
  ["tex-inline", "行内公式"],
  ["tex-display", "独立公式"],
];

for (const q of BANK.questions) {
  const stemHtml = check(`${q.id} 题干`, q.stemLatex);

  // 结构统计（仅提示，不作为失败）
  q._struct = STRUCTURE_HINTS.filter(([cls]) => stemHtml.includes(cls)).map(([, d]) => d);

  for (const opt of q.options || []) {
    check(`${q.id} 选项 ${opt.key}`, opt.latex);
  }

  const ana = BANK.analysis[q.id];
  if (ana) {
    if (ana.keyIdea) check(`${q.id} 核心思路`, ana.keyIdea);
    for (const s of ana.steps || []) {
      check(`${q.id} 步骤`, `${s.title || ""} ${s.content || ""}`);
    }
    for (const n of ana.optionNotes || []) {
      check(`${q.id} 干扰项 ${n.key}`, n.note);
    }
    if (ana.pitfalls) check(`${q.id} 易错点`, ana.pitfalls);
  }
}

/* ---------------- 针对性结构用例 ---------------- */

console.log("\n--- 关键结构定点验证 ---");

const CASES = [
  ["分式", "$\\frac{2x}{x^{2}+1}$", [["tex-frac", "分式"]]],
  ["极限下标", "$\\lim_{x \\to \\infty} x\\sin\\frac{2x}{x^{2}+1}$", [["tex-lim", "极限下标"]]],
  ["limits 命令", "$\\lim\\limits_{x \\to 0} \\frac{\\sin x}{x}$", [["tex-lim__b", "极限条件在算子内部"], ["tex-lim__m", "算子本体"]]],
  ["limits 后跟下标（回归）", "$\\lim\\limits_{n \\to \\infty} a_n$", [["tex-lim__b", "极限条件在算子内部"]]],
  ["limits 与上标", "$\\sum\\limits_{k=0}^{n} k$", [["tex-lim__b", "下标在算子内部"], ["tex-lim__t", "上标也在算子内部"]]],
  ["displaystyle + limits", "$\\displaystyle\\lim\\limits_{x \\to 0} f(x)$", [["tex-lim__b", "极限条件在算子内部"]]],
  ["分段函数", "$f(x)=\\begin{cases}\\dfrac{1-e^{\\tan x}}{\\arcsin 2x}, & x>0\\\\ ae^{4x}, & x\\leq 0\\end{cases}$", [["tex-cases", "分段函数"]]],
  ["分段函数带行距", "$\\begin{cases}\\dfrac{1}{x}, & x\\neq 0\\\\[2pt] 0, & x=0\\end{cases}$", [["tex-cases", "分段函数"]]],
  ["分段函数带星号", "$\\begin{cases} a, & x>0\\\\* b, & x\\le 0\\end{cases}$", [["tex-cases", "分段函数"]]],
  ["行内换行参数", "$a\\\\[4pt] b$", []],
  ["根号", "$\\sqrt{x^2+1}$", [["tex-sqrt", "根号"]]],
  ["n 次根", "$\\sqrt[3]{(1-x)(1+x)}$", [["tex-sqrt__i", "根指数"]]],
  ["上下标同时", "$x_n^2$", [["tex-script2", "上下标堆叠"]]],
  ["嵌套分式幂", "$\\left(\\frac{x+2a}{x-a}\\right)^{x}$", [["tex-frac", "分式"]]],
  ["希腊字母", "$\\varepsilon \\in (0,1),\\ \\alpha,\\ \\lambda,\\ \\pi$", []],
  ["三角与对数", "$\\arcsin 2x + \\ln(1+x^2) + \\cot(x-1)$", [["tex-fn", "函数名直立"]]],
  ["常用符号", "$x \\ge N,\\ |x_n - a| \\le 2\\varepsilon,\\ a \\neq \\infty$", []],
  ["集合与箭头", "$\\{x_n\\} \\to a,\\ \\forall n \\in \\mathbb{N}$", []],
  ["求和与积分", "$\\sum_{n=1}^{\\infty} \\frac{1}{n^2},\\ \\int_0^1 x\\,dx$", [["tex-bigop", "大算子"]]],
  ["黑板粗体", "$\\forall n \\in \\mathbb{N},\\ x \\in \\mathbb{R}$", [["ℕ", "ℕ"], ["ℝ", "ℝ"]]],
  ["带标注箭头", "$\\xrightarrow{\\text{洛必达}} \\lim_{x\\to 0}\\frac{f}{g}$", [["tex-stack", "堆叠箭头"]]],
  ["带标注等号", "$\\xlongequal{\\text{等价替换}} 1$", [["tex-stack", "堆叠等号"]]],
  ["尺寸定界符", "$\\bigl( x+1 \\bigr)^2$", [["(", "左括号"]]],
  ["空心方块", "$\\square,\\ \\triangle,\\ \\Longrightarrow$", [["□", "□"], ["△", "△"], ["⟹", "⟹"]]],
  ["上下标分离语义", "$x_n^2$", [["tex-script2", "上下标堆叠"]]],
];

for (const [name, src, expect] of CASES) {
  const html = check(`定点：${name}`, src, expect);
  const cls = STRUCTURE_HINTS.filter(([c]) => html.includes(c)).map(([, d]) => d);
  console.log(`  ${unknownHits.some((u) => u.label === `定点：${name}`) ? "!" : "·"} ${name.padEnd(12)} → ${cls.join(" / ") || "（纯文本）"}`);
}

/* ---------------- 报告 ---------------- */

/* ==========================================================================
   CSS 契约检查
   --------------------------------------------------------------------------
   渲染器的 HTML 结构依赖 app.css 里几条关键规则。这些规则一旦被改回错误写法，
   公式就会整块沉到文字基线以下（曾发生过：.tex-frac 用 inline-flex，
   其基线取「分子」的基线，再用 vertical-align: -0.52em 补偿，结果双重下移）。
   本机无浏览器可实测，因此这里把「不该被改坏的契约」固化成断言。
   ========================================================================== */

const cssPath = resolve(dirname(fileURLToPath(import.meta.url)), "..", "assets", "app.css");
// 去掉注释，避免注释里的示例选择器干扰匹配
const CSS = readFileSync(cssPath, "utf8").replace(/\/\*[\s\S]*?\*\//g, "");

/**
 * 取出某个选择器的全部声明。
 * 必须做两件事，否则会误判：
 *   1) 支持分组选择器（`.a,\n.b { ... }`）
 *   2) 合并该选择器出现的**所有**规则块 —— 例如 `.tex-inline` 既出现在
 *      共享的字体规则里，又有自己的一条规则，只取第一条会漏掉 display。
 */
function decls(selector) {
  const re = /([^{}]+)\{([^{}]*)\}/g;
  const parts = [];
  let m;
  while ((m = re.exec(CSS))) {
    const sels = m[1].split(",").map((s) => s.trim());
    if (sels.includes(selector)) parts.push(m[2]);
  }
  return parts.length ? parts.join("\n") : null;
}

const CONTRACTS = [
  {
    name: ".tex-inline 必须是 display: inline",
    why:
      "inline-block 会新建基线上下文，让内部结构的 vertical-align 再叠加一层偏移，" +
      "整段公式会沉到文字基线以下",
    ok: () => /display:\s*inline\s*;/.test(decls(".tex-inline") || ""),
  },
  {
    name: ".tex-inline 不得带纵向 vertical-align 偏移",
    why: "它的子元素已经各自对好了基线，外层再加偏移就是重复位移",
    ok: () => !/vertical-align/.test(decls(".tex-inline") || ""),
  },
  {
    name: ".tex-frac 必须用 vertical-align: middle",
    why:
      "middle 把盒子中点对到「基线 + 半个 x 高度」处，也就是数学轴，" +
      "正好落在分数线位置；用负值补偿会因 inline-flex 基线取自分子而双重下移",
    ok: () => /vertical-align:\s*middle\s*;/.test(decls(".tex-frac") || ""),
  },
  {
    name: ".tex-frac 不得使用负 vertical-align",
    why: "同上，负值会把分式整体推到基线下",
    ok: () => !/vertical-align:\s*-/.test(decls(".tex-frac") || ""),
  },
  {
    name: ".tex-lim 必须坐在基线上",
    why: "lim / max / min 是「词算子」，本身应当落在文字基线上，下标垂到基线下方",
    ok: () => /vertical-align:\s*baseline\s*;/.test(decls(".tex-lim") || ""),
  },
  {
    name: ".tex-lim--sym 必须用 vertical-align: middle",
    why: "∑ ∏ ⋃ ⋂ 是大符号，按数学轴居中而非坐在基线上",
    ok: () => /vertical-align:\s*middle\s*;/.test(decls(".tex-lim--sym") || ""),
  },
  {
    name: ".tex-stack 的标注必须脱离文档流",
    why:
      "标注若参与基线计算，会把箭头/等号顶到基线以上；" +
      "绝对定位后由符号单独承担基线",
    ok: () => {
      const b = decls(".tex-stack") || "";
      const t = decls(".tex-stack__t") || "";
      return /position:\s*relative/.test(b) && /position:\s*absolute/.test(t);
    },
  },
  {
    name: ".tex-cases 必须用 vertical-align: middle",
    why: "分段函数大括号整体按数学轴居中",
    ok: () => /vertical-align:\s*middle\s*;/.test(decls(".tex-cases") || ""),
  },
  {
    name: ".ring__val 必须保留 stroke-dashoffset 过渡",
    why: "环形的顺时针生长动画完全依赖这条 transition；删掉它动画会静默失效（直接显示终值）",
    ok: () => /transition:\s*stroke-dashoffset/.test(decls(".ring__val") || ""),
  },
  {
    name: ".kp-row__fill 必须保留 width 过渡",
    why: "知识点进度条的增长动画依赖这条 transition，删掉会一步到位",
    ok: () => /transition:\s*width/.test(decls(".kp-row__fill") || ""),
  },
];

const cssBad = [];
console.log("\n" + "-".repeat(70));
console.log("CSS 基线契约检查");
console.log("-".repeat(70));
for (const c of CONTRACTS) {
  const ok = c.ok();
  console.log(`  ${ok ? "·" : "!"} ${c.name}`);
  if (!ok) cssBad.push(c);
}
if (cssBad.length) {
  console.log("\n  被破坏的契约：");
  for (const c of cssBad) console.log(`    ✗ ${c.name}\n      ${c.why}`);
  console.log(`\n  （原因说明：这些规则决定了公式能否与文字对齐在同一水平线上）`);
} else {
  console.log("\n  全部符合，公式基线的关键规则未被破坏。");
}

console.log("\n" + "=".repeat(70));
console.log(`渲染条目   : ${checked}`);
console.log(`抛异常     : ${failed}`);
console.log(`未识别命令 : ${unknownHits.length} 处`);
console.log(`可见文本残留: ${residues.length} 处`);
console.log(`下标脱离算子: ${orphans.length} 处`);
console.log(`CSS 契约   : ${CONTRACTS.length - cssBad.length} / ${CONTRACTS.length} 通过`);
console.log("=".repeat(70));

if (orphans.length) {
  console.log("\n极限/求和的下标脱离了算子（会渲染到算子右边而不是正下方）：");
  const seen = new Set();
  for (const o of orphans) {
    const key = o.src.slice(0, 60);
    if (seen.has(key)) continue;
    seen.add(key);
    console.log(`  ✗ ${o.label}`);
    console.log(`      原文: ${o.src.slice(0, 110)}`);
    console.log(`      HTML: ${o.html.slice(0, 200)}`);
    console.log("");
  }
  console.log("  常见原因：\\limits / \\nolimits / \\displaystyle 没被预处理剥掉，");
  console.log("  变成了空节点把 _ 抢走。检查 tex.js 的预处理正则与 STYLE_SWITCHES。");
}

if (residues.length) {
  console.log("\n渲染后仍残留在页面上的 LaTeX 记号：");
  const seen = new Set();
  for (const r of residues) {
    const key = r.why + "|" + r.hit;
    if (seen.has(key)) continue;
    seen.add(key);
    console.log(`  ✗ ${r.why} —— 残留文字 "${r.hit}"`);
    console.log(`      出处 : ${r.label}`);
    console.log(`      原文 : ${r.src.slice(0, 120)}`);
    console.log(`      渲染 : ${r.vis.slice(0, 120)}`);
    console.log("");
  }
} else {
  console.log("\n渲染结果中没有 LaTeX 记号残留。");
}

if (unknownHits.length) {
  console.log("\n未识别的 LaTeX 命令（需要在 tex.js 的符号表里补充）：");
  const seen = new Map();
  for (const u of unknownHits) {
    for (const tk of u.tokens) {
      if (!seen.has(tk)) seen.set(tk, []);
      seen.get(tk).push(u.label);
    }
  }
  for (const [tk, where] of [...seen.entries()].sort()) {
    console.log(`  \\${tk.padEnd(14)} 出现于 ${where.length} 处，例如 ${where[0]}`);
  }
} else {
  console.log("\n全部公式均可渲染，无未识别命令。");
}

if (softWarnings.length) {
  console.log(`\n结构提示（${softWarnings.length} 条，非错误）：`);
  for (const w of softWarnings.slice(0, 20)) console.log("  " + w);
}

/* 题干结构分布，帮助确认渲染覆盖 */
const dist = new Map();
for (const q of BANK.questions) {
  for (const d of q._struct) dist.set(d, (dist.get(d) || 0) + 1);
}
console.log("\n题干中出现的数学结构分布：");
for (const [k, v] of [...dist.entries()].sort((a, b) => b[1] - a[1])) {
  console.log(`  ${k.padEnd(10)} ${v} 题`);
}

process.exit(
  softWarnings.length > 0 ||
    failed > 0 ||
    unknownHits.length > 0 ||
    cssBad.length > 0 ||
    residues.length > 0 ||
    orphans.length > 0
    ? 1
    : 0
);
