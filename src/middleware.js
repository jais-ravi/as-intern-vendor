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
    return NextResponse.next(); 
  }

  if (pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/sign-in", req.url)); 
  }
}

export const config = {
  matcher: ["/dashboard/:path*"], 
};
