import { getMessages } from "next-intl/server";
import type { SiteContent } from "@/lib/content";

export async function DemandsSection() {
  const content = (await getMessages()) as SiteContent;
  const section = content.sections.demands;

  return (
    <section
      id="demands"
      className="bg-gradient-to-b from-white to-surface-muted"
    >
      <div className="site-wrap">
        <div className="r-stack grid grid-cols-1 items-start gap-16 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <span className="type-eyebrow">{section.eyebrow}</span>
            <h2 className="type-h2 mt-3.5 text-text">{section.title}</h2>
            <p className="mt-5 text-[15.5px] leading-[1.8] text-text-muted">
              {section.description}
            </p>
          </div>

          <div className="card-base overflow-hidden rounded-[18px] p-0">
            {content.demands.map((demand, index) => (
              <div
                key={demand.num}
                className={`flex items-start gap-6 px-[30px] py-7 transition-colors hover:bg-[#f1f7f0] ${
                  index < content.demands.length - 1
                    ? "border-b border-[#eef1ec]"
                    : ""
                }`}
              >
                <span className="min-w-[30px] font-display text-lg font-semibold text-brand">
                  {demand.num}
                </span>
                <div>
                  <p className="m-0 text-lg font-semibold leading-[1.5] tracking-[-0.01em] text-text">
                    {demand.text}
                  </p>
                  {"textSecondary" in demand && demand.textSecondary ? (
                    <p className="mt-[7px] font-display text-[13px] text-[#8a968e]">
                      {demand.textSecondary}
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
