import { getClerkId, getRefIdPoints } from "@/utils/actions"
import RefIdPointsGrid from "./RefIdPointsGrid"
import BreadCrumbs from "./BreadCrumbs"
import { Suspense } from "react"
import Spinner from "@/components/shared/Spinner"


const RefPointsPage = async ({ params }: { params: { refId: string } }) => {

    const { refId } = await params
    const refIdPoints = await getRefIdPoints(refId)
    const clerkId = await getClerkId(refId)
    const userId = clerkId.clerkId

    return (
        <div>
            <h1 className="text-2xl font-bold dark:text-blue-200">REF ID: {refId}</h1>
            <BreadCrumbs clerkId={userId || ''} />
            <Suspense fallback={<Spinner />}>
                {refIdPoints?.points && (
                    <RefIdPointsGrid refIdPoints={refIdPoints.points} refId={refId} />
                )}
            </Suspense>
        </div>
    )
}

export default RefPointsPage
