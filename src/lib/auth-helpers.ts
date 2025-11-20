import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "changeme");

// HASH PASSWORD
export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

// VERIFY PASSWORD
export async function verifyPassword(password: string, hashed: string) {
  return await bcrypt.compare(password, hashed);
}

// SIGN JWT
export async function signJWT(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

// VERIFY JWT
export async function verifyToken(token: string) {
  const { payload } = await jwtVerify(token, secret);
  return payload;
}
