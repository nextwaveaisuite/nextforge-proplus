import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/jwt";

export function middleware(req: NextRequest) {
  const protectedPaths = ["/dashboard"];

  if (protectedPaths.some((p) => req.nextUrl.pathname.startsWith(p))) {
    const token = req.cookies.get("session")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const valid = verifyToken(token);

    if (!valid) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/dashboard"],
};
