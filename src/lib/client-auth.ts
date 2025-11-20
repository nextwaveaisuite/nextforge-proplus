export function saveToken(token: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem("nforge_token", token);
  }
}

export function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("nforge_token");
}

export function clearToken() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("nforge_token");
  }
}
