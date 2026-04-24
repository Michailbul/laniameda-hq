import { join } from "node:path";
import { exists, OS_BIN, spawnCommand, WORKSPACE } from "../../../../server/os";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface NewProjectBody {
  slug?: unknown;
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as NewProjectBody;
  const slug = String(body.slug ?? "").trim();
  if (!/^[a-z][a-z0-9-]{1,47}$/.test(slug)) {
    return Response.json({ error: "invalid slug — lowercase kebab-case, 2-48 chars, start with a letter" }, { status: 400 });
  }
  if (slug.startsWith("_")) {
    return Response.json({ error: "slugs starting with _ are reserved for system folders" }, { status: 400 });
  }
  if (await exists(join(WORKSPACE, slug))) {
    return Response.json({ error: `project "${slug}" already exists` }, { status: 409 });
  }

  const out = await spawnCommand("bash", [OS_BIN, "new-project", slug], WORKSPACE);
  if (out.code !== 0) {
    return Response.json({ error: "new-project failed", stderr: out.stderr || out.stdout }, { status: 500 });
  }

  return Response.json({ ok: true, slug, stdout: out.stdout });
}
