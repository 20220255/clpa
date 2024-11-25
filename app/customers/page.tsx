import React, { Suspense } from "react";
import { getCustomers } from "@/utils/actions";
import CustomerGrid from "./CustomerGrid";
import Spinner from "@/components/shared/Spinner";


export default async function DataGridPage() {

    const { customers, error } = await getCustomers()

    return (
        <div>
            <h1 className="text-2xl font-bold dark:text-blue-200 mt-4 ">CUSTOMERS</h1>
            <Suspense fallback={<Spinner />}>
                <CustomerGrid customers={customers} error={error} />
            </Suspense>
        </div>
    )
}


