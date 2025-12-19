'use client'

import Link from "next/link"
import logo from "../../public/snapLogo.png"
import Image from "next/image"
import { useState, useEffect } from "react"
import { FaUsers, FaTrophy } from "react-icons/fa"

const Logo = ({ isAdmin, error }: { isAdmin?: boolean, error?: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    // Always render the same thing on server and client initially
    const logoImage = (
        <Image
            src={logo}
            priority={true}
            alt="Snapwash Logo"
            width={40}
            height={40}
            className="rounded-lg"
        />
    );

    // Before hydration, just show the logo as a link
    if (!hasMounted) {
        return (
            <div className="p-1 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-200/50 dark:border-blue-700/30">
                {logoImage}
            </div>
        );
    }

    // After hydration - handle error case
    if (error) {
        return (
            <Link href="/" className="p-1 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-200/50 dark:border-blue-700/30">
                {logoImage}
            </Link>
        );
    }

    // Non-admin: simple link to home
    if (isAdmin !== true) {
        return (
            <Link
                href="/"
                className="p-1 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 hover:from-blue-500/20 hover:to-cyan-500/20 border border-blue-200/50 dark:border-blue-700/30 transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/10"
            >
                {logoImage}
            </Link>
        )
    }

    // Admin: show dropdown
    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="p-1 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 hover:from-blue-500/20 hover:to-cyan-500/20 border border-blue-200/50 dark:border-blue-700/30 transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/10"
            >
                {logoImage}
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute left-0 top-full mt-2 z-[100] min-w-[200px] p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-2xl">
                        <Link
                            href="/customers"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                            <FaUsers className="text-blue-500" />
                            <span className="font-medium text-slate-700 dark:text-slate-200">Customers List</span>
                        </Link>
                        <Link
                            href="/customers/topCustomers"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                            <FaTrophy className="text-amber-500" />
                            <span className="font-medium text-slate-700 dark:text-slate-200">Top 25 Customers</span>
                        </Link>
                    </div>
                </>
            )}
        </div>
    )
}

export default Logo
