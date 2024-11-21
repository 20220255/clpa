import React from "react";
import { getCustomers } from "@/utils/actions";
import CustomerGrid from "./CustomerGrid";


export default async function DataGridPage() {

    const {customers} = await getCustomers()

    // console.log('Customers: ', customers)

    return (
        <div>
            <h1 className="text-2xl font-bold dark:text-blue-200">CUSTOMERS</h1>
            {customers && (
                <CustomerGrid customers={customers} />
            )}
        </div>
    )
}


