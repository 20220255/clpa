import AddPointsForm from "./AddPointsForm"

const AddPointsPage = async ({ params }: { params: { refId: string } }) => {

    const { refId } = await params

    return (
        <div>
            <h1 className="text-2xl font-bold dark:text-blue-200">REF ID: {refId}</h1>
            {refId && (
                <AddPointsForm refId={refId} />
            )}
        </div>
    )
}

export default AddPointsPage
