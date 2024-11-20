'use client'

import Link from "next/link"
import logo from "../../public/snapLogo.png"
import { Button } from "../ui/button"
import Image from "next/image"
import { Menu, MenuItem } from "@mui/material"
import { useState } from "react"

const Logo = () => {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClickCustomer = (event: React.MouseEvent<HTMLElement>) => {
        <Link href="/customers">Customer</Link>
    };

    return (
        <Button asChild variant={"ghost"} size={null}>
            {/* <Link href="/">
                <Image src={logo} alt="logo" width={38} className="rounded-full" />
                </Link> */}
            <div>
                <Image src={logo} alt="logo" width={38} className="rounded-full" onClick={handleClick} />
                <Menu
                    id="demo-positioned-menu"
                    aria-labelledby="demo-positioned-button"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                >
                    <MenuItem>
                        <Link href="/customers">Customer</Link>
                        {/* Customers */}
                    </MenuItem>
                    <MenuItem >
                        <Link href="/">Home</Link>
                    </MenuItem>

                </Menu>
            </div>
        </Button>
    )
}

export default Logo
