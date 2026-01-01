'use client'

import PointsCircles from "./PointsCircles"
import { Button } from "@/components/ui/button"
import JSConfetti from "js-confetti"
import { Suspense, useRef, useState, useEffect } from "react"
import animatePoints from "./utils/animatePoints"
import { getUserLatestRefPoints } from "@/utils/actions"
import { toast } from "react-toastify"
import Link from "next/link"
import { BiSolidWasher } from "react-icons/bi"
import { FaCheckCircle, FaArrowRight, FaInfoCircle } from "react-icons/fa"
import { IoSparkles } from "react-icons/io5"
import Card from "@/components/shared/card/Card"

const PointsAnimation = ({ firstName, refId, latestRefIdError }: { firstName: string | null, refId: string | null, latestRefIdError: string | null }) => {

    const maxPoints = 10
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const confettiRef = useRef<JSConfetti | null>(null);

    const [pointsLeft, setPointsLeft] = useState<number | null>(null)
    const [currentPoints, setCurrentPoints] = useState<number | null>(null)
    const [initialRender, setinitialRender] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    // Handle error in useEffect to avoid setState during render
    useEffect(() => {
        if (latestRefIdError) {
            toast.error(latestRefIdError);
        }
    }, [latestRefIdError]);

    // Early return after hooks
    if (latestRefIdError) {
        return null;
    }

    const handlePointsClaimed = async (points: number): Promise<void> => {
        if (points >= 10) {
            points = 10;
        }

        // animate circle points
        await animatePoints(points, maxPoints);

        // show confetti if points >= 10 whether free wash is claimed or not
        if (points >= 10) {
            confettiRef.current = new JSConfetti({ canvas: canvasRef.current! });
            confettiRef.current.addConfetti({
                confettiRadius: 5,
                confettiNumber: 1000,
            });
        }
    };

    const handleClick = async () => {
        setIsLoading(true);
        const { points, error } = await getUserLatestRefPoints()
        if (error) {
            toast.error(error)
            setIsLoading(false);
            return
        }
        setCurrentPoints(points ?? 0);
        setPointsLeft(maxPoints - (points ?? 0))
        setinitialRender(false)
        await handlePointsClaimed(points ?? 0);
        setIsLoading(false);
    }

    const progressPercentage = currentPoints !== null ? (currentPoints / maxPoints) * 100 : 0;

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
        <div>
            <Card>
                <div className="flex flex-col items-center">
                    {
                        initialRender
                            ? checkPointsText
                            : pointsLeft === 0
                                ? completedText
                                : uncompletedText
                    }
                    <Suspense fallback={<div>Loading...</div>}>
                        <PointsCircles maxPoints={10} />
                    </Suspense>
                    <div className="dark:text-gray-100">
                        <Link className="underline dark:text-gray-100" href={`/points/${refId}`}>{`${refId} `}</Link>
                        is your Ref ID. Click or tap the Ref ID to show details of your
                        points.
                    </div>
                    <Button
                        variant="default"
                        size='lg'
                        className="bg-blue-300 text-blue-900 flex justify-center items-center relative min-w-full mt-5 hover:bg-blue-400"
                        onClick={handleClick}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Loading...' : 'Check'}
                    </Button>
                </div>

                {/* Reference ID Card */}
                <div className="mt-6 p-5 rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/50 dark:border-slate-700/50 shadow-lg animate-slideUp" style={{ animationDelay: '0.1s' }}>
                    <div className="flex items-start sm:items-center gap-3 flex-col sm:flex-row">
                        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                            <FaInfoCircle className="text-blue-500" />
                            <span className="font-medium">Your Reference ID:</span>
                        </div>
                        <Link
                            href={`/points/${refId}`}
                            className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 dark:from-blue-500/20 dark:to-cyan-500/20 border border-blue-200 dark:border-blue-700/50 hover:border-blue-400 dark:hover:border-blue-500 transition-all"
                        >
                            <span className="font-mono font-bold text-blue-600 dark:text-cyan-400">{refId}</span>
                            <FaArrowRight className="text-xs text-blue-500 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                        Tap your Reference ID to view detailed points history
                    </p>
                </div>

                {/* Help Card */}
                <div className="mt-4 p-5 rounded-2xl bg-gradient-to-r from-blue-500/5 to-cyan-500/5 dark:from-blue-500/10 dark:to-cyan-500/10 border border-blue-100 dark:border-blue-800/50 animate-slideUp" style={{ animationDelay: '0.2s' }}>
                    <h3 className="font-semibold text-slate-800 dark:text-white mb-2 flex items-center gap-2">
                        <IoSparkles className="text-blue-500" />
                        How it works
                    </h3>
                    <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                        <li>• Earn <strong>1 point</strong> for every wash and dry</li>
                        <li>• Collect <strong>10 points</strong> to get a <strong className="text-blue-600 dark:text-cyan-400">FREE wash!</strong></li>
                        <li>• Points never expire</li>
                    </ul>
                </div>
            </Card>
        </div>
    )
}

export default PointsAnimation