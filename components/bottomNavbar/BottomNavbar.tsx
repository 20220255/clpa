'use client'

import Link from "next/link"
import { BottomNavbarDiv, BottomNavbarBorder, BottomNavbarButton, HomeIcon, BottomNavBarSpan, InfoIcon, WasherIcon } from "./BottomNavbar.styles"
import DarkMode from "./DarkMode"

const BottomNavbar = () => {
    return (
        <BottomNavbarDiv className="dark:bg-slate-800">
            <BottomNavbarBorder>
                <BottomNavbarButton type="button" className="dark:hover:bg-slate-800 hover:bg-gray-200 group ">
                    <Link href="/" className="flex flex-col items-center">
                        <HomeIcon size='1.5rem' className="dark:text-blue-200  group-hover:text-gray-600 dark:group-hover:text-blue-500" />
                        <BottomNavBarSpan className="dark:text-blue-200 group-hover:text-gray-600 dark:group-hover:text-blue-200">Home</BottomNavBarSpan>
                    </Link>
                </BottomNavbarButton>
                <BottomNavbarButton type="button" className="dark:hover:bg-slate-800 hover:bg-gray-200 group">
                    <Link href="/about" className="flex flex-col items-center">
                        <InfoIcon className="dark:text-blue-200 group-hover:text-gray-600 dark:group-hover:text-blue-500" size='1.5rem' />
                        <BottomNavBarSpan className="dark:text-blue-200 group-hover:text-gray-600 dark:group-hover:text-blue-200">About</BottomNavBarSpan>
                    </Link>
                </BottomNavbarButton>
                <BottomNavbarButton type="button" className="dark:hover:bg-slate-800 hover:bg-gray-200 group">
                    <Link href="/points" className="flex flex-col items-center">
                        <WasherIcon className="dark:text-blue-200 group-hover:text-gray-600 dark:group-hover:text-blue-500" size='1.5rem' />
                        <BottomNavBarSpan className="dark:text-blue-200 group-hover:text-gray-600 dark:group-hover:text-blue-200">Points</BottomNavBarSpan>
                    </Link>
                </BottomNavbarButton>

                <DarkMode />

            </BottomNavbarBorder>
        </BottomNavbarDiv>
    )
}

export default BottomNavbar
