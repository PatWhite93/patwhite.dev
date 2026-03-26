"use client";

import { useState, useEffect, useCallback } from "react";

export default function ImageLightbox() {
  const [src, setSrc] = useState<string | null>(null);

  const close = useCallback(() => setSrc(null), []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const img = (e.target as HTMLElement).closest("img.wide");
      if (img) setSrc((img as HTMLImageElement).src);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  useEffect(() => {
    if (!src) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [src, close]);

  if (!src) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      onClick={close}
    >
      <button
        onClick={close}
        aria-label="Close"
        className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white text-2xl hover:bg-white/20 transition-colors"
      >
        &times;
      </button>
      <img
        src={src}
        alt=""
        className="max-w-[95vw] max-h-[95vh] object-contain"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}
