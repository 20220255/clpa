import { getCustomerRefIds, getFirstName } from "@/utils/actions"
import React, { Suspense } from "react";
import CustomerRefGrid from "./CustomerRefGrid";
import BreadCrumbs from "./BreadCrumbs";
import Spinner from "@/components/shared/Spinner";
import { PageProps } from "@/.next/types/app/page";

interface RefIdsPageProps extends PageProps {
    params: Awaited<PageProps['params']>;
  }

const RefIdsPage = async ({ params }: RefIdsPageProps) => {

    const { id } = await params

    const reference = await getCustomerRefIds(id)

    const firstName = await getFirstName(id)
    const fName = firstName.firstName
    // TODO: Get the total points for customer. This is for data gathering
    return (
        <div>
            <h1 className="text-2xl font-bold dark:text-blue-200">{`Name: ${fName}`}</h1>
            <BreadCrumbs />
            <Suspense fallback={<Spinner />}>
                <CustomerRefGrid reference={reference} errorFN={firstName.firstName} fName={fName} />
            </Suspense>
        </div>
    )
}

export default RefIdsPage
