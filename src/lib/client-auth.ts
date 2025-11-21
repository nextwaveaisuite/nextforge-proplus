// src/lib/client-auth.ts

import { SignJWT } from "jose";

export async function createLoginSession(user: any) {
  const payload = {
    id: user.id,
    email: user.email,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, // 7 days
  };

  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .sign(new TextEncoder().encode(process.env.JWT_SECRET!));

  return {
    token,
    expires: payload.exp * 1000,
  };
}

// REQUIRED by login + signup pages
export function saveToken(token: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem("nf_token", token);
  }
}
