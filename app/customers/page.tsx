import React, { Suspense } from "react";
import { getCustomersTotalPoints, isAdmin } from "@/utils/actions";
import CustomerGrid from "./CustomerGrid";
import Spinner from "@/components/shared/Spinner";
import { redirect } from "next/navigation";


export default async function DataGridPage() {

    // Check admin status first
    const { isRoleAdmin, error: adminError } = await isAdmin();

    // Redirect if not admin
    if (adminError || isRoleAdmin !== true) {
        redirect('/')
    }

    const { customersTotalPoints, error } = await getCustomersTotalPoints()

    return (
        <div className="min-h-screen pb-24 bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-100 dark:from-slate-900 dark:via-blue-950 dark:to-indigo-950">
            <div className="p-4 sm:p-6 lg:p-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-blue-200 mb-6">
                    CUSTOMERS
                </h1>
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden">
                    <Suspense fallback={<Spinner />}>
                        <CustomerGrid customersTotalPoints={customersTotalPoints} error={error} />
                    </Suspense>
                </div>
            </div>
        </div>
    )
}

