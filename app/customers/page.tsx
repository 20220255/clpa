import React, { Suspense } from "react";
import { getCustomersTotalPoints, isAdmin } from "@/utils/actions";
import CustomerGrid from "./CustomerGrid";
import Spinner from "@/components/shared/Spinner";
import { redirect } from "next/navigation";


export default async function DataGridPage() {

    const { customersTotalPoints, error } = await getCustomersTotalPoints()

    // only admin can view this page
    const { isRoleAdmin, error: adminError } = await isAdmin();
    if (adminError) {
        // go to home page if there is an error
        redirect('/')
    }

    return (
        <div>
            <h1 className="text-2xl font-bold dark:text-blue-200 mt-4 ">CUSTOMERS</h1>
            <Suspense fallback={<Spinner />}>
                {/* go to homepage if user is not admn */}
                {isRoleAdmin ? <CustomerGrid customersTotalPoints={customersTotalPoints} error={error} /> : redirect('/')}
            </Suspense>
        </div>
    )
}


