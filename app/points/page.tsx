'use client'

import Card from "@/components/shared/card/Card"
import PointsCircles from "./PointsCircles"
import { Button } from "@/components/ui/button"
import JSConfetti from "js-confetti"
import { useRef } from "react"


const PointsPage = (maxPoints = 8) => {

  const canvasRef = useRef();
  const confettiRef = useRef<JSConfetti | null >(null);

  const handlePointsClaimed = async (points: number, claimed: boolean): Promise<void> => {
    if (points >= 8) {
      points = 8;
    }

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

    if (points >= 8 || claimed) {
      confettiRef.current = new JSConfetti({ canvas: canvasRef.current });
      confettiRef.current.addConfetti({
        confettiRadius: 5,
        confettiNumber: 300,
      });
    }
  };

  const handleClick = async() => {
    await handlePointsClaimed(8, false);
  }

  return (
    <div >
      <Card >
        <div className="flex flex-col items-center">
          {/* <h1 className="dark:text-blue-200">Points Page</h1> */}
          <h5 className="dark:text-gray-100">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </h5>
          <PointsCircles maxPoints={8} />

          <Button variant="default" size='lg' className=" bg-blue-300  text-blue-900 flex justify-center items-center relative min-w-full mt-5 hover:bg-blue-400 " onClick={handleClick}>
            Points
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default PointsPage
