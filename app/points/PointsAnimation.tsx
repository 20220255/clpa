'use client'

import PointsCircles from "./PointsCircles"
import JSConfetti from "js-confetti"
import { useRef, useState, useEffect } from "react"
import animatePoints from "./utils/animatePoints"
import { getUserLatestRefPoints } from "@/utils/actions"
import { toast } from "react-toastify"
import Link from "next/link"
import { FaArrowRight, FaInfoCircle } from "react-icons/fa"
import { IoSparkles } from "react-icons/io5"
import { HiSparkles } from "react-icons/hi2"

const PointsAnimation = ({ firstName, refId, latestRefIdError }: { firstName: string | null, refId: string | null, latestRefIdError: string | null }) => {

    const maxPoints = 10
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const confettiRef = useRef<JSConfetti | null>(null);

    const [pointsLeft, setPointsLeft] = useState<number | null>(null)
    const [, setCurrentPoints] = useState<number | null>(null)
    const [initialRender, setinitialRender] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (latestRefIdError) {
            toast.error(latestRefIdError);
        }
    }, [latestRefIdError]);

    if (latestRefIdError) {
        return null;
    }

    const handlePointsClaimed = async (points: number): Promise<void> => {
        if (points >= 10) {
            points = 10;
        }
        await animatePoints(points, maxPoints);
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

    return (
        <div className="min-h-screen relative overflow-hidden pb-24">
            {/* Animated Background - Same as Homepage */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-100 dark:from-slate-900 dark:via-blue-950 dark:to-indigo-950" />
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-40 right-10 w-96 h-96 bg-cyan-400/20 dark:bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-400/10 dark:bg-indigo-500/5 rounded-full blur-3xl" />
            </div>

            <div className="relative flex flex-col items-center px-4 py-8">
                {/* Points Tracker Badge - No Icon */}
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100/80 dark:bg-blue-900/50 border border-blue-200 dark:border-blue-700/50 backdrop-blur-sm mb-4 animate-fadeIn">
                    <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Points Tracker</span>
                </div>

                {/* Main Heading */}
                <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center animate-slideUp">
                    {initialRender ? (
                        <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 dark:from-blue-400 dark:via-cyan-300 dark:to-blue-400 bg-clip-text text-transparent">
                            Welcome, {firstName}!
                        </span>
                    ) : pointsLeft === 0 ? (
                        <span className="bg-gradient-to-r from-emerald-500 via-cyan-500 to-emerald-500 bg-clip-text text-transparent">
                            🎉 Congratulations, {firstName}!
                        </span>
                    ) : (
                        <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 dark:from-blue-400 dark:via-cyan-300 dark:to-blue-400 bg-clip-text text-transparent">
                            Keep Going, {firstName}!
                        </span>
                    )}
                </h1>

                {/* Main Card */}
                <div className="w-full max-w-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-xl dark:shadow-2xl p-6 sm:p-8 border border-white/50 dark:border-slate-700/50 animate-slideUp" style={{ animationDelay: '0.1s' }}>
                    {/* Status Text */}
                    <p className="text-center text-slate-600 dark:text-slate-300 text-lg mb-6">
                        {initialRender ? (
                            <>Tap <span className="text-blue-500 font-semibold">Refresh Points</span> to check your rewards!</>
                        ) : pointsLeft === 0 ? (
                            <>Claim your <span className="text-emerald-500 font-semibold">FREE wash</span> today!</>
                        ) : (
                            <>You&apos;re <span className="text-blue-500 font-bold text-xl">{pointsLeft}</span> points away from a free wash!</>
                        )}
                    </p>

                    {/* Points Circles */}
                    <div className="mb-6">
                        <PointsCircles maxPoints={10} />
                    </div>

                    {/* Refresh Button */}
                    <button
                        onClick={handleClick}
                        disabled={isLoading}
                        className="w-full py-4 px-6 rounded-2xl font-semibold text-white text-lg
                            bg-gradient-to-r from-blue-500 via-blue-600 to-cyan-500
                            hover:from-blue-600 hover:via-blue-700 hover:to-cyan-600
                            disabled:opacity-50 disabled:cursor-not-allowed
                            shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30
                            transition-all duration-300 ease-out
                            flex items-center justify-center gap-3"
                    >
                        <HiSparkles className="text-xl" />
                        {isLoading ? 'Loading...' : 'Refresh Points'}
                        <FaArrowRight className="text-sm" />
                    </button>
                </div>

                {/* Reference ID Card */}
                <div className="w-full max-w-lg mt-6 p-5 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-lg dark:shadow-xl border border-white/50 dark:border-slate-700/50 animate-slideUp" style={{ animationDelay: '0.2s' }}>
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

                {/* How it works Card */}
                <div className="w-full max-w-lg mt-4 p-5 bg-gradient-to-r from-blue-50/80 to-cyan-50/80 dark:from-blue-900/30 dark:to-cyan-900/30 backdrop-blur-xl rounded-2xl border border-blue-100 dark:border-blue-800/50 animate-slideUp" style={{ animationDelay: '0.3s' }}>
                    <h3 className="font-semibold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
                        <IoSparkles className="text-blue-500" />
                        How it works
                    </h3>
                    <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
                        <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0"></span>
                            <span>Earn <strong>1 point</strong> for every wash and dry</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0"></span>
                            <span>Collect <strong>10 points</strong> to get a <strong className="text-blue-600 dark:text-cyan-400">FREE wash!</strong></span>
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0"></span>
                            <span>Points never expire</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default PointsAnimation