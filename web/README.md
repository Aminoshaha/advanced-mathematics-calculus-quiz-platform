# 高等数学题库 · 本地版

零依赖的本地题库应用。macOS 风格界面，覆盖「极限」章节 **40 道单选题**（含逐题解析）。

---

## 快速开始

```bash
cd web

# 1) 启动（会自动打开浏览器）
python serve.py

# 2) 或者不自动开浏览器
python serve.py --no-open
```

打开 **http://127.0.0.1:8777/**

> **必须用 `python serve.py` 起服务，不能直接双击 index.html。**
> 浏览器禁止 `file://` 下加载 ES module，直接打开会白屏。
>
> `python` 用系统自带或任意 3.8+ 均可，**没有任何第三方依赖，不需要 pip install**。

---

## 不想用命令行？直接跑 exe

打包好的桌面版在 `gaoshu-bank/dist/`：

| 产物 | 说明 |
|---|---|
| **`高等数学题库-便携版.zip`** | **推荐**。解压后双击里面的 `高等数学题库.exe` 即用 |
| `高等数学题库/` | 上面那个 zip 解压后的样子（不用解压也能直接跑） |
| `高等数学题库.exe` | 单文件版，双击即用，但要先解压到临时目录，启动稍慢 |

双击后的体验：**直接开一个独立的软件窗口** —— 没有地址栏、没有标签页、没有书签栏，
窗口标题就是「高等数学题库」，**关闭窗口即退出程序**。
不需要 Python，不需要命令行，完全离线。

窗口由系统自带的 Edge（或 Chrome）的**应用模式**承载，使用独立配置目录
（`%LOCALAPPDATA%\GaoshuBank\profile`），不会碰到你自己的收藏、历史、登录状态。

### 启动链路与降级

按下面顺序尝试，任何一步失败都会退到下一步，**保证双击后一定有东西可用**：

| 顺序 | 方式 | 何时使用 |
|---|---|---|
| 1 | **应用模式独立窗口** | 默认路径 |
| 2 | 默认浏览器 + tkinter 控制窗口 | 找不到 Chromium 内核浏览器，或窗口 15 秒内没加载出页面 |
| 3 | 纯后台服务 | 连窗口都建不出来（极少见） |

判定「窗口成功」看的是**服务器是否真的收到过页面请求**，而不是进程活了多久 ——
浏览器可能活了几秒，却因为被安全策略拦住而从未加载页面。

其余细节：

- **单实例**：重复双击不会开出第二个，而是提示「已经在运行了」
  （`%LOCALAPPDATA%\GaoshuBank\instance.lock` 独占锁）
- **换题库不用重新打包**：exe 同目录放一个 `web/` 文件夹就会优先用它
- **数据目录可覆盖**：环境变量 `GAOSHU_DATA_DIR`

命令行开关（一般用不到）：

```
--port N        指定端口
--headless      纯后台服务，不开界面（打包自检用的就是这个）
--no-open       保持服务但不打开界面
--control       强制使用 tkinter 控制窗口
--browser PATH  指定用作窗口载体的浏览器
--allow-multi   允许多开
```

### 一个外观取舍

应用模式窗口的任务栏图标是 **Edge/Chrome 的图标**，不是本程序的 ∫ 图标
（窗口标题与页面内容是本程序的）。要换成自己的图标得自己写 WebView2 宿主，
那需要 WebView2 SDK 的 loader 组件，当前环境不具备。

### 自己重新打包

```powershell
# 目录版（推荐，启动快、兼容性最好）
pwsh -File exe\build.ps1 -Onedir

# 单文件版
pwsh -File exe\build.ps1

# 跳过打包后的自检
pwsh -File exe\build.ps1 -Onedir -SkipCheck
```

脚本会自动：找带 PyInstaller 的 Python → 打图标与版本信息 → 打包 → 起服务自检资源与 MIME → 目录版再压成 zip。

> **Windows PowerShell 注意事项**
>
> 1. 脚本是 UTF-8 **带 BOM** 的。本机代码页是 936（GBK），若存成无 BOM 的 UTF-8，
>    PowerShell 5.1 会按 GBK 解析，中文字节会被误读成语法符号而报一堆莫名其妙的解析错误。
>    **改完这个脚本记得保留 BOM。**
> 2. 默认执行策略会拒绝运行未签名脚本，用
>    `Set-ExecutionPolicy -Scope Process Bypass` 或 `pwsh -ExecutionPolicy Bypass -File` 绕过。
>
> **关于单文件版的已知问题**：本机 PyInstaller 用的是 conda 里的 Python 3.8，
> 打出的单文件版在受限环境（如本项目的开发沙箱）中启动时会报
> `Failed to extract ...: fopen: Permission denied` —— 原因是单文件版要把内容解压到
> 临时目录，而沙箱禁止被拉起的进程写文件（已实测：`_MEI` 目录能建、里面文件数为 0）。
> **正常桌面上不受此限制**，若你双击报错，改用目录版即可。

---

## 功能

| 页面 | 状态 | 说明 |
|---|---|---|
| **题库刷题** | 完成 | 两种反馈模式、按知识点选题、不限题量、随时结算 |
| **错题本** | 完成 | 自动收集、区分「待订正 / 已订正」、一键重刷 |
| **掌握度** | 完成 | 按知识点统计正确率、练习历史 |
| **素材库** | 完成 | 原始截图与转录结果对照，可看大图 |
| **真题演练** | 待素材 | 需先导入成套试卷（含分值结构与官方答案） |

### 刷题的两种反馈模式

- **逐题即时**：选完立刻出答案 + 分步解析 + 干扰项溯源 + 易错提醒
- **整组延迟**：一组（默认 5 题）全部答完后，才给正确率与逐题解析

从章节首页进入“极限”。选择部分考点时默认**限额 10 题**，不足 10 题时使用实际题量，可自定义上限。“不限”表示当前范围全部题目各刷一次，全题库共 40 题；顶部显示“第1题/共40题”，最后一题作答后自动结算。也可提前点“结束并结算”生成错题与解析报告。

结算报告含：环形正确率、知识点表现条、错题清单（你的答案 / 正确答案 / 分步解析 / 干扰项分析）、
可一键导出 Markdown 错题本。

**键盘操作**：`A/B/C/D` 或 `1/2/3/4` 作答，`Enter` 进入下一题。

### 结算页的增长动画

- **环形正确率**：从 12 点位置顺时针生长（`stroke-dashoffset` 从整周递减到目标值）
- **百分比数字**：与环形同步滚动（ease-out）
- **知识点进度条**：从 0 逐条长出，按 60ms 错峰形成级联
- **条上的百分比**：与进度条同步滚动

实现要点（改这块前务必看 `js/ui.js` 的 `animateTo`）：CSS `transition` 只在**计算样式发生变化**时触发。
本项目视图是「先离屏构建、再整体插入」的，所以必须

1. 先写入初始值（0）
2. 强制一次样式计算
3. **双重 `requestAnimationFrame`** 后再写终值

少了第 3 步，元素会带着终值一次性出现，动画静默失效。`tex-check.mjs` 里有两条
CSS 契约（`.ring__val` 的 `stroke-dashoffset` 过渡、`.kp-row__fill` 的 `width` 过渡）
专门防止这条链路被改坏，`render-check.mjs` 则断言「初始必须是 0、动画结束后必须到达终值」。

系统开启「减少动态效果」时会自动关闭这些动画（见 `app.css` 末尾的
`prefers-reduced-motion` 段与 `ui.js` 的 `reducedMotion()`），终值直接生效，不会卡在 0。

---

## 数据来源与可信度

题库由**答题 App 小测截图**转录而来，原素材 50 张图：

- 其中 **Test4 的 10 张图与 Test1 逐字节完全相同**（MD5 一致），是重复卷，已排除
- 故实际唯一题目为 **40 道**，全部为单选题，每题 10 分

质量保障（三道关）：

1. **逐字段转录**：题干、四个选项、我的答案、正确答案、知识点标签全部结构化
2. **独立重解交叉验证**：另一轮 agent 在读原图的前提下**独立求解**每道题，再与官方答案比对
   —— **40 题全部分歧为 0**
3. **原图可回溯**：每道题的解析页都能展开「查看原题截图」，与原始小测逐字核对

> 数据是可信的，但**原始小测本身**的答案未做独立数学证明（本机无网络装不了 SymPy）。
> 若发现某题存疑，以原图为准。

---

## 目录结构

```
web/
├─ index.html              macOS 窗口外壳
├─ serve.py                零依赖静态服务器
├─ build.py                题库构建（raw → questions.js）+ 质检报告
├─ package.json            仅声明 type=module 供 Node 工具脚本使用，无 npm 依赖
├─ assets/
│  ├─ macos.css            macOS 设计系统（窗口/控件/深浅色）
│  ├─ app.css              页面布局与数学公式排版
│  └─ source/TestN/        40 张原始截图（供「查看原题」）
├─ js/
│  ├─ tex.js               ★ 自研迷你 LaTeX 渲染器（无网络，用不了 KaTeX）
│  ├─ util.js              工具函数
│  ├─ ui.js                图标、提示、模态、共享组件
│  ├─ store.js             题库、会话引擎、错题本、掌握度（纯状态，无 DOM）
│  ├─ app.js               应用外壳：窗口、侧边栏、路由
│  └─ views/
│     ├─ practice.js       配置页 + 答题页 + 解析面板
│     ├─ report.js         结算报告 + 错题本
│     └─ others.js         掌握度 + 素材库 + 真题演练
├─ data/
│  ├─ questions.js         构建产物（前端加载）
│  └─ raw/
│     ├─ questions.json    题目主表
│     └─ analysis/*.json   逐题解析（含核对结论）
└─ tools/
   ├─ links-check.mjs       静态引用路径检查（import / HTML 资源 / 原图）
   ├─ tex-check.mjs         渲染回归 + 可见文本残留检查 + CSS 基线契约
   ├─ render-check.mjs      端到端渲染冒烟测试（自建 DOM 桩）
   ├─ scan-latex.py         源数据 LaTeX 残留扫描（分级：致命 / 提示）
   ├─ show-render.mjs       定点查看某道题的渲染结果（排错用）
   └─ math-fixture.html     公式排版测试页（含客观基线测量，用浏览器打开）
```

---

## 开发与自检

```bash
# 改完题目数据后重新构建（会打印质检报告）
python build.py

# ① 引用路径检查：所有 import / import() / HTML 资源路径能否真实解析
node tools/links-check.mjs

# ② 渲染回归：全量公式渲染 + 可见文本残留检查 + CSS 基线契约
node tools/tex-check.mjs

# ③ 端到端冒烟测试：真实执行整条刷题流程（自建 DOM 桩，无需浏览器）
node tools/render-check.mjs

# ④ 源数据 LaTeX 残留扫描（分级：致命 / 提示）
python tools/scan-latex.py

# 一键全跑
npm run check

# 排错：定点看某道题渲染后的可见文字，一眼看出哪段漏了记号
node tools/show-render.mjs T1-10
node tools/show-render.mjs T1-10 步骤
```

五个脚本都会在发现问题时返回非零退出码。

> **为什么需要 ②「可见文本残留检查」**：只检查「未识别的命令」是不够的。
> 有些 LaTeX 写法能一路渲染成**字面文本**——例如分段函数里的换行带间距
> `\\[2pt]`，若解析器只按 `\\` 切行，`[2pt]` 会被留给下一行，方括号又被丢弃，
> 页面上就出现 `2pt0` 这种字样。这类问题只有把渲染结果里的**可见文字**取出来
> 检查单位残留（pt/em/ex/mu）才能抓到。

> **为什么需要 ①**：ES module 的动态 `import()` 相对路径是相对**模块自身**解析的，
> 不是相对页面。曾经 `js/app.js` 里写成 `./data/questions.js`，
> 被解析成 `/js/data/questions.js` → 404 → 首屏直接报错。
> 「用 HTTP 检查单个 URL 是否 200」发现不了这类问题，必须反过来验证
> 「代码里引用的每个路径是否真实存在」。

### 公式排版测试页

```
http://127.0.0.1:8777/tools/math-fixture.html
```

把各类公式放进真实的行高环境里对照，并**实测**每个结构的基线偏移量
（用 `getBoundingClientRect` 量，不是靠肉眼）。改动任何与公式对齐相关的 CSS 后，
用它确认没有跑偏。页面底部「五、客观测量」会列出每项的偏移值与判定。

> 页面还并排展示了「行内分式缩小到 0.86em」的备选方案（TeX 的 `\tfrac` 思路）。
> 如果觉得行内分式偏大、行距被撑得偏高，可以把这个方案提到正式样式里。

### 修改/扩充题目

1. 编辑 `data/raw/questions.json`（题目主表）
2. 在 `data/raw/analysis/` 下增删对应的 `<题号>.json`（解析）
3. 跑 `python build.py` 重新打包

题目 schema：

```jsonc
{
  "id": "T1-01",
  "testNo": 1, "index": 1,
  "src": "Test1/Test1-1.jpg",     // 相对 assets/source/ 的路径
  "score": 10,
  "stemLatex": "极限 $\\lim_{x \\to \\infty} ...$ 等于",  // 中文与 $LaTeX$ 混排
  "options": [{ "key": "A", "latex": "2" }, ...],
  "myAnswer": "A",                 // 原始小测里我选的
  "correctAnswer": "A",
  "knowledgePoints": ["等价替换"],
  "kpSource": "app"                // app=截图标签原文 / inferred=按题干推断
}
```

解析 schema：

```jsonc
{
  "id": "T1-01",
  "verdict": "ok",                 // ok | disagree（独立重解与官方答案不一致）
  "selfAnswer": "A", "officialAnswer": "A",
  "transcriptionIssues": [],       // 与截图不一致之处
  "keyIdea": "一句话点明核心方法",
  "steps": [{ "title": "第一步：…", "content": "…" }],
  "optionNotes": [{ "key": "B", "note": "为什么会选到 B" }],
  "pitfalls": "本题最典型的错误"
}
```

---

## 关于 LaTeX 渲染器

本机无网络，装不了 KaTeX / MathJax，因此 `js/tex.js` 是一个**自研的 LaTeX 子集渲染器**，
覆盖高等数学题库实际用到的结构：

分式、根号（含 n 次根）、极限/求和的上下标、上下标堆叠、分段函数大括号、
希腊字母、函数名直立、关系符、`\mathbb`、`\xrightarrow{}`/`\xlongequal{}` 堆叠标注、
`\bigl \bigr` 尺寸定界符等。

未识别的命令会降级为去掉反斜杠的字面文本并标橙色，**不会抛错**。
`tools/tex-check.mjs` 会对全量公式做回归，确保没有降级项。

> 后续若恢复网络，可以平滑替换为 KaTeX：只需改 `js/tex.js` 的 `Tex.text/math` 两个入口，
> 上层视图不用动。

---

## 已知限制

- **真题演练未接通**：需要成套试卷素材（PDF/图片 + 官方答案 + 每题分值）
- **AI 出题未接通**：需要网络与 DeepSeek API Key
- **无 SymPy 符号验证**：需要 `pip install sympy`，当前环境无网络
- 原素材若补上真正的 Test4，题库可从 40 题扩充到 50 题
