import React, { Suspense } from "react";
import { getCustomersTotalPoints } from "@/utils/actions";
import CustomerGrid from "./CustomerGrid";
import Spinner from "@/components/shared/Spinner";


export default async function DataGridPage() {

    const {customersTotalPoints, error} = await getCustomersTotalPoints()

    return (
        <div>
            <h1 className="text-2xl font-bold dark:text-blue-200 mt-4 ">CUSTOMERS</h1>
            <Suspense fallback={<Spinner />}>
                <CustomerGrid customersTotalPoints={customersTotalPoints} error={error} />
            </Suspense>
        </div>
    )
}


