import { APP_HTML, exists, OS_DIR, WORKSPACE } from "../../../../server/os";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({
    ok: true,
    workspace: WORKSPACE,
    workspace_exists: await exists(WORKSPACE),
    os_dir: OS_DIR,
    app_html_exists: await exists(APP_HTML),
    runtime: "nextjs",
  });
}
