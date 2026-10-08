# -*- coding: utf-8 -*-
"""
高等数学题库 · 桌面版入口

把本地题库打包成一个双击即用的 exe：
  · 内置零依赖 HTTP 服务器，提供 web/ 下的页面、脚本、题库数据与原始截图
  · 用 Chromium 的「应用模式」开一个独立窗口 —— 没有地址栏、没有标签页，
    窗口标题就是「高等数学题库」，关闭窗口即退出程序（双击即可用的观感）
  · 找不到 Chromium 内核浏览器时，退回「默认浏览器 + tkinter 控制窗口」模式

资源查找顺序（便于日后不改程序就更新题库）：
  1. exe 同目录下的 web/          —— 有就用它，可以直接替换题库
  2. 打包进 exe 内部的 web/       —— PyInstaller 解压到 sys._MEIPASS

命令行参数（主要供自检使用）：
  --port N       指定端口
  --headless     纯后台服务，不开任何界面
  --no-open      保持服务但不打开界面
  --control      强制使用旧的 tkinter 控制窗口
  --browser P    指定用作窗口载体的浏览器可执行文件
  --allow-multi  跳过单实例限制
"""

import argparse
import http.server
import os
import socketserver
import subprocess
import sys
import threading
import time
import webbrowser

APP_TITLE = "高等数学题库"
APP_SUBTITLE = "极限章节 · 40 道单选 · 逐题解析"
APP_ID = "GaoshuBank"          # %LOCALAPPDATA% 下的数据目录名
DEFAULT_PORT = 8777


def say(msg):
    """--noconsole 模式下 sys.stdout 可能是 None，print 会抛异常"""
    if sys.stdout is None:
        return
    try:
        print(msg)
        sys.stdout.flush()
    except Exception:
        pass


# ---------------------------------------------------------------- 启动日志
# --noconsole 的 exe 没有控制台，出错时什么都留不下。把关键决策写进文件，
# 出问题时有据可查（日志在数据目录下，每次启动重写）。

_LOG_PATH = [None]


def log_path():
    if _LOG_PATH[0] is None:
        _LOG_PATH[0] = os.path.join(app_data_dir(), "启动日志.txt")
    return _LOG_PATH[0]


def log(msg):
    line = "%s  %s" % (time.strftime("%H:%M:%S"), msg)
    say(line)
    try:
        with open(log_path(), "a", encoding="utf-8") as f:
            f.write(line + "\n")
    except Exception:
        pass


def log_reset():
    try:
        with open(log_path(), "w", encoding="utf-8") as f:
            f.write("%s 启动\n" % APP_TITLE)
            f.write("时间：%s\n" % time.strftime("%Y-%m-%d %H:%M:%S"))
            f.write("冻结运行：%s\n" % bool(getattr(sys, "frozen", False)))
            f.write("=" * 56 + "\n")
    except Exception:
        pass


# ---------------------------------------------------------------- 资源定位

def find_web_root():
    if getattr(sys, "frozen", False):
        exe_dir = os.path.dirname(os.path.abspath(sys.executable))
        beside = os.path.join(exe_dir, "web")
        if os.path.isdir(beside):
            return beside
        bundle = getattr(sys, "_MEIPASS", exe_dir)
        return os.path.join(bundle, "web")
    # 源码方式运行：本文件在 exe/ 下，web/ 在上一级
    here = os.path.dirname(os.path.abspath(__file__))
    return os.path.abspath(os.path.join(here, os.pardir, "web"))


def find_asset(name):
    """找一个只在内部分发的资源（例如图标）"""
    if getattr(sys, "frozen", False):
        bundle = getattr(sys, "_MEIPASS", os.path.dirname(os.path.abspath(sys.executable)))
        p = os.path.join(bundle, name)
        if os.path.exists(p):
            return p
    here = os.path.dirname(os.path.abspath(__file__))
    p = os.path.join(here, name)
    return p if os.path.exists(p) else None


# ---------------------------------------------------------------- HTTP 服务

class QuietHandler(http.server.SimpleHTTPRequestHandler):
    """
    禁用缓存 + 修正 MIME。
    修正 MIME 是必需的：Windows 注册表常把 .js 映射成 text/plain，
    浏览器会以错误的类型加载 ES module 而直接报错。
    """

    extensions_map = dict(http.server.SimpleHTTPRequestHandler.extensions_map)
    extensions_map.update({
        ".js": "text/javascript",
        ".mjs": "text/javascript",
        ".css": "text/css",
        ".json": "application/json",
        ".svg": "image/svg+xml",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".png": "image/png",
        ".webp": "image/webp",
        ".woff2": "font/woff2",
    })

    #: 是否已经成功响应过请求。
    #: 用来判断「窗口是不是真的把页面拉起来了」—— 比看进程存活时间可靠得多：
    #: 浏览器可能活了几秒却因为被策略拦住而从未加载页面。
    served = threading.Event()

    def do_GET(self):
        QuietHandler.served.set()
        http.server.SimpleHTTPRequestHandler.do_GET(self)

    def do_HEAD(self):
        QuietHandler.served.set()
        http.server.SimpleHTTPRequestHandler.do_HEAD(self)

    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate")
        self.send_header("Pragma", "no-cache")
        super().end_headers()

    def log_message(self, fmt, *args):
        pass  # 保持安静


class Server(socketserver.ThreadingTCPServer):
    allow_reuse_address = True
    daemon_threads = True


def start_server(web_root, port):
    handler = lambda *a, **kw: QuietHandler(*a, directory=web_root, **kw)
    httpd = Server(("127.0.0.1", port), handler)
    t = threading.Thread(target=httpd.serve_forever, name="http", daemon=True)
    t.start()
    return httpd


def start_available_server(web_root, preferred, span=30):
    """直接绑定候选端口，避免探测后释放端口造成竞态。"""
    for port in range(preferred, preferred + span):
        try:
            return start_server(web_root, port)
        except OSError:
            continue
    return start_server(web_root, 0)  # 由系统原子分配端口


# ---------------------------------------------------------------- 独立应用窗口

BROWSER_CANDIDATES = [
    (r"%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe", "Microsoft Edge"),
    (r"%ProgramFiles%\Microsoft\Edge\Application\msedge.exe", "Microsoft Edge"),
    (r"%ProgramFiles%\Google\Chrome\Application\chrome.exe", "Google Chrome"),
    (r"%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe", "Google Chrome"),
    (r"%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe", "Google Chrome"),
]


def list_browsers():
    """
    列出所有能承载「应用模式窗口」的 Chromium 内核浏览器，按优先顺序。
    返回 [(exe路径, 名称), ...]；可能为空。

    用应用模式（--app=）而不是自己写 WebView2 宿主：后者需要手写几百行
    ctypes COM 接口，且当前环境无法验证。应用模式零额外依赖。
    """
    found = []
    seen = set()
    for raw, name in BROWSER_CANDIDATES:
        path = os.path.expandvars(raw)
        if path and os.path.exists(path):
            key = os.path.normcase(path)
            if key not in seen:
                seen.add(key)
                found.append((path, name))

    # 常见路径都没有时，查注册表登记的安装位置
    try:
        import winreg
        keys = [
            (winreg.HKEY_LOCAL_MACHINE, r"SOFTWARE\Microsoft\Windows\CurrentVersion\App Paths\msedge.exe", "Microsoft Edge"),
            (winreg.HKEY_LOCAL_MACHINE, r"SOFTWARE\Microsoft\Windows\CurrentVersion\App Paths\chrome.exe", "Google Chrome"),
            (winreg.HKEY_CURRENT_USER, r"SOFTWARE\Microsoft\Windows\CurrentVersion\App Paths\chrome.exe", "Google Chrome"),
        ]
        for root, sub, name in keys:
            try:
                with winreg.OpenKey(root, sub) as k:
                    p = winreg.QueryValueEx(k, "")[0]
                if p and os.path.exists(p):
                    key = os.path.normcase(p)
                    if key not in seen:
                        seen.add(key)
                        found.append((p, name))
            except OSError:
                pass
    except Exception:
        pass
    return found


def find_browser():
    """兼容旧调用：返回首选浏览器"""
    lst = list_browsers()
    return lst[0] if lst else (None, None)


def app_data_dir():
    """
    数据目录，存放浏览器配置与单实例锁。
    默认 %LOCALAPPDATA%\\GaoshuBank；可用环境变量 GAOSHU_DATA_DIR 覆盖
    （受限环境或想放到别处时用）。
    """
    override = os.environ.get("GAOSHU_DATA_DIR")
    if override:
        try:
            os.makedirs(override, exist_ok=True)
            return override
        except OSError:
            pass

    base = os.environ.get("LOCALAPPDATA") or os.path.expanduser("~")
    d = os.path.join(base, APP_ID)
    try:
        os.makedirs(d, exist_ok=True)
        return d
    except OSError:
        d = os.path.join(os.path.expanduser("~"), "." + APP_ID)
        try:
            os.makedirs(d, exist_ok=True)
        except OSError:
            pass
        return d


def single_instance_lock():
    """
    用独占文件锁保证同时只有一个实例。

    这不只是为了整洁：应用窗口依赖 --user-data-dir 复用，若第二个实例
    把窗口「交接」给第一个实例后自己退出，它自己的服务器就没了，
    那个新窗口会变成打不开的空白页。锁住单实例可以彻底避开这个坑。

    返回：锁句柄（需保持引用）／ None 表示已有实例在跑 ／ True 表示无法加锁但不拦
    """
    try:
        import msvcrt
    except ImportError:
        return True  # 非 Windows，不做限制

    path = os.path.join(app_data_dir(), "instance.lock")
    try:
        f = open(path, "a+b")
    except OSError:
        return True
    try:
        f.seek(0)
        msvcrt.locking(f.fileno(), msvcrt.LK_NBLCK, 1)
        return f
    except OSError:
        f.close()
        return None


def screen_size():
    try:
        import ctypes
        u = ctypes.windll.user32
        return u.GetSystemMetrics(0), u.GetSystemMetrics(1)
    except Exception:
        return 1440, 900


def make_splash():
    """
    启动期间的小提示窗。首次启动要新建浏览器配置目录，可能好几秒没有反应，
    没有提示的话用户会以为没打开而反复双击。失败就返回 None，不影响主流程。
    """
    try:
        import tkinter as tk
    except Exception:
        return None
    try:
        s = tk.Tk()
        s.overrideredirect(True)          # 无边框，不出现在任务栏
        try:
            s.attributes("-topmost", True)
        except Exception:
            pass
        W, H = 340, 120
        sw, sh = screen_size()
        s.geometry("%dx%d+%d+%d" % (W, H, (sw - W) // 2, (sh - H) // 2))
        s.configure(bg="#1e1e1e")
        fam = pick_font()
        tk.Label(s, text=APP_TITLE, font=(fam, 14, "bold"),
                 bg="#1e1e1e", fg="#ffffff").pack(pady=(26, 6))
        tk.Label(s, text="正在启动…", font=(fam, 10),
                 bg="#1e1e1e", fg="#a1a1a6").pack()
        s.update()
        return s
    except Exception:
        return None


def close_splash(s):
    if s is None:
        return
    try:
        s.destroy()
    except Exception:
        pass


def run_app_window(browser, url, httpd):
    """
    以应用模式开独立窗口。返回 0 表示正常跑完；返回 None 表示启动失败，
    调用方应退回控制窗口模式。
    """
    profile = os.path.join(app_data_dir(), "profile")
    try:
        os.makedirs(profile, exist_ok=True)
    except OSError:
        profile = None

    sw, sh = screen_size()
    w = max(880, min(1440, int(sw * 0.86)))
    h = max(620, min(940, int(sw * 0.90)))

    cmd = [
        browser,
        "--app=" + url,
        "--no-first-run",
        "--no-default-browser-check",
        "--disable-background-mode",   # 关掉窗口后进程要能真正退出
        "--disable-sync",
        "--disable-default-apps",
        "--no-service-autorun",
        "--disable-component-update",
        "--disable-features=Translate,MediaRouter,OptimizationHints,msEdgeFirstRunExperience",
        "--window-size=%d,%d" % (w, h),
    ]
    # Edge 在部分机器上会「用兼容层重新拉起自己」，加上这个避免原进程秒退。
    # Chrome 不认识这个参数，只给 Edge。
    if "msedge" in os.path.basename(browser).lower():
        cmd.append("--edge-skip-compat-layer-relaunch")
    if profile:
        cmd.append("--user-data-dir=" + profile)  # 独立配置，不干扰用户自己的浏览器

    log("以独立窗口启动：%s（%dx%d）" % (os.path.basename(browser), w, h))
    log("  命令行：%s" % " ".join(cmd))
    QuietHandler.served.clear()

    splash = make_splash()
    try:
        proc = subprocess.Popen(cmd)
        log("  进程已创建，PID=%d" % proc.pid)
    except OSError as e:
        close_splash(splash)
        log("  启动进程失败：%s" % e)
        return None

    # 判定「窗口成功」的唯一依据是：服务器真的收到过页面请求。
    #
    # 不要因为「进程退出了」就提前放弃 —— Chromium 在 Windows 上会重新拉起自己
    # （兼容层/升级检查），原进程退出、新进程才加载页面；冷启动时这个间隔可能十几秒。
    # 之前设了「进程退出后再等 10 秒」的规则，会把这种情况误判成失败。
    deadline = time.time() + 25.0
    launched = False
    while time.time() < deadline:
        if splash is not None:
            try:
                splash.update()
            except Exception:
                splash = None
        if QuietHandler.served.is_set():
            launched = True
            break
        time.sleep(0.08)

    close_splash(splash)

    if not launched:
        log("  失败：25 秒内服务器没有收到任何页面请求")
        try:
            proc.terminate()
        except Exception:
            pass
        return None

    log("  成功：窗口已加载页面，正常运行中（关闭窗口即退出）")
    try:
        proc.wait()
    except KeyboardInterrupt:
        try:
            proc.terminate()
        except Exception:
            pass
    log("  窗口已关闭，退出。")
    return 0


# ---------------------------------------------------------------- 控制窗口

def pick_font():
    """选一个能正常显示中文的字体"""
    try:
        import tkinter.font as tkfont
        families = set(tkfont.families())
    except Exception:
        families = set()
    for name in ("Microsoft YaHei UI", "Microsoft YaHei", "PingFang SC",
                 "Hiragino Sans GB", "SimHei", "SimSun"):
        if name in families:
            return name
    return "TkDefaultFont"


def run_window(url, httpd, web_root, open_on_start=True):
    import tkinter as tk
    from tkinter import font as tkfont

    BG = "#f5f5f7"
    CARD = "#ffffff"
    ACCENT = "#007aff"
    TEXT = "#1d1d1f"
    MUTED = "#6e6e73"

    root = tk.Tk()
    root.title(APP_TITLE)
    root.configure(bg=BG)
    root.resizable(False, False)

    ico = find_asset("app.ico")
    if ico:
        try:
            root.iconbitmap(default=ico)
        except Exception:
            pass

    fam = pick_font()
    f_title = tkfont.Font(family=fam, size=15, weight="bold")
    f_sub = tkfont.Font(family=fam, size=9)
    f_body = tkfont.Font(family=fam, size=10)
    f_url = tkfont.Font(family="Consolas", size=10)
    f_btn = tkfont.Font(family=fam, size=10)

    pad = 20
    root.geometry("430x250")

    tk.Label(root, text=APP_TITLE, font=f_title, bg=BG, fg=TEXT).pack(
        anchor="w", padx=pad, pady=(pad, 2))
    tk.Label(root, text=APP_SUBTITLE, font=f_sub, bg=BG, fg=MUTED).pack(anchor="w", padx=pad)

    tk.Label(root, text="服务地址", font=f_sub, bg=BG, fg=MUTED).pack(
        anchor="w", padx=pad, pady=(16, 4))

    url_box = tk.Frame(root, bg=CARD, highlightbackground="#d2d2d7",
                       highlightthickness=1)
    url_box.pack(fill="x", padx=pad)
    url_label = tk.Label(url_box, text=url, font=f_url, bg=CARD, fg=ACCENT,
                         anchor="w", padx=10, pady=8)
    url_label.pack(fill="x")

    status = tk.Label(root, text="", font=f_sub, bg=BG, fg=MUTED, anchor="w")
    status.pack(anchor="w", padx=pad, pady=(8, 0))

    bar = tk.Frame(root, bg=BG)
    bar.pack(fill="x", padx=pad, pady=(14, pad))

    def mk(text, cmd, primary=False):
        b = tk.Button(
            bar, text=text, command=cmd, font=f_btn,
            relief="flat", bd=0, cursor="hand2", padx=16, pady=7,
            bg=ACCENT if primary else "#e8e8ed",
            fg="#ffffff" if primary else TEXT,
            activebackground="#0062cc" if primary else "#dcdce1",
            activeforeground="#ffffff" if primary else TEXT,
        )
        b.pack(side="left", padx=(0, 8))
        return b

    def open_browser():
        webbrowser.open(url)
        flash("已请求打开浏览器")

    def copy_url():
        try:
            root.clipboard_clear()
            root.clipboard_append(url)
            flash("地址已复制到剪贴板")
        except Exception as e:
            flash("复制失败：%s" % e)

    def quit_app():
        flash("正在退出…")
        try:
            threading.Thread(target=httpd.shutdown, daemon=True).start()
        except Exception:
            pass
        root.after(120, root.destroy)

    flash_job = [None]

    def flash(msg, ms=2200):
        status.config(text="● " + msg, fg=ACCENT)
        if flash_job[0]:
            try:
                root.after_cancel(flash_job[0])
            except Exception:
                pass
        flash_job[0] = root.after(ms, lambda: status.config(
            text="● 服务运行中 · 关闭本窗口即退出", fg=MUTED))

    mk("打开浏览器", open_browser, primary=True)
    mk("复制地址", copy_url)
    mk("退出", quit_app)

    status.config(text="● 服务运行中 · 关闭本窗口即退出", fg=MUTED)
    root.protocol("WM_DELETE_WINDOW", quit_app)
    if open_on_start:
        root.after(300, lambda: webbrowser.open(url))  # 启动后只自动开一次

    root.mainloop()
    return 0


# ---------------------------------------------------------------- 入口

def _serve_forever(httpd):
    """纯后台服务：不打开任何界面，直到 Ctrl+C"""
    say("后台服务运行中，按 Ctrl+C 退出")
    try:
        while True:
            time.sleep(3600)
    except KeyboardInterrupt:
        pass
    finally:
        httpd.shutdown()
    return 0


def main():
    ap = argparse.ArgumentParser(add_help=False)
    ap.add_argument("--port", type=int, default=DEFAULT_PORT)
    ap.add_argument("--no-open", action="store_true")
    ap.add_argument("--headless", action="store_true")
    ap.add_argument("--control", action="store_true")
    ap.add_argument("--browser", default="")
    ap.add_argument("--allow-multi", action="store_true")
    ap.add_argument("-h", "--help", action="help")
    args = ap.parse_args()

    log_reset()
    log("参数：%s" % (" ".join(sys.argv[1:]) or "（无）"))

    web_root = find_web_root()
    if not os.path.isdir(web_root):
        msg = "找不到题库资源目录：\n%s" % web_root
        say(msg)
        _fatal(msg)
        return 2

    index = os.path.join(web_root, "index.html")
    if not os.path.exists(index):
        msg = "题库资源不完整，缺少 index.html：\n%s" % web_root
        say(msg)
        _fatal(msg)
        return 2

    # 单实例限制（headless 自检不受限，方便并行跑）
    if not args.headless and not args.allow_multi:
        if single_instance_lock() is None:
            msg = ("%s 已经在运行了。\n\n"
                   "请查看任务栏上已打开的窗口；\n"
                   "若窗口已丢失，先结束旧进程再重新打开。" % APP_TITLE)
            say(msg)
            _info(msg)
            return 0

    try:
        httpd = start_available_server(web_root, args.port)
    except Exception as e:
        msg = "启动本地服务失败：%s" % e
        say(msg)
        _fatal(msg)
        return 3

    port = httpd.server_address[1]
    url = "http://127.0.0.1:%d/" % port
    say("%s 已启动" % APP_TITLE)
    say("地址：%s" % url)
    say("资源目录：%s" % web_root)
    log("资源目录：%s" % web_root)
    log("监听端口：%d" % port)

    if args.headless or args.no_open:
        return _serve_forever(httpd)

    if args.control:
        log("按参数要求使用控制窗口")
        try:
            return run_window(url, httpd, web_root, open_on_start=True)
        except Exception as e:
            log("无法创建控制窗口（%s）" % e)
            return _serve_forever(httpd)

    # 默认路径：应用模式独立窗口。依次尝试所有找到的浏览器 ——
    # 只试一个的话，Edge 因为首启体验/策略问题失败就白费了。
    if args.browser and os.path.exists(args.browser):
        candidates = [(args.browser, os.path.basename(args.browser))]
    else:
        candidates = list_browsers()

    log("候选浏览器：%s" % (", ".join(n for _p, n in candidates) or "无"))

    for path, name in candidates:
        log("尝试应用窗口：%s" % name)
        code = run_app_window(path, url, httpd)
        if code is not None:
            httpd.shutdown()
            return code
        log("  %s 未能拉起窗口，换下一个" % name)

    # 回退：默认浏览器 + 控制窗口（保证用户始终有退出的入口）
    log("所有浏览器都失败，退回「默认浏览器 + 控制窗口」模式")
    try:
        webbrowser.open(url)
    except Exception:
        pass
    try:
        return run_window(url, httpd, web_root, open_on_start=False)
    except Exception as e:
        log("无法创建控制窗口（%s），已切换为纯后台服务。" % e)
        return _serve_forever(httpd)


def _fatal(msg):
    """没有控制台时弹一个系统消息框，避免双击后无声无息"""
    try:
        import ctypes
        ctypes.windll.user32.MessageBoxW(None, msg, APP_TITLE, 0x10)
    except Exception:
        pass


def _info(msg):
    """信息类提示框（图标为信息，不是错误）"""
    try:
        import ctypes
        ctypes.windll.user32.MessageBoxW(None, msg, APP_TITLE, 0x40)
    except Exception:
        pass


if __name__ == "__main__":
    sys.exit(main())
