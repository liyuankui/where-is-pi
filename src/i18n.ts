/**
 * 双语文案（F7）：zh-CN / en。
 * 漏 key：en 缺失回退 zh，zh 缺失回退 key 本身，不崩。
 * F9：文案中的 $...$ 由 texHydrate 查预渲染表替换为 KaTeX HTML。
 */
import { texHydrate } from "./tex";

export type Lang = "zh" | "en";

const zh = {
  "app.title": "拼出一个 π",
  "app.subtitle": "两个「看不见 π」的数，能相加等于 π 吗？",
  "app.footer": "where-is-pi · 纯静态单文件 · 无网络请求",
  "lang.toggle": "EN", // zh 界面下显示的目标语言

  "nav.cake": "切蛋糕",
  "nav.ladder": "莱布尼茨爬梯",
  "nav.quiz": "出题",

  "cake.h2": "切蛋糕",
  "cake.sub":
    "$\\int_0^1 \\frac{4}{1+x^2}\\,dx = \\pi$。拖动切点 $c$，把 $\\pi$ 切成两块——无论怎么切，两块拼回来恒是 $\\pi$。",
  "cake.k.c": "$c$",
  "cake.k.A": "$A$（红）",
  "cake.k.B": "$B$（蓝）",
  "cake.k.sum": "$A + B$",
  "cake.k.pi": "$\\pi$（对照）",
  "cake.clabel": "切点 c = ",

  "lad.h2": "莱布尼茨爬梯",
  "lad.sub":
    "$\\pi/4 = 1 - 1/3 + 1/5 - 1/7 - \\cdots$　没有任何一项含 $\\pi$。奇数项从上方压下来，偶数项从下方顶上去，一步步把 $\\pi$ 勒出来。",
  "lad.plus1": "+1 项",
  "lad.plus10": "+10 项",
  "lad.plus100": "+100 项",
  "lad.auto": "自动步进",
  "lad.auto.pause": "暂停",
  "lad.reset": "重置",
  "lad.k.n": "已加项数",
  "lad.k.next": "下一项",
  "lad.k.S": "部分和 $S_n$",
  "lad.k.diff": "$S_n - \\pi$",
  "lad.empty": "（尚未开始）",

  "quiz.h2": "出题",
  "quiz.question": "你能造出两个与 π 无关的正数，使它们相加恰好等于 π 吗？",
  "quiz.sub":
    "「与 π 无关」指：定义式中不出现 π、三角函数或任何超越常数——只用整数、有理数与平方。把你的答案写在下面，然后揭晓。",
  "quiz.placeholder": "写下你的构造……（例如：1.5 和 π − 1.5 算不算？）",
  "quiz.btn": "揭晓答案",
  "quiz.btn.again": "再想想，重新作答",
  "quiz.badnews":
    "<b>先说坏消息：</b>如果你的两个数都是「与 π 无关」的代数数（整数、有理数、根式都是代数数），那么<b>严格不可能</b>。",
  "quiz.reveal.title1": "为什么不可能——超越数定理",
  "quiz.reveal.body1":
    "$\\pi$ 是<b>超越数</b>（林德曼，1882）：它不是任何整系数多项式方程的根。而代数数构成一个域——两个代数数相加，结果仍是代数数。所以两个代数数之和永远是代数数，永远到不了 $\\pi$。这不是「很难」，是<b>被定理判了死刑</b>。像 1.5 和 $\\pi - 1.5$ 这样的答案，后者本身就含 $\\pi$，作弊了。",
  "quiz.reveal.title2": "第一招：积分切蛋糕",
  "quiz.reveal.body2":
    "$\\int_0^1 \\frac{4}{1+x^2}\\,dx = \\pi$。定义里只有整数 4 和平方。在任意点 $c$ 切开：$A = \\int_0^c \\frac{4}{1+x^2}\\,dx$，$B = \\int_c^1 \\frac{4}{1+x^2}\\,dx$。$A$ 与 $B$ 的数值一般来说是「无名」的数——但相加恰等于 $\\pi$。（数学诚实提示：$A$、$B$ 的精确值其实是 $4\\arctan(c)$ 与 $4\\arctan$ 的差，本质上仍是 $\\pi$ 的化身；「伪装」正在于此。）",
  "quiz.reveal.title3": "第二招：莱布尼茨级数",
  "quiz.reveal.body3":
    "$\\pi/4 = 1 - 1/3 + 1/5 - 1/7 - \\cdots$　每一项都只是有理数。取奇数个项的部分和 $S_{2k+1}$ 总在 $\\pi$ 上方，偶数个项的 $S_{2k}$ 总在 $\\pi$ 下方，两者从两侧夹逼 $\\pi$——而任何有限部分和本身都不是 $\\pi$。",
  "quiz.reveal.close": "去「切蛋糕」和「莱布尼茨爬梯」亲手玩玩这两招吧。",

  "nav.why": "为什么",
  "why.h2": "为什么？",
  "why.intro":
    "玩过切蛋糕和爬梯，你可能已经隐约感到：π 藏得比想象中深。这一页把玩具背后的数学摊开讲——从玩到懂，一共五步。",

  "why.toc.label": "本页目录",
  "why.t1": "一、数的两层楼",
  "why.t2": "二、两千年悬案落幕",
  "why.t3": "三、伪装把戏的诚实拆解",
  "why.t4": "四、进阶彩蛋",
  "why.t5": "五、术语小词典",

  "why.s1.title": "一、数的两层楼",
  "why.s1.p1":
    "数学把实数分成两层楼。一楼是<b>代数数</b>：能成为某个整系数多项式方程根的数。3、1/2、$\\sqrt{2}$、$(\\sqrt{5}-1)/2$——整数、分数、根式全是。二楼是<b>超越数</b>：不属于任何整系数多项式的根。一楼很大（可数无穷个），二楼更大（不可数），但二楼住客大多「无名」，叫得出名字的几乎都在一楼。",
  "why.s1.p2":
    "一楼是个封闭俱乐部：任意两个代数数做加、减、乘、除（除数非零），结果仍是代数数——代数数构成一个<b>域</b>。根号套根号也出不了圈：$\\sqrt{1+\\sqrt{2}}$ 照样是某个整系数方程的根。",
  "why.s1.p3":
    "而 $\\pi$ 住在二楼（Lindemann，1882）。于是定理宣判：两个代数数相加，和还是代数数，永远爬不上一楼之外的 $\\pi$。这不是「很难找到」，是<b>被证明不存在</b>。",

  "why.s2.title": "二、两千年悬案落幕",
  "why.s2.p1":
    "<b>1761 年，Lambert</b> 证明 $\\pi$ 是无理数——$\\pi$ 连两个整数之比都不是。方法是把 $\\tan x$ 展开成连分数：若 $x$ 是非零有理数，则 $\\tan x$ 必是无理数；而 $\\tan(\\pi/4) = 1$ 是有理数，故 $\\pi/4$ 无理，$\\pi$ 无理。",
  "why.s2.p2":
    "<b>1873 年，Hermite</b> 证明 $e$ 是超越数。<b>1882 年，Lindemann</b> 把这套武器推向更远（现称 Hermite–Lindemann 定理：非零代数数 $\\alpha$ 的 $e^{\\alpha}$ 必超越），证明 $\\pi$ 也是超越数：若 $\\pi$ 代数，则 $i\\pi$ 代数非零，$e^{i\\pi}$ 应为超越数——但欧拉公式说 $e^{i\\pi} = -1$，是代数数，矛盾。",
  "why.s2.p3":
    "超越性顺带终结了一桩两千年的悬案：<b>化圆为方</b>——只用尺规作一个面积等于给定圆的正方形。尺规能作出的长度只能是代数数（这一点 Wantzel 1837 年已证），而作正方形面积等于 $\\pi r^2$ 需要作出长度 $\\sqrt{\\pi}$，$\\pi$ 既超越，$\\sqrt{\\pi}$ 也超越——不可能。从古希腊到 1882 年，无数人为它耗尽笔墨，最后由一个「不可能定理」合上卷宗。",

  "why.s3.title": "三、伪装把戏的诚实拆解",
  "why.s3.p1":
    "切蛋糕的把戏值得诚实交代：$A(c) = \\int_0^c \\frac{4}{1+x^2}\\,dx$ 的精确值是 $4\\arctan(c)$。定义里确实只有整数和平方，但 $\\arctan$ 的值域由 $\\pi$ 标定——它就是 $\\pi$ 的化身。$B$ 同理。所谓「两个看不见 $\\pi$ 的数」，灵魂深处仍然是 $\\pi$。",
  "why.s3.p2":
    "莱布尼茨级数也一样：每个<b>有限</b>部分和都是有理数，与 $\\pi$ 无关；但那个「拆出来的另一半」是无穷尾巴，而无穷尾巴的和正是 $\\pi/4$ 的余项。伪装在于「有限看得见、无限藏着 $\\pi$」。",
  "why.s3.p3":
    "所以这个玩具的真正惊喜不是「绕过了定理」——定理从未被绕过——而是：$\\pi$ 虽然在<b>代数</b>世界里无处容身，却在<b>分析</b>（积分、级数、极限）世界里无处不在。伪装的乐趣，正在于让你亲手摸到这条边界线。",

  "why.s4.title": "四、进阶彩蛋",
  "why.s4.p1":
    "<b>e 的平行伪装。</b>$e = 1 + 1/1! + 1/2! + 1/3! + \\cdots$ 同样可以「切」：前 3 项 $= 2.5$，干净的有理数；尾巴 $= e - 2.5 \\approx 0.21828\\ldots$，一个超越数。任何可计算超越数都能玩这套把戏（见下方小演示）。",
  "why.s4.p2":
    "<b>e+π 与 e·π：悬而未决。</b>数学家强烈相信两者都是超越数，但至今连「是无理数」都没证明。已知的是：它们不可能<b>同时</b>是有理数——若 $e+\\pi$ 与 $e\\pi$ 都有理，则 $e$、$\\pi$ 是同一个整系数二次方程 $x^2 - (e+\\pi)x + e\\pi = 0$ 的根，都是代数数，矛盾。彻底解决它的一条路是著名的 Schanuel 猜想（1960s）。顺带：$e^{\\pi}$（格尔丰德常数）的超越性<b>已经</b>被证明（Gelfond，1929）。",
  "why.s4.p3":
    "<b>高斯积分：e 与 π 相认。</b>$\\int_{-\\infty}^{\\infty} e^{-x^2}\\,dx = \\sqrt{\\pi}$。钟形曲线下面积竟然长出 $\\pi$——这就是为什么正态分布的公式里处处是 $\\pi$。$e$ 与 $\\pi$ 在代数上形同陌路（猜想彼此代数无关），在分析学深处却是一家人。",
  "why.s4.p4":
    "<b>柴廷常数 Ω：连伪装都不行。</b>存在这样的超越数：没有算法能逐位算出它（不可计算数）。对它，别说「两个代数数相加」，连「写出一个逼近它的级数」都做不到。$\\pi$ 的可贵之处反衬出来：它超越，但<b>可计算</b>——所以才能被我们这样玩。",

  "why.s5.title": "五、术语小词典",
  "why.g.algebraic": "<b>代数数</b>：某个整系数多项式方程的根。整数、分数、根式都是。",
  "why.g.transcendental": "<b>超越数</b>：不是任何整系数多项式方程的根的实数。π、e、格尔丰德常数都是。",
  "why.g.indep": "<b>代数无关</b>：一组数之间不存在任何整系数多项式关系。e 与 π 被猜想代数无关，尚未证明。",
  "why.g.computable": "<b>可计算数</b>：存在算法能把它算到任意精度的数。π、e 是；柴廷常数 Ω 不是。",

  "why.e.title": "小演示：亲手切 e",
  "why.e.sub": "$e = 1 + 1/1! + 1/2! + 1/3! + \\cdots$（高精度计算，前 3 项是有理数 2.5，尾巴是超越数）",
  "why.e.k.e": "$e$（前 40 项逼近）",
  "why.e.k.head": "前 3 项（有理数）",
  "why.e.k.tail": "尾巴 $e - 2.5$（超越数）",
  "why.e.close": "把「切蛋糕」玩到这里：同一个把戏，换个超越数照样成立。",
} as const;

export type MsgKey = keyof typeof zh;

const en: Record<MsgKey, string> = {
  "app.title": "Build π Without π",
  "app.subtitle": "Can two numbers that never mention π add up to π?",
  "app.footer": "where-is-pi · static single file · no network requests",
  "lang.toggle": "中", // en 界面下显示的目标语言

  "nav.cake": "Slice the Cake",
  "nav.ladder": "The Leibniz Ladder",
  "nav.quiz": "Pop Quiz",

  "cake.h2": "Slice the Cake",
  "cake.sub":
    "$\\int_0^1 \\frac{4}{1+x^2}\\,dx = \\pi$. Drag the cut point $c$ to slice $\\pi$ in two — however you cut it, the two pieces always reassemble into exactly $\\pi$.",
  "cake.k.c": "$c$",
  "cake.k.A": "$A$ (red)",
  "cake.k.B": "$B$ (blue)",
  "cake.k.sum": "$A + B$",
  "cake.k.pi": "$\\pi$ (reference)",
  "cake.clabel": "cut c = ",

  "lad.h2": "The Leibniz Ladder",
  "lad.sub":
    "$\\pi/4 = 1 - 1/3 + 1/5 - 1/7 - \\cdots$  Not a single term contains $\\pi$. Odd partial sums press down from above, even ones push up from below — $\\pi$ gets squeezed out, one step at a time.",
  "lad.plus1": "+1 term",
  "lad.plus10": "+10 terms",
  "lad.plus100": "+100 terms",
  "lad.auto": "Auto-step",
  "lad.auto.pause": "Pause",
  "lad.reset": "Reset",
  "lad.k.n": "Terms so far",
  "lad.k.next": "Next term",
  "lad.k.S": "Partial sum $S_n$",
  "lad.k.diff": "$S_n - \\pi$",
  "lad.empty": "(not started yet)",

  "quiz.h2": "Pop Quiz",
  "quiz.question":
    "Can you build two positive numbers that have nothing to do with π, yet add up to exactly π?",
  "quiz.sub":
    "\"Nothing to do with π\" means their definitions contain no π, no trigonometric functions, no transcendental constants — only integers, rationals, and squares. Write your attempt below, then reveal the answer.",
  "quiz.placeholder": "Write down your construction… (e.g., do 1.5 and π − 1.5 count?)",
  "quiz.btn": "Reveal the answer",
  "quiz.btn.again": "Rethink and answer again",
  "quiz.badnews":
    "<b>Bad news first:</b> if both of your numbers are algebraic numbers \"unrelated to π\" (integers, rationals, and radicals are all algebraic), then it is <b>strictly impossible</b>.",
  "quiz.reveal.title1": "Why it's impossible — the transcendence of π",
  "quiz.reveal.body1":
    "$\\pi$ is a <b>transcendental number</b> (Lindemann, 1882): it is not a root of any polynomial equation with integer coefficients. And the algebraic numbers form a field — the sum of two algebraic numbers is always algebraic. So the sum of two algebraic numbers can never reach $\\pi$. This isn't \"very hard\"; it's <b>ruled out by a theorem</b>. An answer like 1.5 and $\\pi - 1.5$ is cheating: the latter contains $\\pi$ itself.",
  "quiz.reveal.title2": "Trick #1: slice the integral",
  "quiz.reveal.body2":
    "$\\int_0^1 \\frac{4}{1+x^2}\\,dx = \\pi$. The definition involves nothing but the integer 4 and a square. Cut at any point $c$: $A = \\int_0^c \\frac{4}{1+x^2}\\,dx$, $B = \\int_c^1 \\frac{4}{1+x^2}\\,dx$. Neither $A$ nor $B$ is a number with a familiar name — yet they add up to exactly $\\pi$. (Honesty note: $A$ and $B$ are really $4\\arctan(c)$ and its complement — $\\pi$ in disguise; that's precisely the trick.)",
  "quiz.reveal.title3": "Trick #2: the Leibniz series",
  "quiz.reveal.body3":
    "$\\pi/4 = 1 - 1/3 + 1/5 - 1/7 - \\cdots$  Every term is a plain rational number. The odd partial sums $S_{2k+1}$ always sit above $\\pi$, the even ones $S_{2k}$ always below, squeezing $\\pi$ from both sides — while no finite partial sum ever equals $\\pi$.",
  "quiz.reveal.close":
    "Go try both tricks yourself in \"Slice the Cake\" and \"The Leibniz Ladder\".",

  "nav.why": "Why?",
  "why.h2": "Why?",
  "why.intro":
    "Having played with the cake and the ladder, you may sense it already: π hides deeper than expected. This page lays out the mathematics behind the toy — from playing to understanding, in five steps.",

  "why.toc.label": "On this page",
  "why.t1": "1. The Two Floors of Numbers",
  "why.t2": "2. A Two-Thousand-Year Case, Closed",
  "why.t3": "3. An Honest Confession about the Disguises",
  "why.t4": "4. Going Deeper",
  "why.t5": "5. A Pocket Glossary",

  "why.s1.title": "1. The Two Floors of Numbers",
  "why.s1.p1":
    "Mathematicians sort the real numbers into two floors. Ground floor: <b>algebraic numbers</b> — numbers that are roots of polynomial equations with integer coefficients. 3, 1/2, $\\sqrt{2}$, $(\\sqrt{5}-1)/2$ — integers, fractions, radicals all live here. Upper floor: <b>transcendental numbers</b> — numbers that satisfy no such equation. The ground floor is vast (countably many), the upper floor vaster still (uncountably many) — yet almost every number you can name lives on the ground floor.",
  "why.s1.p2":
    "The ground floor is a closed club: add, subtract, multiply, or divide any two algebraic numbers (division by nonzero), and the result is again algebraic — the algebraic numbers form a <b>field</b>. Even nested radicals stay inside: $\\sqrt{1+\\sqrt{2}}$ is still the root of some integer-coefficient equation.",
  "why.s1.p3":
    "And $\\pi$ lives upstairs (Lindemann, 1882). Hence the verdict: the sum of two algebraic numbers is algebraic, and can never climb up to $\\pi$. Not \"hard to find\" — <b>proven not to exist</b>.",

  "why.s2.title": "2. A Two-Thousand-Year Case, Closed",
  "why.s2.p1":
    "<b>In 1761, Lambert</b> proved $\\pi$ irrational — not even a ratio of two integers. His tool: expanding $\\tan x$ as a continued fraction, which shows that a nonzero rational $x$ makes $\\tan x$ irrational; since $\\tan(\\pi/4) = 1$ is rational, $\\pi/4$ must be irrational, hence so is $\\pi$.",
  "why.s2.p2":
    "<b>In 1873, Hermite</b> proved $e$ transcendental. <b>In 1882, Lindemann</b> pushed the same machinery further (now the Hermite–Lindemann theorem: $e^{\\alpha}$ is transcendental for every nonzero algebraic $\\alpha$) and proved $\\pi$ transcendental: if $\\pi$ were algebraic, then $i\\pi$ would be nonzero algebraic, so $e^{i\\pi}$ would have to be transcendental — but Euler's identity says $e^{i\\pi} = -1$, which is algebraic. Contradiction.",
  "why.s2.p3":
    "Transcendence also closed a two-thousand-year-old case: <b>squaring the circle</b> — constructing, with ruler and compass alone, a square whose area equals a given circle's. Ruler-and-compass can only construct algebraic lengths (shown by Wantzel in 1837); matching areas would require constructing $\\sqrt{\\pi}$, and if $\\pi$ is transcendental then so is $\\sqrt{\\pi}$ — impossible. From ancient Greece to 1882, countless people poured ink into it, until an impossibility theorem finally closed the file.",

  "why.s3.title": "3. An Honest Confession about the Disguises",
  "why.s3.p1":
    "The cake trick deserves an honest confession: $A(c) = \\int_0^c \\frac{4}{1+x^2}\\,dx$ is exactly $4\\arctan(c)$. The definition indeed contains only integers and a square — but $\\arctan$'s very scale is set by $\\pi$. It is $\\pi$ in disguise. Same for $B$.",
  "why.s3.p2":
    "The Leibniz series too: every <b>finite</b> partial sum is rational, unrelated to $\\pi$; but the \"other half\" of the split is an infinite tail, and that tail sums to the remainder of $\\pi/4$. The disguise works because the finite part is visible while $\\pi$ hides inside the infinite.",
  "why.s3.p3":
    "So the real surprise is not that we \"beat the theorem\" — the theorem was never beaten — but this: $\\pi$ has no home in the world of <b>algebra</b>, yet is everywhere in the world of <b>analysis</b> (integrals, series, limits). The fun of the disguise is letting you touch that boundary with your own hands.",

  "why.s4.title": "4. Going Deeper",
  "why.s4.p1":
    "<b>The parallel disguise for e.</b> $e = 1 + 1/1! + 1/2! + 1/3! + \\cdots$ can be \"sliced\" the same way: the first 3 terms make 2.5, a clean rational; the tail, $e - 2.5 \\approx 0.21828\\ldots$, is transcendental. Every computable transcendental number can play this game (see the little demo below).",
  "why.s4.p2":
    "<b>e+π and e·π: still open.</b> Mathematicians strongly believe both are transcendental, yet no one has even proved them irrational. What is known: they cannot <b>both</b> be rational — if $e+\\pi$ and $e\\pi$ were rational, then $e$ and $\\pi$ would be the two roots of the integer-coefficient quadratic $x^2 - (e+\\pi)x + e\\pi = 0$, hence algebraic: contradiction. One road to a full answer is the famous Schanuel's conjecture (1960s). For the record: the transcendence of $e^{\\pi}$ (Gelfond's constant) <b>has</b> been proved (Gelfond, 1929).",
  "why.s4.p3":
    "<b>The Gaussian integral: e meets π.</b> $\\int_{-\\infty}^{\\infty} e^{-x^2}\\,dx = \\sqrt{\\pi}$. The area under the bell curve grows a $\\pi$ — which is why $\\pi$ litters the formulas of the normal distribution. Algebraically, $e$ and $\\pi$ are suspected strangers to each other (conjectured algebraically independent); deep down in analysis, they are family.",
  "why.s4.p4":
    "<b>Chaitin's constant Ω: no disguise possible.</b> There exist transcendental numbers that no algorithm can compute digit by digit (uncomputable numbers). For them, forget \"two algebraic numbers adding up\" — you cannot even write down a series that approaches one. Which makes $\\pi$ all the more precious: transcendental, yet <b>computable</b> — and that is exactly why we get to play with it like this.",

  "why.s5.title": "5. A Pocket Glossary",
  "why.g.algebraic":
    "<b>Algebraic number</b>: a root of some polynomial equation with integer coefficients. Integers, fractions, and radicals all qualify.",
  "why.g.transcendental":
    "<b>Transcendental number</b>: a real number that is the root of no integer-coefficient polynomial. π, e, and Gelfond's constant all qualify.",
  "why.g.indep":
    "<b>Algebraic independence</b>: no integer-coefficient polynomial relation connects a set of numbers. e and π are conjectured to be algebraically independent — still unproved.",
  "why.g.computable":
    "<b>Computable number</b>: a number that some algorithm can compute to any desired precision. π and e are; Chaitin's constant Ω is not.",

  "why.e.title": "Mini demo: slice e yourself",
  "why.e.sub": "$e = 1 + 1/1! + 1/2! + 1/3! + \\cdots$ (high-precision: the first 3 terms give the rational 2.5; the tail is transcendental)",
  "why.e.k.e": "$e$ (first 40 terms)",
  "why.e.k.head": "First 3 terms (rational)",
  "why.e.k.tail": "Tail $e - 2.5$ (transcendental)",
  "why.e.close": "Same trick as \"Slice the Cake\" — swap in another transcendental, and it still works.",
};

const dicts: Record<Lang, Partial<Record<MsgKey, string>>> = { zh, en };

/** 供 locale 完整性测试使用 */
export const zhDict: Record<MsgKey, string> = { ...zh };
export const enDict: Record<MsgKey, string> = { ...en };

let lang: Lang = "zh";

export function t(key: MsgKey): string {
  return dicts[lang][key] ?? zh[key] ?? key;
}

export function getLang(): Lang {
  return lang;
}

export function detectLang(): Lang {
  // 优先级：?lang= → localStorage → navigator.language
  try {
    const p = new URLSearchParams(window.location.search).get("lang");
    if (p === "en" || p === "zh") return p;
  } catch { /* no window */ }
  try {
    const saved = localStorage.getItem("lang");
    if (saved === "en" || saved === "zh") return saved;
  } catch { /* file:// 等环境可能禁 localStorage */ }
  try {
    if (navigator.language?.toLowerCase().startsWith("zh")) return "zh";
  } catch { /* no navigator */ }
  return "en";
}

export function setLang(l: Lang, persist = true) {
  lang = l;
  if (persist) {
    try {
      localStorage.setItem("lang", l);
    } catch { /* 忽略 */ }
  }
  applyDom();
  if (typeof window !== "undefined") window.dispatchEvent(new Event("langchange"));
}

/** 将 data-i18n / data-i18n-html / data-i18n-placeholder 标注的静态文案刷到 DOM */
export function applyDom() {
  if (typeof document === "undefined") return; // 测试环境无 DOM
  document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  document.title = t("app.title");
  document.querySelectorAll<HTMLElement>("[data-i18n]").forEach((el) => {
    const s = t(el.dataset.i18n as MsgKey);
    if (s.includes("$")) el.innerHTML = texHydrate(s); // 含公式时走 HTML 路径
    else el.textContent = s;
  });
  document.querySelectorAll<HTMLElement>("[data-i18n-html]").forEach((el) => {
    el.innerHTML = texHydrate(t(el.dataset.i18nHtml as MsgKey));
  });
  document.querySelectorAll<HTMLElement>("[data-i18n-placeholder]").forEach((el) => {
    el.setAttribute("placeholder", t(el.dataset.i18nPlaceholder as MsgKey));
  });
}
