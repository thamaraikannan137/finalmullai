"use client";

import { useState } from "react";
import Image from "next/image";
import { useMessages } from "next-intl";
import type { SiteContent } from "@/lib/content";

export function VideoSection() {
  const content = useMessages() as SiteContent;
  const section = content.sections.video;
  const video = content.videos[0];
  const [playing, setPlaying] = useState(false);

  return (
    <section
      id="video"
      className="bg-section-green"
    >
      <div className="site-wrap">
        <div className="mb-10">
          <span className="type-eyebrow">{section.eyebrow}</span>
          <h2 className="type-h2 mt-3.5 text-text">{section.title}</h2>
        </div>

        <div className="r-stack grid grid-cols-1 gap-[22px] md:grid-cols-2">
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-border-soft bg-dark shadow-[0_1px_2px_rgba(20,36,28,0.05),0_16px_40px_rgba(20,36,28,0.08)]">
            {playing ? (
              <video
                className="absolute inset-0 h-full w-full object-cover"
                controls
                autoPlay
                playsInline
                poster={video.poster}
              >
                <source src={video.url} type="video/mp4" />
              </video>
            ) : (
              <>
                <Image
                  src={video.poster}
                  alt={video.title}
                  fill
                  className="object-cover brightness-[0.78]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(14,44,32,0.6)] to-[rgba(14,44,32,0.05)]" />
                <button
                  type="button"
                  aria-label="Play"
                  className="absolute inset-0 flex items-center justify-center border-none bg-transparent"
                  onClick={() => setPlaying(true)}
                >
                  <span className="flex size-[72px] items-center justify-center rounded-full bg-white/95 shadow-[0_12px_36px_rgba(0,0,0,0.3)] transition-transform hover:scale-105">
                    <svg
                      width="26"
                      height="26"
                      viewBox="0 0 24 24"
                      fill="#178A4E"
                      className="ml-1"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </button>
                <div className="absolute right-6 bottom-[22px] left-6">
                  <p className="m-0 text-[clamp(15px,1.7vw,20px)] font-semibold tracking-[-0.01em] text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.4)]">
                    {video.title}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {section.note ? (
          <p className="mt-[22px] font-display text-[12.5px] text-[#8a968e]">
            {section.note}
          </p>
        ) : null}
      </div>
    </section>
  );
}
