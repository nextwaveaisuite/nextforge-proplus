import { NextResponse } from "next/server";
import { verifyJWT } from "./lib/jwt";

export function middleware(req: Request) {
  const url = new URL(req.url);
  const token = req.headers.get("cookie")?.split("token=")?.[1];

  const protectedRoutes = ["/dashboard", "/generator", "/builder"];

  if (protectedRoutes.includes(url.pathname)) {
    if (!token) return NextResponse.redirect(new URL("/login", req.url));

    const decoded = verifyJWT(token);
    if (!decoded) return NextResponse.redirect(new URL("/login", req.url));

    // Force tier presence
    if (!decoded.tier) decoded.tier = "free";
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/generator/:path*", "/builder/:path*"],
};
