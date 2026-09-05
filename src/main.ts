import { initCake } from "./modes/cake";
import { initLadder } from "./modes/ladder";
import { initQuiz } from "./modes/quiz";

const MODES = ["cake", "ladder", "quiz"] as const;
type Mode = (typeof MODES)[number];

const inits: Record<Mode, () => void> = {
  cake: initCake,
  ladder: initLadder,
  quiz: initQuiz,
};
const inited = new Set<Mode>();

function switchTo(m: Mode) {
  for (const x of MODES) {
    document.getElementById(`view-${x}`)!.hidden = x !== m;
    document.getElementById(`tab-${x}`)!.classList.toggle("active", x === m);
  }
  if (!inited.has(m)) {
    inits[m]();
    inited.add(m);
  } else if (m === "cake" || m === "ladder") {
    // 画布在 hidden 时初始化尺寸为 0，重新显示时需重建
    window.dispatchEvent(new Event("resize"));
  }
}

for (const m of MODES) {
  document.getElementById(`tab-${m}`)!.addEventListener("click", () => switchTo(m));
}

// 默认进切蛋糕
switchTo("cake");
