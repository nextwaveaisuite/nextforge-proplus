import { NextResponse } from "next/server";
import { verifyJWT } from "@/lib/jwt";

export async function GET(req: Request) {
  const token = req.headers.get("cookie")?.split("token=")?.[1];

  if (!token)
    return NextResponse.json({ user: null });

  const decoded = verifyJWT(token);
  return NextResponse.json({ user: decoded || null });
}
