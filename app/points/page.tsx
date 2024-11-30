'use client'

import Card from "@/components/shared/card/Card"
import PointsCircles from "./PointsCircles"
import { Button } from "@/components/ui/button"
import JSConfetti from "js-confetti"
import { Suspense, useRef } from "react"
import animatePoints from "./utils/animatePoints"
import { getUserLatestRefPoints } from "@/utils/actions"
import { toast } from "react-toastify"


const PointsPage = () => {

  const maxPoints = 8
  const canvasRef = useRef();
  const confettiRef = useRef<JSConfetti | null>(null);

  const handlePointsClaimed = async (points: number): Promise<void> => {
    // limit points to 8
    if (points >= 8) {
      points = 8;
    }

    // animate circle points
    await animatePoints(points, maxPoints);

    // show confetti if points >= 8 whether free wash is claimed or not
    if (points >= 8) {
      confettiRef.current = new JSConfetti({ canvas: canvasRef.current });
      confettiRef.current.addConfetti({
        confettiRadius: 5,
        confettiNumber: 1000,
      });
    }
  };

  const handleClick = async () => {

    const { points, error } = await getUserLatestRefPoints()
    
    if (error) {
      toast.error(error)
      return
    }

    await handlePointsClaimed(points ?? 0);
  }

  return (
    <div >
      <Card >
        <div className="flex flex-col items-center">
          <h5 className="dark:text-gray-100">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </h5>
          <Suspense fallback={<div>Loading...</div>}>
            <PointsCircles maxPoints={8} />
          </Suspense>
          <Button variant="default" size='lg' className=" bg-blue-300  text-blue-900 flex justify-center items-center relative min-w-full mt-5 hover:bg-blue-400 " onClick={handleClick}>
            Points
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default PointsPage
