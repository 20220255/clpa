import { getCustomerRefIds, getFirstName, isAdmin } from "@/utils/actions"
import React, { Suspense } from "react";
import CustomerRefGrid from "./CustomerRefGrid";
import BreadCrumbs from "./BreadCrumbs";
import Spinner from "@/components/shared/Spinner";
import { PageProps } from "@/.next/types/app/page";
import { redirect } from "next/navigation";

interface RefIdsPageProps extends PageProps {
    params: Awaited<PageProps['params']>;
}

const RefIdsPage = async ({ params }: RefIdsPageProps) => {

    // Check admin status first
    const { isRoleAdmin, error: adminError } = await isAdmin();
    if (adminError || isRoleAdmin !== true) {
        redirect('/')
    }

    const { id } = await params

    const reference = await getCustomerRefIds(id)

    const firstName = await getFirstName(id)
    const fName = firstName.firstName

    return (
        <div className="min-h-screen pb-24 bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-100 dark:from-slate-900 dark:via-blue-950 dark:to-indigo-950">
            <div className="p-4 sm:p-6 lg:p-8">
                <BreadCrumbs />
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-blue-200 mb-6">
                    Customer: {fName}
                </h1>
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden">
                    <Suspense fallback={<Spinner />}>
                        <CustomerRefGrid reference={reference} errorFN={firstName.firstName} />
                    </Suspense>
                </div>
            </div>
        </div>
    )
}

export default RefIdsPage
