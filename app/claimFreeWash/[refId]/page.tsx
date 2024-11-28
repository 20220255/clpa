

import { AddRefId, getClerkId, updateClaimed } from "@/utils/actions"
import { revalidatePath } from "next/cache"
import { useEffect } from "react"
import { toast } from "react-toastify"
import ClaimFreeWash from "./ClaimFreeWash"
const _ = require('lodash');


// const ClaimFreeWashPage = async ({ params }: { params: { refId: string } }): Promise<JSX.Element> => {
const ClaimFreeWashPage = async ({ params }: { params: { refId: string } }): Promise<JSX.Element> => {

  const refIdName = params
  const refId = refIdName.refId

  return (
    <>
      <ClaimFreeWash refId={refId} />
    </>)

}
export default ClaimFreeWashPage
