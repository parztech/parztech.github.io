"use server";

import { and, eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import { reactions, reactionTypes } from "@/db/schema";

import { getReactionSummary, isPublishedPost } from "./lib/queries";
import { getOrCreateVisitorHash } from "./lib/visitor";
import type { ReactionSummary } from "./types";

const input = z.object({
  postId: z.string().min(1).max(64),
  type: z.enum(reactionTypes),
});

/** Adds the reaction, or removes it if the visitor already gave it */
export async function toggleReaction(
  postId: string,
  type: string,
): Promise<ReactionSummary | null> {
  const parsed = input.safeParse({ postId, type });
  if (!parsed.success || !(await isPublishedPost(parsed.data.postId))) {
    return null;
  }

  const visitorHash = await getOrCreateVisitorHash();
  const match = and(
    eq(reactions.postId, parsed.data.postId),
    eq(reactions.visitorHash, visitorHash),
    eq(reactions.type, parsed.data.type),
  );

  const removed = await db.delete(reactions).where(match).returning();
  if (removed.length === 0) {
    // Unique index makes double-clicks / races harmless
    await db
      .insert(reactions)
      .values({
        postId: parsed.data.postId,
        visitorHash,
        type: parsed.data.type,
      })
      .onConflictDoNothing();
  }

  return getReactionSummary(parsed.data.postId, visitorHash);
}
