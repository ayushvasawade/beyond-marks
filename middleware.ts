// middleware.ts
import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

export const config = {
  matcher: [
    // Protect everything except static files and public pages
    '/((?!_next|.*\\..*|favicon.ico).*)',
    '/(api|trpc)(.*)',
  ],
};
