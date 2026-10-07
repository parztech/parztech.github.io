"use client";

import { Check, Link2, Share2 } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { SocialIcon } from "@/features/share/components/SocialIcon";
import {
  COPY_LINK_LABEL,
  SHARE_LABEL,
  SHARE_NETWORKS,
} from "@/features/share/constants";
import { useShare } from "@/features/share/hooks/useShare";
import { cn } from "@/lib/utils";

import type { ShareButtonsProps } from "./types";

export default function ShareButtons(payload: ShareButtonsProps) {
  const { prefersNativeShare, copied, shareNatively, copyLink } =
    useShare(payload);

  return (
    <section
      aria-label={SHARE_LABEL}
      className="mt-6 flex flex-col items-center gap-5 rounded-3xl border bg-card p-6 text-center sm:flex-row sm:justify-between sm:p-8 sm:text-left"
    >
      <div>
        <p className="text-lg font-semibold">Հավանեցի՞ր հոդվածը</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Կիսվիր ընկերներիդ հետ
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {prefersNativeShare && (
          <Button
            onClick={shareNatively}
            className="h-10 rounded-full px-5 shadow-lg shadow-primary/25"
          >
            <Share2 />
            {SHARE_LABEL}
          </Button>
        )}
        {SHARE_NETWORKS.map((network) => (
          <a
            key={network.id}
            href={network.buildUrl(payload)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Կիսվել ${network.label}-ով`}
            title={network.label}
            className={cn(
              buttonVariants({ variant: "outline", size: "icon" }),
              "size-10 rounded-full text-muted-foreground transition-transform hover:-translate-y-0.5",
              network.hoverClass,
            )}
          >
            <SocialIcon network={network} className="size-[18px]" />
          </a>
        ))}
        <Button
          variant="outline"
          size="icon"
          onClick={copyLink}
          aria-label={COPY_LINK_LABEL}
          title={COPY_LINK_LABEL}
          className="size-10 rounded-full text-muted-foreground transition-transform hover:-translate-y-0.5 hover:text-primary"
        >
          {copied ? <Check className="text-brand-emerald" /> : <Link2 />}
        </Button>
      </div>
    </section>
  );
}
