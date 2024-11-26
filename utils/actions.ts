'use server'

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Point, Reference, User } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { nanoid } from "nanoid";


type GetCustomersResponse = {
    customers?: User[];
    error?: string;
  };

// Retrieve all customers
export const getCustomers = async (): Promise<GetCustomersResponse> => {

    try {
        const customers = await db.user.findMany({
            orderBy: {
                createdAt:'desc'
            }
        })
        return {customers}        
    } catch (error) {
        return { error: 'Something went wrong while retrieving customer list. PLease try again. ' }  
    }



}


export type GetCustomersReFId = {
    reference?: Reference[];
    error?: string;
  };
// Retrieve customer's Ref IDs
export const getCustomerRefIds = async (userId: string): Promise<GetCustomersReFId> => {
    
    try {
        const custRef = await db.reference.findMany({
            where: {
                userId
            },
            orderBy: {
                createdAt:'desc'
            },
    
        })
        return {reference: custRef}        
    } catch (error) {
        return { error: 'Something went wrong while getting Reference IDs' }  
    }


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



type GetRefIdPoints = {
    points?: Point[];
    error?: string;
  };
// Get points for a reference ID
export const getRefIdPoints = async (refId: string): Promise<GetRefIdPoints> => {
    
    try {
        const points = await db.point.findMany({
            where: {
                referenceId: refId
            },
            orderBy: {
                createdAt:'desc'
            }
        })
        return {points}        
    } catch (error) {
        return { error: 'Something went wrong while getting your points' }
    }

}


type GetClerkId = {
    reference?: Reference[];
    error?: string;
    clerkId?: string;
  };
// Get clerkId based on Reference ID
export const getClerkId = async (refId: string): Promise<GetClerkId> => {
    
    try {
        const ref = await db.reference.findUnique({
            where: {
                refId
            },
            select: {
                userId: true
            }
        })  
        return {clerkId: ref?.userId}        
    } catch (error) {
        return { error: 'Something went wrong while getting User ID' }
    }
    

}

interface PointType {
    comment?: string | null;
    numWash: number;
    numDry: number;
    pointsDate: string;
    freeWash: boolean;
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

    const freeWash = formData.get('isFreeWash') as string || undefined;
    const comment = formData.get('comment') as string || undefined;
    const numWash = formData.get('numWash') as string || undefined;
    const numDry = formData.get('numDry') as string || undefined;
    const pointsDate = formData.get('pointsDate') as string || undefined;
    const points = parseInt(formData.get('numDry') as string) + parseInt(formData.get('numWash') as string);

    if (!refId || !clerkId || !numWash || !numDry || !pointsDate) {
        return { error: 'Missing required fields' }
    }

    if (points === 0 && freeWash === 'false') {
        return { error: 'There should 1 or more points added' }
    }

    if (points !== 0 && freeWash === 'on') {
        return { error: 'There should not be any points added for free wash' }
    }

    try {
        const pointsAdded: Point = await db.point.create({
            data: {
                points,
                referenceId: refId,
                userId: clerkId,
                comment: comment ?? undefined ?? null ?? '',
                pointsDate,
                numWash: parseInt(numWash),
                numDry: parseInt(numDry),
                freeWash: freeWash === 'on' ? true : false
            }
        })

        revalidatePath(`/customers/points/addPoints/${refId}`)

        return {data: pointsAdded}        
    
    } catch (error) {

        return { error: 'Error adding points' }
    
    }
}


type AddReference = {
    reference?: Reference;
    error?: string;
 };
// Add reference details to the database
// export const AddRefId = async (): Promise<AddReference> => {
//     try {
//         const ref = await db.reference.create({
//             data: {
//                 refId: nanoid(8),
//                 pointIds: [],

//             }
//         })
//         return {reference: ref}        
//     } catch (error) {
//         return { error: 'Something went wrong while adding Reference ID' }
//     }
// }

