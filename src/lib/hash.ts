export async function hashPassword(password: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Buffer.from(digest).toString("hex");
}

export async function verifyPassword(password: string, hashed: string) {
  const hash = await hashPassword(password);
  return hash === hashed;
}
