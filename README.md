# where-is-pi — 拼出一个 π · Build π Without π

> Can two numbers that never mention π add up to exactly π? · 两个「看不见 π」的数，能相加等于 π 吗？

A single-file math toy (bilingual 中文/English):

- **Slice the Cake 切蛋糕** — drag the cut point on ∫₀¹ 4/(1+x²); however you slice it, A + B = π (30 digits).
- **The Leibniz Ladder 莱布尼茨爬梯** — add terms of 1 − 1/3 + 1/5 − … and watch π get squeezed out, with no π in any term.
- **Pop Quiz 出题** — try to build two π-free numbers that sum to π, then meet the transcendence theorem.

## Play

- Hosted: https://liyuankui.github.io/where-is-pi/
- Or open `dist/index.html` directly — pure static single file, zero dependencies, no network requests.

## Dev

```bash
bun install && bun test && bun run dev   # http://localhost:3141
```
