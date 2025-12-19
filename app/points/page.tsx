import Spinner from "@/components/shared/Spinner";
import { getFirstName, getLatestRefId } from "@/utils/actions"
import { Suspense } from "react";
import { auth } from "@clerk/nextjs/server";
import PointsClientWrapper from "./PointsClientWrapper";

const PointsPage = async () => {

  const { userId } = await auth();

  // Get customer first name
  const { firstName } = await getFirstName(userId!);

  // Get Clerk ID and latest Reference ID
  const { refId, error: latestRefIdError } = await getLatestRefId();

  return (
    <Suspense fallback={<Spinner />}>
      <PointsClientWrapper
        firstName={firstName || ''}
        refId={refId || ''}
        latestRefIdError={latestRefIdError || ''}
      />
    </Suspense>
  )
}

export default PointsPage
