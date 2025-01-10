import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl;

  // Allow access to public files and NextAuth endpoints
  if (pathname.startsWith("/api/auth") || pathname.startsWith("/public")) {
    return NextResponse.next();
  }

  // Restrict access to /admin-dashboard for super-admins only
  if (pathname.startsWith("/admin-dashboard")) {
    if (!token || token.role !== "super-admin") {
      return NextResponse.redirect(new URL("/unauthorized", req.url)); // Redirect if user is not a super-admin
    }
  }

  // Allow other pages if the user is authenticated
  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/sign-in", req.url)); // Redirect to login if not authenticated
    }
  }

  return NextResponse.next(); // Default behavior
}

// Define routes where this middleware will apply
export const config = {
  matcher: ["/admin-dashboard/:path*", "/dashboard/:path*"],
};
