
import { getClerkId, getRefIdPoints, isClaimed } from "@/utils/actions"
import RefIdPointsGrid from "./RefIdPointsGrid"
import BreadCrumbs from "./BreadCrumbs"
import { Suspense } from "react"
import Spinner from "@/components/shared/Spinner"
import { Button } from "@mui/material"
import Link from "next/link"
const _ = require('lodash');

const RefPointsPage = async ({ params }: { params: { refId: string } }) => {

    const refIdName = await params
    const freeWashPoints = 8
    const refId = _.split(refIdName.refId, '~', 2)[0]
    const fName = _.split(refIdName.refId, '~', 2)[1]

    // Needed for BreadCrumbs
    const clerkId = await getClerkId(refId)
    const userId = clerkId.clerkId

    // Get the total points for the reference ID
    const refIdPoints = await getRefIdPoints(refId)
    const totalPoints = refIdPoints.points?.reduce((acc, point) => {
        return acc + point.points
    }, 0)

    // If free wash isClaimed, don't show the add points button
    const { isClaimedRef, error } = await isClaimed(refId)
    if (error) {
        alert(error)
        return
    }

    return (
        <div className="container">
            <div className="flex flex-row justify-around gap-8 m-2">
                <div className="flex flex-col text-left">
                    <h1 className="text-1xl font-bold dark:text-blue-200">{`${fName} - ${refId}`}</h1>
                </div>
                <h1 className="text-xl font-bold dark:text-blue-200">{`POINTS: ${totalPoints}`}</h1>
                {(!isClaimedRef && totalPoints! < freeWashPoints) ? (
                    <Button variant="contained" size="small" className=" dark:text-white dark:bg-blue-300 mb-2">
                        <Link href={`/customers/points/addPoints/${refId}~${fName}`}>Add Points</Link>
                    </Button>
                ) : (totalPoints === freeWashPoints && !isClaimedRef) &&
                    <Button variant="contained" size="small" className=" dark:text-white dark:bg-blue-300 mb-2">
                        <Link href={`/claimFreeWash/${refId}`}>Free Wash</Link>
                    </Button>
                 }
            </div>
            <BreadCrumbs clerkId={userId || ''} />
            <Suspense fallback={<Spinner />}>
                <RefIdPointsGrid refIdPoints={refIdPoints.points} />
            </Suspense>

        </div>
    )
}

export default RefPointsPage
