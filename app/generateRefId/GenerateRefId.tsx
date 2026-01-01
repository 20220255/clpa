'use client'

import * as React from 'react';
import { AddRefId } from '@/utils/actions';
import { toast } from 'react-toastify';
import { IoSparkles } from 'react-icons/io5';
import { FaArrowRight } from 'react-icons/fa';

type GenerateRefIdProps = {
    userId: string | null;
}

const GenerateRefId = (userId: GenerateRefIdProps) => {

    const clerkUserId = userId.userId
    const [isLoading, setIsLoading] = React.useState(false);

    const handleContinue = async () => {
        if (!clerkUserId) {
            toast.error('User ID not found')
            return
        }

        setIsLoading(true);
        const { addRefError } = await AddRefId(clerkUserId)

        if (addRefError) {
            toast.error(addRefError)
            setIsLoading(false);
            return
        }

        location.href = '/points'
    };

    return (
        <div className="min-h-screen relative overflow-hidden flex items-center justify-center px-4">
            {/* Animated Background */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-100 dark:from-slate-900 dark:via-blue-950 dark:to-indigo-950" />
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-40 right-10 w-96 h-96 bg-cyan-400/20 dark:bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-400/10 dark:bg-indigo-500/5 rounded-full blur-3xl" />
            </div>

            {/* Modal Card */}
            <div className="w-full max-w-md bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50 dark:border-slate-700/50 animate-slideUp">
                {/* Header Badge */}
                <div className="flex justify-center mb-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/80 dark:bg-blue-900/50 border border-blue-200 dark:border-blue-700/50">
                        <IoSparkles className="text-blue-600 dark:text-blue-400" />
                        <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Welcome</span>
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4">
                    <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 dark:from-blue-400 dark:via-cyan-300 dark:to-blue-400 bg-clip-text text-transparent">
                        Snapwash Loyalty App
                    </span>
                </h1>

                {/* Description */}
                <p className="text-slate-600 dark:text-slate-300 text-center mb-8 leading-relaxed">
                    Welcome to the Snapwash Loyalty App Program! Avail our services regularly to earn points and get your <span className="text-blue-600 dark:text-cyan-400 font-semibold">free wash</span>.
                </p>

                {/* Continue Button */}
                <button
                    onClick={handleContinue}
                    disabled={isLoading}
                    className="w-full py-4 px-6 rounded-2xl font-semibold text-white text-lg
                        bg-gradient-to-r from-blue-500 via-blue-600 to-cyan-500
                        hover:from-blue-600 hover:via-blue-700 hover:to-cyan-600
                        disabled:opacity-50 disabled:cursor-not-allowed
                        shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30
                        transition-all duration-300 ease-out
                        flex items-center justify-center gap-3"
                >
                    {isLoading ? 'Loading...' : 'Continue'}
                    <FaArrowRight className="text-sm" />
                </button>
            </div>
        </div>
    );
}

export default GenerateRefId