/**
 * 复合 Simpson 积分（高精度定长小数实现）。
 * 用于演示/对照：多项式阶误差 O(h⁴)，达到 ~1e-15 级需数千面板。
 * UI 与 A+B≡π 断言走解析式（analysis.ts），见 tests 注释。
 */
import { Dec, add, sub, mul, div, fromInt } from "./dec";
import { f } from "./analysis";

/**
 * 复合 Simpson：在 [a,b] 上取 intervals 个子区间（必须为偶数）。
 * h/3 · [f0 + 4f1 + 2f2 + … + 4f_{n−1} + fn]
 */
export function simpson(
  g: (x: Dec) => Dec,
  a: Dec,
  b: Dec,
  intervals: number,
): Dec {
  if (intervals % 2 !== 0 || intervals < 2) {
    throw new Error("intervals 必须为正偶数");
  }
  const h = div(sub(b, a), fromInt(intervals));
  let sum = add(g(a), g(b));
  for (let i = 1; i < intervals; i++) {
    const x = add(a, mul(fromInt(i), h));
    const w = i % 2 === 0 ? 2n : 4n;
    sum = add(sum, mul(fromInt(w), g(x)));
  }
  return div(mul(h, sum), fromInt(3));
}

export { f };
