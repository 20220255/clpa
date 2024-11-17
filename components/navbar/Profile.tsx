// import { checkUser } from "@/lib/checkUser";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"
import { Button } from "../ui/button";
import { FaSignInAlt } from "react-icons/fa";
import { checkUser } from "@/lib/checkUser";

const Profile = async () => {
    await checkUser();
    return (
        <div>
            <SignedOut>
                <Button asChild variant="ghost" size='lg' className=" text-blue-900 flex justify-center items-center relative">
                    <div>
                        <FaSignInAlt />
                        <SignInButton />
                    </div>
                </Button>
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
        </div>
    )
}

export default Profile
