import { describe, test, expect } from "bun:test";
import { t, setLang, getLang, zhDict, enDict, type MsgKey } from "./i18n";

describe("F7 双语 locale 完整性", () => {
  test("zh 与 en key 集合完全一致", () => {
    expect([...Object.keys(enDict)].sort()).toEqual([...Object.keys(zhDict)].sort());
  });
  test("两语言所有 key 均非空字符串", () => {
    for (const [k, v] of Object.entries(zhDict)) expect(v.length, `zh.${k}`).toBeGreaterThan(0);
    for (const [k, v] of Object.entries(enDict)) expect(v.length, `en.${k}`).toBeGreaterThan(0);
  });
  test("关键术语：en 文案含 transcendental number / Lindemann / algebraic", () => {
    expect(enDict["quiz.reveal.body1"]).toContain("transcendental number");
    expect(enDict["quiz.reveal.body1"]).toContain("Lindemann, 1882");
    expect(enDict["quiz.reveal.body1"]).toContain("algebraic");
  });
  test("t() 切换生效；未知 key 回退不崩", () => {
    setLang("en", false);
    expect(getLang()).toBe("en");
    expect(t("app.title")).toBe("Where Is π?");
    expect(t("nonexistent.key" as MsgKey)).toBe("nonexistent.key"); // 不抛错
    setLang("zh", false);
    expect(t("app.title")).toBe("π 在哪里？");
  });
});
