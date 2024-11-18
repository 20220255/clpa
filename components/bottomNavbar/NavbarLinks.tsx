'use client'

import Link from "next/link"
import { BottomNavbarButton, BottomNavBarSpan, HomeIcon, InfoIcon, WasherIcon } from "./BottomNavbar.styles"


interface NavbarLink {
    name: string;
    href: string;
    icon: React.ReactNode;
}

const navbarLinks: NavbarLink[] = [
    {
        name: "Home",
        href: "/",
        icon: <HomeIcon className="dark:text-blue-200  group-hover:text-gray-600 dark:group-hover:text-blue-500" size='1.5rem' />,
    },
    {
        name: "About",
        href: "/about",
        icon: <InfoIcon className="dark:text-blue-200 group-hover:text-gray-600 dark:group-hover:text-blue-500" size='1.5rem' />,
    },
    {
        name: "Points",
        href: "/points",
        icon: <WasherIcon className="dark:text-blue-200 group-hover:text-gray-600 dark:group-hover:text-blue-500" size='1.5rem' />,
    },

];

const NavbarLinks = () => {
    return (
        <>
            {navbarLinks.map((link) => (
                <BottomNavbarButton type="button" className="dark:hover:bg-slate-800 hover:bg-gray-200 group " key={link.name}>
                    <Link href={link.href} className="flex flex-col items-center">
                        {link.icon}
                        <BottomNavBarSpan className="dark:text-blue-200 group-hover:text-gray-600 dark:group-hover:text-blue-200">
                            {link.name}
                        </BottomNavBarSpan>
                    </Link>
                </BottomNavbarButton>
            ))}
        </>
    )
}

export default NavbarLinks
