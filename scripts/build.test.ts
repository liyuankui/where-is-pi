import { describe, test, expect } from "bun:test";

/** F5/F7：构建产物零外链依赖（CDN 白名单外），单文件自包含 */
describe("构建产物", () => {
  test("dist/index.html 存在、无外链、非 module 脚本", async () => {
    const file = Bun.file("dist/index.html");
    expect(await file.exists()).toBe(true);
    const html = await file.text();
    // 无 http(s) 外链（src/href 属性）
    const ext = html.match(/(src|href)="https?:\/\/[^"]*"/g) ?? [];
    expect(ext).toEqual([]);
    // 无 ES module（file:// CORS 限制）
    expect(html).not.toContain('type="module"');
    // 内联脚本非空（主逻辑已注入）
    expect(html).toMatch(/<script>[\s\S]{1000,}<\/script>/);
  });
});
