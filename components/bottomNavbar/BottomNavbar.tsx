'use client'

import { FaHome } from "react-icons/fa"
import { BottomNavbarDiv, BottomNavbarBorder, BottomNavbarButton, HomeIcon, BottomNavBarSpan, InfoIcon, WasherIcon } from "./BottomNavbar.styles"
import DarkMode from "./DarkMode"

const BottomNavbar = () => {
    return (
        <BottomNavbarDiv className="dark:bg-slate-800">
            <BottomNavbarBorder>
                <BottomNavbarButton type="button" className="dark:hover:bg-slate-800 hover:bg-gray-200 group ">
                    <HomeIcon size='1.5rem' className="dark:text-white  group-hover:text-gray-600 dark:group-hover:text-blue-500" />
                    <BottomNavBarSpan className="dark:text-white group-hover:text-gray-600 dark:group-hover:text-blue-200">Home</BottomNavBarSpan>
                </BottomNavbarButton>
                <BottomNavbarButton type="button" className="dark:hover:bg-slate-800 hover:bg-gray-200 group">
                    <InfoIcon className="dark:text-white group-hover:text-gray-600 dark:group-hover:text-blue-500" size='1.5rem' />
                    <BottomNavBarSpan className="dark:text-white group-hover:text-gray-600 dark:group-hover:text-blue-200">About</BottomNavBarSpan>
                </BottomNavbarButton>
                <BottomNavbarButton type="button" className="dark:hover:bg-slate-800 hover:bg-gray-200 group">
                    <WasherIcon className="dark:text-white group-hover:text-gray-600 dark:group-hover:text-blue-500" size='1.5rem' />
                    <BottomNavBarSpan className="dark:text-white group-hover:text-gray-600 dark:group-hover:text-blue-200">Points</BottomNavBarSpan>
                </BottomNavbarButton>
                
                <DarkMode />

            </BottomNavbarBorder>
        </BottomNavbarDiv>
    )
}

export default BottomNavbar
