'use server'

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Point, Reference, User } from "@prisma/client";
import { revalidatePath } from "next/cache";


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

// Get clerkId based on Reference ID
export const getClerkId = async (refId: string): Promise<{clerkId?: string | null}> => {
    const ref = await db.reference.findUnique({
        where: {
            refId
        },
        select: {
            userId: true
        }
    })
    return {clerkId: ref?.userId}
}

interface PointType {
    // refId: string;
    // clerkId: string;
    comment: string;
    numWash: number;
    numDry: number;
    pointsDate: string;
}

// Add points to a reference ID
interface TransactionResult {
    data?: PointType;
    error?: string;
}  

export const addPoints = async ({formData, refId, clerkId}: {formData: FormData, refId: string, clerkId: string}): Promise<TransactionResult> => {

    // Get logged in user
    const {userId} =  await auth()

    // Check for user
    if (!userId) {
        return { error: 'User not found' }
    }

    const comment = formData.get('comment') as string || undefined;
    const numWash = formData.get('numWash') as string || undefined;
    const numDry = formData.get('numDry') as string || undefined;
    const pointsDate = formData.get('pointsDate') as string || undefined;
    const points = parseInt(formData.get('numDry') as string) + parseInt(formData.get('numWash') as string);
    
        if (!refId || !clerkId || !comment || !numWash || !numDry || !pointsDate) {
        return { error: 'Missing required fields' }
    }

    try {
        const pointsAdded: Point = await db.point.create({
            data: {
                points,
                referenceId: refId,
                userId: clerkId,
                comment,
                pointsDate,
                numWash: parseInt(numWash),
                numDry: parseInt(numDry),
            }
        })

        revalidatePath(`/customers/points/addPoints/${refId}`)

        return {data: pointsAdded}        
    
    } catch (error) {

        return { error: 'Error adding transaction' }
    
    }
}