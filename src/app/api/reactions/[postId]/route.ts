import { getReactionSummary } from "@/features/reactions/lib/queries";
import { getVisitorHash } from "@/features/reactions/lib/visitor";

// Counts change often and depend on the visitor's cookie, so this stays dynamic
// while the post page itself remains prerendered.
export async function GET(
  _req: Request,
  ctx: RouteContext<"/api/reactions/[postId]">,
) {
  const { postId } = await ctx.params;
  const summary = await getReactionSummary(postId, await getVisitorHash());
  return Response.json(summary, {
    headers: { "Cache-Control": "private, no-store" },
  });
}
