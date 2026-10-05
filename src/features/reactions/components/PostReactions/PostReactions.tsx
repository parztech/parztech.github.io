"use client";

import { useEffect, useOptimistic, useState, useTransition } from "react";
import { toast } from "sonner";

import { Skeleton } from "@/components/ui/skeleton";
import type { ReactionType } from "@/db/schema";
import { toggleReaction } from "@/features/reactions/actions";
import { REACTIONS } from "@/features/reactions/constants";
import type { ReactionSummary } from "@/features/reactions/types";
import { cn } from "@/lib/utils";

import type { PostReactionsProps } from "./types";
import { applyToggle } from "./utils";

export default function PostReactions({ postId }: PostReactionsProps) {
  const [summary, setSummary] = useState<ReactionSummary | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);
  const [optimistic, addOptimistic] = useOptimistic(
    summary,
    (current, type: ReactionType) => current && applyToggle(current, type),
  );
  const [, startTransition] = useTransition();

  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/reactions/${postId}`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`Reactions request failed: ${res.status}`);
        return res.json() as Promise<ReactionSummary>;
      })
      .then(setSummary)
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        console.error(error);
        setLoadFailed(true);
      });
    return () => controller.abort();
  }, [postId]);

  function react(type: ReactionType) {
    startTransition(async () => {
      addOptimistic(type);
      try {
        const next = await toggleReaction(postId, type);
        if (!next) throw new Error(`Reaction rejected for post ${postId}`);
        setSummary(next);
      } catch (error) {
        // The optimistic update rolls back automatically when the transition ends
        console.error(error);
        toast.error("Չհաջողվեց պահպանել ռեակցիան");
      }
    });
  }

  const total = optimistic
    ? Object.values(optimistic.counts).reduce((a, b) => a + b, 0)
    : 0;

  return (
    <section
      aria-label="Ռեակցիաներ"
      className="relative isolate mt-12 overflow-hidden rounded-3xl border bg-card p-6 text-center sm:p-8"
    >
      <div className="absolute -top-24 left-1/2 -z-10 h-48 w-96 -translate-x-1/2 rounded-full bg-linear-to-r from-brand-violet/15 via-brand-pink/10 to-brand-apricot/15 blur-3xl" />
      <p className="text-lg font-semibold">Ինչպե՞ս էր հոդվածը</p>
      <p className="mt-1 text-sm text-muted-foreground">
        {loadFailed
          ? "Չհաջողվեց բեռնել ռեակցիաները"
          : total > 0
            ? `${total} ռեակցիա`
            : "Եղիր առաջինը, ով կարձագանքի"}
      </p>

      <div className="mt-6 flex flex-wrap justify-center gap-2 sm:gap-3">
        {REACTIONS.map((r) => {
          const active = optimistic?.mine.includes(r.type) ?? false;
          const n = optimistic?.counts[r.type] ?? 0;
          return (
            <button
              key={r.type}
              type="button"
              disabled={!optimistic}
              onClick={() => react(r.type)}
              aria-pressed={active}
              aria-label={`${r.label}${n ? ` (${n})` : ""}`}
              title={r.label}
              className={cn(
                "group inline-flex h-12 items-center gap-2 rounded-full border bg-background px-4 text-sm font-semibold transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md active:scale-95 disabled:pointer-events-none",
                active &&
                  "border-primary/50 bg-primary/10 text-primary shadow-sm shadow-primary/20",
              )}
            >
              <span
                className={cn(
                  "text-xl transition-transform group-hover:scale-125",
                  active && "animate-in duration-300 zoom-in-50",
                )}
              >
                {r.emoji}
              </span>
              {optimistic ? (
                <span className="min-w-3 tabular-nums">{n}</span>
              ) : (
                !loadFailed && <Skeleton className="h-4 w-3" />
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
