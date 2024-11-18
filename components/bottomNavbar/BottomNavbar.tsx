'use client'

import Link from "next/link"
import { BottomNavbarDiv, BottomNavbarBorder, BottomNavbarButton, HomeIcon, BottomNavBarSpan, InfoIcon, WasherIcon } from "./BottomNavbar.styles"
import DarkMode from "./DarkMode"
import NavbarLinks from "./NavbarLinks"

const BottomNavbar = () => {
    return (
        <BottomNavbarDiv className="dark:bg-blue-900">
            <BottomNavbarBorder>
                <NavbarLinks />
                {/* Theme for dark and light mode */}
                <DarkMode />
            </BottomNavbarBorder>
        </BottomNavbarDiv>
    )
}

export default BottomNavbar
