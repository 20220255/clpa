import { getCustomerRefIds, getFirstName } from "@/utils/actions"
import React, { Suspense } from "react";
import CustomerRefGrid from "./CustomerRefGrid";
import BreadCrumbs from "./BreadCrumbs";
import Spinner from "@/components/shared/Spinner";


const RefIdsPage = async ({ params }: { params: { id: string } }) => {

    const { id } = await params

    const reference = await getCustomerRefIds(id)

    const firstName = await getFirstName(id)

    return (
        <div>
            <h1 className="text-2xl font-bold dark:text-blue-200">{`Name: ${firstName.firstName}`}</h1>
            <BreadCrumbs />
            <Suspense fallback={<Spinner />}>
                <CustomerRefGrid reference={reference} errorFN={firstName.firstName}/>
            </Suspense>
        </div>
    )
}

export default RefIdsPage
