# 高等数学题库 · 可直接使用的桌面版

本轮以用户“继续设计可直接使用的题库程序”为目标，保留工作包中的题库、解析和网页功能，新增独立 Windows 桌面宿主。

## 使用

打开 `dist/高等数学题库-桌面版/高等数学题库.exe`。分发时压缩整个文件夹；解压后直接双击 exe。不能单独复制 exe，旁边的 web 文件夹、DLL 和 storage.js 必须完整保留。

适用 Windows 10/11 x64，需 .NET Framework 4.6.2 或更新版本和 Microsoft Edge WebView2 运行时。本机已安装运行时 154.0.4258.62。目标电脑没有运行时时需先安装微软运行时；运行题库不需要 Python、命令行或网络。

## 已可用

- 极限章节 40 道单选题、40 份解析、原题截图。
- 章节首页统一收纳现有内容到“极限”，预留小测二、三、四，尚未开放的小测不可点击。
- 部分考点默认限额 10 题，不足 10 题时刷实际可用题数；可调节自定义题量。
- 顶部显示“第1题/共10题”等实际进度；不限模式做完当前范围一遍后自动结算，全题库为 40 题，每题不重复。
- 范围筛选、随机或原序、逐题即时和整组延迟反馈、计时、快捷键。
- 结算报告、Markdown 报告导出、错题重刷、掌握度、深浅色外观。
- 原生窗口与自己的图标，红绿灯按钮对应关闭、最小化和最大化。
- 学习数据菜单可备份、恢复记录；恢复前自动保存本机快照。损坏备份拒绝导入。
- 有未结算作答时退出会提醒；本次练习需结算后才保存完整历史。

## 当前范围

当前只有极限章节。正式真题演练仍待完整试卷素材，AI 出题、OCR 和主观题判分尚未实现。交接文档中的未来规划不等于当前功能。

新桌面版记录保存在 `%LOCALAPPDATA%/GaoshuBank/Desktop/WebView2`。旧浏览器版记录属于不同浏览器配置与来源，不会自动迁入；旧记录也不会被删除。卸载或更换软件文件夹不影响新桌面版记录，清理此数据目录则会删除记录。备份 JSON 可以在同版本桌面软件中恢复。

## 技术选择

采用 Windows Forms + 微软官方 WebView2 SDK 1.0.3650.58，SDK 从 NuGet 官方源获取，DLL 一起分发。网页题库仍没有新增 npm、pip 或 CDN 依赖。

通过 `SetVirtualHostNameToFolderMapping` 把固定来源 `https://gaoshu.local` 映射到本地 web 文件夹；这是本机映射，不请求这个域名，也不启动 HTTP 服务。固定来源保证软件重启或搬动后存储仍可用。宿主拒绝外部资源请求、外部导航、弹出窗口及权限请求。窗口关闭会 Dispose WebView2 并退出宿主，不保留本地服务。

这里没有沿用手写 ctypes COM 接口：当前机器可以获取官方 SDK，且已有 .NET Framework 编译器，使用微软维护的控件可减少 COM 生命周期和 DPI 适配风险。交接文档中的“无网络、只有 PyInstaller”等约束属于此前开发环境的记录，在本机已重新核实。

原 Python 入口保留用于历史参考，不是新桌面版运行入口；若 WebView2 初始化失败，原生窗口展示具体错误并写启动日志，不再降级到要求用户复制网址的控制窗口。

## 重新构建

在 Windows PowerShell 或 PowerShell 7 中执行 `desktop/build.ps1`。脚本使用 Windows 自带 Framework64 编译器，不安装工具链。SDK 放在 `desktop/vendor/1.0.3650.58`，缺失时从以下官方地址下载并解压：

https://api.nuget.org/v3-flatcontainer/microsoft.web.webview2/1.0.3650.58/microsoft.web.webview2.1.0.3650.58.nupkg

重新构建会覆盖同名桌面版产物。微软 DLL 的许可证和 NOTICE 一并分发。

## 验收

`高等数学题库.exe --self-test <验收目录>` 使用隔离的数据目录进行真实 WebView2 测试，生成页面截图及 result.json。它不会读取或修改正常使用的学习记录。连续运行两次会验证跨重启记录保留。

保留的五套网页自检也已执行：题库构建 40/40、独立重解比对分歧 0；引用检查 0 问题；公式渲染 568 项、CSS 契约 10/10；页面流程 31 项通过；LaTeX 扫描 0 致命问题、2 项原有提示。原始数据 41 个文件逐一哈希比对，改动 0 个。这是工作包既有验证结果的复测，不代表本轮重新人工解答全部题目。

参考：

- https://learn.microsoft.com/en-us/microsoft-edge/webview2/concepts/working-with-local-content
- https://learn.microsoft.com/en-us/microsoft-edge/webview2/concepts/distribution
