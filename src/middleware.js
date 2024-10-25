import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
export { default } from "next-auth/middleware";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl;

  // Allow the request if:
  // 1. It's a request for NextAuth session or provider fetching
  // 2. The token exists (user is authenticated)
  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next(); // Continue to the requested page
  }

  // Redirect to login page if user is not authenticated and trying to access a protected route
  if (pathname === "/Dashboard") {
    return NextResponse.redirect(new URL("/sign-in", req.url)); // Replace '/sign-in' with your login route
  }
}

// Define which paths should run through the middleware
export const config = {
  matcher: ["/Dashboard"], // Only run middleware for this route
};
