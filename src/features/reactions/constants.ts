import type { ReactionType } from "@/db/schema";

export const REACTIONS: { type: ReactionType; emoji: string; label: string }[] =
  [
    { type: "love", emoji: "❤️", label: "Հավանեցի" },
    { type: "fire", emoji: "🔥", label: "Կրակ է" },
    { type: "clap", emoji: "👏", label: "Բրավո" },
    { type: "mindblown", emoji: "🤯", label: "Զարմացա" },
    { type: "idea", emoji: "💡", label: "Նոր բան սովորեցի" },
  ];

export const VISITOR_COOKIE = "pt_vid";
export const VISITOR_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year
