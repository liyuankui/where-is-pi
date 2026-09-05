import { describe, test, expect } from "bun:test";
import { computeE } from "./why";
import { mul, fromInt, toFixed } from "../math/dec";

describe("F8 e 级数小演示", () => {
  test("e = Σ1/n!（40 项）前 32 位与已知值一致", () => {
    // e = 2.71828182845904523536028747135266249775724709369995…
    expect(toFixed(computeE(40), 30)).toBe("2.718281828459045235360287471353");
  });
  test("切分：前 3 项 = 2.5，尾 = e − 2.5 为正且 < 0.25", () => {
    const e = computeE(40);
    const tail = e - mul(fromInt(5), fromInt(1)) / 2n; // e − 2.5
    expect(tail > 0n).toBe(true);
    expect(tail < 10n ** 40n / 4n).toBe(true); // < 0.25（Dec 缩放 10^40）
  });
});
