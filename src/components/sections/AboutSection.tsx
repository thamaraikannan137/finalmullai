import Image from "next/image";
import { getMessages } from "next-intl/server";
import type { SiteContent } from "@/lib/content";
import { ObjectiveIcon, type ObjectiveIconName } from "@/components/ui/ObjectiveIcon";

export async function AboutSection() {
  const content = (await getMessages()) as SiteContent;
  const about = content.sections.about;

  return (
    <section
      id="about"
      className="bg-gradient-to-b from-white to-surface-muted"
    >
      <div className="site-wrap">
        <div className="mb-9">
          <span className="type-eyebrow">{about.eyebrow}</span>
        </div>

        <div className="r-stack grid grid-cols-12 gap-[18px]">
          <div className="card-soft col-span-12 px-[46px] py-12 lg:col-span-7">
            <h2 className="type-h2 m-0 text-text">{about.title}</h2>
            <p className="mt-[22px] text-[16.5px] leading-[1.8] text-text-muted">
              {about.body}
            </p>
            <div className="mt-[34px] flex gap-11 border-t border-[#e2e7e3] pt-7">
              {content.aboutStats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-[30px] font-semibold leading-none text-brand">
                    {stat.value}
                  </div>
                  <div className="mt-[7px] text-[13px] text-text-soft">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-12 flex min-h-[340px] overflow-hidden rounded-[18px] border border-border-soft lg:col-span-5">
            <div className="relative min-h-[340px] w-full">
              <Image
                src={about.aboutImage}
                alt={about.aboutImageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </div>

          {content.objectives.map((item) => (
            <div
              key={item.title}
              className="card-base card-tilt col-span-12 px-8 py-[34px] lg:col-span-4"
            >
              <div className="flex size-[46px] items-center justify-center rounded-xl bg-brand-soft">
                <ObjectiveIcon name={item.icon as ObjectiveIconName} />
              </div>
              <h3 className="mt-[22px] text-xl font-semibold tracking-[-0.015em] text-text">
                {item.title}
              </h3>
              {"titleSecondary" in item && item.titleSecondary ? (
                <p className="mt-[5px] font-display text-[11px] uppercase tracking-[0.14em] text-text-faint">
                  {item.titleSecondary}
                </p>
              ) : null}
              <p className="mt-3.5 text-[14.5px] leading-[1.7] text-text-muted">
                {item.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-[18px] rounded-[18px] bg-dark px-14 py-16 text-center">
          <p className="m-0 text-[clamp(22px,2.8vw,34px)] font-medium leading-[1.4] tracking-[-0.015em] text-white">
            {about.quoteLead}{" "}
            <span className="text-brand-light">{about.quoteHighlight}</span>
          </p>
          <p className="mt-5 font-display text-[15px] italic text-[#9dbbab]">
            “{about.quoteEn}”
          </p>
        </div>
      </div>
    </section>
  );
}
