#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
scan-latex.py —— 题库 LaTeX 残留扫描

渲染器的「未知命令」检查抓不到一类问题：能渲染成字面文本的 LaTeX 残留。
例如分段函数里写 \\\\[2pt]（换行并留 2pt 间距），解析器按 \\\\ 切行后
把 [2pt] 留给下一行，方括号又被丢弃，页面上就出现 "2pt0" 这种字样。

本脚本直接扫源数据，找出所有可疑写法：
  · \\\\[间距] 之类的换行参数
  · 各种 \\begin{env}
  · 未被分段函数消费的 & 对齐符
  · 渲染后可能出现的单位残留（pt/em/ex/mu）
  · 其它可疑的方括号参数

用法：python scan-latex.py
"""

import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # web/
RAW = os.path.join(ROOT, "data", "raw")

# 收集所有待扫描的字符串，附带出处
def collect():
    items = []

    qpath = os.path.join(RAW, "questions.json")
    if os.path.exists(qpath):
        with open(qpath, encoding="utf-8") as f:
            src = json.load(f)
        for q in src["questions"]:
            items.append((q["id"] + " 题干", q.get("stemLatex", "")))
            for o in q.get("options", []):
                items.append((q["id"] + " 选项" + o.get("key", ""), o.get("latex", "")))

    adir = os.path.join(RAW, "analysis")
    if os.path.isdir(adir):
        for name in sorted(os.listdir(adir)):
            if not name.endswith(".json"):
                continue
            qid = name[:-5]
            with open(os.path.join(adir, name), encoding="utf-8") as f:
                a = json.load(f)
            q = a.get("question")
            if isinstance(q, dict):
                items.append((qid + " 题干(补录)", q.get("stemLatex", "")))
                for o in q.get("options", []):
                    items.append((qid + " 选项(补录)" + o.get("key", ""), o.get("latex", "")))
            if a.get("keyIdea"):
                items.append((qid + " 核心思路", a["keyIdea"]))
            for i, s in enumerate(a.get("steps") or []):
                items.append((qid + " 步骤%d" % (i + 1), (s.get("title") or "") + " " + (s.get("content") or "")))
            for n in a.get("optionNotes") or []:
                if isinstance(n, dict):
                    items.append((qid + " 干扰项" + str(n.get("key")), n.get("note") or ""))
            if a.get("pitfalls"):
                items.append((qid + " 易错点", a["pitfalls"]))
            if a.get("selfReasoning"):
                items.append((qid + " 自解推理", a["selfReasoning"]))
    return items


def strip_cases(text):
    """去掉 \\begin{cases}...\\end{cases} 片段，使 & 的检查只针对环境之外"""
    return re.sub(r"\\begin\{cases\}.*?\\end\{cases\}", "", text, flags=re.S)


CHECKS = [
    # (名称, 正则, 说明, 预处理函数, 是否致命)
    #
    # 「致命」= 渲染器目前处理不了，页面上会出现可见的 LaTeX 记号。
    # 「提示」= 渲染器已能正确消费（例如 \\[2pt] 会被当作行距），
    #          仅作为数据侧的信息记录，不算错误。
    #          真正的判据是 tools/tex-check.mjs 的「可见文本残留」检查。
    ("array/matrix 环境", re.compile(r"\\begin\{(array|matrix|pmatrix|bmatrix|vmatrix|aligned|align|gather|split)\}"),
     "本渲染器未实现这些环境，外壳会被丢掉、& 会原样显示", None, True),
    ("cases 之外的 &", re.compile(r"&"),
     "& 是表格对齐符，本渲染器只在 cases 环境里处理", strip_cases, True),
    ("未转义的百分号", re.compile(r"(?<!\\)%"),
     "LaTeX 里 % 是注释符，需写成 \\%", None, True),

    ("换行带间距", re.compile(r"\\\\\s*\*\s*\[[^\]]*\]"),
     "LaTeX 的 \\\\[2pt]，渲染器已把它当行距消费（分段函数行距 / 空隙）", None, False),
    ("裸换行参数", re.compile(r"\\\\\s*\[[^\]]*\]"),
     "同上，出现在非分段函数位置时按空隙处理", None, False),
    ("单位残留", re.compile(r"\d+(pt|em|ex|mu)\b"),
     "这是 \\\\[2pt] 里的长度参数，渲染器已消费，不会出现在页面上", None, False),
]

def main():
    items = collect()
    print("=" * 72)
    print("LaTeX 残留扫描")
    print("=" * 72)
    print("扫描条目 : %d" % len(items))
    print("")

    total = 0
    fatal = 0
    by_kind = {}
    hits = []
    for label, text in items:
        if not text:
            continue
        for name, rx, why, prep, is_fatal in CHECKS:
            subject = prep(text) if prep else text
            for m in rx.finditer(subject):
                total += 1
                if is_fatal:
                    fatal += 1
                by_kind[name] = by_kind.get(name, 0) + 1
                a = max(0, m.start() - 40)
                b = min(len(subject), m.end() + 40)
                ctx = subject[a:b].replace("\n", " ")
                hits.append((name, label, m.group(0), ctx, why, is_fatal))

    print("命中总数 : %d   （致命 %d / 提示 %d）" % (total, fatal, total - fatal))
    for k, v in sorted(by_kind.items(), key=lambda x: -x[1]):
        print("  %-22s %d" % (k, v))
    print("")

    if hits:
        print("-" * 72)
        for name, label, matched, ctx, why, is_fatal in hits:
            print("[%s]%s %s" % ("致命" if is_fatal else "提示", name, label))
            print("    匹配: %r" % matched)
            print("    上下文: ...%s..." % ctx)
            print("    说明: %s" % why)
            print("")

    # 附带列出所有用到的环境名，便于判断要不要补支持
    envs = {}
    for label, text in items:
        if not text:
            continue
        for m in re.finditer(r"\\begin\{([^}]*)\}", text):
            envs[m.group(1)] = envs.get(m.group(1), 0) + 1
    print("-" * 72)
    print("用到的 LaTeX 环境：%s" % (", ".join("%s(%d)" % (k, v) for k, v in sorted(envs.items())) or "无"))
    print("")
    print("说明：「提示」类写法渲染器已经能正确处理，只是记录在案；")
    print("      真正的判据是 tex-check.mjs 的「可见文本残留」检查（应为 0）。")
    print("")

    return 1 if fatal else 0


if __name__ == "__main__":
    sys.exit(main())
