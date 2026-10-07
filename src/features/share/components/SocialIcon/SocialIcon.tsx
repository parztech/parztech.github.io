import { cn } from "@/lib/utils";

import type { SocialIconProps } from "./types";

export default function SocialIcon({ network, className }: SocialIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={cn("size-4", className)}
    >
      <path d={network.iconPath} fillRule={network.iconFillRule} />
    </svg>
  );
}
