import Image from "next/image";
import { notFound } from "next/navigation";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getNewsItem, type SiteContent } from "@/lib/content";
import { getContent } from "@/lib/messages";

type NewsDetailPageProps = {
  params: Promise<{ locale: string; id: string }>;
};

export function generateStaticParams() {
  const locales = ["ta", "en"] as const;
  const params: Array<{ locale: string; id: string }> = [];

  for (const locale of locales) {
    for (const item of getContent(locale).news) {
      params.push({ locale, id: item.id });
    }
  }

  return params;
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const content = (await getMessages()) as SiteContent;
  const item = getNewsItem(content, id);

  if (!item) {
    notFound();
  }

  return (
    <div className="bg-gradient-to-b from-white to-surface-muted pt-[70px]">
      <div className="site-wrap max-w-[760px]">
        <Link
          href="/news"
          className="btn-secondary inline-flex no-underline"
        >
          {content.common.back}
        </Link>

        <div className="mt-8 overflow-hidden rounded-[20px] border border-border-soft bg-white shadow-[0_40px_100px_rgba(14,36,28,0.12)]">
          <div className="relative aspect-[16/10] w-full">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 760px"
              priority
            />
          </div>
          <div className="px-[52px] py-11 pb-[52px]">
            <div className="flex items-center gap-3.5">
              <span className="rounded-[7px] bg-brand-soft px-3 py-[5px] font-display text-[10.5px] font-semibold uppercase tracking-[0.12em] text-brand-dark">
                {item.tag}
              </span>
              <span className="font-display text-[13px] tracking-[0.04em] text-text-faint">
                {item.date}
              </span>
            </div>
            <h1 className="type-h2 mt-[22px] text-text">{item.title}</h1>
            <div className="mt-[26px] space-y-[18px]">
              {item.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 24)}
                  className="m-0 text-[17px] leading-[1.85] text-[#3f4e45]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <Link href="/news" className="btn-secondary mt-[18px] inline-flex no-underline">
              {content.common.close}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
