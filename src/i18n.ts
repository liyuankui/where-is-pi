/**
 * 双语文案（F7）：zh-CN / en。
 * 漏 key：en 缺失回退 zh，zh 缺失回退 key 本身，不崩。
 */

export type Lang = "zh" | "en";

const zh = {
  "app.title": "π 在哪里？",
  "app.subtitle": "两个「看不见 π」的数，能相加等于 π 吗？",
  "app.footer": "where-is-pi · 纯静态单文件 · 无网络请求",
  "lang.toggle": "EN", // zh 界面下显示的目标语言

  "nav.cake": "切蛋糕",
  "nav.ladder": "莱布尼茨爬梯",
  "nav.quiz": "出题",

  "cake.h2": "切蛋糕",
  "cake.sub":
    "∫₀¹ 4/(1+x²) dx = π。拖动切点 c，把 π 切成两块——无论怎么切，两块拼回来恒是 π。",
  "cake.k.c": "c",
  "cake.k.A": "A（红）",
  "cake.k.B": "B（蓝）",
  "cake.k.sum": "A + B",
  "cake.k.pi": "π（对照）",
  "cake.clabel": "切点 c = ",

  "lad.h2": "莱布尼茨爬梯",
  "lad.sub":
    "π/4 = 1 − 1/3 + 1/5 − 1/7 + …　没有任何一项含 π。奇数项从上方压下来，偶数项从下方顶上去，一步步把 π 勒出来。",
  "lad.plus1": "+1 项",
  "lad.plus10": "+10 项",
  "lad.plus100": "+100 项",
  "lad.auto": "自动步进",
  "lad.auto.pause": "暂停",
  "lad.reset": "重置",
  "lad.k.n": "已加项数",
  "lad.k.next": "下一项",
  "lad.k.S": "部分和 Sₙ",
  "lad.k.diff": "Sₙ − π",
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
    "π 是<b>超越数</b>（林德曼，1882）：它不是任何整系数多项式方程的根。而代数数构成一个域——两个代数数相加，结果仍是代数数。所以两个代数数之和永远是代数数，永远到不了 π。这不是「很难」，是<b>被定理判了死刑</b>。像 1.5 和 π − 1.5 这样的答案，后者本身就含 π，作弊了。",
  "quiz.reveal.title2": "第一招：积分切蛋糕",
  "quiz.reveal.body2":
    "∫₀¹ 4/(1+x²) dx = π。定义里只有整数 4 和平方。在任意点 c 切开：A = ∫₀ᶜ 4/(1+x²) dx，B = ∫꜀¹ 4/(1+x²) dx。A 与 B 的数值一般来说是「无名」的数——但相加恰等于 π。（数学诚实提示：A、B 的精确值其实是 4·arctan(c) 与 4·arctan 的差，本质上仍是 π 的化身；「伪装」正在于此。）",
  "quiz.reveal.title3": "第二招：莱布尼茨级数",
  "quiz.reveal.body3":
    "π/4 = 1 − 1/3 + 1/5 − 1/7 + …　每一项都只是有理数。取奇数个项的部分和 S₂ₖ₊₁ 总在 π 上方，偶数个项的 S₂ₖ 总在 π 下方，两者从两侧夹逼 π——而任何有限部分和本身都不是 π。",
  "quiz.reveal.close": "去「切蛋糕」和「莱布尼茨爬梯」亲手玩玩这两招吧。",
} as const;

export type MsgKey = keyof typeof zh;

const en: Record<MsgKey, string> = {
  "app.title": "Where Is π?",
  "app.subtitle": "Can two numbers that never mention π add up to π?",
  "app.footer": "where-is-pi · static single file · no network requests",
  "lang.toggle": "中", // en 界面下显示的目标语言

  "nav.cake": "Slice the Cake",
  "nav.ladder": "The Leibniz Ladder",
  "nav.quiz": "Pop Quiz",

  "cake.h2": "Slice the Cake",
  "cake.sub":
    "∫₀¹ 4/(1+x²) dx = π. Drag the cut point c to slice π in two — however you cut it, the two pieces always reassemble into exactly π.",
  "cake.k.c": "c",
  "cake.k.A": "A (red)",
  "cake.k.B": "B (blue)",
  "cake.k.sum": "A + B",
  "cake.k.pi": "π (reference)",
  "cake.clabel": "cut c = ",

  "lad.h2": "The Leibniz Ladder",
  "lad.sub":
    "π/4 = 1 − 1/3 + 1/5 − 1/7 + …  Not a single term contains π. Odd partial sums press down from above, even ones push up from below — π gets squeezed out, one step at a time.",
  "lad.plus1": "+1 term",
  "lad.plus10": "+10 terms",
  "lad.plus100": "+100 terms",
  "lad.auto": "Auto-step",
  "lad.auto.pause": "Pause",
  "lad.reset": "Reset",
  "lad.k.n": "Terms so far",
  "lad.k.next": "Next term",
  "lad.k.S": "Partial sum Sₙ",
  "lad.k.diff": "Sₙ − π",
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
    "π is a <b>transcendental number</b> (Lindemann, 1882): it is not a root of any polynomial equation with integer coefficients. And the algebraic numbers form a field — the sum of two algebraic numbers is always algebraic. So the sum of two algebraic numbers can never reach π. This isn't \"very hard\"; it's <b>ruled out by a theorem</b>. An answer like 1.5 and π − 1.5 is cheating: the latter contains π itself.",
  "quiz.reveal.title2": "Trick #1: slice the integral",
  "quiz.reveal.body2":
    "∫₀¹ 4/(1+x²) dx = π. The definition involves nothing but the integer 4 and a square. Cut at any point c: A = ∫₀ᶜ 4/(1+x²) dx, B = ∫꜀¹ 4/(1+x²) dx. Neither A nor B is a number with a familiar name — yet they add up to exactly π. (Honesty note: A and B are really 4·arctan(c) and its complement — π in disguise; that's precisely the trick.)",
  "quiz.reveal.title3": "Trick #2: the Leibniz series",
  "quiz.reveal.body3":
    "π/4 = 1 − 1/3 + 1/5 − 1/7 + …  Every term is a plain rational number. The odd partial sums S₂ₖ₊₁ always sit above π, the even ones S₂ₖ always below, squeezing π from both sides — while no finite partial sum ever equals π.",
  "quiz.reveal.close":
    "Go try both tricks yourself in \"Slice the Cake\" and \"The Leibniz Ladder\".",
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
    el.textContent = t(el.dataset.i18n as MsgKey);
  });
  document.querySelectorAll<HTMLElement>("[data-i18n-html]").forEach((el) => {
    el.innerHTML = t(el.dataset.i18nHtml as MsgKey);
  });
  document.querySelectorAll<HTMLElement>("[data-i18n-placeholder]").forEach((el) => {
    el.setAttribute("placeholder", t(el.dataset.i18nPlaceholder as MsgKey));
  });
}
