import { getMessages } from "next-intl/server";
import type { SiteContent } from "@/lib/content";

function ContactIcon({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex size-[50px] shrink-0 items-center justify-center rounded-xl border border-[#e4e8e4] bg-white shadow-[0_4px_12px_rgba(20,36,28,0.07)] transition-[transform,background-color,border-color,box-shadow] duration-300 group-hover:scale-105 group-hover:border-brand/30 group-hover:bg-brand-muted group-hover:shadow-[0_0_14px_rgba(23,138,78,0.35),0_4px_12px_rgba(20,36,28,0.07)]">
      {children}
    </div>
  );
}

export async function ContactSection() {
  const content = (await getMessages()) as SiteContent;
  const section = content.sections.contact;

  return (
    <section
      id="contact"
      className="bg-gradient-to-b from-white to-surface-muted"
    >
      <div className="site-wrap">
        <div className="r-stack grid grid-cols-1 items-start gap-16 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <span className="type-eyebrow">{section.eyebrow}</span>
            <h2 className="type-h2 mt-3.5 text-text">{section.title}</h2>
            <p className="mt-5 max-w-[40ch] text-[15.5px] leading-[1.8] text-text-muted">
              {section.description}
            </p>
            <div className="mt-[26px] inline-flex items-center gap-2.5 rounded-full bg-brand-soft px-[18px] py-2.5">
              <span className="size-[7px] rounded-full bg-brand" />
              <span className="font-display text-[12.5px] font-medium text-brand-dark">
                {section.hours}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-[14px] [perspective:900px]">
            {content.contacts.map((contact, index) => (
              <div
                key={contact.label}
                className="card-base contact-card-tilt group flex items-center gap-5 rounded-[18px] px-[26px] py-6 shadow-[0_1px_2px_rgba(20,36,28,0.04),0_10px_26px_rgba(20,36,28,0.05)]"
              >
                <ContactIcon>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#178A4E" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    {index === 0 ? (
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
                    ) : index === 1 ? (
                      <>
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <path d="m22 7-10 6L2 7" />
                      </>
                    ) : (
                      <>
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                        <circle cx="12" cy="10" r="3" />
                      </>
                    )}
                  </svg>
                </ContactIcon>
                <div>
                  <p className="m-0 font-display text-[11px] uppercase tracking-[0.12em] text-text-faint">
                    {contact.label}
                  </p>
                  <p className="mt-[5px] break-words text-[17px] font-semibold leading-[1.45] text-text transition-colors duration-300 group-hover:text-brand-dark">
                    {contact.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <p className="mb-[22px] font-display text-xs uppercase tracking-[0.25em] text-text-faint">
            {section.faqTitle}
          </p>
          <div className="r-stack grid grid-cols-1 gap-[18px] md:grid-cols-3">
            {content.faqs.map((faq) => (
              <div
                key={faq.q}
                className="card-base card-tilt rounded-2xl px-[26px] py-7 shadow-[0_1px_2px_rgba(20,36,28,0.04),0_10px_26px_rgba(20,36,28,0.05)]"
              >
                <h3 className="m-0 text-[17px] font-semibold leading-[1.4] tracking-[-0.01em] text-text">
                  {faq.q}
                </h3>
                <p className="mt-[13px] text-[14.5px] leading-[1.75] text-text-muted">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
