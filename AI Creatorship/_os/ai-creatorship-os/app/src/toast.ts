// Tiny toast system. Replaces the old single-slot flash with a queue so errors don't get stomped by successes.

type Tone = "ok" | "warn" | "err" | "info";

let host: HTMLElement | null = null;

function getHost(): HTMLElement {
  if (host && host.isConnected) return host;
  host = document.createElement("div");
  host.id = "toast-host";
  host.setAttribute("role", "status");
  host.setAttribute("aria-live", "polite");
  document.body.appendChild(host);
  return host;
}

export function toast(message: string, tone: Tone = "ok", ttlMs = 3200): void {
  const h = getHost();
  const node = document.createElement("div");
  node.className = `toast toast-${tone}`;
  node.textContent = message;
  h.appendChild(node);
  requestAnimationFrame(() => node.classList.add("in"));
  setTimeout(() => {
    node.classList.remove("in");
    setTimeout(() => node.remove(), 220);
  }, ttlMs);
}

// Clear all existing toasts — useful when swapping projects.
export function clearToasts(): void {
  host?.replaceChildren();
}
