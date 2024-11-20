import { db } from "@/lib/db";
import { User } from "@prisma/client";


// Retrieve all customers
export const getCustomers = async (): Promise<{customers?: User[]}> => {
    const customers = await db.user.findMany({
        orderBy: {
            createdAt:'desc'
        }
    })
    return {customers}
}

