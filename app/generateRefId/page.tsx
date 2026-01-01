'use server'

import { getCustomerRefIds } from "@/utils/actions";
import GenerateRefId from "./GenerateRefId"
import { auth } from '@clerk/nextjs/server';
import { redirect } from "next/navigation";



const ModalPage = async () => {

    // const router = useRouter();
    const { userId } = await auth();

    // Search for Ref ID in the User table, if not found, move to Home page
    if (!userId) {
        redirect('/')
    }

    // Search for Ref ID in the Reference table. If found, move to Home page
    // This means the user already has a Ref ID and has already signed up
    const { reference } = await getCustomerRefIds(userId)
    if (reference && reference.length > 0) {
        redirect('/')
    }

    return (
        <div>
            <GenerateRefId userId={userId} />
        </div>
    )
}

export default ModalPage
