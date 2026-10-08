/* ==========================================================================
   tex.js —— 零依赖的 LaTeX 子集渲染器
   --------------------------------------------------------------------------
   为什么自己写：本机无网络，无法使用 KaTeX / MathJax。
   本渲染器只覆盖高等数学题库实际用到的结构：
     分式 \frac、根号 \sqrt、极限/求和的下标、上下标、希腊字母、
     函数名 \sin \ln、关系符 \to \le \infty、文本 \text{}
   未识别的命令会降级为去掉反斜杠的字面文本，不会抛错。

   对外接口：
     Tex.math(src)     -> 一段数学公式的 HTML
     Tex.text(str)     -> 混排文本的 HTML（中文 + $...$ 行内 + $$...$$ 独立公式）
     Tex.plain(str)    -> 去掉 LaTeX 记号后的纯文本（用于导出/无障碍）
   ========================================================================== */

const Tex = (() => {
  "use strict";

  /* ---------- 符号表 ---------- */

  const GREEK = {
    alpha: "α", beta: "β", gamma: "γ", delta: "δ", epsilon: "ε",
    varepsilon: "ε", zeta: "ζ", eta: "η", theta: "θ", vartheta: "ϑ",
    iota: "ι", kappa: "κ", lambda: "λ", mu: "μ", nu: "ν", xi: "ξ",
    pi: "π", rho: "ρ", sigma: "σ", tau: "τ", upsilon: "υ", phi: "φ",
    varphi: "φ", chi: "χ", psi: "ψ", omega: "ω",
    Gamma: "Γ", Delta: "Δ", Theta: "Θ", Lambda: "Λ", Xi: "Ξ", Pi: "Π",
    Sigma: "Σ", Upsilon: "Υ", Phi: "Φ", Psi: "Ψ", Omega: "Ω",
  };

  const SYMBOLS = {
    infty: "∞", "∞": "∞", partial: "∂", nabla: "∇",
    to: "→", rightarrow: "→", longrightarrow: "⟶", leftarrow: "←",
    leftrightarrow: "↔", Rightarrow: "⇒", Leftrightarrow: "⇔",
    mapsto: "↦", uparrow: "↑", downarrow: "↓", implies: "⟹",
    cdot: "·", cdots: "⋯", ldots: "…", dots: "…", vdots: "⋮", ddots: "⋱",
    times: "×", div: "÷", pm: "±", mp: "∓", ast: "∗", star: "⋆", circ: "∘",
    le: "≤", leq: "≤", ge: "≥", geq: "≥", ne: "≠", neq: "≠",
    approx: "≈", equiv: "≡", sim: "∼", simeq: "≃", cong: "≅",
    propto: "∝", ll: "≪", gg: "≫",
    in: "∈", notin: "∉", ni: "∋", subset: "⊂", supset: "⊃",
    subseteq: "⊆", supseteq: "⊇", cup: "∪", cap: "∩",
    emptyset: "∅", varnothing: "∅", setminus: "∖",
    forall: "∀", exists: "∃", nexists: "∄",
    angle: "∠", perp: "⊥", parallel: "∥",
    therefore: "∴", because: "∵",
    prime: "′", degree: "°", deg: "°",
    Re: "ℜ", Im: "ℑ", ell: "ℓ", hbar: "ℏ",
    int: "∫", iint: "∬", iiint: "∭", oint: "∮",
    sum: "∑", prod: "∏", bigcup: "⋃", bigcap: "⋂",
    square: "□", blacksquare: "■", triangle: "△", blacktriangle: "▲",
    vartriangle: "△", triangledown: "▽", Diamond: "◇", lozenge: "◊",
    langle: "⟨", rangle: "⟩", lceil: "⌈", rceil: "⌉",
    lfloor: "⌊", rfloor: "⌋", vert: "|", Vert: "‖", backslash: "\\",
    Longrightarrow: "⟹", Longleftarrow: "⟸", Longleftrightarrow: "⟺",
    longmapsto: "⟼", hookrightarrow: "↪", twoheadrightarrow: "↠",
    nrightarrow: "↛", leadsto: "⇝", checkmark: "✓", cline: "─",
    lim: "lim", limsup: "lim sup", liminf: "lim inf",
    max: "max", min: "min", sup: "sup", inf: "inf",
    sin: "sin", cos: "cos", tan: "tan", cot: "cot", sec: "sec", csc: "csc",
    arcsin: "arcsin", arccos: "arccos", arctan: "arctan", arccot: "arccot",
    sinh: "sinh", cosh: "cosh", tanh: "tanh", coth: "coth",
    ln: "ln", log: "log", lg: "lg", exp: "exp",
    det: "det", dim: "dim", ker: "ker", gcd: "gcd", lcm: "lcm",
    arg: "arg", sgn: "sgn", mod: "mod",
    mid: "|", colon: ":", ";": ";",
  };

  /** 函数名与算子：直立排版，前后留细空隙 */
  const UPRIGHT = new Set([
    "sin", "cos", "tan", "cot", "sec", "csc", "arcsin", "arccos", "arctan",
    "arccot", "sinh", "cosh", "tanh", "coth", "ln", "log", "lg", "exp",
    "det", "dim", "ker", "gcd", "lcm", "arg", "sgn", "mod",
  ]);

  /** 下标放在正下方的大算子 */
  const UNDER_OPS = new Set([
    "lim", "limsup", "liminf", "max", "min", "sup", "inf",
    "sum", "prod", "bigcup", "bigcap",
  ]);

  /** 其中属于「大符号」的那些：按数学轴居中，而不是坐在基线上 */
  const SYMBOL_BIGOPS = new Set(["∑", "∏", "⋃", "⋂"]);

  /** 积分号：下标跟在右侧 */
  const INTEGRALS = new Set(["int", "iint", "iiint", "oint"]);

  /** 运算符：需要两侧间距 */
  const BIN_OPS = new Set([
    "+", "-", "±", "∓", "×", "÷", "·", "=", "≠", "≈", "≡", "∼", "≃", "≅",
    "<", ">", "≤", "≥", "≪", "≫", "→", "←", "↔", "⇒", "⇔", "⟹", "↦",
    "∈", "∉", "⊂", "⊃", "⊆", "⊇", "∪", "∩", "∖", "∝", "≡",
  ]);

  /** 空白命令 */
  const SPACES = {
    ",": "0.17em", ":": "0.22em", ";": "0.28em", " ": "0.3em",
    quad: "1em", qquad: "2em", "!": "-0.17em",
  };

  const ESCAPES = {
    "%": "%", $: "$", "&": "&", "#": "#", _: "_", "{": "{", "}": "}",
  };

  /**
   * 纯排版开关。它们不产生任何可见内容，且**不该抢走算子的上下标**。
   *
   * 踩过的坑：\\lim\\limits_{x \\to 0} 里的 \\limits 若漏进解析器，
   * 会各自变成一个空节点，紧接着的 _ 就挂到这个空节点上，
   * 于是极限条件跑到 lim 的右边而不是正下方。
   */
  const STYLE_SWITCHES = new Set([
    "limits", "nolimits", "displaystyle", "textstyle", "scriptstyle",
  ]);

  /**
   * 校验 LaTeX 的长度写法（2pt / 1em / 3ex …）。
   * 用于 \\[2pt] 这类「换行并留间距」的写法；非法则忽略，绝不把原文漏到页面上。
   */
  function normalizeRowGap(raw) {
    if (!raw) return null;
    const s = String(raw).trim();
    return /^-?\d*\.?\d+(pt|em|ex|px|mm|cm|in|pc|%)$/.test(s) ? s : null;
  }

  /* ---------- 转义 ---------- */

  const ESC_MAP = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ESC_MAP[c]);

  /* ---------- 词法分析 ---------- */

  function tokenize(src) {
    const toks = [];
    let i = 0;
    while (i < src.length) {
      const c = src[i];

      // 分段函数：\begin{cases} 行 \\ 行 \end{cases}
      // 行分隔符可能是 \\、\\*、或带间距的 \\[2pt]（换行并额外留 2pt）。
      // 必须把可选的 [间距] 一起吃掉，否则方括号被丢弃后会残留成可见的 "2pt"。
      if (src.startsWith("\\begin{cases}", i)) {
        const head = "\\begin{cases}";
        const endTag = "\\end{cases}";
        const end = src.indexOf(endTag, i + head.length);
        const inner = src.slice(i + head.length, end === -1 ? src.length : end);

        const parts = [];
        const sepRe = /\\\\\*?(?:\[([^\]]*)\])?/g;
        let last = 0;
        let sm;
        while ((sm = sepRe.exec(inner))) {
          parts.push({ text: inner.slice(last, sm.index), gap: sm[1] || null });
          last = sm.index + sm[0].length;
        }
        parts.push({ text: inner.slice(last), gap: null });

        const rows = parts.map((p) => ({
          cells: p.text.split("&").map((cell) => cell.trim()),
          gap: normalizeRowGap(p.gap),
        }));

        toks.push({ t: "cases", rows });
        i = end === -1 ? src.length : end + endTag.length;
        continue;
      }

      // 其它环境（array / aligned / matrix）：丢掉 begin/end 外壳，内容照常解析，
      // 避免静默吞掉整段公式。
      if (src.startsWith("\\begin{", i) || src.startsWith("\\end{", i)) {
        const close = src.indexOf("}", i);
        i = close === -1 ? src.length : close + 1;
        continue;
      }

      if (c === "\\") {
        const m = /^\\([a-zA-Z]+|.)/.exec(src.slice(i));
        if (!m) {
          toks.push({ t: "char", c: "\\" });
          i += 1;
          continue;
        }
        toks.push({ t: "cmd", name: m[1] });
        i += m[0].length;
        continue;
      }

      if (c === "{") { toks.push({ t: "{" }); i++; continue; }
      if (c === "}") { toks.push({ t: "}" }); i++; continue; }
      if (c === "^") { toks.push({ t: "^" }); i++; continue; }
      if (c === "_") { toks.push({ t: "_" }); i++; continue; }
      if (c === "[") { toks.push({ t: "[" }); i++; continue; }
      if (c === "]") { toks.push({ t: "]" }); i++; continue; }

      // 连续数字作为一个原子，避免逐个加间距
      if (/[0-9.]/.test(c)) {
        const m = /^[0-9.]+/.exec(src.slice(i));
        toks.push({ t: "char", c: m[0] });
        i += m[0].length;
        continue;
      }

      toks.push({ t: "char", c });
      i++;
    }
    return toks;
  }

  /* ---------- 语法分析 ---------- */

  function parse(toks) {
    let p = 0;

    const peek = () => toks[p];
    const next = () => toks[p++];

    function parseSeq(stopToken) {
      const nodes = [];
      while (p < toks.length) {
        const tk = toks[p];
        if (tk.t === "}") {
          if (stopToken === "}") break;
          p++; // 多余的右括号，忽略
          continue;
        }
        if (stopToken && tk.t === stopToken) break;
        const node = parseAtom();
        if (node) nodes.push(node);
      }
      return nodes;
    }

    function parseGroup() {
      if (peek() && peek().t === "{") {
        p++;
        const body = parseSeq("}");
        if (peek() && peek().t === "}") p++;
        return { t: "group", body };
      }
      return { t: "group", body: [] };
    }

    /** 读取一个参数：{...} 或单个原子 */
    function parseArg() {
      const tk = peek();
      if (!tk) return { t: "group", body: [] };
      if (tk.t === "{") return parseGroup();
      // 单 token 参数不能再吞掉后续上下标：
      //   x_n^2 的语义是「x 同时带下标 n 和上标 2」，而非「x 的下标是 n²」
      const atom = parseAtom(true);
      return { t: "group", body: atom ? [atom] : [] };
    }

    function parseAtom(single) {
      const tk = next();
      if (!tk) return null;

      let node = null;

      if (tk.t === "char") {
        node = { t: "char", c: tk.c };
      } else if (tk.t === "cases") {
        node = { t: "cases", rows: tk.rows };
      } else if (tk.t === "{") {
        p--; // 回到 {
        node = parseGroup();
      } else if (tk.t === "cmd") {
        node = parseCommand(tk.name);
      } else if (tk.t === "}" || tk.t === "]" || tk.t === "[") {
        return null;
      } else if (tk.t === "^" || tk.t === "_") {
        return null;
      }

      if (!node) return null;
      if (single) return node;

      // 先吞掉紧跟其后的纯排版开关（\limits / \nolimits / \displaystyle …）。
      // 这些命令本该在预处理阶段就被剥掉；这里再挡一道，即使漏进来也只会被
      // 无声丢弃，而不会各自变成空节点把 _ / ^ 从算子手里抢走。
      while (
        p < toks.length &&
        toks[p].t === "cmd" &&
        STYLE_SWITCHES.has(toks[p].name)
      ) {
        p++;
      }

      // 处理上下标
      let sub = null;
      let sup = null;
      let guard = 0;
      while (p < toks.length && guard++ < 8) {
        const nt = toks[p];
        if (nt.t === "_" && !sub) {
          p++;
          sub = parseArg();
        } else if (nt.t === "^" && !sup) {
          p++;
          sup = parseArg();
        } else break;
      }

      if (sub || sup) {
        node = { t: "script", base: node, sub, sup };
      }
      return node;
    }

    function parseCommand(name) {
      // 空白
      if (name in SPACES) return { t: "space", w: SPACES[name] };

      // 换行符 \\ / \newline / \cr（可带 \\* 或 \\[2pt]，一律吃掉参数）
      if (name === "\\" || name === "newline" || name === "cr" || name === "*") {
        if (peek() && peek().t === "[") {
          p++;
          while (p < toks.length && toks[p].t !== "]") p++;
          if (p < toks.length) p++;
        }
        return { t: "space", w: "0.5em" };
      }

      // 转义字符
      if (name in ESCAPES) return { t: "char", c: ESCAPES[name] };

      // 分式
      if (name === "frac" || name === "dfrac" || name === "tfrac" || name === "cfrac") {
        const num = parseArg();
        const den = parseArg();
        return { t: "frac", num, den, big: name !== "tfrac" };
      }

      // 根号（支持 \sqrt[3]{x}）
      if (name === "sqrt") {
        let index = null;
        if (peek() && peek().t === "[") {
          p++;
          index = { t: "group", body: parseSeq("]") };
          if (peek() && peek().t === "]") p++;
        }
        const body = parseArg();
        return { t: "sqrt", index, body };
      }

      // 定界符尺寸命令（\left \right \bigl \bigr \Bigl ... ）：
      // 丢掉命令本身，保留紧跟的定界符，使括号照常显示。
      if (
        /^(left|right|bigl|bigr|Bigl|Bigr|biggl|biggr|Biggl|Biggr|bigm|Bigm|big|Big|bigg|Bigg)$/.test(name)
      ) {
        const nt = peek();
        if (nt && nt.t === "char") {
          p++;
          return { t: "char", c: nt.c, delim: true };
        }
        if (nt && nt.t === "cmd") {
          const sym = SYMBOLS[nt.name];
          if (sym !== undefined) {
            p++;
            return { t: "char", c: sym, delim: true };
          }
        }
        return { t: "space", w: "0" };
      }

      // 纯排版开关：直接丢弃
      if (
        name === "displaystyle" || name === "textstyle" || name === "scriptstyle" ||
        name === "limits" || name === "nolimits" || name === "mathstrut" ||
        name === "strut" || name === "notag" || name === "nonumber" ||
        name === "allowbreak" || name === "relax"
      ) {
        return { t: "space", w: "0" };
      }

      // 黑板粗体：\mathbb{N} / \mathbb{R} 等
      if (name === "mathbb" || name === "Bbb" || name === "mathbf" || name === "boldsymbol" || name === "bm") {
        const g = parseArg();
        if (name === "mathbb" || name === "Bbb") {
          const BB = { N: "ℕ", R: "ℝ", Z: "ℤ", Q: "ℚ", C: "ℂ", P: "ℙ", E: "𝔼", F: "𝔽" };
          const flat = g.body.map((x) => (x.t === "char" ? x.c : "")).join("");
          if (BB[flat]) return { t: "char", c: BB[flat] };
          return { t: "mathbb", body: g.body };
        }
        return { t: "bold", body: g.body };
      }

      // 上下堆叠：\xrightarrow{上} \xlongequal{上} \overset{上}{基} \underset{下}{基} \stackrel{上}{基}
      if (name === "xrightarrow" || name === "xleftarrow" || name === "xlongequal" ||
          name === "xleftrightarrow" || name === "xRightarrow" || name === "xLeftrightarrow") {
        const GLYPH = {
          xrightarrow: "⟶", xleftarrow: "⟵", xlongequal: "=",
          xleftrightarrow: "⟷", xRightarrow: "⟹", xLeftrightarrow: "⟺",
        };
        let under = null;
        if (peek() && peek().t === "[") {
          p++;
          under = { t: "group", body: parseSeq("]") };
          if (peek() && peek().t === "]") p++;
        }
        const over = parseArg();
        return { t: "stack", over, base: { t: "raw", text: GLYPH[name] || "⟶" }, under };
      }

      if (name === "overset" || name === "stackrel") {
        const over = parseArg();
        const base = parseArg();
        return { t: "stack", over, base, under: null };
      }
      if (name === "underset") {
        const under = parseArg();
        const base = parseArg();
        return { t: "stack", over: null, base, under };
      }

      // 文本模式
      if (name === "text" || name === "mathrm" || name === "operatorname" ||
          name === "mbox" || name === "textrm" || name === "mathsf") {
        const g = parseArg();
        return { t: "text", body: g.body };
      }
      if (name === "mathbf" || name === "boldsymbol" || name === "bm") {
        const g = parseArg();
        return { t: "bold", body: g.body };
      }
      if (name === "mathit") {
        const g = parseArg();
        return { t: "italic", body: g.body };
      }
      if (name === "overline" || name === "bar") {
        const g = parseArg();
        return { t: "over", body: g.body, mark: "¯" };
      }
      if (name === "underline") {
        const g = parseArg();
        return { t: "under", body: g.body };
      }
      if (name === "vec") {
        const g = parseArg();
        return { t: "over", body: g.body, mark: "→" };
      }
      if (name === "hat" || name === "widehat") {
        const g = parseArg();
        return { t: "over", body: g.body, mark: "^" };
      }
      if (name === "tilde" || name === "widetilde") {
        const g = parseArg();
        return { t: "over", body: g.body, mark: "~" };
      }
      if (name === "dot") {
        const g = parseArg();
        return { t: "over", body: g.body, mark: "˙" };
      }
      if (name === "phantom" || name === "hspace" || name === "vspace" ||
          name === "label" || name === "tag" || name === "nonumber") {
        parseArg();
        return { t: "space", w: "0.4em" };
      }
      if (name === "limits" || name === "begin" || name === "end") {
        if (name !== "limits") parseArg();
        return { t: "space", w: "0" };
      }

      // 希腊字母
      if (GREEK[name]) return { t: "char", c: GREEK[name], greek: true };

      // 积分号
      if (INTEGRALS.has(name)) {
        return { t: "bigop", glyph: SYMBOLS[name], cls: "tex-int", under: false };
      }

      // 正下方带下标的算子
      if (UNDER_OPS.has(name)) {
        return { t: "bigop", glyph: SYMBOLS[name], cls: "tex-lim", under: true };
      }

      // 普通符号
      if (SYMBOLS[name] !== undefined) {
        const glyph = SYMBOLS[name];
        if (UPRIGHT.has(name)) {
          return { t: "upright", text: glyph };
        }
        return { t: "char", c: glyph };
      }

      // 未知命令：降级为字面文本
      return { t: "unknown", text: name };
    }

    const body = parseSeq(false);
    return { t: "root", body };
  }

  /* ---------- 生成 HTML ---------- */

  function emit(nodes) {
    return nodes.map(emitNode).join("");
  }

  function emitNode(n) {
    if (!n) return "";
    switch (n.t) {
      case "root":
      case "group":
        return emit(n.body);

      case "char":
        return emitChar(n);

      case "space":
        return `<span style="display:inline-block;width:${n.w}"></span>`;

      case "text":
        return `<span class="tex-text">${emit(n.body)}</span>`;

      case "bold":
        return `<b>${emit(n.body)}</b>`;

      case "italic":
        return `<i>${emit(n.body)}</i>`;

      case "upright":
        return `<span class="tex-fn">${esc(n.text)}</span>`;

      case "unknown":
        return `<span class="tex-unknown">${esc(n.text)}</span>`;

      case "frac":
        return (
          `<span class="tex-frac${n.big ? "" : " tex-frac--sm"}">` +
          `<span class="tex-frac__n">${emit(n.num.body)}</span>` +
          `<span class="tex-frac__d">${emit(n.den.body)}</span>` +
          `</span>`
        );

      case "sqrt":
        return (
          `<span class="tex-sqrt">` +
          (n.index ? `<span class="tex-sqrt__i">${emit(n.index.body)}</span>` : "") +
          `<span class="tex-sqrt__r">√</span>` +
          `<span class="tex-sqrt__b">${emit(n.body.body)}</span>` +
          `</span>`
        );

      case "over":
        return (
          `<span class="tex-accent"><span class="tex-accent__m">${esc(n.mark)}</span>` +
          `<span class="tex-accent__b">${emit(n.body)}</span></span>`
        );

      case "under":
        return `<span class="tex-underline">${emit(n.body)}</span>`;

      case "bigop":
        return emitBigOp(n);

      case "raw":
        return `<span class="tex-raw">${esc(n.text)}</span>`;

      case "mathbb":
        return `<span class="tex-mathbb">${emit(n.body)}</span>`;

      case "stack":
        return (
          `<span class="tex-stack">` +
          (n.over ? `<span class="tex-stack__t">${emit(n.over.body)}</span>` : "") +
          `<span class="tex-stack__b">${emitNode(n.base)}</span>` +
          (n.under ? `<span class="tex-stack__u">${emit(n.under.body)}</span>` : "") +
          `</span>`
        );

      case "cases":
        return (
          `<span class="tex-cases">` +
          `<span class="tex-cases__brace">{</span>` +
          `<span class="tex-cases__rows">` +
          n.rows
            .map(
              (row) =>
                `<span class="tex-cases__row"` +
                (row.gap ? ` style="margin-bottom:${row.gap}"` : "") +
                `>` +
                row.cells
                  .map(
                    (cell, ci) =>
                      `<span class="tex-cases__cell${ci > 0 ? " tex-cases__cell--cond" : ""}">` +
                      math(cell) +
                      `</span>`
                  )
                  .join("") +
                `</span>`
            )
            .join("") +
          `</span></span>`
        );

      case "script":
        return emitScript(n);

      default:
        return "";
    }
  }

  function emitChar(n) {
    const c = n.c;
    // 拉丁字母与希腊字母斜体（数学变量惯例），数字与中文直立
    if (/^[a-zA-Z]$/.test(c)) return `<i>${esc(c)}</i>`;
    if (n.greek) return `<i class="tex-greek">${esc(c)}</i>`;
    if (BIN_OPS.has(c)) {
      const tight = c === "!" || c === "'";
      return `<span class="tex-bin${tight ? " tex-bin--tight" : ""}">${esc(c)}</span>`;
    }
    return esc(c);
  }

  function emitBigOp(n) {
    const sym = SYMBOL_BIGOPS.has(n.glyph) ? " tex-lim--sym" : "";
    return `<span class="tex-bigop ${n.cls}${sym}" data-glyph="${esc(n.glyph)}">` +
      `<span class="tex-bigop__g">${esc(n.glyph)}</span></span>`;
  }

  function emitScript(n) {
    const base = emitNode(n.base);
    const sub = n.sub ? emit(n.sub.body) : "";
    const sup = n.sup ? emit(n.sup.body) : "";

    // 大算子：下标放到正下方
    if (n.base && n.base.t === "bigop" && n.base.under) {
      const sym = SYMBOL_BIGOPS.has(n.base.glyph) ? " tex-lim--sym" : "";
      return (
        `<span class="tex-lim${sym}">` +
        `<span class="tex-lim__t">${sup}</span>` +
        `<span class="tex-lim__m">${esc(n.base.glyph)}</span>` +
        `<span class="tex-lim__b">${sub}</span>` +
        `</span>`
      );
    }

    // 积分号：上下标贴右侧
    if (n.base && n.base.t === "bigop" && !n.base.under) {
      return (
        `<span class="tex-int-wrap">` +
        `<span class="tex-bigop tex-int">${esc(n.base.glyph)}</span>` +
        `<span class="tex-scripts">` +
        (sup ? `<span class="tex-scripts__s">${sup}</span>` : "") +
        (sub ? `<span class="tex-scripts__b">${sub}</span>` : "") +
        `</span></span>`
      );
    }

    // 上下标同时存在：竖向堆叠
    if (sub && sup) {
      return (
        `<span class="tex-script2">${base}` +
        `<span class="tex-script2__stack">` +
        `<span class="tex-script2__s">${sup}</span>` +
        `<span class="tex-script2__b">${sub}</span>` +
        `</span></span>`
      );
    }
    if (sup) return `<span class="tex-script">${base}<sup>${sup}</sup></span>`;
    if (sub) return `<span class="tex-script">${base}<sub>${sub}</sub></span>`;
    return base;
  }

  /* ---------- 对外接口 ---------- */

  /** 渲染一段纯数学公式 */
  function math(src) {
    if (src === null || src === undefined) return "";
    // 预处理：剥掉纯排版开关。
    //
    // ⚠️ 这里**不能用 \b**：JS 正则里 "_" 属于单词字符，而 \limits 后面
    //    通常紧跟 "_"（\lim\limits_{x \to 0}），\b 匹配失败会导致开关漏进
    //    解析器，把下限从算子手里抢走 → 极限条件跑到 lim 右边。
    //    改用「后面不是字母」的负向前瞻。
    const s = String(src)
      .replace(/\\(limits|nolimits|displaystyle|textstyle|scriptstyle)(?![a-zA-Z])/g, "")
      .trim();
    if (!s) return "";
    try {
      return emit(parse(tokenize(s)).body);
    } catch (err) {
      if (typeof console !== "undefined") console.warn("[tex] 渲染失败，降级为原文：", s, err);
      return `<span class="tex-unknown">${esc(s)}</span>`;
    }
  }

  /**
   * 渲染混排文本：中文正文 + $行内公式$ + $$独立公式$$
   * 正文里的换行会被转换为 <br>
   */
  function text(str) {
    if (str === null || str === undefined) return "";
    const s = String(str);
    const out = [];
    let i = 0;

    while (i < s.length) {
      // 独立公式
      if (s.startsWith("$$", i)) {
        const end = s.indexOf("$$", i + 2);
        if (end !== -1) {
          out.push(`<span class="tex-display">${math(s.slice(i + 2, end))}</span>`);
          i = end + 2;
          continue;
        }
      }
      // 行内公式
      if (s[i] === "$") {
        const end = s.indexOf("$", i + 1);
        if (end !== -1 && end > i + 1) {
          out.push(`<span class="tex-inline">${math(s.slice(i + 1, end))}</span>`);
          i = end + 1;
          continue;
        }
      }
      // \( \) 形式
      if (s.startsWith("\\(", i)) {
        const end = s.indexOf("\\)", i + 2);
        if (end !== -1) {
          out.push(`<span class="tex-inline">${math(s.slice(i + 2, end))}</span>`);
          i = end + 2;
          continue;
        }
      }

      // 普通文本：一直取到下一个 $ 或 \(
      // 未闭合的公式分隔符按字面文本处理，保证每轮至少前进一个字符。
      let j = i + 1;
      while (j < s.length && s[j] !== "$" && !s.startsWith("\\(", j)) j++;
      const chunk = s.slice(i, j);
      out.push(esc(chunk).replace(/\n/g, "<br>"));
      i = j;
    }
    return out.join("");
  }

  /** 去 LaTeX 记号的纯文本，用于导出与可访问性 */
  function plain(str) {
    if (!str) return "";
    return String(str)
      .replace(/\$\$([^$]*)\$\$/g, "$1")
      .replace(/\$([^$]*)\$/g, "$1")
      .replace(/\\(?:frac|dfrac|tfrac)\s*\{([^{}]*)\}\s*\{([^{}]*)\}/g, "($1)/($2)")
      .replace(/\\sqrt\s*\{([^{}]*)\}/g, "√($1)")
      .replace(/\\(?:left|right|,|;|:|!|quad|qquad|displaystyle)/g, "")
      .replace(/\\([a-zA-Z]+)/g, (m, name) => (SYMBOLS[name] || GREEK[name] || name))
      .replace(/[{}]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  return { math, text, plain };
})();

export default Tex;
