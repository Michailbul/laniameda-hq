// Tiny DOM helpers. No framework — stays honest to PRD's single-file deliverable.

type AttrValue = string | number | boolean | null | undefined | ((ev: Event) => void);
type Attrs = Record<string, AttrValue>;
type Child = Node | string | null | false | undefined;

export const $ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document): T | null =>
  root.querySelector<T>(sel);

export const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document): T[] =>
  [...root.querySelectorAll<T>(sel)];

export function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attrs: Attrs = {},
  children: Child | Child[] = [],
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v == null || v === false) continue;
    if (k === "class") node.className = String(v);
    else if (k === "style") node.setAttribute("style", String(v));
    else if (k.startsWith("on") && typeof v === "function") node.addEventListener(k.slice(2), v as EventListener);
    else node.setAttribute(k, String(v));
  }
  const kids = Array.isArray(children) ? children : [children];
  for (const c of kids) {
    if (c == null || c === false) continue;
    node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
  }
  return node;
}

export function escapeHTML(s: unknown): string {
  return (s ?? "")
    .toString()
    .replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m] as string));
}

export const today = (): string => new Date().toISOString().slice(0, 10);

export const nowTime = (): string => new Date().toLocaleTimeString();

// Shallow-deep clone via JSON — our state is serialisable by construction.
export const clone = <T>(v: T): T => JSON.parse(JSON.stringify(v)) as T;
