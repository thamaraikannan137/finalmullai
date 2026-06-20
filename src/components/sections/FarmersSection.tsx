import { getMessages } from "next-intl/server";
import type { SiteContent } from "@/lib/content";

function QuoteIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="#5FC78C" className="opacity-60">
      <path d="M9.5 5C6 5 3 8 3 11.5V19h7v-7H6.2c.2-2 1.7-3.5 3.3-3.5V5zm11 0c-3.5 0-6.5 3-6.5 6.5V19h7v-7h-3.8c.2-2 1.7-3.5 3.3-3.5V5z" />
    </svg>
  );
}

export async function FarmersSection() {
  const content = (await getMessages()) as SiteContent;
  const section = content.sections.farmers;

  return (
    <section id="farmers" className="bg-dark text-white">
      <div className="site-wrap">
        <div className="r-stack mb-14 grid grid-cols-1 items-center gap-[60px] lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <span className="font-display text-xs font-medium uppercase tracking-[0.25em] text-brand-light">
              {section.eyebrow}
            </span>
            <h2 className="type-h2 mt-3.5">{section.title}</h2>
            <p className="mt-5 max-w-[46ch] text-[15.5px] leading-[1.8] text-[#a9c5b6]">
              {section.description}
            </p>
          </div>
          <div className="r-stack grid grid-cols-1 gap-3.5 sm:grid-cols-3">
            {content.farmerStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-[14px] border border-white/10 bg-white/5 px-5 py-6"
              >
                <div className="font-display text-[clamp(22px,2.4vw,30px)] font-semibold leading-none tracking-[-0.015em] text-[#6fd79c]">
                  {stat.value}
                </div>
                <div className="mt-2.5 text-[12.5px] leading-[1.4] text-[#aec4b5]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="r-stack grid grid-cols-1 gap-[18px] md:grid-cols-3">
          {content.farmers.map((farmer) => (
            <div
              key={farmer.name}
              className="card-tilt flex flex-col rounded-[18px] border border-white/10 bg-white/[0.04] px-[30px] py-8 transition-[transform,background] hover:-translate-y-1 hover:bg-white/[0.07]"
            >
              <QuoteIcon />
              <p className="mt-[18px] flex-1 text-[16.5px] leading-[1.7] text-[#e6f0e9]">
                {farmer.quote}
              </p>
              <div className="mt-6 flex items-center gap-3.5 border-t border-white/10 pt-5">
                <div className="flex size-[46px] shrink-0 items-center justify-center rounded-full bg-brand">
                  <span className="text-lg font-semibold text-white">
                    {farmer.initial}
                  </span>
                </div>
                <div>
                  <p className="m-0 text-[15.5px] font-semibold">{farmer.name}</p>
                  <p className="mt-[3px] font-display text-[11.5px] tracking-[0.04em] text-[#8fb0a0]">
                    {farmer.place}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
