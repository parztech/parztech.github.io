"use client";

import { Check, Link2, Share2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SocialIcon } from "@/features/share/components/SocialIcon";
import {
  COPY_LINK_LABEL,
  SHARE_LABEL,
  SHARE_NETWORKS,
} from "@/features/share/constants";
import { useShare } from "@/features/share/hooks/useShare";

import type { ShareMenuProps } from "./types";

const triggerButtonProps = {
  variant: "outline",
  size: "sm",
  className: "rounded-full",
} as const;

/** Compact share button: the OS share sheet on touch devices, a menu elsewhere */
export default function ShareMenu(payload: ShareMenuProps) {
  const { prefersNativeShare, copied, shareNatively, copyLink } =
    useShare(payload);

  if (prefersNativeShare) {
    return (
      <Button {...triggerButtonProps} onClick={shareNatively}>
        <Share2 />
        {SHARE_LABEL}
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button {...triggerButtonProps} />}>
        <Share2 />
        {SHARE_LABEL}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-48">
        {SHARE_NETWORKS.map((network) => (
          <DropdownMenuItem
            key={network.id}
            onClick={() =>
              window.open(
                network.buildUrl(payload),
                "_blank",
                "noopener,noreferrer",
              )
            }
          >
            <SocialIcon network={network} />
            {network.label}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem closeOnClick={false} onClick={copyLink}>
          {copied ? <Check className="text-brand-emerald" /> : <Link2 />}
          {COPY_LINK_LABEL}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
