// Markdown parser for prompt-thread bodies and frontmatter extraction.
//
// Thread body contract:
//   - Optional `# H1`                        → ignored (set title comes from frontmatter)
//   - Prose between H1 and first `## h2`     → set/thread description
//   - Each `## heading`                       → one iteration
//     - Flag tokens in heading (★ 📌 🗑)      → flags
//     - Prose between heading and code block  → notes
//     - First fenced code block               → iteration body (the copy target)

import type { Iteration, IterationFlags, Thread } from "./types.ts";

/* ---------- Frontmatter ---------- */

export function parseFrontmatter(text: string): { frontmatter: Record<string, unknown>; content: string } {
  const fmMatch = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(text);
  if (!fmMatch) return { frontmatter: {}, content: text };
  const fmText = fmMatch[1] ?? "";
  const frontmatter: Record<string, unknown> = {};
  for (const rawLine of fmText.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const colon = line.indexOf(":");
    if (colon < 0) continue;
    const key = line.slice(0, colon).trim();
    const rawVal = line.slice(colon + 1).trim();
    frontmatter[key] = parseYamlScalar(rawVal);
  }
  return { frontmatter, content: text.slice(fmMatch[0].length) };
}

function parseYamlScalar(raw: string): unknown {
  if (raw === "") return "";
  if (raw === "null" || raw === "~") return null;
  if (raw === "true") return true;
  if (raw === "false") return false;
  if (raw.startsWith("[") && raw.endsWith("]")) {
    const inner = raw.slice(1, -1).trim();
    if (!inner) return [];
    return inner.split(",").map((s) => parseYamlScalar(s.trim()));
  }
  if ((raw.startsWith('"') && raw.endsWith('"')) || (raw.startsWith("'") && raw.endsWith("'"))) {
    try { return JSON.parse(raw); } catch { return raw.slice(1, -1); }
  }
  const num = Number(raw);
  if (!Number.isNaN(num) && /^-?\d+(\.\d+)?$/.test(raw)) return num;
  return raw;
}

/* ---------- Thread body parsing ---------- */

export function parseThreadBody(body: string): { description: string; iterations: Iteration[] } {
  const lines = body.split(/\r?\n/);
  const iterations: Iteration[] = [];
  let description = "";

  let state: "pre-h1" | "post-h1" | "in-iter" = "pre-h1";
  const descBuf: string[] = [];
  let cur: {
    slug: string;
    title: string;
    fragment: string;
    flags: IterationFlags;
    notes: string[];
    body: string;
    inCode: boolean;
    codeCaptured: boolean;
  } | null = null;

  const finalize = (): void => {
    if (!cur) return;
    iterations.push({
      slug: cur.slug,
      title: cur.title,
      fragment: cur.fragment,
      flags: cur.flags,
      notes: cur.notes.join("\n").trim(),
      body: cur.body.trim(),
    });
    cur = null;
  };

  for (const line of lines) {
    const h1 = /^#\s+(.+)$/.exec(line);
    if (h1 && state === "pre-h1") { state = "post-h1"; continue; }

    const h2 = /^##\s+(.+)$/.exec(line);
    if (h2) {
      if (state === "post-h1" && !description) description = descBuf.join("\n").trim();
      finalize();
      const rawHeading = h2[1]!.trim();
      const { clean, flags } = extractFlags(rawHeading);
      const slug = slugify(clean) || `v${iterations.length + 1}`;
      cur = {
        slug,
        title: clean || slug,
        fragment: `#${slug}`,
        flags,
        notes: [],
        body: "",
        inCode: false,
        codeCaptured: false,
      };
      state = "in-iter";
      continue;
    }

    const fence = /^```/.test(line);
    if (fence && cur) {
      if (cur.inCode) { cur.inCode = false; cur.codeCaptured = true; }
      else if (!cur.codeCaptured) { cur.inCode = true; }
      else { cur.notes.push(line); }
      continue;
    }

    if (cur?.inCode) {
      cur.body += (cur.body ? "\n" : "") + line;
      continue;
    }

    if (state === "in-iter" && cur) {
      cur.notes.push(line);
    } else {
      descBuf.push(line);
    }
  }

  if (state === "post-h1" && !description) description = descBuf.join("\n").trim();
  if (state === "pre-h1") description = descBuf.join("\n").trim();
  finalize();

  if (iterations.length === 0) {
    const fallback = fallbackIteration(body);
    if (fallback) {
      description = fallback.description;
      iterations.push({
        slug: "v1",
        title: "v1",
        fragment: "#v1",
        flags: { favorite: false, pinned: false, archived: false },
        notes: fallback.notes,
        body: fallback.body,
      });
    }
  }

  return { description, iterations };
}

function fallbackIteration(body: string): { description: string; notes: string; body: string } | null {
  const withoutH1 = body.replace(/^#\s+.+\r?\n?/, "").trim();
  if (!withoutH1) return null;

  const fence = /```[^\n]*\n([\s\S]*?)\n```/.exec(withoutH1);
  if (fence) {
    const before = withoutH1.slice(0, fence.index).trim();
    return {
      description: before,
      notes: before,
      body: (fence[1] ?? "").trim(),
    };
  }

  return {
    description: "",
    notes: "Imported from a prompt-thread without `##` variation headings.",
    body: withoutH1,
  };
}

const FLAG_TOKENS: Record<keyof IterationFlags, string[]> = {
  favorite: ["★"],
  pinned: ["📌"],
  archived: ["🗑", "🗑️"],
};

export function extractFlags(heading: string): { clean: string; flags: IterationFlags } {
  const flags: IterationFlags = { favorite: false, pinned: false, archived: false };
  let clean = heading;
  for (const [flag, tokens] of Object.entries(FLAG_TOKENS) as [keyof IterationFlags, string[]][]) {
    for (const tok of tokens) {
      if (clean.includes(tok)) {
        flags[flag] = true;
        clean = clean.split(tok).join("").trim();
      }
    }
  }
  clean = clean.replace(/`+/g, "").replace(/[·•\-—,]\s*$/g, "").trim();
  return { clean, flags };
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-");
}

/* ---------- Write a thread back to markdown ---------- */

export function stringifyThread(thread: Thread): string {
  const out: string[] = [];

  // Frontmatter
  out.push("---");
  for (const [k, v] of Object.entries(thread.frontmatter)) {
    out.push(`${k}: ${yamlScalar(v)}`);
  }
  out.push("---", "");

  // H1 + description
  if (thread.title) { out.push(`# ${thread.title}`); out.push(""); }
  if (thread.description) { out.push(thread.description); out.push(""); }

  for (const it of thread.iterations) {
    const flagTokens: string[] = [];
    if (it.flags.favorite) flagTokens.push("★");
    if (it.flags.pinned) flagTokens.push("📌");
    if (it.flags.archived) flagTokens.push("🗑");
    const heading = flagTokens.length ? `${it.title} ${flagTokens.join(" ")}` : it.title;
    out.push(`## ${heading}`);
    out.push("");
    if (it.notes) { out.push(it.notes); out.push(""); }
    out.push("```");
    out.push(it.body);
    out.push("```");
    out.push("");
  }

  return out.join("\n");
}

function yamlScalar(v: unknown): string {
  if (v == null) return "null";
  if (Array.isArray(v)) return `[${v.map((x) => yamlScalar(x)).join(", ")}]`;
  if (typeof v === "string") {
    if (v === "" || /[:#\[\]{}&*!|>'"%@`,\n]/.test(v) || v.trim() !== v) return JSON.stringify(v);
    return v;
  }
  return JSON.stringify(v);
}
