import { getFirstName, getLatestRefId } from "@/utils/actions"
import { auth } from "@clerk/nextjs/server";
import PointsClientWrapper from "./PointsClientWrapper";
import { redirect } from "next/navigation";

const PointsPage = async () => {

  const { userId } = await auth();

  // Redirect to home if not authenticated
  if (!userId) {
    redirect('/');
  }

  // Get customer first name
  const { firstName } = await getFirstName(userId);

  // Get Clerk ID and latest Reference ID
  const { refId, error: latestRefIdError } = await getLatestRefId();

  return (
    <PointsClientWrapper
      firstName={firstName || ''}
      refId={refId || ''}
      latestRefIdError={latestRefIdError || ''}
    />
  )
}

export default PointsPage

