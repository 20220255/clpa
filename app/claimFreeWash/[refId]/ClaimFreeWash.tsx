'use client'

import { AddRefId, getClerkId, updateClaimed } from "@/utils/actions"
import { useRouter } from "next/navigation"
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
            }

            const clerkId = (await getClerkId(refId))?.clerkId ?? ''

            const { addRefError } = await AddRefId(clerkId)
            if (addRefError) {
                toast.error(addRefError)
                return
            }
            toast.success('Free Wash Claimed!')
            router.push(`/customers/${clerkId}`)

        }
        claimFreeWash()
    }, [refId, router])

    return (<></>)

}

export default ClaimFreeWash
