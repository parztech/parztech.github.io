import type { ReactionType } from "@/db/schema";
import type { ReactionSummary } from "@/features/reactions/types";

/** Applies a toggle locally so the UI responds before the server does */
export function applyToggle(
  summary: ReactionSummary,
  type: ReactionType,
): ReactionSummary {
  const active = summary.mine.includes(type);
  return {
    counts: {
      ...summary.counts,
      [type]: Math.max(0, summary.counts[type] + (active ? -1 : 1)),
    },
    mine: active
      ? summary.mine.filter((t) => t !== type)
      : [...summary.mine, type],
  };
}
