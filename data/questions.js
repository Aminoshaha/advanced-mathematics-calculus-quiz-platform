/* 由 build.py 自动生成，请勿手改；改数据请改 data/raw/ 后重新构建 */
export const BANK = {
 "meta": {
  "chapter": "极限",
  "title": "高等数学 · 极限 小测题库",
  "source": "答题 App 截图转录（Test1-5，每题 10 分，均为单选题）",
  "totalImages": 50,
  "uniqueImages": 40,
  "duplicateNote": "Test4 目录下的 10 张图与 Test1 逐字节完全相同（MD5 一致），为重复卷，已排除。故实际唯一题目为 40 道。",
  "extractedAt": "人工复核前",
  "missingIds": [
   "T2-01",
   "T2-04"
  ],
  "missingNote": "T2-01 与 T2-04 两次提取均失败，待重新提取。",
  "builtAt": null,
  "questionCount": 40,
  "analysisCount": 40
 },
 "questions": [
  {
   "id": "T1-01",
   "testNo": 1,
   "index": 1,
   "src": "Test1/Test1-1.jpg",
   "score": 10,
   "stemLatex": "极限 $\\lim_{x \\to \\infty} x\\sin\\frac{2x}{x^{2}+1}$ 等于",
   "options": [
    {
     "key": "A",
     "latex": "2"
    },
    {
     "key": "B",
     "latex": "1"
    },
    {
     "key": "C",
     "latex": "3"
    },
    {
     "key": "D",
     "latex": "4"
    }
   ],
   "myAnswer": "A",
   "correctAnswer": "A",
   "knowledgePoints": [
    "等价替换"
   ],
   "kpSource": "app"
  },
  {
   "id": "T1-02",
   "testNo": 1,
   "index": 2,
   "src": "Test1/Test1-2.jpg",
   "score": 10,
   "stemLatex": "设当 $x \\to 0$ 时，$(1-\\cos x)\\ln(1+x^{2})$ 是比 $x\\sin x^{n}$ 高阶的无穷小，而 $x\\sin x^{n}$ 是比 $(e^{x^{2}}-1)$ 高阶的无穷小，则正整数 $n$ 等于",
   "options": [
    {
     "key": "A",
     "latex": "2"
    },
    {
     "key": "B",
     "latex": "1"
    },
    {
     "key": "C",
     "latex": "4"
    },
    {
     "key": "D",
     "latex": "3"
    }
   ],
   "myAnswer": "A",
   "correctAnswer": "A",
   "knowledgePoints": [
    "无穷小的阶"
   ],
   "kpSource": "app"
  },
  {
   "id": "T1-03",
   "testNo": 1,
   "index": 3,
   "src": "Test1/Test1-3.jpg",
   "score": 10,
   "stemLatex": "极限 $\\lim\\limits_{x \\to 0} \\ln \\frac{\\sin x}{x}$ 等于",
   "options": [
    {
     "key": "A",
     "latex": "1"
    },
    {
     "key": "B",
     "latex": "0"
    },
    {
     "key": "C",
     "latex": "不存在"
    },
    {
     "key": "D",
     "latex": "$\\infty$"
    }
   ],
   "myAnswer": "B",
   "correctAnswer": "B",
   "knowledgePoints": [
    "四则运算"
   ],
   "kpSource": "app"
  },
  {
   "id": "T1-04",
   "testNo": 1,
   "index": 4,
   "src": "Test1/Test1-4.jpg",
   "score": 10,
   "stemLatex": "函数 $f(x)=\\frac{1}{x}\\cos\\frac{1}{x}$ 在 $x=0$ 点的任何邻域内都是（）",
   "options": [
    {
     "key": "A",
     "latex": "单调增加的"
    },
    {
     "key": "B",
     "latex": "单调减少的"
    },
    {
     "key": "C",
     "latex": "有界的"
    },
    {
     "key": "D",
     "latex": "无界的"
    }
   ],
   "myAnswer": "D",
   "correctAnswer": "D",
   "knowledgePoints": [
    "极限定义与性质"
   ],
   "kpSource": "app"
  },
  {
   "id": "T1-05",
   "testNo": 1,
   "index": 5,
   "src": "Test1/Test1-5.jpg",
   "score": 10,
   "stemLatex": "设函数 $f(x)=\\frac{x}{a+e^{bx}}$ 在 $(-\\infty,+\\infty)$ 内连续，且 $\\lim_{x \\to -\\infty} f(x)=0$，则常数 $a,b$ 满足（）",
   "options": [
    {
     "key": "A",
     "latex": "$a<0,b<0$"
    },
    {
     "key": "B",
     "latex": "$a\\le 0,b>0$"
    },
    {
     "key": "C",
     "latex": "$a>0,b>0$"
    },
    {
     "key": "D",
     "latex": "$a\\ge 0,b<0$"
    }
   ],
   "myAnswer": "D",
   "correctAnswer": "D",
   "knowledgePoints": [
    "连续的概念"
   ],
   "kpSource": "inferred",
   "reviewNote": "原图知识点标签被底部按钮栏遮挡，标签内容按题干推断。"
  },
  {
   "id": "T1-06",
   "testNo": 1,
   "index": 6,
   "src": "Test1/Test1-6.jpg",
   "score": 10,
   "stemLatex": "下列极限存在的是()",
   "options": [
    {
     "key": "A",
     "latex": "$\\lim_{x \\to +\\infty} \\sqrt{\\frac{x^2+1}{x}}$"
    },
    {
     "key": "B",
     "latex": "$\\lim_{x \\to 0} e^{\\frac{1}{x}}$"
    },
    {
     "key": "C",
     "latex": "$\\lim_{x \\to \\infty} \\frac{x(x+2)(x-\\sin x)}{x^{3}}$"
    },
    {
     "key": "D",
     "latex": "$\\lim_{x \\to 0} \\frac{1}{2^{x}-1}$"
    }
   ],
   "myAnswer": "C",
   "correctAnswer": "C",
   "knowledgePoints": [
    "极限定义与性质"
   ],
   "kpSource": "inferred",
   "reviewNote": "原图知识点标签被遮挡，按题干推断。选项 D 分母经放大确认为 $2^{x}-1$。"
  },
  {
   "id": "T1-07",
   "testNo": 1,
   "index": 7,
   "src": "Test1/Test1-7.jpg",
   "score": 10,
   "stemLatex": "极限 $\\lim_{x \\to 7}\\frac{x^{2}-3x-28}{x^{2}-5x-14}=$",
   "options": [
    {
     "key": "A",
     "latex": "$2$"
    },
    {
     "key": "B",
     "latex": "$\\frac{11}{9}$"
    },
    {
     "key": "C",
     "latex": "$4$"
    },
    {
     "key": "D",
     "latex": "$0$"
    }
   ],
   "myAnswer": "B",
   "correctAnswer": "B",
   "knowledgePoints": [
    "四则运算"
   ],
   "kpSource": "app"
  },
  {
   "id": "T1-08",
   "testNo": 1,
   "index": 8,
   "src": "Test1/Test1-8.jpg",
   "score": 10,
   "stemLatex": "$\\lim_{x \\to 0} \\frac{x \\ln(1+2x)}{1-\\cos x}$ 等于",
   "options": [
    {
     "key": "A",
     "latex": "$2$"
    },
    {
     "key": "B",
     "latex": "$3$"
    },
    {
     "key": "C",
     "latex": "$4$"
    },
    {
     "key": "D",
     "latex": "$-4$"
    }
   ],
   "myAnswer": "C",
   "correctAnswer": "C",
   "knowledgePoints": [
    "等价替换"
   ],
   "kpSource": "app"
  },
  {
   "id": "T1-09",
   "testNo": 1,
   "index": 9,
   "src": "Test1/Test1-9.jpg",
   "score": 10,
   "stemLatex": "极限 $\\lim\\limits_{x \\to 0}\\left(\\frac{2^{x}+3^{x}}{2}\\right)^{\\frac{1}{x}} = (\\quad)$",
   "options": [
    {
     "key": "A",
     "latex": "$1$"
    },
    {
     "key": "B",
     "latex": "$\\sqrt{2}$"
    },
    {
     "key": "C",
     "latex": "$\\sqrt{6}$"
    },
    {
     "key": "D",
     "latex": "$2$"
    }
   ],
   "myAnswer": "C",
   "correctAnswer": "C",
   "knowledgePoints": [
    "重要极限"
   ],
   "kpSource": "app"
  },
  {
   "id": "T1-10",
   "testNo": 1,
   "index": 10,
   "src": "Test1/Test1-10.jpg",
   "score": 10,
   "stemLatex": "设 $f(x)=\\lim\\limits_{n\\to\\infty}\\frac{(n-1)x}{nx^{2}+1}$，则 $f(x)$ 的间断点为",
   "options": [
    {
     "key": "A",
     "latex": "$x=-1$"
    },
    {
     "key": "B",
     "latex": "$x=2$"
    },
    {
     "key": "C",
     "latex": "$x=0$"
    },
    {
     "key": "D",
     "latex": "$x=1$"
    }
   ],
   "myAnswer": "C",
   "correctAnswer": "C",
   "knowledgePoints": [
    "间断点"
   ],
   "kpSource": "app"
  },
  {
   "id": "T2-01",
   "testNo": 2,
   "index": 1,
   "src": "Test2/Test2-1.jpg",
   "score": 10,
   "stemLatex": "$$\\lim_{x\\to 0}\\frac{\\arctan 3x}{2x}=$$",
   "options": [
    {
     "key": "A",
     "latex": "$0$"
    },
    {
     "key": "B",
     "latex": "$\\dfrac{3}{2}$"
    },
    {
     "key": "C",
     "latex": "$\\infty$"
    },
    {
     "key": "D",
     "latex": "$1$"
    }
   ],
   "myAnswer": "B",
   "correctAnswer": "B",
   "knowledgePoints": [
    "等价替换"
   ],
   "kpSource": "app"
  },
  {
   "id": "T2-02",
   "testNo": 2,
   "index": 2,
   "src": "Test2/Test2-2.jpg",
   "score": 10,
   "stemLatex": "设 $f(x)=\\frac{x^{2}-4}{x-2}e^{-\\frac{1}{x-2}}$，则",
   "options": [
    {
     "key": "A",
     "latex": "$\\lim\\limits_{x \\to 2} f(x) = 2$"
    },
    {
     "key": "B",
     "latex": "$\\lim\\limits_{x \\to 2} f(x) = 0$"
    },
    {
     "key": "C",
     "latex": "$\\lim\\limits_{x \\to 2} f(x) = \\infty$"
    },
    {
     "key": "D",
     "latex": "$\\lim\\limits_{x \\to 2} f(x)$ 不存在，且 $\\lim\\limits_{x \\to 2} f(x) \\neq \\infty$"
    }
   ],
   "myAnswer": "B",
   "correctAnswer": "D",
   "knowledgePoints": [
    "极限定义与性质"
   ],
   "kpSource": "inferred",
   "reviewNote": "原图知识点标签被截断，按题干（左右极限不等）推断。"
  },
  {
   "id": "T2-03",
   "testNo": 2,
   "index": 3,
   "src": "Test2/Test2-3.jpg",
   "score": 10,
   "stemLatex": "设 $\\lim\\limits_{x \\to \\infty}\\left(\\frac{x+2a}{x-a}\\right)^{x}=27$，则 $a=(\\ )$",
   "options": [
    {
     "key": "A",
     "latex": "$0$"
    },
    {
     "key": "B",
     "latex": "$e^{-1}$"
    },
    {
     "key": "C",
     "latex": "$\\ln 3$"
    },
    {
     "key": "D",
     "latex": "$1$"
    }
   ],
   "myAnswer": "C",
   "correctAnswer": "C",
   "knowledgePoints": [
    "重要极限"
   ],
   "kpSource": "app"
  },
  {
   "id": "T2-04",
   "testNo": 2,
   "index": 4,
   "src": "Test2/Test2-4.jpg",
   "score": 10,
   "stemLatex": "极限 $\\lim\\limits_{x \\to +\\infty} \\frac{\\sin 2x}{2x} =$",
   "options": [
    {
     "key": "A",
     "latex": "$-1$"
    },
    {
     "key": "B",
     "latex": "$\\infty$"
    },
    {
     "key": "C",
     "latex": "$1$"
    },
    {
     "key": "D",
     "latex": "$0$"
    }
   ],
   "myAnswer": "D",
   "correctAnswer": "D",
   "knowledgePoints": [
    "有界量乘无穷小"
   ],
   "kpSource": "app"
  },
  {
   "id": "T2-05",
   "testNo": 2,
   "index": 5,
   "src": "Test2/Test2-5.jpg",
   "score": 10,
   "stemLatex": "已知函数 $f(x)=\\lim\\limits_{n \\to \\infty}\\frac{1-x}{1+x^{2n}}\\ (n>0$ 为自然数$)$，则下列叙述正确的是",
   "options": [
    {
     "key": "A",
     "latex": "$x=1$ 是 $f(x)$ 的连续点，$x=-1$ 是 $f(x)$ 的跳跃间断点."
    },
    {
     "key": "B",
     "latex": "$x=-1$ 是 $f(x)$ 的连续点，$x=1$ 是 $f(x)$ 的跳跃间断点"
    },
    {
     "key": "C",
     "latex": "$x=1$ 和 $x=-1$ 都是 $f(x)$ 的可去间断点."
    },
    {
     "key": "D",
     "latex": "$x=1$ 和 $x=-1$ 都是 $f(x)$ 的跳跃间断点."
    }
   ],
   "myAnswer": "B",
   "correctAnswer": "A",
   "knowledgePoints": [
    "间断点"
   ],
   "kpSource": "inferred",
   "reviewNote": "原图知识点标签被遮挡，按题干推断。"
  },
  {
   "id": "T2-06",
   "testNo": 2,
   "index": 6,
   "src": "Test2/Test2-6.jpg",
   "score": 10,
   "stemLatex": "设函数 $f(x)=\\begin{cases}\\dfrac{1-e^{\\tan x}}{\\arcsin 2x}, & x>0\\\\ ae^{4x}, & x\\leq 0\\end{cases}$ 在 $x=0$ 处连续，则 $a$ 等于",
   "options": [
    {
     "key": "A",
     "latex": "$\\dfrac{1}{2}$"
    },
    {
     "key": "B",
     "latex": "$-1$"
    },
    {
     "key": "C",
     "latex": "$1$"
    },
    {
     "key": "D",
     "latex": "$-\\dfrac{1}{2}$"
    }
   ],
   "myAnswer": "D",
   "correctAnswer": "D",
   "knowledgePoints": [
    "极限定义与性质"
   ],
   "kpSource": "app"
  },
  {
   "id": "T2-07",
   "testNo": 2,
   "index": 7,
   "src": "Test2/Test2-7.jpg",
   "score": 10,
   "stemLatex": "“对任意给定的 $\\varepsilon \\in (0,1)$，总存在正整数 $N$，当 $n \\ge N$ 时，恒有 $|x_n - a| \\le 2\\varepsilon$”是数列 $\\{x_n\\}$ 收敛于 $a$ 的",
   "options": [
    {
     "key": "A",
     "latex": "必要条件但非充分条件"
    },
    {
     "key": "B",
     "latex": "充分条件但非必要条件"
    },
    {
     "key": "C",
     "latex": "既非充分条件又非必要条件"
    },
    {
     "key": "D",
     "latex": "充分必要条件"
    }
   ],
   "myAnswer": "D",
   "correctAnswer": "D",
   "knowledgePoints": [
    "极限定义与性质"
   ],
   "kpSource": "app"
  },
  {
   "id": "T2-08",
   "testNo": 2,
   "index": 8,
   "src": "Test2/Test2-8.jpg",
   "score": 10,
   "stemLatex": "$\\lim\\limits_{x \\to 2}\\frac{4-x^2}{x-2}=(\\quad)$",
   "options": [
    {
     "key": "A",
     "latex": "$-2$"
    },
    {
     "key": "B",
     "latex": "$-1$"
    },
    {
     "key": "C",
     "latex": "$0$"
    },
    {
     "key": "D",
     "latex": "$-4$"
    }
   ],
   "myAnswer": "D",
   "correctAnswer": "D",
   "knowledgePoints": [
    "四则运算"
   ],
   "kpSource": "app"
  },
  {
   "id": "T2-09",
   "testNo": 2,
   "index": 9,
   "src": "Test2/Test2-9.jpg",
   "score": 10,
   "stemLatex": "设当 $x \\to 0$ 时，$(1-\\cos x)\\ln(1+x^2)$ 是比 $x\\sin x^{n}$ 高阶的无穷小，而 $x\\sin x^{n}$ 是比 $(e^{x^{2}}-1)$ 高阶的无穷小，则正整数 $n$ 等于",
   "options": [
    {
     "key": "A",
     "latex": "2"
    },
    {
     "key": "B",
     "latex": "4"
    },
    {
     "key": "C",
     "latex": "1"
    },
    {
     "key": "D",
     "latex": "3"
    }
   ],
   "myAnswer": "A",
   "correctAnswer": "A",
   "knowledgePoints": [
    "无穷小的阶"
   ],
   "kpSource": "app"
  },
  {
   "id": "T2-10",
   "testNo": 2,
   "index": 10,
   "src": "Test2/Test2-10.jpg",
   "score": 10,
   "stemLatex": "极限 $\\lim_{x \\to 0} \\frac{\\sqrt[3]{(1-x)(1+x)}-1}{e^{3x}-e^{2x}-e^{x}+1}$ 等于",
   "options": [
    {
     "key": "A",
     "latex": "$-\\frac{1}{5}$"
    },
    {
     "key": "B",
     "latex": "$-\\frac{1}{6}$"
    },
    {
     "key": "C",
     "latex": "$\\frac{1}{6}$"
    },
    {
     "key": "D",
     "latex": "$\\frac{1}{5}$"
    }
   ],
   "myAnswer": "B",
   "correctAnswer": "B",
   "knowledgePoints": [
    "等价替换"
   ],
   "kpSource": "inferred",
   "reviewNote": "原图知识点标签被截断，按题干推断。"
  },
  {
   "id": "T3-01",
   "testNo": 3,
   "index": 1,
   "src": "Test3/Test3-1.jpg",
   "score": 10,
   "stemLatex": "函数在一点有定义是函数在该点有极限的（）",
   "options": [
    {
     "key": "A",
     "latex": "充分条件"
    },
    {
     "key": "B",
     "latex": "必要条件"
    },
    {
     "key": "C",
     "latex": "充分必要条件"
    },
    {
     "key": "D",
     "latex": "无关条件"
    }
   ],
   "myAnswer": "D",
   "correctAnswer": "D",
   "knowledgePoints": [
    "极限定义与性质"
   ],
   "kpSource": "app"
  },
  {
   "id": "T3-02",
   "testNo": 3,
   "index": 2,
   "src": "Test3/Test3-2.jpg",
   "score": 10,
   "stemLatex": "已知函数 $f(x)=\\lim_{n \\to \\infty} \\frac{1-x^{4n}}{1+x^{4n}}x$ ($n>0$ 为自然数),则 $f(x)$ 的可去间断点的个数为",
   "options": [
    {
     "key": "A",
     "latex": "1"
    },
    {
     "key": "B",
     "latex": "3"
    },
    {
     "key": "C",
     "latex": "2"
    },
    {
     "key": "D",
     "latex": "0"
    }
   ],
   "myAnswer": "C",
   "correctAnswer": "D",
   "knowledgePoints": [
    "间断点"
   ],
   "kpSource": "app"
  },
  {
   "id": "T3-03",
   "testNo": 3,
   "index": 3,
   "src": "Test3/Test3-3.jpg",
   "score": 10,
   "stemLatex": "设函数 $$f(x)=\\begin{cases} \\frac{1-e^{\\tan x}}{\\arcsin 2x}, & x>0 \\\\ ae^{4x} & x\\le 0 \\end{cases}$$ 在 $x=0$ 处连续，则 $a$ 等于",
   "options": [
    {
     "key": "A",
     "latex": "$-\\frac{1}{2}$"
    },
    {
     "key": "B",
     "latex": "$\\frac{1}{2}$"
    },
    {
     "key": "C",
     "latex": "$-1$"
    },
    {
     "key": "D",
     "latex": "$1$"
    }
   ],
   "myAnswer": "A",
   "correctAnswer": "A",
   "knowledgePoints": [
    "连续的概念"
   ],
   "kpSource": "inferred",
   "reviewNote": "原图知识点标签被底部按钮完全遮挡，按题干推断。"
  },
  {
   "id": "T3-04",
   "testNo": 3,
   "index": 4,
   "src": "Test3/Test3-4.jpg",
   "score": 10,
   "stemLatex": "$\\lim\\limits_{x \\to \\infty} \\frac{3\\sin x}{x^2} =$",
   "options": [
    {
     "key": "A",
     "latex": "不存在"
    },
    {
     "key": "B",
     "latex": "$-3$"
    },
    {
     "key": "C",
     "latex": "$3$"
    },
    {
     "key": "D",
     "latex": "$0$"
    }
   ],
   "myAnswer": "D",
   "correctAnswer": "D",
   "knowledgePoints": [
    "有界量乘无穷小"
   ],
   "kpSource": "app"
  },
  {
   "id": "T3-05",
   "testNo": 3,
   "index": 5,
   "src": "Test3/Test3-5.jpg",
   "score": 10,
   "stemLatex": "$$\\lim_{x \\to 0} \\frac{\\tan x - \\sin x}{\\tan^{3} x} = (\\quad)$$",
   "options": [
    {
     "key": "A",
     "latex": "$\\infty$"
    },
    {
     "key": "B",
     "latex": "$\\frac{1}{2}$"
    },
    {
     "key": "C",
     "latex": "$1$"
    },
    {
     "key": "D",
     "latex": "$2$"
    }
   ],
   "myAnswer": "B",
   "correctAnswer": "B",
   "knowledgePoints": [
    "等价替换"
   ],
   "kpSource": "app"
  },
  {
   "id": "T3-06",
   "testNo": 3,
   "index": 6,
   "src": "Test3/Test3-6.jpg",
   "score": 10,
   "stemLatex": "极限 $\\lim\\limits_{x \\to \\infty}\\left(1+\\frac{1}{x}-\\frac{1}{x^2}\\right)^{x}$ 等于",
   "options": [
    {
     "key": "A",
     "latex": "$e$"
    },
    {
     "key": "B",
     "latex": "$-e$"
    },
    {
     "key": "C",
     "latex": "$1$"
    },
    {
     "key": "D",
     "latex": "$e^{-1}$"
    }
   ],
   "myAnswer": "A",
   "correctAnswer": "A",
   "knowledgePoints": [
    "重要极限"
   ],
   "kpSource": "app"
  },
  {
   "id": "T3-07",
   "testNo": 3,
   "index": 7,
   "src": "Test3/Test3-7.jpg",
   "score": 10,
   "stemLatex": "$$\\lim_{x \\to \\frac{1}{2}} \\frac{1-4x^2}{2x-1} = \\quad (\\quad)$$",
   "options": [
    {
     "key": "A",
     "latex": "$-1$"
    },
    {
     "key": "B",
     "latex": "$1$"
    },
    {
     "key": "C",
     "latex": "$-2$"
    },
    {
     "key": "D",
     "latex": "$0$"
    }
   ],
   "myAnswer": "C",
   "correctAnswer": "C",
   "knowledgePoints": [
    "四则运算"
   ],
   "kpSource": "app"
  },
  {
   "id": "T3-08",
   "testNo": 3,
   "index": 8,
   "src": "Test3/Test3-8.jpg",
   "score": 10,
   "stemLatex": "极限 $\\lim\\limits_{x \\to 1}(x-1)\\cot(x-1)$ 等于",
   "options": [
    {
     "key": "A",
     "latex": "$\\infty$"
    },
    {
     "key": "B",
     "latex": "$0$"
    },
    {
     "key": "C",
     "latex": "$-1$"
    },
    {
     "key": "D",
     "latex": "$1$"
    }
   ],
   "myAnswer": "D",
   "correctAnswer": "D",
   "knowledgePoints": [
    "等价替换"
   ],
   "kpSource": "app"
  },
  {
   "id": "T3-09",
   "testNo": 3,
   "index": 9,
   "src": "Test3/Test3-9.jpg",
   "score": 10,
   "stemLatex": "设 $f(x)=(e^{2x}-1)(\\cos x-1)$，$g(x)=x^3+x^4$，则当 $x \\to 0$ 时，有（）",
   "options": [
    {
     "key": "A",
     "latex": "$f(x)$ 是比 $g(x)$ 高阶的无穷小"
    },
    {
     "key": "B",
     "latex": "$f(x)$ 与 $g(x)$ 是等价无穷小"
    },
    {
     "key": "C",
     "latex": "$f(x)$ 与 $g(x)$ 同阶但非等价无穷小"
    },
    {
     "key": "D",
     "latex": "$f(x)$ 是比 $g(x)$ 低阶的无穷小"
    }
   ],
   "myAnswer": "B",
   "correctAnswer": "C",
   "knowledgePoints": [
    "无穷小的阶"
   ],
   "kpSource": "app"
  },
  {
   "id": "T3-10",
   "testNo": 3,
   "index": 10,
   "src": "Test3/Test3-10.jpg",
   "score": 10,
   "stemLatex": "$\\lim_{x \\to +\\infty} x\\left(\\sqrt{x^2+1}-x\\right)$ 等于",
   "options": [
    {
     "key": "A",
     "latex": "$\\infty$"
    },
    {
     "key": "B",
     "latex": "$-\\frac{1}{2}$"
    },
    {
     "key": "C",
     "latex": "$\\frac{1}{2}$"
    },
    {
     "key": "D",
     "latex": "$0$"
    }
   ],
   "myAnswer": "C",
   "correctAnswer": "C",
   "knowledgePoints": [
    "四则运算"
   ],
   "kpSource": "app"
  },
  {
   "id": "T5-01",
   "testNo": 5,
   "index": 1,
   "src": "Test5/Test5-1.jpg",
   "score": 10,
   "stemLatex": "极限 $\\lim\\limits_{x \\to 0} \\frac{x \\ln(1+2x)}{1-\\cos x}$ 等于",
   "options": [
    {
     "key": "A",
     "latex": "$-4$"
    },
    {
     "key": "B",
     "latex": "$2$"
    },
    {
     "key": "C",
     "latex": "$3$"
    },
    {
     "key": "D",
     "latex": "$4$"
    }
   ],
   "myAnswer": "D",
   "correctAnswer": "D",
   "knowledgePoints": [
    "等价替换"
   ],
   "kpSource": "app"
  },
  {
   "id": "T5-02",
   "testNo": 5,
   "index": 2,
   "src": "Test5/Test5-2.jpg",
   "score": 10,
   "stemLatex": "$$\\lim_{x \\to \\infty}\\left(1+\\frac{1}{x}+\\frac{1}{x^2}\\right)^{x}=(\\quad)$$",
   "options": [
    {
     "key": "A",
     "latex": "$e^{-1}$"
    },
    {
     "key": "B",
     "latex": "$1$"
    },
    {
     "key": "C",
     "latex": "$e$"
    },
    {
     "key": "D",
     "latex": "$\\infty$"
    }
   ],
   "myAnswer": "C",
   "correctAnswer": "C",
   "knowledgePoints": [
    "重要极限"
   ],
   "kpSource": "app"
  },
  {
   "id": "T5-03",
   "testNo": 5,
   "index": 3,
   "src": "Test5/Test5-3.jpg",
   "score": 10,
   "stemLatex": "极限 $\\lim_{x \\to \\infty}\\left(2x\\sin\\frac{2}{x}+\\frac{\\arctan 3x}{x}\\right)$ 的值为（）",
   "options": [
    {
     "key": "A",
     "latex": "4"
    },
    {
     "key": "B",
     "latex": "0"
    },
    {
     "key": "C",
     "latex": "3"
    },
    {
     "key": "D",
     "latex": "2"
    }
   ],
   "myAnswer": "A",
   "correctAnswer": "A",
   "knowledgePoints": [
    "有界量乘无穷小",
    "等价替换"
   ],
   "kpSource": "app"
  },
  {
   "id": "T5-04",
   "testNo": 5,
   "index": 4,
   "src": "Test5/Test5-4.jpg",
   "score": 10,
   "stemLatex": "$\\lim_{x \\to 0} \\frac{\\tan x - \\sin x}{\\tan^3 x} = \\quad (\\quad)$",
   "options": [
    {
     "key": "A",
     "latex": "$1$"
    },
    {
     "key": "B",
     "latex": "$2$"
    },
    {
     "key": "C",
     "latex": "$\\infty$"
    },
    {
     "key": "D",
     "latex": "$\\frac{1}{2}$"
    }
   ],
   "myAnswer": "D",
   "correctAnswer": "D",
   "knowledgePoints": [
    "等价替换"
   ],
   "kpSource": "app"
  },
  {
   "id": "T5-05",
   "testNo": 5,
   "index": 5,
   "src": "Test5/Test5-5.jpg",
   "score": 10,
   "stemLatex": "设函数 $f(x)=\\begin{cases}(2-x)^{\\frac{1}{x-1}} & x<1\\\\ e^{-a} & x\\geq 1\\end{cases}$ 在点 $x=1$ 处连续,则 $a=(\\quad)$",
   "options": [
    {
     "key": "A",
     "latex": "$2$"
    },
    {
     "key": "B",
     "latex": "$1$"
    },
    {
     "key": "C",
     "latex": "$0$"
    },
    {
     "key": "D",
     "latex": "$3$"
    }
   ],
   "myAnswer": "B",
   "correctAnswer": "B",
   "knowledgePoints": [
    "连续的概念"
   ],
   "kpSource": "app"
  },
  {
   "id": "T5-06",
   "testNo": 5,
   "index": 6,
   "src": "Test5/Test5-6.jpg",
   "score": 10,
   "stemLatex": "当 $x \\to 0$ 时，$x^2 + \\sqrt[3]{x}$ 是 $x$ 的几阶无穷小？",
   "options": [
    {
     "key": "A",
     "latex": "$\\frac{1}{6}$"
    },
    {
     "key": "B",
     "latex": "$2$"
    },
    {
     "key": "C",
     "latex": "$\\frac{1}{3}$"
    },
    {
     "key": "D",
     "latex": "$\\frac{1}{2}$"
    }
   ],
   "myAnswer": "B",
   "correctAnswer": "C",
   "knowledgePoints": [
    "无穷小的阶"
   ],
   "kpSource": "inferred",
   "reviewNote": "原图知识点标签内容不可见，按题干推断。"
  },
  {
   "id": "T5-07",
   "testNo": 5,
   "index": 7,
   "src": "Test5/Test5-7.jpg",
   "score": 10,
   "stemLatex": "极限 $\\lim\\limits_{x \\to +\\infty} \\frac{(3x+6)^{70}(8x-5)^{20}}{(5x-1)^{90}}$ 等于",
   "options": [
    {
     "key": "A",
     "latex": "不存在"
    },
    {
     "key": "B",
     "latex": "0"
    },
    {
     "key": "C",
     "latex": "$\\infty$"
    },
    {
     "key": "D",
     "latex": "$\\frac{3^{70}8^{20}}{5^{90}}$"
    }
   ],
   "myAnswer": "D",
   "correctAnswer": "D",
   "knowledgePoints": [
    "四则运算"
   ],
   "kpSource": "app",
   "reviewNote": "选项 D 分子第二个底数截图较模糊，辨认为 8。"
  },
  {
   "id": "T5-08",
   "testNo": 5,
   "index": 8,
   "src": "Test5/Test5-8.jpg",
   "score": 10,
   "stemLatex": "极限 $\\lim\\limits_{x \\to 7} \\frac{x^2 - 3x - 28}{x^2 - 5x - 14} =$",
   "options": [
    {
     "key": "A",
     "latex": "$\\frac{11}{9}$"
    },
    {
     "key": "B",
     "latex": "$4$"
    },
    {
     "key": "C",
     "latex": "$2$"
    },
    {
     "key": "D",
     "latex": "$0$"
    }
   ],
   "myAnswer": "A",
   "correctAnswer": "A",
   "knowledgePoints": [
    "四则运算"
   ],
   "kpSource": "app"
  },
  {
   "id": "T5-09",
   "testNo": 5,
   "index": 9,
   "src": "Test5/Test5-9.jpg",
   "score": 10,
   "stemLatex": "函数 $f(x)=\\frac{1}{x}\\cos\\frac{1}{x}$ 在 $x=0$ 点的任何邻域内都是( )",
   "options": [
    {
     "key": "A",
     "latex": "有界的"
    },
    {
     "key": "B",
     "latex": "单调减少的"
    },
    {
     "key": "C",
     "latex": "无界的"
    },
    {
     "key": "D",
     "latex": "单调增加的"
    }
   ],
   "myAnswer": "A",
   "correctAnswer": "C",
   "knowledgePoints": [
    "极限定义与性质"
   ],
   "kpSource": "app"
  },
  {
   "id": "T5-10",
   "testNo": 5,
   "index": 10,
   "src": "Test5/Test5-10.jpg",
   "score": 10,
   "stemLatex": "设 $f(x)=\\lim\\limits_{n \\to \\infty}\\frac{1+x}{1+x^{2n}}$，讨论 $f(x)$ 的间断点，其结论为（ ）",
   "options": [
    {
     "key": "A",
     "latex": "存在间断点 $x=-1$"
    },
    {
     "key": "B",
     "latex": "不存在间断点"
    },
    {
     "key": "C",
     "latex": "存在间断点 $x=1$"
    },
    {
     "key": "D",
     "latex": "存在间断点 $x=0$"
    }
   ],
   "myAnswer": "B",
   "correctAnswer": "C",
   "knowledgePoints": [
    "间断点"
   ],
   "kpSource": "app"
  }
 ],
 "analysis": {
  "T1-01": {
   "verdict": "ok",
   "selfAnswer": "A",
   "officialAnswer": "A",
   "transcriptionIssues": [
    {
     "field": "src",
     "inRecord": "Test1/Test1-1.jpg",
     "inImage": "gaoshu-bank/web/assets/source/Test1/Test1/Test1-1.jpg"
    }
   ],
   "keyIdea": "含三角函数的 $\\frac{0}{0}$ 型（此处为 $\\infty\\cdot 0$ 型）极限，识别特征是 $\\sin(\\text{无穷小})$，用等价无穷小 $\\sin u \\sim u$ 把三角函数整体换掉，再比较最高次幂。",
   "steps": [
    {
     "title": "第一步：判断类型，确认能否用等价无穷小",
     "content": "把 $x\\sin\\dfrac{2x}{x^{2}+1}$ 看成「因子 $x$」乘「$\\sin(\\cdot)$」。因为 $x\\to\\infty$ 时分母 $x^{2}+1$ 的增长速度远快于分子 $2x$，所以 $\\dfrac{2x}{x^{2}+1}\\to 0$。这里的关键是：等价替换 $\\sin u\\sim u$ 只在 $u\\to 0$ 时成立，而本题的「内层」恰好趋于 $0$，所以替换是合法的。整体是 $\\infty\\cdot 0$ 型不定式——不能直接说「$\\sin$ 是有界量所以极限为 $0$」，因为前面的 $x$ 在发散。"
    },
    {
     "title": "第二步：用等价无穷小替换并化简",
     "content": "当 $u\\to 0$ 时 $\\sin u\\sim u$，取 $u=\\dfrac{2x}{x^{2}+1}$，得 $$x\\sin\\frac{2x}{x^{2}+1}\\sim x\\cdot\\frac{2x}{x^{2}+1}=\\frac{2x^{2}}{x^{2}+1}.$$ 这一步把超越函数化成了有理式，是本题唯一需要的技巧：$\\sin$ 只以乘积因子的身份出现，替换不会丢失或改变阶数。"
    },
    {
     "title": "第三步：比较最高次幂求极限",
     "content": "分子分母同除以 $x^{2}$：$$\\frac{2x^{2}}{x^{2}+1}=\\frac{2}{1+\\dfrac{1}{x^{2}}}\\xrightarrow[x\\to\\infty]{} \\frac{2}{1+0}=2.$$ 因为原式与 $\\dfrac{2x^{2}}{x^{2}+1}$ 是等价无穷大（比值趋于 $1$），两者的极限相同，故原极限为 $2$，选 A。"
    }
   ],
   "optionNotes": [
    {
     "key": "B",
     "note": "为什么会选到 $1$：只看到 $\\dfrac{2x}{x^{2}+1}\\to 0$ 与 $x\\to\\infty$，误以为「$\\sin$ 内层趋于 $0$、外层 $x$ 趋于 $\\infty$」相互抵消，或者对 $\\dfrac{2x^2}{x^2+1}$ 只保留了分子分母的「系数比」之外的部分，把结果记成了 $1$。实际上 $x\\cdot\\dfrac{2x}{x^{2}+1}$ 中 $x$ 与内层的分子 $2x$ 相乘得到 $2x^{2}$，与分母 $x^{2}$ 同阶，极限是 $2$，不是 $1$。"
    },
    {
     "key": "C",
     "note": "为什么会选到 $3$：把内层 $\\dfrac{2x}{x^{2}+1}$ 的分子系数 $2$ 与分母的常数项 $1$ 相加（$2+1=3$），或者把 $\\dfrac{2x^2}{x^2+1}$ 的最高次系数比误算成 $2+1$。同阶无穷大的极限只看最高次项系数之比，$\\dfrac{2x^2}{x^2+1}\\to 2$，与 $3$ 无关。"
    },
    {
     "key": "D",
     "note": "为什么会选到 $4$：错用了倍角/平方关系，例如把 $\\dfrac{2x}{x^{2}+1}$ 误当成 $\\sin$ 的「两倍角」而补上系数 $2$，或把分子系数 $2$ 平方得 $4$。本题 $\\sin$ 的自变量本身没有倍角结构，直接 $\\sin u\\sim u$ 即可，不需要额外系数，正确答案是 $2$。"
    }
   ],
   "pitfalls": "最典型的错误是忽略「等价无穷小替换的前提是内层趋于 $0$」而乱用替换，或反过来因为「$\\sin$ 有界」就把 $\\infty\\cdot 0$ 型直接判为 $0$；其次是替换后忘记把外面的因子 $x$ 乘进去——必须在替换后合并同类项、再比较最高次幂，才能得到 $2$。",
   "selfReasoning": ""
  },
  "T1-02": {
   "verdict": "ok",
   "selfAnswer": "A",
   "officialAnswer": "A",
   "transcriptionIssues": [],
   "keyIdea": "比较无穷小的阶，本质就是比较各自的等价无穷小主部次数（阶数）：高阶无穷小意味着其阶数更大，于是把三个无穷小的阶数算出来列不等式即可。",
   "steps": [
    {
     "title": "第一步：把“高阶无穷小”翻译成阶数的不等式",
     "content": "题目的两个条件都是“甲比乙高阶的无穷小”，即当 $x \\to 0$ 时 $\\frac{\\text{甲}}{\\text{乙}} \\to 0$。若甲是 $x$ 的 $m$ 阶无穷小、乙是 $x$ 的 $k$ 阶无穷小，则 $\\frac{\\text{甲}}{\\text{乙}} \\sim C x^{m-k} \\to 0$ 当且仅当 $m > k$。所以“高阶”就是“阶数更大”，解题的关键是把三个无穷小都化成 $x$ 的幂次主部，再比较次数。"
    },
    {
     "title": "第二步：用等价无穷小求三个无穷小的阶数",
     "content": "当 $x \\to 0$ 时，$1-\\cos x \\sim \\frac{x^{2}}{2}$，$\\ln(1+x^{2}) \\sim x^{2}$，相乘得 $(1-\\cos x)\\ln(1+x^{2}) \\sim \\frac{x^{4}}{2}$，是 $4$ 阶无穷小。又 $\\sin x^{n} \\sim x^{n}$（这里 $x^{n} \\to 0$，所以等价替换仍然有效），故 $x\\sin x^{n} \\sim x^{n+1}$，是 $n+1$ 阶无穷小；同理 $e^{x^{2}}-1 \\sim x^{2}$，是 $2$ 阶无穷小。逐项替换的依据是：乘积因子可以各自换等价无穷小，不改变主部次数。"
    },
    {
     "title": "第三步：由两个“高阶”条件夹出 n 的范围",
     "content": "第一个条件：$(1-\\cos x)\\ln(1+x^{2})$ 比 $x\\sin x^{n}$ 高阶，即 $4 > n+1$，得 $n < 3$。第二个条件：$x\\sin x^{n}$ 比 $e^{x^{2}}-1$ 高阶，即 $n+1 > 2$，得 $n > 1$。两式合并得 $1 < n < 3$。"
    },
    {
     "title": "第四步：结合“正整数”定值",
     "content": "在 $1 < n < 3$ 中取正整数，只有 $n = 2$。代回验证：$(1-\\cos x)\\ln(1+x^{2}) \\sim \\frac{x^{4}}{2}$，$x\\sin x^{2} \\sim x^{3}$，$e^{x^{2}}-1 \\sim x^{2}$，确实有 $4 > 3 > 2$，两条“高阶”关系同时成立，故 $n = 2$，选 A。"
    }
   ],
   "optionNotes": [
    {
     "key": "B",
     "note": "选 B（$n=1$）的人只用了第一个条件里 $n$ 的上界方向，或误把 $x\\sin x^{n}$ 的阶数当成 $n$ 而不是 $n+1$。若 $n=1$，则 $x\\sin x \\sim x^{2}$ 与 $e^{x^{2}}-1 \\sim x^{2}$ 是同级（而非高阶）无穷小，第二个条件不成立。"
    },
    {
     "key": "C",
     "note": "选 C（$n=4$）的人把两个“高阶”的方向弄反了，以为阶数越大越“高阶”的是被比较的那一项。若 $n=4$，$x\\sin x^{4} \\sim x^{5}$ 反而比 $(1-\\cos x)\\ln(1+x^{2}) \\sim \\frac{x^{4}}{2}$ 更高阶，与第一个条件矛盾。"
    },
    {
     "key": "D",
     "note": "选 D（$n=3$）的人漏掉了端点：$n=3$ 时 $x\\sin x^{3} \\sim x^{4}$ 与 $(1-\\cos x)\\ln(1+x^{2}) \\sim \\frac{x^{4}}{2}$ 是同阶无穷小，比值趋于常数 $2$ 而不是 $0$，第一个“高阶”条件恰好不成立（条件给的是严格不等号 $4>n+1$）。"
    }
   ],
   "pitfalls": "最典型的错误是把 $x\\sin x^{n}$ 的阶数记成 $n$ 而不是 $n+1$，从而两个不等式整体错位；其次是只说“$n$ 小于 3 且大于 1”就直接写 $n=2$ 而不说明正整数取值唯一；还有人在 $n=3$ 处忘记验证，误以为同阶也算高阶。",
   "selfReasoning": ""
  },
  "T1-03": {
   "verdict": "ok",
   "selfAnswer": "B",
   "officialAnswer": "B",
   "transcriptionIssues": [],
   "keyIdea": "复合函数求极限：内层是重要极限 $\\lim\\limits_{x \\to 0}\\frac{\\sin x}{x}=1$，外层对数函数在 $1$ 处连续，故可用连续性把极限符号代入内层极限。",
   "steps": [
    {
     "title": "第一步：判断类型——这是复合函数的极限",
     "content": "所求为 $\\lim\\limits_{x \\to 0}\\ln\\dfrac{\\sin x}{x}$，结构上是对数 $\\ln(\\cdot)$ 套在内层函数 $\\dfrac{\\sin x}{x}$ 外面。注意 $x \\to 0$ 时 $\\dfrac{\\sin x}{x}$ 并不是未定式的\"难算\"部分，它正是重要极限，趋于 $1$；而 $\\ln 1$ 是有意义的确定值，所以本题不是 $\\frac{0}{0}$ 或 $0\\cdot\\infty$ 型未定式，不需要洛必达法则，只需用连续性。"
    },
    {
     "title": "第二步：先求内层极限",
     "content": "由重要极限（等价无穷小 $\\sin x \\sim x$ 也可得）$\\lim\\limits_{x \\to 0}\\dfrac{\\sin x}{x}=1$。这一步是关键：$x \\to 0$ 时 $x \\neq 0$，比值 $\\dfrac{\\sin x}{x}$ 有定义，且该极限存在且为有限值 $1$，为下一步代入创造了条件。"
    },
    {
     "title": "第三步：用外层函数的连续性把极限\"代入\"",
     "content": "$u=\\dfrac{\\sin x}{x}$，则 $u \\to 1$。因为 $\\ln u$ 在其定义域 $(0,\\infty)$ 内连续，特别是 $\\ln u$ 在 $u=1$（$1>0$，在定义域内部）处连续，满足复合函数极限的\"代入条件\" $\\lim\\limits_{u \\to u_0}\\ln u=\\ln u_0$，于是 $\\lim\\limits_{x \\to 0}\\ln\\dfrac{\\sin x}{x}=\\ln\\left(\\lim\\limits_{x \\to 0}\\dfrac{\\sin x}{x}\\right)=\\ln 1=0$。所以答案选 B。"
    }
   ],
   "optionNotes": [
    {
     "key": "A",
     "note": "为什么会选到 A：把内层极限 $\\lim\\limits_{x \\to 0}\\dfrac{\\sin x}{x}=1$ 直接当成了整道题的答案，看到\"$\\frac{\\sin x}{x}$\"就条件反射写 $1$，完全丢掉了外层的 $\\ln$。而实际上 $\\ln 1=0$，选项 A 是\"漏掉外层函数\"的典型产物。"
    },
    {
     "key": "C",
     "note": "为什么会选到 C：误以为 $\\ln\\dfrac{\\sin x}{x}$ 中含有\"$\\ln 0$\"或认为内层在 $0$ 附近取负值、对数无定义从而极限不存在。而实际上 $\\dfrac{\\sin x}{x}$ 在 $x\\to 0$ 时趋于 $1$ 且（去心邻域内）恒为正，对数处处有定义，极限存在且为 $0$，并非\"不存在\"。"
    },
    {
     "key": "D",
     "note": "为什么会选到 D：把\"对数\"与\"无穷\"错误绑定，或混淆了 $\\ln\\dfrac{\\sin x}{x}$ 与 $\\lim\\limits_{x \\to 0}\\ln x$。而实际上 $\\lim\\limits_{x \\to 0}\\ln x=-\\infty$ 说的是自变量趋于 $0$ 的情形，本题对数的自变量趋于 $1$ 而非 $0$，结果应为有限值 $\\ln 1=0$。"
    }
   ],
   "pitfalls": "最典型的错误是把内层重要极限 $\\lim\\limits_{x \\to 0}\\frac{\\sin x}{x}=1$ 直接当作最终答案（误选 A），即只算了\"括号里面\"而忽略外层函数 $\\ln$；次典型错误是不验证外层函数在极限点处是否连续就随意\"把极限符号搬到括号里\"，本题 $\\ln u$ 在 $u=1$ 处连续，这种代入才是合法的。",
   "selfReasoning": ""
  },
  "T1-04": {
   "verdict": "ok",
   "selfAnswer": "D",
   "officialAnswer": "D",
   "transcriptionIssues": [],
   "keyIdea": "识别出 $x\\to 0$ 时 $\\cos\\frac{1}{x}$ 只在 $[-1,1]$ 内振荡而 $\\frac{1}{x}\\to\\infty$，故只需构造一列趋于 $0$ 的点把函数值抬到无穷，即可判定函数无界；再用导数变号说明单调性不成立。",
   "steps": [
    {
     "title": "第一步：判断类型——先分清\"有界/无界\"与\"单调\"是两类不同的问题",
     "content": "题目问的是 $x=0$ 的**任何**邻域（即任意小的 $(0-\\delta,0+\\delta)$）内函数的性质。注意限定词\"任何邻域\"：只要在某个任意小的邻域里已经出现坏性质，答案就成立。而无界是一个**存在性**命题——只需找到一个方向（一列点）让 $|f|$ 无限增大即可；相反，要证明有界则要对邻域内**所有** $x$ 给出统一的上界，难度完全不同。先否定有界，是最省力的突破口。"
    },
    {
     "title": "第二步：构造数列证明无界",
     "content": "取 $x_n=\\frac{1}{2n\\pi}$，当 $n\\to\\infty$ 时 $x_n\\to 0$，且 $x_n$ 确实落在 $0$ 的任意给定邻域内（只要 $n$ 足够大）。代入得 $\\cos\\frac{1}{x_n}=\\cos(2n\\pi)=1$，于是 $f(x_n)=\\frac{1}{x_n}\\cos\\frac{1}{x_n}=2n\\pi\\to+\\infty$。这说明无论把邻域取得多小，函数值都能取到任意大的正数，$f$ 在 $x=0$ 的任何邻域内无界，故 D 正确、C 错误。关键识别特征：$\\frac{1}{x}$（趋于无穷的因子）乘以一个**在有限范围内振荡但不趋于** $0$ 的因子 $\\cos\\frac{1}{x}$，振荡因子抵消不掉发散。"
    },
    {
     "title": "第三步：用导数变号排除单调性",
     "content": "要判断单调性，看 $f'(x)=-\\frac{1}{x^{2}}\\cos\\frac{1}{x}+\\frac{1}{x^{2}}\\sin\\frac{1}{x}=\\frac{1}{x^{2}}\\left(\\sin\\frac{1}{x}-\\cos\\frac{1}{x}\\right)$。同样取 $x_n=\\frac{1}{2n\\pi}$ 有 $f'(x_n)=\\frac{1}{x_n^{2}}(0-1)<0$；再取 $y_n=\\frac{1}{(2n+\\frac12)\\pi}$ 有 $\\sin\\frac{1}{y_n}=1,\\ \\cos\\frac{1}{y_n}=0$，得 $f'(y_n)=\\frac{1}{y_n^{2}}>0$。两列点都趋于 $0$，说明在 $x=0$ 的任何邻域内导数都既取负值又取正值，函数在该邻域内既非单调增加也非单调减少，A、B 均错。"
    }
   ],
   "optionNotes": [
    {
     "key": "A",
     "note": "选 A 的人误以为 $\\frac{1}{x}$ 在 $x<0$ 一侧递减、$x>0$ 一侧递减就想当然地判成单调增加，或把\"有界振荡\"当成了不影响趋势的温和因子。实际上 $f'(x)=\\frac{1}{x^{2}}\\left(\\sin\\frac{1}{x}-\\cos\\frac{1}{x}\\right)$ 在 $0$ 的任何邻域内无限次变号，函数上下剧烈振荡，根本不具备单调性。"
    },
    {
     "key": "B",
     "note": "与 A 同源的错误：只看到 $\\cos\\frac{1}{x}$ 的符号变化带来的局部升降，就断言整体单调减少。单调减少要求在邻域内处处 $f'\\le 0$，而取 $x_n=\\frac{1}{2n\\pi}$ 时 $f'<0$、取 $y_n=\\frac{1}{(2n+\\frac12)\\pi}$ 时 $f'>0$，反例直接推翻。"
    },
    {
     "key": "C",
     "note": "选 C 的人是被 $|\\cos\\frac{1}{x}|\\le 1$ 迷惑，误以为\"因子有界\"就\"乘积有界\"。但乘上一个无界的 $\\frac{1}{x}$ 后，只需沿 $x=\\frac{1}{2n\\pi}$ 取值就得到 $f=2n\\pi\\to\\infty$；要证有界必须对邻域内一切 $x$ 给出统一上界，而这里显然做不到。"
    }
   ],
   "pitfalls": "最典型的错误是看到 $|\\cos\\frac{1}{x}|\\le 1$ 就断定整个函数有界（选 C），忽略了 $\\frac{1}{x}\\to\\infty$ 这个发散因子会沿某些特殊点列把函数值抬到无穷；其次是凭 $\\frac{1}{x}$ 的单调性想当然判断单调（选 A 或 B），而实际上 $f'(x)$ 在 $0$ 的任意邻域内无限次变号。",
   "selfReasoning": ""
  },
  "T1-05": {
   "verdict": "ok",
   "selfAnswer": "D",
   "officialAnswer": "D",
   "transcriptionIssues": [],
   "keyIdea": "已知函数在 $(-\\infty,+\\infty)$ 内连续，本质是要求在全部实数上分母 $a+e^{bx}\\ne 0$；再用 $x\\to-\\infty$ 时的极限为 $0$ 定出 $b$ 的符号，两者联立即得答案。",
   "steps": [
    {
     "title": "第一步：把“在 $(-\\infty,+\\infty)$ 内连续”翻译成对分母的硬性限制",
     "content": "$f(x)=\\dfrac{x}{a+e^{bx}}$ 的分子 $x$ 处处连续，所以 $f$ 的连续点只可能被分母的零点破坏。因此“在 $(-\\infty,+\\infty)$ 内连续”就等价于：对任意实数 $x$ 都有 $a+e^{bx}\\ne 0$，即方程 $e^{bx}=-a$ 在 $\\mathbb{R}$ 上无解。这是本题的第一个约束，也是选项中出现 $a\\ge 0$ 与 $a\\le 0$ 的区别所在。"
    },
    {
     "title": "第二步：用 $x\\to-\\infty$ 的极限为 $0$ 定出 $b<0$",
     "content": "当 $b>0$ 时，$x\\to-\\infty$ 有 $e^{bx}\\to 0$，于是 $f(x)=\\dfrac{x}{a+e^{bx}}\\to -\\infty$（ $a=0$ 时更是分母趋于 $0$ 而发散），不可能趋于 $0$；当 $b=0$ 时 $f(x)=\\dfrac{x}{a+1}$ 同样趋于 $-\\infty$。只有当 $b<0$ 时 $e^{bx}\\to+\\infty$ 且增长速度远超分子 $x$，才有 $f(x)=\\dfrac{x}{a+e^{bx}}\\to 0$，这一条件与 $a$ 无关地成立。所以 $b<0$，先排除 B、C。"
    },
    {
     "title": "第三步：在 $b<0$ 下把分母零点条件化为 $a\\ge 0$",
     "content": "取定 $b<0$ 时，$e^{bx}$ 的值域是 $(0,+\\infty)$。方程 $a+e^{bx}=0$ 即 $e^{bx}=-a$，它有解当且仅当 $-a$ 落在 $(0,+\\infty)$ 内，也就是 $a<0$；此时 $x=\\dfrac{\\ln(-a)}{b}$ 是一个真实的间断点。故不出现间断点要求 $a\\ge 0$（$a=0$ 时分母就是 $e^{bx}>0$，处处非零，同样连续）。与 $b<0$ 合并即得 $a\\ge 0,\\ b<0$，选 D。"
    },
    {
     "title": "第四步：回代验证 D 确实满足全部条件",
     "content": "当 $a\\ge 0,b<0$ 时，对一切 $x$ 有 $e^{bx}>0$，故 $a+e^{bx}\\ge e^{bx}>0$，分母恒正，$f$ 在 $(-\\infty,+\\infty)$ 内连续；同时 $x\\to-\\infty$ 时 $e^{bx}\\to+\\infty$ 主导 $x$，得 $\\lim_{x\\to-\\infty}f(x)=0$。两个条件同时成立，说明 D 是充分的，与前面的必要性合起来即为充要条件。"
    }
   ],
   "optionNotes": [
    {
     "key": "A",
     "note": "为什么会选到 A：只盯着“极限为 $0$”，觉得 $b<0$ 就够，随手把 $a$ 也当成负数。而实际上当 $a<0,b<0$ 时 $e^{bx}=-a$ 有解 $x=\\dfrac{\\ln(-a)}{b}$，此处分母为零，$f$ 在该点间断（无穷间断点），违反“在 $(-\\infty,+\\infty)$ 内连续”。"
    },
    {
     "key": "B",
     "note": "为什么会选到 B：把 $a\\le 0$ 这类“分母不能为零”的结论错记成 $a\\le 0$（其实要 $a\\ge 0$），又以为 $b>0$ 才能让 $e^{bx}$ 在负无穷处“有界”。而实际上 $b>0$ 时 $x\\to-\\infty$ 有 $e^{bx}\\to 0$，$f(x)\\approx\\dfrac{x}{a}\\to-\\infty$，极限根本不是 $0$，同时 $a<0$ 还会造成分母零点，两个条件都错。"
    },
    {
     "key": "C",
     "note": "为什么会选到 C：看到“连续”就条件反射地取 $a>0$（保证分母恒正），却忽略了题目还给了 $\\lim_{x\\to-\\infty}f(x)=0$。而实际上 $b>0$ 时该极限为 $-\\infty$ 而非 $0$，所以 C 连极限条件都不满足，属于漏看已知条件。"
    }
   ],
   "pitfalls": "最典型的错误是只验算一个条件：要么只用 $\\lim_{x\\to-\\infty}f(x)=0$ 定出 $b<0$ 就选 A，要么只用“连续”要求分母恒正就以为 $a>0$ 而配 $b>0$ 选 C。务必要认识到 $b<0$ 时 $e^{bx}$ 取遍 $(0,+\\infty)$，才使分母的零点问题等价于 $a<0$，从而“连续”给出的真正结论是 $a\\ge 0$（含 $a=0$ 的边界），而不是 $a>0$。",
   "selfReasoning": ""
  },
  "T1-06": {
   "verdict": "ok",
   "selfAnswer": "C",
   "officialAnswer": "C",
   "transcriptionIssues": [],
   "keyIdea": "逐项判断极限是否存在：幂指型函数在 $x\\to 0$ 处左右极限不等（或单侧趋于无穷）即为「不存在」，而分式在无穷远处用最高次幂比较、把有界量除以无穷大即可得到有限极限。",
   "steps": [
    {
     "title": "第一步：明确「极限存在」的判定标准",
     "content": "本题四个选项的趋向过程各不相同（$x\\to+\\infty$、$x\\to 0$、$x\\to\\infty$），因此不能套用同一个公式，而要分别按定义检查。对 $x\\to x_0$ 的情形，必须左右极限都存在且相等；只要有一侧不存在或趋于 $\\infty$，或两侧不等，极限就不存在。对 $x\\to\\infty$ 的情形，则要看函数是否趋于一个确定的有限常数。先记住这个判据，再逐个验证，能避免看到「式子很复杂」就凭感觉选。"
    },
    {
     "title": "第二步：先排除 $x\\to 0$ 的两个幂指型/分式选项",
     "content": "选项 B 中 $\\lim\\limits_{x\\to 0}e^{\\frac{1}{x}}$，由于 $\\frac{1}{x}$ 在 $x\\to 0^{+}$ 时趋于 $+\\infty$、在 $x\\to 0^{-}$ 时趋于 $-\\infty$，故左极限为 $e^{-\\infty}=0$，右极限为 $e^{+\\infty}=+\\infty$，右极限不存在（也不是有限值），所以该极限不存在。选项 D 中 $\\lim\\limits_{x\\to 0}\\frac{1}{2^{x}-1}$，当 $x\\to 0$ 时 $2^{x}-1\\to 0$：从右侧趋近时 $2^{x}-1>0$，函数趋于 $+\\infty$；从左侧趋近时 $2^{x}-1<0$，函数趋于 $-\\infty$。两侧一个 $+\\infty$ 一个 $-\\infty$，同样不存在。这两个选项是典型的「分母趋于零且变号」或「指数倒数为无穷」的陷阱。"
    },
    {
     "title": "第三步：处理 $x\\to+\\infty$ 的根式选项 A",
     "content": "选项 A 是 $\\lim\\limits_{x\\to+\\infty}\\sqrt{\\frac{x^{2}+1}{x}}=\\lim\\limits_{x\\to+\\infty}\\sqrt{x+\\frac{1}{x}}$。被开方式中 $x\\to+\\infty$、$\\frac{1}{x}\\to 0$，因此整体趋于 $+\\infty$，开方后仍趋于 $+\\infty$。极限值不是有限常数，按定义该极限不存在（属于「极限为无穷大」的情形，考试中不与「极限存在」混为一谈）。"
    },
    {
     "title": "第四步：验证选项 C 确实存在极限",
     "content": "选项 C 为 $\\lim\\limits_{x\\to\\infty}\\frac{x(x+2)(x-\\sin x)}{x^{3}}$。关键是把分子按 $x$ 的最高次幂整理：$(x+2)(x-\\sin x)=x^{2}+(2-\\sin x)x-2\\sin x$，再乘 $x$ 得 $x^{3}+(2-\\sin x)x^{2}-2x\\sin x$。于是原式 $=1+\\frac{2-\\sin x}{x}-\\frac{2\\sin x}{x^{2}}$。其中 $\\sin x$ 有界（$|\\sin x|\\le 1$），所以 $(2-\\sin x)$ 也有界，由「有界量除以无穷大趋于零」得 $\\frac{2-\\sin x}{x}\\to 0$；同理 $\\left|\\frac{2\\sin x}{x^{2}}\\right|\\le\\frac{2}{x^{2}}\\to 0$。故极限为 $1$，存在。因此本题选 C。"
    }
   ],
   "optionNotes": [
    {
     "key": "A",
     "note": "为什么会选到 A：看到根号内有分式、且分母是 $x$，误以为「分子分母同阶、结果有限」。而实际上 $\\sqrt{\\frac{x^{2}+1}{x}}=\\sqrt{x+\\frac{1}{x}}$，随 $x\\to+\\infty$ 无界增大，趋于 $+\\infty$，不是有限常数，故极限不存在。"
    },
    {
     "key": "B",
     "note": "为什么会选到 B：只验证了「$e^{\\frac{1}{x}}$ 有定义」或只算了单侧，忽略了 $x\\to 0$ 需左右同看；也有人误套 $e^{\\frac{1}{x}}\\to e^{0}=1$，那是把 $\\frac{1}{x}$ 当成趋于 $0$ 了。实际上 $\\frac{1}{x}\\to\\pm\\infty$，右极限为 $+\\infty$，左右极限不等，极限不存在。"
    },
    {
     "key": "D",
     "note": "为什么会选到 D：把 $2^{x}-1$ 与 $x\\ln 2$ 等价后认为比值趋于「$\\frac{1}{0}$ 型」，或只算 $\\frac{1}{2^{x}-1}\\to\\infty$ 就断定极限存在。实际上分母在 $x=0$ 两侧变号，左极限为 $-\\infty$、右极限为 $+\\infty$，两侧不一致，极限不存在。"
    }
   ],
   "pitfalls": "最典型的错误是只算单侧极限（或只看 $x\\to x_0^{+}$）就下结论，尤其在 $x\\to 0$ 时忽略左右两侧符号与方向的区别；其次是混淆「极限不存在」与「极限为无穷大」，把趋于 $\\infty$ 的选项 A 也当成极限存在。",
   "selfReasoning": ""
  },
  "T1-07": {
   "verdict": "ok",
   "selfAnswer": "B",
   "officialAnswer": "B",
   "transcriptionIssues": [],
   "keyIdea": "因式分解消去零因子：识别出 $x\\to 7$ 时分子分母同趋于 $0$ 的 $\\frac{0}{0}$ 型极限，找出公因子 $x-7$ 约掉后再代入求值。",
   "steps": [
    {
     "title": "第一步：先代入，判断类型",
     "content": "不要一上来就硬算。先把 $x=7$ 直接代入分子分母，看会发生什么：分子为 $7^{2}-3\\times 7-28=49-21-28=0$，分母为 $7^{2}-5\\times 7-14=49-35-14=0$。得到 $\\frac{0}{0}$，说明 $x=7$ 既是分子的零点也是分母的零点，公因子 $(x-7)$ 一定存在。这一步的意义在于：$\\frac{0}{0}$ 属于未定式，极限值既不是 $0$ 也不是不存在，必须先做代数变形；而 $x=7$ 是两个多项式的公共零点，恰好告诉我们该往哪个方向变形——约去零因子。"
    },
    {
     "title": "第二步：因式分解，找出并约去公因子",
     "content": "既然已知 $x=7$ 是零点，可以直接按 $(x-7)$ 拆项，比十字相乘法更快。分子：$x^{2}-3x-28=x^{2}-7x+4x-28=x(x-7)+4(x-7)=(x-7)(x+4)$。分母：$x^{2}-5x-14=x^{2}-7x+2x-14=x(x-7)+2(x-7)=(x-7)(x+2)$。于是原式为 $\\frac{(x-7)(x+4)}{(x-7)(x+2)}$。关键理由：在 $x\\to 7$ 的过程中恒有 $x\\neq 7$，因此 $\\frac{x-7}{x-7}=1$ 合法，可以放心约掉，这就把未定式化成了普通的商式 $\\frac{x+4}{x+2}$。"
    },
    {
     "title": "第三步：代入化简后的式子求值",
     "content": "约分后函数 $\\frac{x+4}{x+2}$ 在 $x=7$ 处分母 $9\\neq 0$，已连续，可直接代入：$\\lim\\limits_{x\\to 7}\\frac{x+4}{x+2}=\\frac{7+4}{7+2}=\\frac{11}{9}$。所以选 B。"
    }
   ],
   "optionNotes": [
    {
     "key": "A",
     "note": "选 A（$2$）的典型错误是把 $\\frac{0}{0}$ 型极限当成 \"分子分母都是 $0$，所以比值为 $0$ 或随便猜\"，或者只约掉了分子分母中最高次项的系数比、误把 $\\frac{x^2}{x^2}$ 的系数 $\\frac{1}{1}=1$ 与某个数混淆后凑出 2。本题分子分母次数相同，$x\\to\\infty$ 时才是系数比 $\\frac{1}{1}=1$，但这里趋向的是有限点 $7$，不能套用无穷远的抓大项方法。"
    },
    {
     "key": "C",
     "note": "选 C（$4$）的人多半是只约掉了分子，例如把 $x^{2}-3x-28$ 分解成 $(x-7)(x+4)$ 后直接读出常数项 $4$，却忘了分母也要分解成 $(x-7)(x+2)$，把 $\\frac{11}{9}$ 里分子的 $+4$ 当成了答案。避免办法：分解完必须写成分式整体，确认公因子在分子分母中同时被约去。"
    },
    {
     "key": "D",
     "note": "选 D（$0$）的人看到分子分母代入都等于 $0$，就误以为商为 $0$，或误以为 $\\frac{0}{0}$ 就是 \"极限不存在/无意义\" 而选择了最像 0 的选项。实际上 $\\frac{0}{0}$ 是未定式，约去零因子后极限是确定的非零值 $\\frac{11}{9}$；只有约分后分子为 $0$、分母非 $0$ 时极限才为 $0$。"
    }
   ],
   "pitfalls": "最典型的错误是见到 $\\frac{0}{0}$ 就草率下结论：或认为极限为 $0$、或认为极限不存在，而不去做因式分解约零因子这一必要步骤。另一个高频错误是只对分子（或只对分母）分解，约分不彻底就代入，导致丢掉分母的 $(x-7)$ 而算错。规范做法是：先代入判型，确认 $\\frac{0}{0}$ 后分子分母都分解并找出公因子，约干净之后再代入。",
   "selfReasoning": ""
  },
  "T1-08": {
   "verdict": "ok",
   "selfAnswer": "C",
   "officialAnswer": "C",
   "transcriptionIssues": [],
   "keyIdea": "分子分母同为 $x\\to 0$ 时的无穷小，属 $\\frac{0}{0}$ 型，直接用等价无穷小替换 $\\ln(1+2x)\\sim 2x$、$1-\\cos x\\sim \\frac{x^{2}}{2}$ 即可约掉 $x$ 定值。",
   "steps": [
    {
     "title": "第一步：判断类型，决定方法",
     "content": "把 $x\\to 0$ 代入：分子 $x\\ln(1+2x)\\to 0\\cdot 0=0$，分母 $1-\\cos x\\to 0$，所以这是 $\\frac{0}{0}$ 型未定式。$\\frac{0}{0}$ 型最省力的两条路是等价无穷小替换与洛必达法则；本题分子分母都是**乘积形式的因子**（$x\\cdot\\ln(1+2x)$ 与单独的 $1-\\cos x$），没有加减项，正好满足等价替换的使用前提，因此优先选等价替换，而不是求导繁琐的洛必达。"
    },
    {
     "title": "第二步：写出两个基本等价无穷小并代入",
     "content": "在 $x\\to 0$ 时有两个常用结论：$\\ln(1+u)\\sim u$，取 $u=2x$ 得 $\\ln(1+2x)\\sim 2x$；以及 $1-\\cos x\\sim \\dfrac{x^{2}}{2}$（由 $\\cos x=1-\\dfrac{x^{2}}{2}+o(x^{2})$ 得到）。代入原式得 $$\\lim_{x\\to 0}\\frac{x\\ln(1+2x)}{1-\\cos x}=\\lim_{x\\to 0}\\frac{x\\cdot 2x}{\\dfrac{x^{2}}{2}}.$$ 这里之所以能直接替换，是因为分子分母各自都是整体（分母就是整个 $1-\\cos x$，分子中的 $\\ln(1+2x)$ 是一个乘积因子），替换后极限不变。"
    },
    {
     "title": "第三步：约分求值并验证",
     "content": "把分母整理成乘除形式：$\\dfrac{2x^{2}}{\\dfrac{x^{2}}{2}}=2x^{2}\\cdot\\dfrac{2}{x^{2}}=4$，与 $x$ 无关，故极限为 $4$。数值检验也支持这一结果：取 $x=10^{-3},10^{-5}$ 时原式分别约为 $3.9960$、$3.99996$，稳定趋近 $4$。所以选 C。"
    }
   ],
   "optionNotes": [
    {
     "key": "A",
     "note": "选 A 的人只替换了分子 $\\ln(1+2x)\\sim 2x$，把 $1-\\cos x$ 粗略当成 $x^{2}$，于是得到 $\\dfrac{2x^{2}}{x^{2}}=2$。错在漏掉了 $1-\\cos x\\sim\\dfrac{x^{2}}{2}$ 中的系数 $\\dfrac{1}{2}$——这个 $\\dfrac{1}{2}$ 在分母上，丢掉它会把结果缩小一半。"
    },
    {
     "key": "B",
     "note": "选 B 属于等价替换的系数记错或纯粹猜测。若误记 $1-\\cos x\\sim\\dfrac{2}{3}x^{2}$ 之类，或把分子想成 $3x^{2}$，才会凑出 $3$。可用 $x\\to 0$ 时 $1-\\cos x$ 与 $\\dfrac{x^{2}}{2}$ 的比值趋于 $1$ 快速自查：本题两个系数 $2$ 与 $\\dfrac{1}{2}$ 相除必得 $4$，不可能出现 $3$。"
    },
    {
     "key": "D",
     "note": "选 D（$-4$）是把符号弄错了。在 $x\\to 0$ 的**双侧**邻域内分母 $1-\\cos x\\ge 0$ 恒为正，分子 $x\\ln(1+2x)$ 在 $x<0$ 时也是负乘负得正，因此整个分式在 $0$ 附近两侧都取正值，极限不可能是负数；大概率是把 $\\ln(1+2x)\\sim -2x$ 之类的错误等价式记反了符号。"
    }
   ],
   "pitfalls": "最典型的错误是在「加减项」中滥用等价无穷小替换：例如把分子 $x\\ln(1+2x)$ 拆成 $x\\cdot 2x$ 尚可（乘积因子），但若写成 $x+\\ln(1+2x)\\sim x+2x$ 就不允许。此外，漏记 $1-\\cos x\\sim\\frac{x^{2}}{2}$ 的系数 $\\frac{1}{2}$（误作 $x^{2}$）会直接得到选项 A 的 $2$，这是本题最主要的失分点。",
   "selfReasoning": ""
  },
  "T1-09": {
   "verdict": "ok",
   "selfAnswer": "C",
   "officialAnswer": "C",
   "transcriptionIssues": [],
   "keyIdea": "识别 $1^{\\infty}$ 型未定式，先取对数把幂指函数化为“乘积型”，再用 $\\lim\\limits_{x\\to 0}\\frac{a^{x}-1}{x}=\\ln a$ 或洛必达求出指数部分的极限。",
   "steps": [
    {
     "title": "第一步：判断类型，确定处理框架",
     "content": "当 $x\\to 0$ 时，底数 $\\frac{2^{x}+3^{x}}{2}\\to\\frac{1+1}{2}=1$，指数 $\\frac{1}{x}\\to\\infty$，所以这是 $1^{\\infty}$ 型未定式。它不能直接把 $1$ 代入当答案（那会得到错误的 $1$）。幂指函数 $u(x)^{v(x)}$ 在 $1^{\\infty}$ 型下的标准做法是写成 $e^{v(x)\\ln u(x)}$，因为指数函数连续，可以把极限搬到指数上去：设 $L$ 为所求极限，则 $\\ln L=\\lim\\limits_{x\\to 0}\\frac{1}{x}\\ln\\frac{2^{x}+3^{x}}{2}$，这就把一个「无穷次方」问题降级成了一般的 $\\frac{0}{0}$ 型极限。"
    },
    {
     "title": "第二步：把对数拆成可算的形式",
     "content": "直接对 $\\ln\\frac{2^{x}+3^{x}}{2}$ 求导会很啰嗦。注意到 $x\\to0$ 时 $\\frac{2^{x}+3^{x}}{2}\\to 1$，于是可以插入一个“减 $1$”再配平，利用 $\\lim\\limits_{t\\to 1}\\frac{\\ln t}{t-1}=1$（即 $\\ln t\\sim t-1$）：$\\ln L=\\lim\\limits_{x\\to 0}\\frac{1}{x}\\cdot\\frac{\\ln\\frac{2^{x}+3^{x}}{2}}{\\frac{2^{x}+3^{x}}{2}-1}\\cdot\\left(\\frac{2^{x}+3^{x}}{2}-1\\right)$，其中中间那个因子趋于 $1$，可以丢掉。剩下的关键量是 $\\lim\\limits_{x\\to 0}\\frac{1}{x}\\left(\\frac{2^{x}+3^{x}}{2}-1\\right)=\\lim\\limits_{x\\to 0}\\frac{2^{x}+3^{x}-2}{2x}$。"
    },
    {
     "title": "第三步：用基本极限 $\\lim\\limits_{x\\to0}\\frac{a^{x}-1}{x}=\\ln a$ 拆项计算",
     "content": "把 $\\frac{2^{x}+3^{x}-2}{2x}$ 拆成两项，各自凑成标准形式：$\\frac{2^{x}-1}{2x}+\\frac{3^{x}-1}{2x}=\\frac{1}{2}\\cdot\\frac{2^{x}-1}{x}+\\frac{1}{2}\\cdot\\frac{3^{x}-1}{x}\\to\\frac{1}{2}\\ln 2+\\frac{1}{2}\\ln 3=\\frac{\\ln 6}{2}$。这一步之所以能拆，是因为极限存在且两项极限各自存在（极限的四则运算）。于是 $\\ln L=\\frac{\\ln 6}{2}=\\ln\\sqrt{6}$，由对数函数单调可逆得 $L=\\sqrt{6}$，选 C。"
    },
    {
     "title": "第四步：用重要极限的形式复核（可选）",
     "content": "也可套 $\\lim\\limits_{x\\to 0}(1+\\alpha x)^{\\frac{1}{x}}=e^{\\alpha}$：底数 $\\frac{2^{x}+3^{x}}{2}=1+\\frac{2^{x}+3^{x}-2}{2}$，而 $\\frac{2^{x}+3^{x}-2}{2}\\sim\\frac{x(\\ln 2+\\ln 3)}{2}=\\frac{\\ln 6}{2}x$，故原式 $=e^{\\frac{\\ln 6}{2}}=\\sqrt{6}$，与上面一致，说明结果可靠。"
    }
   ],
   "optionNotes": [
    {
     "key": "A",
     "note": "为什么会选到 A：看到底数 $\\frac{2^{x}+3^{x}}{2}$ 在 $x\\to0$ 时趋于 $1$，就直接把底数当成 $1$，认为 $1^{\\infty}=1$，忽略了指数 $\\frac{1}{x}$ 同时发散，底数只是“趋于”1 而恒大于 1，无穷次方会把偏差放大。实际上这是 $1^{\\infty}$ 型未定式，结果不一定是 1。"
    },
    {
     "key": "B",
     "note": "为什么会选到 B：算对了 $\\ln L=\\frac{1}{2}\\ln 2+\\frac{1}{2}\\ln 3$ 之后，忘记把对数还原回去，或者只取了其中一项（如只用 $\\frac{1}{2}\\ln2$ 得 $\\sqrt{2}$）。实际上 $\\frac{1}{2}\\ln2+\\frac{1}{2}\\ln3=\\frac{1}{2}\\ln 6=\\ln\\sqrt6$，答案是 $\\sqrt6$ 而非 $\\sqrt2$。"
    },
    {
     "key": "D",
     "note": "为什么会选到 D：把 $\\frac{1}{2}\\ln2+\\frac{1}{2}\\ln3$ 中的 $\\frac{1}{2}$ 与底数加权“抵消”而误写成 $\\ln 2+\\ln3=\\ln6$，或直接把 $2^{x}$、$3^{x}$ 的“平均”误当成几何平均 $\\sqrt6$ 后再乘以 $2$。实际上指数部分的系数 $\\frac{1}{2}$ 来自底数除以 $2$，它使结果开平方，故为 $\\sqrt6$ 而不是 $6$ 或 $2$。"
    }
   ],
   "pitfalls": "最常见的错误是把 $1^{\\infty}$ 型直接当成 $1$，即只看到底数趋向 $1$ 就写答案 A。正确认识是：底数趋于 $1$ 的速度与指数趋于无穷的速度相互竞争，必须化 $e^{v\\ln u}$ 后用基本极限 $\\lim\\limits_{x\\to0}\\frac{a^{x}-1}{x}=\\ln a$（或洛必达）精确计算；另一个常见失误是把 $\\frac{1}{2}\\ln 6$ 误还原成 $6$ 或 $\\sqrt2$，丢掉了“先取对数、最后要反对数还原”这一步。",
   "selfReasoning": ""
  },
  "T1-10": {
   "verdict": "ok",
   "selfAnswer": "C",
   "officialAnswer": "C",
   "transcriptionIssues": [
    {
     "field": "src",
     "inRecord": "Test1/Test1-10.jpg",
     "inImage": "Test1/Test1/Test1-10.jpg（实际截图文件所在位置；仅文件路径层面不一致，不影响题干、选项与答案的核对）"
    }
   ],
   "keyIdea": "本题不是对 $x$ 求极限，而是把 $x$ 看作固定参数对 $n$ 求极限，必须先按 $x\\neq 0$ 与 $x=0$ 分类讨论，才能得到 $f(x)$ 的分段表达式，再去找它的间断点。",
   "steps": [
    {
     "title": "第一步：判断类型——分清谁是变量",
     "content": "式子是 $f(x)=\\lim\\limits_{n\\to\\infty}\\frac{(n-1)x}{nx^{2}+1}$，极限变量是 $n$，而 $x$ 在求极限过程中只是一个固定的常数，所以 $f(x)$ 其实是「对每个 $x$ 算出这个数列的极限」得到的一个新函数，这与直接求 $x\\to\\infty$ 的极限完全不同。识别特征就是：极限号下标写的是 $n\\to\\infty$，函数名却是 $f(x)$——这类题一定是先求极限得 $f(x)$ 的表达式，再讨论连续性。"
    },
    {
     "title": "第二步：求极限得到 $f(x)$ 的表达式",
     "content": "当 $x\\neq 0$ 时，分母关于 $n$ 是 $x^{2}$ 的一阶量，用「同除最高次幂 $n$」的办法：$\\frac{(n-1)x}{nx^{2}+1}=\\frac{\\left(1-\\frac{1}{n}\\right)x}{x^{2}+\\frac{1}{n}}$，令 $n\\to\\infty$ 得 $f(x)=\\frac{x}{x^{2}}=\\frac{1}{x}$。当 $x=0$ 时，分子为 $0$，对任意 $n$ 都有 $\\frac{(n-1)\\cdot 0}{n\\cdot 0+1}=0$，故 $f(0)=\\lim\\limits_{n\\to\\infty}0=0$。于是 $f(x)=\\begin{cases}\\dfrac{1}{x}, & x\\neq 0\\\\[2pt] 0, & x=0\\end{cases}$。之所以要单独讨论 $x=0$，是因为上面的「同除 $n$」只换算了 $n$ 的最高次幂，而 $x\\neq 0$ 才能保证分母 $x^{2}+\\frac{1}{n}$ 的极限 $x^{2}$ 不为零、可以做除法。"
    },
    {
     "title": "第三步：在定义域内找间断点",
     "content": "初等函数 $\\frac{1}{x}$ 在 $x\\neq 0$ 的每一点都连续，所以 $f$ 的间断点只可能在分段处 $x=0$。在 $x=0$ 考查双侧极限：$\\lim\\limits_{x\\to 0^{+}}\\frac{1}{x}=+\\infty$，$\\lim\\limits_{x\\to 0^{-}}\\frac{1}{x}=-\\infty$，极限都不存在（更谈不上等于 $f(0)=0$），故 $x=0$ 是 $f$ 的间断点，且属于第二类（无穷）间断点。注意 $x=0$ 处 $f$ 有定义，正因为如此才需要按定义去比对极限与函数值，不能凭「$x=0$ 使 $\\frac{1}{x}$ 分母为零」就草率下结论。"
    }
   ],
   "optionNotes": [
    {
     "key": "A",
     "note": "选 A 的人把「使某个表达式为零的点」当成了间断点。实际上 $x=-1\\neq 0$ 时 $f(-1)=\\frac{1}{-1}=-1$，且 $\\lim\\limits_{x\\to -1}f(x)=-1=f(-1)$，该点连续，不是间断点。"
    },
    {
     "key": "B",
     "note": "选 B 的人多半是被原式分母 $nx^{2}+1$ 误导，以为要令 $x^{2}$ 相关部分「出问题」于是解出 $x=2$（或以为 $x=\\pm 1$ 附近有奇点）。而 $f(2)=\\frac{1}{2}$，$\\lim\\limits_{x\\to 2}f(x)=\\frac{1}{2}$，函数在 $x=2$ 处连续。"
    },
    {
     "key": "D",
     "note": "选 D 的人把「$n\\to\\infty$ 时分子分母同阶、极限为 1」这个结果当成了函数值，从而认为 $x=1$ 特殊；其实 $x=1$ 只是 $f(1)=1$ 的普通连续点，$f$ 在该点既连续也无定义缺陷。"
    }
   ],
   "pitfalls": "最容易犯的错是没看清极限变量是 $n$ 而不是 $x$，直接把 $x\\to\\infty$ 或把 $x$ 当成变量去「约分」，从而漏掉 $x=0$ 的单独讨论，得到 $f(x)=\\frac{1}{x}$ 后就以为间断点由分母为零之外的选项决定；其次是忘了 $x=0$ 处 $f$ 已有定义 $f(0)=0$，导致判断间断点类型时把「函数值存在」与「极限存在」混为一谈。",
   "selfReasoning": ""
  },
  "T2-01": {
   "verdict": "ok",
   "selfAnswer": "B",
   "officialAnswer": "B",
   "transcriptionIssues": [],
   "keyIdea": "当 $x\\to 0$ 时 $\\arctan 3x\\sim 3x$，用等价无穷小替换把 $\\arctan$ 型极限化为一次比，或直接用重要极限 $\\lim_{t\\to 0}\\frac{\\arctan t}{t}=1$。",
   "steps": [
    {
     "title": "识别极限类型",
     "content": "当 $x\\to 0$ 时分子 $\\arctan 3x\\to \\arctan 0=0$，分母 $2x\\to 0$，故为 $\\frac{0}{0}$ 型未定式，可用等价无穷小替换或洛必达法则。"
    },
    {
     "title": "等价无穷小替换",
     "content": "由常用等价无穷小 $\\arctan u\\sim u$（$u\\to 0$）。取 $u=3x$，因 $x\\to 0$ 时 $3x\\to 0$，故 $\\arctan 3x\\sim 3x$。"
    },
    {
     "title": "代入求值",
     "content": "$$\\lim_{x\\to 0}\\frac{\\arctan 3x}{2x}=\\lim_{x\\to 0}\\frac{3x}{2x}=\\frac{3}{2}.$$"
    },
    {
     "title": "另解（洛必达法则）",
     "content": "对 $\\frac{0}{0}$ 型用洛必达法则：$$\\lim_{x\\to 0}\\frac{\\arctan 3x}{2x}\\xlongequal{\\text{L'H}}\\lim_{x\\to 0}\\frac{\\dfrac{3}{1+9x^{2}}}{2}=\\frac{3}{2}.$$ 与等价替换结果一致。"
    },
    {
     "title": "得出结论",
     "content": "极限值为 $\\frac{3}{2}$，对应选项 B，与 App 给出的正确答案和我的答案（绿色 ✓）一致。"
    }
   ],
   "optionNotes": [
    {
     "key": "A",
     "note": "误认为分子有界而分母趋于 0 或把 $\\frac{0}{0}$ 型当作 0；$\\arctan 3x$ 与 $3x$ 同阶，并非高阶无穷小，极限不为 $0$。"
    },
    {
     "key": "B",
     "note": "正确。等价替换 $\\arctan 3x\\sim 3x$ 得 $\\frac{3x}{2x}=\\frac{3}{2}$。"
    },
    {
     "key": "C",
     "note": "误以为分母趋于 0 则整体无限增大；实际上分子与分母同阶趋于 0，比值趋于有限常数。"
    },
    {
     "key": "D",
     "note": "遗漏了分子中的系数 3（只用了 $\\arctan 3x\\sim 3x$ 之外的错误代换，如误写为 $\\arctan 3x\\sim x$）；系数须一并保留，答案为 $\\frac{3}{2}$ 而非 $1$。"
    }
   ],
   "pitfalls": "常见错误有三类：一是把 $\\arctan 3x$ 的等价无穷小记成 $x$ 而非 $3x$，丢掉系数得 $1$（选 D）；二是看到分母含 $x$ 就断定极限为 $0$ 或 $\\infty$（选 A 或 C）；三是使用等价替换时忘记替换必须在乘除因子中进行（本题分子分母均为独立因子，替换合法）。牢记 $\\arctan u\\sim\\arcsin u\\sim\\tan u\\sim\\sin u\\sim u$（$u\\to 0$），系数要随 $u$ 一起保留。",
   "selfReasoning": "独立求解：极限为 $\\frac{0}{0}$ 型，由 $\\arctan u\\sim u$ 得 $\\arctan 3x\\sim 3x$，故原式 $=\\frac{3x}{2x}=\\frac{3}{2}$，选 B。用洛必达法则复核（分子导数 $\\frac{3}{1+9x^2}\\to 3$，分母导数 $2$）同样得 $\\frac{3}{2}$，两种方法结果一致，确认无计算失误。与 App 标注的正确答案 B 以及我的答案 B（绿色对勾，得分 10 分）完全一致，故判定 verdict 为 ok。"
  },
  "T2-02": {
   "verdict": "ok",
   "selfAnswer": "D",
   "officialAnswer": "D",
   "transcriptionIssues": [],
   "keyIdea": "遇到乘积中出现 $e^{-\\frac{1}{x-2}}$（指数含 $\\frac{1}{x-2}$）的 $x\\to 2$ 极限，先约分，再按“指数趋于 $\\pm\\infty$”分别判断 $e$ 因子在两侧的趋势，求左右极限；并牢记“极限不存在”与“极限为无穷大”是两回事。",
   "steps": [
    {
     "title": "第一步：判断类型——指数里含 $\\frac{1}{x-2}$，必须分左右极限",
     "content": "先把能约的约掉：当 $x\\neq 2$ 时 $\\frac{x^{2}-4}{x-2}=x+2$，故 $f(x)=(x+2)e^{-\\frac{1}{x-2}}$。题眼在指数 $-\\frac{1}{x-2}$：虽然 $x\\to 2$ 时 $\\frac{1}{x-2}\\to\\infty$，但 $x\\to 2^{+}$ 与 $x\\to 2^{-}$ 时 $\\frac{1}{x-2}$ 分别趋于 $+\\infty$ 和 $-\\infty$，符号相反，于是 $e^{-\\frac{1}{x-2}}$ 在两侧一个趋于 $0$、一个趋于 $+\\infty$。这说明函数在 $x=2$ 两侧性态完全不同，既不能整体代入，也不能假设极限存在，只能分别求左、右极限。"
    },
    {
     "title": "第二步：求右极限 $\\lim\\limits_{x\\to 2^{+}}f(x)$",
     "content": "当 $x\\to 2^{+}$ 时 $x-2\\to 0^{+}$，所以 $-\\frac{1}{x-2}\\to -\\infty$，从而 $e^{-\\frac{1}{x-2}}\\to 0$；同时 $x+2\\to 4$ 是有限量。有限量乘无穷小仍是无穷小，故 $\\lim\\limits_{x\\to 2^{+}}f(x)=4\\times 0=0$。"
    },
    {
     "title": "第三步：求左极限 $\\lim\\limits_{x\\to 2^{-}}f(x)$",
     "content": "当 $x\\to 2^{-}$ 时 $x-2\\to 0^{-}$，所以 $-\\frac{1}{x-2}\\to +\\infty$，从而 $e^{-\\frac{1}{x-2}}\\to +\\infty$；同时 $x+2\\to 4>0$。正数乘正无穷大仍为正无穷大，故 $\\lim\\limits_{x\\to 2^{-}}f(x)=+\\infty$。"
    },
    {
     "title": "第四步：由左右极限判定结论",
     "content": "左右极限不相等（一侧为 $0$，一侧为 $+\\infty$），所以 $\\lim\\limits_{x\\to 2}f(x)$ 不存在。又因为右极限是有限的 $0$ 而不是无穷大，$\\lim\\limits_{x\\to 2}f(x)=\\infty$ 也不成立（该写法要求 $|f(x)|\\to+\\infty$）。两句话合起来恰好就是选项 D 的表述，故选 D。"
    }
   ],
   "optionNotes": [
    {
     "key": "A",
     "note": "选 A 的人把 $e^{-\\frac{1}{x-2}}$ 当作“趋于 $1$ 的普通连续因子”而直接忽略，从而默认极限存在且为有限数。可作对照：若真把它看成 $1$，约分后应是 $x+2\\to 4$（$4$ 并不在选项中），说明 A 的数值并没有可靠来源。这类错误的实质是没有意识到这个指数因子在 $x=2$ 两侧一个趋于 $0$、一个趋于 $+\\infty$，恰恰是决定本题结论的关键。"
    },
    {
     "key": "B",
     "note": "选 B 的人只算了右极限：$x\\to 2^{+}$ 时 $e^{-\\frac{1}{x-2}}\\to 0$，于是 $(x+2)e^{-\\frac{1}{x-2}}\\to 0$，就把这个单侧结果当成了整体极限（记录中“我的答案”B 正是这一错因，被判定答错）。极限存在的充要条件是左右极限都存在且相等，只验证一侧不足以说明极限存在。"
    },
    {
     "key": "C",
     "note": "选 C 的人只算了左极限：$x\\to 2^{-}$ 时 $-\\frac{1}{x-2}\\to +\\infty$，$e^{-\\frac{1}{x-2}}\\to+\\infty$，于是 $f(x)\\to+\\infty$，便断定极限为 $\\infty$。这里混淆了“极限为无穷大”与“极限不存在”：本题右侧趋于 $0$ 而非无穷大，所以不能写成 $\\lim\\limits_{x\\to 2}f(x)=\\infty$。"
    }
   ],
   "pitfalls": "最典型的错误是只算一侧就下结论：只算右侧就把 $0$ 当答案（选 B），只算左侧就把 $+\\infty$ 当答案（选 C）。根源是看到 $\\frac{x^{2}-4}{x-2}$ 可以约分，就以为整个极限可以整体处理，忽略了 $e^{-\\frac{1}{x-2}}$ 中 $\\frac{1}{x-2}$ 在 $x=2$ 两侧趋于符号相反的无穷。第二类错误是把“极限不存在”与“极限为无穷大”混为一谈，忘了后者要求 $|f(x)|\\to+\\infty$ 在相应单侧（或整体）成立。",
   "selfReasoning": ""
  },
  "T2-03": {
   "verdict": "ok",
   "selfAnswer": "C",
   "officialAnswer": "C",
   "transcriptionIssues": [],
   "keyIdea": "识别 $1^{\\infty}$ 型未定式，用第二重要极限 $\\lim\\left(1+u\\right)^{1/u}=e$（或 $u^{v}=e^{v\\ln u}$ 取对数法）把幂指型极限化为 $e^{\\lim v(u-1)}$，再由 $27=3^{3}$ 反解 $a$。",
   "steps": [
    {
     "title": "第一步：判断类型，选定工具",
     "content": "当 $x \\to \\infty$ 时，底数 $\\frac{x+2a}{x-a}=\\frac{1+2a/x}{1-a/x} \\to 1$，而指数 $x \\to \\infty$，所以这是 $1^{\\infty}$ 型未定式。$1^{\\infty}$ 型不能用四则运算拆开，它的标准处理方式有两种：一是凑第二重要极限 $\\lim\\limits_{u \\to 0}(1+u)^{1/u}=e$，二是对幂指函数取对数，$u^{v}=e^{v\\ln u}$，把指数整体搬下来变成乘积型极限。本题用后者最省力。"
    },
    {
     "title": "第二步：化出 $1+$『无穷小』的结构，提取 $u-1$",
     "content": "把底数写成 $1$ 加一个无穷小的形式：$$\\frac{x+2a}{x-a}=1+\\frac{(x+2a)-(x-a)}{x-a}=1+\\frac{3a}{x-a}.$$ 注意关键是分子上的差 $2a-(-a)=3a$，它决定了最终的指数；这一步若把差算成 $a$ 或 $2a$，后面全错。当 $x \\to \\infty$ 时 $u=\\frac{3a}{x-a}\\to 0$（若 $a=0$ 则 $u\\equiv 0$，属退化情形，需单独讨论），满足 $1^{\\infty}$ 型的标准结构。"
    },
    {
     "title": "第三步：用取对数法算出极限为 $e^{3a}$",
     "content": "设原极限为 $L$，取对数：$$\\ln L=\\lim\\limits_{x \\to \\infty} x\\ln\\left(1+\\frac{3a}{x-a}\\right).$$ 因为 $u=\\frac{3a}{x-a}\\to 0$，由等价无穷小 $\\ln(1+u)\\sim u$，$$\\ln L=\\lim\\limits_{x \\to \\infty} x\\cdot\\frac{3a}{x-a}=3a\\lim\\limits_{x \\to \\infty}\\frac{x}{x-a}=3a\\cdot 1=3a.$$ 所以 $L=e^{3a}$。这里把 $\\ln(1+u)$ 换成 $u$ 是合法的，因为它是乘积因子且 $u\\to 0$；得到的 $3a$ 与 $x$ 无关，说明左右极限（$x\\to+\\infty$ 与 $x\\to-\\infty$）结论一致，极限确实存在并等于 $e^{3a}$。"
    },
    {
     "title": "第四步：由 $27=3^{3}$ 反解 $a$",
     "content": "题设给出 $L=27$，即 $e^{3a}=27=3^{3}$。两边取自然对数得 $3a=\\ln 27=3\\ln 3$，故 $a=\\ln 3$，选 C。回报检验：取 $a=\\ln 3$ 时 $3a=3\\ln 3=\\ln 27$，$e^{3a}=27$，与题设完全吻合。"
    }
   ],
   "optionNotes": [
    {
     "key": "A",
     "note": "为什么会选到 A：把 $a=0$ 代入，底数变成 $\\frac{x}{x}=1$，误以为 $1^{\\infty}=1$，于是觉得「$a=0$ 时极限存在且等于 1，也许答案就是 0」。而实际上 $1^{\\infty}$ 是未定式，极限值由底数趋近 1 的速度和指数增长的速度共同决定；代入 $a=0$ 得到的极限是 $e^{0}=1\\neq 27$，不满足题设方程，所以 $a=0$ 被排除。"
    },
    {
     "key": "B",
     "note": "为什么会选到 B：在解 $3a=\\ln 27$ 时符号或倍数出错，例如把 $\\ln 27=3\\ln 3$ 误写成 $-1$（将 $\\ln 27$ 与 $\\ln \\frac{1}{e}$ 之类混淆，或把方程错列成 $3a=-1$）。本题是解方程而不是求某个极限值，得到 $3a=\\ln 27>0$ 后必有 $a>0$，$e^{-1}<0$ 在符号上就已经不符合，可直接排除。"
    },
    {
     "key": "D",
     "note": "为什么会选到 D：正确解到 $3a=\\ln 27$ 后，误以为 $\\ln 27$ 就等于 3（把「$e^{3}=27$ 的指数 3」与「$\\ln 27$ 的值」混为一谈），从而写成 $3a=3$、$a=1$。而实际上 $\\ln 27=3\\ln 3\\approx 3.296$，指数上的数字 3 并不等于对数值；正确的 $a=\\ln 3\\approx 1.099\\neq 1$。"
    }
   ],
   "pitfalls": "本题最典型的错误是见到 $1^{\\infty}$ 就直接写 1（把未定式当成定式），或者在凑底数时把 $\\frac{x+2a}{x-a}-1$ 的分子算错（应为 $3a$，常被误算成 $a$ 或 $2a$）；其次是把 $27=3^{3}$ 中的指数 3 直接当作 $\\ln 27$，忘记 $\\ln 27=3\\ln 3$ 而多绕一步或直接漏掉 $\\ln$。",
   "selfReasoning": ""
  },
  "T2-04": {
   "verdict": "ok",
   "selfAnswer": "D",
   "officialAnswer": "D",
   "transcriptionIssues": [
    "任务给出的图片路径缺少一层同名目录：实际文件位于 gaoshu-bank/web/assets/source/Test2/Test2/Test2-4.jpg（与题库 src 字段 Test2/Test2-4.jpg 一致），已按实际路径读取。",
    "极限下标为首重要极限的 $\\lim\\limits_{x \\to +\\infty}$（放大 3 倍可清晰看到 $+$ 号与 $\\infty$），非 $x \\to 0$，也非 $x \\to \\infty$；题干按图转录为 $x \\to +\\infty$。",
    "分母确认为 $2x$（非 $2^x$）。"
   ],
   "keyIdea": "分子 $\\sin 2x$ 是振荡的有界量（$|\\sin 2x| \\le 1$），分母 $2x \\to +\\infty$ 说明 $\\frac{1}{2x}$ 是无穷小；由「有界量乘无穷小仍是无穷小」得 $\\lim\\limits_{x \\to +\\infty} \\frac{\\sin 2x}{2x} = 0$。本题与第一重要极限 $\\lim\\limits_{x \\to 0} \\frac{\\sin 2x}{2x} = 1$ 形似而极限过程完全不同，辨析两者的区别正是考点。",
   "steps": [
    {
     "title": "第一步：判断类型——先看极限过程，再决定能否用第一重要极限",
     "content": "看到 $\\frac{\\sin 2x}{2x}$ 极易条件反射地写成 $1$，但第一重要极限 $\\lim\\limits_{u \\to 0} \\frac{\\sin u}{u} = 1$ 成立的前提是 $u \\to 0$。本题是 $x \\to +\\infty$，此时 $2x \\to +\\infty$ 而非 $\\to 0$，$\\frac{\\sin 2x}{2x}$ 根本不是 $\\frac{0}{0}$ 型未定式，而是「有界量除以无穷大」，因此第一重要极限在此处不适用。"
    },
    {
     "title": "第二步：识别结构——有界量乘无穷小",
     "content": "把式子拆成两个因子之积：$$\\frac{\\sin 2x}{2x} = \\sin 2x \\cdot \\frac{1}{2x}.$$ 对任意实数 $x$ 都有 $|\\sin 2x| \\le 1$，即 $\\sin 2x$ 是（关于 $x$ 一致）有界量；而当 $x \\to +\\infty$ 时 $\\frac{1}{2x} \\to 0$，即 $\\frac{1}{2x}$ 是无穷小量。"
    },
    {
     "title": "第三步：用「有界量乘无穷小」定理求出极限",
     "content": "定理：若存在 $M>0$ 使 $|g(x)| \\le M$，且 $\\lim h(x) = 0$，则 $\\lim g(x)h(x) = 0$。证明只靠夹逼：$0 \\le |g(x)h(x)| \\le M|h(x)| \\to 0$，故 $g(x)h(x) \\to 0$。取 $g(x)=\\sin 2x$（$M=1$）、$h(x)=\\frac{1}{2x}$，即得 $$0 \\le \\left|\\frac{\\sin 2x}{2x}\\right| \\le \\frac{1}{2x} \\xrightarrow{\\;x \\to +\\infty\\;} 0,$$ 由夹逼定理得 $\\left|\\frac{\\sin 2x}{2x}\\right| \\to 0$，从而 $\\lim\\limits_{x \\to +\\infty} \\frac{\\sin 2x}{2x} = 0$。"
    },
    {
     "title": "第四步：核对选项，确认结论",
     "content": "极限值为 $0$，对应选项 D。回报检验：取 $x=1000$，$\\frac{\\sin 2000}{2000}$ 的绝对值不超过 $\\frac{1}{2000}=0.0005$，确实贴着 $0$ 摆动；取 $x$ 更大时振幅 $\\frac{1}{2x}$ 更小，说明函数值既趋于 $0$ 又不停振荡，但只要振幅 $\\to 0$ 极限即存在且为 $0$。注意本题的极限是存在的、等于 $0$，不要因为「$\\sin 2x$ 没有极限」就误判原式极限不存在：$\\sin 2x$ 自身发散，但它被一个趋于 $0$ 的因子压制住了。"
    }
   ],
   "optionNotes": [
    {
     "key": "A",
     "note": "选 A 的人多半把题看成了某个 $x \\to 0$ 或 $x \\to \\pi$ 附近的极限，或者由 $\\sin$ 的取值符号联想到负值：$-1$ 是 $|\\sin 2x| \\le 1$ 的下界，是「振幅」而不是极限值。实际上当 $x \\to +\\infty$ 时函数值在 $\\pm\\frac{1}{2x}$ 之间无限次穿行，既不趋于 $-1$ 也不趋于 $1$，而是振幅不断缩小的振荡。"
    },
    {
     "key": "B",
     "note": "选 B 的人看到 $\\sin 2x$ 在 $x \\to +\\infty$ 时没有极限（振荡发散），就断定整个分式也发散为 $\\infty$。错因是把「分子发散」与「分式发散」等同：这里分子虽然无极限，但它始终有界，分母却无界增大，压制的结果是分式趋于 $0$，而不是 $\\infty$。只有当分子也趋于无穷大时（例如 $\\frac{x\\sin 2x}{1}$ 这种量级）才可能发散。"
    },
    {
     "key": "C",
     "note": "选 C 的人正是踩了本题的核心陷阱：把 $\\lim\\limits_{x \\to +\\infty} \\frac{\\sin 2x}{2x}$ 误当成第一重要极限 $\\lim\\limits_{x \\to 0} \\frac{\\sin 2x}{2x} = 1$。$-1$、$1$ 这两个「振幅端点」只有在对 $x=0$ 求极限、且用 $\\frac{\\sin u}{u} \\to 1$ 时才会出现；本题的极限过程是 $x \\to +\\infty$，$\\frac{1}{2x} \\to 0$，所以结果是 $0$ 而不是 $1$。"
    }
   ],
   "pitfalls": "最典型的错误是「见到 $\\frac{\\sin 2x}{2x}$ 就写 $1$」，把第一重要极限 $\\lim\\limits_{u \\to 0}\\frac{\\sin u}{u}=1$ 的适用条件 $u \\to 0$ 抛在脑后，忽略本题的极限过程是 $x \\to +\\infty$。其次是把「分子无极限」直接等同于「分式无极限」，误选 $\\infty$ 或「不存在」，而没有意识到有界量乘无穷小仍为无穷小这一夹逼结论。第三个易错点是记错结论的方向：有界量乘无穷小得 $0$，而「无穷小乘无穷小」「有界量乘有界量」等组合需要另外讨论，不能随意套用。此外，若题干的极限过程被抄成 $x \\to 0$，答案会变成 $1$，因此做题前务必先确认下标。",
   "selfReasoning": ""
  },
  "T2-05": {
   "verdict": "ok",
   "selfAnswer": "A",
   "officialAnswer": "A",
   "transcriptionIssues": [],
   "keyIdea": "含 $n\\to\\infty$ 的 $x^{2n}$ 型极限必须按底数 $|x|$ 与 $1$ 的大小分段讨论，先求出 $f(x)$ 的分段表达式，再逐点比较函数值与左右极限来判断连续或间断类型。",
   "steps": [
    {
     "title": "第一步：判断类型——为什么必须分段",
     "content": "所求 $f(x)$ 不是普通初等函数，而是对参数 $n$ 取极限后的结果，式中的 $x^{2n}$ 在 $n\\to\\infty$ 时的去向完全由 $|x|$ 决定：$|x|<1$ 时 $x^{2n}\\to 0$，$|x|=1$ 时 $x^{2n}\\equiv 1$，$|x|>1$ 时 $x^{2n}\\to+\\infty$。因此不能把 $x$ 当常数直接代入，必须先按 $|x|$ 与 $1$ 的大小把 $f(x)$ 化为分段函数。这是本题的识别特征——凡见到 $\\lim\\limits_{n\\to\\infty}x^{2n}$、$x^{n}$ 这类结构，都要先分段求极限。"
    },
    {
     "title": "第二步：分段求出 $f(x)$ 的表达式",
     "content": "当 $|x|<1$ 时 $x^{2n}\\to0$，故 $f(x)=\\frac{1-x}{1+0}=1-x$；当 $|x|=1$ 时 $x^{2n}=1$ 对一切 $n$ 成立，故 $f(x)=\\frac{1-x}{1+1}=\\frac{1-x}{2}$。即 $$f(x)=\\begin{cases}1-x, & |x|<1\\\\ \\dfrac{1-x}{2}, & |x|=1\\end{cases}$$ 关键在于 $x=\\pm1$ 这两点取的是 $\\frac{1-x}{2}$ 这一支而非 $1-x$ 那一支，这正是间断的根源。"
    },
    {
     "title": "第三步：在 $x=1$ 与 $x=-1$ 处分别比较函数值与左右极限",
     "content": "在 $x=1$ 处：函数值 $f(1)=\\frac{1-1}{2}=0$，而 $x\\to1$ 时按 $|x|<1$ 那一支，$\\lim\\limits_{x\\to1}f(x)=1-1=0$，极限存在且等于函数值，故 $x=1$ 是连续点。在 $x=-1$ 处：函数值 $f(-1)=\\frac{1-(-1)}{2}=1$，而左右两侧都有 $|x|<1$，故 $\\lim\\limits_{x\\to-1^{-}}f(x)=\\lim\\limits_{x\\to-1^{+}}f(x)=1-(-1)=2$。即 $\\lim\\limits_{x\\to-1}f(x)=2\\ne f(-1)=1$：左右极限存在且相等但不等于函数值，属第一类间断点中的可去间断点。"
    },
    {
     "title": "第四步：核对结论，确定选项",
     "content": "综上，$x=1$ 是连续点、$x=-1$ 是可去间断点，与选项 A 的叙述完全一致，故选 A。注意两个特殊点虽然都来自 $|x|=1$，但一个连续、一个可去间断，绝不能想当然地同等对待。"
    }
   ],
   "optionNotes": [
    {
     "key": "B",
     "note": "选 B 的人把两个特殊点的角色完全弄反了：误以为 $x=-1$ 连续、$x=1$ 跳跃。错因是在 $x=-1$ 处只看到 $|x|=1$，把 $f(-1)=\\frac{1-(-1)}{2}=1$ 与从 $|x|<1$ 一侧趋近时的极限 $2$ 混为一谈，漏掉了「极限值 $2$ 与函数值 $1$ 不等」这一步；在 $x=1$ 处又没注意 $f(1)=0$ 与 $\\lim\\limits_{x\\to1}f(x)=0$ 恰好相等，于是凭空判成跳跃间断。"
    },
    {
     "key": "C",
     "note": "选 C 的人以为 $x=\\pm1$ 两点都落在 $|x|=1$ 那一支上、极限不存在或「被挖空」，从而都当成可去间断点。实际上 $x=1$ 处极限存在且就等于函数值，是连续点，根本不是间断点；$x=-1$ 处虽确实是可去间断点，但选项说「$x=1$ 和 $x=-1$ 都是」，前半句已错。"
    },
    {
     "key": "D",
     "note": "选 D 的人把间断类型的判据用反了：只发现 $x=-1$ 处「不连续」就直接归为跳跃间断点，而没有比较左右极限。$x=-1$ 处左右极限都等于 $2$、彼此相等，只是不等于函数值 $1$，按定义属可去间断点；跳跃间断点要求左右极限都存在但不等，本题这两点都不满足。"
    }
   ],
   "pitfalls": "最典型的错误是先入为主地认为 $x=\\pm1$ 这两点「都是分母 $1+x^{2n}$ 变号的地方」而把两者同等对待，或者只算出 $n\\to\\infty$ 时 $x^{2n}\\to1$ 就草率断定两点都间断、乃至都是跳跃间断点；根源是没有先把 $f(x)$ 按 $|x|<1$、$|x|=1$ 解成分段函数，也没有在每一点老老实实比较 $f(x_0)$ 与左右极限。另一个常见失分点是在 $x=-1$ 处把 $x^{2n}=((-1)^2)^n=1$ 算错，或把分子 $1-x$ 在 $x=-1$ 处的值 $2$ 与 $f(-1)=1$ 混淆。",
   "selfReasoning": ""
  },
  "T2-06": {
   "verdict": "ok",
   "selfAnswer": "D",
   "officialAnswer": "D",
   "transcriptionIssues": [],
   "keyIdea": "分段函数在分界点连续，本质是「右极限 = 函数值」的等式；识别特征是分子出现 $1-e^{\\square}$、分母出现反三角函数，用等价无穷小 $1-e^{u}\\sim-u$、$\\arcsin v\\sim v$ 一步化简。",
   "steps": [
    {
     "title": "第一步：把「连续」翻译成极限等式，确定要求哪一侧的极限",
     "content": "题给 $f(x)$ 在 $x=0$ 的右侧（$x>0$）用 $\\dfrac{1-e^{\\tan x}}{\\arcsin 2x}$，在 $x=0$ 及左侧（$x\\leq 0$）用 $ae^{4x}$。连续要求 $\\lim\\limits_{x\\to 0}f(x)=f(0)$，而 $f(0)$ 由 $x\\leq 0$ 那段决定：$f(0)=ae^{0}=a$。左极限 $\\lim\\limits_{x\\to 0^-}ae^{4x}=a$ 自动成立（$e^{4x}$ 连续），所以只剩一个待定条件：右极限必须也等于 $a$。关键是先算出 $\\lim\\limits_{x\\to 0^+}\\dfrac{1-e^{\\tan x}}{\\arcsin 2x}$，再令它等于 $a$。"
    },
    {
     "title": "第二步：判断类型并选择合适的工具",
     "content": "把 $x\\to 0^+$ 代入：$\\tan x\\to 0$ 故分子 $1-e^{\\tan x}\\to 0$；$\\arcsin 2x\\to 0$ 故分母 $\\to 0$。这是 $\\dfrac{0}{0}$ 型。这时不宜直接洛必达（求导后 $\\dfrac{-e^{\\tan x}\\sec^2 x}{2/\\sqrt{1-4x^2}}$ 反而更复杂），而应利用 $x\\to 0$ 时三个基本等价无穷小：$1-e^{u}\\sim -u\\ (u\\to 0)$、$\\tan x\\sim x$、$\\arcsin v\\sim v\\ (v\\to 0)$。识别特征就是「$1-e^{\\square}$」配「$\\arcsin\\triangle$」这种标准搭配。"
    },
    {
     "title": "第三步：逐项替换并求出极限，反解 $a$",
     "content": "对分子取 $u=\\tan x\\to 0$，得 $1-e^{\\tan x}\\sim -\\tan x\\sim -x$；对分母取 $v=2x\\to 0$，得 $\\arcsin 2x\\sim 2x$。由于两者都是 $x\\to 0^+$ 时的等价无穷小，可直接替换（商的极限）：$$\\lim_{x\\to 0^+}\\frac{1-e^{\\tan x}}{\\arcsin 2x}=\\lim_{x\\to 0^+}\\frac{-\\tan x}{2x}=-\\frac{1}{2}\\cdot 1=-\\frac{1}{2}.$$ 连续条件给出 $a=-\\dfrac{1}{2}$，对应选项 D。（也可用洛必达验证：$\\dfrac{-e^{\\tan x}\\sec^2x}{2/\\sqrt{1-4x^2}}\\Big|_{x\\to 0}=\\dfrac{-1\\cdot 1}{2}=-\\dfrac12$，与等价无穷小结论一致。）"
    }
   ],
   "optionNotes": [
    {
     "key": "A",
     "note": "选 A 的人只算了绝对值：把分子当成 $e^{\\tan x}-1\\sim \\tan x\\sim x$，忽略 $1-e^{u}\\sim -u$ 中的负号，于是得到 $\\dfrac{x}{2x}=\\dfrac12$。注意分子是「$1$ 减指数」而不是「指数减 $1$」，符号必须为负。"
    },
    {
     "key": "B",
     "note": "选 B 的人只保留了负号而丢掉了分母的系数 2：误用 $\\arcsin 2x\\sim x$（漏乘 $2$，忘记 $\\arcsin v\\sim v$ 时 $v$ 要整体代入），于是得到 $-\\dfrac{\\tan x}{x}=-1$。"
    },
    {
     "key": "C",
     "note": "选 C 的人把上面两个错误同时犯了一次：既漏掉分子负号又漏掉分母的 $2$，或干脆把 $1-e^{\\tan x}$ 与 $\\arcsin 2x$ 直接当成同阶量相消为 $1$，属于完全没做等价替换的猜测。"
    }
   ],
   "pitfalls": "两个典型错误：一是记错指数型等价无穷小的方向，把 $1-e^{u}\\sim -u$ 写成 $1-e^{u}\\sim u$（正负号弄反）；二是替换分母时只换函数不换自变量，把 $\\arcsin 2x\\sim 2x$ 误写成 $\\arcsin 2x\\sim x$，漏掉系数 $2$。此外还要认清 $f(0)$ 取的是 $x\\leq 0$ 那一支，即 $f(0)=a$（从而左极限自动等于 $a$），不要误用 $x>0$ 的表达式去算 $f(0)$。",
   "selfReasoning": ""
  },
  "T2-07": {
   "verdict": "ok",
   "selfAnswer": "D",
   "officialAnswer": "D",
   "transcriptionIssues": [],
   "keyIdea": "把给定的极限语言陈述与标准定义互推：只需看出误差控制从 $\\varepsilon$ 放宽为 $2\\varepsilon$、且 $\\varepsilon$ 只取 $(0,1)$ 中的值，都只是对正数做了常数倍缩放，不改变“任意小”的本质，因此是充要条件。",
   "steps": [
    {
     "title": "第一步：弄清题目问的是什么",
     "content": "题目给了一个关于数列 $\\{x_n\\}$ 的陈述 (P)：对任意给定的 $\\varepsilon \\in (0,1)$，总存在正整数 $N$，当 $n \\ge N$ 时恒有 $|x_n - a| \\le 2\\varepsilon$。要判断 (P) 是“$\\{x_n\\}$ 收敛于 $a$”的什么条件，就必须分别检验两个方向：收敛能否推出 (P)（必要性），(P) 能否推出收敛（充分性）。两个方向都成立才选 D。识别特征：这类题本质是在考 $\\varepsilon\\text{-}N$ 定义中“任意小的正数”这句话的等价变形能力。"
    },
    {
     "title": "第二步：检验必要性——由收敛推出 (P)",
     "content": "设 $x_n \\to a$，即对任意 $\\varepsilon_0 > 0$，存在 $N$，当 $n \\ge N$ 时 $|x_n - a| < \\varepsilon_0$。现在任取 $\\varepsilon \\in (0,1)$，它当然是一个正数，直接把定义中的 $\\varepsilon_0$ 取成这个 $\\varepsilon$，就得到某个 $N$，使得 $n \\ge N$ 时 $|x_n - a| < \\varepsilon \\le 2\\varepsilon$。这正是 (P) 的要求，故 (P) 是必要条件。"
    },
    {
     "title": "第三步：检验充分性——由 (P) 推出收敛",
     "content": "设 (P) 成立，要证 $x_n \\to a$。任取 $\\varepsilon' > 0$，需要找到 $N$ 使 $n \\ge N$ 时 $|x_n - a| \\le \\varepsilon'$。取 $\\varepsilon = \\min\\left\\{\\dfrac{\\varepsilon'}{2},\\ \\dfrac{1}{2}\\right\\}$，则 $\\varepsilon \\in (0,1)$，可以代入 (P)（这正是限定 $\\varepsilon \\in (0,1)$ 不造成损失的关键：$\\varepsilon'$ 无论多小，$\\varepsilon'/2$ 都落在 $(0,1)$ 内）。由 (P) 得某 $N$，当 $n \\ge N$ 时 $|x_n - a| \\le 2\\varepsilon \\le 2 \\cdot \\dfrac{\\varepsilon'}{2} = \\varepsilon'$。由 $\\varepsilon'$ 的任意性，$x_n \\to a$，(P) 是充分条件。"
    },
    {
     "title": "第四步：下结论",
     "content": "两个方向都成立，所以 (P) 既充分又必要，即 $\\{x_n\\}$ 收敛于 $a$ 的充分必要条件，选 D。核心认识是：把误差上界由 $\\varepsilon$ 换成 $2\\varepsilon$、把 $\\varepsilon$ 的取值范围由 $(0,+\\infty)$ 缩小为 $(0,1)$，都只是对正数作常数倍缩放与限制在有限区间内取值，而 $2\\varepsilon$ 当 $\\varepsilon \\in (0,1)$ 时仍能取遍 $(0,2)$ 中的一切值，覆盖了“任意小的正数”，因此定义的效力完全没有减弱。"
    }
   ],
   "optionNotes": [
    {
     "key": "A",
     "note": "为什么会选到 A：看到陈述里 $\\varepsilon$ 被限制在 $(0,1)$、误差被放宽到 $2\\varepsilon$，就直觉认为它比标准定义“弱”，只能由收敛推出、不能推出收敛，于是判为必要而不充分。而实际上这种“弱”只是表面上的：任给 $\\varepsilon' > 0$，取 $\\varepsilon = \\min\\{\\varepsilon'/2,\\ 1/2\\}$ 就能把 $2\\varepsilon \\le \\varepsilon'$ 追回来，误差仍可任意小，所以充分性同样成立。"
    },
    {
     "key": "B",
     "note": "为什么会选到 B：注意到了 $2\\varepsilon$ 可以“换算”成任意小，就以为该陈述比标准定义更容易满足、能推出收敛；却忽略了收敛数列本身就满足它——对任意 $\\varepsilon \\in (0,1)$ 直接用标准定义即可得 $|x_n - a| < \\varepsilon \\le 2\\varepsilon$。把显然成立的必要性方向漏掉了。"
    },
    {
     "key": "C",
     "note": "为什么会选到 C：认为 $\\varepsilon$ 限定在 $(0,1)$ 破坏了“任意小”、$2\\varepsilon$ 又破坏了“误差可控”，两头都不成立，于是草率判为既非充分又非必要。而实际上该陈述与标准定义严格等价，两个方向都成立，属于对 $\\varepsilon\\text{-}N$ 定义中“常数倍缩放不影响极限”这一基本事实不熟悉。"
    },
    {
     "key": "D",
     "note": "正确选项。关键判断：$\\varepsilon \\in (0,1)$ 与 $\\le 2\\varepsilon$ 都只是常数级别的限制与缩放，等价于标准定义，故为充分必要条件。"
    }
   ],
   "pitfalls": "最典型的错误是把 $\\varepsilon \\in (0,1)$ 和 $\\le 2\\varepsilon$ 当成对标准 $\\varepsilon\\text{-}N$ 定义的“实质削弱”，从而漏判某一个方向。要牢记：极限定义中 $\\varepsilon$ 只起“任意小正数”的作用，把 $\\varepsilon$ 换成 $c\\varepsilon$（$c$ 为非零常数）或只对足够小的 $\\varepsilon$ 作要求，都不改变定义；判断时必须老老实实把两个方向各推一遍，而不是凭“看起来更弱”下结论。另一个易错点是把 $\\le$ 与 $<$ 的区别当成关键——在极限定义中二者可以互相推出，不影响结论。",
   "selfReasoning": ""
  },
  "T2-08": {
   "verdict": "ok",
   "selfAnswer": "D",
   "officialAnswer": "D",
   "transcriptionIssues": [],
   "keyIdea": "识别 $\\frac{0}{0}$ 型未定式，抓住分子 $4-x^2$ 与分母 $x-2$ 含有公因子 $(x-2)$，约去零因子后再代入求极限。",
   "steps": [
    {
     "title": "第一步：代入试探，判断类型",
     "content": "先直接把 $x=2$ 代入：分子 $4-2^2=0$，分母 $2-2=0$，得到 $\\frac{0}{0}$。这说明 $x=2$ 同时是分子与分母的零点，属于 $\\frac{0}{0}$ 型未定式，因此极限值不能靠直接代入确定，必须先把零因子约掉。这一步是识别的关键：看到 $\\frac{0}{0}$ 就应想到『分子分母有公因子』。"
    },
    {
     "title": "第二步：分解出零因子并约分",
     "content": "把分子因式分解：$4-x^2=(2-x)(2+x)=-(x-2)(x+2)$。注意 $-(x-2)=2-x$，这个负号是本题最容易丢的地方。由于极限过程 $x\\to 2$ 始终要求 $x\\neq 2$，所以 $x-2\\neq 0$，可以合法约去公因子：$\\frac{4-x^2}{x-2}=\\frac{-(x-2)(x+2)}{x-2}=-(x+2)$。约分的合法性正来自极限定义中 $x\\ne 2$ 这一要求，这也是『约零因子法』的理论依据。"
    },
    {
     "title": "第三步：代入约分后的式子得极限",
     "content": "约分后得到的 $-(x+2)$ 在 $x=2$ 处是连续的多项式，可以直接代入：$\\lim\\limits_{x\\to 2}\\frac{4-x^2}{x-2}=\\lim\\limits_{x\\to 2}\\bigl(-(x+2)\\bigr)=-(2+2)=-4$。所以正确答案是 D。（用洛必达法则也能得到同一结果：$\\frac{-2x}{1}\\big|_{x=2}=-4$。）"
    }
   ],
   "optionNotes": [
    {
     "key": "A",
     "note": "选 A 的人得到 $-2$，通常是约分后把 $-(x+2)$ 里的常数项漏掉：只算了 $-x$ 再代入 $x=2$ 得 $-2$，忘记了还要减去 $2$。另一种来路是用洛必达法则时把 $(4-x^2)'$ 错求成 $-2$（漏掉求导产生的因子 $x$），于是 $\\frac{-2}{1}=-2$。实际上 $-(x+2)\\big|_{x=2}=-(2+2)=-4$。"
    },
    {
     "key": "B",
     "note": "选 B 的人得到 $-1$，属于符号与系数双重出错：约分得 $-(x+2)$ 后，或把 $x$ 代成 $1$，或在洛必达时既写成 $-2x$ 又额外除以了一个 $2$（误以为分母 $x-2$ 的导数是 $2$ 而不是 $1$），把系数 $2$ 重复算了一次。正确做法是分母 $(x-2)'=1$，导数式为 $\\frac{-2x}{1}$，代入得 $-4$。"
    },
    {
     "key": "C",
     "note": "选 C 的人把 $x=2$ 直接代入得 $\\frac{0}{0}$ 后就断言极限为 $0$，误认为『分子是 $0$ 所以极限是 $0$』。但 $\\frac{0}{0}$ 是未定式，本身不含信息：分子分母同时趋于 $0$ 时，极限取决于两个无穷小的阶数之比，必须约去零因子后才能定值。若能约出有限的非零结果（本题为 $-4$），极限就不是 $0$。"
    }
   ],
   "pitfalls": "最典型的错误是把 $\\frac{0}{0}$ 当成 $0$ 而直接选 C，没有意识到 $x=2$ 是可去间断点、需要先约去零因子；其次是因式分解时丢掉 $4-x^2=-(x-2)(x+2)$ 中的负号，把结果算成 $4$ 或符号反复出错，从而落到 A、B 这类由系数/符号错误产生的选项上。",
   "selfReasoning": ""
  },
  "T2-09": {
   "verdict": "ok",
   "selfAnswer": "A",
   "officialAnswer": "A",
   "transcriptionIssues": [
    {
     "field": "src",
     "inRecord": "Test2/Test2-9.jpg",
     "inImage": "Test2/Test2/Test2-9.jpg"
    },
    {
     "field": "options",
     "inRecord": "[{\"key\":\"A\",\"latex\":\"2\"},{\"key\":\"B\",\"latex\":\"4\"},{\"key\":\"C\",\"latex\":\"1\"},{\"key\":\"D\",\"latex\":\"3\"}]",
     "inImage": "顺序为 A. 2、B. 4、C. 1、D. 3（按 2、4、1、3 排列，非单调递增）"
    }
   ],
   "keyIdea": "无穷小比较题的通用特征是三个无穷小被同一个不等号链串起来：先取每个无穷小的主部（确定阶数），再把『高阶』翻译成阶数的不等式，用双向夹逼定出整数 $n$。",
   "steps": [
    {
     "title": "第一步：把『高阶』翻译成阶数的语言",
     "content": "题目说 $(1-\\cos x)\\ln(1+x^2)$ 是比 $x\\sin x^{n}$ 高阶的无穷小，而 $x\\sin x^{n}$ 又是比 $(e^{x^2}-1)$ 高阶的无穷小。高阶意味着『趋于 $0$ 更快』，即阶数更大。所以本题不需要真的计算任何极限值，只要分别定出三个无穷小的阶，再把两个『高阶』条件写成阶数的不等式即可。这是无穷小比较题最省力的入手方式：先定阶，再比较。"
    },
    {
     "title": "第二步：用等价无穷小取主部，定出三个阶",
     "content": "利用 $1-\\cos x\\sim\\frac{x^2}{2}$、$\\ln(1+u)\\sim u$（即 $\\ln(1+x^2)\\sim x^2$）、$\\sin u\\sim u$（即 $\\sin x^{n}\\sim x^{n}$）、$e^{u}-1\\sim u$（即 $e^{x^2}-1\\sim x^2$），可得三个无穷小的主部：$(1-\\cos x)\\ln(1+x^2)\\sim\\frac{1}{2}x^2\\cdot x^2=\\frac{1}{2}x^4$，阶为 $4$；$x\\sin x^{n}\\sim x\\cdot x^{n}=x^{n+1}$，阶为 $n+1$；$(e^{x^2}-1)\\sim x^2$，阶为 $2$。无穷小之间的高阶关系只由主部决定，常数系数如 $\\frac{1}{2}$ 不影响阶的高低，可放心略去。"
    },
    {
     "title": "第三步：把两个高阶条件写成不等式并双向夹逼",
     "content": "『$\\frac{1}{2}x^4$ 比 $x^{n+1}$ 高阶』即 $4>n+1$，得 $n<3$，也就是 $n\\le 2$；『$x^{n+1}$ 比 $x^2$ 高阶』即 $n+1>2$，得 $n>1$，也就是 $n\\ge 2$。两个条件必须同时成立，于是 $n=2$ 被唯一确定，对应选项 A。这里的关键体会是：每个『高阶』只给出一侧的不等式，单独用任何一个都得不到唯一解，必须让两个条件共同夹出 $n$。"
    }
   ],
   "optionNotes": [
    {
     "key": "B",
     "note": "选 B 的人取 $n=4$，只用了『$x\\sin x^{n}$ 比 $e^{x^2}-1$ 高阶』这一侧的条件，看到阶数越大越好就直接挑了最大的 $4$。但此时 $x^{n+1}=x^5$ 已比 $\\frac{1}{2}x^4$ 更高阶，等于说 $(1-\\cos x)\\ln(1+x^2)$ 反而是低阶的那个，与题设第一个条件矛盾。多条件题必须同时满足所有条件，不能只挑一个条件做。"
    },
    {
     "key": "C",
     "note": "选 C 的人取 $n=1$，使 $x\\sin x^{n}\\sim x^2$，恰好与 $(e^{x^2}-1)\\sim x^2$ 同阶，于是第二个『高阶』条件不成立（同阶而非高阶）。这类错误的根源是把『高阶』误读为『不低于』，或者干脆漏看了后半个条件，只验证了『$\\frac{1}{2}x^4$ 比 $x^2$ 高阶』就下了结论；而 $n=1$ 恰恰只满足 $n<3$，不满足 $n>1$。"
    },
    {
     "key": "D",
     "note": "选 D 的人取 $n=3$，很可能是把 $4>n+1$ 中的不等号方向弄反，误算成 $n>3$ 或 $n\\ge 3$，再与 $n>1$ 合并取最小整数 $3$。实际上 $n=3$ 时 $x\\sin x^{n}\\sim x^4$ 与 $(1-\\cos x)\\ln(1+x^2)\\sim\\frac{1}{2}x^4$ 同阶，第一个条件不成立。等价无穷小相乘时指数是相加而非相乘（$x\\cdot x^{n}=x^{n+1}$），把阶误记成 $n$ 或 $2n$ 也会把人推向 $3$ 或 $4$。"
    }
   ],
   "pitfalls": "最典型的错误是只使用不等号链中的一侧条件：要么只满足『$x\\sin x^{n}$ 比 $e^{x^2}-1$ 高阶』而挑最大的 $n=4$（选 B），要么只满足『$(1-\\cos x)\\ln(1+x^2)$ 比 $x\\sin x^{n}$ 高阶』而挑较小的 $n=1$ 或 $3$（选 C、D）。其次是主部计算失误：漏掉 $(1-\\cos x)\\sim\\frac{x^2}{2}$ 中的 $x^2$ 只留系数，或把 $x\\sin x^{n}$ 的阶错算成 $n$ 甚至 $2n$（等价无穷小相乘时指数应相加）。正确做法是先定出三个阶 $4$、$n+1$、$2$，再让 $2<n+1<4$ 同时约束，夹出唯一的整数 $n=2$。",
   "selfReasoning": ""
  },
  "T2-10": {
   "verdict": "ok",
   "selfAnswer": "B",
   "officialAnswer": "B",
   "transcriptionIssues": [],
   "keyIdea": "这是一道 $\\frac{0}{0}$ 型极限题，关键在于先判断阶数：分子是 $x^2$ 阶无穷小，分母的一次项因 $3-2-1=0$ 完全抵消、也是 $x^2$ 阶。分子用 $(1+u)^{\\alpha}-1\\sim\\alpha u$，分母先因式分解成 $(e^{x}-1)(e^{2x}-1)$ 再用 $e^{u}-1\\sim u$，同阶相比得 $-\\frac{1}{6}$。",
   "steps": [
    {
     "title": "第一步：判断类型，先估阶数",
     "content": "把 $x\\to 0$ 代入：分子 $\\sqrt[3]{(1-0)(1+0)}-1=1-1=0$，分母 $e^{0}-e^{0}-e^{0}+1=1-1-1+1=0$，故为 $\\frac{0}{0}$ 型未定式，可用等价无穷小替换或洛必达法则。但要先想清楚一件事：只有当分子与分母是 $x$ 的同阶无穷小时，比值才是有限非零的数，所以必须先估出两者各是几阶，才知道该展开到哪一项。"
    },
    {
     "title": "第二步：把分子化成 $(1+u)^{\\alpha}-1$ 的标准形式",
     "content": "先用平方差把根号内合并：$(1-x)(1+x)=1-x^2$，所以分子 $=(1-x^2)^{\\frac{1}{3}}-1$。这就是 $x\\to 0$ 时 $(1+u)^{\\alpha}-1\\sim\\alpha u$ 的标准形式，其中 $u=-x^2\\to 0$、$\\alpha=\\frac{1}{3}$，于是 $\\sqrt[3]{(1-x)(1+x)}-1\\sim\\frac{1}{3}\\cdot(-x^2)=-\\frac{x^2}{3}$。这里有两个要点：一是 $u=-x^2$ 带来的负号不能丢；二是分子其实是 $x^2$ 阶而非 $x$ 阶，这就预告了分母也必须保留到 $x^2$ 项才有非零极限。"
    },
    {
     "title": "第三步：分母先因式分解，再把每个因子替换",
     "content": "分母是加减形式，不能对各项随便做等价替换，要先把乘积因子分出来：$e^{3x}-e^{2x}-e^{x}+1=(e^{3x}-e^{2x})-(e^{x}-1)=e^{2x}(e^{x}-1)-(e^{x}-1)=(e^{x}-1)(e^{2x}-1)$。现在两个因子都是标准形式，用 $e^{u}-1\\sim u$ 得 $e^{x}-1\\sim x$、$e^{2x}-1\\sim 2x$，相乘即得分母 $\\sim x\\cdot 2x=2x^2$。若用泰勒展开交叉验证：常数项 $1-1-1+1=0$、一次项 $3x-2x-x=0$ 全部抵消，二次项 $\\frac{9}{2}-2-\\frac{1}{2}=2$，同样得到 $2x^2$——可见分母是一阶项被抵消掉之后的二阶无穷小。"
    },
    {
     "title": "第四步：同阶相比，代入求值",
     "content": "分子分母都是 $x^2$ 阶无穷小，比值存在且有限非零：$\\lim_{x\\to 0}\\frac{\\sqrt[3]{(1-x)(1+x)}-1}{e^{3x}-e^{2x}-e^{x}+1}=\\frac{-\\frac{1}{3}x^2}{2x^2}=-\\frac{1}{3}\\cdot\\frac{1}{2}=-\\frac{1}{6}$。故答案为 B。"
    }
   ],
   "optionNotes": [
    {
     "key": "A",
     "note": "选了 $-\\frac{1}{5}$：负号识别对了，纯粹是系数算错。常见成因是等价无穷小系数记混（把 $(1+u)^{\\alpha}-1\\sim\\alpha u$ 中的 $\\alpha$ 当成 $\\frac{1}{5}$），或对分母求导/展开时把二次项系数从 $2$ 误算成 $\\frac{5}{3}$，于是得到 $\\frac{-1/3}{5/3}=-\\frac{1}{5}$。要避免它，就得把分子分母的系数各自独立地算两遍。"
    },
    {
     "key": "C",
     "note": "选了 $\\frac{1}{6}$：系数 $\\frac{1}{3}$ 与 $2$ 都算对了，唯一的问题是漏掉分子的负号——把 $(1-x^2)^{\\frac{1}{3}}-1$ 直接写成 $\\sim\\frac{1}{3}x^2$，忘记了标准公式里的 $u=-x^2$。这是本题出现频率最高的失分点，只差一个符号。"
    },
    {
     "key": "D",
     "note": "选了 $\\frac{1}{5}$：负号与系数两处错误同时发生——分子漏掉 $u=-x^2$ 的负号，分母的二次项系数又记错成 $\\frac{5}{3}$，于是 $\\frac{1/3}{5/3}=\\frac{1}{5}$。它说明做题时既没有检查符号，也没有用泰勒展开把系数单独验证一遍。"
    }
   ],
   "pitfalls": "最典型的错误是把分子替换成 $\\frac{1}{3}x^2$ 而漏掉 $u=-x^2$ 的负号，从而错选 C。其次是看到分母 $e^{3x}-e^{2x}-e^{x}+1$ 就默认它是一阶无穷小，忘了 $3-2-1=0$ 使一次项完全抵消，分母实际上是 $x^2$ 阶。还要牢记：等价无穷小替换一般只能用于乘除因子，不能对加减项逐项替换——分子要先合并成 $(1+u)^{\\frac{1}{3}}-1$，分母要先因式分解成 $(e^{x}-1)(e^{2x}-1)$，替换才合法。",
   "selfReasoning": ""
  },
  "T3-01": {
   "verdict": "ok",
   "selfAnswer": "D",
   "officialAnswer": "D",
   "transcriptionIssues": [],
   "keyIdea": "极限 $\\lim\\limits_{x\\to a}f(x)$ 只由 $a$ 的**去心邻域** $0<|x-a|<\\delta$ 内的取值决定，$f(a)$ 是否存在、等于多少都不参与极限，所以\"在一点有定义\"与\"在该点有极限\"互不决定，是无关条件。",
   "steps": [
    {
     "title": "第一步：判断类型——把两个命题的确切含义分别写清楚",
     "content": "\"函数在一点 $a$ 有定义\"指的是 $f(a)$ 是一个确定的数；\"函数在该点有极限\"指的是 $\\lim\\limits_{x\\to a}f(x)=A$ 存在，其定义要求 $f$ 在 $a$ 的某个去心邻域 $0<|x-a|<\\delta$ 内有定义，且该去心邻域内所有函数值都一致地趋于同一个常数 $A$。两个定义考察的对象完全不同：前者只盯着 $a$ **这一点**，后者只盯着 $a$ **周围但不含 $a$** 的取值。因此按定义就可以预判二者互不蕴含，接下来只需各举一个反例来确认。这是判断\"充分/必要/无关条件\"类问题的通用步骤：先明确命题，再分别检验两个方向。"
    },
    {
     "title": "第二步：检验充分性——有定义能否推出有极限？",
     "content": "要否定\"$f$ 在 $a$ 有定义 $\\Rightarrow$ $f$ 在 $a$ 有极限\"，只需构造一个在 $a$ 有定义却没有极限的例子。取 $f(x)=\\sin\\frac{1}{x}\\ (x\\neq 0)$，并令 $f(0)=0$。此时 $f$ 在 $x=0$ 有定义，但当 $x\\to 0$ 时 $\\frac{1}{x}\\to\\infty$，$\\sin\\frac{1}{x}$ 在 $[-1,1]$ 内无限次振荡，例如沿 $x_k=\\frac{1}{2k\\pi+\\frac{\\pi}{2}}$ 得 $f(x_k)=1$，沿 $y_k=\\frac{1}{2k\\pi}$ 得 $f(y_k)=0$，两列点都趋于 $0$ 但函数值趋于不同的数，极限不存在。故\"有定义\"不是充分条件，A 错误。"
    },
    {
     "title": "第三步：检验必要性——有极限能否推出有定义？",
     "content": "再否定\"$f$ 在 $a$ 有极限 $\\Rightarrow$ $f$ 在 $a$ 有定义\"。取 $f(x)=\\frac{x^{2}-1}{x-1}$，它在 $x=1$ 处无定义，但当 $x\\to 1$ 时 $f(x)=x+1\\to 2$，极限存在。可见极限只要求函数在去心邻域 $0<|x-1|<\\delta$ 内有定义就够了，$a$ 点本身无定义完全不妨碍极限存在，故\"有定义\"不是必要条件，B 错误。两个方向都不成立，\"充分必要条件\"更无从谈起，C 也错误；符合的表述正是 D\"无关条件\"（即既非充分条件也非必要条件）。"
    }
   ],
   "optionNotes": [
    {
     "key": "A",
     "note": "选 A 的人把\"函数在 $a$ 有定义\"当成极限存在的保证。错在忽略了极限要求去心邻域内**所有**函数值一致趋近同一个数，仅仅在 $a$ 点有定义说明不了任何趋近行为。反例：$f(x)=\\sin\\frac{1}{x}\\,(x\\neq 0)$，$f(0)=0$，在 $0$ 点有定义，但 $x\\to 0$ 时函数在 $[-1,1]$ 内无限振荡，极限不存在。"
    },
    {
     "key": "B",
     "note": "选 B 的人（最常见的错误）凭\"要谈极限，函数总得在该点有定义吧\"的直觉。实际上极限定义中出现的条件是 $0<|x-a|<\\delta$，是**去心**邻域，$f(a)$ 是否存在于极限毫无影响。反例：$f(x)=\\frac{x^{2}-1}{x-1}$ 在 $x=1$ 无定义，但 $\\lim\\limits_{x\\to 1}f(x)=2$ 存在，说明\"有定义\"不是必要条件。"
    },
    {
     "key": "C",
     "note": "选 C 的人把\"有定义\"与\"有极限\"错误地当成等价命题。既然已由 $f(x)=\\sin\\frac{1}{x},\\,f(0)=0$ 说明有定义未必有极限（不充分），又由 $f(x)=\\frac{x^{2}-1}{x-1}$ 说明有极限未必有定义（不必要），两个方向都被反例推翻，充分必要自然不成立。"
    }
   ],
   "pitfalls": "最典型的错误是把\"函数在某点有定义\"与\"函数在该点有极限\"混为一谈：要么以为有定义就必有极限（选 A），要么以为有极限就必须先有定义（选 B）。根源是没有抓住极限定义里的关键限定词\"去心邻域 $0<|x-a|<\\delta$\"——极限刻画的是 $a$ 附近函数值的整体趋势，$f(a)$ 本身（乃至它是否存在）完全不参与其中，这与\"可去间断点处极限存在但函数值不等或不存在\"是同一个道理。",
   "selfReasoning": ""
  },
  "T3-02": {
   "verdict": "ok",
   "selfAnswer": "D",
   "officialAnswer": "D",
   "transcriptionIssues": [],
   "keyIdea": "先用 $|x|$ 与 $1$ 的大小关系对含 $x^{4n}$ 的极限分段求出 $f(x)$ 的表达式，再用“左右极限存在且相等”这一可去间断点的判别标准逐点判断：$x=\\pm 1$ 处左右极限分别为 $1$ 与 $-1$，都是跳跃间断点，故可去间断点为 $0$ 个。",
   "steps": [
    {
     "title": "第一步：识别题型——含参数的极限定义函数",
     "content": "题干中的 $f(x)$ 是由 $\\lim\\limits_{n \\to \\infty}$ 定义出来的，极限变量是 $n$ 而不是 $x$。对每一个固定的 $x$，$x^{4n}$ 的极限行为完全由 $|x|$ 与 $1$ 的大小关系决定：$|x|<1$ 时它趋于 $0$，$|x|>1$ 时它趋于 $+\\infty$，$|x|=1$ 时它恒等于 $1$。所以必须按 $|x|<1$、$|x|=1$、$|x|>1$ 三种情形分别把极限算出来，先得到 $f(x)$ 的初等（分段）表达式，才谈得上找它的间断点。这就是这类“极限定义函数”题的固定套路：先对 $n$ 取极限化成分段函数，再讨论连续性。"
    },
    {
     "title": "第二步：求出 $f(x)$ 的分段表达式",
     "content": "当 $|x|<1$ 时 $x^{4n} \\to 0$，于是 $\\dfrac{1-x^{4n}}{1+x^{4n}} \\to \\dfrac{1-0}{1+0}=1$，得 $f(x)=x$。当 $|x|>1$ 时 $x^{4n} \\to +\\infty$，把分子分母同除以 $x^{4n}$ 得 $\\dfrac{x^{-4n}-1}{x^{-4n}+1} \\to \\dfrac{0-1}{0+1}=-1$，得 $f(x)=-x$。当 $x=\\pm 1$ 时 $x^{4n}=1$ 对一切 $n$ 成立，分式恒为 $\\dfrac{1-1}{1+1}=0$，故 $f(1)=f(-1)=0$。即 $f(x)=\\begin{cases} x, & |x|<1 \\\\ 0, & x=\\pm 1 \\\\ -x, & |x|>1 \\end{cases}$。又因为分母 $1+x^{4n} \\ge 1 > 0$ 恒不为零，$f$ 在 $\\mathbb{R}$ 上处处有定义，所以可能的间断点只可能是两个分段点 $x=1$ 与 $x=-1$。"
    },
    {
     "title": "第三步：逐点判断间断点的类型",
     "content": "在 $x=1$ 处：左极限 $\\lim\\limits_{x \\to 1^{-}} f(x)=\\lim\\limits_{x \\to 1^{-}} x=1$，右极限 $\\lim\\limits_{x \\to 1^{+}} f(x)=\\lim\\limits_{x \\to 1^{+}} (-x)=-1$，左右极限都存在但不相等，故 $x=1$ 是跳跃间断点。在 $x=-1$ 处：左侧 $x<-1$ 时 $|x|>1$，用 $f(x)=-x$，得 $\\lim\\limits_{x \\to -1^{-}} f(x)=1$；右侧 $-1<x<1$ 时 $|x|<1$，用 $f(x)=x$，得 $\\lim\\limits_{x \\to -1^{+}} f(x)=-1$，左右极限同样存在但不相等，也是跳跃间断点。除 $x=\\pm 1$ 外，每一点附近 $f$ 都由同一个初等表达式给出，与函数值一致，故处处连续。"
    },
    {
     "title": "第四步：统计可去间断点的个数",
     "content": "可去间断点的判别标准是：$\\lim\\limits_{x \\to x_0} f(x)$ 存在（为有限数），只是它不等于 $f(x_0)$，或者 $f$ 在 $x_0$ 处无定义。本题中 $x=\\pm 1$ 处虽然函数值 $f(\\pm 1)=0$ 与两侧分支的值 $\\pm 1$ 都不相等，看起来很“像”可去间断点，但它们的左、右极限本身就不相等，极限根本不存在，只能算跳跃间断点。因此可去间断点的个数为 $0$，选 D。"
    }
   ],
   "optionNotes": [
    {
     "key": "A",
     "note": "为什么会选 A：只检查了 $x=1$（或只检查了 $x=-1$）一处就下结论，漏掉了另一个分段点；更常见的是把 $x \\to -1^{-}$ 时 $|x|>1$ 误判成 $|x|<1$，于是以为 $x=-1$ 处左右极限都是 $-1$、极限存在，从而把它当成可去间断点，个数被算成 1。实际上 $x=1$ 与 $x=-1$ 处左右极限分别是 $1$ 与 $-1$，两点都是跳跃间断点，可去间断点一个也没有。"
    },
    {
     "key": "B",
     "note": "为什么会选 B：把 $x=-1$、$x=0$、$x=1$ 三个点不加验证地一律当成可疑间断点，多算了 $x=0$。但 $x=0$ 处 $|x|<1$，$f(x)=x$，有 $\\lim\\limits_{x \\to 0} f(x)=0=f(0)$，它是连续点；而 $\\pm 1$ 又都不是可去间断点。既数错了对象，又用错了判别标准，才得到 3。"
    },
    {
     "key": "C",
     "note": "为什么会选 C：看到 $f(1)=f(-1)=0$ 与两侧分支在 $x=\\pm 1$ 附近的取值 $\\pm 1$ 不相等，就直接套用“函数值与极限值不等 $\\Rightarrow$ 可去间断点”，数出 2 个。这正是本题最典型的陷阱：可去间断点首先要求左右极限存在且相等。而在 $x=1$ 处左极限为 $1$、右极限为 $-1$，在 $x=-1$ 处左极限为 $1$、右极限为 $-1$，左右极限不相等意味着极限不存在，它们是跳跃间断点，可去间断点个数应为 $0$。"
    }
   ],
   "pitfalls": "最典型的错误是只比较“函数值与该点极限值是否相等”，而忽略了可去间断点的前提——左右极限存在且相等。在 $x=\\pm 1$ 处，两侧极限一个为 $1$、一个为 $-1$，极限根本不存在，属于跳跃间断点，所以可去间断点个数是 $0$ 而不是 $2$。另一个常见疏漏是漏掉 $x=-1$ 处（或误判 $|x|$ 与 $1$ 的大小关系），把个数算成 1。",
   "selfReasoning": ""
  },
  "T3-03": {
   "verdict": "ok",
   "selfAnswer": "A",
   "officialAnswer": "A",
   "transcriptionIssues": [],
   "keyIdea": "分段函数在分界点连续，必须满足「左极限 = 右极限 = 该点函数值」，而分界点处的极限靠等价无穷小代换快速算出。",
   "steps": [
    {
     "title": "第一步：把「连续」翻译成极限等式",
     "content": "因为 $x=0$ 是分段点，且左侧用 $ae^{4x}$、右侧用 $\\dfrac{1-e^{\\tan x}}{\\arcsin 2x}$，所以连续性要求在 $x=0$ 处两侧极限存在且相等，并且都等于 $f(0)$。由定义 $f(0)=a e^{4\\cdot 0}=a$，因此关键是算出右极限 $\\lim\\limits_{x\\to 0^{+}}\\dfrac{1-e^{\\tan x}}{\\arcsin 2x}$，令它等于 $a$ 即可求出 $a$。"
    },
    {
     "title": "第二步：用等价无穷小处理 $\\frac{0}{0}$ 型右极限",
     "content": "$x\\to 0^{+}$ 时 $\\tan x\\to 0$，分子分母都趋于 $0$，是 $\\frac{0}{0}$ 型。此时 $\\tan x\\sim x$，故 $1-e^{\\tan x}\\sim -\\tan x\\sim -x$（用的是 $e^{u}-1\\sim u$，即 $1-e^{u}\\sim -u$）；又 $\\arcsin 2x\\sim 2x$。替换后 $\\dfrac{1-e^{\\tan x}}{\\arcsin 2x}\\to \\dfrac{-x}{2x}=-\\dfrac{1}{2}$。之所以可以这样替换，是因为分子分母的等价量之比极限为 $1$，等价无穷小因子在乘除结构中可直接代换。"
    },
    {
     "title": "第三步：比较左右极限，解出 $a$",
     "content": "左极限为 $\\lim\\limits_{x\\to 0^{-}} ae^{4x}=a$（$e^{4x}$ 连续，$e^{0}=1$），右极限为 $-\\dfrac{1}{2}$。由连续性要求 $a=-\\dfrac{1}{2}$，对应选项 A。"
    }
   ],
   "optionNotes": [
    {
     "key": "B",
     "note": "选 B 的人只做对了分母 $\\arcsin 2x\\sim 2x$，却漏掉分子里的负号，把 $1-e^{\\tan x}$ 当成 $+\\tan x\\sim x$，于是算出 $\\frac{1}{2}$。注意 $1-e^{u}\\sim -u$：$u>0$ 时 $e^{u}>1$，分子为负。"
    },
    {
     "key": "C",
     "note": "选 C 的人把 $\\arcsin 2x\\sim 2x$ 中的系数 $2$ 当成分子分母同时出现而约掉，或误写成 $\\arcsin 2x\\sim x$，得到 $-\\frac{x}{x}=-1$。"
    },
    {
     "key": "D",
     "note": "选 D 的人既丢了负号又丢了分母的 $2$（把 $\\arcsin 2x\\sim x$ 且 $1-e^{\\tan x}\\sim x$），得到 $1$；也有人在解 $a$ 时忽略了右侧函数值 $f(0)=ae^{0}=a$ 与右极限的对应关系，直接把极限值取了绝对值。"
    }
   ],
   "pitfalls": "典型错误有二：一是对 $1-e^{\\tan x}$ 的符号处理，误用 $1-e^{u}\\sim u$（应为 $-u$）；二是对 $\\arcsin 2x$ 只记住 $\\arcsin u\\sim u$ 却漏掉内层的系数 $2$，导致分母少了一个因子 $2$。此外，连续条件必须写成「左极限 $=$ 右极限 $=f(0)$」，$f(0)$ 由 $x\\le 0$ 的分支给出，不要误用右侧表达式。",
   "selfReasoning": "独立求解：$f(0)=ae^{4\\cdot0}=a$；右极限 $\\lim_{x\\to0^{+}}\\frac{1-e^{\\tan x}}{\\arcsin 2x}=\\frac{-\\tan x}{2x}\\to-\\frac12$；左极限 $\\lim_{x\\to0^{-}}ae^{4x}=a$。连续性给出 $a=-\\frac12$，即 A，与官方答案 A 一致。"
  },
  "T3-04": {
   "verdict": "ok",
   "selfAnswer": "D",
   "officialAnswer": "D",
   "transcriptionIssues": [],
   "keyIdea": "分子是振荡的有界量、分母趋于无穷大（即整体含无穷小因子 $\\frac{1}{x^2}$），用『有界量乘无穷小仍为无穷小』直接得极限为 $0$，不要被 $\\sin x$ 的振荡误导为『不存在』。",
   "steps": [
    {
     "title": "第一步：判断类型——识别『有界量乘无穷小』结构",
     "content": "把所求极限拆成两个因子的乘积：$\\lim\\limits_{x \\to \\infty} \\frac{3\\sin x}{x^2} = \\lim\\limits_{x \\to \\infty} \\left(3\\sin x\\right) \\cdot \\frac{1}{x^2}$。这里第一个因子 $3\\sin x$ 只随 $x$ 在 $[-3,3]$ 内来回振荡，它的值被『锁住』不会跑向无穷；第二个因子 $\\frac{1}{x^2}$ 在 $x \\to \\infty$ 时趋于 $0$。之所以要先做这一步判断，是因为 $\\sin x$ 当 $x \\to \\infty$ 时本身没有极限，若直接对分子用极限运算法则（乘积的极限等于极限的乘积）会失效——必须换成『有界 × 无穷小』这条专门结论。"
    },
    {
     "title": "第二步：用有界量乘无穷小定理（或夹逼）给出结论",
     "content": "对一切 $x \\neq 0$ 有 $|3\\sin x| \\le 3$，于是 $0 \\le \\left|\\frac{3\\sin x}{x^2}\\right| \\le \\frac{3}{x^2}$。当 $x \\to \\infty$ 时 $\\frac{3}{x^2} \\to 0$，由夹逼准则得 $\\left|\\frac{3\\sin x}{x^2}\\right| \\to 0$，即 $\\frac{3\\sin x}{x^2} \\to 0$。这一步的实质是有界量乘无穷小仍是无穷小：无穷小因子 $\\frac{1}{x^2}$ 起决定作用，把有界振荡『压』到 $0$，所以振荡得再剧烈也不影响极限存在。"
    },
    {
     "title": "第三步：比对选项，确认选 D",
     "content": "计算结果为 $0$，与选项 D 的 $0$ 一致。注意题干 $x \\to \\infty$ 表示 $x \\to +\\infty$ 与 $x \\to -\\infty$ 同时成立，而上述夹逼对两个方向都成立（$\\frac{3}{x^2}$ 是偶函数，两侧同样趋于 $0$），因此结论对 $x \\to \\infty$ 整体成立，不存在需要分单侧讨论的漏洞。"
    }
   ],
   "optionNotes": [
    {
     "key": "A",
     "note": "选 A 的人只看到『$\\sin x$ 在 $x \\to \\infty$ 时振荡、自身没有极限』，就把分子没有极限误当成整个分式极限不存在。错在忽略分母是更高阶的无穷大：分子的振荡幅度被 $\\frac{1}{x^2}$ 压制，$\\frac{3\\sin x}{x^2}$ 的振幅趋于 $0$，极限客观存在且为 $0$。『振荡』只在振幅不衰减时才导致极限不存在（如 $\\lim\\limits_{x \\to \\infty} \\sin x$）。"
    },
    {
     "key": "B",
     "note": "选 B 的人多是把 $\\sin x$ 的取值下界 $-1$ 拿出来，算成 $3 \\times (-1) = -3$ 再除以……却忘了 $\\frac{1}{x^2}$ 趋于 $0$，也可能与后面题型的 $\\lim\\limits_{x \\to 0} \\frac{\\sin x}{x} = 1$ 混淆而错误地『约掉』分母。正确做法是保留 $\\frac{1}{x^2}$ 这个无穷小因子，乘积为 $0$，$\\sin x$ 取到 $-1$ 的瞬间不影响整体极限。"
    },
    {
     "key": "C",
     "note": "选 C 的人犯了与 B 同向的错误：只看分子的系数 $3$（或代入 $\\sin x$ 的上界 $1$ 得 $3$），把分子可能取到的最大值当成了极限值。极限描述的是 $x \\to \\infty$ 时的整体趋势，而不是某一批点上的最大取值；$\\frac{3}{x^2} \\to 0$ 才是趋势所在。"
    }
   ],
   "pitfalls": "最典型的错误是看到 $\\sin x$ 当 $x \\to \\infty$ 无极限，就误判整个分式极限『不存在』（选 A）。根源是混淆了两件事：分子振荡本身不致命，致命的是振幅不衰减；本题分母 $x^2$ 提供了无穷小因子，振幅趋于 $0$，故极限存在且为 $0$。同时也要避免把 $\\sin x$ 的最值 $-1$、$1$ 直接当成极限值（误选 B、C）。",
   "selfReasoning": ""
  },
  "T3-05": {
   "verdict": "ok",
   "selfAnswer": "B",
   "officialAnswer": "B",
   "transcriptionIssues": [],
   "keyIdea": "分子 $\\tan x-\\sin x$ 是两个等价无穷小『相减』，不能各自替换成 $x$；必须先提取公因式（或通分）把它化成一个整体，看出它是三阶无穷小 $\\sim \\frac{x^{3}}{2}$，再与分母 $\\tan^{3}x \\sim x^{3}$ 同阶相比，得极限 $\\frac{1}{2}$。",
   "steps": [
    {
     "title": "第一步：判断类型，识破『相减无穷小』的陷阱",
     "content": "当 $x \\to 0$ 时 $\\tan x \\to 0$、$\\sin x \\to 0$，故分子 $\\tan x-\\sin x \\to 0$，分母 $\\tan^{3}x \\to 0$，这是 $\\frac{0}{0}$ 型未定式。识别特征是：分母是三次幂 $\\tan^{3}x$（三阶无穷小），而分子是两个同阶等价无穷小 $\\tan x \\sim x$、$\\sin x \\sim x$ 之差。正因为是『相减』，绝不能写成 $\\tan x-\\sin x \\sim x-x=0$：等价无穷小替换定理在加减法中一般失效，这里两个一阶项恰好抵消，真正决定大小的是它们展开中更高阶的项。这一步必须先定性，才能避免后面直接替换而丢阶。"
    },
    {
     "title": "第二步：恒等变形，把分子化成一个整体",
     "content": "利用 $\\tan x=\\frac{\\sin x}{\\cos x}$ 提取公因式：$\\tan x-\\sin x=\\sin x\\left(\\frac{1}{\\cos x}-1\\right)=\\frac{\\sin x\\,(1-\\cos x)}{\\cos x}$。代回原式并约分：$$\\frac{\\tan x-\\sin x}{\\tan^{3}x}=\\frac{\\sin x\\,(1-\\cos x)}{\\cos x}\\cdot\\frac{\\cos^{3}x}{\\sin^{3}x}=\\frac{(1-\\cos x)\\cos^{2}x}{\\sin^{2}x}.$$ 变形的意义在于：把『相减』改写成『相乘』后，分子分母都成了标准的、可以直接用等价无穷小替换的因子形式，替换定理就可以放心使用了。"
    },
    {
     "title": "第三步：用等价无穷小求值",
     "content": "对化简后的式子分段替换：$1-\\cos x \\sim \\frac{x^{2}}{2}$（二阶），$\\sin^{2}x \\sim x^{2}$（二阶），而 $\\cos^{2}x \\to 1$ 是极限为 $1$ 的因子，可直接取 $1$。于是 $$\\lim_{x \\to 0}\\frac{(1-\\cos x)\\cos^{2}x}{\\sin^{2}x}=\\lim_{x \\to 0}\\frac{\\frac{x^{2}}{2}\\cdot 1}{x^{2}}=\\frac{1}{2}.$$ 可以看到分子整体确实是三阶无穷小 $\\tan x-\\sin x \\sim \\frac{x^{3}}{2}$，与分母 $\\tan^{3}x \\sim x^{3}$ 同阶，故比值趋于非零常数，而不是 $0$ 或 $\\infty$。"
    },
    {
     "title": "第四步：用泰勒展开复核并比对选项",
     "content": "为确认无误，用展开复核：$\\tan x=x+\\frac{x^{3}}{3}+o(x^{3})$，$\\sin x=x-\\frac{x^{3}}{6}+o(x^{3})$，相减得 $\\tan x-\\sin x=\\frac{x^{3}}{2}+o(x^{3})$；又 $\\tan^{3}x \\sim x^{3}$。故原极限 $=\\frac{\\frac{x^{3}}{2}}{x^{3}}=\\frac{1}{2}$，与等价无穷小法一致。计算结果 $\\frac{1}{2}$ 对应选项 B。"
    }
   ],
   "optionNotes": [
    {
     "key": "A",
     "note": "选 A 的人把 $\\frac{0}{0}$ 型误当成『分母趋于 $0$、分子趋于非零常数』，或者只注意到分母是三阶无穷小就以为分母『小得多』，从而断定比值无界趋于 $\\infty$。实际上分子 $\\tan x-\\sin x \\sim \\frac{x^{3}}{2}$ 同样是三阶无穷小，分子分母同阶，比值是常数 $\\frac{1}{2}$，根本不发散。"
    },
    {
     "key": "C",
     "note": "选 C 的人通常是把 $1-\\cos x$ 的等价无穷小记成了 $x^{2}$（丢掉系数 $\\frac{1}{2}$），于是算出 $\\frac{x^{2}}{x^{2}}=1$。根源是只背了『$1-\\cos x$ 与 $x^{2}$ 同阶』而没记住精确系数：$\\cos x=1-\\frac{x^{2}}{2}+o(x^{2})$，所以 $1-\\cos x \\sim \\frac{x^{2}}{2}$，那个 $\\frac{1}{2}$ 正是本题的答案所在。"
    },
    {
     "key": "D",
     "note": "选 D 的人是系数弄反：把 $1-\\cos x \\sim \\frac{x^{2}}{2}$ 误记成 $1-\\cos x \\sim 2x^{2}$（或把 $\\cos x \\approx 1-\\frac{x^{2}}{2}$ 与 $\\cos 2x \\approx 1-2x^{2}$ 记混），于是得到 $2$。只要用 $\\cos x$ 的泰勒展开核对一下系数，或直接算 $\\lim\\limits_{x \\to 0}\\frac{1-\\cos x}{x^{2}}=\\frac{1}{2}$，就能排除这个结果。"
    }
   ],
   "pitfalls": "最典型的错误是在 $\\frac{0}{0}$ 型中把相减的无穷小各自替换：写 $\\tan x \\sim x$、$\\sin x \\sim x$，得 $\\tan x-\\sin x \\sim x-x=0$，于是把三阶无穷小整块丢掉，极限要么算成 $0$，要么因为『分母也趋于 $0$』而胡乱判成 $\\infty$。要牢记等价无穷小替换只在乘除因子中可以直接使用，遇到加减必须先提取公因式、通分或有理化，把式子化成乘积形式再替换（本题化到 $\\frac{(1-\\cos x)\\cos^{2}x}{\\sin^{2}x}$ 后才动手）。另一个高频错误是漏掉 $1-\\cos x \\sim \\frac{x^{2}}{2}$ 中的系数 $\\frac{1}{2}$，导致误选 C 或 D。",
   "selfReasoning": ""
  },
  "T3-06": {
   "verdict": "ok",
   "selfAnswer": "A",
   "officialAnswer": "A",
   "transcriptionIssues": [],
   "keyIdea": "识别 $1^{\\infty}$ 型幂指函数极限，先取对数把指数乘进底数，再把 $\\frac{1}{x}-\\frac{1}{x^{2}}$ 与 $x$ 相乘后分离出 $1+o(1)$。",
   "steps": [
    {
     "title": "第一步：判断类型，确定方法",
     "content": "当 $x \\to \\infty$ 时，底数 $1+\\frac{1}{x}-\\frac{1}{x^{2}} \\to 1$，指数 $x \\to \\infty$，所以这是 $1^{\\infty}$ 型未定式。$1^{\\infty}$ 型不能直接代入，也不能用四则运算法则（底数与指数都“不是有限数”），标准做法是先取对数，把幂指结构 $f(x)^{g(x)}$ 化为指数 $e^{g(x)\\ln f(x)}$，于是问题转化为求 $g(x)\\ln f(x)$ 的极限。"
    },
    {
     "title": "第二步：用 $\\ln(1+u)\\sim u$ 把对数降为代数式",
     "content": "记 $u=\\frac{1}{x}-\\frac{1}{x^{2}}$，则 $u\\to 0$，于是 $\\ln\\left(1+u\\right)\\sim u$。关键是先看清 $xu$ 的极限：$x\\left(\\frac{1}{x}-\\frac{1}{x^{2}}\\right)=1-\\frac{1}{x}\\to 1$（有限），这说明对数不能用“等价替换后得 $x\\cdot\\frac{1}{x}=1$ 再简单收尾”，而应写成 $xu=1-\\frac{1}{x}=1+o(1)$ 保留到常数项。"
    },
    {
     "title": "第三步：算出指数极限并还原",
     "content": "由 $\\ln f\\sim u$ 得 $x\\ln\\left(1+\\frac{1}{x}-\\frac{1}{x^{2}}\\right)=x\\left(\\frac{1}{x}-\\frac{1}{x^{2}}\\right)+o(1)=1-\\frac{1}{x}+o(1)\\to 1$。因此原式 $=e^{1}=e$，答案为 A。（也可验证 $+\\frac{1}{x^{2}}$ 版本：$x\\left(\\frac{1}{x}+\\frac{1}{x^{2}}\\right)\\to 1$，同样得到 $e$，说明二次项在乘 $x$ 后是 $O(1/x)$，不影响结论。）"
    }
   ],
   "optionNotes": [
    {
     "key": "B",
     "note": "为什么会选到 B（$-e$）：把 $\\ln(1+u)\\sim u$ 误当成 $u$ 是负的、从而指数极限为 $-1$。实际上 $u=\\frac{1}{x}-\\frac{1}{x^{2}}=\\frac{x-1}{x^{2}}$，当 $x\\to\\infty$ 时为正，且 $xu=1-\\frac{1}{x}\\to 1>0$，指数极限是 $+1$，所以结果只能是 $e$ 而不是 $-e$；指数函数 $e^{t}$ 恒正，选项给负值本身也违反 $1^{\\infty}$ 型极限必为正的直觉。"
    },
    {
     "key": "C",
     "note": "为什么会选到 C（$1$）：只看到底数 $\\to 1$，就认为“$1$ 的任何次幂还是 $1$”。这忽略了 $1^{\\infty}$ 是未定式——底数偏离 $1$ 的那部分（约 $\\frac{1}{x}$）与指数 $x$ 相乘后是 $1$ 这一有限非零量，被指数放大后不再消失，因此极限是 $e^{1}=e$，而不是 $1$。"
    },
    {
     "key": "D",
     "note": "为什么会选到 D（$e^{-1}$）：机械套用 $\\lim_{x\\to\\infty}\\left(1-\\frac{1}{x}\\right)^{x}=e^{-1}$ 的模板，把底数里减号后面的 $\\frac{1}{x^{2}}$ 与 $\\frac{1}{x}$ 混为一谈。本题底数偏离 $1$ 的主项是 $+\\frac{1}{x}$（配的是 $\\left(1+\\frac{1}{x}\\right)^{x}\\to e$），$\\frac{1}{x^{2}}$ 只是低阶修正；准确地说 $\\left(1+\\frac{1}{x}-\\frac{1}{x^{2}}\\right)^{x}=\\left(1-\\frac{1}{x}\\right)^{x}\\cdot\\left(1+\\frac{2}{x^{2}}+\\cdots\\right)$ 不成立，正确分解是主因子 $\\left(1+\\frac{1}{x}\\right)^{x}\\to e$ 再乘以趋于 $1$ 的修正因子，所以只能是 $e$。"
    }
   ],
   "pitfalls": "最典型的错误是把 $1^{\\infty}$ 型直接按“$1$ 的任何次幂等于 $1$”处理（选 C），或者只记 $\\left(1+\\frac{1}{x}\\right)^{x}\\to e$ 的模板却分不清底数偏离主项的符号与阶（选 B、D）。正确姿势是取对数，把 $x\\ln\\left(1+\\frac{1}{x}-\\frac{1}{x^{2}}\\right)$ 化成 $x\\left(\\frac{1}{x}-\\frac{1}{x^{2}}\\right)+o(1)$，一定要保留到 $1$ 这一常数项，并注意 $xu$ 是收敛到非零常数，不能用“等价替换后再约掉”的方式粗放处理。",
   "selfReasoning": ""
  },
  "T3-07": {
   "verdict": "ok",
   "selfAnswer": "C",
   "officialAnswer": "C",
   "transcriptionIssues": [
    {
     "field": "src",
     "inRecord": "Test3/Test3-7.jpg",
     "inImage": "gaoshu-bank/web/assets/source/Test3/Test3/Test3-7.jpg（实际文件位于 Test3 目录下多嵌套的一层 Test3/ 子目录中，按记录中的 src 路径无法定位到图片）"
    }
   ],
   "keyIdea": "识别 $x\\to\\frac{1}{2}$ 时分子分母同趋于 $0$ 的 $\\frac{0}{0}$ 型未定式，用平方差公式因式分解并约去零因子 $(2x-1)$，注意保留分子分解时提出的负号。",
   "steps": [
    {
     "title": "第一步：先代入判型，明确为什么不能直接算",
     "content": "把 $x=\\frac{1}{2}$ 直接代入：分子 $1-4\\times\\left(\\frac{1}{2}\\right)^{2}=1-1=0$，分母 $2\\times\\frac{1}{2}-1=0$。$x=\\frac{1}{2}$ 同时是分子与分母的零点，得到 $\\frac{0}{0}$。这一步的意义是：$\\frac{0}{0}$ 是未定式，极限值既不能判为 $0$ 也不能判为不存在，必须先做代数变形把零因子约掉；同时也提示了变形的方向——分子分母必有公因子 $2x-1$。"
    },
    {
     "title": "第二步：因式分解并约去零因子，重点是负号",
     "content": "分子是平方差结构：$1-4x^{2}=1^{2}-(2x)^{2}=(1-2x)(1+2x)$。为了与分母 $2x-1$ 对齐，把它改写成 $1-4x^{2}=-(2x-1)(2x+1)$，这一步最容易丢负号。于是 $\\dfrac{1-4x^{2}}{2x-1}=\\dfrac{-(2x-1)(2x+1)}{2x-1}$。因为 $x\\to\\frac{1}{2}$ 的过程中恒有 $x\\neq\\frac{1}{2}$，即 $2x-1\\neq 0$，所以约去 $\\dfrac{2x-1}{2x-1}=1$ 是合法的，未定式就被化成了普通的一次式 $-(2x+1)$。"
    },
    {
     "title": "第三步：代入化简后的式子求值",
     "content": "约分后 $-(2x+1)$ 在 $x=\\frac{1}{2}$ 处是多项式，处处连续，可直接代入：$\\lim\\limits_{x\\to\\frac{1}{2}}\\dfrac{1-4x^{2}}{2x-1}=\\lim\\limits_{x\\to\\frac{1}{2}}[-(2x+1)]=-\\left(2\\times\\frac{1}{2}+1\\right)=-2$。所以选 C。"
    }
   ],
   "optionNotes": [
    {
     "key": "A",
     "note": "选 A（$-1$）的人方向是对的，也知道要约去 $2x-1$，但代值时算错了：把约分结果误写成 $-(2x)$ 或 $-(2x+1)$ 代入时漏掉了常数项，算出 $-(2\\times\\frac{1}{2})=-1$。正确做法是约分后完整保留 $-(2x+1)$，代入得 $-(1+1)=-2$。"
    },
    {
     "key": "B",
     "note": "选 B（$1$）的人犯了两个叠加错误：既丢了分子分解时的负号（把 $1-4x^{2}$ 错写成 $(2x-1)(2x+1)$），又只把答案记成 $2x+1$ 的形式后取了个 $1$。若只丢负号而代入完整，会得到 $+2$；这里得到 $1$，说明在 \"约分后还剩什么\" 这一步没有把式子写全，属于变形过程不完整、靠心算猜结果。"
    },
    {
     "key": "D",
     "note": "选 D（$0$）的人看到分子分母代入都是 $0$，就以为商也是 $0$（\"零除以零等于零\"），或者看到分母趋于 $0$ 就以为整体趋于 $0$。$\\frac{0}{0}$ 是未定式，约去零因子后极限是确定的非零值 $-2$；只有约分后分子为 $0$、分母不为 $0$ 时极限才是 $0$，本题约分后分子是 $-3$，不为零。"
    }
   ],
   "pitfalls": "最典型的错误是在把平方差 $1-4x^{2}$ 改写成含 $(2x-1)$ 的形式时丢掉负号：$1-4x^{2}=-(2x-1)(2x+1)$，漏掉负号会得到 $+2$，而题目选项里恰好没有 $2$，于是不少人在 $\\pm 1$、$0$ 之间乱猜。第二个高频错误是见到 $\\frac{0}{0}$ 或分母趋于 $0$ 就草率断言 \"极限为 $0$ 或不存在\"，跳过因式分解约零因子这一必要步骤。规范做法是：先代入判型，确认为 $\\frac{0}{0}$ 后分子分母都分解、找出公因子并约干净，最后把化成的连续函数直接代入求值。",
   "selfReasoning": ""
  },
  "T3-08": {
   "verdict": "ok",
   "selfAnswer": "D",
   "officialAnswer": "D",
   "transcriptionIssues": [],
   "keyIdea": "遇到 $x \\to a$ 的 $0 \\cdot \\infty$ 型极限，先换元把趋向点搬到 $0$（令 $t = x - a$），再把余切拆成 $\\dfrac{\\cos t}{\\sin t}$，用等价无穷小 $\\sin t \\sim t$ 与 $\\cos t \\to 1$ 求值。",
   "steps": [
    {
     "title": "第一步：判断类型，先换元把趋向点搬到 0",
     "content": "当 $x \\to 1$ 时 $x - 1 \\to 0$，而 $\\cot(x-1) = \\dfrac{\\cos(x-1)}{\\sin(x-1)} \\to +\\infty$（因为 $\\sin(x-1) \\to 0^{+}$ 的符号由左右两侧决定，绝对值上无界），所以这是 $0 \\cdot \\infty$ 型未定式。等价无穷小公式 $\\sin t \\sim t$、$\\cos t \\sim 1$ 都只在 $t \\to 0$ 时成立，而本题的自变量本身不是趋近于 $0$ 的，因此第一件事是换元 $t = x - 1$，把极限改写成 $\\lim\\limits_{t \\to 0} t\\cot t$。这样处理的好处是：接下来套用的每一个等价关系都恰好落在 $t \\to 0$ 的标准形式上，不必反复做 $x - 1$ 的平移换算。"
    },
    {
     "title": "第二步：把 cot 拆开，化积为商",
     "content": "关键是看出 $\\cot t$ 不能整体替换，但拆成 $\\dfrac{\\cos t}{\\sin t}$ 后分子分母各自都好处理：$$\\lim_{t \\to 0} t\\cot t = \\lim_{t \\to 0} \\frac{t\\cos t}{\\sin t}.$$ 这一步之所以必要，是因为 $\\cot t$ 自身在 $t \\to 0$ 时是无穷大，没有可用的等价无穷小；而写成商以后，分母 $\\sin t$ 与分子中的因子 $t$ 形成了可以直接约掉的同阶配对，$\\cos t$ 则退化为一个非零的普通因子。"
    },
    {
     "title": "第三步：用等价无穷小与极限乘法法则求值",
     "content": "在 $t \\to 0$ 时 $\\sin t \\sim t$，故 $\\dfrac{t}{\\sin t} \\to 1$；又 $\\cos t \\to \\cos 0 = 1$，而 $\\cos t \\neq 0$（当 $t$ 充分小时），于是可以拆成两个收敛因子的乘积：$$\\lim_{t \\to 0} \\frac{t\\cos t}{\\sin t} = \\left(\\lim_{t \\to 0} \\frac{t}{\\sin t}\\right)\\left(\\lim_{t \\to 0} \\cos t\\right) = 1 \\cdot 1 = 1.$$ 注意这里能拆成乘积，依据是极限乘法法则：两个因子的极限都存在且为有限值，所以 $1 \\cdot 1 = 1$。故原极限等于 $1$，选 D。"
    }
   ],
   "optionNotes": [
    {
     "key": "A",
     "note": "选 A（$\\infty$）的人是只盯着 $\\cot(x-1) \\to \\infty$，又误以为 $(x-1) \\to 0$ 之外还剩下什么“没被约掉”的量，于是认定 $0 \\cdot \\infty$ 就是无穷大。实际上 $0 \\cdot \\infty$ 是未定式，这里的两个因子恰好同阶——$\\sin t \\sim t$ 使 $\\dfrac{t}{\\sin t} \\to 1$，趋近速度相互抵消，结果是一个有限的非零常数，而不是无穷。"
    },
    {
     "key": "B",
     "note": "选 B（$0$）的人把未定式 $0 \\cdot \\infty$ 直接当成 $0$ 乘任何数都得 $0$，凭直觉把因子 $x - 1 \\to 0$ 当作主导结论。错误在于忽略了 $\\cot(x-1)$ 是无穷大因子：若两者同阶，乘积趋于非零常数。只有当 $x - 1$ 趋于 $0$ 的速度远快于 $\\dfrac{1}{\\sin(x-1)}$ 发散的速度时乘积才会趋于 $0$，而本题二者都是 $1$ 阶，并不存在这种“快慢差”。"
    },
    {
     "key": "C",
     "note": "选 C（$-1$）的人多半是想套 $\\cot t \\sim \\dfrac{1}{t}$，却把正负号搞错，或对 $\\cot t = \\dfrac{\\cos t}{\\sin t}$ 在 $t \\to 0^{-}$ 一侧的符号产生了混淆，误写出 $\\cot t \\sim -\\dfrac{1}{t}$。正确做法是：$\\cos t \\to 1 > 0$ 而 $\\sin t \\sim t$，故 $t\\cot t = \\dfrac{t\\cos t}{\\sin t} \\to 1 \\cdot 1 = 1$；分子分母中的 $t$ 与 $\\sin t$ 同号，符号自行抵消，极限为正的 $1$，不出现负号。"
    }
   ],
   "pitfalls": "最典型的错误是把 $0 \\cdot \\infty$ 型未定式凭直觉判成 $0$ 或 $\\infty$，而不先化成分式。另一处高频失误是对 $\\cot$ 整体做等价替换（如写成 $\\cot t \\sim \\dfrac{1}{t}$ 时漏掉 $\\cos t$ 的影响、或搞错符号），以及忘记先换元 $t = x - 1$ 就直接在 $x \\to 1$ 下误用只在 $0$ 点附近成立的等价无穷小。",
   "selfReasoning": ""
  },
  "T3-09": {
   "verdict": "ok",
   "selfAnswer": "C",
   "officialAnswer": "C",
   "transcriptionIssues": [],
   "keyIdea": "比较两个无穷小的阶，本质是算极限 $\\lim\\frac{f(x)}{g(x)}$；当分子是乘积形式时要用等价无穷小/泰勒展开定出各自的阶，关键是各因子必须整体相乘、不能只换一部分。",
   "steps": [
    {
     "title": "第一步：判断类型——两项都是无穷小，比阶就是比极限",
     "content": "题设 $x\\to 0$ 时 $e^{2x}-1\\to 0$、$\\cos x-1\\to 0$、$x^3+x^4\\to 0$，所以 $f$、$g$ 都是无穷小。判断两个无穷小的关系（高阶、同阶、等价、低阶），标准做法是考察极限 $L=\\lim_{x\\to 0}\\frac{f(x)}{g(x)}$：$L=0$ 说明 $f$ 是比 $g$ 高阶的无穷小，$L=\\infty$ 说明低阶，$L$ 为非零常数则同阶（$L=1$ 或 $-1$ 时为等价）。所以先写出比值式，再设法把它化简成一个能直接读出极限的形式。"
    },
    {
     "title": "第二步：分别定出分子、分母的阶——用等价无穷小把各因子降为幂函数",
     "content": "分子是乘积 $f(x)=(e^{2x}-1)(\\cos x-1)$，两个因子可分别用等价无穷小替换：$e^{2x}-1\\sim 2x$（因为 $e^{u}-1\\sim u$，取 $u=2x$），而 $\\cos x-1\\sim -\\dfrac{x^2}{2}$（由 $1-\\cos x\\sim\\dfrac{x^2}{2}$ 取负号）。注意这里的替换是成立的：乘积型无穷小允许对每个因子各做等价替换，因为替换误差是更高阶的无穷小，不影响首项。于是 $f(x)\\sim 2x\\cdot\\left(-\\dfrac{x^2}{2}\\right)=-x^3$，即 $f(x)$ 是 $x$ 的 3 阶无穷小。分母 $g(x)=x^3+x^4=x^3(1+x)\\sim x^3$，也是 $x$ 的 3 阶无穷小。两者阶数相同，所以答案必然在 B、C 之间，接下来只需看首项系数。"
    },
    {
     "title": "第三步：作比求极限，用首项系数判定同阶还是等价",
     "content": "写出并化简比值：$$\\lim_{x\\to 0}\\frac{f(x)}{g(x)}=\\lim_{x\\to 0}\\frac{2x\\left(-\\frac{x^2}{2}\\right)}{x^3+x^4}=\\lim_{x\\to 0}\\frac{-x^3}{x^3(1+x)}=\\lim_{x\\to 0}\\frac{-1}{1+x}=-1.$$ 分子分母约去公因子 $x^3$ 后剩下的 $\\frac{-1}{1+x}$ 已经是连续函数在 $x=0$ 处的值，可以直接代入。极限等于非零常数 $-1$，说明 $f$ 与 $g$ 是**同阶无穷小**；但它不等于 $1$（也不等于 $1$ 的等价意义下的 $1$），所以二者**不是等价无穷小**，而是同阶非等价。故 $f(x)\\sim -x^3$、$g(x)\\sim x^3$，首项系数相对为 $-1$，选 C。"
    },
    {
     "title": "第四步：回归选项逐一比对",
     "content": "由 $L=-1$：$L\\ne 0$ 排除 A（高阶）和 D（低阶）；$L\\ne 1$ 排除 B（等价）。只剩 C「同阶但非等价无穷小」，且 $-1$ 与 $1$ 只差一个负号，正是最容易被误判成「等价」的地方，说明选项 B 是本题设计的陷阱位。"
    }
   ],
   "optionNotes": [
    {
     "key": "B",
     "note": "选 B 的人通常是这样做：看到 $e^{2x}-1\\sim 2x$、$\\cos x-1\\sim -\\frac{x^2}{2}$、$x^3+x^4\\sim x^3$，然后只注意到分子分母「都是 3 阶」就判成等价无穷小。错在把「阶数相同」等同于「等价」：同阶只要求 $\\lim\\frac{f}{g}$ 是非零常数，等价还额外要求这个常数为 $1$。本题首项系数为 $2\\times\\left(-\\frac{1}{2}\\right)=-1$，与分母的 $1$ 差了负号，极限是 $-1$ 而不是 $1$，所以只是同阶。原记录中我的答案 B、得 0 分，正是掉进了这个坑。"
    },
    {
     "key": "A",
     "note": "选 A 的人多半数错了阶数，例如把 $\\cos x-1$ 误当作 $x$ 阶（忘记它始于 $x^2$ 项），于是算出 $f$ 为 $x^2$ 阶，比 3 阶的 $g$ 高阶。实际上 $\\cos x-1=-\\frac{x^2}{2}+\\frac{x^4}{24}-\\cdots$ 的最低次幂是 $x^2$，乘上 $e^{2x}-1\\sim 2x$ 后总阶数为 $1+2=3$，与 $g$ 同阶而非高阶。"
    },
    {
     "key": "D",
     "note": "选 D 的人把阶数关系反了，例如认为 $x^3+x^4$ 因为多了 $x^4$ 项而「更高阶」，或凭感觉认为指数函数带来的无穷小更小（其实 $f$ 反而是 $\\sim-x^3$，不低于 $g$）。判断高阶/低阶必须靠 $\\lim\\frac{f}{g}=0$ 还是 $\\infty$，本题极限是有限非零值 $-1$，既不为 $0$ 也不为 $\\infty$，故两个方向都不成立。"
    }
   ],
   "pitfalls": "最典型的错误是「同阶即等价」：只比较出 $f$、$g$ 都是 $x$ 的 3 阶无穷小，就匆忙选 B。避坑要点有二：一是必须真正算出 $\\lim\\frac{f}{g}$ 的数值，等价无穷小要求该极限为 $1$，本题为 $-1$；二是等价替换只能对乘积（或商）中的因子整体进行，若遇到 $f$ 是加减形式或需保留非首项时，必须用泰勒展开，否则首项系数（本题的负号）就会被丢掉。",
   "selfReasoning": ""
  },
  "T3-10": {
   "verdict": "ok",
   "selfAnswer": "C",
   "officialAnswer": "C",
   "transcriptionIssues": [
    {
     "field": "src",
     "inRecord": "Test3/Test3-10.jpg",
     "inImage": "Test3/Test3/Test3-10.jpg"
    }
   ],
   "keyIdea": "识别 $\\infty-\\infty$ 型极限后，用分子有理化（乘以共轭因式）消去减法产生的主部，把差式转化为商式，避免直接相减造成的精度丢失。",
   "steps": [
    {
     "title": "第一步：先判类型，再定方法",
     "content": "当 $x \\to +\\infty$ 时，$\\sqrt{x^2+1} \\to +\\infty$ 而 $x \\to +\\infty$，括号内是 $\\infty-\\infty$ 型未定式，整个式子又是 $\\infty \\cdot 0$ 型的伪装形式。这两个无穷大虽然都发散到 $+\\infty$，但它们的**主部相同**（都是 $x$），相减后主部抵消，只剩低阶项，所以结果是一个有限数而不是 $\\infty$。正因为不能凭“无穷大减无穷大”直接下结论，必须把“差”化成“商”才能比较阶的高低，这就指向了分子有理化。"
    },
    {
     "title": "第二步：分子有理化，把差式变成商式",
     "content": "对括号内的 $\\sqrt{x^2+1}-x$ 乘以它的共轭因式 $\\dfrac{\\sqrt{x^2+1}+x}{\\sqrt{x^2+1}+x}$，利用平方差公式 $(a-b)(a+b)=a^2-b^2$：$$\\sqrt{x^2+1}-x=\\frac{(x^2+1)-x^2}{\\sqrt{x^2+1}+x}=\\frac{1}{\\sqrt{x^2+1}+x}.$$ 这一步的**动机**是：减法中两个无穷大的主部相同，直接相减会互相抵消而看不出残余的量级；化成商以后，分子恒为 $1$（一个确定的常数），残余信息全部保留在分母里，量级一目了然。"
    },
    {
     "title": "第三步：整体代入并比较量级求极限",
     "content": "代回原式：$$\\lim_{x\\to+\\infty} x\\left(\\sqrt{x^2+1}-x\\right)=\\lim_{x\\to+\\infty}\\frac{x}{\\sqrt{x^2+1}+x}.$$ 分子分母同除以 $x$（$x>0$，可直接放进根号）：$$=\\lim_{x\\to+\\infty}\\frac{1}{\\sqrt{1+\\frac{1}{x^2}}+1}.$$ 此时 $\\frac{1}{x^2}\\to 0$，由极限四则运算法则和根号的连续性得 $$=\\frac{1}{\\sqrt{1+0}+1}=\\frac{1}{2}.$$ 也可以从量级角度理解：$\\sqrt{x^2+1}=x\\sqrt{1+\\frac{1}{x^2}}\\approx x\\left(1+\\frac{1}{2x^2}\\right)=x+\\frac{1}{2x}$，故 $\\sqrt{x^2+1}-x \\sim \\dfrac{1}{2x}$，再乘上外面的 $x$ 恰好把 $\\frac{1}{x}$ 抵消，留下常数 $\\frac{1}{2}$——这正是“$\\infty-\\infty$ 型相减抵消主部、乘 $x$ 后回到常数阶”的典型结构。故选 C。"
    }
   ],
   "optionNotes": [
    {
     "key": "A",
     "note": "选 A 的人只看到外表：认为 $x \\to +\\infty$ 而括号内是正数，$\\infty$ 乘正数就是 $\\infty$；或者认为“$\\infty-\\infty$ 型一定是无穷大”。实际上括号内的无穷小与外面的 $x$ 是**同阶**的（$\\sqrt{x^2+1}-x\\sim\\frac{1}{2x}$），二者相乘正好抵消掉 $\\frac{1}{x}$ 这个因子，留下有限值 $\\frac{1}{2}$，所以不会发散。"
    },
    {
     "key": "B",
     "note": "选 B 的人多半用等价代换时漏了一个整体因子：由 $\\sqrt{x^2+1}\\approx x+\\frac{1}{2x}$ 得到 $\\sqrt{x^2+1}-x\\approx\\frac{1}{2x}$，若误记成 $\\sqrt{x^2+1}-x\\approx-\\frac{1}{2x}$，或把 $(a+b)^n$ 的展开号记错，就会得到 $-\\frac{1}{2}$。检验符号很快：因为 $x>0$ 时恒有 $\\sqrt{x^2+1}>x$，括号内为正，极限必为正，故 B 不可能。"
    },
    {
     "key": "D",
     "note": "选 D 的人是“无穷小乘无穷小”的惯性思维：看到括号内 $\\to 0$ 就认为整体是 $\\to 0$ 的无穷小。关键是这里括号内只是 $\\frac{1}{2x}$ 阶的无穷小，而外面还有一个 $\\to\\infty$ 的因子 $x$，两者阶数相同、相互抵消，结果不是 $0$ 而是非零常数。只有像 $x\\left(\\sqrt{x^2+1}-x\\right)$ 中括号内为 $o(1/x)$ 时结果才会是 $0$。"
    }
   ],
   "pitfalls": "最典型的错误是拿 $\\infty-\\infty$ 型没有办法就直接判成 $\\infty$ 或 $0$（对应 A、D），根源在于没有意识到 $\\sqrt{x^2+1}$ 与 $x$ 主部相同、相减后主部抵消，剩余量级是 $\\frac{1}{2x}$；另一个常见错误是把 $\\sqrt{x^2+1}\\approx x+\\frac{1}{2x}$ 的符号或系数记错而得到 $-\\frac{1}{2}$（对应 B）。稳妥做法是遇到根式相减一律先分子有理化，化成商式后再比较分子分母的量级。",
   "selfReasoning": ""
  },
  "T5-01": {
   "verdict": "ok",
   "selfAnswer": "D",
   "officialAnswer": "D",
   "transcriptionIssues": [
    {
     "field": "src",
     "inRecord": "Test5/Test5-1.jpg",
     "inImage": "gaoshu-bank/web/assets/source/Test5/Test5/Test5-1.jpg"
    }
   ],
   "keyIdea": "识别 $x\\to 0$ 时的 $\\dfrac{0}{0}$ 型极限，且分子分母都是「无穷小乘积」结构，用等价无穷小 $\\ln(1+u)\\sim u$ 与 $1-\\cos x\\sim\\dfrac{x^{2}}{2}$ 把两边化成同阶幂函数再比系数。",
   "steps": [
    {
     "title": "第一步：判断类型，决定工具",
     "content": "代入 $x\\to 0$：分子 $x\\ln(1+2x)\\to 0\\cdot 0=0$，分母 $1-\\cos x\\to 1-1=0$，所以是 $\\dfrac{0}{0}$ 型不定式。$\\dfrac{0}{0}$ 型有两条路——洛必达法则，或等价无穷小替换。本题分子是「$x$ 乘 $\\ln$」、分母是「$1-\\cos$」，都是标准无穷小因子的乘积，用等价替换比洛必达更省力，因为洛必达要求商式求导，而这里分子求导会越变越繁。判据就是：能一眼认出的标准无穷小（$\\ln(1+u)$、$1-\\cos x$）以乘积因子的形式出现时，优先替换。"
    },
    {
     "title": "第二步：分别替换分子与分母（都换到二阶）",
     "content": "这是一种「比阶」的题，分子分母都要化到最低次幂，且必须换到同一阶才可靠。分子：当 $x\\to 0$ 时 $2x\\to 0$，由 $\\ln(1+u)\\sim u$ 得 $\\ln(1+2x)\\sim 2x$，于是 $x\\ln(1+2x)\\sim x\\cdot 2x=2x^{2}$——注意外面的因子 $x$ 必须乘进去，它把分子的阶从一阶抬到了二阶。分母：由 $1-\\cos x\\sim\\dfrac{x^{2}}{2}$ 得 $1-\\cos x\\sim\\dfrac{x^{2}}{2}$，本身就是二阶。这样分子分母同为二阶无穷小，比值才有非零有限极限；如果只把分子换成一阶的 $2x$ 而同分母的二阶相比，阶数不匹配，结论必然出错。"
    },
    {
     "title": "第三步：作比求值，选定选项",
     "content": "因为分子分母各自的替换都是等价无穷小，原极限等于替换后的极限：$$\\lim_{x\\to 0}\\frac{x\\ln(1+2x)}{1-\\cos x}=\\lim_{x\\to 0}\\frac{2x^{2}}{\\dfrac{x^{2}}{2}}=\\frac{2}{\\dfrac{1}{2}}=4.$$ 验证一下阶数：分子二阶系数为 $2$，分母二阶系数为 $\\dfrac{1}{2}$，比值 $2\\div\\dfrac{1}{2}=4$，与选项 D 相符。故本题选 D。"
    }
   ],
   "optionNotes": [
    {
     "key": "A",
     "note": "为什么会选到 $-4$：只记住了 $1-\\cos x$ 里那个负号（$\\cos x\\approx 1-\\dfrac{x^{2}}{2}$ 的「负」），就把分母 $1-\\cos x$ 当成 $-\\dfrac{x^{2}}{2}$，于是得到 $2\\div\\left(-\\dfrac{1}{2}\\right)=-4$。实际上 $1-\\cos x$ 是把 $\\cos x$ 的展开式代入 $1-\\cos x$ 后得到的，负号已经被这一步减掉了：$1-\\left(1-\\dfrac{x^{2}}{2}\\right)=+\\dfrac{x^{2}}{2}$，恒为正，所以结果只能是正的 $4$。"
    },
    {
     "key": "B",
     "note": "为什么会选到 $2$：把分子误当成 $x\\cdot\\ln(1+2x)\\sim x\\cdot 2x$ 之后，忘记除以分母的系数 $\\dfrac{1}{2}$，直接报了分子的二阶系数 $2$；或者犯「阶数混搭」的错——分子保留到二阶的 $2x^{2}$，分母只记成一阶的 $x$，得到 $2x^{2}/x\\to 0$ 一类的混乱结果，最后凭印象选了与分子系数相同的 $2$。正确做法是分子分母都换到二阶再整体作商。"
    },
    {
     "key": "C",
     "note": "为什么会选到 $3$：这是把系数「相加」而不是「相除」的典型失误——把分子的 $2$ 与分母的 $\\dfrac{1}{2}$ 相加凑出 $3$（或因 $1-\\cos x$ 中的 $1$ 而写成 $2+1=3$）。极限的比阶运算中，同阶无穷小之比的极限是「系数之商」，即 $2\\div\\dfrac{1}{2}=4$，绝不是系数之和，故 $3$ 是干扰项。"
    },
    {
     "key": "D",
     "note": "本题正确答案。分子 $x\\ln(1+2x)\\sim 2x^{2}$，分母 $1-\\cos x\\sim\\dfrac{x^{2}}{2}$，作商得 $4$，与选项 D 一致。"
    }
   ],
   "pitfalls": "最典型的错误是「阶数不匹配」：看到 $\\ln(1+2x)\\sim 2x$ 就急着作商，忘了外面的因子 $x$ 还要乘进去，导致分子停在一阶而分母是二阶；其次是分母 $1-\\cos x$ 的符号与系数记错（写成 $-\\dfrac{x^{2}}{2}$，得 $-4$）；再次是把等价替换用在「加减项」上。要牢记 $1-\\cos x\\sim\\dfrac{x^{2}}{2}$ 是恒正的，且等价无穷小替换只能整体替换乘积因子，替换后必须把两边都化到同一阶再比较系数之比。",
   "selfReasoning": "独立求解（未参考 correctAnswer）：原式为 $\\lim_{x\\to 0}\\dfrac{x\\ln(1+2x)}{1-\\cos x}$，代入 $x=0$ 得 $\\dfrac{0}{0}$ 型。用 Taylor 展开交叉验证：$\\ln(1+2x)=2x-\\dfrac{(2x)^{2}}{2}+o(x^{2})=2x-2x^{2}+o(x^{2})$，故分子 $x\\ln(1+2x)=2x^{2}-2x^{3}+o(x^{3})$，最低阶为 $2x^{2}$；又 $\\cos x=1-\\dfrac{x^{2}}{2}+\\dfrac{x^{4}}{24}+o(x^{4})$，故分母 $1-\\cos x=\\dfrac{x^{2}}{2}-\\dfrac{x^{4}}{24}+o(x^{4})$，最低阶为 $\\dfrac{x^{2}}{2}$。两者作商：$\\dfrac{2x^{2}+o(x^{2})}{\\dfrac{x^{2}}{2}+o(x^{2})}=\\dfrac{2}{1/2}+o(1)=4+o(1)\\to 4$。用等价无穷小替换得到同样结论。因此 selfAnswer = D。记录中 correctAnswer = D、myAnswer = D，截图中「正确答案」为 D、「我的答案」为 D 且带绿色 ✓、本题得分 10 分，三者一致，故 verdict = ok。"
  },
  "T5-02": {
   "verdict": "ok",
   "selfAnswer": "C",
   "officialAnswer": "C",
   "transcriptionIssues": [],
   "keyIdea": "识别 $1^{\\infty}$ 型未定式：底数已写成 $1+$（无穷小）的形式、指数趋于无穷，先取对数把指数化成乘积，再用等价无穷小 $\\ln(1+t)\\sim t$ 把无穷小量化成有限值，结果形如 $e^{k}$。",
   "steps": [
    {
     "title": "第一步：判断类型（$1^{\\infty}$ 型未定式）",
     "content": "底数 $1+\\frac{1}{x}+\\frac{1}{x^{2}}\\to 1$，指数 $x\\to\\infty$，所以这是 $1^{\\infty}$ 型未定式，不能把底数的极限 $1$ 直接代入（$1^{\\infty}$ 的结果取决于底数趋于 $1$ 的快慢）。识别特征很明确：底数已经写成了 $1+$（无穷小）的样子，这正是凑第二重要极限 $\\lim_{t\\to 0}(1+t)^{\\frac{1}{t}}=e$ 的标准形态。"
    },
    {
     "title": "第二步：取对数，把幂指函数化为乘积",
     "content": "设 $y=\\left(1+\\frac{1}{x}+\\frac{1}{x^{2}}\\right)^{x}$，两边取对数得 $\\ln y=x\\ln\\left(1+\\frac{1}{x}+\\frac{1}{x^{2}}\\right)$。取对数的目的是把指数 $x$ 从肩上「拉下来」变成乘积，从而把 $1^{\\infty}$ 型转化为 $0\\cdot\\infty$ 型。因为当 $x\\to\\infty$ 时 $\\frac{1}{x}+\\frac{1}{x^{2}}\\to 0$，满足 $\\ln(1+t)\\sim t\\ (t\\to 0)$ 的使用条件，所以可以把整个对数替换成括号里的量。"
    },
    {
     "title": "第三步：作等价替换并求极限",
     "content": "由 $\\ln(1+t)\\sim t$ 得 $\\ln y\\sim x\\left(\\frac{1}{x}+\\frac{1}{x^{2}}\\right)=1+\\frac{1}{x}$，于是当 $x\\to\\infty$ 时 $\\ln y\\to 1$。这里的关键是理解为什么要乘开：括号内的无穷小量 $\\frac{1}{x}+\\frac{1}{x^{2}}$ 本身趋于 $0$，但乘上指数 $x$ 后被放大，主项 $x\\cdot\\frac{1}{x}=1$ 留下了有限值，而 $x\\cdot\\frac{1}{x^{2}}=\\frac{1}{x}$ 是更高阶的无穷小、趋于 $0$。正是这个 $1$ 决定了答案不是 $1$ 也不是 $\\infty$。"
    },
    {
     "title": "第四步：由对数极限还原原式",
     "content": "因为 $\\ln y\\to 1$ 且指数函数 $e^{t}$ 连续，所以 $y=e^{\\ln y}\\to e^{1}=e$，即 $\\lim_{x\\to\\infty}\\left(1+\\frac{1}{x}+\\frac{1}{x^{2}}\\right)^{x}=e$，选 C。也可直接凑重要极限：$\\left(1+\\frac{1}{x}+\\frac{1}{x^{2}}\\right)^{x}=\\left[\\left(1+\\frac{1}{x}+\\frac{1}{x^{2}}\\right)^{\\frac{1}{\\frac{1}{x}+\\frac{1}{x^{2}}}}\\right]^{x\\left(\\frac{1}{x}+\\frac{1}{x^{2}}\\right)}$，中括号内趋于 $e$，指数趋于 $1$，结果同样是 $e^{1}=e$。"
    }
   ],
   "optionNotes": [
    {
     "key": "A",
     "note": "选 A 的人多半把它和 $\\lim_{x\\to\\infty}\\left(1-\\frac{1}{x}\\right)^{x}=e^{-1}$ 记混了，把底数里的正号看成了负号。本题括号内 $\\frac{1}{x}$ 与 $\\frac{1}{x^{2}}$ 都为正，$x\\ln\\left(1+\\frac{1}{x}+\\frac{1}{x^{2}}\\right)\\to +1$，结果只能是 $e^{+1}$，不可能出现 $e^{-1}$。"
    },
    {
     "key": "B",
     "note": "选 B 的人直接用了「括号趋于 $1$，而 $1$ 的任何次幂都是 $1$」这种错误代入。这是 $1^{\\infty}$ 型未定式最常见的误判：底数趋于 $1$ 的速度是 $1+\\frac{1}{x}$，它与指数 $x$ 的乘积恰好趋于 $1$ 而不是 $0$，所以极限是 $e^{1}=e$ 而非 $1$；只有底数为 $1+o\\left(\\frac{1}{x}\\right)$ 时结果才会是 $1$。"
    },
    {
     "key": "D",
     "note": "选 D 的人套用了「底数 $a>1$ 固定、指数趋于无穷则 $a^{x}\\to\\infty$」的结论，但本题底数不是固定常数，而是随 $x$ 变化并趋于 $1$ 的量。$1^{\\infty}$ 型未定式的极限可以是 $1$、$e^{k}$，甚至 $0$ 或 $\\infty$，必须取对数具体计算；本题算得有限值 $e$，故 $\\infty$ 不对。"
    }
   ],
   "pitfalls": "本题最典型的错误是看到括号内趋于 $1$、指数趋于无穷，就直接判定极限为 $1$（或凭「大于 $1$ 的数的无穷次幂」判为 $\\infty$），忽略了这是 $1^{\\infty}$ 型未定式。正确做法是先取对数，再用 $\\ln(1+t)\\sim t$ 把指数 $x$ 与括号内的无穷小量相乘：$x\\left(\\frac{1}{x}+\\frac{1}{x^{2}}\\right)=1+\\frac{1}{x}\\to 1$；漏掉或错判这个乘积的阶，就会得到 $1$ 或 $e^{-1}$ 之类的错误答案。",
   "selfReasoning": ""
  },
  "T5-03": {
   "verdict": "ok",
   "selfAnswer": "A",
   "officialAnswer": "A",
   "transcriptionIssues": [],
   "keyIdea": "把极限拆成两项分别处理：一项用等价无穷小 $\\sin t \\sim t$ 把 $x\\sin\\frac{2}{x}$ 化为常数，另一项用『有界量乘无穷小』直接判为 $0$，核心识别特征是括号内两项的类型完全不同。",
   "steps": [
    {
     "title": "第一步：判断类型，拆项",
     "content": "和式求极限可以先逐项分析：$\\lim_{x\\to\\infty}\\left(2x\\sin\\frac{2}{x}+\\frac{\\arctan 3x}{x}\\right)$ 中两项的结构不一样——第一项是 $\\infty\\cdot 0$ 型的不定式，不能直接说它趋于 $0$；第二项是『有界量除以无穷大』，不是不定式。因此要把两项分开处理，各自用合适的工具，而不是整体硬套一个方法。"
    },
    {
     "title": "第二步：用等价无穷小处理第一项",
     "content": "当 $x\\to\\infty$ 时 $\\frac{2}{x}\\to 0$，令 $t=\\frac{2}{x}$，则 $t\\to 0$，可用等价无穷小 $\\sin t\\sim t$。于是 $2x\\sin\\frac{2}{x}\\sim 2x\\cdot\\frac{2}{x}=4$，即第一项极限为 $4$。这里的关键是：$\\sin\\frac{2}{x}$ 趋于 $0$ 的速度恰好与 $\\frac{2}{x}$ 相当，所以乘以 $x$ 后不是 $0$ 而是一个确定的常数。"
    },
    {
     "title": "第三步：用『有界量乘无穷小』处理第二项",
     "content": "当 $x\\to\\infty$ 时 $\\arctan 3x$ 有界（$|\\arctan 3x|<\\frac{\\pi}{2}$），而 $\\frac{1}{x}\\to 0$ 是无穷小，所以 $\\frac{\\arctan 3x}{x}=\\arctan 3x\\cdot\\frac{1}{x}\\to 0$。注意 $x\\to\\infty$ 也可理解为 $x\\to -\\infty$：此时 $\\arctan 3x\\to -\\frac{\\pi}{2}$ 仍有界，分母 $x\\to -\\infty$，商同样趋于 $0$，结论不受影响。"
    },
    {
     "title": "第四步：合并结果并对照选项",
     "content": "两项极限都存在，故原式 $=4+0=4$，选 $A$。"
    }
   ],
   "optionNotes": [
    {
     "key": "B",
     "note": "选 $B$ 的人看到 $\\sin\\frac{2}{x}\\to 0$ 就断定 $2x\\sin\\frac{2}{x}\\to 0$，忽略了前面的因子 $x\\to\\infty$。这是 $\\infty\\cdot 0$ 型不定式，必须用等价无穷小 $\\sin\\frac{2}{x}\\sim\\frac{2}{x}$ 化成 $2x\\cdot\\frac{2}{x}=4$ 才能定值；把『$\\sin$ 趋于 $0$』直接当成整项趋于 $0$ 是典型的漏掉无穷大量阶数比较的错误。"
    },
    {
     "key": "C",
     "note": "选 $C$ 的人多半是把 $\\arctan 3x$ 中的系数 $3$ 误当成极限值贡献了 $3$，或以为第二项 $\\frac{\\arctan 3x}{x}$ 的极限是 $3$。实际上 $\\arctan 3x$ 只是有界量，被无穷大 $x$ 除以后趋于 $0$，它与 $\\arctan x$、$\\arctan 5x$ 的结果完全一样，都不影响本题答案。"
    },
    {
     "key": "D",
     "note": "选 $D$ 的人通常只算出了第一项的一部分：把 $2x\\sin\\frac{2}{x}$ 中的等价替换 $\\sin\\frac{2}{x}\\sim\\frac{2}{x}$ 做完后漏乘了系数 $2$，得到 $2$ 而非 $4$；也有人把极限符号下的 $x$ 与 $\\frac{2}{x}$ 的分子 $2$ 混淆，把 $2x\\cdot\\frac{2}{x}$ 算成 $2$。逐项代换后应完整保留常数因子，$2\\cdot 2=4$。"
    }
   ],
   "pitfalls": "最典型的错误是把 $\\infty\\cdot 0$ 型的 $2x\\sin\\frac{2}{x}$ 直接判为 $0$（从而错选 $B$），根源是没有识别出这是不定式、必须用等价无穷小 $\\sin t\\sim t$ 比较阶数；另一个常见错误是把有界量 $\\arctan 3x$ 的系数或性质误当成极限值（错选 $C$）。",
   "selfReasoning": ""
  },
  "T5-04": {
   "verdict": "ok",
   "selfAnswer": "D",
   "officialAnswer": "D",
   "transcriptionIssues": [],
   "keyIdea": "分子是两个等价无穷小之差，不能各自替换（会抵消成 0），必须用泰勒展开（或 $\\tan x-\\sin x\\sim\\frac{x^3}{2}$ 的等价无穷小）提高到三阶才能与分母 $\\tan^3x$ 同阶相消。",
   "steps": [
    {
     "title": "第一步：判断类型，确定需要展开到几阶",
     "content": "$x\\to0$ 时 $\\tan x\\to0$，$\\sin x\\to0$，分母 $\\tan^3x\\to0$，故为 $\\frac{0}{0}$ 型未定式。关键是：分子里 $\\tan x$ 与 $\\sin x$ 分别用一阶等价无穷小都替换成 $x$，相减得 $0$，说明一阶项恰好抵消，真正的信息藏在一阶之后。因此必须把分子展开到比分母低阶项不再抵消的那一阶——分母是三次，展开到三阶即可。"
    },
    {
     "title": "第二步：用泰勒（麦克劳林）展开写出分子的三阶主部",
     "content": "由 $\\sin x=x-\\frac{x^3}{6}+o(x^3)$，$\\tan x=x+\\frac{x^3}{3}+o(x^3)$，得 $$\\tan x-\\sin x=\\left(x+\\frac{x^3}{3}\\right)-\\left(x-\\frac{x^3}{6}\\right)+o(x^3)=\\frac{x^3}{3}+\\frac{x^3}{6}+o(x^3)=\\frac{x^3}{2}+o(x^3).$$ 这一步是本题的核心：正是三次项的系数 $\\frac13+\\frac16=\\frac12$（来自 $\\tan x$ 与 $\\sin x$ 三阶系数符号相反、因此相加）决定了答案，而一次项被消掉。"
    },
    {
     "title": "第三步：代入分母并取极限",
     "content": "分母用等价无穷小 $\\tan x\\sim x$，于是 $\\tan^3x\\sim x^3$。所以 $$\\lim_{x\\to0}\\frac{\\tan x-\\sin x}{\\tan^3x}=\\lim_{x\\to0}\\frac{\\frac{x^3}{2}+o(x^3)}{x^3}=\\lim_{x\\to0}\\left(\\frac12+o(1)\\right)=\\frac12.$$ 结论为 $\\frac12$，对应选项 D。"
    }
   ],
   "optionNotes": [
    {
     "key": "A",
     "note": "选 A（得 $1$）通常是只把分母换成 $x^3$，却把分子误记成 $\\frac{x^3}{6}$ 或只保留了其中一项（如只用 $\\tan x-\\sin x\\approx\\frac{x^3}{3}$ 或 $\\approx\\frac{x^3}{6}$ 中的某一个），从而丢掉系数；或把两个系数误当成同号相减得 $\\frac{1}{6}$、$\\frac{1}{3}$ 后又记混。正确做法是 $\\frac13-\\left(-\\frac16\\right)=\\frac12$，符号必须一起带入。"
    },
    {
     "key": "B",
     "note": "选 B（得 $2$）是把三阶系数的差值算反了：写成 $\\frac13+\\frac16$ 之后又取了倒数，或错误地认为 $\\frac{x^3}{2}\\div x^3$ 得 $2$。极限是分子主部系数 $\\frac12$ 除以分母主部系数 $1$，不是它的倒数。"
    },
    {
     "key": "C",
     "note": "选 C（得 $\\infty$）的人认为一阶项抵消后分子已“变为 0”或低于分母阶数，于是判断分子是分母的高阶无穷小……但这一步正好推反了：真判断成高阶无穷小应得 $0$；若认为分子阶数低于分母才会得 $\\infty$。本题分子是三阶、分母也是三阶，同阶，极限为有限非零常数。这类错误的根源是没有真正展开到三阶，只凭“抵消了”就凭感觉判断阶数。"
    }
   ],
   "pitfalls": "最典型的错误是在加减法中滥用等价无穷小替换：看到 $\\tan x\\sim x$、$\\sin x\\sim x$ 就把分子直接换成 $x-x=0$，或写成 $\\frac{0}{x^3}=0$。必须记住：等价无穷小替换只对乘除因子（整体乘积、商）安全，一旦出现在“相减”里，被抵消的正是主部，必须改用泰勒展开；也不能把 $\\tan x-\\sin x$ 随手“等价替换”成 $x^3$ 而不核对系数 $\\frac12$。",
   "selfReasoning": ""
  },
  "T5-05": {
   "verdict": "ok",
   "selfAnswer": "B",
   "officialAnswer": "B",
   "transcriptionIssues": [],
   "keyIdea": "分段函数在分界点处连续，本质是把该点的函数值与左极限对起来；而本题真正的计算量在 $1^{\\infty}$ 型左极限 $(2-x)^{\\frac{1}{x-1}}$，标准手法是令 $u=1-x\\to0^{+}$ 配成 $\\left[(1+u)^{\\frac1u}\\right]^{-1}\\to e^{-1}$，再与常数段 $e^{-a}$ 相等解出 $a$。",
   "steps": [
    {
     "title": "第一步：判断类型，写出连续的条件",
     "content": "这是“分段函数含参数、在分界点连续”的问题。$f$ 在 $x=1$ 的右段是常数 $e^{-a}$（$x\\geq1$ 时 $f(x)\\equiv e^{-a}$），所以右极限与函数值相同：$\\lim_{x\\to1^{+}}f(x)=f(1)=e^{-a}$。于是连续的定义 $\\lim_{x\\to1^{-}}f(x)=f(1)=\\lim_{x\\to1^{+}}f(x)$ 退化成一条方程 $$\\lim_{x\\to1^{-}}(2-x)^{\\frac{1}{x-1}}=e^{-a}.$$ 先做这一步的好处是：把“两个极限加函数值”三条信息压缩成一条，剩下的工作只是老老实实算一个左极限，不会漏项。"
    },
    {
     "title": "第二步：用第二重要极限求左极限（$1^{\\infty}$ 型）",
     "content": "当 $x\\to1^{-}$ 时 $2-x\\to1$，$\\frac{1}{x-1}\\to-\\infty$，故为 $1^{\\infty}$ 型未定式，不能把底数代成 $1$。标准做法是把底数写成“$1+$ 无穷小”，并把指数配成该无穷小的倒数。为此作代换 $u=1-x$，则 $x\\to1^{-}$ 时 $u\\to0^{+}$，且 $2-x=1+u$，$\\frac{1}{x-1}=\\frac{1}{-u}=-\\frac1u$。于是 $$(2-x)^{\\frac{1}{x-1}}=(1+u)^{-\\frac1u}=\\left[(1+u)^{\\frac1u}\\right]^{-1}\\xrightarrow[u\\to0^{+}]{}e^{-1},$$ 这里用了第二重要极限 $\\lim_{u\\to0^{+}}(1+u)^{\\frac1u}=e$。（等价地，取对数后 $\\frac{\\ln(1+u)}{-u}\\to-1$，结果同样是 $e^{-1}$。）关键点在于：指数 $\\frac{1}{x-1}$ 与 $1-x$ 恰好差一个负号、系数为 $1$，所以极限是 $e^{-1}$ 而不是别的幂。"
    },
    {
     "title": "第三步：令极限与函数值相等，解出参数",
     "content": "左段 $x<1$ 并未包含 $x=1$，函数值由右段给出，所以连续即 $$e^{-1}=e^{-a}\\;\\Longrightarrow\\;-1=-a\\;\\Longrightarrow\\;a=1.$$ 指数函数单调，两端相等当且仅当指数相等，故 $a=1$，对应选项 B。检验：$a=1$ 时 $f(1)=e^{-1}$，左右极限均为 $e^{-1}$，确实连续。"
    }
   ],
   "optionNotes": [
    {
     "key": "A",
     "note": "选 A（$a=2$）通常来自第二步把底数的系数配错：$2-x$ 应写成 $1+(1-x)$，却误写成 $1+2(1-x)$，于是指数极限变成 $-2$，左极限算成 $e^{-2}$，再令 $e^{-a}=e^{-2}$ 得 $a=2$；也有同学在套 $1^{\\infty}$ 公式 $e^{\\lim (2-x-1)\\cdot\\frac{1}{x-1}}$ 时把分子 $1-x$ 化简成 $2(1-x)$ 而多出系数 $2$。实际系数是 $1$：$(2-x)=1+(1-x)=1+u$，极限只能是 $e^{-1}$。"
    },
    {
     "key": "C",
     "note": "选 C（$a=0$）是最典型的错误：把 $1^{\\infty}$ 型当成“底数趋于 $1$，所以极限等于 $1$”，于是令 $e^{-a}=1$ 得 $a=0$。$1^{\\infty}$ 是未定式，极限并不等于 $1$，本题左极限是 $e^{-1}\\approx0.368$。代回检验也能否定它：$a=0$ 时 $f(1)=e^{0}=1$，而 $\\lim_{x\\to1^{-}}f(x)=e^{-1}\\neq1$，并不连续。"
    },
    {
     "key": "D",
     "note": "选 D（$a=3$）属于“化简时丢系数/丢符号”型错误：例如把指数误看成 $\\frac{3}{x-1}$（或把 $-\\frac1u$ 的分子写成 $3$），使左极限算成 $e^{-3}$，再解出 $a=3$；也有人把 $2-x$ 与 $x-1$ 的符号关系弄乱、凑出一个 $3$ 次幂。避免这类错误的方法是不要凭感觉“看”指数极限，而是先取对数写成 $e^{\\ln(\\cdot)}$ 或做 $u=1-x$ 的显式代换，把系数一个一个对清楚。"
    }
   ],
   "pitfalls": "最典型的错误是把 $1^{\\infty}$ 型极限直接当作 $1$（“底数趋于 $1$，$1$ 的任何次幂还是 $1$”），从而选 $a=0$。要记住 $1^{\\infty}$ 是未定式，必须凑成第二重要极限或取对数计算。其次是两个易漏点：一是忘记函数值由 $x\\geq1$ 那一段决定（$f(1)=e^{-a}$，而不是把 $1$ 代入 $(2-x)^{\\frac{1}{x-1}}$，那会得到无意义的 $1^{-\\infty}$）；二是代换后指数上的负号和系数 $1$ 没对齐，把 $e^{-1}$ 写成 $e^{-2}$、$e^{-3}$ 或 $e^{1}$。",
   "selfReasoning": ""
  },
  "T5-06": {
   "verdict": "ok",
   "selfAnswer": "C",
   "officialAnswer": "C",
   "transcriptionIssues": [],
   "keyIdea": "把根式统一写成 $x$ 的幂后比较指数：$x\\to 0$ 时幂指数越小的项趋于 $0$ 越慢，两项相加由低阶项主导，故 $x^2+\\sqrt[3]{x}\\sim x^{1/3}$，是 $x$ 的 $\\frac{1}{3}$ 阶无穷小。",
   "steps": [
    {
     "title": "第一步：统一成幂函数，明确“谁的阶小谁说话”",
     "content": "把根式改写成幂：$x^2+\\sqrt[3]{x}=x^2+x^{1/3}$。判断无穷小的阶，本质是比较 $x\\to 0$ 时各项趋于 $0$ 的快慢。对幂函数 $x^{\\alpha}$（$\\alpha>0$）而言，指数 $\\alpha$ 越大，趋于 $0$ 越快（越是高阶无穷小）；指数越小，趋于 $0$ 越慢，在加法中越占主导。这里 $2>\\frac{1}{3}$，所以 $x^2$ 比 $x^{1/3}$ 更快消失，$x^{1/3}$ 才是决定整体阶数的主导项。这也正是“两个不同阶无穷小相加，取低阶者”这条结论的来源。"
    },
    {
     "title": "第二步：验证确实可以“舍去高阶项”",
     "content": "舍项不能凭感觉，要验证两项之比趋于 $0$：$\\dfrac{x^2}{x^{1/3}}=x^{5/3}\\to 0$（$x\\to 0$），说明 $x^2$ 是比 $x^{1/3}$ 高阶的无穷小，可以忽略，于是 $x^2+\\sqrt[3]{x}\\sim x^{1/3}$。等价地，$\\lim\\limits_{x\\to 0}\\dfrac{x^2+\\sqrt[3]{x}}{x^{1/3}}=\\lim\\limits_{x\\to 0}\\left(x^{5/3}+1\\right)=1$，直接说明两者是等价无穷小。注意：只有阶数不同、比值极限为 $0$ 时才能这样舍项；若两项同阶，必须保留系数。"
    },
    {
     "title": "第三步：按定义读出阶数",
     "content": "“$f(x)$ 是 $x$ 的 $k$ 阶无穷小”的定义是：$\\lim\\limits_{x\\to 0}\\dfrac{f(x)}{x^{k}}=c$，其中 $c\\neq 0$ 为常数。取 $f(x)=x^2+\\sqrt[3]{x}$，由第二步 $f(x)\\sim x^{1/3}$，故 $\\lim\\limits_{x\\to 0}\\dfrac{x^2+\\sqrt[3]{x}}{x^{1/3}}=1\\neq 0$，即 $f(x)$ 与 $x^{1/3}$ 同阶，所以阶数为 $k=\\dfrac{1}{3}$。反向确认：若误以为是一阶，则 $\\lim\\limits_{x\\to 0}\\dfrac{x^2+\\sqrt[3]{x}}{x}=\\lim\\limits_{x\\to 0}\\left(x+x^{-2/3}\\right)=\\infty\\neq 0$，比值不收敛到非零常数，可见它比 $x$ 本身更低阶，绝不可能是 $1$ 阶或更高阶。"
    }
   ],
   "optionNotes": [
    {
     "key": "A",
     "note": "为什么会选到 A：把“阶”当成可以随意加减乘除的数，用 $\\dfrac{1}{2}-\\dfrac{1}{3}=\\dfrac{1}{6}$（或 $\\dfrac{1}{2}\\times\\dfrac{1}{3}$ 之类的拼凑）得出 $\\frac{1}{6}$，其中还额外把 $x^2$ 误当成了 $x^{1/2}$。而实际上 $x^2$ 的指数是 $2$ 不是 $\\frac12$，无穷小的阶由“与 $x^k$ 的比值极限是否为非零常数”定义，不能这样硬算；正确主导项是 $x^{1/3}$，阶为 $\\frac13$。"
    },
    {
     "key": "B",
     "note": "为什么会选到 B（本卷作答即为此项）：看到 $x^2$ 与 $\\sqrt[3]{x}$ 就凭“次数高者更强”的直觉挑了指数较大的 $2$。但在 $x\\to 0$ 的语境下恰恰相反——指数越大趋于 $0$ 越快，属于更高阶（更次要）的无穷小，起决定作用的是指数最小的项 $x^{1/3}$。判据是比值极限：$\\dfrac{x^2}{x^{1/3}}\\to 0$，所以 $x^2$ 可以被丢掉，阶数只能是 $\\frac13$ 而不是 $2$。"
    },
    {
     "key": "D",
     "note": "为什么会选到 D：把三次根式与二次根式混淆，把 $\\sqrt[3]{x}$ 记成了 $x^{1/2}$（即 $\\sqrt{x}$），于是丢掉正确的指数 $\\frac13$，得出 $\\frac12$。根式与指数的换算是 $\\sqrt[n]{x^m}=x^{m/n}$，所以 $\\sqrt[3]{x}=x^{1/3}$；这一字之差直接改变了阶数，属于记忆性错误而非方法错误。"
    }
   ],
   "pitfalls": "最典型的错误是把“$x\\to 0$ 时幂指数大者占主导”记反，或直接对阶数做加减乘除。必须牢记识别特征：$x\\to 0$ 时，$x^{\\alpha}$ 的指数 $\\alpha$ 越小，趋于 $0$ 越慢、越是主导项，故 $x^2+\\sqrt[3]{x}\\sim x^{1/3}$（阶为 $\\frac13$）；而 $x\\to\\infty$ 时方向相反，是最高次幂占主导。判断时一律用“与 $x^k$ 的比值极限是非零常数”来验证，不要凭次数大小猜。",
   "selfReasoning": ""
  },
  "T5-07": {
   "verdict": "ok",
   "selfAnswer": "D",
   "officialAnswer": "D",
   "transcriptionIssues": [],
   "keyIdea": "识别特征：$x\\to\\infty$ 时的有理式型极限，先分别数出分子、分母关于 $x$ 的总次数（把各因式的指数相加），二者同为 $90$ 次，属“同次”情形，极限就等于分子分母最高次项系数之比 $\\frac{3^{70}\\cdot 8^{20}}{5^{90}}$，与 $\\pm\\infty$、$0$ 都无关。",
   "steps": [
    {
     "title": "第一步：判断类型，定“抓大头”的策略",
     "content": "这是 $x\\to+\\infty$ 的极限，分子分母都是关于 $x$ 的多项式之积，形式上是 $\\frac{\\infty}{\\infty}$ 型未定式。对这类“多项式之比在无穷远处”的极限，核心策略是**只看最高次项**（俗称“抓大头”），因为当 $|x|$ 充分大时，最高次项增长最快，其余低次项的相对贡献都趋于 $0$。所以先不要展开任何括号，而是分别统计分子与分母的最高次数。"
    },
    {
     "title": "第二步：数次数，判断属于三种情形中的哪一种",
     "content": "分子的两个因式分别为 $70$ 次与 $20$ 次，故分子总次数为 $70+20=90$；分母为 $90$ 次。$\\deg(\\text{分子})=\\deg(\\text{分母})=90$，是“分子分母同次”的情形。这一步是本题的关键判据，它直接排除了另外两种结果：若分母次数大，极限为 $0$（选项 B）；若分子次数大，极限为 $\\infty$（选项 C）；只有当次数相等时，极限才是**有限非零常数**，即最高次项系数之比。这也是为什么选项 A“不存在”不成立——同次时极限必然是确定的有限数。特别注意 $x\\to+\\infty$ 而非 $\\pm\\infty$，且本题次数为偶数，符号上也不会出现跳变。"
    },
    {
     "title": "第三步：分别取分子分母最高次项的系数并作商",
     "content": "把每个因式的最高次项与其系数提出来：$(3x+6)^{70}$ 的最高次项为 $(3x)^{70}=3^{70}x^{70}$，$(8x-5)^{20}$ 的最高次项为 $(8x)^{20}=8^{20}x^{20}$，故分子最高次项为 $3^{70}\\cdot 8^{20}x^{90}$；分母 $(5x-1)^{90}$ 的最高次项为 $(5x)^{90}=5^{90}x^{90}$。作商得 $$\\lim_{x\\to+\\infty}\\frac{(3x+6)^{70}(8x-5)^{20}}{(5x-1)^{90}}=\\frac{3^{70}\\cdot 8^{20}x^{90}}{5^{90}x^{90}}=\\frac{3^{70}\\cdot 8^{20}}{5^{90}}.$$ $x^{90}$ 被约掉，结果是一个与 $x$ 无关的常数，对应选项 D。"
    },
    {
     "title": "第四步：可用标准手法复核，避免漏掉常数因子",
     "content": "更规范地，可把每个因式的最高次幂提到括号外：$$\\frac{(3x+6)^{70}(8x-5)^{20}}{(5x-1)^{90}}=\\frac{3^{70}x^{70}\\left(1+\\frac{2}{x}\\right)^{70}\\cdot 8^{20}x^{20}\\left(1-\\frac{5}{8x}\\right)^{20}}{5^{90}x^{90}\\left(1-\\frac{1}{5x}\\right)^{90}}=\\frac{3^{70}8^{20}}{5^{90}}\\cdot\\frac{\\left(1+\\frac{2}{x}\\right)^{70}\\left(1-\\frac{5}{8x}\\right)^{20}}{\\left(1-\\frac{1}{5x}\\right)^{90}}.$$ 令 $x\\to+\\infty$，后面三个括号都趋于 $1^{\\text{幂}}=1$，极限仍为 $\\frac{3^{70}8^{20}}{5^{90}}$。这种写法把“系数”和“趋于 1 的因子”分离得很清楚，能有效防止只抓 $x$ 的幂而丢掉 $3^{70}$、$8^{20}$、$5^{90}$ 这类系数。"
    }
   ],
   "optionNotes": [
    {
     "key": "A",
     "note": "选 A（不存在）的人一看分子分母都是巨大的幂次就以为“无穷比无穷没有确定值”。但 $\\frac{\\infty}{\\infty}$ 只是未定式的**形式记号**，并不等于极限不存在：当分子分母同次时，最高次项系数之比给出一个确定的有限数，极限存在。只有左右极限不相等或振荡（如 $\\sin x$ 在 $x\\to\\infty$）才谈得上“不存在”，本题与这些情形无关。"
    },
    {
     "key": "B",
     "note": "选 B（得 $0$）是把次数数错，误以为分母次数高于分子（典型错法：只比较 $70$ 与 $90$，或只比较 $90$ 与 $90$ 之外的某个局部），于是套用“分母次数大则极限为 $0$”。实际上分子总次数是 $70+20=90$，与分母相等，属于同次而非分母高次。数次数时务必把**各因式的指数相加**，这是最容易丢分的一步。"
    },
    {
     "key": "C",
     "note": "选 C（得 $\\infty$）是犯了两类错误之一：一是误以为“指数越大增长越快”而把分母的 $90$ 次看成压倒性优势后理解反了方向——“分母增长更快”应导致极限为 $0$ 而不是 $\\infty$；二是误以为分子次数更高（例如漏掉或看错 $20$ 次因式，把分子当成 $90+20=110$ 次），从而得出 $\\infty$。正确判断是次数相等，故极限为有限常数，既不为 $0$ 也不为 $\\infty$。"
    },
    {
     "key": "D",
     "note": "选 D（$\\frac{3^{70}8^{20}}{5^{90}}$）是正确做法：先确认分子分母同为 $90$ 次，再取各自最高次项系数 $3^{70}$、$8^{20}$、$5^{90}$ 作商。注意这个选项提醒我们两件事：一是系数必须参与运算，不能只写 $x^{90}/x^{90}=1$；二是即使结果远小于 $1$（约 $3.57\\times10^{-12}$），只要它是不为 $0$ 的确定常数，就绝不是 $0$。"
    }
   ],
   "pitfalls": "本题最典型的错误是**只盯着分母的 $90$ 次、忽略分子各因式次数要相加**：分子 $(3x+6)^{70}(8x-5)^{20}$ 的总次数恰为 $70+20=90$，与分母同次，因此极限是有限非零常数而不是 $0$ 或 $\\infty$。其次常见的错误是“抓大头”时只抓 $x$ 的幂而**丢掉底数系数**，写成 $x^{90}/x^{90}=1$；正确结果必须带上 $3^{70}8^{20}/5^{90}$。此外要留意趋向方向是 $x\\to+\\infty$：本题为偶数次幂，符号无影响，但若换成 $x\\to-\\infty$ 或奇数次幂，符号与底数的符号都需要重新讨论。",
   "selfReasoning": ""
  },
  "T5-08": {
   "verdict": "ok",
   "selfAnswer": "A",
   "officialAnswer": "A",
   "transcriptionIssues": [],
   "keyIdea": "分式型 $\\frac{0}{0}$ 极限：$x \\to 7$ 且分子分母在 $x=7$ 处同时为 $0$，识别出分子分母都含有因式 $(x-7)$，约分后即可直接代入求值。",
   "steps": [
    {
     "title": "第一步：代入判断类型，确认是 $\\frac{0}{0}$ 型",
     "content": "先做最省事的检查——把 $x = 7$ 直接代进去看会发生什么。分子 $7^2 - 3 \\times 7 - 28 = 49 - 21 - 28 = 0$，分母 $7^2 - 5 \\times 7 - 14 = 49 - 35 - 14 = 0$。两个都是 $0$，说明这不是可以直接代入的普通极限，而是 $\\frac{0}{0}$ 型未定式。这一步的意义在于：$\\frac{0}{0}$ 型恰恰告诉我们分子和分母在 $x = 7$ 处都取零，由因式定理，二者都必定含有因式 $(x - 7)$——这正是后面可以约分的理由，而不是盲目地硬算。"
    },
    {
     "title": "第二步：分解因式，把公共零因子 $(x-7)$ 找出来",
     "content": "既然已确认 $(x-7)$ 是公因式，就直接因式分解验证：分子用十字相乘法，找两个数乘积为 $-28$、和为 $-3$，即 $-7$ 与 $4$，所以 $x^2 - 3x - 28 = (x - 7)(x + 4)$；分母乘积为 $-14$、和为 $-5$，即 $-7$ 与 $2$，所以 $x^2 - 5x - 14 = (x - 7)(x + 2)$。于是原式化为 $\\lim\\limits_{x \\to 7} \\frac{(x-7)(x+4)}{(x-7)(x+2)}$，公共因子 $(x-7)$ 清晰可见。"
    },
    {
     "title": "第三步：约去零因子后代入求值",
     "content": "极限过程 $x \\to 7$ 意味着 $x$ 无限接近 $7$ 但始终 $x \\neq 7$，因此 $x - 7 \\neq 0$，约分是合法的：$\\lim\\limits_{x \\to 7} \\frac{(x-7)(x+4)}{(x-7)(x+2)} = \\lim\\limits_{x \\to 7} \\frac{x+4}{x+2}$。约分后分母 $x + 2 \\to 9 \\neq 0$，不再是未定式，可以直接代入：$\\frac{7+4}{7+2} = \\frac{11}{9}$。所以答案为 $\\frac{11}{9}$，选 A。"
    }
   ],
   "optionNotes": [
    {
     "key": "B",
     "note": "为什么会选到 B：把 $x = 7$ 代入约分后的式子时算错了，例如误把分母算成 $x - 2$ 而写成 $\\frac{11}{5}$，或误以为分子约分后是 $x - 4$、得到 $\\frac{3}{5}$；更常见的是干脆放弃约分，试图用其他办法凑出整数 $4$。而实际上约分结果是 $\\frac{x+4}{x+2}$，代入 $x=7$ 得 $\\frac{11}{9}$，既不是 $4$，也不该是任何整数。"
    },
    {
     "key": "C",
     "note": "为什么会选到 C：注意到两个二次式首项系数相同、都是 $1$，就误以为「最高次项相消或相比等于 $1$」，或者误套用 $x \\to \\infty$ 时「分子分母同次则极限为最高次系数之比 $= \\frac{1}{1} = 1$」的思路并随手记成 $2$。而实际上本题是 $x \\to 7$ 的有限点极限，与 $x \\to \\infty$ 的抓大头法则完全不同，必须靠分解因式消去零因子，$2$ 只是分母分解式 $x+2$ 的常数项，不是答案。"
    },
    {
     "key": "D",
     "note": "为什么会选到 D：看到 $x = 7$ 代入后分子分母都是 $0$，就误认为「$0$ 除以 $0$ 等于 $0$」，或者在约分时只把分子乘以 $(x-7)$ 的「零」保留下来而错算了。而实际上 $\\frac{0}{0}$ 是未定式，其值由约分后的函数在 $x \\to 7$ 时的趋势决定，本题该趋势为 $\\frac{11}{9}$，绝不是 $0$。"
    }
   ],
   "pitfalls": "最典型的错误是把 $x = 7$ 代入得到 $\\frac{0}{0}$ 后就束手无策或直接写成 $0$，忘记 $\\frac{0}{0}$ 型必须通过分解因式约去公共零因子 $(x-7)$ 再求极限；其次是记混 $x \\to \\infty$ 的「最高次幂系数之比」结论，误用到有限点极限上。",
   "selfReasoning": ""
  },
  "T5-09": {
   "verdict": "ok",
   "selfAnswer": "C",
   "officialAnswer": "C",
   "transcriptionIssues": [],
   "keyIdea": "考查“局部有界”的定义：判断 $x=0$ 的任意邻域内函数的性态，关键是看 $x\\to 0$ 时函数值能否被某个常数控制，识别特征是出现 $\\frac{1}{x}$ 与 $\\cos\\frac{1}{x}$ 这类因子——分子无界、分母趋于零，只需取一列趋于 $0$ 的点代入即可判定无界。",
   "steps": [
    {
     "title": "第一步：明确“在 $x=0$ 的任何邻域内”这句话的含义",
     "content": "“$x=0$ 的任何邻域”指任意小的区间 $(-\\delta,\\delta)$（$\\delta>0$）。所谓函数在该邻域内“有界”，是指存在常数 $M>0$，使该邻域内一切 $x$ 都有 $|f(x)|\\le M$。因此只要能在任意小的邻域内找到函数值绝对值任意大的点，就能否定“有界”，从而选“无界的”。这就是本题的判别思路：不要去想象函数图像的整体形状，而是构造一列趋于 $0$ 的特殊点来检验。"
    },
    {
     "title": "第二步：取特殊点列，发现 $f$ 可以取到任意大的正值",
     "content": "令 $x_n=\\frac{1}{2n\\pi}$（$n$ 为正整数），则 $x_n\\to 0$，此时 $\\frac{1}{x_n}=2n\\pi$，而 $\\cos\\frac{1}{x_n}=\\cos 2n\\pi=1$，于是 $f(x_n)=2n\\pi\\cdot 1=2n\\pi$。当 $n\\to\\infty$ 时 $2n\\pi\\to+\\infty$。无论给定的邻域 $(-\\delta,\\delta)$ 多么小，只要 $n$ 充分大就有 $x_n\\in(-\\delta,\\delta)$，而该点处函数值已超过任何预先指定的 $M$。所以 $f$ 在 $x=0$ 的任何邻域内都不可能被一个常数控制住。"
    },
    {
     "title": "第三步：再取另一列点，说明函数还会取到任意小的负值",
     "content": "令 $y_n=\\frac{1}{(2n+1)\\pi}$，同样有 $y_n\\to 0$，此时 $\\frac{1}{y_n}=(2n+1)\\pi$，$\\cos\\frac{1}{y_n}=\\cos(2n+1)\\pi=-1$，得 $f(y_n)=-(2n+1)\\pi\\to-\\infty$。正、负两个方向都无界，进一步排除了“有界”的可能，结论明确：$f(x)=\\frac{1}{x}\\cos\\frac{1}{x}$ 在 $x=0$ 点的任何邻域内都是无界的，选 C。"
    },
    {
     "title": "第四步：附带排除单调性，确认答案唯一",
     "content": "由第二步、第三步可见 $f$ 在 $x=0$ 附近无限次振荡：$x_n$ 处取正、$y_n$ 处取负且二者交替趋于 $0$，因此函数在所考察的邻域内既不可能单调增加也不可能单调减少。这样 A、B、D 都被排除，只有 C 成立。"
    }
   ],
   "optionNotes": [
    {
     "key": "A",
     "note": "选 A 的人把“有界”与“函数值振荡、在 $[-1,1]$ 之内变化”混为一谈，只注意到因子 $\\cos\\frac{1}{x}$ 有界。但前面的因子 $\\frac{1}{x}$ 在 $x\\to 0$ 时趋于无穷，会把这个振荡放大到无穷：在 $x_n=\\frac{1}{2n\\pi}$ 处 $f(x_n)=2n\\pi$ 无界，所以 A 错。这与记录中“我的答案”A 一致，属于典型的忽略无穷大因子的错误。"
    },
    {
     "key": "B",
     "note": "选 B 的人误以为 $\\frac{1}{x}$ 在正半轴“分母越大值越小”就推出递减。事实上 $x\\to 0$ 时函数符号不断改变且取值在 $\\pm\\infty$ 之间剧烈振荡（$x_n$ 处为正、$y_n$ 处为负），根本不存在“随 $x$ 增大而减小”的单调整体趋势，故 B 错。"
    },
    {
     "key": "D",
     "note": "选 D 的人与选 B 的人犯了同类错误，只是把方向想反了。在 $x=0$ 的任意邻域内函数值反复穿越正负，两点 $x_n,y_n$ 处函数值一正一负且可随意取值，不满足单调增加的定义，故 D 错。"
    }
   ],
   "pitfalls": "最典型的错误是“只见 $\\cos$ 有界、不见 $\\frac{1}{x}$ 无界”，误把 $f(x)=\\frac{1}{x}\\cos\\frac{1}{x}$ 当成有界函数而选 A。规避方法是牢记“局部有界”的严格定义，并主动取一列趋于 $0$ 的点（如 $x_n=\\frac{1}{2n\\pi}$）代值检验；另外要防止把单调性与振荡性混淆。",
   "selfReasoning": ""
  },
  "T5-10": {
   "verdict": "ok",
   "selfAnswer": "C",
   "officialAnswer": "C",
   "transcriptionIssues": [],
   "keyIdea": "含参数 $n$ 的极限定义的函数（极限函数），须按底数 $x^{2n}$ 的极限结果对 $|x|$ 分段讨论求出 $f(x)$ 的分段表达式，再在分界点 $x=\\pm 1$ 处用左右极限判断间断点。",
   "steps": [
    {
     "title": "第一步：判断类型——$n$ 是极限变量，$x$ 才是函数自变量",
     "content": "题中 $f(x)=\\lim\\limits_{n \\to \\infty}\\dfrac{1+x}{1+x^{2n}}$ 的极限变量是 $n$，而 $x$ 是固定的参数（也就是最终的自变量）。因此不能把 $x$ 当成趋向某个值，而应把 $x$ 看作常数，先算出这个关于 $n$ 的极限。整个式子的\"变化部分\"只有分母中的 $x^{2n}$，于是关键是判断 $x^{2n}$ 当 $n\\to\\infty$ 时的归属，这取决于 $|x|$ 与 $1$ 的大小关系，所以必须按 $|x|<1$、$|x|=1$、$|x|>1$ 分类讨论。"
    },
    {
     "title": "第二步：分区间求极限，写出 $f(x)$ 的分段表达式",
     "content": "当 $|x|<1$ 时，$x^{2n}\\to 0$，分母趋于 $1$，故 $f(x)=\\dfrac{1+x}{1}=1+x$。当 $|x|>1$ 时，$x^{2n}\\to +\\infty$，分子是有界量 $1+x$ 而分母无穷大，故 $f(x)=0$。当 $|x|=1$ 时要单独算：$x=1$ 时 $x^{2n}=1$，$f(1)=\\dfrac{1+1}{2}=1$；$x=-1$ 时 $x^{2n}=1$，$f(-1)=\\dfrac{1-1}{2}=0$。合并得 $$f(x)=\\begin{cases}0, & |x|>1,\\\\ 1+x, & |x|<1,\\\\ 1, & x=1,\\\\ 0, & x=-1.\\end{cases}$$ 注意 $x=\\pm1$ 之所以要单独讨论，是因为只有这两点 $|x|$ 不落在开区间内，$x^{2n}$ 的极限类型发生了切换。"
    },
    {
     "title": "第三步：只在分界点检验连续性，用左右极限判定间断点",
     "content": "在 $|x|\\ne 1$ 的内部区域，$f$ 分别等于 $0$（常数）与 $1+x$（一次多项式），都连续，所以间断点只可能出现在两段的分界点 $x=1$ 与 $x=-1$。在 $x=-1$ 处：$\\lim\\limits_{x\\to-1}f(x)=0=f(-1)$，连续，不是间断点；在 $x=1$ 处：左极限 $\\lim\\limits_{x\\to1^{-}}f(x)=\\lim\\limits_{x\\to1^{-}}(1+x)=2$，而右极限 $\\lim\\limits_{x\\to1^{+}}f(x)=0$，左右极限都存在但不相等，属于跳跃间断点（第一类间断点），故 $f$ 有唯一间断点 $x=1$。"
    }
   ],
   "optionNotes": [
    {
     "key": "A",
     "note": "选 A 的人只看到 $x=1$ 是分界点，就把 \"分界点\" 与 $x=-1$ 混为一谈，或以为 $f(-1)=\\dfrac{1-1}{2}=0$ 与附近取值不同。实际上在 $x=-1$ 的邻域内，左侧 $f(x)=0$（$x<-1$）、右侧 $f(x)=1+x\\to0$（$-1<x<1$），且 $f(-1)=0$，左右极限都等于 $0$，与函数值相等，故 $x=-1$ 连续、不是间断点。"
    },
    {
     "key": "B",
     "note": "选 B 是最典型的错误：只逐点算出 $f(1)=1$、$f(-1)=0$，觉得取值都是有限数，就默认 $f$ 处处连续；或者算 $x\\to1$ 的极限时直接代入分段中的 $1+x$ 得到 $2$，却拿它和 $f(1)=1$ 比较后误判为 \"相等\" 而放过。关键是 $x=1$ 是分段函数的分界点，必须分别算左极限（$2$）与右极限（$0$），二者不等即间断，故 \"不存在间断点\" 不成立。"
    },
    {
     "key": "D",
     "note": "选 D 的人多半是被 $x^{2n}$ 中的指数带偏，以为 $x=0$ 会出问题（分母为 $0$ 或出现 $0^0$）。实际上当 $x=0$ 时 $0^{2n}=0$，分母为 $1$，$f(0)=1+0=1$；且 $x=0$ 位于 $|x|<1$ 的内部，$f=1+x$ 在 $0$ 的邻域内连续，所以 $x=0$ 不是间断点。"
    }
   ],
   "pitfalls": "最典型的错误是把极限变量 $n$ 与自变量 $x$ 的位置搞反：不去按 $|x|$ 与 $1$ 的大小分段求极限函数，而是试图直接对 $x$ 取极限或直接代入 $x=1$，从而漏掉 $x=1$ 处左右极限为 $2$ 与 $0$ 的跳跃；其次是只算出 $|x|<1$ 的表达式 $1+x$，忘记 $|x|>1$ 与 $|x|=1$ 三种情形要分开讨论。",
   "selfReasoning": ""
  }
 }
};

export default BANK;
