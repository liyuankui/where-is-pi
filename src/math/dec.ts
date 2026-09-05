/**
 * 定长小数（fixed-point decimal）运算：BigInt 按 10^SCALE 缩放。
 * dist 零外部依赖，故自实现（SPEC 硬约束：高精度库禁入 dist 外链）。
 */
export const SCALE = 40; // 小数点后位数（工作精度）
const D = 10n ** BigInt(SCALE);

export type Dec = bigint; // 数值 = n / D

export const ZERO: Dec = 0n;
export const ONE: Dec = D;
export const TWO: Dec = 2n * D;

export const fromInt = (n: number | bigint): Dec => BigInt(n) * D;

/** a/b 高精度除，四舍五入（half-up，按绝对值） */
export function div(a: Dec, b: Dec): Dec {
  if (b === 0n) throw new Error("division by zero");
  const neg = (a < 0n) !== (b < 0n);
  const aa = a < 0n ? -a : a;
  const bb = b < 0n ? -b : b;
  let q = (aa * D) / bb;
  const r = (aa * D) % bb;
  if (2n * r >= bb) q += 1n; // half-up
  return neg ? -q : q;
}

export const mul = (a: Dec, b: Dec): Dec => (a * b) / D;

export const add = (a: Dec, b: Dec): Dec => a + b;
export const sub = (a: Dec, b: Dec): Dec => a - b;

export function sqrt(a: Dec): Dec {
  if (a < 0n) throw new Error("sqrt of negative");
  if (a === 0n) return 0n;
  // 求 y 使 (y/D)^2 = a/D，即 y^2 ≈ a*D。牛顿迭代。
  const s = a * D;
  // 双精度初值，从「上方」进入（保证迭代单调递减，否则提前退出会留 1e-16 级误差）
  const approx = Math.sqrt(Number(a) / Number(D));
  let y = approx > 0 ? BigInt(Math.round(approx * Number(D))) : 1n;
  if (y <= 0n) y = 1n;
  y += y / 1000n + 1n; // 余量：确保 y ≥ isqrt(s)
  while (true) {
    const t = (y + s / y) / 2n;
    if (t >= y) break; // 收敛（单调递减序列触底）
    y = t;
  }
  // 保证 y*y <= s（舍入一致性）
  while (y * y > s) y -= 1n;
  return y;
}

/** 格式化为十进制字符串，保留 digits 位小数（四舍五入） */
export function toFixed(a: Dec, digits: number = 30): string {
  const neg = a < 0n;
  const aa = neg ? -a : a;
  const pow = 10n ** BigInt(SCALE - digits);
  let r = (aa + pow / 2n) / pow; // 四舍五入到 digits 位
  const s = r.toString().padStart(digits + 1, "0");
  const intPart = s.slice(0, s.length - digits);
  const frac = digits > 0 ? "." + s.slice(s.length - digits) : "";
  return (neg ? "-" : "") + intPart + frac;
}