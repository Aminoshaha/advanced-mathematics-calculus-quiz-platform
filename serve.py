#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
高等数学题库 · 本地预览服务器

零依赖（Python 标准库），仅用于在本机以 http:// 方式打开 web/ 目录。
用 http:// 而不是 file:// 的原因：浏览器禁止 file:// 下加载 ES module。

用法：
    python serve.py                # 默认 http://127.0.0.1:8777，并自动打开浏览器
    python serve.py 9000           # 指定端口
    python serve.py --no-open      # 不自动打开浏览器（后台托管时用）
"""

import http.server
import os
import socketserver
import sys
import webbrowser

ROOT = os.path.dirname(os.path.abspath(__file__))
DEFAULT_PORT = 8777


class Handler(http.server.SimpleHTTPRequestHandler):
    """禁用缓存 + 修正 Windows 上 .js 的 MIME 类型（注册表常把它映射成 text/plain）。"""

    extensions_map = {
        **http.server.SimpleHTTPRequestHandler.extensions_map,
        ".js": "text/javascript",
        ".mjs": "text/javascript",
        ".css": "text/css",
        ".json": "application/json",
        ".webmanifest": "application/manifest+json",
        ".svg": "image/svg+xml",
        ".woff2": "font/woff2",
    }

    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate")
        self.send_header("Pragma", "no-cache")
        super().end_headers()

    def log_message(self, fmt, *a):  # 静默，避免刷屏
        pass


class Server(socketserver.ThreadingTCPServer):
    allow_reuse_address = True
    daemon_threads = True


def main():
    argv = [a for a in sys.argv[1:]]
    open_browser = "--no-open" not in argv
    argv = [a for a in argv if not a.startswith("--")]

    port = int(argv[0]) if argv else DEFAULT_PORT
    os.chdir(ROOT)

    for candidate in range(port, port + 20):
        try:
            httpd = Server(("127.0.0.1", candidate), Handler)
            break
        except OSError:
            continue
    else:
        print("找不到可用端口，已尝试 %d-%d" % (port, port + 19))
        return 1

    url = "http://127.0.0.1:%d/" % candidate
    print("高等数学题库已启动 →  %s" % url)
    print("按 Ctrl+C 停止")
    if open_browser:
        try:
            webbrowser.open(url)
        except Exception:
            pass
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n已停止。")
    finally:
        httpd.server_close()
    return 0


if __name__ == "__main__":
    sys.exit(main())
