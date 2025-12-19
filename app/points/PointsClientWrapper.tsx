'use client'

import dynamic from "next/dynamic";

// Dynamically import PointsAnimation with SSR disabled to prevent hydration issues
const PointsAnimation = dynamic(() => import("./PointsAnimation"), {
    ssr: false,
    loading: () => (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-100 dark:from-slate-900 dark:via-blue-950 dark:to-indigo-950">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
    ),
});

interface PointsClientWrapperProps {
    firstName: string;
    refId: string;
    latestRefIdError: string;
}

export default function PointsClientWrapper({ firstName, refId, latestRefIdError }: PointsClientWrapperProps) {
    return (
        <PointsAnimation
            firstName={firstName}
            refId={refId}
            latestRefIdError={latestRefIdError}
        />
    );
}
