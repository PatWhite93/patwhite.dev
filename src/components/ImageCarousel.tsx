"use client";

import { useState } from "react";
import Image from "next/image";

export default function ImageCarousel({ images, alt }: { images: string[]; alt: string }) {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <div className="relative rounded-xl overflow-hidden border border-[var(--color-card-border)] bg-[var(--color-card)]">
      <div className="relative aspect-video">
        <Image
          src={images[index]}
          alt={`${alt} — image ${index + 1}`}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 768px"
        />
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/70 text-white text-2xl cursor-pointer hover:bg-black/90 transition-colors"
          >
            &#8249;
          </button>
          <button
            onClick={next}
            aria-label="Next image"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/70 text-white text-2xl cursor-pointer hover:bg-black/90 transition-colors"
          >
            &#8250;
          </button>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to image ${i + 1}`}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === index ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
