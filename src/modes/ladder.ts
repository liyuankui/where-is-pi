/** 莱布尼茨爬梯：逐项/自动步进，奇偶部分和上下夹逼 π */
import { Leibniz, mul, fromInt, toFixed } from "../math/leibniz";
import { computePi } from "../math/analysis";
import { setupCanvas, type Ctx2D } from "../render/canvas";

const PI = computePi();
const PI_NUM = Math.PI; // 仅用于绘图取景，数值显示一律走高精度库
const DISPLAY = 24;

const stepper = new Leibniz();
const history: number[] = []; // 部分和（×4，double）绘图缓存；文本显示用高精度值
let current: ReturnType<Leibniz["step"]> = 0n;
let g: Ctx2D;
let autoTimer: ReturnType<typeof setInterval> | null = null;

function yView(): [number, number] {
  return [PI_NUM - 0.9, PI_NUM + 0.9]; // 固定取景 [π±0.9]，S1=4 顶格可见
}

function push(v: bigint) {
  current = v;
  history.push(Number(v) / 1e40);
}

function draw() {
  const { ctx, w, h } = g;
  const padL = 44, padR = 12, padT = 12, padB = 26;
  const iw = w - padL - padR, ih = h - padT - padB;
  const n = Math.max(history.length, 10);
  const [y0, y1] = yView();
  const X = (i: number) => padL + (i / n) * iw;
  const Y = (y: number) => padT + ih - ((y - y0) / (y1 - y0)) * ih;

  ctx.clearRect(0, 0, w, h);

  // π 横线
  ctx.strokeStyle = "#c45a4a";
  ctx.setLineDash([5, 4]);
  ctx.beginPath();
  ctx.moveTo(padL, Y(PI_NUM));
  ctx.lineTo(w - padR, Y(PI_NUM));
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = "#c45a4a";
  ctx.textAlign = "right";
  ctx.font = "12px ui-monospace, monospace";
  ctx.fillText("π", padL - 6, Y(PI_NUM) + 4);

  // 奇偶阶梯：奇数项在 π 上方（红），偶数项在 π 下方（蓝），高度即到 π 的距离
  const yPi = Y(PI_NUM);
  for (let i = 0; i < history.length; i++) {
    const odd = (i + 1) % 2 === 1;
    ctx.fillStyle = odd ? "rgba(196,90,74,0.9)" : "rgba(74,111,165,0.9)";
    const y = Y(history[i]);
    const bw = Math.max(1, X(1) - X(0));
    if (odd) ctx.fillRect(X(i), y, bw, Math.max(1, yPi - y));
    else ctx.fillRect(X(i), yPi, bw, Math.max(1, y - yPi));
  }

  // x 轴刻度
  ctx.fillStyle = "#888";
  ctx.font = "11px system-ui";
  ctx.textAlign = "center";
  const step = Math.max(1, Math.round(n / 8));
  for (let i = step; i <= history.length; i += step) {
    ctx.fillText(String(i), X(i - 0.5), h - 8);
  }
}

function update() {
  const n = stepper.terms;
  set("lad-n", String(n));
  const nextT = stepper.nextTerm();
  set("lad-next", (stepper.nextSign > 0 ? "+" : "−") + toFixed(mul(nextT, fromInt(4)), 12));
  if (n > 0) {
    set("lad-S", toFixed(mul(current, fromInt(4)), DISPLAY));
    const d = mul(current, fromInt(4)) - PI;
    set("lad-diff", (d > 0n ? "+" : d < 0n ? "−" : "") + toFixed(d < 0n ? -d : d, DISPLAY));
  } else {
    set("lad-S", "（尚未开始）");
    set("lad-diff", "");
  }
  draw();
}

function step(k = 1) {
  for (let i = 0; i < k; i++) push(stepper.step());
  update();
}

function reset() {
  stopAuto();
  stepper.reset();
  history.length = 0;
  current = 0n;
  update();
}

function stopAuto() {
  if (autoTimer) {
    clearInterval(autoTimer);
    autoTimer = null;
    set("lad-auto", "自动步进");
  }
}

function toggleAuto() {
  if (autoTimer) {
    stopAuto();
    return;
  }
  set("lad-auto", "暂停");
  autoTimer = setInterval(() => step(1), 120);
}

function set(id: string, s: string) {
  (document.getElementById(id) as HTMLElement).textContent = s;
}

function on<K extends keyof HTMLElementEventMap>(id: string, ev: K, fn: () => void) {
  document.getElementById(id)!.addEventListener(ev, fn);
}

export function initLadder() {
  g = setupCanvas("lad-canvas");
  on("lad-plus1", "click", () => step(1));
  on("lad-plus10", "click", () => step(10));
  on("lad-plus100", "click", () => step(100));
  on("lad-auto", "click", toggleAuto);
  on("lad-reset", "click", reset);
  update();
  window.addEventListener("resize", () => {
    g = setupCanvas("lad-canvas");
    draw();
  });
}
