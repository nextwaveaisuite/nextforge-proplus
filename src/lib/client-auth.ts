// src/lib/client-auth.ts

// Save JWT to localStorage
export function saveToken(token: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem("nf_token", token);
  }
}

// Read JWT
export function getToken() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("nf_token");
  }
  return null;
}

// Clear on logout
export function clearToken() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("nf_token");
  }
}
