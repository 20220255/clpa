
const animatePoints = async(points: number, maxPoints = 10) => {

    function sleep(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    for (let index = 1; index <= points; index++) {
        const element = document.querySelector<HTMLElement>(`#sw00${index}`) 
        if (element) {
          element.style.animation = "circle 0.5s ease-in";
          element.style.backgroundColor = "coral";
          element.style.color = "white";
          await sleep(250);
        }
      }

      for (let index = maxPoints; index > points; index--) {
        const element = document.querySelector<HTMLElement>(`#sw00${index}`)
        if (element) {
          element.style.backgroundColor = "lightgray";
        }
      }
}

export default animatePoints
