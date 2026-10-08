# -*- coding: utf-8 -*-
"""
make_icon.py —— 生成 exe 图标

macOS 风格圆角方块 + 白色积分号 ∫。
∫ 直接取系统字体（Cambria Math，数学专用字体）里的官方字形，
而不是手画贝塞尔曲线 —— 手画的很容易变成 "J"。

用法：python make_icon.py
输出：app.ico（多尺寸）、app-icon-preview.png
"""

import os
import sys

from PIL import Image, ImageDraw, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "app.ico")
PREVIEW = os.path.join(HERE, "app-icon-preview.png")

S = 1024                       # 先大尺寸绘制，最后降采样，边缘才平滑
TOP = (0x3B, 0x9E, 0xFF)       # 顶部亮蓝
BOTTOM = (0x0A, 0x5A, 0xD6)    # 底部深蓝
GLYPH_CH = "\u222b"            # ∫
GLYPH_HEIGHT = 0.63            # 字形高度占画布比例
THICKEN = 0.022                # 轻微加粗，让小尺寸下也清晰

FONT_CANDIDATES = [
    ("C:/Windows/Fonts/cambria.ttc", 1),   # Cambria Math
    ("C:/Windows/Fonts/cambria.ttc", 0),   # Cambria
    ("C:/Windows/Fonts/times.ttf", 0),
    ("C:/Windows/Fonts/segoeui.ttf", 0),
]


def render_glyph(ch, size, thicken):
    """把字形渲染成 L 掩膜，并裁到墨迹边界"""
    for path, index in FONT_CANDIDATES:
        if not os.path.exists(path):
            continue
        try:
            f = ImageFont.truetype(path, size, index=index)
        except Exception:
            continue
        layer = Image.new("L", (size * 2, size * 2), 0)
        ImageDraw.Draw(layer).text(
            (size, size), ch, font=f, fill=255, anchor="mm",
            stroke_width=thicken, stroke_fill=255,
        )
        bbox = layer.getbbox()
        if bbox:
            return layer.crop(bbox)
    return None


def main():
    # 1) 竖向渐变背景
    grad = Image.new("RGB", (S, S))
    gd = ImageDraw.Draw(grad)
    for y in range(S):
        t = y / float(S - 1)
        t = t * t * (3 - 2 * t)  # smoothstep，避免中段发灰
        gd.line(
            [(0, y), (S, y)],
            fill=(
                int(TOP[0] + (BOTTOM[0] - TOP[0]) * t),
                int(TOP[1] + (BOTTOM[1] - TOP[1]) * t),
                int(TOP[2] + (BOTTOM[2] - TOP[2]) * t),
            ),
        )

    # 2) 圆角方形遮罩
    mask = Image.new("L", (S, S), 0)
    ImageDraw.Draw(mask).rounded_rectangle(
        [0, 0, S - 1, S - 1], radius=int(S * 0.225), fill=255
    )

    canvas = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    canvas.paste(grad, (0, 0), mask)

    # 3) 顶部柔和高光（高斯模糊羽化边缘，否则会看到一道硬邦邦的弧形分界）
    from PIL import ImageFilter

    gloss = Image.new("L", (S, S), 0)
    ImageDraw.Draw(gloss).ellipse(
        [-S * 0.45, -S * 0.95, S * 1.45, S * 0.36], fill=54
    )
    gloss = gloss.filter(ImageFilter.GaussianBlur(S * 0.07))
    gloss = Image.composite(gloss, Image.new("L", (S, S), 0), mask)
    gloss_layer = Image.new("RGBA", (S, S), (255, 255, 255, 255))
    gloss_layer.putalpha(gloss)
    canvas = Image.alpha_composite(canvas, gloss_layer)

    # 4) 积分号：用字体字形，缩放到目标高度后居中
    glyph = render_glyph(GLYPH_CH, int(S * 0.55), int(S * THICKEN))
    if glyph is None:
        print("找不到可用字体来渲染 ∫，无法生成图标")
        return 1

    target_h = int(S * GLYPH_HEIGHT)
    scale = target_h / float(glyph.height)
    target_w = max(1, int(round(glyph.width * scale)))
    glyph = glyph.resize((target_w, target_h), Image.LANCZOS)

    white = Image.new("RGBA", (target_w, target_h), (255, 255, 255, 255))
    white.putalpha(glyph)
    canvas.alpha_composite(white, ((S - target_w) // 2, (S - target_h) // 2))

    # 5) 降采样并输出多尺寸 ico
    base = canvas.resize((256, 256), Image.LANCZOS)
    base.save(
        OUT,
        format="ICO",
        sizes=[(16, 16), (24, 24), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)],
    )
    base.save(PREVIEW)

    print("已生成 %s（%d 字节，7 种尺寸）" % (OUT, os.path.getsize(OUT)))
    print("预览图 %s" % PREVIEW)
    return 0


if __name__ == "__main__":
    sys.exit(main())
