export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { supabase } from "@/src/lib/supabase";
import { hashPassword } from "@/src/lib/hash";
import { signJWT } from "@/src/lib/jwt";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    if (!email || !password)
      return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 });

    const hashed = await hashPassword(password);

    const { data: existing } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (existing) {
      return NextResponse.json({ success: false, error: "User exists" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("users")
      .insert({ email, password: hashed })
      .select()
      .single();

    if (error) throw error;

    const token = await signJWT({ id: data.id, email });

    return NextResponse.json({ success: true, token });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: "Signup failed" }, { status: 500 });
  }
}
