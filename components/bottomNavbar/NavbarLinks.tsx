'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { FaHome } from "react-icons/fa"
import { BiSolidWasher } from "react-icons/bi"
import { useState, useEffect } from "react"

interface NavbarLink {
    name: string;
    href: string;
    icon: React.ReactNode;
    activeIcon: React.ReactNode;
}

const NavbarLinks = () => {
    const pathname = usePathname()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const navbarLinks: NavbarLink[] = [
        {
            name: "Home",
            href: "/",
            icon: <FaHome className="text-xl text-slate-500 dark:text-slate-400 group-hover:text-blue-500 transition-colors" />,
            activeIcon: <FaHome className="text-xl text-white" />,
        },
        {
            name: "Points",
            href: "/points",
            icon: <BiSolidWasher className="text-xl text-slate-500 dark:text-slate-400 group-hover:text-blue-500 transition-colors" />,
            activeIcon: <BiSolidWasher className="text-xl text-white" />,
        },
    ]

    // Render simple placeholders before hydration
    if (!mounted) {
        return (
            <>
                {navbarLinks.map((link) => (
                    <div
                        key={link.name}
                        className="flex flex-col items-center gap-1 px-5 py-2 rounded-xl"
                    >
                        {link.icon}
                        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                            {link.name}
                        </span>
                    </div>
                ))}
            </>
        )
    }

    return (
        <>
            {navbarLinks.map((link) => {
                const isActive = pathname === link.href ||
                    (link.href !== "/" && pathname?.startsWith(link.href))

                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={`group flex flex-col items-center gap-1 px-5 py-2 rounded-xl transition-all duration-200 ${isActive
                            ? 'bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/25'
                            : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                            }`}
                    >
                        {isActive ? link.activeIcon : link.icon}
                        <span className={`text-xs font-medium transition-colors ${isActive
                            ? 'text-white'
                            : 'text-slate-500 dark:text-slate-400 group-hover:text-blue-500'
                            }`}>
                            {link.name}
                        </span>
                    </Link>
                )
            })}
        </>
    )
}

export default NavbarLinks

