"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useMessages } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { SiteContent } from "@/lib/content";

function ChevronLeft() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

export function GalleryPreviewSection() {
  const content = useMessages() as SiteContent;
  const section = content.sections.gallery;
  const items = content.gallery;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % items.length);
    }, 5500);
    return () => window.clearInterval(timer);
  }, [items.length]);

  return (
    <section
      id="gallery"
      className="bg-gradient-to-b from-white to-surface-muted"
    >
      <div className="site-wrap">
        <div className="mb-[38px] flex flex-wrap items-end justify-between gap-[18px]">
          <div>
            <span className="type-eyebrow">{section.eyebrow}</span>
            <h2 className="type-h2 mt-3.5 text-text">{section.title}</h2>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              aria-label="Previous"
              className="flex size-12 items-center justify-center rounded-full border border-border-input bg-white text-text transition-colors hover:border-brand hover:bg-brand hover:text-white"
              onClick={() =>
                setIndex((current) => (current - 1 + items.length) % items.length)
              }
            >
              <ChevronLeft />
            </button>
            <button
              type="button"
              aria-label="Next"
              className="flex size-12 items-center justify-center rounded-full border border-border-input bg-white text-text transition-colors hover:border-brand hover:bg-brand hover:text-white"
              onClick={() => setIndex((current) => (current + 1) % items.length)}
            >
              <ChevronRight />
            </button>
            <Link href="/gallery" className="btn-secondary ml-2 hidden sm:inline-flex">
              {content.common.viewAll}
            </Link>
          </div>
        </div>

        <div className="overflow-hidden rounded-[18px] border border-border-soft shadow-[0_1px_2px_rgba(20,36,28,0.05),0_24px_60px_rgba(20,36,28,0.10)]">
          <div
            className="flex transition-transform duration-[550ms] ease-[cubic-bezier(0.6,0.05,0.2,1)]"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {items.map((item) => (
              <div key={item.caption} className="relative aspect-video w-full shrink-0 grow-0 basis-full">
                <Image
                  src={item.image}
                  alt={item.caption}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1180px) 100vw, 1180px"
                />
                <div className="absolute bottom-6 left-7 rounded-[10px] bg-white/92 px-[18px] py-[11px] backdrop-blur-[8px]">
                  <p className="m-0 text-[clamp(14px,1.6vw,18px)] font-semibold tracking-[-0.01em] text-text">
                    {item.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-[9px]">
          {items.map((item, dotIndex) => (
            <button
              key={item.caption}
              type="button"
              aria-label={`Go to slide ${dotIndex + 1}`}
              className="h-[7px] rounded-full border-none p-0 transition-[width,background] duration-300"
              style={{
                width: dotIndex === index ? "28px" : "7px",
                background: dotIndex === index ? "#178A4E" : "#D2DAD4",
              }}
              onClick={() => setIndex(dotIndex)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
