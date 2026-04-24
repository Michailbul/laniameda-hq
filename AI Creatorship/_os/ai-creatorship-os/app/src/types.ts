// Schema kinds v1 — frontmatter-driven. Folder layout is agent's choice.
//
// Every .md file in a project has frontmatter with a `kind`. The app scans all files,
// parses frontmatter, builds an in-memory graph indexed by kind + id.
//
// Unknown kinds, missing kind, or no frontmatter → treated as `note` (never breaks).

export type Kind =
  | "project"
  | "scene"
  | "shot"
  | "prompt-thread"
  | "character"
  | "location"
  | "workflow"
  | "direction"
  | "art-direction"
  | "note";

export const KIND_VALUES: Kind[] = [
  "project", "scene", "shot", "prompt-thread",
  "character", "location", "workflow", "direction", "art-direction", "note",
];

/** Raw parsed document — one per .md file. */
export interface Doc {
  kind: Kind;
  id: string;
  /** Display title (from frontmatter.title or body H1 or filename). */
  title: string;
  /** Filesystem-relative path from project root. */
  path: string;
  /** Full frontmatter as-parsed. Typed accessors below for common fields. */
  frontmatter: Record<string, unknown>;
  /** Body of the markdown (after the frontmatter), raw. */
  body: string;
  /** mtime in ms (from File object) — for sort-by-recent. */
  mtime: number;
}

/** One iteration inside a prompt-thread file — parsed from a `## heading` + fenced code block. */
export interface Iteration {
  slug: string;        // derived from heading, e.g. "v2" or "v2-no-gloves"
  title: string;       // heading text (less flag tokens)
  notes: string;       // prose between heading and the code block
  body: string;        // code block contents (the copy target)
  flags: IterationFlags;
  fragment: string;    // "#v2" — appended to thread id for full prompt id
}

export interface IterationFlags {
  favorite: boolean;
  pinned: boolean;
  archived: boolean;
}

/** A prompt-thread after parsing its body into iterations. */
export interface Thread extends Doc {
  kind: "prompt-thread";
  scene: string;              // parent scene id
  shot: string;               // parent shot id
  model: string;              // model slug (e.g. "nano-banana-pro")
  media: "image" | "video" | "audio";
  direction: string;          // optional creative direction id
  startingFrame: string | null;   // e.g. "turnaround-nbp-initial#v2"
  tags: string[];
  description: string;        // prose between H1 and first H2
  iterations: Iteration[];
}

/** Registry — all docs indexed by kind, plus fast lookups. */
export interface DocRegistry {
  byKind: Map<Kind, Doc[]>;
  byId: Map<string, Doc>;     // keyed by `${kind}:${id}`
  threads: Thread[];
  errors: string[];           // parse errors, duplicate ids, etc.
  warnings: string[];
}

/** Derived project view — the hierarchy the UI uses. */
export interface ProjectView {
  project: Doc | null;                    // kind: project
  directions: Doc[];                      // kind: direction
  artDirection: Doc[];                    // kind: art-direction
  scenes: SceneView[];
  characters: Doc[];
  locations: Doc[];
  workflows: Doc[];
  notes: Doc[];
  registry: DocRegistry;
}

export interface SceneView {
  doc: Doc;
  shots: ShotView[];
}

export interface ShotView {
  doc: Doc;
  threads: Thread[];
}

/** Usage tracking (gitignored). */
export interface UsageState {
  copied: Record<string, { lastAt: string; count: number }>;
}

/** Utility to build the full prompt id. */
export function promptId(threadId: string, iterationSlug: string): string {
  return `${threadId}#${iterationSlug}`;
}
