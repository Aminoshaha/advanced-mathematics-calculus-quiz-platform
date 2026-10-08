# -*- coding: utf-8 -*-
"""
patch_spec.py —— 给 PyInstaller 生成的 spec 打补丁

背景：
    用 conda 里的 Python 打出的**单文件版** exe，启动时会在解压
    VCRUNTIME140.dll 这一步失败：

        [PYI-xxxx:ERROR] Failed to extract VCRUNTIME140.dll:
                         failed to open target file! fopen: Permission denied

    VCRUNTIME140.dll 是 VC++ 运行时，Windows 10/11 的系统目录里本来就有
    （Chrome、Python 等大量程序都依赖它）。既然打包进去反而解压失败，
    干脆从分析结果里剔除，运行时直接加载系统里的那一份。

    目录版（--onedir）不需要这个补丁，它不涉及解压。

用法：
    python patch_spec.py <spec 路径> [--console]
"""

import os
import sys

MARK = "# ---- 已注入：排除 VC 运行时 DLL ----"

INJECT = '''
# ---- 已注入：排除 VC 运行时 DLL ----
# 单文件版解压 VCRUNTIME140.dll 会 "fopen: Permission denied"（conda Python 的已知问题）。
# Windows 10/11 的 System32 里本来就有这些 DLL，不打包也能正常加载。
import os as _os
_EXCLUDE_DLLS = {"vcruntime140.dll", "vcruntime140_1.dll"}
_before = len(a.binaries)
a.binaries = [
    b for b in a.binaries
    if _os.path.basename(b[0]).lower() not in _EXCLUDE_DLLS
]
print("[patch] binaries: %d -> %d（剔除 VC 运行时）" % (_before, len(a.binaries)))

'''


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        return 1

    spec = sys.argv[1]
    force_console = "--console" in sys.argv

    if not os.path.exists(spec):
        print("找不到 spec：%s" % spec)
        return 1

    with open(spec, "r", encoding="utf-8") as f:
        src = f.read()

    if MARK in src:
        print("[patch] 已经打过补丁，跳过注入")
    else:
        # 注入到 PYZ 之前 —— 此时 Analysis 已完成、EXE 尚未构建
        idx = src.find("\npyz = PYZ(")
        if idx == -1:
            print("[patch] 找不到注入点 '\\npyz = PYZ('")
            return 1
        src = src[:idx] + INJECT + src[idx:]
        print("[patch] 已注入排除逻辑")

    if force_console:
        import re
        new = re.sub(r"console\s*=\s*(True|False)", "console=True", src)
        if new != src:
            print("[patch] console -> True（便于捕获启动器错误）")
            src = new

    with open(spec, "w", encoding="utf-8") as f:
        f.write(src)

    print("[patch] 已写入 %s" % spec)
    return 0


if __name__ == "__main__":
    sys.exit(main())
