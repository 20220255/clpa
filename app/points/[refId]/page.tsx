
import { getFName, getRefIdPoints, isClaimed } from "@/utils/actions"
import RefIdPointsGrid from "./RefIdPointsGrid"
import { Suspense } from "react"
import Spinner from "@/components/shared/Spinner"
interface RefPointsPageProps {
    params: Promise<{ refId: string }>;
}

const RefPointsPage = async ({ params }: RefPointsPageProps) => {

    const { refId } = await params;

    // Get first name for a reference ID
    const { firstName } = await getFName(refId)

    // Needed for BreadCrumbs
    // const clerkId = await getClerkId(refId)
    // const userId = clerkId.clerkId

    // Get the total points for the reference ID
    const refIdPoints = await getRefIdPoints(refId)
    const totalPoints = refIdPoints.points?.reduce((acc, point) => {
        return acc + point.points
    }, 0)

    // If free wash isClaimed, don't show the add points button
    const { error } = await isClaimed(refId)
    if (error) {
        console.error(error)
        return
    }
    return (
        <div className="container">
            <div className="flex flex-row justify-around gap-8 m-2">
                <div className="flex flex-col text-left">
                    <h1 className="text-1xl font-bold dark:text-blue-200">{`${firstName} - ${refId}`}</h1>
                </div>
                <h1 className="text-xl font-bold dark:text-blue-200">{`POINTS: ${totalPoints}`}</h1>
            </div>
            <Suspense fallback={<Spinner />}>
                <RefIdPointsGrid refIdPoints={refIdPoints.points} />
            </Suspense>
        </div>
    )
}

export default RefPointsPage
