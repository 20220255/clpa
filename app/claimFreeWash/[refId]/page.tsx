import ClaimFreeWash from "./ClaimFreeWash"

interface ClaimFreeWashPageProps {
  params: Promise<{ refId: string }>;
}

const ClaimFreeWashPage = async ({ params }: ClaimFreeWashPageProps): Promise<JSX.Element> => {

  const { refId } = await params

  return (
    <>
      <ClaimFreeWash refId={refId} />
    </>)

}
export default ClaimFreeWashPage
