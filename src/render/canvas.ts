/** canvas 绘制工具：HiDPI 适配 + 指针拖动（鼠标/touch 统一 Pointer Events） */

export interface Ctx2D {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  w: number;
  h: number;
}

export function setupCanvas(id: string): Ctx2D {
  const canvas = document.getElementById(id) as HTMLCanvasElement;
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  const w = rect.width;
  const h = rect.height;
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  const ctx = canvas.getContext("2d")!;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { canvas, ctx, w, h };
}

/** 绑定拖动：回调收到相对于画布宽度的 [0,1] 归一化 x */
export function bindDrag(canvas: HTMLCanvasElement, onX: (x01: number) => void) {
  canvas.style.touchAction = "none"; // 阻止 touch 滚动，交给 Pointer Events
  const handle = (e: PointerEvent) => {
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    onX(Math.min(1, Math.max(0, x)));
  };
  canvas.addEventListener("pointerdown", (e) => {
    canvas.setPointerCapture(e.pointerId);
    handle(e);
  });
  canvas.addEventListener("pointermove", (e) => {
    if (e.buttons > 0 || e.pointerType === "touch") handle(e);
  });
}
