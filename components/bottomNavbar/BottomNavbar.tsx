'use client'

import DarkMode from "./DarkMode"
import NavbarLinks from "./NavbarLinks"

const BottomNavbar = () => {
    return (
        <div className="dark:bg-blue-900 bottomNavbar">
            <div className="bottomNavbarBorder">
                <NavbarLinks />
                <DarkMode />
            </div>
        </div>
    )
}

export default BottomNavbar
