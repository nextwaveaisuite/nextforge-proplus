export function applyTheme(theme: string) {
  document.documentElement.setAttribute("data-theme", theme);
}

export function loadSavedTheme() {
  if (typeof window === "undefined") return;
  const saved = localStorage.getItem("theme");
  if (saved) applyTheme(saved);
}
