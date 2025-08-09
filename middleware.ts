// middleware.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)", "/api/webhooks/clerk"]);

export default clerkMiddleware(async (auth, req) => {
  const isPublic = isPublicRoute(req);
  const session = await auth();
  if (!isPublic && !session.userId) {
    return Response.redirect(new URL('/', req.url));
  }
});

export const config = {
  matcher: [
    // Protect everything except static files and public pages
    '/((?!_next|.*\\..*|favicon.ico).*)',
    '/(api|trpc)(.*)',
  ],
};
