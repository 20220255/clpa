
import { PageProps } from "@/.next/types/app/page";
import ClaimFreeWash from "./ClaimFreeWash"

interface ClaimFreeWashPageProps extends PageProps {
  params: Awaited<PageProps['params']>;
}

const ClaimFreeWashPage = async ({ params }: ClaimFreeWashPageProps): Promise<JSX.Element> => {

  const refIdName = await params
  const refId = refIdName.refId

  return (
    <>
      <ClaimFreeWash refId={refId} />
    </>)

}
export default ClaimFreeWashPage
