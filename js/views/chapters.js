import { el } from "../util.js";
import { bank } from "../store.js";
import { CHAPTERS } from "../chapters.js";
import { iconHTML } from "../ui.js";

export function chaptersView(app) {
  const cards = CHAPTERS.map(chapter => el("section.panel.chapter-card" + (chapter.available ? "" : ".chapter-card--pending"), {}, [
    el("div.panel__body.stack", {}, [
      el("div.row.row--between", {}, [
        el("span.chapter-icon", { html: iconHTML(chapter.available ? "practice" : "doc", 24) }),
        el("span.badge" + (chapter.available ? ".badge--green" : ""), { text: chapter.available ? "可练习" : "待开发" }),
      ]),
      el("h2.chapter-card__title", { text: chapter.title }),
      el("p.card__desc", { text: chapter.subtitle }),
      el("div.chapter-card__meta", { text: chapter.available ? `${bank.chapterQuestions(chapter.id).length} 道单选题 · ${bank.knowledgePoints(chapter.id).length} 个考点 · 逐题解析` : "题目、解析与练习记录将按小测分别组织" }),
      el("button.btn" + (chapter.available ? ".btn--primary" : ".btn--bordered"), {
        disabled: !chapter.available,
        onclick: () => { if (chapter.available) app.openChapter(chapter.id); },
      }, [chapter.available ? `进入${chapter.title}题库` : "敬请期待"]),
    ]),
  ]));
  app.setFooter([el("span.muted", { text: "先选章节，再选择考点与本次题量" })]);
  return el("div", {}, [
    el("div.content__header", {}, [
      el("h1.content__title", { text: "题库刷题" }),
      el("p.content__subtitle", { text: "按章节与小测组织练习，逐步补齐高数题库" }),
    ]),
    el("div.content__scroll.scroll", {}, [el("div.page-mid.stack", {}, [
      el("div.chapter-grid", {}, cards),
    ])]),
  ]);
}
