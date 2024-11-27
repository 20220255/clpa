import { getClerkId, getRefIdPoints } from "@/utils/actions"
import RefIdPointsGrid from "./RefIdPointsGrid"
import BreadCrumbs from "./BreadCrumbs"
import { Suspense } from "react"
import Spinner from "@/components/shared/Spinner"
import { Button } from "@mui/material"
import Link from "next/link"
const _ = require('lodash');

const RefPointsPage = async ({ params }: { params: { refId: string } }) => {

    const refIdName = await params

    const refId = _.split(refIdName.refId, '~', 2)[0]
    const fName = _.split(refIdName.refId, '~', 2)[1]

    const refIdPoints = await getRefIdPoints(refId)
    
    const clerkId = await getClerkId(refId)
    const userId = clerkId.clerkId

    return (
        <div className="container">
            <div className="flex flex-row justify-between m-2">
                <div className="flex flex-col text-left">
                    <h1 className="text-1xl font-bold dark:text-blue-200">{`NAME: ${fName}`}</h1>
                    <h1 className="text-2l font-bold dark:text-blue-200">{`REF ID: ${refId}`}</h1>
                </div>
                <Button variant="contained" size="medium" className=" dark:text-white dark:bg-blue-300 mb-2">
                    <Link href={`/customers/points/addPoints/${refId}~${fName}`}>Add Points</Link>
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
