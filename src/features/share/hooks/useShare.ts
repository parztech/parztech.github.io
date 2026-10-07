"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { toast } from "sonner";

import { COPIED_FEEDBACK_MS } from "../constants";
import type { SharePayload } from "../types";

const TOUCH_QUERY = "(pointer: coarse)";

function subscribe(onChange: () => void) {
  const query = window.matchMedia(TOUCH_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

// Desktop browsers may also support navigator.share, but there the direct
// network buttons are more useful than the OS share sheet
function prefersNativeShareSnapshot() {
  return (
    typeof navigator.share === "function" &&
    window.matchMedia(TOUCH_QUERY).matches
  );
}

export function useShare({ url, title, description }: SharePayload) {
  const prefersNativeShare = useSyncExternalStore(
    subscribe,
    prefersNativeShareSnapshot,
    () => false,
  );
  const [copied, setCopied] = useState(false);
  // A second tap while the share sheet is open would reject with InvalidStateError
  const isSharingRef = useRef(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), COPIED_FEEDBACK_MS);
    return () => clearTimeout(timer);
  }, [copied]);

  async function shareNatively() {
    if (isSharingRef.current) return;
    isSharingRef.current = true;
    try {
      await navigator.share({ url, title, text: description });
    } catch (error) {
      // The reader closed the share sheet; nothing went wrong
      if (error instanceof DOMException && error.name === "AbortError") return;
      console.error(error);
      toast.error("Չհաջողվեց կիսվել");
    } finally {
      isSharingRef.current = false;
    }
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Հղումը պատճենված է");
    } catch (error) {
      console.error(error);
      toast.error("Չհաջողվեց պատճենել հղումը");
    }
  }

  return { prefersNativeShare, copied, shareNatively, copyLink };
}
