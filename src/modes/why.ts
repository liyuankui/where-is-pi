/** F8 为什么模式：长文科普页。唯一交互：e 级数切分小演示（高精度，源自本库） */
import { add, sub, div, fromInt, toFixed, type Dec } from "../math/dec";

/** e = Σ_{n≥0} 1/n!，定长小数求和（n=40 项已在 40 位工作精度内收敛） */
export function computeE(terms = 40): Dec {
  let sum = 0n as Dec;
  let fact = fromInt(1); // n!（Dec 缩放值，整数则恒为 D 的整数倍）
  for (let n = 0; n < terms; n++) {
    if (n > 0) fact = fact * BigInt(n); // 缩放值乘整数：n·(k·D) = (nk)·D
    sum = add(sum, div(fromInt(1), fact));
  }
  return sum;
}

export function initWhy() {
  const e = computeE(40);
  const head = div(fromInt(5), fromInt(2)); // 1 + 1 + 1/2 = 2.5
  const tail = sub(e, head);
  const set = (id: string, s: string) => {
    (document.getElementById(id) as HTMLElement).textContent = s;
  };
  set("why-e", toFixed(e, 30));
  set("why-e-head", "2.5");
  set("why-e-tail", toFixed(tail, 30));
}
