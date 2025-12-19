'use client'

import { AddRefId, getClerkId, updateClaimed } from "@/utils/actions"
import { refreshPoints } from "@/app/actions/revalidate"
// import { revalidatePath } from "next/cache"
import { useRouter } from "next/navigation"
// import { useRouter } from "next/router"
import { useEffect } from "react"
import { toast } from "react-toastify"

const ClaimFreeWash = ({ refId }: { refId: string }): JSX.Element => {

    const router = useRouter()

    useEffect(() => {

        const claimFreeWash = async () => {

            const claimedDate = new Date().toLocaleDateString()
            const { error } = await updateClaimed(refId, claimedDate)
            if (error) {
                toast.error(error)
                await refreshPoints()
                // revalidatePath("/points")
            }

            const clerkId = (await getClerkId(refId))?.clerkId ?? ''

            const { addRefError } = await AddRefId(clerkId)
            if (addRefError) {
                toast.error(addRefError)
                refreshPoints
                // revalidatePath("/points")
                return
            }
            toast.success('Free Wash Claimed!')
            router.push(`/customers/${clerkId}`)

        }
        claimFreeWash()
    }, []
    )



    return (<></>)





}


export default ClaimFreeWash
