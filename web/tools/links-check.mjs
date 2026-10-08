/* ==========================================================================
   tools/links-check.mjs —— 静态引用路径检查
   --------------------------------------------------------------------------
   存在的理由：ES module 的动态 import 相对路径是相对「模块自身」解析的，
   而不是相对页面。js/app.js 里写 "./data/questions.js" 会被解析成
   /js/data/questions.js → 404 → 首屏报「题库数据加载失败」。

   这类错误「HTTP 检查单个 URL 返回 200」是发现不了的，必须反过来验证
   「代码里引用的每个路径是否真实存在」。本工具做这件事：

     · 扫描所有 .js，检查 import / export ... from / import() 的路径
     · 扫描 index.html，检查 <script src> 与 <link href>
     · 检查是否存在「解析结果指向 web/ 之外」的越界引用

   用法：node tools/links-check.mjs
   ========================================================================== */

import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { dirname, resolve, relative, join, posix } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const WEB = resolve(HERE, "..");

const problems = [];
let checkedRefs = 0;

/** 递归收集文件 */
function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name.startsWith(".")) continue;
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) {
      // 原始截图目录里没有代码引用，跳过以免拖慢
      if (name === "source") continue;
      walk(p, out);
    } else out.push(p);
  }
  return out;
}

/** 去掉注释，避免把注释里的示例路径当成真实引用 */
function stripComments(src) {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/(^|[^:])\/\/[^\n]*/g, "$1");
}

/** 判断相对引用能否解析到真实文件 */
function checkSpecifier(fromFile, spec, kind) {
  if (!spec.startsWith(".")) return; // 裸模块名（这里没有 npm 依赖）、http(s) 外链
  checkedRefs++;

  const base = dirname(fromFile);
  let target = resolve(base, spec);

  // 浏览器不会像 Node 一样补 .js 或 /index.js。
  const candidates = [target];
  const hit = candidates.find((c) => existsSync(c) && statSync(c).isFile());

  const rel = relative(WEB, target).split("\\").join("/");
  const from = relative(WEB, fromFile).split("\\").join("/");

  if (!hit) {
    problems.push({
      kind: "缺失",
      from,
      spec,
      resolvesTo: rel,
      why: `${kind} 引用的路径不存在`,
    });
    return;
  }
  // 越界检查
  if (relative(WEB, resolve(hit)).startsWith("..")) {
    problems.push({
      kind: "越界",
      from,
      spec,
      resolvesTo: relative(WEB, resolve(hit)),
      why: "解析到了 web/ 目录之外",
    });
  }
}

/* ---------------- 1. JS 模块引用 ---------------- */

const jsFiles = walk(join(WEB, "js")).concat(
  existsSync(join(WEB, "tools")) ? walk(join(WEB, "tools")) : []
);

const PATTERNS = [
  [/\bimport\s+[\s\S]*?\bfrom\s*["']([^"']+)["']/g, "import ... from"],
  [/\bimport\s*["']([^"']+)["']/g, "import（副作用）"],
  [/\bimport\s*\(\s*["']([^"']+)["']\s*\)/g, "动态 import()"],
  [/\bexport\s+[\s\S]*?\bfrom\s*["']([^"']+)["']/g, "export ... from"],
];

for (const f of jsFiles) {
  const src = stripComments(readFileSync(f, "utf8"));
  for (const [re, kind] of PATTERNS) {
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(src))) checkSpecifier(f, m[1], kind);
  }
}

/* ---------------- 2. index.html 里的资源引用 ---------------- */

const htmlPath = join(WEB, "index.html");
if (existsSync(htmlPath)) {
  const html = readFileSync(htmlPath, "utf8");
  const re = /\b(?:src|href)\s*=\s*["']([^"']+)["']/g;
  let m;
  while ((m = re.exec(html))) {
    const spec = m[1];
    if (/^(https?:|data:|mailto:|#|\/\/)/.test(spec)) continue;
    checkedRefs++;
    const target = resolve(WEB, spec);
    const hit = existsSync(target) && statSync(target).isFile();
    if (!hit) {
      problems.push({
        kind: "缺失",
        from: "index.html",
        spec,
        resolvesTo: relative(WEB, target),
        why: "HTML 引用的资源不存在",
      });
    }
  }
}

/* ---------------- 3. 数据文件自洽 ---------------- */

// questions.js 里 src 字段指向的截图是否都在
const qjs = join(WEB, "data", "questions.js");
if (existsSync(qjs)) {
  let missingShots = 0;
  const src = readFileSync(qjs, "utf8");
  const re = /"src":\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(src))) {
    checkedRefs++;
    const p = join(WEB, "assets", "source", m[1].split("/").join("\\"));
    if (!existsSync(p)) {
      missingShots++;
      if (missingShots <= 5) {
        problems.push({
          kind: "缺失",
          from: "data/questions.js",
          spec: m[1],
          resolvesTo: "assets/source/" + m[1],
          why: "题目引用的原图不存在",
        });
      }
    }
  }
  if (missingShots > 5) console.log(`  （原图缺失共 ${missingShots} 张，仅列出前 5 张）`);
}

/* ---------------- 报告 ---------------- */

console.log("=".repeat(70));
console.log("静态引用路径检查");
console.log("=".repeat(70));
console.log(`扫描 JS 文件 : ${jsFiles.length}`);
console.log(`检查引用数   : ${checkedRefs}`);
console.log(`发现问题     : ${problems.length}`);
console.log("=".repeat(70));

if (problems.length) {
  console.log("");
  for (const p of problems) {
    console.log(`  ✗ [${p.kind}] ${p.why}`);
    console.log(`      所在文件 : ${p.from}`);
    console.log(`      引用写法 : "${p.spec}"`);
    console.log(`      实际解析 : ${p.resolvesTo}`);
    console.log("");
  }
  process.exit(1);
} else {
  console.log("\n所有模块引用与资源路径均可正确解析。");
}
