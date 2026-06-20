import Image from "next/image";
import { getMessages } from "next-intl/server";
import type { SiteContent } from "@/lib/content";

export async function LeadersSection() {
  const content = (await getMessages()) as SiteContent;
  const section = content.sections.leaders;
  const { president, bearers } = content;

  return (
    <section
      id="leaders"
      className="bg-section-green"
    >
      <div className="site-wrap">
        <div className="mb-10">
          <span className="type-eyebrow">{section.eyebrow}</span>
          <h2 className="type-h2 mt-3.5 text-text">{section.title}</h2>
        </div>

        <div className="r-stack grid grid-cols-1 items-stretch gap-14 rounded-[18px] border border-[#e5ece2] bg-white p-[18px] shadow-[0_1px_3px_rgba(20,36,28,0.05),0_30px_64px_rgba(20,36,28,0.10)] lg:grid-cols-[0.8fr_1.2fr]">
          <div className="relative min-h-[420px] overflow-hidden rounded-[14px]">
            <Image
              src={president.photo}
              alt={president.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </div>
          <div className="flex flex-col justify-center py-2 pr-0 pl-0 lg:py-[34px] lg:pr-10">
            <span className="font-display text-xs font-medium uppercase tracking-[0.12em] text-brand">
              {president.role} · {president.roleSecondary}
            </span>
            <p className="mt-[18px] text-[clamp(20px,2.2vw,28px)] font-medium leading-[1.5] tracking-[-0.015em] text-text">
              {section.presidentQuoteLead}{" "}
              <span className="text-brand">{section.presidentQuoteHighlight}</span>{" "}
              {section.presidentQuoteTail}
            </p>
            <p className="type-body-md mt-[22px]">{section.presidentBio}</p>
            <p className="mt-6 text-lg font-semibold text-text">
              {president.name}
            </p>
          </div>
        </div>

        <p className="mt-[54px] mb-[22px] font-display text-xs uppercase tracking-[0.25em] text-text-faint">
          {section.bearersLabel}
        </p>

        <div className="r-stack grid grid-cols-1 gap-[18px] md:grid-cols-3">
          {bearers.map((person) => (
            <div
              key={person.role}
              className="card-base card-tilt flex items-center gap-[18px] rounded-2xl px-6 py-[22px] shadow-[0_1px_2px_rgba(20,36,28,0.04),0_10px_26px_rgba(20,36,28,0.05)]"
            >
              <div className="flex size-[54px] shrink-0 items-center justify-center rounded-full bg-brand-soft">
                <span className="text-xl font-semibold text-brand">
                  {person.initial}
                </span>
              </div>
              <div>
                <h3 className="m-0 text-[17px] font-semibold text-text">
                  {person.name}
                </h3>
                <p className="mt-[5px] font-display text-[10.5px] font-medium uppercase tracking-[0.14em] text-brand">
                  {person.roleSecondary}
                </p>
                <p className="mt-0.5 text-[13px] text-text-soft">
                  {person.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
