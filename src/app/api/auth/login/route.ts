import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { verifyPassword } from "@/lib/hash";
import { signJWT } from "@/lib/jwt";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error || !user) {
    return NextResponse.json({ success: false, error: "Invalid email" });
  }

  const valid = await verifyPassword(password, user.password);
  if (!valid) {
    return NextResponse.json({ success: false, error: "Invalid password" });
  }

  const token = await signJWT({ id: user.id, email: user.email });

  const res = NextResponse.json({ success: true });
  res.cookies.set({
    name: "token",
    value: token,
    httpOnly: true,
    path: "/",
  });

  return res;
}
