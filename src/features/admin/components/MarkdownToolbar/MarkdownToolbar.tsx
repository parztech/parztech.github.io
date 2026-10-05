"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { TOOLBAR_TOOLS } from "./constants";
import type { MarkdownToolbarProps } from "./types";
import { applyEdit } from "./utils";

export default function MarkdownToolbar({
  textareaRef,
  onChange,
}: MarkdownToolbarProps) {
  return (
    <div className="flex flex-wrap items-center gap-0.5">
      {TOOLBAR_TOOLS.map((tool) => (
        <Tooltip key={tool.label}>
          <TooltipTrigger
            render={
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label={tool.label}
                onClick={() =>
                  textareaRef.current &&
                  applyEdit(textareaRef.current, tool.edit, onChange)
                }
              />
            }
          >
            <tool.icon />
          </TooltipTrigger>
          <TooltipContent>{tool.label}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}
