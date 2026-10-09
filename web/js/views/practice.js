/* ==========================================================================
   views/practice.js —— 刷题：练习配置页 + 答题页
   ========================================================================== */

import { el, esc, fmtDuration, fmtPct } from "../util.js";
import { bank, session, weakKnowledgePoints, mistakesAsPool, selectPracticeScope } from "../store.js";
import { iconHTML, toast, confirmSheet, mathText, kpBadges, emptyState } from "../ui.js";
import { mobileQuizView } from "./mobile-practice.js";

/* ==========================================================================
   一、练习配置页
   ========================================================================== */

export function setupView(app) {
  const cfg = app.setup;
  const kps = bank.knowledgePoints();
  const poolSize = cfg.kps.length
    ? bank.questions.filter((q) => (q.knowledgePoints || []).some((k) => cfg.kps.includes(k))).length
    : bank.questions.length;

  const root = el("div.page-narrow.stack");

  /* ---- 练习范围 ---- */
  const chipWrap = el("div.chip-wrap");

  const allChip = el("button.chip", {
    "aria-pressed": String(cfg.kps.length === 0),
    onclick: () => {
      selectPracticeScope(cfg, []);
      app.render();
    },
  });
  allChip.append(document.createTextNode("全部题目"), el("span.chip__count", { text: String(bank.questions.length) }));
  chipWrap.appendChild(allChip);

  for (const kp of kps) {
    const on = cfg.kps.includes(kp.name);
    const chip = el("button.chip", {
      "aria-pressed": String(on),
      onclick: () => {
        selectPracticeScope(cfg, on ? cfg.kps.filter(x => x !== kp.name) : [...cfg.kps, kp.name]);
        app.render();
      },
    });
    chip.append(document.createTextNode(kp.name), el("span.chip__count", { text: String(kp.count) }));
    chipWrap.appendChild(chip);
  }

  const weak = weakKnowledgePoints(3);
  const scopeCard = el("div.panel", {}, [
    el("div.panel__body", {}, [
      el("div.row.row--between", { style: { marginBottom: "13px" } }, [
        el("div", {}, [
          el("div.card__title", { text: "练习范围" }),
          el("div.card__desc", { text: "不选 = 全部知识点；可多选聚焦薄弱环节" }),
        ]),
        el("div.row.row--gap", {}, [
          weak.length
            ? el("button.btn.btn--sm.btn--bordered", {
                onclick: () => {
                  selectPracticeScope(cfg, weak);
                  toast("已选中当前最薄弱的 " + weak.length + " 个知识点");
                  app.render();
                },
              }, ["选薄弱点"])
            : null,
          el("button.btn.btn--sm.btn--plain", {
            onclick: () => {
              selectPracticeScope(cfg, bank.knowledgePoints().map(k => k.name));
              app.render();
            },
          }, ["全选"]),
        ]),
      ]),
      chipWrap,
    ]),
  ]);

  /* ---- 反馈模式 ---- */
  const modeSeg = segmented(
    [
      { v: "immediate", label: "逐题即时" },
      { v: "batch", label: "整组延迟" },
    ],
    cfg.mode,
    (v) => {
      cfg.mode = v;
      app.render();
    }
  );

  const groupRow = el("div.choice-row" + (cfg.mode === "batch" ? "" : ".hidden"), {}, [
    el("div", {}, [
      el("div.choice-row__label", { text: "每组题数" }),
      el("div.choice-row__hint", { text: "一组做完后统一给出正确率与逐题解析" }),
    ]),
    el("div.choice-row__ctrl", {}, [stepper(cfg.groupSize, 2, 20, 1, (v) => { cfg.groupSize = v; app.render(); })]),
  ]);

  const modeCard = el("div.panel", {}, [
    el("div.panel__body", {}, [
      el("div.card__title", { text: "反馈模式" }),
      el("div.card__desc", { text: "做一题立刻出答案，还是做完一组再看结果" }),
      el("div", { style: { marginTop: "13px" } }, [modeSeg]),
    ]),
  ]);

  /* ---- 题量与顺序 ---- */
  const limitOptions = [
      { v: 0, label: "不限" },
      { v: 5, label: "5 题" },
      { v: 10, label: "10 题" },
      { v: 20, label: "20 题" },
    ].filter(item => item.v <= poolSize);
  if (poolSize > 0 && !limitOptions.some(item => item.v === Math.min(10, poolSize)))
    limitOptions.push({ v: Math.min(10, poolSize), label: `${Math.min(10, poolSize)} 题` });
  if (cfg.limit > 0 && !limitOptions.some(item => item.v === cfg.limit))
    limitOptions.push({ v: cfg.limit, label: `${cfg.limit} 题` });
  const limitSeg = segmented(
    limitOptions,
    cfg.limit,
    (v) => {
      cfg.limit = v;
      app.render();
    }
  );

  const orderSeg = segmented(
    [
      { v: "random", label: "随机" },
      { v: "origin", label: "原序" },
    ],
    cfg.order,
    (v) => {
      cfg.order = v;
      app.render();
    }
  );

  const timedSwitch = switchCtrl(cfg.timed, (v) => {
    cfg.timed = v;
    app.render();
  });

  const behaviorCard = el("div.panel", {}, [
    el("div.panel__body", {}, [
      groupRow,
      el("div.choice-row", {}, [
        el("div", {}, [
          el("div.choice-row__label", { text: cfg.limit > 0 ? "限额刷题" : "全部刷题" }),
          el("div.choice-row__hint", { text: "「不限」做完当前范围全部题目后自动结算，每题只做一次" }),
        ]),
        el("div.choice-row__ctrl", {}, [limitSeg]),
      ]),
      cfg.limit > 0 ? el("div.choice-row", {}, [
        el("div", {}, [
          el("div.choice-row__label", { text: "自定义题量" }),
          el("div.choice-row__hint", { text: `选定部分考点默认刷 10 题；当前范围最多 ${poolSize} 题` }),
        ]),
        el("div.choice-row__ctrl", {}, [stepper(Math.min(cfg.limit, poolSize), 1, Math.max(1, poolSize), 1, v => { cfg.limit = v; app.render(); })]),
      ]) : null,
      el("div.choice-row", {}, [
        el("div", {}, [
          el("div.choice-row__label", { text: "出题顺序" }),
          el("div.choice-row__hint", { text: "随机可避免记住题号" }),
        ]),
        el("div.choice-row__ctrl", {}, [orderSeg]),
      ]),
      el("div.choice-row", {}, [
        el("div", {}, [
          el("div.choice-row__label", { text: "计时" }),
          el("div.choice-row__hint", { text: "记录总用时，并在结算时展示" }),
        ]),
        el("div.choice-row__ctrl", {}, [timedSwitch]),
      ]),
    ]),
  ]);

  /* ---- 错题重刷入口 ---- */
  const unresolved = mistakesAsPool().length;
  const mistakeCard = unresolved
    ? el("div.panel", {}, [
        el("div.panel__body.row.row--between", { style: { gap: "16px" } }, [
          el("div", {}, [
            el("div.card__title", { text: "错题重刷" }),
            el("div.card__desc", {
              text: `错题本里还有 ${unresolved} 道未订正，直接组成一套练习`,
            }),
          ]),
          el("button.btn.btn--bordered", {
            onclick: () => {
              const ids = mistakesAsPool().map((q) => q.id);
              app.setup = { ...app.setup, kps: [] };
              session.create({ ...app.setup, limit: 0, _onlyIds: ids });
              app.stage = "quiz";
              app.render();
            },
          }, ["开始重刷"]),
        ]),
      ])
    : null;

  // 注意：mistakeCard 在「没有未订正错题」时是 null，
  // 而 Element.append(null) 会把 null 转成字面文本 "null" 插进页面，必须过滤。
  root.append(...[scopeCard, modeCard, behaviorCard, mistakeCard].filter(Boolean));

  /* ---- 底部操作条 ---- */
  const startBtn = el("button.btn.btn--primary.btn--lg", {
    disabled: poolSize === 0,
    onclick: () => {
      if (!poolSize) return;
      session.create(cfg);
      app.stage = "quiz";
      app.render();
    },
  }, ["开始刷题"]);

  app.setFooter([
    el("span.muted", { text: `当前范围共 ${poolSize} 道题 · 本次 ${cfg.limit > 0 ? Math.min(cfg.limit, poolSize) : poolSize} 题 · 完成后自动结算` }),
    el("div.grow"),
    startBtn,
  ]);

  return el("div", {}, [
    el("div.content__header", {}, [
      el("h1.content__title", { text: `${bank.title} · 题库刷题` }),
      el("p.content__subtitle", {
        text: `${bank.title} · 共 ${bank.questions.length} 道单选题 · ${bank.knowledgePoints().length} 个知识点`,
      }),
    ]),
    el("div.content__scroll.scroll", {}, [root]),
  ]);
}

/* ==========================================================================
   二、答题页
   ========================================================================== */

export function quizView(app) {
  const s = session.active;
  if (!s) {
    app.stage = "setup";
    return setupView(app);
  }

  if (session.inGroupReview()) return groupReviewView(app);

  const q = session.current();
  if (!q) {
    // 排到的题都做完了
    return finishPrompt(app);
  }
  if (typeof matchMedia === "function" && matchMedia("(max-width: 700px)").matches)
    return mobileQuizView(app, {onPick, next, askFinish, analysisPanel});

  const answered = session.answeredCurrent();
  const revealed = !!answered && s.config.mode === "immediate";

  /* ---- 头部信息 ---- */
  const attemptNo = s.attempts.length;
  const headBits = [
    el("span.badge.badge--accent", { text: `第 ${attemptNo + (answered ? 0 : 1)} 题` }),
    ...kpBadges(q.knowledgePoints),
    el("span.badge", { text: `${q.score} 分` }),
  ];

  /* ---- 题干 ---- */
  const stem = el("div.qstem", { html: mathText(q.stemLatex) });
  if(q.figureSrc)stem.appendChild(el("img.question-figure",{src:q.figureSrc,alt:"题目给定的二阶导数图像（示意图）"}));

  /* ---- 选项 ---- */
  const options = el("div.options");
  for (const opt of q.options) {
    const isPicked = answered ? answered.picked === opt.key : false;
    const isCorrect = opt.key === q.correctAnswer;

    let cls = "opt";
    if (revealed) {
      if (isCorrect) cls += " is-correct";
      else if (isPicked) cls += " is-wrong";
    } else if (isPicked) {
      cls += " is-picked";
    }

    const btn = el("button." + cls.split(" ").join("."), {
      disabled: revealed || (answered && s.config.mode === "batch") || false,
      dataset: { key: opt.key },
      onclick: () => onPick(app, opt.key),
    });
    btn.append(
      el("span.opt__key", { text: opt.key }),
      el("span.opt__body", { html: mathText(opt.latex) })
    );
    if (revealed && isCorrect) btn.appendChild(el("span.opt__mark", { text: "正确答案" }));
    else if (revealed && isPicked) btn.appendChild(el("span.opt__mark", { text: "你的选择" }));
    options.appendChild(btn);
  }

  const card = el("div.panel", {}, [
    el("div.panel__body", {}, [
      el("div.qhead", {}, headBits),
      stem,
      options,
    ]),
  ]);

  const children = [card];

  /* ---- 解析（仅逐题即时模式，答完后显示） ---- */
  if (revealed) {
    children.push(analysisPanel(q, answered.picked));
  }

  /* ---- 底部操作条 ---- */
  const footerBits = [];
  if (s.config.timed) {
    footerBits.push(
      el("span.row.row--gap.dim", {}, [
        el("span", { html: iconHTML("clock", 14) }),
        el("span.mono", { id: "elapsed", text: fmtDuration(Date.now() - s.startedAt) }),
      ])
    );
  }
  footerBits.push(el("div.grow"));

  if (!answered) {
    footerBits.push(
      el("span.dim", { text: "选择一个选项作答" })
    );
  } else if (s.config.mode === "immediate") {
    footerBits.push(
      el("button.btn.btn--primary", { onclick: () => next(app) }, ["下一题", chevron()])
    );
  } else {
    footerBits.push(
      el("button.btn.btn--primary", { onclick: () => next(app) },
        [session.groupComplete() ? "本组已完成，查看结果" : "下一题", chevron()])
    );
  }

  footerBits.push(
    el("button.btn.btn--bordered", { onclick: () => askFinish(app) }, ["结束并结算"])
  );

  app.setFooter(footerBits);

  return el("div", {}, [
    el("div.content__header", {}, [
      el("div.row.row--between", {}, [
        el("h1.content__title", { text: headerTitle(s) }),
        el("div.row.row--gap", {}, [
          el("span.dim.mono", { id: "practice-progress", "aria-live": "polite", text: progressLabel(s) }),
        ]),
      ]),
      el("div", { style: { marginTop: "12px" } }, [
        progressBarEl(s),
      ]),
    ]),
    el("div.content__scroll.scroll", {}, [el("div.page-mid.stack", {}, children)]),
  ]);
}

function headerTitle(s) {
  const kps = s.config.kps;
  if (s.config.mode === "batch") {
    const g = Math.floor(s.cursor / s.config.groupSize) + 1;
    return `${bank.title} · 第 ${g} 组 · 整组延迟`;
  }
  return bank.title + " · " + (kps.length ? kps.slice(0, 2).join(" / ") + (kps.length > 2 ? " 等" : "") : "逐题即时 · 全部题目");
}

function progressLabel(s) {
  return `第${Math.min(s.cursor + 1, s.queue.length)}题/共${s.queue.length}题`;
}

function progressBarEl(s) {
  return progressBar(s.queue.length ? Math.min(s.cursor + 1, s.queue.length) / s.queue.length : 0);
}

/* 答题动作 */
function onPick(app, key) {
  const s = session.active;
  if (session.answeredCurrent()) return;
  session.submit(key);
  app.render();
}

/* 下一题 */
function next(app) {
  const s = session.active;

  // 整组延迟模式：答完本组最后一题后，先进入整组复盘
  if (s.config.mode === "batch") {
    const atGroupEnd = s.cursor % s.config.groupSize === s.config.groupSize - 1 ||
      (s.config.limit > 0 && s.cursor === s.config.limit - 1);
    if (atGroupEnd && session.groupComplete()) {
      s.groupRevealed = true;
      app.render();
      return;
    }
  }

  session.advance();
  app.render();
}

/* 结束询问 */
async function askFinish(app) {
  const s = session.active;
  if (!s.attempts.length) {
    const ok = await confirmSheet({
      title: "还没有作答",
      text: "当前一题都没做，确定要退出吗？",
      okText: "退出",
      danger: true,
    });
    if (ok) {
      session.discard();
      app.stage = "setup";
      app.render();
    }
    return;
  }
  const st = session.stats();
  const ok = await confirmSheet({
    title: "结束本次练习？",
    text: `已答 ${st.total} 题，正确 ${st.correct} 题（${fmtPct(st.rate)}）。结束后会生成错题与解析。`,
    okText: "结束并结算",
  });
  if (!ok) return;

  const report = session.finish();
  app.report = report;
  app.stage = "report";
  app.render();
}

/* ==========================================================================
   三、整组复盘页（batch 模式）
   ========================================================================== */

function groupReviewView(app) {
  const s = session.active;
  const g = Math.floor(s.cursor / s.config.groupSize);
  const start = g * s.config.groupSize;
  const end = Math.min(start + s.config.groupSize, s.queue.length);

  const rows = [];
  let correct = 0;
  for (let i = start; i < end; i++) {
    const qid = s.queue[i];
    const q = bank.get(qid);
    const a = s.attempts.find((x) => x.qid === qid && x.index === i);
    if (!q || !a) continue;
    if (a.correct) correct++;
    rows.push({ q, a, i });
  }
  const total = rows.length;
  const rate = total ? correct / total : 0;

  const children = [
    el("div.panel", {}, [
      el("div.panel__body", {}, [
        el("div.row.row--between", { style: { marginBottom: "14px" } }, [
          el("div", {}, [
            el("div.card__title", { text: `第 ${g + 1} 组结果` }),
            el("div.card__desc", { text: `本组 ${total} 题，答对 ${correct} 题` }),
          ]),
          el("div", { style: { textAlign: "right" } }, [
            el("div.ring__num", {
              text: fmtPct(rate),
              style: { color: rate >= 0.8 ? "var(--green)" : rate >= 0.5 ? "var(--accent)" : "var(--red)" },
            }),
            el("div.ring__cap", { text: "正确率" }),
          ]),
        ]),
        el("div.progress", {}, [
          (() => {
            const f = el("div.progress__fill");
            f.style.width = Math.round(rate * 100) + "%";
            f.style.background = rate >= 0.8 ? "var(--green)" : rate >= 0.5 ? "var(--accent)" : "var(--red)";
            return f;
          })(),
        ]),
      ]),
    ]),
  ];

  for (const { q, a } of rows) {
    children.push(
      el("div.panel", {}, [
        el("div.panel__body", {}, [
          el("div.qhead", {}, [
            el("span.badge" + (a.correct ? ".badge--green" : ".badge--red"), {
              text: a.correct ? "答对" : "答错",
            }),
            ...kpBadges(q.knowledgePoints),
            el("span.badge", { text: `你的答案 ${a.picked}` }),
            !a.correct ? el("span.badge.badge--accent", { text: `正确 ${q.correctAnswer}` }) : null,
          ]),
          el("div.qstem", { html: mathText(q.stemLatex) }, q.figureSrc ? [el("img.question-figure",{src:q.figureSrc,alt:"二阶导数图像"})] : []),
          el("div.options", {}, q.options.map((opt) => {
            let cls = "opt";
            if (opt.key === q.correctAnswer) cls += " is-correct";
            else if (opt.key === a.picked) cls += " is-wrong";
            const b = el("button." + cls.split(" ").join("."), { disabled: true });
            b.append(
              el("span.opt__key", { text: opt.key }),
              el("span.opt__body", { html: mathText(opt.latex) })
            );
            return b;
          })),
          analysisPanel(q, a.picked),
        ]),
      ])
    );
  }

  const lastGroupOfQueue = end >= s.queue.length;

  app.setFooter([
    el("span.muted", { text: `第 ${g + 1} 组已复盘完毕` }),
    el("div.grow"),
    el("button.btn.btn--bordered", { onclick: () => askFinish(app) }, ["结束并结算"]),
    el("button.btn.btn--primary", {
      onclick: () => {
        session.continueAfterGroup();
        const more = session.advance();
        if (!more) {
          // 兼容旧调用；固定队列耗尽后不会补入重复题。
          session.ensureAhead(1);
        }
        app.render();
      },
    }, [lastGroupOfQueue ? "查看总结" : "继续下一组"]),
  ]);

  return el("div", {}, [
    el("div.content__header", {}, [
      el("h1.content__title", { text: `第 ${g + 1} 组 · 复盘` }),
      el("p.content__subtitle", { text: "整组延迟模式：本组全部作答完毕，下面是逐题解析" }),
    ]),
    el("div.content__scroll.scroll", {}, [el("div.page-mid.stack", {}, children)]),
  ]);
}

/* ==========================================================================
   四、队列耗尽提示
   ========================================================================== */

function finishPrompt(app) {
  const s = session.active;
  app.setFooter([
    el("div.grow"),
    el("button.btn.btn--primary", { onclick: () => askFinish(app) }, ["生成结算报告"]),
  ]);
  return el("div", {}, [
    el("div.content__header", {}, [el("h1.content__title", { text: "题目已刷完" })]),
    el("div.content__scroll.scroll", {}, [
      emptyState({
        icon: "check",
        title: "当前范围的题目都做完了",
        desc: "可以结束本次练习生成报告，或返回重新配置范围。",
      }),
    ]),
  ]);
}

/* ==========================================================================
   五、解析面板（practice 与 report 共用）
   ========================================================================== */

export function analysisPanel(q, picked) {
  const ana = bank.anaOf(q.id);
  const correct = picked === q.correctAnswer;
  const wrap = el("div.analysis");

  wrap.appendChild(
    el("div.analysis__verdict" + (correct ? ".analysis__verdict--ok" : ".analysis__verdict--bad"), {}, [
      el("span.analysis__icon", { html: iconHTML(correct ? "check" : "x", 20) }),
      el("span", { text: correct ? "回答正确" : "回答错误" }),
      el("span.grow"),
      !correct
        ? el("span", { style: { fontSize: "12.5px", fontWeight: "500" } },
            [`正确答案：${q.correctAnswer}`])
        : null,
    ])
  );

  const body = el("div.analysis__body");

  if (ana) {
    if (ana.keyIdea) {
      body.append(
        el("div.analysis__section", {}, [
          el("div.analysis__label", { text: "核心思路" }),
          el("div.analysis__keyidea", { html: mathText(ana.keyIdea) }),
        ])
      );
    }

    if (ana.steps && ana.steps.length) {
      const steps = el("div.steps");
      for (const st of ana.steps) {
        steps.appendChild(
          el("div.step", {}, [
            el("div.step__no"),
            el("div.grow", {}, [
              st.title ? el("div.step__t", { html: mathText(st.title) }) : null,
              el("div.step__c", { html: mathText(st.content) }),
            ]),
          ])
        );
      }
      body.append(
        el("div.analysis__section", {}, [
          el("div.analysis__label", { text: "解题步骤" }),
          steps,
        ])
      );
    }

    if (ana.optionNotes && ana.optionNotes.length) {
      const notes = el("div.optnotes");
      for (const n of ana.optionNotes) {
        notes.appendChild(
          el("div.optnote", {}, [
            el("div.optnote__k", { text: n.key }),
            el("div.grow", { html: mathText(n.note) }),
          ])
        );
      }
      body.append(
        el("div.analysis__section", {}, [
          el("div.analysis__label", { text: "其它选项为什么错" }),
          notes,
        ])
      );
    }

    if (ana.pitfalls) {
      body.append(
        el("div.analysis__section", {}, [
          el("div.analysis__label", { text: "易错提醒" }),
          el("div.pitfall", { html: mathText(ana.pitfalls) }),
        ])
      );
    }
  } else {
    body.append(
      el("div.analysis__section", {}, [
        el("div.analysis__label", { text: "参考答案" }),
        el("div.analysis__keyidea", {
          html: `${esc(q.correctAnswer)}　<span class="dim" style="font-size:12.5px">（本题解析待生成）</span>`,
        }),
      ])
    );
  }

  /* 原题截图（默认收起） */
  const shot = el("div.srcshot.hidden", {}, [
    el("img", {
      src: `assets/source/${q.src}`,
      alt: `${q.id} 原题截图`,
      loading: "lazy",
    }),
  ]);
  const shotBtn = el("button.accordion__btn", {
    "aria-expanded": "false",
    onclick: (e) => {
      const open = shot.classList.toggle("hidden");
      e.currentTarget.setAttribute("aria-expanded", String(!open));
    },
  });
  shotBtn.append(
    (() => {
      const w = document.createElement("span");
      w.innerHTML = iconHTML("chevron", 13);
      return w.firstElementChild;
    })(),
    document.createTextNode("查看原题截图（与原始小测核对）")
  );

  body.append(el("div.analysis__section", {}, [shotBtn, shot]));
  wrap.appendChild(body);
  return wrap;
}

/* ==========================================================================
   六、小组件
   ========================================================================== */

function chevron() {
  const w = document.createElement("span");
  w.style.display = "contents";
  w.innerHTML = iconHTML("chevron", 14);
  return w.firstElementChild;
}

function progressBar(value) {
  const f = el("div.progress__fill");
  f.style.width = Math.round(Math.max(0, Math.min(1, value)) * 100) + "%";
  return el("div.progress", {}, [f]);
}

/** macOS 分段控件 */
export function segmented(items, current, onChange) {
  const box = el("div.segmented");
  for (const it of items) {
    box.appendChild(
      el("button", {
        "aria-pressed": String(it.v === current),
        text: it.label,
        onclick: () => {
          if (it.v === current) return;
          onChange(it.v);
        },
      })
    );
  }
  return box;
}

/** 数字步进器 */
export function stepper(value, min, max, step, onChange) {
  const box = el("div.stepper");
  const label = el("span.stepper__v", { text: String(value) });
  const dec = el("button", {
    text: "−",
    disabled: value <= min,
    onclick: () => onChange(Math.max(min, value - step)),
  });
  const inc = el("button", {
    text: "+",
    disabled: value >= max,
    onclick: () => onChange(Math.min(max, value + step)),
  });
  box.append(dec, label, inc);
  return box;
}

/** macOS 开关 */
export function switchCtrl(checked, onChange) {
  const label = el("label.switch");
  const input = el("input", { type: "checkbox", checked: checked || false });
  input.addEventListener("change", () => onChange(input.checked));
  label.append(input, el("span.switch__track"));
  return label;
}
