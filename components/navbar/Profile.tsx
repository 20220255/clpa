
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"
import { Button } from "../ui/button";
import { FaSignInAlt } from "react-icons/fa";
import { checkUser } from "@/lib/checkUser";
import { Suspense } from "react";
import Spinner from "../shared/Spinner";

const Profile = async () => {
    await checkUser();
    return (
        <div>
            <SignedOut>
                <Button asChild variant="ghost" size='lg' className=" dark:text-blue-200 text-blue-900 flex justify-center items-center relative">
                    <div>
                        <FaSignInAlt />
                        <SignInButton signUpForceRedirectUrl='/generateRefId' />
                    </div>
                </Button>
            </SignedOut>
            <Suspense fallback={<Spinner />}>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </Suspense>
        </div>
    )
}

export default Profile
