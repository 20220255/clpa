
import ClaimFreeWash from "./ClaimFreeWash"


const ClaimFreeWashPage = async ({ params }: { params: { refId: string } }): Promise<JSX.Element> => {

  const refIdName = await params
  const refId = refIdName.refId

  return (
    <>
      <ClaimFreeWash refId={refId} />
    </>)

}
export default ClaimFreeWashPage
