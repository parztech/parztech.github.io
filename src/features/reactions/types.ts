import type { ReactionType } from "@/db/schema";

export type ReactionSummary = {
  counts: Record<ReactionType, number>;
  /** Reactions the current visitor has given */
  mine: ReactionType[];
};
