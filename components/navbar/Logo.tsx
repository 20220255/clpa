import Link from "next/link"
import logo from "../../public/snapLogo.png"
import { Button } from "../ui/button"
import Image from "next/image"

const Logo = () => {
    return (
        <Button asChild variant={"ghost"} size={null}>
            <Link href="/">
                <Image src={logo} alt="logo" width={38} className="rounded-full" />
            </Link>
        </Button>
    )
}

export default Logo
