'use client'

import Card from "@/components/shared/card/Card"
import PointsCircles from "./PointsCircles"
import { Button } from "@/components/ui/button"
import JSConfetti from "js-confetti"
import { Suspense, useEffect, useRef, useState } from "react"
import animatePoints from "./utils/animatePoints"
import { getFirstName, getLatestRefId, getUserLatestRefPoints } from "@/utils/actions"
import { toast } from "react-toastify"
import { useAuth } from "@clerk/nextjs"
import Link from "next/link"


const PointsPage = () => {

  // Get the first name of the logged in user
  const { userId } = useAuth();

  const maxPoints = 8
  const canvasRef = useRef();
  const confettiRef = useRef<JSConfetti | null>(null);

  const [firstName, setFirstName] = useState<string | null>(null)
  const [pointsLeft, setPointsLeft] = useState<number | null>(null)
  const [initialRender, setinitialRender] = useState(true);
  const [refId, setRefId] = useState<string | null>(null);
  const [clerkId, setClerkId] = useState<string | null>(null);

  useEffect(() => {
    const getUserName = async () => {
      if (userId) {
        const { firstName } = await getFirstName(userId);
        setFirstName(firstName || '');
      }
    }
    getUserName();
  }, []);


  useEffect(() => {
    // Get latest reference ID and clerk ID
    const getRefId = async () => {
      const { refId, clerkId, error } = await getLatestRefId()
      if (error) {
        toast.error(error)
        return
      }
      setRefId(refId || null)
      setClerkId(clerkId || null)
    }
    getRefId()
  }, [])

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
    setPointsLeft(maxPoints - (points ?? 0))
    setinitialRender(false)
    await handlePointsClaimed(points ?? 0);
  }

  const checkPointsText = (
    <h5 className="dark:text-gray-100">
      Hi {firstName}, Click or tap the
      <span style={{ color: "red" }}> Check</span> button below to show your
      points.
    </h5>
  );

  const completedText = (
    <h5 className="dark:text-gray-100">
      Congratulations, {firstName}! You may claim your next wash for
      free.
    </h5>
  );

  const uncompletedText = (
    <h5 className="dark:text-gray-100">
      Hi {firstName}. You are <span>{String(pointsLeft)}</span>
      {pointsLeft && pointsLeft < 2 ? <span> point</span> : <span> points</span>} away from
      getting your free wash.
    </h5>
  );

  return (
    <div >
      <Card >
        <div className="flex flex-col items-center">
          {
            initialRender
              ? checkPointsText
              : pointsLeft === 0
                ? completedText
                : uncompletedText
          }
          <Suspense fallback={<div>Loading...</div>}>
            <PointsCircles maxPoints={8} />
          </Suspense>
          <div className="dark:text-gray-100">
            <Link className="underline dark:text-gray-100" href={`/customers/${clerkId}/${refId}`}>{`${refId} `}</Link>
            is your Ref ID. Click or tap the Ref ID to show details of your
            points.
          </div>
          <Button variant="default" size='lg' className=" bg-blue-300  text-blue-900 flex justify-center items-center relative min-w-full mt-5 hover:bg-blue-400 " onClick={handleClick}>
            Check
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default PointsPage
