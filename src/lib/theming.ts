// lib/theming.ts
"use client";

export function applyTheme(mode: "light" | "dark") {
  if (typeof document === "undefined") return;

  document.documentElement.setAttribute("data-theme", mode);

  try {
    localStorage.setItem("theme", mode);
  } catch (err) {
    console.error("Theme save failed:", err);
  }
}

export function loadSavedTheme() {
  if (typeof document === "undefined") return;

  try {
    const theme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (theme) {
      document.documentElement.setAttribute("data-theme", theme);
    }
  } catch (err) {
    console.error("Theme load failed:", err);
  }
}
