/** 切蛋糕模式：∫₀¹ 4/(1+x²) 曲线，拖切点 c，实时高精度 A / B / A+B */
import {
  areaA,
  areaB,
  computePi,
  fromInt,
  div,
  toFixed,
} from "../math/analysis";
import { setupCanvas, bindDrag, type Ctx2D } from "../render/canvas";
import { t } from "../i18n";

const PI = computePi();
const DISPLAY = 30;

let c = div(fromInt(1), fromInt(2));
let g: Ctx2D;
let pending = false;

/** rAF 合帧：pointermove 高频触发时每帧至多一次重算重绘（高频 pointermove 下保持 60fps） */
function scheduleUpdate() {
  if (pending) return;
  pending = true;
  requestAnimationFrame(() => {
    pending = false;
    updateNumbers();
  });
}

function f01(x: number): number {
  return 4 / (1 + x * x);
}

function draw() {
  const { ctx, w, h } = g;
  const padL = 34, padB = 26, padT = 12, padR = 12;
  const iw = w - padL - padR, ih = h - padT - padB;
  const X = (x: number) => padL + x * iw;
  const Y = (y: number) => padT + ih - (y / 4) * ih; // y∈[2,4] 区段映射到 [0.5,1]

  ctx.clearRect(0, 0, w, h);
  const yTop = 2; // 只画 y∈[2,4]，曲线更饱满
  const Ys = (y: number) => padT + ih - ((y - yTop) / (4 - yTop)) * ih;

  // 两色面积
  const cx = Number(c) / 1e40;
  for (const side of [0, 1] as const) {
    ctx.beginPath();
    const x0 = side === 0 ? 0 : cx, x1 = side === 0 ? cx : 1;
    if (x1 - x0 <= 0) continue;
    ctx.moveTo(X(x0), Ys(yTop));
    for (let i = 0; i <= 200; i++) {
      const x = x0 + ((x1 - x0) * i) / 200;
      ctx.lineTo(X(x), Ys(f01(x)));
    }
    ctx.lineTo(X(x1), Ys(yTop));
    ctx.closePath();
    ctx.fillStyle = side === 0 ? "rgba(196,90,74,0.35)" : "rgba(74,111,165,0.35)";
    ctx.fill();
  }

  // 曲线
  ctx.beginPath();
  for (let i = 0; i <= 400; i++) {
    const x = i / 400;
    const p = [X(x), Ys(f01(x))] as const;
    i === 0 ? ctx.moveTo(p[0], p[1]) : ctx.lineTo(p[0], p[1]);
  }
  ctx.strokeStyle = "#333";
  ctx.lineWidth = 2;
  ctx.stroke();

  // 坐标轴刻度
  ctx.fillStyle = "#888";
  ctx.font = "11px system-ui";
  ctx.textAlign = "center";
  for (const tick of [0, 0.25, 0.5, 0.75, 1]) {
    ctx.fillText(tick.toFixed(2), X(tick), h - 8);
  }
  ctx.textAlign = "right";
  for (const yy of [2, 3, 4]) {
    ctx.fillText(String(yy), padL - 6, Ys(yy) + 4);
  }

  // 切线 c
  ctx.strokeStyle = "#c45a4a";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(X(cx), padT);
  ctx.lineTo(X(cx), padT + ih);
  ctx.stroke();
  ctx.fillStyle = "#c45a4a";
  ctx.textAlign = "left";
  ctx.fillText(t("cake.clabel") + cx.toFixed(4), Math.min(X(cx) + 6, w - 60), padT + 12);
}

function updateNumbers() {
  const A = areaA(c);
  const B = areaB(c);
  const sum = A + B; // Dec（BigInt 缩放）直接相加
  set("cake-A", toFixed(A, DISPLAY));
  set("cake-B", toFixed(B, DISPLAY));
  set("cake-sum", toFixed(sum, DISPLAY));
  set("cake-pi", toFixed(PI, DISPLAY));
  set("cake-c", (Number(c) / 1e40).toFixed(6));
  draw();
}

function set(id: string, s: string) {
  (document.getElementById(id) as HTMLElement).textContent = s;
}

export function initCake() {
  g = setupCanvas("cake-canvas");
  bindDrag(g.canvas, (x01) => {
    c = BigInt(Math.round(x01 * 1e40));
    scheduleUpdate();
  });
  // 初始描一次
  updateNumbers();
  window.addEventListener("resize", () => {
    g = setupCanvas("cake-canvas");
    draw();
  });
  // F7：切换语言仅重绘画布标注，不动切点 c
  window.addEventListener("langchange", draw);
}
