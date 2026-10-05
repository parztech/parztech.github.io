"use client";

import { useEffect, useRef } from "react";

export default function ReadingProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      const progress = scrollTop / Math.max(1, scrollHeight - clientHeight);
      barRef.current?.style.setProperty("transform", `scaleX(${progress})`);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      ref={barRef}
      className="fixed inset-x-0 top-0 z-50 h-1 origin-left scale-x-0 bg-linear-to-r from-brand-violet via-brand-pink to-brand-apricot"
    />
  );
}
