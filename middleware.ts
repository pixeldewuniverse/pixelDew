import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const protectedRoutes = ["/studio", "/projects", "/billing"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      const signInUrl = new URL("/signin", request.url);
      return NextResponse.redirect(signInUrl);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/studio/:path*", "/projects/:path*", "/billing/:path*"]
};
