'use client'

import DarkMode from "./DarkMode"
import NavbarLinks from "./NavbarLinks"

const BottomNavbar = () => {
    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 pb-safe-bottom">
            <div className="max-w-md mx-auto">
                <div className="flex items-center justify-around bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-white/30 dark:border-slate-700/50 shadow-2xl shadow-black/10 dark:shadow-black/30 px-2 py-3">
                    <NavbarLinks />
                    <DarkMode />
                </div>
            </div>
        </div>
    )
}

export default BottomNavbar

