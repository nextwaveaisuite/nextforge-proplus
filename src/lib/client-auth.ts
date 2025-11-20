// src/lib/client-auth.ts

// Save JWT to browser
export function saveToken(token: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem("nf_token", token);
  }
}

// Load JWT
export function getToken() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("nf_token");
  }
  return null;
}

// Clear JWT
export function clearToken() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("nf_token");
  }
}

// Decode JWT (client-side safe)
export function getUser() {
  const token = getToken();
  if (!token) return null;

  try {
    const base = token.split(".")[1];
    const decoded = JSON.parse(atob(base));
    return decoded;
  } catch {
    return null;
  }
}
