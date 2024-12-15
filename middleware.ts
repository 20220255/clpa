import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/", "/about"]);
const isAdminRoute = createRouteMatcher(["/customers(.*)"]);


export default clerkMiddleware(async (auth, req) => {

  if (!isPublicRoute(req)) await auth.protect();

  // For admins, add clerkUserId to env
  const isAdmin = (await auth()).userId === process.env.ADMIN_CLERK_ID;
  const isAdmin2 = (await auth()).userId === process.env.ADMIN_CLERK_ID2;
  const isAdmin3 = (await auth()).userId === process.env.ADMIN_CLERK_ID3;
  const isAdmin4 = (await auth()).userId === process.env.ADMIN_CLERK_ID4;
  const isAdmin5 = (await auth()).userId === process.env.ADMIN_CLERK_ID5;

  if ((!isAdmin && !isAdmin2 && !isAdmin3)  && isAdminRoute(req)) {
    return NextResponse.redirect(new URL("/", req.url));
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};