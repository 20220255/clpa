import { getCustomerRefIds, getFirstName } from "@/utils/actions"
import React from "react";
import CustomerRefGrid from "./CustomerRefGrid";
import BreadCrumbs from "./BreadCrumbs";


const RefIdsPage = async ({ params }: { params: { id: string } }) => {

    const { id } = await params

    const custRefIds = await getCustomerRefIds(id)

    const firstName = await getFirstName(id)

    return (
        <div>
            <h1 className="text-2xl font-bold dark:text-blue-200">{firstName.firstName}</h1>
            <BreadCrumbs />
            {custRefIds?.custRef && (
                <CustomerRefGrid custRefIds={custRefIds.custRef} />
            )}
        </div>
    )
}

export default RefIdsPage
