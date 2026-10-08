// 高数题库桌面宿主：官方 WebView2 控件，直接读取本地资源，不开端口。
using System;
using System.IO;
using System.Drawing;
using System.Diagnostics;
using System.Threading;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Web.Script.Serialization;
using Microsoft.Web.WebView2.Core;
using Microsoft.Web.WebView2.WinForms;

static class Program
{
    public static readonly string Root = AppDomain.CurrentDomain.BaseDirectory;
    public static string TestDir;
    public static string DataDir;
    public static int ExitCode;

    [STAThread]
    static int Main(string[] args)
    {
        for (int i = 0; i < args.Length; i++)
            if (args[i] == "--self-test" && i + 1 < args.Length) TestDir = Path.GetFullPath(args[++i]);
        DataDir = TestDir == null
            ? Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), "GaoshuBank", "Desktop")
            : Path.Combine(TestDir, "profile");
        Directory.CreateDirectory(DataDir);
        if (TestDir != null) Directory.CreateDirectory(TestDir);
        bool created;
        using (var mutex = new Mutex(true, TestDir == null ? "Local\\GaoshuBank.WebView2.Desktop" : "Local\\GaoshuBank.Test." + Process.GetCurrentProcess().Id, out created))
        {
            if (!created)
            {
                MessageBox.Show("高数题库已经打开，请从任务栏切换到题库窗口。", "高等数学题库");
                return 0;
            }
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);
            Application.ThreadException += delegate(object sender, System.Threading.ThreadExceptionEventArgs e) { Log(e.Exception.ToString()); };
            try { Application.Run(new BankWindow()); }
            catch (Exception ex) { Log(ex.ToString()); ExitCode = 1; MessageBox.Show("启动失败，请查看启动日志。\n" + ex.Message, "高等数学题库"); }
        }
        return ExitCode;
    }

    public static void Log(string text)
    {
        try { File.AppendAllText(Path.Combine(DataDir, "启动日志.txt"), DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss.fff") + " " + text + Environment.NewLine); }
        catch { }
    }
}

sealed class BankWindow : Form
{
    WebView2 view;
    Label status;
    readonly JavaScriptSerializer json = new JavaScriptSerializer { MaxJsonLength = 16 * 1024 * 1024 };
    bool closingApproved;
    bool checkingClose;
    bool testingStarted;
    bool testDone;
    System.Windows.Forms.Timer testTimeout;
    string webRoot = Path.Combine(Program.Root, "web");

    public BankWindow()
    {
        Text = "高等数学题库";
        StartPosition = FormStartPosition.CenterScreen;
        float scale;
        using (var graphics = CreateGraphics()) scale = graphics.DpiX / 96f;
        var workArea = Screen.FromControl(this).WorkingArea;
        Size = new Size(Math.Min((int)(1180 * scale), workArea.Width - 60), Math.Min((int)(820 * scale), workArea.Height - 60));
        MinimumSize = new Size(Math.Min((int)(820 * scale), workArea.Width - 60), Math.Min((int)(620 * scale), workArea.Height - 60));
        AutoScaleMode = AutoScaleMode.Dpi;
        BackColor = Color.FromArgb(245, 245, 247);
        string icon = Path.Combine(Program.Root, "app.ico");
        if (File.Exists(icon)) Icon = new Icon(icon);
        var menu = new MenuStrip();
        var data = new ToolStripMenuItem("学习数据");
        data.DropDownItems.Add("备份学习记录…", null, async delegate { await Backup(); });
        data.DropDownItems.Add("恢复学习记录…", null, async delegate { await Restore(); });
        data.DropDownItems.Add("打开数据文件夹", null, delegate { Process.Start("explorer.exe", Program.DataDir); });
        menu.Items.Add(data);
        menu.Items.Add(new ToolStripMenuItem("使用说明", null, delegate { MessageBox.Show("离线题库 · 极限章节 · 40 道单选题\n\n选择练习范围和反馈模式，点击「开始刷题」。\nA/B/C/D 或 1/2/3/4 选择答案，Enter 继续。\n练习后点击「结束并结算」保存报告。\n错题与掌握度自动保存在本机，可从「学习数据」菜单备份。\n\n当前不包含 AI 出题和正式真题试卷；真题演练待补充素材。", "使用说明"); }));
        MainMenuStrip = menu;
        status = new Label { Dock = DockStyle.Fill, Text = "正在打开高数题库…", TextAlign = ContentAlignment.MiddleCenter, Font = new Font("Microsoft YaHei UI", 13) };
        Controls.Add(status);
        Controls.Add(menu);
        Shown += async delegate { await Initialize(); };
        FormClosing += OnClosing;
        FormClosed += delegate { if (testTimeout != null) testTimeout.Dispose(); if (view != null) view.Dispose(); };
    }

    async Task Initialize()
    {
        try
        {
            Program.Log("启动桌面窗口");
            if (!File.Exists(Path.Combine(webRoot, "index.html"))) throw new FileNotFoundException("缺少题库资源，请完整解压整个软件文件夹。");
            CoreWebView2Environment.GetAvailableBrowserVersionString();
            view = new WebView2 { Dock = DockStyle.Fill, DefaultBackgroundColor = BackColor };
            Controls.Add(view);
            view.BringToFront();
            MainMenuStrip.BringToFront();
            var options = new CoreWebView2EnvironmentOptions("--disable-background-networking --disable-component-update --no-first-run");
            var env = await CoreWebView2Environment.CreateAsync(null, Path.Combine(Program.DataDir, "WebView2"), options);
            if (IsDisposed) return;
            await view.EnsureCoreWebView2Async(env);
            if (IsDisposed) return;
            var core = view.CoreWebView2;
            core.SetVirtualHostNameToFolderMapping("gaoshu.local", webRoot, CoreWebView2HostResourceAccessKind.DenyCors);
            core.Settings.AreDefaultContextMenusEnabled = false;
            core.Settings.AreDevToolsEnabled = Program.TestDir != null;
            core.Settings.IsStatusBarEnabled = false;
            core.Settings.IsZoomControlEnabled = true;
            core.Settings.AreHostObjectsAllowed = false;
            core.PermissionRequested += delegate(object s, CoreWebView2PermissionRequestedEventArgs e) { e.State = CoreWebView2PermissionState.Deny; };
            core.NewWindowRequested += delegate(object s, CoreWebView2NewWindowRequestedEventArgs e) { e.Handled = true; };
            core.NavigationStarting += delegate(object s, CoreWebView2NavigationStartingEventArgs e) { if (!IsLocal(e.Uri)) e.Cancel = true; };
            // 拦截联网请求，确保题库不依赖网络，也不把本地数据发送出去。
            core.AddWebResourceRequestedFilter("*", CoreWebView2WebResourceContext.All);
            core.WebResourceRequested += delegate(object s, CoreWebView2WebResourceRequestedEventArgs e)
            {
                var uri = e.Request.Uri;
                if (!IsLocal(uri) && !uri.StartsWith("blob:") && !uri.StartsWith("data:"))
                    e.Response = env.CreateWebResourceResponse(new MemoryStream(), 403, "Offline", "Content-Type: text/plain");
            };
            core.WebMessageReceived += OnMessage;
            if (Program.TestDir != null) core.DownloadStarting += delegate(object s, CoreWebView2DownloadStartingEventArgs e)
            {
                e.ResultFilePath = Path.Combine(Program.TestDir, "导出错题报告.md");
                e.Handled = true;
                var download = e.DownloadOperation;
                download.StateChanged += async delegate
                {
                    if (download.State == CoreWebView2DownloadState.Completed)
                        await core.ExecuteScriptAsync("window.__downloadDone = true;");
                    else if (download.State == CoreWebView2DownloadState.Interrupted)
                        FailTest("Report download interrupted: " + download.InterruptReason);
                };
            };
            await core.AddScriptToExecuteOnDocumentCreatedAsync(File.ReadAllText(Path.Combine(Program.Root, "storage.js")));
            core.ProcessFailed += delegate(object s, CoreWebView2ProcessFailedEventArgs e)
            {
                Program.Log("WebView2 进程异常：" + e.ProcessFailedKind);
                if (Program.TestDir != null) { FailTest("WebView2 process failed"); return; }
                status.Text = "题库窗口遇到问题，请关闭软件后重新打开。学习记录仍保存在本机。";
                status.BringToFront();
            };
            await core.AddScriptToExecuteOnDocumentCreatedAsync(@"
                window.addEventListener('error', e => window.chrome.webview.postMessage({type:'js-error', text:e.message || 'resource error'}));
                window.addEventListener('unhandledrejection', e => window.chrome.webview.postMessage({type:'js-error', text:String(e.reason)}));
                document.addEventListener('DOMContentLoaded', () => {
                  const style = document.createElement('style');
                  style.textContent = 'html,body{width:100%;height:100%;margin:0;padding:0!important;overflow:hidden}body{display:block!important}.window{inset:0!important;width:100%!important;height:100%!important;max-width:none!important;max-height:none!important;border-radius:0!important;border:0!important;box-shadow:none!important}';
                  document.head.append(style);
                  for(const [selector, command] of [['.tl--close','close'],['.tl--min','minimize'],['.tl--zoom','maximize']]) {
                    const button = document.querySelector(selector);
                    if(button) button.addEventListener('click', e => { e.preventDefault(); e.stopImmediatePropagation(); window.chrome.webview.postMessage({type:command}); }, true);
                  }
                });");
            core.NavigationCompleted += async delegate(object s, CoreWebView2NavigationCompletedEventArgs e)
            {
                if (!e.IsSuccess)
                {
                    Program.Log("页面加载失败：" + e.WebErrorStatus);
                    if (Program.TestDir != null) FailTest("Navigation failed: " + e.WebErrorStatus);
                    else { status.Text = "题库页面加载失败，请重新打开程序。"; status.BringToFront(); }
                    return;
                }
                status.Hide();
                Program.Log("本地页面加载完成");
                if (Program.TestDir != null && !testingStarted)
                {
                    testingStarted = true;
                    await core.ExecuteScriptAsync(File.ReadAllText(Path.Combine(Program.Root, "self-test.js")));
                }
            };
            if (Program.TestDir != null)
            {
                testTimeout = new System.Windows.Forms.Timer { Interval = 90000 };
                testTimeout.Tick += delegate { FailTest("Test timed out"); };
                testTimeout.Start();
            }
            core.Navigate("https://gaoshu.local/index.html");
        }
        catch (Exception ex)
        {
            Program.Log(ex.ToString());
            if (Program.TestDir != null) { FailTest(ex.ToString()); return; }
            if (view != null) { view.Dispose(); view = null; }
            status.Text = "无法打开题库窗口\n" + ex.Message + "\n\n请检查软件文件是否完整，以及 Microsoft Edge WebView2 运行时是否安装。";
            status.BringToFront();
        }
    }

    static bool IsLocal(string uri)
    {
        Uri parsed;
        return Uri.TryCreate(uri, UriKind.Absolute, out parsed) && parsed.Scheme == "https" && parsed.Host == "gaoshu.local";
    }

    async void OnMessage(object sender, CoreWebView2WebMessageReceivedEventArgs e)
    {
        if (!IsLocal(e.Source)) return;
        var message = json.Deserialize<System.Collections.Generic.Dictionary<string, object>>(e.WebMessageAsJson);
        var type = Convert.ToString(message["type"]);
        if (type == "close") Close();
        else if (type == "minimize") WindowState = FormWindowState.Minimized;
        else if (type == "maximize") WindowState = WindowState == FormWindowState.Maximized ? FormWindowState.Normal : FormWindowState.Maximized;
        else if (type == "js-error")
        {
            Program.Log("页面错误：" + Convert.ToString(message["text"]));
            if (Program.TestDir != null) FailTest("JavaScript error: " + Convert.ToString(message["text"]));
        }
        else if (type == "capture" && Program.TestDir != null)
        {
            string name = Path.GetFileName(Convert.ToString(message["name"]));
            using (var file = File.Create(Path.Combine(Program.TestDir, name + ".png")))
                await view.CoreWebView2.CapturePreviewAsync(CoreWebView2CapturePreviewImageFormat.Png, file);
            await view.CoreWebView2.ExecuteScriptAsync("window.__captureDone = true;");
        }
        else if (type == "test-done" && Program.TestDir != null)
        {
            testDone = true;
            File.WriteAllText(Path.Combine(Program.TestDir, "result.json"), e.WebMessageAsJson);
            Program.Log("桌面端测试通过");
            closingApproved = true;
            Close();
        }
        else if (type == "test-failed" && Program.TestDir != null) FailTest(Convert.ToString(message["text"]));
    }

    void FailTest(string text)
    {
        if (testDone) return;
        testDone = true;
        Program.ExitCode = 1;
        File.WriteAllText(Path.Combine(Program.TestDir, "result.json"), json.Serialize(new { success = false, error = text }));
        closingApproved = true;
        Close();
    }

    async void OnClosing(object sender, FormClosingEventArgs e)
    {
        if (closingApproved || view == null || view.CoreWebView2 == null) return;
        e.Cancel = true;
        if (checkingClose) return;
        checkingClose = true;
        try
        {
            // 导入与页面相同的状态模块，检查未结算作答，避免误关闭丢失本次练习。
            // ExecuteScriptAsync 不会等待 Promise；另用同步状态标记轮询。
            await view.CoreWebView2.ExecuteScriptAsync("window.__closePending = null; import('./js/store.js').then(m => {const s=m.session.active; window.__closePending=!!(s && !s.finished && s.attempts.length)}).catch(()=>window.__closePending=false)");
            string value = "null";
            for (int i = 0; i < 20 && value == "null"; i++) { await Task.Delay(50); value = await view.CoreWebView2.ExecuteScriptAsync("window.__closePending"); }
            if (value == "null" || value == "true")
                if (MessageBox.Show("本次练习还没有结算。关闭会丢弃本次未结算作答，已保存的错题和历史不受影响。\n\n仍要退出吗？", "退出题库", MessageBoxButtons.YesNo, MessageBoxIcon.Question) != DialogResult.Yes) return;
            closingApproved = true;
            Close();
        }
        catch (Exception ex) { Program.Log(ex.ToString()); closingApproved = true; Close(); }
        finally { checkingClose = false; }
    }

    async Task Backup()
    {
        if (view == null || view.CoreWebView2 == null) return;
        using (var dialog = new SaveFileDialog { Filter = "学习记录备份 (*.json)|*.json", FileName = "高数学习记录-" + DateTime.Now.ToString("yyyyMMdd") + ".json" })
        {
            if (dialog.ShowDialog(this) != DialogResult.OK) return;
            try
            {
                string script = "window.gaoshuBackup.export()";
                string result = await view.CoreWebView2.ExecuteScriptAsync(script);
                File.WriteAllText(dialog.FileName, json.Deserialize<string>(result), System.Text.Encoding.UTF8);
                MessageBox.Show("学习记录已备份。", "高等数学题库");
            }
            catch (Exception ex) { MessageBox.Show("备份失败：" + ex.Message, "高等数学题库"); }
        }
    }

    async Task Restore()
    {
        if (view == null || view.CoreWebView2 == null) return;
        using (var dialog = new OpenFileDialog { Filter = "学习记录备份 (*.json)|*.json" })
        {
            if (dialog.ShowDialog(this) != DialogResult.OK) return;
            try
            {
                if (new FileInfo(dialog.FileName).Length > 16 * 1024 * 1024) throw new Exception("备份文件过大。");
                string raw = File.ReadAllText(dialog.FileName);
                string validation = await view.CoreWebView2.ExecuteScriptAsync("window.gaoshuBackup.validate(" + json.Serialize(raw) + ")");
                if (validation != "true") throw new Exception("不是有效的高数题库备份文件。");
                if (MessageBox.Show("恢复会替换当前学习记录并重新载入页面。未结算练习将丢失。\n\n建议先备份当前记录。继续恢复吗？", "恢复学习记录", MessageBoxButtons.YesNo, MessageBoxIcon.Question) != DialogResult.Yes) return;
                // 恢复前自动留一份完整本地快照。
                string snapshot = await view.CoreWebView2.ExecuteScriptAsync("window.gaoshuBackup.export()");
                File.WriteAllText(Path.Combine(Program.DataDir, "恢复前快照-" + DateTime.Now.ToString("yyyyMMdd-HHmmss") + ".json"), json.Deserialize<string>(snapshot));
                string result = await view.CoreWebView2.ExecuteScriptAsync("window.gaoshuBackup.restore(" + json.Serialize(raw) + ")");
                if (result != "true") throw new Exception("存储写入失败，已回退原有记录。");
                view.CoreWebView2.Reload();
            }
            catch (Exception ex) { MessageBox.Show("恢复失败：" + ex.Message, "高等数学题库"); }
        }
    }
}
