// Theme toggle. Persists in localStorage. First visit: respect OS preference.

export type Theme = "light" | "dark";

const KEY = "ai-creatorship-os-theme";

export function initialTheme(): Theme {
  const saved = localStorage.getItem(KEY);
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia?.("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

export function setTheme(theme: Theme): void {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(KEY, theme);
  updateToggleIcon(theme);
}

export function toggleTheme(): Theme {
  const current = (document.documentElement.getAttribute("data-theme") as Theme | null) ?? "dark";
  const next: Theme = current === "dark" ? "light" : "dark";
  setTheme(next);
  return next;
}

function updateToggleIcon(theme: Theme): void {
  const btn = document.getElementById("btnTheme");
  if (!btn) return;
  // Show the icon of the OTHER theme — i.e. what clicking will switch to.
  btn.innerHTML = theme === "dark" ? SUN_ICON : MOON_ICON;
  btn.setAttribute("aria-label", `Switch to ${theme === "dark" ? "light" : "dark"} theme`);
  btn.setAttribute("title", `Switch to ${theme === "dark" ? "light" : "dark"} theme`);
}

export function initTheme(): void {
  setTheme(initialTheme());
  const btn = document.getElementById("btnTheme");
  if (btn) btn.addEventListener("click", () => { toggleTheme(); });
}

const SUN_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>`;
const MOON_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
