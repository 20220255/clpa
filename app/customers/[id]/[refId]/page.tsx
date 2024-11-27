import { getClerkId, getRefIdPoints } from "@/utils/actions"
import RefIdPointsGrid from "./RefIdPointsGrid"
import BreadCrumbs from "./BreadCrumbs"
import { Suspense } from "react"
import Spinner from "@/components/shared/Spinner"
import { Button } from "@mui/material"
import Link from "next/link"


const RefPointsPage = async ({ params }: { params: { refId: string } }) => {

    const { refId } = await params
    const refIdPoints = await getRefIdPoints(refId)
    const clerkId = await getClerkId(refId)
    const userId = clerkId.clerkId

    return (
        <div className="container">
            <div className="flex flex-row justify-between">
                <h1 className="text-2xl font-bold dark:text-blue-200">REF ID: {refId}</h1>
                <Button variant="contained" className=" dark:text-white dark:bg-blue-300 mb-2">
                    <Link href={`/customers/points/addPoints/${refId}`}>Add Points</Link>
                </Button>
            </div>
            <BreadCrumbs clerkId={userId || ''} />
            <Suspense fallback={<Spinner />}>
                <RefIdPointsGrid refIdPoints={refIdPoints.points} refId={refId} />
            </Suspense>

        </div>
    )
}

export default RefPointsPage
