/**
 * 解析式高精度积分：∫₀¹ 4/(1+x²) dx = π。
 *
 * 盲区约束应对（SPEC F1）：Simpson 在 c 贴近 0/1 时子区间过短、误差穿帮。
 * 本实现用 arctan 级数 + 自变量减半归约，对任意 c∈[0,1] 都有
 *   A(c) = 4·arctan(c)
 *   B(c) = 4·arctan((1−c)/(1+c))   ← 由 arctan(1)−arctan(c) = arctan((1−c)/(1+c))
 * 两式独立计算（B 不借 π），级数在 |x|≤0.5 上指数收敛，工作精度 40 位内严格可信。
 */
import { Dec, ONE, add, sub, mul, div, sqrt, fromInt, toFixed } from "./dec";
export { toFixed };

export { add, sub, mul, div, fromInt };
export type { Dec };

const HALF = div(ONE, fromInt(2));

/** arctan(x)，x∈[0,1]。归约到 |x|≤1/2 后用交错级数。 */
export function arctan(x: Dec): Dec {
  let y = x;
  let k = 0;
  // arctan(x) = 2·arctan(x/(1+√(1+x²)))
  while (y > HALF) {
    const s = sqrt(add(ONE, mul(y, y)));
    y = div(y, add(ONE, s));
    k++;
  }
  // arctan(y) = Σ (−1)^j · y^(2j+1)/(2j+1)，|y|≤0.5 时收敛极快
  let term = y; // j=0
  let y2 = mul(y, y);
  let sum = term;
  let j = 1n;
  while (true) {
    term = mul(term, y2);
    const t = div(term, fromInt(j * 2n + 1n));
    if (t === 0n) break;
    sum = (j % 2n === 0n) ? add(sum, t) : sub(sum, t);
    j++;
  }
  // 还原 ×2^k
  for (let i = 0; i < k; i++) sum = mul(sum, fromInt(2));
  return sum;
}

/** π = 4·arctan(1)（与 UI 展示同源，杜绝「看起来对」） */
export function computePi(): Dec {
  return mul(fromInt(4), arctan(ONE));
}

/** A(c) = ∫₀^c 4/(1+x²) dx = 4·arctan(c) */
export function areaA(c: Dec): Dec {
  return mul(fromInt(4), arctan(c));
}

/** B(c) = ∫_c^1 4/(1+x²) dx = 4·arctan((1−c)/(1+c))，独立于 π 计算 */
export function areaB(c: Dec): Dec {
  const t = div(sub(ONE, c), add(ONE, c));
  return mul(fromInt(4), arctan(t));
}

/** 被积函数 f(x) = 4/(1+x²)（Simpson 用） */
export function f(x: Dec): Dec {
  return div(fromInt(4), add(ONE, mul(x, x)));
}
