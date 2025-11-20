import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { verifyPassword } from "@/lib/hash";
import { signJWT } from "@/lib/jwt";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const { data: user } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (!user) return NextResponse.json({ success: false, error: "User not found" });

  const valid = await verifyPassword(password, user.password);
  if (!valid)
    return NextResponse.json({ success: false, error: "Invalid login" });

  const token = signJWT({
    id: user.id,
    email: user.email,
    tier: user.tier,
  });

  const res = NextResponse.json({ success: true });
  res.cookies.set("token", token, { httpOnly: true, path: "/" });

  return res;
}
