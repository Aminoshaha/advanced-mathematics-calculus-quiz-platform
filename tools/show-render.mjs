/* ==========================================================================
   tools/show-render.mjs —— 定点查看某道题的渲染结果
   --------------------------------------------------------------------------
   排查「页面上出现了奇怪字样」时用：把该题的每段 LaTeX 原文与渲染后的
   可见文字并排打出来，一眼就能看出是哪一段、哪个记号漏了。

   用法：
     node tools/show-render.mjs T1-10        # 看这道题的全部字段
     node tools/show-render.mjs T1-10 steps  # 只看 steps
     node tools/show-render.mjs --list       # 列出所有题号
   ========================================================================== */

import Tex from "../js/tex.js";
import { BANK } from "../data/questions.js";

const RESIDUE = [
  [/\d+(pt|ex|mu|em|pc)\b/, "排版单位残留"],
  [/\\/, "未解析的反斜杠"],
  [/\\?begin\{|\\?end\{/, "环境名残留"],
  [/[^&]&[^&]|^&/, "对齐符残留"],
];

function visible(html) {
  return String(html)
    .replace(/<br\s*\/?>/g, " ⏎ ")
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

const ARGV = process.argv.slice(2);
const SHOW_HTML = ARGV.includes("--html");
const argv = ARGV.filter((a) => !a.startsWith("--"));

function report(label, src) {
  if (!src) return 0;
  const html = Tex.text(src);
  const vis = visible(html);
  let bad = null;
  for (const [rx, why] of RESIDUE) {
    const m = rx.exec(vis);
    if (m) {
      bad = `${why}："${m[0]}"`;
      break;
    }
  }
  console.log(`\n── ${label} ${bad ? "  ✗ " + bad : "  ✓"}`);
  console.log(`   原文: ${src.replace(/\n/g, " ")}`);
  console.log(`   渲染: ${vis}`);
  if (SHOW_HTML) console.log(`   HTML: ${html}`);
  return bad ? 1 : 0;
}

if (argv[0] === "--list" || !argv[0]) {
  console.log("题库题号：");
  console.log("  " + BANK.questions.map((q) => q.id).join("  "));
  console.log("\n用法：node tools/show-render.mjs T1-10 [题干|选项|核心思路|步骤|干扰项|易错点]");
  process.exit(0);
}

const id = argv[0];
const only = argv[1] || null;
const q = BANK.questions.find((x) => x.id === id);
const a = BANK.analysis[id];

if (!q) {
  console.log(`没有找到题号 ${id}`);
  process.exit(1);
}

const want = (name) => !only || only === name;
let bad = 0;

console.log("=".repeat(72));
console.log(`${id}　知识点：${(q.knowledgePoints || []).join("、")}　` +
  `我的答案：${q.myAnswer}　正确答案：${q.correctAnswer}　` +
  `${q.myAnswer === q.correctAnswer ? "（原卷答对）" : "（原卷答错）"}`);
console.log("=".repeat(72));

if (want("题干")) bad += report("题干", q.stemLatex);
if (want("选项") || want("题干")) {
  for (const o of q.options || []) bad += report(`选项 ${o.key}`, o.latex);
}

if (a) {
  if (want("核心思路")) bad += report("核心思路", a.keyIdea);
  if (want("步骤")) {
    (a.steps || []).forEach((s, i) => {
      bad += report(`步骤 ${i + 1} 标题`, s.title);
      bad += report(`步骤 ${i + 1} 内容`, s.content);
    });
  }
  if (want("干扰项")) {
    for (const n of a.optionNotes || []) bad += report(`干扰项 ${n.key}`, n.note);
  }
  if (want("易错点")) bad += report("易错点", a.pitfalls);
  if (a.selfReasoning) bad += report("自解推理", a.selfReasoning);
} else {
  console.log("\n（这道题没有解析）");
}

console.log("\n" + "-".repeat(72));
console.log(bad ? `发现 ${bad} 处残留，需要修渲染器或数据。` : "以上内容渲染后均无 LaTeX 残留。");
process.exit(bad ? 1 : 0);
