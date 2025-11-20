import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth-helpers";

export async function middleware(request: Request) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  // Public pages
  const publicPaths = ["/", "/login", "/signup"];
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // Read token
  const token = request.headers.get("cookie")
    ?.split("; ")
    .find((c) => c.startsWith("token="))
    ?.replace("token=", "");

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  let user;
  try {
    user = await verifyToken(token);
  } catch (e) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // PRO-only page
  if (pathname.startsWith("/builder")) {
    if (user.plan !== "pro" && user.plan !== "elite") {
      return NextResponse.redirect(new URL("/upgrade", request.url));
    }
  }

  // ELITE-only pages
  if (
    pathname.startsWith("/export") ||
    pathname.startsWith("/white-label")
  ) {
    if (user.plan !== "elite") {
      return NextResponse.redirect(new URL("/upgrade", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/builder/:path*", "/export/:path*", "/white-label/:path*"],
};
