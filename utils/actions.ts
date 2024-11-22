import { db } from "@/lib/db";
import { Point, Reference, User } from "@prisma/client";


// Retrieve all customers
export const getCustomers = async (): Promise<{customers?: User[]}> => {
    const customers = await db.user.findMany({
        orderBy: {
            createdAt:'desc'
        }
    })
    return {customers}
}

// Retrieve customer's Ref IDs
export const getCustomerRefIds = async (userId: string): Promise<{custRef?: Reference[]}> => {
    
    const custRef = await db.reference.findMany({
        where: {
            userId
        },
        orderBy: {
            createdAt:'desc'
        },

    })
    return {custRef}
}           

// Get user's first name
export const getFirstName = async (userId: string): Promise<{firstName?: string, error?: string}> => {
    
    try {
        const user = await db.user.findUnique({
            where: {
                clerkUserId: userId
            },
            select: {
                firstName: true
            }
        })
        return {firstName: user?.firstName || undefined}    

    } catch (error) {
        return { error: 'Something went wrong while getting the first name' }  
    }
    
}


// Get points for a reference ID
export const getRefIdPoints = async (refId: string): Promise<{points?: Point[]}> => {
    const points = await db.point.findMany({
        where: {
            referenceId: refId
        },
        orderBy: {
            createdAt:'desc'
        }
    })
    return {points}
}