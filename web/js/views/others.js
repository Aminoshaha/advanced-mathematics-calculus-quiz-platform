/* ==========================================================================
   views/others.js —— 掌握度 / 素材库 / 真题演练
   ========================================================================== */

import { el, esc, fmtDuration, fmtPct } from "../util.js";
import { bank, persist, masteryByKnowledgePoint, mistakeList, selectPracticeScope } from "../store.js";
import { iconHTML, toast, mathText, mathPlain, kpBar, emptyState, confirmSheet } from "../ui.js";

/* ==========================================================================
   一、掌握度
   ========================================================================== */

export function statsView(app) {
  const m = masteryByKnowledgePoint();
  const history = persist.history;
  const mistakes = mistakeList();

  const totalAnswered = history.reduce((n, s) => n + (s.attempts || []).length, 0);
  const totalCorrect = history.reduce(
    (n, s) => n + (s.attempts || []).filter((a) => a.correct).length,
    0
  );
  const totalMs = history.reduce((n, s) => n + (s.elapsedMs || 0), 0);
  const overall = totalAnswered ? totalCorrect / totalAnswered : 0;

  const root = el("div.page-mid.stack");

  if (!totalAnswered) {
    app.setFooter([]);
    return el("div", {}, [
      el("div.content__header", {}, [el("h1.content__title", { text: "掌握度" })]),
      el("div.content__scroll.scroll", {}, [
        emptyState({
          icon: "stats",
          title: "还没有练习记录",
          desc: "刷过题之后，这里会按知识点显示你的正确率与薄弱环节。",
          action: el("button.btn.btn--primary", {
            onclick: () => {
              app.route = "practice";
              app.stage = "setup";
              app.render();
            },
          }, ["开始刷题"]),
        }),
      ]),
    ]);
  }

  /* ---- 总览 ---- */
  root.appendChild(
    el("div.stat-grid", {}, [
      stat(String(history.length), "练习次数"),
      stat(String(totalAnswered), "累计答题"),
      stat(fmtPct(overall), "总正确率"),
      stat(fmtDuration(totalMs), "累计用时"),
    ])
  );

  /* ---- 知识点掌握度 ---- */
  const rows = el("div");
  const practiced = m.filter((k) => k.score !== null).sort((a, b) => a.score - b.score);
  const unpracticed = m.filter((k) => k.score === null);

  // 逐条错峰增长，形成级联效果
  let barIndex = 0;
  for (const k of practiced) {
    rows.appendChild(kpBar(k.name, k.rate, { attempts: k.attempts, delay: barIndex++ * 60 }));
  }
  for (const k of unpracticed) {
    rows.appendChild(kpBar(k.name, null, { delay: barIndex++ * 60 }));
  }

  root.appendChild(
    el("div.panel", {}, [
      el("div.panel__head", {}, [
        el("h3.panel__title", { text: "知识点掌握度" }),
        el("span.dim", { text: `${practiced.length}/${m.length} 个知识点已练习` }),
      ]),
      el("div.panel__body", {}, [
        rows,
        practiced.length
          ? el("div", { style: { marginTop: "16px", paddingTop: "14px", borderTop: "1px solid var(--sep)" } }, [
              el("div.row.row--between", {}, [
                el("span.dim", { text: `当前最薄弱：${practiced[0].name}` }),
                el("button.btn.btn--sm.btn--bordered", {
                  onclick: () => {
                    app.route = "practice";
                    app.stage = "setup";
                    selectPracticeScope(app.setup, practiced.slice(0, 3).map(x => x.name));
                    toast("已选中薄弱知识点，点击开始刷题");
                    app.render();
                  },
                }, ["针对性刷题"]),
              ]),
            ])
          : null,
      ]),
    ])
  );

  /* ---- 练习历史 ---- */
  root.appendChild(
    el("div.panel", {}, [
      el("div.panel__head", {}, [
        el("h3.panel__title", { text: "练习历史" }),
        el("span.dim", { text: `最近 ${Math.min(history.length, 12)} 次` }),
      ]),
      el("div.panel__body", {}, [
        el("div", {}, history.slice(0, 12).map((s) => {
          const rate = s.stats.total ? s.stats.correct / s.stats.total : 0;
          const color = rate >= 0.8 ? "var(--green)" : rate >= 0.5 ? "var(--accent)" : "var(--red)";
          return el("div.choice-row", {}, [
            el("div", {}, [
              el("div.choice-row__label", {
                text: new Date(s.startedAt).toLocaleString("zh-CN"),
              }),
              el("div.choice-row__hint", {
                text:
                  `${s.config.kps.length ? s.config.kps.join("、") : "全部知识点"}　·　` +
                  `${s.config.mode === "immediate" ? "逐题即时" : "整组延迟"}　·　` +
                  `用时 ${fmtDuration(s.elapsedMs)}`,
              }),
            ]),
            el("div.choice-row__ctrl.row.row--gap", {}, [
              el("span.dim.mono", { text: `${s.stats.correct}/${s.stats.total}` }),
              el("span", {
                text: fmtPct(rate),
                style: { fontWeight: "700", color, fontVariantNumeric: "tabular-nums", minWidth: "52px", textAlign: "right" },
              }),
            ]),
          ]);
        })),
      ]),
    ])
  );

  app.setFooter([
    el("span.muted", { text: `错题本 ${mistakes.length} 道，待订正 ${mistakes.filter((x) => !x.resolved).length} 道` }),
    el("div.grow"),
    el("button.btn.btn--bordered", {
      onclick: async () => {
        const ok = await confirmSheet({
          title: "重置全部学习数据？",
          text: "练习历史、错题本、掌握度都会被清空，题库本身不受影响。此操作不可撤销。",
          okText: "重置",
          danger: true,
          icon: "trash",
        });
        if (!ok) return;
        persist.clearAll();
        toast("学习数据已重置");
        app.render();
      },
    }, ["重置数据"]),
  ]);

  return el("div", {}, [
    el("div.content__header", {}, [
      el("h1.content__title", { text: "掌握度" }),
      el("p.content__subtitle", { text: "基于全部历史作答统计，用于发现薄弱环节" }),
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

/* ==========================================================================
   二、素材库
   ========================================================================== */

export function libraryView(app) {
  const meta = bank.meta || {};
  const testFilter = app.libFilter || 0; // 0 = 全部

  const tests = [...new Set(bank.questions.map((q) => q.testNo))].sort((a, b) => a - b);
  const shown = testFilter ? bank.questions.filter((q) => q.testNo === testFilter) : bank.questions;

  const root = el("div.stack");

  /* ---- 来源说明 ---- */
  root.appendChild(
    el("div.panel", {}, [
      el("div.panel__body", {}, [
        el("div.card__title", { text: "素材来源" }),
        el("div.card__desc", {
          html:
            `由 <b>答题 App 小测截图</b>转录而成。原始 ${esc(meta.totalImages || 50)} 张截图，` +
            `其中 Test4 与 Test1 逐字节完全相同（MD5 一致）为重复卷，故实际唯一题目 <b>${bank.questions.length} 道</b>。<br>` +
            `每道题都保留了原图，在解析页可展开「查看原题截图」与原始小测逐字核对；题目正确性经过一轮独立重解交叉验证。`,
        }),
        el("div.row.row--gap", { style: { marginTop: "14px", flexWrap: "wrap" } }, [
          el("span.badge.badge--accent", { text: `唯一题目 ${bank.questions.length}` }),
          el("span.badge", { text: `原始截图 ${meta.totalImages || 50}` }),
          el("span.badge", { text: `知识点 ${bank.knowledgePoints().length}` }),
          el("span.badge.badge--green", { text: "独立重解校验通过" }),
        ]),
      ]),
    ])
  );

  /* ---- 按测试卷筛选 ---- */
  const filterRow = el("div.row.row--gap", { style: { flexWrap: "wrap" } });
  const mkChip = (label, value, count) => {
    const on = testFilter === value;
    const c = el("button.chip", {
      "aria-pressed": String(on),
      onclick: () => {
        app.libFilter = value;
        app.render();
      },
    });
    c.append(document.createTextNode(label), el("span.chip__count", { text: String(count) }));
    return c;
  };
  filterRow.appendChild(mkChip("全部", 0, bank.questions.length));
  for (const t of tests) {
    filterRow.appendChild(
      mkChip(
        `Test${t}`,
        t,
        bank.questions.filter((q) => q.testNo === t).length
      )
    );
  }
  root.appendChild(filterRow);

  /* ---- 截图网格 ---- */
  const grid = el("div.lib-grid");
  for (const q of shown) {
    const shot = el("div.shot", {
      onclick: () => lightbox(q),
      title: mathPlain(q.stemLatex),
    });
    shot.append(
      el("img", { src: `assets/source/${q.src}`, alt: q.id, loading: "lazy" }),
      el("div.shot__meta", {}, [
        el("div.row.row--between", {}, [
          el("span.shot__id", { text: q.id }),
          el("span.badge" + (q.myAnswer === q.correctAnswer ? ".badge--green" : ".badge--red"), {
            text: q.myAnswer === q.correctAnswer ? "原卷答对" : "原卷答错",
          }),
        ]),
        el("div.shot__sub", { text: (q.knowledgePoints || []).join("、") || "—" }),
      ])
    );
    grid.appendChild(shot);
  }
  root.appendChild(grid);

  app.setFooter([
    el("span.muted", { text: `显示 ${shown.length} / ${bank.questions.length} 张` }),
  ]);

  return el("div", {}, [
    el("div.content__header", {}, [
      el("h1.content__title", { text: "素材库" }),
      el("p.content__subtitle", { text: "原始截图与转录结果的对照视图" }),
    ]),
    el("div.content__scroll.scroll", {}, [root]),
  ]);
}

/** 大图查看 */
function lightbox(q) {
  const previousFocus = document.activeElement;
  const close = () => {
    mask.remove();
    document.removeEventListener("keydown", onKey);
    previousFocus?.focus();
  };
  const onKey = (e) => { if (e.key === "Escape") close(); };
  const mask = el("div.sheet-mask", {
    style: { padding: "28px", placeItems: "center" },
  });
  const box = el("div", {
    style: {
      background: "var(--bg-elevated)",
      borderRadius: "var(--r-lg)",
      boxShadow: "var(--shadow-pop)",
      overflow: "hidden",
      maxWidth: "560px",
      width: "100%",
      maxHeight: "100%",
      display: "flex",
      flexDirection: "column",
    },
  });

  const img = el("img", {
    src: `assets/source/${q.src}`,
    alt: q.id,
    style: { width: "100%", maxHeight: "72vh", objectFit: "contain", background: "#fff" },
  });

  box.append(
    el("div", {
      style: {
        padding: "12px 16px",
        borderBottom: "1px solid var(--sep)",
        display: "flex",
        alignItems: "center",
        gap: "10px",
      },
    }, [
      el("span", { text: q.id, style: { fontWeight: "700", fontSize: "13px" } }),
      el("span.badge", { text: (q.knowledgePoints || []).join("、") || "—" }),
      el("span.grow", { style: { flex: "1" } }),
      el("button.btn.btn--sm.btn--bordered", {
        text: "关闭",
        onclick: close,
      }),
    ]),
    img,
    el("div", {
      style: {
        padding: "12px 16px",
        borderTop: "1px solid var(--sep)",
        fontSize: "12.5px",
        lineHeight: "1.7",
      },
      html: mathText(q.stemLatex),
    })
  );

  mask.appendChild(box);
  mask.addEventListener("click", (e) => {
    if (e.target === mask) close();
  });
  document.addEventListener("keydown", onKey);
  document.querySelector(".window").appendChild(mask);
}

/* ==========================================================================
   三、真题演练（待素材库导入）
   ========================================================================== */

export function papersView(app) {
  const root = el("div.page-mid.stack");

  root.appendChild(
    el("div.panel", {}, [
      el("div.panel__body", {}, [
        el("div.card__title", { text: "这个模块还没接通" }),
        el("div.card__desc", {
          html:
            "真题演练需要成套试卷（含分值结构、时长、官方答案），目前还没有导入任何试卷。<br>" +
            "按规划，试卷素材放在 <code>materials/papers/</code>，每套卷一个目录。" ,
        }),
      ]),
    ])
  );

  root.appendChild(
    el("div.panel", {}, [
      el("div.panel__head", {}, [el("h3.panel__title", { text: "已规划的能力" })]),
      el("div.panel__body", {}, [
        el("div", {}, [
          feature("doc", "成套试卷模型", "卷名、年份、来源、总分、时长、大题结构与分值"),
          feature("clock", "模拟考试计时", "按试卷时长倒计时，交卷后统一判分"),
          feature("target", "按得分点判分", "客观题自动判；解答题按 rubric 分步给分并给出评语"),
          feature("redo", "复盘与闭环", "错题关联知识点，一键跳回刷题模式针对性补强"),
          feature("stats", "进步曲线", "同一套卷重复演练，记录历次得分对比"),
        ]),
      ]),
    ])
  );

  root.appendChild(
    el("div.panel", {}, [
      el("div.panel__head", {}, [el("h3.panel__title", { text: "导入试卷需要准备什么" })]),
      el("div.panel__body", {}, [
        el("div.card__desc", {
          html:
            "<b>1. 试卷原件</b>（PDF / 图片，≥300dpi 正射扫描，空白卷与手写答卷分开）<br>" +
            "<b>2. 官方答案或解析</b> —— 这是真题演练的命脉，没有它就只能靠 AI 自己解题，误差大且无法验证<br>" +
            "<b>3. 每题分值</b> —— 卷面上没印的话需要给出推定值<br>" +
            "<b>4. 考试范围</b> —— 用于把题目挂到知识点上",
        }),
        el("div.row.row--gap", { style: { marginTop: "14px" } }, [
          el("button.btn.btn--bordered", {
            onclick: () => {
              toast("素材库目录：gaoshu-bank/materials/papers/");
            },
          }, ["查看素材库规范"]),
        ]),
      ]),
    ])
  );

  app.setFooter([
    el("span.muted", { text: "等待导入试卷素材" }),
  ]);

  return el("div", {}, [
    el("div.content__header", {}, [
      el("h1.content__title", { text: "真题演练" }),
      el("p.content__subtitle", { text: "按真实试卷结构作答、计时、判分与复盘" }),
    ]),
    el("div.content__scroll.scroll", {}, [root]),
  ]);
}

function feature(iconName, title, desc) {
  return el("div.choice-row", {}, [
    el("div.row.row--gap", {}, [
      el("span", {
        html: iconHTML(iconName, 17),
        style: { color: "var(--accent)", display: "flex" },
      }),
      el("div", {}, [
        el("div.choice-row__label", { text: title }),
        el("div.choice-row__hint", { text: desc }),
      ]),
    ]),
  ]);
}
