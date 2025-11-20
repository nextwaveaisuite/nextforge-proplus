// src/app/api/auth/signup/route.ts

import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { hashPassword } from "@/lib/hash";
import { signJWT } from "@/lib/jwt";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // Check if user exists
  const { data: exists } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .maybeSingle();

  if (exists) {
    return NextResponse.json(
      { error: "Email already registered" },
      { status: 400 }
    );
  }

  // Hash password
  const hashed = await hashPassword(password);

  // Create user
  const { data: user, error } = await supabase
    .from("users")
    .insert({ email, password: hashed })
    .select()
    .single();

  if (error || !user) {
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }

  // IMPORTANT: await JWT creation
  const token = await signJWT({ id: user.id, email: user.email });

  const res = NextResponse.json({ success: true });

  // Correct cookie format
  res.cookies.set("token", token, {
    httpOnly: true,
    path: "/",
  });

  return res;
}
