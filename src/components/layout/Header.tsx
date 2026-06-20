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

  function navClass(id: string) {
    const isActive = onHome && active === id;
    return cn(
      "whitespace-nowrap rounded-lg px-[9px] py-1.5 text-xs no-underline transition-[background,color] duration-[180ms]",
      isActive
        ? "bg-brand font-semibold text-white"
        : "font-medium text-text-muted hover:bg-[#e4efe0] hover:text-text",
    );
  }

  return (
    <header className="fixed inset-x-0 top-0 z-[60] border-b border-border bg-white/85 backdrop-blur-[18px] backdrop-saturate-[160%]">
      <div className="container-site grid h-[66px] grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-[14px] px-[22px]">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-[11px] justify-self-start whitespace-nowrap text-text no-underline"
          onClick={() => setOpen(false)}
        >
          <Logo />
          <span className="text-[13.5px] font-semibold leading-[1.2] tracking-[-0.01em]">
            {content.meta.orgName}
            <br />
            {content.meta.orgNameLine2}
          </span>
        </Link>

        <nav
          className="mq-desknav min-w-0 items-center gap-px justify-self-center rounded-xl border border-border bg-brand-muted p-[3px]"
          aria-label="Main"
        >
          {content.nav.map((item) =>
            item.type === "page" ? (
              <Link
                key={item.id}
                href={navHref(item)}
                className={navClass(item.id)}
              >
                {item.label}
              </Link>
            ) : (
              <a key={item.id} href={navHref(item)} className={navClass(item.id)}>
                {item.label}
              </a>
            ),
          )}
        </nav>

        <div className="flex shrink-0 items-center justify-self-end gap-2.5">
          <LangSwitch className="hidden min-[1181px]:inline-flex" />
          <a
            href={onHome ? "#join" : "/#join"}
            className="mq-deskjoin rounded-[10px] bg-brand px-[18px] py-2.5 text-[13px] font-semibold text-white no-underline transition-colors hover:bg-brand-dark"
          >
            {content.common.join}
          </a>
          <button
            type="button"
            className="mq-burger hidden size-[42px] items-center justify-center rounded-[11px] border border-border bg-brand-muted p-0 text-xl leading-none text-text"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "×" : "☰"}
          </button>
        </div>
      </div>

      {open ? (
        <div className="mq-mobilemenu border-t border-border bg-white/98 px-[18px] pt-3 pb-5 backdrop-blur-[18px]">
          <div className="mb-3 sm:hidden">
            <LangSwitch />
          </div>
          <div className="flex flex-col">
            {content.nav.map((item) =>
              item.type === "page" ? (
                <Link
                  key={item.id}
                  href={navHref(item)}
                  className="border-b border-[#f0f2f0] px-2.5 py-3.5 text-base font-medium text-[#1b2e24] no-underline"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.id}
                  href={navHref(item)}
                  className="border-b border-[#f0f2f0] px-2.5 py-3.5 text-base font-medium text-[#1b2e24] no-underline"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              ),
            )}
            <a
              href={onHome ? "#join" : "/#join"}
              className="mt-3.5 rounded-[11px] bg-brand px-4 py-[15px] text-center text-[15px] font-semibold text-white no-underline"
              onClick={() => setOpen(false)}
            >
              {content.common.join}
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
