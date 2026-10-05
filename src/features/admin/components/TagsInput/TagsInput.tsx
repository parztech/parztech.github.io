"use client";

import { X } from "lucide-react";
import { useState } from "react";

import { Input } from "@/components/ui/input";

import { MAX_TAGS } from "./constants";
import type { TagsInputProps } from "./types";

export default function TagsInput({ id, value, onChange }: TagsInputProps) {
  const [draft, setDraft] = useState("");

  function addTag(raw: string) {
    const tag = raw.trim().replace(/^#/, "");
    if (tag && !value.includes(tag) && value.length < MAX_TAGS) {
      onChange([...value, tag]);
    }
    setDraft("");
  }

  return (
    <div className="space-y-2">
      {value.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {value.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 rounded-full bg-secondary py-0.5 pr-1 pl-2.5 text-xs text-secondary-foreground"
            >
              #{tag}
              <button
                type="button"
                aria-label={`Հեռացնել ${tag}`}
                onClick={() => onChange(value.filter((t) => t !== tag))}
                className="rounded-full p-0.5 hover:bg-foreground/10"
              >
                <X className="size-3" />
              </button>
            </span>
          ))}
        </div>
      )}
      <Input
        id={id}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            addTag(draft);
          } else if (e.key === "Backspace" && !draft && value.length) {
            onChange(value.slice(0, -1));
          }
        }}
        onBlur={() => draft && addTag(draft)}
        placeholder="Գրիր և սեղմիր Enter"
      />
    </div>
  );
}
