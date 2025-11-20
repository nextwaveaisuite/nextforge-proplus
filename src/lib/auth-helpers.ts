import bcrypt from "bcryptjs";
import * as jose from "jose";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

// Hash password
export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

// Compare password
export async function verifyPassword(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}

// Create JWT
export async function generateToken(payload: any) {
  return await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(SECRET);
}

// Decode JWT
export async function verifyToken(token: string) {
  const { payload } = await jose.jwtVerify(token, SECRET);
  return payload;
}
