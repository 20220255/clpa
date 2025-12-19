import { currentUser } from "@clerk/nextjs/server"
import { db } from "./db"


export const checkUser = async () => {
    try {
        // Check for current logged in clerk user
        const user = await currentUser();

        if (!user) {
            return null;
        }

        const email = user.emailAddresses[0].emailAddress;

        // Use upsert to handle potential race conditions
        // This will update the user if they exist (by clerkUserId) or create them if they don't
        return await db.user.upsert({
            where: {
                clerkUserId: user.id,
            },
            update: {
                email: email,
                firstName: user.firstName ?? '',
                lastName: user.lastName,
                imageUrl: user.imageUrl,
            },
            create: {
                clerkUserId: user.id,
                email: email,
                firstName: user.firstName ?? '',
                lastName: user.lastName,
                imageUrl: user.imageUrl,
                isAdmin: false,
            },
        });
    } catch (error) {
        console.error('checkUser error:', error);
        return null;
    }
};