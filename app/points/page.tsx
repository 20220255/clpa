import Spinner from "@/components/shared/Spinner";
import { getFirstName, getLatestRefId } from "@/utils/actions"
import { useAuth } from "@clerk/nextjs";
import { Suspense } from "react";
import PointsAnimation from "./PointsAnimation";
import { auth } from "@clerk/nextjs/server";


const PointsPage = async () => {

  const { userId } = await auth();

  // Get customer first name
  const {firstName, error} = await getFirstName(userId!);
  

  // Get Clerk ID and latest Reference ID
  const { refId, error : latestRefIdError } = await getLatestRefId();



  return (
    <Suspense fallback={<Spinner />}>
      <PointsAnimation firstName={firstName || ''} refId={refId || ''} latestRefIdError={latestRefIdError || ''} />
    </Suspense>
  )
}

export default PointsPage
