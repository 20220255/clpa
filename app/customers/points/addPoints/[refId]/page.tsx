import { getRefIdPoints } from "@/utils/actions";
import AddPointsForm from "./AddPointsForm"
const _ = require('lodash');

const AddPointsPage = async ({ params }: { params: { refId: string } }) => {

    const refIdName = await params

    const refId = _.split(refIdName.refId, '~', 2)[0]
    const fName = _.split(refIdName.refId, '~', 2)[1]
    // const totalPoints = _.split(refIdName.refId, '~', 3)[2]

    // Get total points
    const {points} = await getRefIdPoints(refId)
    const totalPoints = points?.reduce((acc, point) => {
        return acc + point.points
    }, 0)

    return (
        <div>
            <h1 className="text-2xl font-bold dark:text-blue-200">{`${fName} - ${refId}`}</h1>
            {refId && (
                <AddPointsForm refId={refId} fName={fName} totalPoints={totalPoints} />
            )}
        </div>
    )
}

export default AddPointsPage
