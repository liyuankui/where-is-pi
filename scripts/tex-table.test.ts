import { describe, test, expect } from "bun:test";
import { buildTexTable } from "./tex-table";
import { zhDict, enDict } from "../src/i18n";
import { collectSnippets, texHydrate } from "../src/tex";

const tpl = await Bun.file("template.html").text();
const table = buildTexTable(tpl);

describe("F9 KaTeX 构建期预渲染", () => {
  test("字典全部 $...$ 片段渲染成功且入表（无缺失、无异常）", () => {
    const snips = collectSnippets(zhDict, enDict);
    expect(snips.length).toBeGreaterThan(10);
    for (const s of snips) {
      expect(table.inline[s], `缺失: ${s}`).toBeDefined();
      expect(table.inline[s]).toContain("katex");
    }
  });

  test("模板 data-tex 均入 display 表（build 与模板不漂移）", () => {
    const attrs = [...tpl.matchAll(/data-tex="([^"]*)"/g)].map((m) => m[1]);
    expect(attrs.length).toBeGreaterThanOrEqual(2);
    for (const a of attrs) expect(table.display[a], `缺失: ${a}`).toBeDefined();
  });

  test("渲染产物只用白名单字体（不引 SansSerif/Typewriter/Caligraphic/Bold）", () => {
    const all = Object.values(table.inline).join("") + Object.values(table.display).join("");
    for (const bad of ["mathsf", "mathtt", "mathcal", "mathscr", "mathbf", "boldsymbol", "mathbb"])
      expect(all.includes(bad), `出现未内联字体的类: ${bad}`).toBe(false);
  });

  test("texHydrate 降级：表缺失时输出 <code> 原文而非空白", () => {
    const out = texHydrate("前缀 $x^2$ 后缀"); // 测试环境无 window.__TEX__
    expect(out).toContain("<code>x^2</code>");
    expect(out).toContain("前缀");
  });
});
