const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "supersecret");

export async function signJWT(payload: any) {
  const header = { alg: "HS256", typ: "JWT" };

  function base64(obj: any) {
    return Buffer.from(JSON.stringify(obj)).toString("base64url");
  }

  const unsigned = `${base64(header)}.${base64(payload)}`;

  const signature = await crypto.subtle.sign(
    { name: "HMAC", hash: "SHA-256" },
    await crypto.subtle.importKey("raw", SECRET, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]),
    new TextEncoder().encode(unsigned)
  );

  return `${unsigned}.${Buffer.from(signature).toString("base64url")}`;
}

export async function verifyJWT(token: string) {
  const [headerB64, payloadB64, sigB64] = token.split(".");
  if (!headerB64 || !payloadB64 || !sigB64) return null;

  const unsigned = `${headerB64}.${payloadB64}`;
  const signature = Buffer.from(sigB64, "base64url");

  const valid = await crypto.subtle.verify(
    { name: "HMAC", hash: "SHA-256" },
    await crypto.subtle.importKey("raw", SECRET, { name: "HMAC", hash: "SHA-256" }, false, ["verify"]),
    signature,
    new TextEncoder().encode(unsigned)
  );

  if (!valid) return null;

  return JSON.parse(Buffer.from(payloadB64, "base64url").toString());
}
