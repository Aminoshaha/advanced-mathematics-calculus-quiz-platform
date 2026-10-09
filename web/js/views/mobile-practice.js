import { el, fmtDuration } from "../util.js";
import { bank, session } from "../store.js";
import { mathText, iconHTML } from "../ui.js";

// 手机布局参照原小测：顶部进度与答题卡，题干、选项、得分卡、解析，底部切题。
export function mobileQuizView(app, actions) {
  const s = session.active, q = session.current();
  const answer = session.answeredCurrent();
  const revealed = !!answer && s.config.mode === "immediate";
  const options = el("div.mobile-options");
  for (const option of q.options) {
    const correct = option.key === q.correctAnswer;
    const picked = answer?.picked === option.key;
    options.appendChild(el("button.mobile-option" + (revealed && correct ? ".is-correct" : revealed && picked ? ".is-wrong" : picked ? ".is-picked" : ""), {
      disabled: !!answer, dataset: { key: option.key },
      onclick: () => actions.onPick(app, option.key),
    }, [el("span.mobile-option__letter", {text: option.key + "."}), el("span", {html: mathText(option.latex)})]));
  }
  const children = [
    el("div.mobile-question", {}, [
      el("div.mobile-question__type", {text: `${s.cursor + 1}.（单选题，${q.score} 分）`}),
      el("div.qstem", {html: mathText(q.stemLatex)}), options,
    ]),
  ];
  if (revealed) {
    children.push(el("section.mobile-answer", {}, [
      el("h2", {text: "我的答案："}),
      el("div.mobile-answer__picked", {}, [el("span", {html: iconHTML(answer.correct ? "check" : "x", 28), class: answer.correct ? "answer-ok" : "answer-wrong"}), el("span", {text: answer.picked})]),
      el("p", {text: `本题得分：${answer.correct ? q.score : 0} 分`}),
    ]), el("section.mobile-reference", {}, [
      el("h2", {text: "正确答案"}), el("p.answer-ok", {text: q.correctAnswer}),
      el("h2", {text: "知识点"}), el("div.chip-wrap", {}, q.knowledgePoints.map(k => el("span.chip", {text:k}))),
      actions.analysisPanel(q, answer.picked),
    ]));
  } else if (answer) children.push(el("p.mobile-batch-note", {text: "答案已记录，完成本组后统一查看解析。"}));
  app.setFooter([
    el("button.btn.mobile-previous", {disabled: s.cursor === 0, onclick: () => {s.cursor--; s.groupRevealed=false; app.render();}}, ["上一题"]),
    el("button.btn.btn--primary.mobile-next", {disabled: !answer, onclick: () => actions.next(app)}, [s.config.mode === "batch" && session.groupComplete() ? "查看本组结果" : "下一题"]),
  ]);
  return el("div.mobile-quiz", {}, [
    el("div.mobile-quiz__top", {}, [
      el("button.mobile-back", {"aria-label":"返回章节", onclick: () => app.go("chapters")}, ["‹"]),
      el("div.mobile-progress", {}, [el("span", {id:"practice-progress", text:`第${s.cursor+1}题/共${s.queue.length}题`}), el("div.progress", {}, [el("div.progress__fill", {style:{width:((s.cursor+1)/s.queue.length*100)+"%"}})])]),
      el("button.mobile-answer-card", {onclick: () => showAnswerCard(app, actions)}, [el("span", {html:iconHTML("answercard",22)}), el("span",{text:"答题卡"})]),
    ]),
    el("div.content__scroll.scroll.mobile-quiz__scroll", {}, children),
    s.config.timed ? el("span.mobile-timer", {id:"elapsed",text:fmtDuration(Date.now()-s.startedAt)}) : null,
  ]);
}

function showAnswerCard(app, actions) {
  const s=session.active, mask=el("div.sheet-mask"), box=el("section.answer-sheet", {role:"dialog","aria-modal":"true","aria-label":"答题卡"});
  const close=()=>{mask.remove();document.removeEventListener("keydown",onKey);};
  const onKey=e=>{if(e.key==="Escape")close();};
  box.appendChild(el("div.row.row--between",{},[el("h2",{text:"答题卡"}),el("button.btn",{"aria-label":"关闭答题卡",onclick:close},["关闭"])]));
  box.appendChild(el("p.dim",{text:`已答 ${s.attempts.length}/${s.queue.length} 题 · 点击已答题回看，答案不可修改`}));
  const firstEmpty=s.queue.findIndex((id,i)=>!s.attempts.some(a=>a.index===i));
  box.appendChild(el("div.answer-sheet__grid",{},s.queue.map((id,i)=>{
    const attempt=s.attempts.find(a=>a.index===i);
    // 整组延迟不提前暴露正确与否。
    const state=attempt ? (s.config.mode==="immediate" ? attempt.correct ? ".is-correct" : ".is-wrong" : ".is-answered") : "";
    return el("button.answer-sheet__number"+state,{text:String(i+1),disabled:!attempt&&i!==firstEmpty,"aria-current":i===s.cursor?"step":null,onclick:()=>{close();s.cursor=i;s.groupRevealed=false;app.render();}});
  })));
  box.appendChild(el("button.btn.btn--primary",{onclick:()=>{close();actions.askFinish(app);}},["结束并结算"]));
  mask.appendChild(box);mask.addEventListener("click",e=>{if(e.target===mask)close();});
  document.addEventListener("keydown",onKey);document.querySelector(".window").appendChild(mask);
  box.querySelector("button").focus();
}
