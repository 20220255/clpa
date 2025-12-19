import { currentUser } from "@clerk/nextjs/server"
import { db } from "./db"

/**
 * Synchronizes the Clerk user with our local database.
 * Uses a robust check-merge-create pattern to prevent unique constraint errors
 * and account for race conditions during high-concurrency production environments.
 */
export const checkUser = async () => {
    try {
        const user = await currentUser();

        if (!user) {
            return null;
        }

        const email = user.emailAddresses[0].emailAddress;

        // 1. Try to find the user by their Clerk ID
        let loggedInUser = await db.user.findUnique({
            where: {
                clerkUserId: user.id,
            },
        });

        // 2. If not found by Clerk ID, check if they exist by Email
        // This handles users who may have previously logged in with a different social provider
        if (!loggedInUser) {
            loggedInUser = await db.user.findUnique({
                where: {
                    email: email,
                },
            });

            // If found by email, merge the accounts by updating the clerkUserId
            if (loggedInUser) {
                loggedInUser = await db.user.update({
                    where: { email: email },
                    data: { clerkUserId: user.id }
                });
            }
        }

        // 3. Create the user record if it still doesn't exist
        if (!loggedInUser) {
            try {
                loggedInUser = await db.user.create({
                    data: {
                        clerkUserId: user.id,
                        email: email,
                        firstName: user.firstName ?? '',
                        lastName: user.lastName,
                        imageUrl: user.imageUrl,
                        isAdmin: false,
                    },
                });
            } catch (error: unknown) {
                // P2002 is Prisma's code for "Unique constraint failed"
                // If this happens, it means a concurrent request just finished creating the user.
                // We handle this gracefully by simply fetching the record that was just created.
                const prismaError = error as { code?: string };
                if (prismaError.code === 'P2002') {
                    loggedInUser = await db.user.findUnique({
                        where: { clerkUserId: user.id }
                    });
                } else {
                    throw error;
                }
            }
        } else {
            // 4. If the user already existed, keep their profile info in sync with Clerk
            loggedInUser = await db.user.update({
                where: { clerkUserId: user.id },
                data: {
                    firstName: user.firstName ?? '',
                    lastName: user.lastName,
                    imageUrl: user.imageUrl,
                }
            });
        }

        return loggedInUser;
    } catch (error) {
        console.error('checkUser fatal error:', error);
        return null;
    }
};