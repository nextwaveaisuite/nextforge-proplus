import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

export async function GET(req: Request) {
  try {
    const auth = req.headers.get("authorization");
    if (!auth) return NextResponse.json({ loggedIn: false });

    const token = auth.replace("Bearer ", "");
    const payload = verifyToken(token);

    return NextResponse.json({ loggedIn: true, user: payload });
  } catch {
    return NextResponse.json({ loggedIn: false });
  }
}
