import Image from "next/image";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { SiteContent } from "@/lib/content";

type NewsPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function NewsPage({ params }: NewsPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = (await getMessages()) as SiteContent;
  const section = content.sections.news;

  return (
    <div className="bg-gradient-to-b from-white to-surface-muted pt-[70px]">
      <div className="site-wrap">
        <span className="type-eyebrow">{section.eyebrow}</span>
        <h1 className="type-h2 mt-3.5 text-text">{section.pageTitle}</h1>
        <p className="type-body-md mt-5 max-w-2xl">{section.pageDescription}</p>

        <div className="r-stack mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {content.news.map((item) => (
            <Link
              key={item.id}
              href={`/news/${item.id}`}
              className="card-base card-tilt group relative flex flex-col overflow-hidden rounded-2xl no-underline"
            >
              <div className="relative">
                <div className="relative h-[188px] w-full">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <span className="absolute left-3.5 top-3.5 rounded-[7px] bg-white/94 px-[11px] py-[5px] font-display text-[10.5px] font-semibold uppercase tracking-[0.08em] text-brand-dark">
                  {item.tag}
                </span>
              </div>
              <div className="flex flex-1 flex-col px-6 pb-[26px] pt-6">
                <p className="m-0 font-display text-xs tracking-[0.04em] text-text-faint">
                  {item.date}
                </p>
                <h2 className="mt-2.5 text-[18.5px] font-semibold leading-[1.4] tracking-[-0.015em] text-text">
                  {item.title}
                </h2>
                <p className="mt-[11px] text-sm leading-[1.7] text-text-muted">
                  {(item.paragraphs[0] || "").slice(0, 116)}
                  {(item.paragraphs[0] || "").length > 116 ? "…" : ""}
                </p>
                <span className="mt-4 text-[13.5px] font-semibold text-brand">
                  {content.common.readMore}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
