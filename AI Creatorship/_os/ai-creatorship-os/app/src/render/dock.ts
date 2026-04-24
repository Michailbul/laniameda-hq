// Bottom dock — page switcher.

import { el } from "../util.ts";
import { app, setDockPage, type DockPage } from "../state.ts";

interface DockItem { page: DockPage; icon: string; label: string; }

const ITEMS: DockItem[] = [
  { page: "shot",       icon: "▦", label: "main" },
  { page: "brief",      icon: "¶", label: "brief" },
  { page: "characters", icon: "◉", label: "characters" },
  { page: "workflows",  icon: "⚡", label: "workflows" },
  { page: "locations",  icon: "⌖", label: "locations" },
  { page: "notes",      icon: "🗒", label: "notes" },
  { page: "sessions",   icon: "⌘", label: "sessions" },
  { page: "health",     icon: "✓", label: "health" },
];

export function renderDock(): HTMLElement {
  const dock = el("nav", { class: "dock" });
  for (const item of ITEMS) {
    const btn = el("button", {
      class: "dock-btn" + (app.dockPage === item.page ? " active" : ""),
      title: item.label,
    });
    btn.appendChild(el("span", { class: "dock-icon" }, item.icon));
    btn.appendChild(el("span", { class: "dock-label" }, item.label));
    btn.addEventListener("click", () => setDockPage(item.page));
    dock.appendChild(btn);
  }
  return dock;
}
