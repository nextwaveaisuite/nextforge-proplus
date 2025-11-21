// src/lib/client-auth.ts
// Lightweight, no dependencies.

export async function createLoginSession(user: any) {
  const payload = {
    id: user.id,
    email: user.email,
    exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60 // 7 days
  };

  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .sign(new TextEncoder().encode(process.env.JWT_SECRET!));

  return {
    token,
    expires: payload.exp * 1000
  };
}

// Needed import:
import { SignJWT } from "jose";
