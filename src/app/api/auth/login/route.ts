// src/app/api/auth/login/route.ts

import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { verifyPassword } from "@/lib/hash";
import { signJWT } from "@/lib/jwt";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // Find user
  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (!user || error) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  // Verify password
  const valid = await verifyPassword(password, user.password);
  if (!valid) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  // Generate token (IMPORTANT: await it!)
  const token = await signJWT({ id: user.id, email: user.email });

  const res = NextResponse.json({ success: true });

  // Set cookie correctly
  res.cookies.set("token", token, {
    httpOnly: true,
    path: "/",
  });

  return res;
}
