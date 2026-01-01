import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(["/", "/about", "/api(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  // Protect non-public routes - require authentication
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
  // Admin authorization is handled at the page level, not middleware
  // This is because Prisma doesn't work in Edge Runtime
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};

