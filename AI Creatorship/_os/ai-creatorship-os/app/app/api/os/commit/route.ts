import { join } from "node:path";
import { exists, isSafeProjectPath, isSafeSlug, spawnGit, WORKSPACE } from "../../../../server/os";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface CommitBody {
  slug?: unknown;
  message?: unknown;
  paths?: unknown;
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as CommitBody;
  const slug = String(body.slug ?? "").trim();
  if (!isSafeSlug(slug)) return Response.json({ error: "invalid slug" }, { status: 400 });

  const projectDir = join(WORKSPACE, slug);
  if (!(await exists(join(projectDir, ".git")))) {
    return Response.json({ nothing: true, reason: "no git repo in project" });
  }

  const message = String(body.message ?? "save (UI)").slice(0, 200);
  const paths = Array.isArray(body.paths)
    ? body.paths.map((p) => String(p).trim()).filter(isSafeProjectPath)
    : [];

  const addArgs = paths.length > 0 ? ["add", "--", ...paths] : ["add", "-A", "."];
  const add = await spawnGit(addArgs, projectDir);
  if (add.code !== 0) return Response.json({ error: "git add failed", stderr: add.stderr }, { status: 500 });

  const diff = await spawnGit(["diff", "--cached", "--quiet"], projectDir);
  if (diff.code === 0) return Response.json({ nothing: true });

  const commit = await spawnGit(["commit", "-m", message], projectDir);
  if (commit.code !== 0) return Response.json({ error: "git commit failed", stderr: commit.stderr }, { status: 500 });

  const sha = await spawnGit(["rev-parse", "--short", "HEAD"], projectDir);
  return Response.json({ commit: sha.stdout, message });
}
