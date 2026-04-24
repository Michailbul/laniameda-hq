// ai-creatorship-os — production server.
//
// Running the server IS running the app:
//   - Serves the bundled storyboard.html at "/"
//   - Serves every file under the WORKSPACE root (needed for future preview / asset loading)
//   - Exposes control endpoints under /__os/* for git auto-commit and other agent-facing ops
//
// npm start → this file.
// No build, no watch — assumes storyboard.html has been built (npm run build or first `npm run dev`).

import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { dirname, join, resolve, extname } from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const OS_BIN = "_os/ai-creatorship-os/bin/os.sh";


const __dirname = dirname(fileURLToPath(import.meta.url));

// Where to serve files from. The OS's storyboard.html lives inside the OS folder; the workspace
// (which holds creative projects) is two levels up from app/. User data stays outside the OS repo.
export const OS_DIR = resolve(__dirname, "..");                       // _os/ai-creatorship-os/
export const WORKSPACE = process.env.WORKSPACE
  ? resolve(process.cwd(), process.env.WORKSPACE)
  : resolve(__dirname, "..", "..", "..");                             // AI Creatorship/

const PORT = Number(process.env.PORT ?? 5173);
const HOST = process.env.HOST ?? "127.0.0.1";

const APP_HTML = join(OS_DIR, "storyboard.html");

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".css":  "text/css; charset=utf-8",
  ".js":   "application/javascript; charset=utf-8",
  ".svg":  "image/svg+xml",
  ".png":  "image/png",
  ".jpg":  "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".mp4":  "video/mp4",
  ".mov":  "video/quicktime",
  ".webm": "video/webm",
  ".md":   "text/markdown; charset=utf-8",
  ".txt":  "text/plain; charset=utf-8",
  ".jsonl": "application/x-ndjson; charset=utf-8",
};

// --- git runner (used by /__os/commit) ---

function spawnGit(args, cwd) {
  return new Promise((res) => {
    const child = spawn("git", args, { cwd });
    let stdout = "", stderr = "";
    child.stdout.on("data", (d) => { stdout += d; });
    child.stderr.on("data", (d) => { stderr += d; });
    child.on("close", (code) => res({ code, stdout: stdout.trim(), stderr: stderr.trim() }));
    child.on("error", (e) => res({ code: 127, stdout: "", stderr: e.message }));
  });
}

async function readBody(req) {
  return new Promise((res, rej) => {
    let buf = "";
    req.on("data", (c) => { buf += c; });
    req.on("end", () => res(buf));
    req.on("error", rej);
  });
}

function isSafeSlug(s) {
  return !!s && !s.startsWith("_") && !s.includes("/") && !s.includes("..") && !s.includes("\\");
}

function isSafeProjectPath(s) {
  return !!s && !s.startsWith("/") && !s.includes("..") && !s.includes("\\") && !s.startsWith(".git/");
}

async function handleCommit(req, res) {
  try {
    const body = JSON.parse((await readBody(req)) || "{}");
    const slug = String(body.slug ?? "").trim();
    if (!isSafeSlug(slug)) {
      res.writeHead(400, { "content-type": "application/json" });
      res.end(JSON.stringify({ error: "invalid slug" }));
      return;
    }
    const projectDir = join(WORKSPACE, slug);
    const gitDir = join(projectDir, ".git");
    const hasGit = await stat(gitDir).catch(() => null);
    if (!hasGit) {
      // Project isn't under version control — save succeeded but no commit happens. Not an error.
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ nothing: true, reason: "no git repo in project" }));
      return;
    }
    const message = String(body.message ?? "save (UI)").slice(0, 200);
    const paths = Array.isArray(body.paths)
      ? body.paths.map((p) => String(p).trim()).filter(isSafeProjectPath)
      : [];

    const addArgs = paths.length > 0 ? ["add", "--", ...paths] : ["add", "-A", "."];
    const add = await spawnGit(addArgs, projectDir);
    if (add.code !== 0) {
      res.writeHead(500, { "content-type": "application/json" });
      res.end(JSON.stringify({ error: "git add failed", stderr: add.stderr }));
      return;
    }
    const diff = await spawnGit(["diff", "--cached", "--quiet"], projectDir);
    if (diff.code === 0) {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ nothing: true }));
      return;
    }
    const commit = await spawnGit(["commit", "-m", message], projectDir);
    if (commit.code !== 0) {
      res.writeHead(500, { "content-type": "application/json" });
      res.end(JSON.stringify({ error: "git commit failed", stderr: commit.stderr }));
      return;
    }
    const sha = await spawnGit(["rev-parse", "--short", "HEAD"], projectDir);
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ commit: sha.stdout, message }));
  } catch (e) {
    res.writeHead(500, { "content-type": "application/json" });
    res.end(JSON.stringify({ error: e.message }));
  }
}

async function handleNewProject(req, res) {
  try {
    const body = JSON.parse((await readBody(req)) || "{}");
    const slug = String(body.slug ?? "").trim();
    // Slug rules: lowercase-kebab-case, 2-48 chars, no special chars.
    if (!/^[a-z][a-z0-9-]{1,47}$/.test(slug)) {
      res.writeHead(400, { "content-type": "application/json" });
      res.end(JSON.stringify({ error: "invalid slug — lowercase kebab-case, 2-48 chars, start with a letter" }));
      return;
    }
    if (slug.startsWith("_")) {
      res.writeHead(400, { "content-type": "application/json" });
      res.end(JSON.stringify({ error: "slugs starting with _ are reserved for system folders" }));
      return;
    }
    const target = join(WORKSPACE, slug);
    const exists = await stat(target).catch(() => null);
    if (exists) {
      res.writeHead(409, { "content-type": "application/json" });
      res.end(JSON.stringify({ error: `project "${slug}" already exists` }));
      return;
    }

    // Run the existing os.sh new-project command — same logic as CLI, no duplication.
    const out = await new Promise((r) => {
      const child = spawn("bash", [OS_BIN, "new-project", slug], { cwd: WORKSPACE });
      let stdout = "", stderr = "";
      child.stdout.on("data", (d) => { stdout += d; });
      child.stderr.on("data", (d) => { stderr += d; });
      child.on("close", (code) => r({ code, stdout: stdout.trim(), stderr: stderr.trim() }));
      child.on("error", (e) => r({ code: 127, stdout: "", stderr: e.message }));
    });
    if (out.code !== 0) {
      res.writeHead(500, { "content-type": "application/json" });
      res.end(JSON.stringify({ error: "new-project failed", stderr: out.stderr || out.stdout }));
      return;
    }
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ ok: true, slug, stdout: out.stdout }));
  } catch (e) {
    res.writeHead(500, { "content-type": "application/json" });
    res.end(JSON.stringify({ error: e.message }));
  }
}

async function handleStatus(_req, res) {
  // Quick sanity endpoint — is the server alive and can it see the workspace?
  const ws = await stat(WORKSPACE).catch(() => null);
  res.writeHead(200, { "content-type": "application/json" });
  res.end(JSON.stringify({
    ok: true,
    workspace: WORKSPACE,
    workspace_exists: !!ws,
    os_dir: OS_DIR,
    app_html_exists: !!(await stat(APP_HTML).catch(() => null)),
  }));
}

// --- request router ---

async function serveStatic(req, res, pathname) {
  // Root goes to the app.
  if (pathname === "/" || pathname === "") {
    const body = await readFile(APP_HTML).catch(() => null);
    if (!body) {
      res.writeHead(503, { "content-type": "text/plain" });
      res.end("storyboard.html not built. Run: npm run build");
      return;
    }
    res.writeHead(200, { "content-type": MIME[".html"], "cache-control": "no-store" });
    res.end(body);
    return;
  }

  // Otherwise serve files from the workspace. The OS itself lives inside the workspace
  // (at _os/ai-creatorship-os/) so its static files are reachable too.
  const filePath = join(WORKSPACE, pathname);
  if (!filePath.startsWith(WORKSPACE)) {
    res.writeHead(403); res.end("forbidden"); return;
  }
  const s = await stat(filePath).catch(() => null);
  if (!s || !s.isFile()) { res.writeHead(404); res.end("not found: " + pathname); return; }
  const ext = extname(filePath).toLowerCase();
  const mime = MIME[ext] ?? "application/octet-stream";
  const body = await readFile(filePath);
  res.writeHead(200, {
    "content-type": mime,
    "cache-control": "no-store",
    "access-control-allow-origin": "*",
  });
  res.end(body);
}

export function createAppServer() {
  return createServer(async (req, res) => {
    try {
      const url = new URL(req.url ?? "/", `http://${req.headers.host}`);
      const pathname = decodeURIComponent(url.pathname);

      if (pathname.startsWith("/__os/")) {
        if (pathname === "/__os/commit"      && req.method === "POST") return handleCommit(req, res);
        if (pathname === "/__os/new-project" && req.method === "POST") return handleNewProject(req, res);
        if (pathname === "/__os/status"      && req.method === "GET")  return handleStatus(req, res);
        res.writeHead(404); res.end("unknown control endpoint"); return;
      }

      await serveStatic(req, res, pathname);
    } catch (e) {
      res.writeHead(500);
      res.end("server error: " + (e instanceof Error ? e.message : String(e)));
    }
  });
}

export async function startServer({ port = PORT, host = HOST } = {}) {
  const server = createAppServer();
  await new Promise((res) => server.listen(port, host, res));
  const url = `http://${host}:${port}/`;
  console.log("");
  console.log(`  ai-creatorship-os`);
  console.log(`  ${url}`);
  console.log(`  workspace: ${WORKSPACE}`);
  console.log(`  git endpoint: POST /__os/commit`);
  console.log("");
  const shutdown = () => server.close(() => process.exit(0));
  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
  return server;
}

// Run directly — e.g. `node server.mjs` or `npm start`.
if (fileURLToPath(import.meta.url) === process.argv[1]) {
  const appHtmlExists = await stat(APP_HTML).catch(() => null);
  if (!appHtmlExists) {
    console.error("error: storyboard.html not built. Run `npm run build` first.");
    process.exit(1);
  }
  await startServer();
}
