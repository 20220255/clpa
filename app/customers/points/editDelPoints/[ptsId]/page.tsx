import { getPoint, getRefIdPoints } from "@/utils/actions";
import EditDelForm from "./EditDelForm"
import { PageProps } from "@/.next/types/app/page";
const _ = require('lodash');


interface EditDelPageProps extends PageProps {
    params: Awaited<PageProps['params']>;
}

const EditDelPage = async ({ params }: EditDelPageProps) => {

    const { ptsId } = await params

    // Get points detals from actions
    const { pointDetails, error } = await getPoint(ptsId)

    // Get points detals from actions
    const pointsResponse = { pointDetails: pointDetails!, error: error! }

    // Get total points
    const refId = pointDetails?.referenceId ?? ''
    const { points } = await getRefIdPoints(refId)
    const totalPoints = points?.reduce((acc, point) => {
        return acc + point.points
    }, 0)

    return (
        <div>
            <EditDelForm pointReqDetails={pointsResponse} totalPoints={totalPoints} />
        </div>
    )
}

export default EditDelPage
