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

/**
 * Retrieve all customers 
 * @returns {Promise<GetCustomersResponse>}
 */
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


export type IsClaimedResponse = {
    isClaimedRef?: boolean;
    error?: string;
};    

/**
 * Check if reference ID has been claimed
 * @param refId 
 * @returns {boolean}
 */
export const isClaimed = async (refId: string): Promise<IsClaimedResponse> => {

    try {
        const ref = await db.reference.findUnique({
            where: {
                refId
            },
            select: {
                claimed: true
            }
        })  
        return {isClaimedRef: ref?.claimed}
    } catch (error) {
        return { error: 'Something went wrong while checking if Reference ID has been claimed' };
    }
}


export type GetCustomersReFId = {
    reference?: Reference[];
    error?: string;
  };
 
/**
 * Retrieve customer's Ref IDs
 * @param userId 
 * @returns {Promise<GetCustomersReFId>}
 * 
 */
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

/**
 * Get user's first name
 * @param userId 
 * @returns {Promise<{firstName?: string, error?: string}>}
 * 
 */
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

/**
 * Get points detailsfor a reference ID
 * @param refId 
 * @returns {Promise<GetRefIdPoints>}
 */ 
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
 
/**
 * Get clerkId based on Reference ID
 * @param refId 
 * @returns {Promise<GetClerkId>}
 */
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


interface TransactionResult {
    data?: PointType;
    error?: string;
}  

/**
 * Add points to a reference ID
 * @param formData 
 * @param refId 
 * @param clerkId
 * @returns {Promise<TransactionResult>}
 */
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
        return { error: 'There should be 1 or more points added' }
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
    addRefError?: string;
 };

 /**
 * Add reference details to the database
 * @param clerkId 
 * @returns {Promise<AddReference>}
 */ 

export const AddRefId = async (clerkId: string ): Promise<AddReference> => {
    try {

        const refId = await nanoid(8);

        const ref = await db.reference.create({
            data: {
                refId,
                userId: clerkId,
            }
        })
        return {reference: ref}        
    } catch (error) {
        return { addRefError: 'Something went wrong while adding Reference ID' }
    }
}

// Update claimed in Reference table to true
export const updateClaimed = async (refId: string, claimedDate: string): Promise<{error?: string}> => {
    try {
        await db.reference.update({
            where: {
                refId
            },
            data: {
                claimed: true,
                claimedDate
            }
        })
        return {}
    } catch (error) {
        return { error: 'Something went wrong while updating Reference ID' }
    }
}


export type PointResponse = {
    pointDetails?: {
        id: string;
        comment?: string | null;
        numWash: number;
        numDry: number;
        pointsDate: string;
        freeWash: boolean;
        referenceId: string;
    };
    error?: string;
}

/**
 * Get points details for a point ID
 * @param pointId 
 * @returns {Promise<{point?: Point, error?: string}>}
 */
export const getPoint = async (pointId: string): Promise<PointResponse> => {
    try {
        const pointDetails = await db.point.findUnique({
            where: {
                id: pointId
            },
            select: {
                id: true,
                comment: true,
                numWash: true,
                numDry: true,
                pointsDate: true,
                freeWash: true,
                referenceId: true
            }
        })
        return {pointDetails: pointDetails!}
    } catch (error) {
        return { error: 'Something went wrong while getting point details' }
    }
}

interface UpdatePointResponse {
    pointDetails?: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        points: number;
        pointsDate: string;
        numWash: number;
        numDry: number;
        comment: string | null;
        freeWash: boolean;
        referenceId: string;
    };
    error?: string;
}


/**
 * Update points details for a point ID
 * @param pointId 
 * @param formData 
 * @returns {Promise<{point?: Point, error?: string}>}
 */
export const updatePoint = async (pointId: string, formData: FormData): Promise<UpdatePointResponse> => {
    
    try {
        const comment = formData.get('comment') as string || undefined;
        const numWash = formData.get('numWash') as string || undefined;
        const numDry = formData.get('numDry') as string || undefined;
        const pointsDate = formData.get('pointsDate') as string || undefined;
        const freeWash = formData.get('freeWash') as string || undefined;
        const points = parseInt(formData.get('numDry') as string) + parseInt(formData.get('numWash') as string);

        if (!pointId || !numWash || !numDry || !pointsDate) {
            return { error: 'Missing required fields' }
        }

        const pointDetails = await db.point.update({
            where: {
                id: pointId
            },
            data: {
                comment: comment ?? undefined ?? null ?? '',
                numWash: parseInt(numWash),
                numDry: parseInt(numDry),
                pointsDate,
                freeWash: freeWash === 'on' ? true : false,
                points
            }
        })        
        return {pointDetails: pointDetails}
    } catch (error) {
        return { error: 'Something went wrong while updating point details' }
    }
}


/**
 * Delete points details for a point ID
 * @param pointId 
 * @returns {Promise<{point?: Point, error?: string}>}
 */
export const deletePoint = async (pointId: string): Promise<{error?: string}> => {
    try {
        await db.point.delete({
            where: {
                id: pointId
            }
        })
        return {}
    } catch (error) {
        return { error: 'Something went wrong while deleting point details' }
    }
}

/**
 * Get first name for a reference ID
 * @param refId 
 * @returns {Promise<{firstName?: string, error?: string}>}
 */
export const getFName = async (refId: string): Promise<{firstName?: string, error?: string}> => {
    try {
        const firstName = await db.reference.findUnique({
            where: {
                refId
            },
            select: {
                userId: true
            }
        })

        const user = await db.user.findUnique({
            where: {
                clerkUserId: firstName!.userId
            },
            select: {
                firstName: true
            }
        })
        return {firstName: user?.firstName ?? undefined}
    } catch (error) {
        return { error: 'Something went wrong while getting first name' }   
    } 
}

/**
 * Get the user's total points from the latest reference ID
 * @returns {Promise<{points?: number, error?: string}>}
 */
export const getUserLatestRefPoints = async (): Promise<{points?: number, error?: string}> => {
    try {
        const {userId} =  await auth()

        if (!userId) {
            return {error: 'User not found'}
        }

        // Get latest reference ID
        const reference = await db.reference.findFirst({
            where: {
                userId
            },
            orderBy: {
                createdAt: 'desc'
            },
            select: {
                refId: true
            }
        })

        if (!reference) {
            return {points: 0}
        }
        const refId = reference.refId

        const points = await db.point.findMany({
            where: {
                userId,
                referenceId: refId
            },
            orderBy: {
                pointsDate: 'desc'
            },
            select: {
                points: true
            }
        })
        return {points: points.reduce((a, b) => a + b.points, 0)}
    } catch (error) {
        return { error: 'Something went wrong while getting points' }   
    } 
}