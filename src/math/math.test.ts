import { describe, test, expect } from "bun:test";
import {
  computePi,
  areaA,
  areaB,
  arctan,
  fromInt,
  toFixed,
  add,
  sub,
  mul,
  div,
  type Dec,
} from "./analysis";
import { simpson, f } from "./simpson";
import { leibnizPartial, Leibniz } from "./leibniz";

/** π 前 50 位（Lange 1999 / 已知常量，用于独立对照） */
const PI_50 = "3.14159265358979323846264338327950288419716939937510";

const PI = computePi();
const DISPLAY = 30; // UI 显示精度

function assertPrefix(got: Dec, ref: string, digits: number, msg: string) {
  expect(toFixed(got, digits)).toBe(ref.slice(0, digits + 2));
}

describe("高精度基础运算", () => {
  test("π = 4·arctan(1) 前 32 位与已知值一致", () => {
    assertPrefix(PI, PI_50, 32, "π");
  });
  test("除法/乘法往返", () => {
    const a = fromInt(7);
    expect(toFixed(mul(div(a, fromInt(3)), fromInt(3)), 5)).toBe("7.00000");
  });
});

describe("切蛋糕：任意 c 处 A+B ≡ π（显示精度内）", () => {
  const cases: Array<[string, string]> = [
    ["0", "端点 c=0"],
    ["1", "端点 c=1"],
    ["0.5", "中点"],
    ["0.000001", "贴近 0（盲区）"],
    ["0.999999", "贴近 1（盲区）"],
    ["0.0000000001", "极贴 0（盲区加压）"],
    ["0.9999999999", "极贴 1（盲区加压）"],
    ["0.3333333333333333333333333333", "1/3 近似"],
    ["0.7071067811865475244008443621", "√2/2 近似"],
    ["0.1234567890123456789012345678", "随机风格"],
  ];
  for (const [cs, label] of cases) {
    test(`${label}: c=${cs}`, () => {
      const c = parseDec(cs);
      const A = areaA(c);
      const B = areaB(c);
      // A+B ≡ π（显示精度内字符串级相等）
      expect(toFixed(add(A, B), DISPLAY)).toBe(toFixed(PI, DISPLAY));
      // A 单调、且 A(0)=0、A(1)=π
      if (cs === "0") expect(toFixed(A, DISPLAY).startsWith("0.0000")).toBe(true);
      if (cs === "1") expect(toFixed(A, DISPLAY)).toBe(toFixed(PI, DISPLAY));
    });
  }
  test("A(c) 随 c 单调递增", () => {
    let prev = areaA(fromInt(0));
    for (let i = 1; i <= 20; i++) {
      const a = areaA(div(fromInt(i), fromInt(20)));
      expect(a > prev).toBe(true);
      prev = a;
    }
  });
});

describe("Simpson 积分（对照实现）", () => {
  test("∫₀¹ 4/(1+x²) dx ≈ π，误差 < 1e-14（N=4000）", () => {
    const s = simpson(f, fromInt(0), ONE0(), 4000);
    const diff = sub(s, PI);
    expect(absLt(diff, "1e-14")).toBe(true);
  });
  test("∫₀^0.5 + ∫_0.5^1 ≈ π（切点在中点）", () => {
    const half = div(fromInt(1), fromInt(2));
    const a = simpson(f, fromInt(0), half, 2000);
    const b = simpson(f, half, ONE0(), 2000);
    expect(absLt(sub(add(a, b), PI), "1e-14")).toBe(true);
  });
  test("被积函数值抽查 f(0)=4, f(1)=2", () => {
    expect(toFixed(f(fromInt(0)), 20)).toBe("4." + "0".repeat(20));
    expect(toFixed(f(ONE0()), 20)).toBe("2." + "0".repeat(20));
  });
});

describe("莱布尼茨部分和：奇偶夹逼", () => {
  test("奇偶单调夹逼且夹逼含 π（前 200 项）", () => {
    const s = new Leibniz();
    let odd = mul(s.step(), fromInt(4)); // S1 = 4（上界）
    let even = mul(s.step(), fromInt(4)); // S2（下界）
    expect(odd > PI).toBe(true);
    expect(even < PI).toBe(true);
    for (let i = 3; i <= 200; i++) {
      const v = mul(s.step(), fromInt(4));
      if (i % 2 === 1) {
        expect(v <= odd).toBe(true); // 奇部分和递减
        expect(v >= PI).toBe(true); // 始终在 π 上方
        odd = v;
      } else {
        expect(v >= even).toBe(true); // 偶部分和递增
        expect(v <= PI).toBe(true); // 始终在 π 下方
        even = v;
      }
    }
  });
  test("交错级数误差界：|S_n·4 − π| < 下一项 4/(2n+1)（n=1,10,100,1000）", () => {
    for (const n of [1, 10, 100, 1000]) {
      const s = mul(leibnizPartial(n), fromInt(4));
      const bound = div(fromInt(4), fromInt(2 * n + 1));
      expect(absLt(sub(s, PI), bound)).toBe(true);
    }
  });
  test("S1=4, S2=4−4/3 精确值", () => {
    expect(toFixed(mul(leibnizPartial(1), fromInt(4)), 20)).toBe("4." + "0".repeat(20));
    // 4 − 4/3 = 8/3 = 2.6666…
    expect(toFixed(mul(leibnizPartial(2), fromInt(4)), 20)).toBe("2.66666666666666666667");
  });
});

describe("arctan 抽查（泰勒对照）", () => {
  test("arctan(0.5) 前 32 位", () => {
    // 已知值 arctan(0.5) = 0.46364760900080611621425623146…
    const v = arctan(div(fromInt(1), fromInt(2)));
    expect(toFixed(v, 30)).toBe("0.463647609000806116214256231461");
  });
});

// ---- 工具 ----
function ONE0(): Dec {
  return fromInt(1);
}

/** 解析 "0.123..."（≤40 位小数）为 Dec */
function parseDec(s: string): Dec {
  const [i, frac = ""] = s.split(".");
  const f = frac.padEnd(40, "0").slice(0, 40);
  return BigInt(i + f);
}

/** |a| < e？e 形如 "1e-14"（或已解析的 Dec） */
function absLt(a: Dec, e: string | Dec): boolean {
  const aa = a < 0n ? -a : a;
  if (typeof e !== "string") return aa < e;
  const [m, ex] = e.split("e");
  const exp = parseInt(ex);
  // e = m × 10^exp，m 为个位数字（此处恒为 "1"），limit 为 Dec 缩放值
  const limit = parseDec(m || "1") / 10n ** 40n * 10n ** BigInt(40 + exp);
  return aa < limit;
}
