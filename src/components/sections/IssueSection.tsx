import { getMessages } from "next-intl/server";
import type { SiteContent } from "@/lib/content";

export async function IssueSection() {
  const content = (await getMessages()) as SiteContent;
  const section = content.sections.issue;

  return (
    <section
      id="issue"
      className="bg-gradient-to-b from-surface-green to-surface-green-deep"
    >
      <div className="site-wrap">
        <span className="type-eyebrow">{section.eyebrow}</span>
        <h2 className="type-h2 mt-3.5 mb-[22px] text-text">{section.title}</h2>
        <p className="m-0 max-w-[66ch] text-[17px] leading-[1.85] text-text-muted">
          {section.body}
        </p>

        <div className="r-cols2 my-12 grid grid-cols-2 gap-[18px] lg:grid-cols-4">
          {content.issueFacts.map((fact) => (
            <div
              key={fact.label}
              className="card-base card-tilt rounded-2xl px-[26px] py-7 shadow-[0_1px_2px_rgba(20,36,28,0.04),0_10px_26px_rgba(20,36,28,0.05)]"
            >
              <div className="font-display text-[clamp(24px,2.4vw,34px)] font-semibold leading-none tracking-[-0.015em] text-brand">
                {fact.value}
              </div>
              <div className="mt-[11px] text-[13px] leading-[1.4] text-text-soft">
                {fact.label}
              </div>
            </div>
          ))}
        </div>

        <div className="r-stack grid grid-cols-1 items-start gap-14 lg:grid-cols-[0.36fr_0.64fr]">
          <div className="lg:sticky lg:top-[88px]">
            <h3 className="m-0 text-[clamp(22px,2.6vw,30px)] font-semibold leading-[1.2] tracking-[-0.015em] text-text">
              {section.timelineTitle}
            </h3>
            <p className="mt-3.5 font-display text-xs uppercase tracking-[0.12em] text-text-faint">
              {section.timelineSubtitle}
            </p>
          </div>
          <div>
            {content.timeline.map((item) => (
              <div
                key={item.year}
                className="-mx-[18px] flex items-start gap-[26px] rounded-xl border-t border-[#e2e7e3] px-[18px] py-6 transition-colors hover:bg-[#f1f7f0]"
              >
                <span className="min-w-[72px] font-display text-lg font-semibold text-brand">
                  {item.year}
                </span>
                <div>
                  <p className="m-0 text-[17px] font-semibold leading-[1.5] text-text">
                    {item.text}
                  </p>
                  {"textSecondary" in item && item.textSecondary ? (
                    <p className="mt-1.5 font-display text-[13px] text-[#8a968e]">
                      {item.textSecondary}
                    </p>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
