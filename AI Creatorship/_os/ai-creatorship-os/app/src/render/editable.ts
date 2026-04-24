// Inline edit helper. Double-click (or click with a pencil icon) switches a rendered
// block to a textarea showing the raw markdown/text. Blur or ⌘Enter saves. Esc cancels.

import { el } from "../util.ts";
import { renderMarkdown } from "../md-render.ts";
import { toast } from "../toast.ts";

export interface EditableOptions {
  /** How the value is rendered when not editing: markdown or plain text. */
  as?: "markdown" | "plain";
  /** Min/max textarea behavior */
  minHeight?: number;
  placeholder?: string;
}

/** Wrap a string value in a div that swaps to a textarea on double-click. */
export function editable(
  initial: string,
  save: (next: string) => Promise<void>,
  opts: EditableOptions = {},
): HTMLElement {
  const { as = "plain", minHeight = 80, placeholder = "click to edit" } = opts;
  const wrap = el("div", { class: "editable" });

  const render = (): void => {
    wrap.replaceChildren();
    if (!initial.trim()) {
      const empty = el("div", { class: "editable-empty" }, placeholder);
      wrap.appendChild(empty);
    } else if (as === "markdown") {
      const frag = document.createElement("div");
      frag.className = "markdown-content";
      frag.appendChild(renderMarkdown(initial));
      wrap.appendChild(frag);
    } else {
      const pre = el("div", { class: "editable-plain" });
      pre.textContent = initial;
      wrap.appendChild(pre);
    }
  };

  const startEdit = (): void => {
    wrap.replaceChildren();
    const ta = el("textarea", { class: "editable-textarea" }) as HTMLTextAreaElement;
    ta.value = initial;
    ta.style.minHeight = `${minHeight}px`;
    ta.placeholder = placeholder;
    wrap.appendChild(ta);
    ta.focus();
    ta.selectionStart = ta.selectionEnd = ta.value.length;

    const autoResize = (): void => {
      ta.style.height = "auto";
      ta.style.height = Math.max(minHeight, ta.scrollHeight) + "px";
    };
    ta.addEventListener("input", autoResize);
    autoResize();

    const commit = async (): Promise<void> => {
      const next = ta.value;
      if (next === initial) { render(); return; }
      try {
        await save(next);
        initial = next;
        render();
      } catch (e) {
        toast("save failed: " + (e as Error).message, "err");
        render();
      }
    };

    const cancel = (): void => { render(); };

    ta.addEventListener("blur", () => { void commit(); });
    ta.addEventListener("keydown", (e) => {
      if (e.key === "Escape") { e.preventDefault(); cancel(); }
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") { e.preventDefault(); ta.blur(); }
    });
  };

  wrap.addEventListener("dblclick", startEdit);
  render();
  return wrap;
}

/** Inline single-line editable (for titles). */
export function editableLine(
  initial: string,
  save: (next: string) => Promise<void>,
  opts: { placeholder?: string; className?: string } = {},
): HTMLElement {
  const { placeholder = "click to edit", className = "" } = opts;
  const wrap = el("span", { class: "editable-line " + className });

  const render = (): void => {
    wrap.replaceChildren();
    const span = document.createElement("span");
    span.textContent = initial || placeholder;
    if (!initial) span.classList.add("editable-empty");
    wrap.appendChild(span);
  };

  const startEdit = (): void => {
    wrap.replaceChildren();
    const input = el("input", { type: "text" }) as HTMLInputElement;
    input.value = initial;
    input.placeholder = placeholder;
    wrap.appendChild(input);
    input.focus();
    input.select();

    const commit = async (): Promise<void> => {
      const next = input.value.trim();
      if (next === initial) { render(); return; }
      try {
        await save(next);
        initial = next;
        render();
      } catch (e) {
        toast("save failed: " + (e as Error).message, "err");
        render();
      }
    };
    input.addEventListener("blur", () => { void commit(); });
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") { e.preventDefault(); input.blur(); }
      if (e.key === "Escape") { e.preventDefault(); render(); }
    });
  };

  wrap.addEventListener("dblclick", startEdit);
  render();
  return wrap;
}
