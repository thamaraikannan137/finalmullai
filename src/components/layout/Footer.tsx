import { getMessages } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { SiteContent } from "@/lib/content";
import { Logo } from "@/components/ui/Logo";

export async function Footer() {
  const content = (await getMessages()) as SiteContent;

  return (
    <footer className="bg-dark pb-[30px] text-[#a9c5b6]">
      <div className="site-wrap !pb-0 !pt-16">
        <div className="r-stack grid grid-cols-1 gap-12 lg:grid-cols-[1.6fr_1fr_1fr] lg:gap-[50px]">
          <div className="max-w-[360px]">
            <div className="flex items-center gap-[11px]">
              <Logo className="size-[34px]" />
              <span className="text-[15px] font-semibold leading-[1.2] tracking-[-0.01em] text-white">
                {content.footer.orgNameLines.map((line, index) => (
                  <span key={line}>
                    {index > 0 ? <br /> : null}
                    {line}
                  </span>
                ))}
              </span>
            </div>
            <p className="mt-5 text-sm leading-[1.8] text-[#8fb0a0]">
              {content.footer.description}
            </p>
            <a
              href="/#join"
              className="btn-green-sm mt-6 px-[22px] no-underline"
            >
              {content.common.becomeMember}
            </a>
          </div>

          <div>
            <h4 className="m-0 mb-[18px] font-display text-[11px] uppercase tracking-[0.18em] text-brand-light">
              {content.footer.pagesTitle}
            </h4>
            <div className="flex flex-col items-start gap-3 text-sm">
              {content.nav.map((item) =>
                item.type === "page" ? (
                  <Link
                    key={item.id}
                    href={item.href}
                    className="text-[#a9c5b6] no-underline transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={item.id}
                    href={`/${item.href}`}
                    className="text-[#a9c5b6] no-underline transition-colors hover:text-white"
                  >
                    {item.label}
                  </a>
                ),
              )}
            </div>
          </div>

          <div>
            <h4 className="m-0 mb-[18px] font-display text-[11px] uppercase tracking-[0.18em] text-brand-light">
              {content.footer.districtsTitle}
            </h4>
            <div className="flex flex-col gap-3 text-sm text-[#8fb0a0]">
              {content.footer.districts.map((district) => (
                <span key={district}>{district}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6 font-display text-xs text-[#6e9484]">
          <span>{content.footer.copyright}</span>
          <span className="text-brand-light">{content.footer.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
