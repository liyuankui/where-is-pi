/**
 * KaTeX 构建期预渲染（F9），build.ts 与 dev.ts 共用：
 *  - 字典 $...$ 与模板 data-tex → katex.renderToString → 注入 window.__TEX__
 *  - katex.min.css 剥掉外链 @font-face，白名单字体 base64 内联
 * 产物零 CDN、零网络请求（规避「KaTeX CDN 被墙」降级路径）。
 */
import katex from "katex";
import { collectSnippets, type TexTable } from "../src/tex";
import { zhDict, enDict } from "../src/i18n";

function render(tex: string, display: boolean): string {
  return katex.renderToString(tex, {
    displayMode: display,
    output: "html",
    throwOnError: true,
    strict: false,
  });
}

function unescapeAttr(s: string): string {
  return s
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

/** 模板 HTML → { inline: 字典片段表, display: data-tex 表 } */
export function buildTexTable(tplHtml: string): TexTable {
  const inline: Record<string, string> = {};
  for (const s of collectSnippets(zhDict, enDict)) inline[s] = render(s, false);
  const display: Record<string, string> = {};
  for (const m of tplHtml.matchAll(/data-tex="([^"]*)"/g)) {
    const tex = unescapeAttr(m[1]);
    if (!(tex in display)) display[tex] = render(tex, true);
  }
  return { inline, display };
}

/** 只内联本站公式实际用到的字体家族（缺一个会静默回退系统字体，宁多勿缺） */
const FONT_WHITELIST: Array<[family: string, style: string, weight: string, italic: string]> = [
  ["KaTeX_Main", "Regular", "400", "normal"],
  ["KaTeX_Main", "Italic", "400", "italic"],
  ["KaTeX_Math", "Italic", "400", "italic"],
  ["KaTeX_AMS", "Regular", "400", "normal"],
  ["KaTeX_Size1", "Regular", "400", "normal"],
  ["KaTeX_Size2", "Regular", "400", "normal"],
  ["KaTeX_Size3", "Regular", "400", "normal"],
  ["KaTeX_Size4", "Regular", "400", "normal"],
];

export async function katexCss(): Promise<string> {
  const css = await Bun.file("node_modules/katex/dist/katex.min.css").text();
  // min CSS 中所有 url() 都在 @font-face 里；整块剥掉后无任何外链
  const stripped = css.replace(/@font-face\s*\{[^}]*\}/g, "");
  let fonts = "";
  for (const [fam, style, weight, italic] of FONT_WHITELIST) {
    const bytes = await Bun.file(`node_modules/katex/dist/fonts/${fam}-${style}.woff2`).bytes();
    const b64 = Buffer.from(bytes).toString("base64");
    fonts += `@font-face{font-family:${fam};font-style:${italic};font-weight:${weight};`
      + `src:url(data:font/woff2;base64,${b64}) format("woff2")}`;
  }
  return stripped + fonts;
}

/** 模板占位替换：/*__KATEX_CSS__* / 与 /*__TEX__* /（注意避开 $& 替换语义，用函数形式） */
export async function injectMath(html: string): Promise<string> {
  const table = buildTexTable(html);
  const css = await katexCss();
  const js = JSON.stringify(table);
  const out = html
    .replace("/*__KATEX_CSS__*/", () => css)
    .replace("/*__TEX__*/null", () => js); // 整段含 null 一起换，避免 {json}null 残留
  if (out === html) throw new Error("injectMath: 模板缺少 __KATEX_CSS__/__TEX__ 占位符");
  return out;
}
