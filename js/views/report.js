/* ==========================================================================
   views/report.js —— 结算报告 + 错题本
   ========================================================================== */

import { el, fmtDuration, fmtPct } from "../util.js";
import { bank, persist, session, mistakeList, mistakesAsPool } from "../store.js";
import { iconHTML, toast, confirmSheet, mathText, mathPlain, kpBar, emptyState, animateTo, countUp } from "../ui.js";
import { analysisPanel } from "./practice.js";

/* ==========================================================================
   一、结算报告
   ========================================================================== */

export function reportView(app) {
  const r = app.report;
  if (!r) {
    app.stage = "setup";
    return el("div");
  }

  const st = r.stats;
  const wrongs = r.attempts.filter((a) => !a.correct);

  const root = el("div.page-mid.stack");

  /* ---- 成绩总览 ---- */
  root.appendChild(
    el("div.panel", {}, [
      el("div.panel__body", {}, [
        el("div.ring", {}, [
          ring(st.rate),
          el("div.grow", {}, [
            el("div.ring__num", {
              text: `${st.correct} / ${st.total}`,
              style: { fontSize: "20px" },
            }),
            el("div.ring__cap", { text: "答对题数" }),
            el("div", { style: { marginTop: "16px", maxWidth: "300px" } }, [
              el("div.stat-grid", {}, [
                stat(String(st.total), "已答"),
                stat(String(st.correct), "正确"),
                stat(String(st.wrong), "错误"),
                stat(fmtDuration(r.elapsedMs), "用时"),
              ]),
            ]),
          ]),
        ]),
      ]),
    ])
  );

  /* ---- 知识点表现 ---- */
  if (r.kpBreakdown && r.kpBreakdown.length) {
    const rows = el("div");
    const sorted = r.kpBreakdown.slice().sort((a, b) => a.rate - b.rate);
    // 逐条错峰增长，形成级联效果
    sorted.forEach((k, i) => {
      rows.appendChild(kpBar(k.name, k.rate, { attempts: k.attempts, delay: i * 60 }));
    });
    root.appendChild(
      el("div.panel", {}, [
        el("div.panel__head", {}, [
          el("h3.panel__title", { text: "知识点表现" }),
          el("span.dim", { text: "按正确率从低到高" }),
        ]),
        el("div.panel__body", {}, [rows]),
      ])
    );
  }

  /* ---- 错题与解析 ---- */
  if (wrongs.length) {
    root.appendChild(
      el("div.panel", {}, [
        el("div.panel__head", {}, [
          el("h3.panel__title", { text: `错题与解析（${wrongs.length} 题）` }),
          el("span.dim", { text: "点击展开" }),
        ]),
        el("div.panel__body", {}, [
          el("div", {}, wrongs.map((a, i) => mistakeCard(a, i + 1, { open: i === 0 }))),
        ]),
      ])
    );
  } else {
    root.appendChild(
      el("div.panel", {}, [
        el("div.panel__body", {}, [
          emptyState({
            icon: "check",
            title: "全对，没有错题",
            desc: "本次练习全部答对。可以继续加练，或到「掌握度」看看整体进度。",
          }),
        ]),
      ])
    );
  }

  /* ---- 底部操作 ---- */
  const unresolved = mistakesAsPool().length;
  app.setFooter([
    el("button.btn.btn--bordered", {
      onclick: () => {
        app.stage = "setup";
        session.discard();
        app.render();
      },
    }, ["返回配置"]),
    el("div.grow"),
    el("button.btn.btn--bordered", {
      onclick: () => exportReport(r),
    }, ["导出错题本"]),
    wrongs.length
      ? el("button.btn.btn--bordered", {
          onclick: () => {
            const ids = wrongs.map((a) => a.qid);
            session.create({ ...app.setup, kps: [], limit: 0, _onlyIds: ids });
            app.stage = "quiz";
            app.render();
          },
        }, [`重刷本次错题 (${wrongs.length})`])
      : null,
    el("button.btn.btn--primary", {
      onclick: () => {
        session.create(app.setup);
        app.stage = "quiz";
        app.render();
      },
    }, ["再刷一组"]),
  ]);

  return el("div", {}, [
    el("div.content__header", {}, [
      el("h1.content__title", { text: "本次练习结算" }),
      el("p.content__subtitle", {
        text:
          `范围：${r.config.kps.length ? r.config.kps.join("、") : "全部知识点"}　·　` +
          `模式：${r.config.mode === "immediate" ? "逐题即时" : "整组延迟"}　·　` +
          `时间：${new Date(r.startedAt).toLocaleString("zh-CN")}`,
      }),
    ]),
    el("div.content__scroll.scroll", {}, [root]),
  ]);
}

function stat(value, key) {
  return el("div.stat", {}, [
    el("div.stat__v", { text: value }),
    el("div.stat__k", { text: key }),
  ]);
}

/** 环形正确率（顺时针生长） */
function ring(rate) {
  const R = 52;
  const C = 2 * Math.PI * R;
  const color = rate >= 0.8 ? "var(--green)" : rate >= 0.5 ? "var(--accent)" : "var(--red)";

  // 与 fmtPct 一致的格式：整数不显示小数，否则保留一位
  const fmtRing = (v) => {
    const r = Math.round(v * 10) / 10;
    return (Math.abs(r - Math.round(r)) < 0.05 ? String(Math.round(r)) : r.toFixed(1)) + "%";
  };

  const box = el("div", { style: { position: "relative", flex: "0 0 auto" } });

  // 初始 dashoffset = 整个周长，即「一点都没画」。之后递减到目标值，
  // 描边就会从 12 点位置（rotate(-90)）沿顺时针逐渐延长。
  box.innerHTML =
    `<svg class="ring__svg" width="128" height="128" viewBox="0 0 128 128">` +
    `<circle class="ring__track" cx="64" cy="64" r="${R}"/>` +
    `<circle class="ring__val" cx="64" cy="64" r="${R}" stroke="${color}" ` +
    `transform="rotate(-90 64 64)" stroke-dasharray="${C.toFixed(2)}" ` +
    `stroke-dashoffset="${C.toFixed(2)}"/>` +
    `</svg>`;

  const num = el("div.ring__num", { text: "0%", style: { color } });

  box.appendChild(
    el("div", {
      style: {
        position: "absolute",
        inset: "0",
        display: "grid",
        placeItems: "center",
      },
    }, [
      el("div", { style: { textAlign: "center" } }, [
        num,
        el("div.ring__cap", { text: "正确率" }),
      ]),
    ])
  );

  // 环形描边生长（测试环境无 SVG 子节点时静默跳过）
  const arc = box.querySelector(".ring__val");
  if (arc) {
    animateTo(
      arc,
      (n) => {
        n.style.strokeDashoffset = C.toFixed(2);
      },
      (n) => {
        n.style.strokeDashoffset = (C * (1 - rate)).toFixed(2);
      }
    );
  }
  // 百分比数字同步滚动
  countUp(num, rate * 100, { ms: 1000, format: fmtRing });

  return box;
}

/* ==========================================================================
   二、错题卡片（报告与错题本共用）
   ========================================================================== */

export function mistakeCard(attempt, index, { open = false } = {}) {
  const q = bank.get(attempt.qid);
  if (!q) return el("div");

  const detail = el("div.mistake__detail" + (open ? "" : ".hidden"));
  detail.append(
    el("div.answer-cmp", {}, [
      el("span.answer-pill.answer-pill--mine", { text: `你的答案 ${attempt.picked}` }),
      el("span.answer-pill.answer-pill--right", { text: `正确答案 ${q.correctAnswer}` }),
    ]),
    el("div.qstem", { html: mathText(q.stemLatex), style: { marginTop: "12px" } }),
    el("div.options", {}, q.options.map((opt) => {
      let cls = "opt";
      if (opt.key === q.correctAnswer) cls += " is-correct";
      else if (opt.key === attempt.picked) cls += " is-wrong";
      const b = el("button." + cls.split(" ").join("."), { disabled: true });
      b.append(
        el("span.opt__key", { text: opt.key }),
        el("span.opt__body", { html: mathText(opt.latex) })
      );
      return b;
    })),
    analysisPanel(q, attempt.picked)
  );

  const head = el("button.mistake__head", {
    onclick: () => {
      detail.classList.toggle("hidden");
      head.setAttribute("aria-expanded", String(!detail.classList.contains("hidden")));
    },
  });
  head.append(
    el("span.mistake__idx", { text: `${index}.` }),
    el("span.mistake__stem", { html: mathText(q.stemLatex) }),
    el("span.badge.badge--red", { text: attempt.picked || "—" }),
    el("span.badge.badge--green", { text: q.correctAnswer }),
    (() => {
      const w = document.createElement("span");
      w.innerHTML = iconHTML("chevron", 14);
      return w.firstElementChild;
    })()
  );

  return el("div.mistake", {}, [head, detail]);
}

/* ==========================================================================
   三、错题本
   ========================================================================== */

export function mistakesView(app) {
  const all = mistakeList();
  const pending = all.filter((m) => !m.resolved);
  const fixed = all.filter((m) => m.resolved);

  const root = el("div.page-mid.stack");

  if (!all.length) {
    app.setFooter([]);
    return el("div", {}, [
      el("div.content__header", {}, [el("h1.content__title", { text: "错题本" })]),
      el("div.content__scroll.scroll", {}, [
        emptyState({
          icon: "mistakes",
          title: "错题本还是空的",
          desc: "做错的题会自动收集到这里，并按知识点关联解析。去刷几道题吧。",
          action: el("button.btn.btn--primary", {
            onclick: () => {
              app.route = "practice";
              app.stage = "setup";
              app.render();
            },
          }, ["去刷题"]),
        }),
      ]),
    ]);
  }

  root.appendChild(
    el("div", {}, [
      el("div.stat-grid", {}, [
        stat(String(all.length), "错题总数"),
        stat(String(pending.length), "待订正"),
        stat(String(fixed.length), "已订正"),
      ]),
    ])
  );

  if (pending.length) {
    root.appendChild(section("待订正", pending));
  }
  if (fixed.length) {
    root.appendChild(section("已订正", fixed, true));
  }

  app.setFooter([
    el("span.muted", { text: `共 ${all.length} 道错题` }),
    el("div.grow"),
    el("button.btn.btn--bordered", {
      onclick: async () => {
        const ok = await confirmSheet({
          title: "清空错题本？",
          text: "所有错题记录与订正状态都会被删除，此操作不可撤销。",
          okText: "清空",
          danger: true,
          icon: "trash",
        });
        if (!ok) return;
        persist.mistakes = {};
        persist.saveMistakes();
        toast("错题本已清空");
        app.render();
      },
    }, ["清空"]),
    pending.length
      ? el("button.btn.btn--primary", {
          onclick: () => {
            // 只在这批待订正错题里出题（pool 会遵守 _onlyIds）
            session.create({
              ...app.setup,
              kps: [],
              limit: 0,
              _onlyIds: pending.map((m) => m.qid),
            });
            app.route = "practice";
            app.stage = "quiz";
            app.render();
          },
        }, [`重刷待订正 (${pending.length})`])
      : null,
  ]);

  return el("div", {}, [
    el("div.content__header", {}, [
      el("h1.content__title", { text: "错题本" }),
      el("p.content__subtitle", {
        text: "做错的题自动收集；之后刷对同一题会标记为「已订正」",
      }),
    ]),
    el("div.content__scroll.scroll", {}, [root]),
  ]);
}

function section(title, items, dim = false) {
  return el("div.panel" + (dim ? ".dim" : ""), {}, [
    el("div.panel__head", {}, [
      el("h3.panel__title", { text: `${title}（${items.length}）` }),
      items.some((m) => m.wrongCount > 1)
        ? el("span.dim", { text: "含重复错题次数" })
        : null,
    ]),
    el("div.panel__body", {}, [
      el("div", {}, items.map((m, i) => {
        const q = bank.get(m.qid);
        if (!q) return el("div");
        const attempt = { qid: m.qid, picked: m.lastPicked, correct: false };
        const card = mistakeCard(attempt, i + 1);
        if (m.wrongCount > 1) {
          card.querySelector(".mistake__head").insertBefore(
            el("span.badge.badge--orange", { text: `错 ${m.wrongCount} 次` }),
            card.querySelector(".mistake__head").lastElementChild
          );
        }
        return card;
      })),
    ]),
  ]);
}

/* ==========================================================================
   四、导出错题本（Markdown）
   ========================================================================== */

export function exportReport(report) {
  const lines = [];
  const st = report.stats;
  lines.push("# 高等数学 · 极限 错题本");
  lines.push("");
  lines.push(`- 练习时间：${new Date(report.startedAt).toLocaleString("zh-CN")}`);
  lines.push(`- 范围：${report.config.kps.length ? report.config.kps.join("、") : "全部知识点"}`);
  lines.push(`- 模式：${report.config.mode === "immediate" ? "逐题即时" : "整组延迟"}`);
  lines.push(
    `- 成绩：${st.correct}/${st.total}（${fmtPct(st.rate)}），用时 ${fmtDuration(report.elapsedMs)}`
  );
  lines.push("");

  if (report.kpBreakdown && report.kpBreakdown.length) {
    lines.push("## 知识点表现");
    lines.push("");
    lines.push("| 知识点 | 作答 | 正确 | 正确率 |");
    lines.push("|---|---|---|---|");
    for (const k of report.kpBreakdown.slice().sort((a, b) => a.rate - b.rate)) {
      lines.push(`| ${k.name} | ${k.attempts} | ${k.correct} | ${fmtPct(k.rate)} |`);
    }
    lines.push("");
  }

  const wrongs = report.attempts.filter((a) => !a.correct);
  lines.push(`## 错题与解析（${wrongs.length} 题）`);
  lines.push("");

  wrongs.forEach((a, i) => {
    const q = bank.get(a.qid);
    if (!q) return;
    const ana = bank.anaOf(q.id);
    lines.push(`### ${i + 1}. [${q.id}] ${mathPlain(q.stemLatex)}`);
    lines.push("");
    lines.push(`- 知识点：${(q.knowledgePoints || []).join("、") || "—"}`);
    lines.push(`- 你的答案：**${a.picked}**　正确答案：**${q.correctAnswer}**`);
    lines.push("");
    for (const opt of q.options) {
      const mark =
        opt.key === q.correctAnswer ? " ✅" : opt.key === a.picked ? " ❌" : "";
      lines.push(`  - ${opt.key}. ${mathPlain(opt.latex)}${mark}`);
    }
    lines.push("");
    if (ana) {
      if (ana.keyIdea) {
        lines.push(`**核心思路**：${mathPlain(ana.keyIdea)}`);
        lines.push("");
      }
      if (ana.steps && ana.steps.length) {
        lines.push("**解题步骤**：");
        lines.push("");
        ana.steps.forEach((s, si) => {
          lines.push(`${si + 1}. ${s.title ? "**" + mathPlain(s.title) + "**：" : ""}${mathPlain(s.content)}`);
        });
        lines.push("");
      }
      if (ana.optionNotes && ana.optionNotes.length) {
        lines.push("**其它选项为什么错**：");
        lines.push("");
        for (const n of ana.optionNotes) {
          lines.push(`- ${n.key}. ${mathPlain(n.note)}`);
        }
        lines.push("");
      }
      if (ana.pitfalls) {
        lines.push(`> 易错提醒：${mathPlain(ana.pitfalls)}`);
        lines.push("");
      }
    }
    lines.push("---");
    lines.push("");
  });

  const blob = new Blob([lines.join("\n")], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const stamp = new Date().toISOString().slice(0, 10);
  a.href = url;
  a.download = `高数极限-错题本-${stamp}.md`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
  toast("错题本已导出为 Markdown");
}
