export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { supabase } from "@/src/lib/supabase";
import { verifyPassword } from "@/src/lib/hash";
import { signJWT } from "@/src/lib/jwt";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    if (!email || !password)
      return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 });

    const { data: user } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (!user) {
      return NextResponse.json({ success: false, error: "Invalid login" }, { status: 400 });
    }

    const match = await verifyPassword(password, user.password);
    if (!match) {
      return NextResponse.json({ success: false, error: "Invalid login" }, { status: 400 });
    }

    const token = await signJWT({ id: user.id, email });

    return NextResponse.json({ success: true, token });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: "Login failed" }, { status: 500 });
  }
}
