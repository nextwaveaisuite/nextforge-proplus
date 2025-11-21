export function loadTheme() {
  const stored = localStorage.getItem("nextforge-theme");
  if (!stored) return;
  document.documentElement.setAttribute("data-theme", stored);
}

export function toggleTheme() {
  const current =
    document.documentElement.getAttribute("data-theme") || "light";

  const next = current === "light" ? "dark" : "light";

  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("nextforge-theme", next);
}
