import AddPointsForm from "./AddPointsForm"
const _ = require('lodash');

const AddPointsPage = async ({ params }: { params: { refId: string } }) => {

    const refIdName = await params

    const refId = _.split(refIdName.refId, '~', 2)[0]
    const fName = _.split(refIdName.refId, '~', 2)[1]

    return (
        <div>
            <h1 className="text-2xl font-bold dark:text-blue-200">{`${fName} - ${refId}`}</h1>
            {refId && (
                <AddPointsForm refId={refId} fName={fName} />
            )}
        </div>
    )
}

export default AddPointsPage
