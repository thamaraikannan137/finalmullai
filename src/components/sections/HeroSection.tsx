import Image from "next/image";
import { getMessages } from "next-intl/server";
import type { SiteContent } from "@/lib/content";

export async function HeroSection() {
  const content = (await getMessages()) as SiteContent;
  const hero = content.sections.hero;

  return (
    <section
      id="home"
      className="r-hero bg-gradient-to-b from-white to-surface-muted pt-[70px]"
    >
      <div className="hero-wrap">
        <div className="max-w-[880px]">
          <div className="mb-[26px] inline-flex items-center gap-2.5 rounded-full bg-brand-soft px-[15px] py-1.5">
            <span className="size-1.5 rounded-full bg-brand" />
            <span className="font-display text-[11.5px] font-medium uppercase tracking-[0.16em] text-brand-dark">
              {hero.badge}
            </span>
          </div>
          <h1 className="type-display m-0 text-text">
            {hero.title}{" "}
            <span className="text-brand">{hero.titleHighlight}</span>
          </h1>
          <p className="type-body-lg mt-[26px] max-w-[56ch]">
            {hero.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#join" className="btn-primary">
              {hero.ctaPrimary}
            </a>
            <a href="#demands" className="btn-secondary">
              {hero.ctaSecondary}
            </a>
          </div>
        </div>

        <div className="relative mt-14 overflow-hidden rounded-[18px] border border-border-soft shadow-[0_1px_2px_rgba(20,36,28,0.05),0_30px_70px_rgba(20,36,28,0.10)]">
          <div className="relative h-[clamp(320px,44vw,520px)] w-full">
            <Image
              src={hero.bannerImage}
              alt={hero.bannerAlt}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1180px) 100vw, 1180px"
            />
          </div>
          <div className="absolute bottom-6 left-[26px] flex items-center gap-3.5 rounded-xl bg-white/92 px-[18px] py-3.5 shadow-[0_8px_24px_rgba(20,36,28,0.12)] backdrop-blur-[8px]">
            <span className="font-display text-[26px] font-semibold leading-none text-brand">
              {hero.overlayValue}
              <span className="text-sm text-text-muted">{hero.overlayUnit}</span>
            </span>
            <span className="h-[30px] w-px bg-[#e0e5e1]" />
            <span className="max-w-[18ch] text-[13px] leading-[1.35] text-text-muted">
              {hero.overlayLabel}
            </span>
          </div>
        </div>

        <div className="r-cols2 grid grid-cols-2 pt-[34px] lg:grid-cols-4">
          {content.stats.map((stat) => (
            <div
              key={stat.label}
              className="border-l border-border-soft px-6 py-[18px]"
            >
              <div className="font-display text-[clamp(26px,2.6vw,36px)] font-semibold leading-none tracking-[-0.02em] text-text">
                {stat.value}
              </div>
              <div className="mt-[9px] text-[13px] leading-[1.4] text-text-soft">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
