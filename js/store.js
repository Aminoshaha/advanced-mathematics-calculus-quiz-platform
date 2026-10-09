/* ==========================================================================
   store.js —— 数据、会话引擎、错题本、掌握度
   --------------------------------------------------------------------------
   两种反馈模式（本文件只负责状态，不含任何 DOM）：
     immediate  逐题即时：答完一题立刻可以看答案与解析
     batch      整组延迟：一组 groupSize 题全部答完后才给正确率与解析
   ========================================================================== */

import { storage, shuffle, uid } from "./util.js";

const K_HISTORY = "ghb.history.v1";
const K_MISTAKES = "ghb.mistakes.v1";
const K_THEME = "ghb.theme.v1";

/* ==========================================================================
   题库
   ========================================================================== */

export const bank = {
  meta: {},
  questions: [],
  analysis: {},
  byId: new Map(),

  load(data) {
    this.meta = data.meta || {};
    this.questions = data.questions || [];
    this.analysis = data.analysis || {};
    this.byId = new Map(this.questions.map((q) => [q.id, q]));
    return this;
  },

  get(id) {
    return this.byId.get(id) || null;
  },

  /** 本题的解析对象（可能缺失） */
  anaOf(id) {
    return this.analysis[id] || null;
  },

  /** 题库中出现的全部知识点，按题量降序 */
  knowledgePoints() {
    const m = new Map();
    for (const q of this.questions) {
      for (const k of q.knowledgePoints || []) m.set(k, (m.get(k) || 0) + 1);
    }
    return [...m.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, "zh"));
  },

  /** 某个知识点下的题目 */
  byKnowledgePoint(name) {
    if (!name) return this.questions.slice();
    return this.questions.filter((q) => (q.knowledgePoints || []).includes(name));
  },
};

/** 选择部分考点时，默认限额 10 题；题池不足时使用实际可用题数。 */
export function selectPracticeScope(config, names) {
  config.kps = [...new Set(names)];
  const pool = config.kps.length
    ? bank.questions.filter(q => (q.knowledgePoints || []).some(k => config.kps.includes(k)))
    : bank.questions;
  const allNames = bank.knowledgePoints().map(k => k.name);
  const partial = config.kps.length > 0 && !allNames.every(k => config.kps.includes(k));
  config.limit = partial ? Math.min(10, pool.length) : 0;
}

/* ==========================================================================
   持久化层
   ========================================================================== */

export const persist = {
  history: storage.get(K_HISTORY, []),
  mistakes: storage.get(K_MISTAKES, {}),

  saveHistory() {
    storage.set(K_HISTORY, this.history);
  },
  saveMistakes() {
    storage.set(K_MISTAKES, this.mistakes);
  },
  clearAll() {
    this.history = [];
    this.mistakes = {};
    this.saveHistory();
    this.saveMistakes();
  },
};

/** 错题本：记录并更新 */
export function recordMistake(question, picked) {
  const m = persist.mistakes;
  const cur = m[question.id];
  if (cur) {
    cur.wrongCount += 1;
    cur.lastWrongAt = Date.now();
    cur.lastPicked = picked;
    cur.resolved = false;
    delete cur.resolvedAt;
  } else {
    m[question.id] = {
      qid: question.id,
      wrongCount: 1,
      firstWrongAt: Date.now(),
      lastWrongAt: Date.now(),
      lastPicked: picked,
      correctAnswer: question.correctAnswer,
      resolved: false,
    };
  }
  persist.saveMistakes();
}

/** 答对时把错题标记为「已订正」 */
export function resolveMistake(qid) {
  const cur = persist.mistakes[qid];
  if (cur && !cur.resolved) {
    cur.resolved = true;
    cur.resolvedAt = Date.now();
    persist.saveMistakes();
  }
}

export function mistakeList({ onlyUnresolved = false } = {}) {
  return Object.values(persist.mistakes)
    .filter((m) => (onlyUnresolved ? !m.resolved : true))
    .sort((a, b) => b.lastWrongAt - a.lastWrongAt);
}

/* ==========================================================================
   掌握度
   ========================================================================== */

/**
 * 基于全部历史作答计算每个知识点的掌握度。
 * 第一版采用可解释的加权：正确率为主，答对次数提供置信度加成。
 */
export function masteryByKnowledgePoint() {
  const acc = new Map(); // kp -> {attempts, correct}

  for (const s of persist.history) {
    for (const a of s.attempts || []) {
      const q = bank.get(a.qid);
      if (!q) continue;
      for (const kp of q.knowledgePoints || []) {
        const cur = acc.get(kp) || { attempts: 0, correct: 0 };
        cur.attempts += 1;
        if (a.correct) cur.correct += 1;
        acc.set(kp, cur);
      }
    }
  }

  return bank.knowledgePoints().map(({ name, count }) => {
    const a = acc.get(name) || { attempts: 0, correct: 0 };
    const rate = a.attempts ? a.correct / a.attempts : null;
    // 样本量 < 3 时向 0.5 收缩，避免「做1题就对=100%」的假象
    const conf = Math.min(1, a.attempts / 3);
    const score = rate === null ? null : 0.5 * (1 - conf) + rate * conf;
    return {
      name,
      total: count,
      attempts: a.attempts,
      correct: a.correct,
      rate,
      score,
    };
  });
}

/** 依据掌握度给出薄弱知识点（供「系统推荐」使用） */
export function weakKnowledgePoints(limit = 4) {
  return masteryByKnowledgePoint()
    .filter((k) => k.score !== null)
    .sort((a, b) => a.score - b.score)
    .slice(0, limit)
    .map((k) => k.name);
}

/* ==========================================================================
   刷题会话
   ========================================================================== */

export const session = {
  active: null,

  /**
   * @param {object} config
   *   kps        string[]  选中的知识点，空数组=全部
   *   mode       'immediate' | 'batch'
   *   groupSize  number    整组延迟模式下每组题数
   *   limit      number    题量上限，0 = 当前范围全部题目（不重复）
   *   timed      boolean   是否计时
   *   order      'random' | 'origin'
   */
  create(config) {
    const s = {
      id: uid("sess"),
      config: {
        kps: [],
        mode: "immediate",
        groupSize: 5,
        limit: 0,
        timed: false,
        order: "random",
        ...config,
      },
      queue: [],
      cursor: 0,
      /** @type {{qid:string,picked:string,correct:boolean,ms:number,at:number}[]} */
      attempts: [],
      startedAt: Date.now(),
      endedAt: null,
      elapsedMs: 0,
      finished: false,
      /** batch 模式下：当前组是否已进入复盘态 */
      groupRevealed: false,
      _qStartAt: Date.now(),
    };
    session.active = s;
    // 开始时冻结完整题队列，避免练习过程中错题池缩小影响题量。
    const pool = [...new Map(session.pool().map(q => [q.id, q])).values()];
    const ordered = s.config.order === "random" ? shuffle(pool) : pool;
    const requested = Math.max(0, Math.floor(Number(s.config.limit) || 0));
    s.config.limit = Math.min(requested, ordered.length);
    s.queue = ordered.slice(0, requested > 0 ? requested : ordered.length).map(q => q.id);
    session._qStartAt = Date.now();
    return s;
  },

  /** 会话可用的题目池 */
  pool() {
    const cfg = session.active.config;
    // 错题重刷等场景：只在指定的题目集合内出题
    if (cfg._onlyIds && cfg._onlyIds.length) {
      return cfg._onlyIds.map((id) => bank.get(id)).filter(Boolean);
    }
    const kps = cfg.kps;
    if (!kps.length) return bank.questions.slice();
    return bank.questions.filter((q) =>
      (q.knowledgePoints || []).some((k) => kps.includes(k))
    );
  },

  /** 兼容已有调用；队列在创建时固定，做完一轮不再补入重复题。 */
  ensureAhead(need) {
    return session.active ? session.active.queue.length : 0;
  },

  isComplete() {
    const s = session.active;
    return !!s && s.queue.length > 0 && s.attempts.length >= s.queue.length;
  },

  saveDraft() {
    const s=session.active;
    if(s&&!s.finished)storage.set("ghb.active.v1",s);
  },

  restoreDraft() {
    const s=storage.get("ghb.active.v1",null);
    const valid=s&&!s.finished&&Array.isArray(s.queue)&&s.queue.length>0&&s.queue.length<=bank.questions.length&&new Set(s.queue).size===s.queue.length&&s.queue.every(id=>bank.get(id))&&Array.isArray(s.attempts)&&s.config&&Array.isArray(s.config.kps)&&["immediate","batch"].includes(s.config.mode)&&Number.isInteger(s.config.groupSize)&&s.config.groupSize>0&&Number.isInteger(s.cursor)&&s.cursor>=0&&s.cursor<s.queue.length&&Number.isFinite(s.startedAt)&&s.attempts.every(a=>a&&typeof a.qid==="string"&&Number.isInteger(a.index)&&a.index>=0&&a.index<s.queue.length&&s.queue[a.index]===a.qid&&bank.get(a.qid).options.some(o=>o.key===a.picked))&&new Set(s.attempts.map(a=>a.index)).size===s.attempts.length;
    if(!valid){storage.del("ghb.active.v1");return false;}
    // 正确性从本地题库重新计算，不信任缓存中的 correct 字段。
    s.attempts.forEach(a=>a.correct=a.picked===bank.get(a.qid).correctAnswer);
    s._qStartAt=Date.now();session.active=s;return true;
  },

  current() {
    const s = session.active;
    if (!s) return null;
    return bank.get(s.queue[s.cursor]) || null;
  },

  /** 当前题目在本组内的序号（从 1 开始） */
  indexInGroup() {
    const s = session.active;
    return (s.cursor % s.config.groupSize) + 1;
  },

  /** 本组内的作答记录 */
  groupAttempts() {
    const s = session.active;
    const start = Math.floor(s.cursor / s.config.groupSize) * s.config.groupSize;
    return s.attempts.filter((a) => {
      const qi = a.index;
      return qi >= start && qi < start + s.config.groupSize;
    });
  },

  /** 本组是否已全部答完 */
  groupComplete() {
    const s = session.active;
    const start = Math.floor(s.cursor / s.config.groupSize) * s.config.groupSize;
    // 以固定队列计算尾组，题池少于组大小时也能正常完成。
    session.ensureAhead(start + s.config.groupSize - s.cursor);
    const end = Math.min(start + s.config.groupSize, s.queue.length);
    if (end <= start) return false;
    for (let i = start; i < end; i++) {
      if (!s.attempts.some((a) => a.index === i && a.qid === s.queue[i])) return false;
    }
    return true;
  },

  /** 提交当前题的作答；返回 {correct} */
  submit(picked) {
    const s = session.active;
    const q = session.current();
    if (!q || s.finished || session.answeredCurrent()) return null;

    const now = Date.now();
    const ms = s._qStartAt ? now - s._qStartAt : 0;
    const correct = picked === q.correctAnswer;

    s.attempts.push({
      qid: q.id,
      picked,
      correct,
      ms,
      at: now,
      index: s.cursor,
    });

    if (correct) resolveMistake(q.id);
    else recordMistake(q, picked);

    return { correct, question: q, ms };
  },

  /** 是否已经答过当前题 */
  answeredCurrent() {
    const s = session.active;
    const q = session.current();
    if (!q) return null;
    return s.attempts.find((a) => a.qid === q.id && a.index === s.cursor) || null;
  },

  /** 前进一题；返回 false 表示已到（当前排到的）队尾 */
  advance() {
    const s = session.active;
    s.cursor += 1;
    s.groupRevealed = false;
    session.ensureAhead(1);
    s._qStartAt = Date.now();
    return s.cursor < s.queue.length;
  },

  /** 退出整组复盘态，继续下一组 */
  continueAfterGroup() {
    const s = session.active;
    s.groupRevealed = false;
    session.ensureAhead(1);
    s._qStartAt = Date.now();
  },

  /** 当前是否处于整组复盘页 */
  inGroupReview() {
    const s = session.active;
    return s.config.mode === "batch" && s.groupRevealed;
  },

  stats() {
    const s = session.active;
    const total = s.attempts.length;
    const correct = s.attempts.filter((a) => a.correct).length;
    return {
      total,
      correct,
      wrong: total - correct,
      rate: total ? correct / total : 0,
      elapsedMs: s.elapsedMs,
    };
  },

  /** 结束并落库 */
  finish() {
    const s = session.active;
    if (!s) return null;
    if (s.finished) return s.report;
    s.endedAt = Date.now();
    s.elapsedMs = s.endedAt - s.startedAt;
    s.finished = true;

    const st = session.stats();
    const report = {
      id: s.id,
      finishedAt: s.endedAt,
      startedAt: s.startedAt,
      elapsedMs: s.elapsedMs,
      config: s.config,
      attempts: s.attempts.slice(),
      stats: st,
      /** 本次会话涉及的知识点表现 */
      kpBreakdown: session.kpBreakdown(),
    };
    persist.history.unshift(report);
    if (persist.history.length > 200) persist.history.length = 200;
    persist.saveHistory();
    s.report = report;
    storage.del("ghb.active.v1");
    return report;
  },

  kpBreakdown() {
    const s = session.active;
    const m = new Map();
    for (const a of s.attempts) {
      const q = bank.get(a.qid);
      if (!q) continue;
      for (const kp of q.knowledgePoints || []) {
        const cur = m.get(kp) || { attempts: 0, correct: 0 };
        cur.attempts += 1;
        if (a.correct) cur.correct += 1;
        m.set(kp, cur);
      }
    }
    return [...m.entries()].map(([name, v]) => ({
      name,
      ...v,
      rate: v.attempts ? v.correct / v.attempts : 0,
    }));
  },

  discard() {
    session.active = null;
    storage.del("ghb.active.v1");
  },
};

/* ==========================================================================
   错题重刷：用错题组装一个临时题库选择
   ========================================================================== */

export function mistakesAsPool() {
  return mistakeList({ onlyUnresolved: true })
    .map((m) => bank.get(m.qid))
    .filter(Boolean);
}

/* ==========================================================================
   主题
   ========================================================================== */

export const theme = {
  current: storage.get(K_THEME, "system"),
  apply() {
    const root = document.documentElement;
    if (this.current === "system") root.removeAttribute("data-theme");
    else root.setAttribute("data-theme", this.current);
  },
  toggle() {
    const order = ["system", "light", "dark"];
    const i = order.indexOf(this.current);
    this.current = order[(i + 1) % order.length];
    storage.set(K_THEME, this.current);
    this.apply();
    return this.current;
  },
};
