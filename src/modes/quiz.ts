/** 出题模式：先答后揭晓（超越数不可能定理 + 两招伪装构造） */
import { t } from "../i18n";

let answered = false;

export function initQuiz() {
  const btn = document.getElementById("quiz-btn") as HTMLButtonElement;
  const input = document.getElementById("quiz-input") as HTMLTextAreaElement;
  const answer = document.getElementById("quiz-answer") as HTMLElement;

  btn.addEventListener("click", () => {
    const replied = input.value.trim().length > 0;
    answered = true;
    answer.hidden = false;
    btn.textContent = t("quiz.btn.again");
    // 已作答则展开完整揭晓；未作答只提示再想想
    document.getElementById("quiz-reveal")!.hidden = !replied;
    if (replied) {
      answer.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  // F7：切换语言保持答题状态，仅刷新动态按钮文案
  window.addEventListener("langchange", () => {
    if (answered) btn.textContent = t("quiz.btn.again");
  });
}
