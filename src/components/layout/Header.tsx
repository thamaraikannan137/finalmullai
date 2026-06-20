"use client";

import { useEffect, useState } from "react";
import { useMessages } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import type { SiteContent } from "@/lib/content";
import { resolveNavHref } from "@/lib/content";
import { cn } from "@/lib/cn";
import { Logo } from "@/components/ui/Logo";
import { LangSwitch } from "./LangSwitch";

const SECTION_IDS = [
  "home",
  "about",
  "leaders",
  "demands",
  "issue",
  "farmers",
  "news",
  "video",
  "gallery",
  "join",
  "contact",
];

export function Header() {
  const content = useMessages() as SiteContent;
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const onHome = pathname === "/";

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (!onHome) return;

    function onScroll() {
      let current = "home";
      for (const id of SECTION_IDS) {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= 140) {
          current = id;
        }
      }
      setActive(current);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onHome]);

  function navHref(item: SiteContent["nav"][number]) {
    if (item.type === "page") return item.href;
    return resolveNavHref(item.href, onHome);
  }

  function desktopNavClass(id: string) {
    const isActive = onHome && active === id;
    return cn(
      "whitespace-nowrap rounded-lg px-[9px] py-1.5 text-xs no-underline transition-[background,color] duration-[180ms]",
      isActive
        ? "bg-brand font-semibold text-white"
        : "font-medium text-white/70 hover:bg-white/10 hover:text-white",
    );
  }

  function mobileNavClass(id: string) {
    const isActive = onHome && active === id;
    return cn(
      "block border-b border-white/10 px-2.5 py-3.5 text-base font-medium no-underline transition-colors",
      isActive ? "bg-white/10 text-white" : "text-white/90 hover:bg-white/5",
    );
  }

  const langSwitchDesktopClass =
    "border-white/15 bg-white/5 text-white/80 hover:border-brand hover:bg-white/10 hover:text-brand-light";

  const langSwitchMobileClass =
    "w-full justify-center border-white/15 bg-white/5 text-white/80 hover:border-brand hover:bg-white/10 hover:text-brand-light";

  return (
    <header className="fixed inset-x-0 top-0 z-[60] border-b border-white/10 bg-dark/90 backdrop-blur-[18px] backdrop-saturate-[160%]">
      <div className="container-site relative flex h-[66px] items-center justify-between gap-3 px-[22px]">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-[11px] text-white no-underline sm:max-w-[min(100%,calc(100%-52px))]"
          onClick={() => setOpen(false)}
        >
          <Logo className="shrink-0" />
          <span className="text-[11.5px] font-semibold leading-[1.2] tracking-[-0.01em] min-[420px]:text-[13.5px]">
            {content.meta.orgName}
            <br />
            {content.meta.orgNameLine2}
          </span>
        </Link>

        <nav
          className="mq-desknav absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-px rounded-xl border border-white/10 bg-white/5 p-[3px]"
          aria-label="Main"
        >
          {content.nav.map((item) =>
            item.type === "page" ? (
              <Link
                key={item.id}
                href={navHref(item)}
                className={desktopNavClass(item.id)}
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.id}
                href={navHref(item)}
                className={desktopNavClass(item.id)}
              >
                {item.label}
              </a>
            ),
          )}
        </nav>

        <div className="flex shrink-0 items-center gap-2.5">
          <LangSwitch
            className={cn("hidden min-[1181px]:inline-flex", langSwitchDesktopClass)}
          />
          <a
            href={onHome ? "#join" : "/#join"}
            className="mq-deskjoin rounded-[10px] bg-brand px-[18px] py-2.5 text-[13px] font-semibold text-white no-underline transition-colors hover:bg-brand-dark"
          >
            {content.common.join}
          </a>
          <button
            type="button"
            className="mq-burger flex size-[42px] shrink-0 items-center justify-center rounded-[11px] border border-white/15 bg-white/5 p-0 text-[22px] leading-none text-white"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            <span aria-hidden className="relative block size-5">
              <span
                className={cn(
                  "absolute top-1/2 left-0 h-0.5 w-5 -translate-y-1/2 rounded-full bg-current transition-transform duration-200",
                  open ? "rotate-45" : "-translate-y-[6px]",
                )}
              />
              <span
                className={cn(
                  "absolute top-1/2 left-0 h-0.5 w-5 -translate-y-1/2 rounded-full bg-current transition-opacity duration-200",
                  open ? "opacity-0" : "opacity-100",
                )}
              />
              <span
                className={cn(
                  "absolute top-1/2 left-0 h-0.5 w-5 -translate-y-1/2 rounded-full bg-current transition-transform duration-200",
                  open ? "-rotate-45" : "translate-y-[6px]",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          "mq-mobilemenu overflow-y-auto border-t border-white/10 bg-dark/98 backdrop-blur-[18px]",
          open ? "block" : "hidden",
        )}
        style={{ maxHeight: "calc(100dvh - var(--header-height))" }}
      >
        <div className="container-site px-[18px] pt-3 pb-5">
          <div className="mb-3 min-[1181px]:hidden">
            <LangSwitch className={langSwitchMobileClass} />
          </div>
          <nav className="flex flex-col" aria-label="Mobile">
            {content.nav.map((item) =>
              item.type === "page" ? (
                <Link
                  key={item.id}
                  href={navHref(item)}
                  className={mobileNavClass(item.id)}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.id}
                  href={navHref(item)}
                  className={mobileNavClass(item.id)}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              ),
            )}
          </nav>
          <a
            href={onHome ? "#join" : "/#join"}
            className="mt-3.5 block rounded-[11px] bg-brand px-4 py-[15px] text-center text-[15px] font-semibold text-white no-underline transition-colors hover:bg-brand-dark"
            onClick={() => setOpen(false)}
          >
            {content.common.join}
          </a>
        </div>
      </div>
    </header>
  );
}
