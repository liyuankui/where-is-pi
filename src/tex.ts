/**
 * 数学排版（F9）：构建期用 KaTeX 把 $...$ 预渲染成 HTML，连同字体内联进单文件；
 * 运行时只做查表注入，零外部依赖。表缺失（异常降级）时显示等宽原文。
 */

export type TexTable = { inline: Record<string, string>; display: Record<string, string> };

/** 行内公式标记 $...$（本站无货币语义，$ 专用作公式定界） */
export const INLINE_RE = /\$([^$]+)\$/g;

declare global {
  interface Window {
    __TEX__?: TexTable;
  }
}

function table(): TexTable {
  if (typeof window !== "undefined" && window.__TEX__) return window.__TEX__;
  return { inline: {}, display: {} };
}

/** 把文案中的 $...$ 替换为预渲染 HTML；查不到则降级 <code> 原文 */
export function texHydrate(s: string): string {
  if (!s.includes("$")) return s;
  return s.replace(INLINE_RE, (_, tex) => table().inline[tex] ?? `<code>${tex}</code>`);
}

/** 模板中 data-tex 块级公式（.formula）注入 */
export function hydrateDisplayFormulas(root: ParentNode = document): void {
  if (typeof document === "undefined") return;
  root.querySelectorAll<HTMLElement>("[data-tex]").forEach((el) => {
    const html = table().display[el.dataset.tex ?? ""];
    if (html) el.innerHTML = html;
  });
}

/** 收集字典文案中全部 $...$ 片段（去重）；供构建期渲染与测试完整性校验 */
export function collectSnippets(...dicts: Array<Record<string, string>>): string[] {
  const set = new Set<string>();
  for (const d of dicts)
    for (const v of Object.values(d)) {
      if (!v.includes("$")) continue;
      for (const m of v.matchAll(INLINE_RE)) set.add(m[1]);
    }
  return [...set];
}
