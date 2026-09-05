/** F4 出题模式：先答后揭晓（超越数不可能定理 + 两招伪装构造） */

export function initQuiz() {
  const btn = document.getElementById("quiz-btn") as HTMLButtonElement;
  const input = document.getElementById("quiz-input") as HTMLTextAreaElement;
  const answer = document.getElementById("quiz-answer") as HTMLElement;

  btn.addEventListener("click", () => {
    const replied = input.value.trim().length > 0;
    answer.hidden = false;
    btn.textContent = "再想想，重新作答";
    // 已作答则展开完整揭晓；未作答只显示鼓励
    document.getElementById("quiz-reveal")!.hidden = !replied;
    document.getElementById("quiz-enc")!.hidden = replied;
    if (replied) {
      answer.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
}
