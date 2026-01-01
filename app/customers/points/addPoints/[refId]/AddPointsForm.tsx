'use client'

import { addPoints, getClerkId } from "@/utils/actions"
import { redirect, useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { toast } from 'react-toastify'
import { FaArrowLeft, FaPlus } from 'react-icons/fa'
import { IoSparkles } from 'react-icons/io5'

const AddPointsForm = ({ refId, totalPoints }: { refId: string, totalPoints: number | undefined }) => {

    const freeWashPoints = 8
    const [datePoints, setDatePoints] = useState('')
    const [numWash, setNumWash] = useState(0)
    const [numDry] = useState(0)
    const [comment, setComment] = useState('')
    const [points, setPoints] = useState(0)
    const [isFreeWash] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const formRef = useRef<HTMLFormElement>(null)

    useEffect(() => {
        setPoints(numWash + numDry)
    }, [numWash, numDry])

    const router = useRouter();

    const handleGoBack = () => {
        router.back();
    };

    const clientAction = async (formData: FormData) => {
        setIsSubmitting(true)

        const currentTotalPoints = parseInt(totalPoints!.toString()) + points

        const freeWash = isFreeWash.toString();
        formData.append('isFreeWash', freeWash);

        const totalPointsNum = parseInt(totalPoints!.toString())
        if ((freeWashPoints !== totalPointsNum && formData.get('isFreeWash') === 'on')) {
            toast.error(`Customer only has ${totalPointsNum} points. Customer needs to have ${freeWashPoints} points before claiming a free wash`)
            setIsSubmitting(false)
            return
        }

        if (currentTotalPoints > freeWashPoints && formData.get('isFreeWash') === 'false') {
            toast.error(`Customer points is over ${freeWashPoints} points.`)
            setIsSubmitting(false)
            return
        }

        const clerkId = (await getClerkId(refId))?.clerkId ?? ''

        const { error } = await addPoints({ formData, refId, clerkId })
        if (error) {
            toast.error(error)
            setIsSubmitting(false)
            return
        } else {
            toast.success('Points added!')
            formRef.current?.reset()
            redirect(`/customers/${clerkId}`)
        }
    }

    return (
        <div className="min-h-screen relative overflow-hidden pb-24">
            {/* Animated Background */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-100 dark:from-slate-900 dark:via-blue-950 dark:to-indigo-950" />
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-40 right-10 w-96 h-96 bg-cyan-400/20 dark:bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-400/10 dark:bg-indigo-500/5 rounded-full blur-3xl" />
            </div>

            <div className="relative flex flex-col items-center px-4 py-8">
                {/* Badge */}
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100/80 dark:bg-blue-900/50 border border-blue-200 dark:border-blue-700/50 backdrop-blur-sm mb-4 animate-fadeIn">
                    <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Add Points</span>
                </div>

                {/* Points Display */}
                <h1 className="text-4xl sm:text-5xl font-bold mb-8 text-center animate-slideUp">
                    <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 dark:from-blue-400 dark:via-cyan-300 dark:to-blue-400 bg-clip-text text-transparent">
                        {isFreeWash ? 'FREE WASH' : `${points} POINTS`}
                    </span>
                </h1>

                {/* Form Card */}
                <div className="w-full max-w-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-xl dark:shadow-2xl p-6 sm:p-8 border border-white/50 dark:border-slate-700/50 animate-slideUp" style={{ animationDelay: '0.1s' }}>
                    <form ref={formRef} action={clientAction} className="space-y-6">
                        {/* Date Input */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Date
                            </label>
                            <input
                                type="date"
                                name="pointsDate"
                                onChange={e => setDatePoints(e.target.value)}
                                value={isFreeWash ? new Date().toISOString().split('T')[0] : datePoints}
                                required
                                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 
                                    focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all
                                    text-slate-800 dark:text-slate-100"
                            />
                        </div>

                        {/* Number of Wash & Dry */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Number of Wash & Dry
                            </label>
                            <input
                                type="number"
                                name="numWash"
                                onChange={e => setNumWash(parseInt(e.target.value) || 0)}
                                value={isFreeWash ? 0 : numWash}
                                min={0}
                                required
                                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 
                                    focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all
                                    text-slate-800 dark:text-slate-100 text-lg font-semibold"
                            />
                        </div>

                        {/* Hidden numDry field */}
                        <input type="hidden" name="numDry" value={numDry} />

                        {/* Comments */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Comments (optional)
                            </label>
                            <textarea
                                name="comment"
                                rows={3}
                                placeholder="Add any notes..."
                                onChange={e => setComment(e.target.value)}
                                value={comment}
                                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 
                                    focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none
                                    text-slate-800 dark:text-slate-100 placeholder-slate-400"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-4 pt-4">
                            <button
                                type="button"
                                onClick={handleGoBack}
                                className="flex-1 py-4 px-6 rounded-2xl font-semibold text-slate-600 dark:text-slate-300 text-lg
                                    bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600
                                    transition-all duration-300 ease-out
                                    flex items-center justify-center gap-2"
                            >
                                <FaArrowLeft className="text-sm" />
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex-1 py-4 px-6 rounded-2xl font-semibold text-white text-lg
                                    bg-gradient-to-r from-blue-500 via-blue-600 to-cyan-500
                                    hover:from-blue-600 hover:via-blue-700 hover:to-cyan-600
                                    disabled:opacity-50 disabled:cursor-not-allowed
                                    shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30
                                    transition-all duration-300 ease-out
                                    flex items-center justify-center gap-2"
                            >
                                <FaPlus className="text-sm" />
                                {isSubmitting ? 'Adding...' : 'Add Points'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Info Card */}
                <div className="w-full max-w-lg mt-6 p-5 bg-gradient-to-r from-blue-50/80 to-cyan-50/80 dark:from-blue-900/30 dark:to-cyan-900/30 backdrop-blur-xl rounded-2xl border border-blue-100 dark:border-blue-800/50 animate-slideUp" style={{ animationDelay: '0.2s' }}>
                    <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                        <IoSparkles className="text-blue-500" />
                        <span className="text-sm">
                            Reference ID: <strong className="text-blue-600 dark:text-cyan-400 font-mono">{refId}</strong>
                        </span>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Current total: <strong>{totalPoints ?? 0}</strong> points
                    </p>
                </div>
            </div>
        </div>
    )
}

export default AddPointsForm
