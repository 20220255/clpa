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

const PointsAnimation = ({ firstName, refId, latestRefIdError }: { firstName: string | null, refId: string | null, latestRefIdError: string | null }) => {

    const maxPoints = 8
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
        if (points >= 8) {
            points = 8;
        }

        await animatePoints(points, maxPoints);

        if (points >= 8) {
            confettiRef.current = new JSConfetti({ canvas: canvasRef.current || undefined });
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

    return (
        <div className="min-h-screen relative overflow-hidden pb-24">
            {/* Animated Background */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-100 dark:from-slate-900 dark:via-blue-950 dark:to-indigo-950" />
                <div className="absolute top-20 right-10 w-72 h-72 bg-cyan-400/20 dark:bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-40 left-10 w-96 h-96 bg-blue-400/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            <div className="relative px-4 sm:px-6 lg:px-8 pt-6">
                <div className="max-w-2xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8 animate-fadeIn">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/80 dark:bg-blue-900/50 border border-blue-200 dark:border-blue-700/50 backdrop-blur-sm mb-4">
                            <BiSolidWasher className="text-blue-600 dark:text-blue-400" />
                            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Points Tracker</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white">
                            {initialRender ? (
                                <>Welcome back, <span className="text-blue-600 dark:text-cyan-400">{firstName || 'Friend'}</span>!</>
                            ) : pointsLeft === 0 ? (
                                <>🎉 Congratulations!</>
                            ) : (
                                <>Keep Going, <span className="text-blue-600 dark:text-cyan-400">{firstName || 'Friend'}</span>!</>
                            )}
                        </h1>
                    </div>

                    {/* Main Card */}
                    <div className="relative animate-slideUp">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl blur-xl opacity-20 dark:opacity-30" />
                        <div className="relative p-6 sm:p-8 rounded-3xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/50 dark:border-slate-700/50 shadow-2xl">

                            {/* Status Message */}
                            <div className="text-center mb-6">
                                {initialRender ? (
                                    <p className="text-lg text-slate-600 dark:text-slate-300">
                                        Tap the button below to check your current points
                                    </p>
                                ) : pointsLeft === 0 ? (
                                    <div className="flex items-center justify-center gap-2 text-lg text-emerald-600 dark:text-emerald-400 font-semibold">
                                        <FaCheckCircle className="text-xl" />
                                        <span>You can claim your FREE wash!</span>
                                    </div>
                                ) : (
                                    <p className="text-lg text-slate-600 dark:text-slate-300">
                                        You&apos;re <span className="font-bold text-blue-600 dark:text-cyan-400">{pointsLeft}</span> {pointsLeft === 1 ? 'point' : 'points'} away from a free wash!
                                    </p>
                                )}
                            </div>

                            {/* Progress Bar (Only show after checking) */}
                            {!initialRender && (
                                <div className="mb-6">
                                    <div className="flex justify-between text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
                                        <span>{currentPoints} / {maxPoints} Points</span>
                                        <span>{Math.round(progressPercentage)}%</span>
                                    </div>
                                    <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-1000 ease-out"
                                            style={{ width: `${progressPercentage}%` }}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Points Circles */}
                            <div className="flex justify-center py-4 mb-6">
                                <Suspense fallback={
                                    <div className="flex items-center gap-2 text-slate-500">
                                        <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                                        Loading...
                                    </div>
                                }>
                                    <PointsCircles maxPoints={8} />
                                </Suspense>
                            </div>

                            {/* Check Button */}
                            <Button
                                variant="default"
                                size='lg'
                                className="w-full group relative overflow-hidden bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold text-lg shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 rounded-2xl py-6 disabled:opacity-70"
                                onClick={handleClick}
                                disabled={isLoading}
                            >
                                <span className="relative z-10 flex items-center justify-center gap-3">
                                    {isLoading ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            Checking...
                                        </>
                                    ) : (
                                        <>
                                            <IoSparkles className="text-xl" />
                                            {initialRender ? 'Check My Points' : 'Refresh Points'}
                                            <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </span>
                            </Button>
                        </div>
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
                            <li>• Earn <strong>1 point</strong> for every wash</li>
                            <li>• Collect <strong>8 points</strong> to get a <strong className="text-blue-600 dark:text-cyan-400">FREE wash!</strong></li>
                            <li>• Points never expire</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PointsAnimation