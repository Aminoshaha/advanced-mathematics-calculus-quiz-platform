# -*- coding: utf-8 -*-
"""
probe_icon.py —— 探测可以用哪个字体的 ∫ 字形，并给出对照图

手画贝塞尔曲线很难把 ∫ 画准（容易变成 J）。系统字体里有现成的 ∫（U+222B），
先看哪个字体真的有这个字形、长什么样，再决定用哪个。
缺失字形时 PIL 会画成空白或方框，对照图上一眼可辨。
"""

import os
from PIL import Image, ImageDraw, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
CH = "\u222b"  # ∫

CANDIDATES = [
    ("Cambria Math", "C:/Windows/Fonts/cambria.ttc", 1),
    ("Cambria", "C:/Windows/Fonts/cambria.ttc", 0),
    ("Segoe UI Symbol", "C:/Windows/Fonts/seguisym.ttf", 0),
    ("Segoe UI", "C:/Windows/Fonts/segoeui.ttf", 0),
    ("Times New Roman", "C:/Windows/Fonts/times.ttf", 0),
    ("Georgia", "C:/Windows/Fonts/georgia.ttf", 0),
    ("Arial", "C:/Windows/Fonts/arial.ttf", 0),
    ("Consolas", "C:/Windows/Fonts/consola.ttf", 0),
    ("MS Gothic", "C:/Windows/Fonts/msgothic.ttc", 0),
    ("SimSun", "C:/Windows/Fonts/simsun.ttc", 0),
    ("Palatino Linotype", "C:/Windows/Fonts/pala.ttf", 0),
    ("Constantia", "C:/Windows/Fonts/constan.ttf", 0),
]

CELL = 120
COLS = 4


def ink_stats(img):
    """返回 (墨迹占比, 是否像方框)"""
    g = img.convert("L")
    px = g.load()
    w, h = g.size
    dark = 0
    xs, ys = [], []
    for y in range(h):
        for x in range(w):
            if px[x, y] < 128:
                dark += 1
                xs.append(x)
                ys.append(y)
    if dark == 0:
        return 0.0, None, False
    bw = max(xs) - min(xs) + 1
    bh = max(ys) - min(ys) + 1
    fill = dark / float(bw * bh)
    return dark / float(w * h), (bw, bh), fill


def main():
    rows = (len(CANDIDATES) + COLS - 1) // COLS
    sheet = Image.new("RGB", (COLS * CELL, rows * (CELL + 18)), (245, 245, 247))
    sd = ImageDraw.Draw(sheet)
    small = ImageFont.truetype("C:/Windows/Fonts/segoeui.ttf", 11)

    report = []
    for i, (name, path, index) in enumerate(CANDIDATES):
        cx = (i % COLS) * CELL
        cy = (i // COLS) * (CELL + 18)

        if not os.path.exists(path):
            report.append((name, "文件不存在", 0.0, None))
            sd.text((cx + 6, cy + CELL + 2), name + " ✗缺文件", font=small, fill=(180, 0, 0))
            continue

        try:
            f = ImageFont.truetype(path, 96, index=index)
        except Exception as e:
            report.append((name, "加载失败 %s" % e, 0.0, None))
            sd.text((cx + 6, cy + CELL + 2), name + " ✗", font=small, fill=(180, 0, 0))
            continue

        cell = Image.new("RGB", (CELL, CELL), (255, 255, 255))
        d = ImageDraw.Draw(cell)
        d.text((CELL / 2, CELL / 2), CH, font=f, fill=(20, 20, 30), anchor="mm")
        sheet.paste(cell, (cx, cy))

        coverage, bbox, fill = ink_stats(cell)
        verdict = "有字形"
        if coverage < 0.002:
            verdict = "空白（无此字形）"
        elif bbox and fill < 0.14 and bbox[0] > CELL * 0.55 and bbox[1] > CELL * 0.55:
            verdict = "疑似方框（无此字形）"
        report.append((name, verdict, coverage, bbox))
        color = (20, 120, 40) if verdict == "有字形" else (180, 0, 0)
        sd.text((cx + 6, cy + CELL + 2), name[:20], font=small, fill=color)

    out = os.path.join(HERE, "probe-fonts.png")
    sheet.save(out)

    print("=" * 66)
    print("字体 ∫ 字形探测")
    print("=" * 66)
    for name, verdict, cov, bbox in report:
        print("  %-20s %-22s 墨迹 %5.2f%%  尺寸 %s" % (name, verdict, cov * 100, bbox))
    print("")
    print("对照图：%s" % out)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
