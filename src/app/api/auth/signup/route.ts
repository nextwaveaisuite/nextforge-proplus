import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { hashPassword } from "@/lib/hash";
import { signJWT } from "@/lib/jwt";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password)
    return NextResponse.json({ success: false, error: "Missing fields" });

  const hashed = await hashPassword(password);

  const { data, error } = await supabase
    .from("users")
    .insert([{ email, password: hashed, tier: "free" }])
    .select()
    .single();

  if (error) return NextResponse.json({ success: false, error: error.message });

  const token = signJWT({
    id: data.id,
    email: data.email,
    tier: "free",
  });

  const res = NextResponse.json({ success: true });
  res.cookies.set("token", token, { httpOnly: true, path: "/" });

  return res;
}
