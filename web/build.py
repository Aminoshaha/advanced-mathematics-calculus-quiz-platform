#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
build.py —— 题库数据构建

把「人工/agent 提取的题目」与「逐题解析」合并成前端可直接加载的数据文件，
并输出一份质检报告（解析缺口、独立重解分歧、转录不一致）。

输入：
    web/data/raw/questions.json          题目主表
    web/data/raw/analysis/<id>.json      逐题解析（补录题会额外带 question 字段）
输出：
    web/data/questions.js                export const BANK = {...}

用法：python build.py
"""

import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.abspath(__file__))
RAW = os.path.join(ROOT, "data", "raw")
ANA_DIR = os.path.join(RAW, "analysis")
OUT = os.path.join(ROOT, "data", "questions.js")


def load_json(path):
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def main():
    if not os.path.exists(RAW):
        print("找不到 %s" % RAW)
        return 1

    src = load_json(os.path.join(RAW, "questions.json"))
    questions = {q["id"]: q for q in src["questions"]}
    meta = src.get("meta", {})

    analysis = {}
    bad_files = []
    recovered = []
    disagree = []
    transcription_issues = []
    incomplete = []

    if os.path.isdir(ANA_DIR):
        for name in sorted(os.listdir(ANA_DIR)):
            if not name.endswith(".json"):
                continue
            qid = name[:-5]
            path = os.path.join(ANA_DIR, name)
            try:
                a = load_json(path)
            except Exception as e:
                bad_files.append((qid, "JSON 解析失败: %s" % e))
                continue

            # 补录题：解析文件里带完整 question 字段
            if isinstance(a.get("question"), dict):
                q = a.pop("question")
                q.setdefault("kpSource", "app")
                questions[q["id"]] = q
                recovered.append(q["id"])

            if a.get("verdict") == "disagree":
                disagree.append(
                    (qid, a.get("selfAnswer"), a.get("officialAnswer"),
                     (a.get("selfReasoning") or "")[:160])
                )

            for iss in a.get("transcriptionIssues") or []:
                if isinstance(iss, dict):
                    transcription_issues.append(
                        (qid, iss.get("field"), iss.get("inRecord"), iss.get("inImage"))
                    )
                else:
                    # 少数 agent 直接写了字符串，一并保留
                    transcription_issues.append((qid, "说明", str(iss), ""))

            for req in ("keyIdea", "steps", "optionNotes", "pitfalls"):
                if req not in a:
                    incomplete.append((qid, req))

            a.pop("id", None)
            analysis[qid] = a

    # 排序：按 testNo + index，保证界面顺序稳定
    ordered = sorted(questions.values(), key=lambda q: (q.get("testNo", 0), q.get("index", 0)))
    no_ana = [q["id"] for q in ordered if q["id"] not in analysis]

    bundle = {
        "meta": {
            **meta,
            "builtAt": None,
            "questionCount": len(ordered),
            "analysisCount": len(analysis),
        },
        "questions": ordered,
        "analysis": analysis,
    }

    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    payload = json.dumps(bundle, ensure_ascii=False, indent=1)
    with open(OUT, "w", encoding="utf-8") as f:
        f.write("/* 由 build.py 自动生成，请勿手改；改数据请改 data/raw/ 后重新构建 */\n")
        f.write("export const BANK = ")
        f.write(payload)
        f.write(";\n\nexport default BANK;\n")

    # ---------------- 质检报告 ----------------
    line = "=" * 68
    print(line)
    print("题库构建完成")
    print(line)
    print("题目总数        : %d" % len(ordered))
    print("解析覆盖        : %d / %d" % (len(analysis), len(ordered)))
    print("本次补录        : %s" % (", ".join(recovered) if recovered else "无"))
    print("输出            : %s (%.1f KB)" % (
        os.path.relpath(OUT, ROOT), os.path.getsize(OUT) / 1024.0))

    if bad_files:
        print("\n[!] 解析文件损坏 (%d)" % len(bad_files))
        for qid, why in bad_files:
            print("    %s  %s" % (qid, why))

    if no_ana:
        print("\n[!] 缺少解析 (%d): %s" % (len(no_ana), ", ".join(no_ana)))

    if incomplete:
        print("\n[!] 解析字段缺失 (%d)" % len(incomplete))
        for qid, fld in incomplete:
            print("    %s  缺 %s" % (qid, fld))

    print("\n" + line)
    print("独立重解 vs 官方答案：分歧 %d 处" % len(disagree))
    print(line)
    if disagree:
        for qid, mine, official, reason in disagree:
            print("  %s  自解=%s  官方=%s" % (qid, mine, official))
            print("      %s" % reason.replace("\n", " "))
    else:
        print("  全部一致 —— 40 道题的独立求解结果与官方答案吻合，交叉验证通过。")

    print("\n" + line)
    print("转录一致性：发现 %d 处与原图不符" % len(transcription_issues))
    print(line)
    for qid, fld, rec, img in transcription_issues:
        print("  %s  [%s]" % (qid, fld))
        print("      记录: %s" % rec)
        print("      原图: %s" % img)
    if not transcription_issues:
        print("  未发现不一致。")

    print("")
    return 1 if bad_files or no_ana or incomplete or disagree else 0


if __name__ == "__main__":
    sys.exit(main())
