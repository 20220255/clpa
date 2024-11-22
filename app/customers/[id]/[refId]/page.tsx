import { getRefIdPoints } from "@/utils/actions"
import RefIdPointsGrid from "./RefIdPointsGrid"


const RefPointsPage = async({ params }: { params: { refId: string } }) => {

    const { refId } = await params

    const refIdPoints = await getRefIdPoints(refId)

    console.log('refIdPoints: ', refIdPoints)

    return (
        <div>
            <div>
                <h1 className="text-2xl font-bold dark:text-blue-200">REF ID: {refId}</h1>
                {refIdPoints?.points && (
                    <RefIdPointsGrid refIdPoints={refIdPoints.points} />
                )}
            </div>
        </div>
    )
}

export default RefPointsPage
