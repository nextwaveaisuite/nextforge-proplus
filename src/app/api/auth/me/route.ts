export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { verifyJWT } from "@/src/lib/jwt";

export async function GET(req: Request) {
  try {
    const token = req.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) return NextResponse.json({ loggedIn: false });

    const payload = await verifyJWT(token);
    if (!payload) return NextResponse.json({ loggedIn: false });

    return NextResponse.json({ loggedIn: true, user: payload });
  } catch {
    return NextResponse.json({ loggedIn: false });
  }
}
