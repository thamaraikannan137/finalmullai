"use client";

import { useEffect, useState } from "react";
import { useMessages } from "next-intl";
import type { SiteContent } from "@/lib/content";
import { cn } from "@/lib/cn";

export function ScrollToTop() {
  const content = useMessages() as SiteContent;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 400);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToTop() {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }

  return (
    <button
      type="button"
      aria-label={content.common.scrollToTop}
      onClick={scrollToTop}
      className={cn(
        "fixed right-5 bottom-5 z-50 flex size-12 items-center justify-center rounded-full bg-brand text-white shadow-[0_8px_24px_rgba(23,138,78,0.35)] transition-[opacity,transform,visibility] duration-300 hover:-translate-y-0.5 hover:bg-brand-dark sm:right-6 sm:bottom-6",
        visible
          ? "visible translate-y-0 opacity-100"
          : "pointer-events-none invisible translate-y-2 opacity-0",
      )}
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="m18 15-6-6-6 6" />
      </svg>
    </button>
  );
}
