import { checkUser } from "@/lib/checkUser";
import { Suspense } from "react";
import Spinner from "../shared/Spinner";
import HeaderButtons from "./HeaderButtons";

const Profile = async () => {
    // Database sync
    await checkUser();

    return (
        <div className="flex items-center">
            <Suspense fallback={<Spinner />}>
                <HeaderButtons />
            </Suspense>
        </div>
    )
}

export default Profile


