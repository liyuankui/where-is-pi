/**
 * 莱布尼茨级数部分和：π/4 = 1 − 1/3 + 1/5 − 1/7 + …
 * 部分和 ×4：奇数项部分和自上而下逼近 π，偶数项自下而上（夹逼）。
 * 盲区约束：禁止 float64 累加交错级数；定长小数增量求和。
 */
import { Dec, add, sub, div, fromInt, ONE } from "./dec";

export { add, sub, div, mul, fromInt, toFixed } from "./dec";
import { mul, toFixed } from "./dec";

/** 前 n 项部分和（n 项，k = 0..n−1）：S_n = 4·Σ (−1)^k/(2k+1) */
export function leibnizPartial(n: number): Dec {
  const s = new Leibniz();
  for (let i = 0; i < n; i++) s.step();
  return s.value;
}

/** 增量步进器：每步加一项，避免大项数重算（爬梯模式用） */
export class Leibniz {
  private sum: Dec = ZERO_INIT();
  private k = 0; // 已加项数
  get terms(): number {
    return this.k;
  }
  get value(): Dec {
    return this.sum;
  }
  /** 步进一项，返回新的部分和 */
  step(): Dec {
    const denom = fromInt(2 * this.k + 1);
    const t = div(ONE, denom);
    this.sum = this.k % 2 === 0 ? add(this.sum, t) : sub(this.sum, t);
    this.k++;
    return this.sum;
  }
  /** 当前项的值（预览：下一步要加/减的数 ×4 显示口径） */
  nextTerm(): Dec {
    return div(ONE, fromInt(2 * this.k + 1));
  }
  /** 当前项的符号 */
  get nextSign(): 1 | -1 {
    return this.k % 2 === 0 ? 1 : -1;
  }
  reset() {
    this.sum = 0n;
    this.k = 0;
  }
}

function ZERO_INIT(): Dec {
  return 0n;
}
