import "server-only";

import { and, count, eq, sql } from "drizzle-orm";

import { db } from "@/db";
import { posts, reactions, reactionTypes } from "@/db/schema";

import type { ReactionSummary } from "../types";

export async function isPublishedPost(postId: string) {
  const [row] = await db
    .select({ id: posts.id })
    .from(posts)
    .where(and(eq(posts.id, postId), eq(posts.status, "published")))
    .limit(1);
  return Boolean(row);
}

export async function getReactionSummary(
  postId: string,
  visitorHash: string | null,
): Promise<ReactionSummary> {
  const rows = await db
    .select({
      type: reactions.type,
      total: count(),
      mine: visitorHash
        ? sql<number>`sum(${reactions.visitorHash} = ${visitorHash})`.mapWith(
            Number,
          )
        : sql<number>`0`.mapWith(Number),
    })
    .from(reactions)
    .where(eq(reactions.postId, postId))
    .groupBy(reactions.type);

  const counts = Object.fromEntries(
    reactionTypes.map((t) => [t, 0]),
  ) as ReactionSummary["counts"];
  for (const row of rows) counts[row.type] = row.total;

  return {
    counts,
    mine: rows.filter((row) => row.mine > 0).map((row) => row.type),
  };
}
