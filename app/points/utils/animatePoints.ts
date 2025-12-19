
const animatePoints = async (points: number, maxPoints = 8) => {

  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Animate filled points
  for (let index = 1; index <= points; index++) {
    const element = document.querySelector<HTMLElement>(`#sw00${index}`)
    if (element) {
      element.style.transition = "all 0.3s ease-out";
      element.style.background = "linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)";
      element.style.color = "white";
      element.style.transform = "scale(1.1)";
      element.style.boxShadow = "0 0 20px rgba(59, 130, 246, 0.5)";
      await sleep(150);
      element.style.transform = "scale(1)";
    }
  }

  // Reset unfilled points
  for (let index = maxPoints; index > points; index--) {
    const element = document.querySelector<HTMLElement>(`#sw00${index}`)
    if (element) {
      element.style.transition = "all 0.3s ease-out";
      element.style.background = "";
      element.style.color = "";
      element.style.boxShadow = "";
    }
  }
}

export default animatePoints

