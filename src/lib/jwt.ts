// src/lib/jwt.ts

const SECRET = process.env.JWT_SECRET!;

// Encode JWT
export async function signJWT(payload: object) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(new TextEncoder().encode(SECRET));
}

// Decode JWT
export async function verifyJWT(token: string) {
  try {
    return await jwtVerify(token, new TextEncoder().encode(SECRET));
  } catch (e) {
    return null;
  }
}
