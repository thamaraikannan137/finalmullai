import Image from "next/image";
import { getMessages, setRequestLocale } from "next-intl/server";
import type { SiteContent } from "@/lib/content";

type GalleryPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function GalleryPage({ params }: GalleryPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = (await getMessages()) as SiteContent;
  const section = content.sections.gallery;

  return (
    <div className="bg-gradient-to-b from-white to-surface-muted pt-[70px]">
      <div className="site-wrap">
        <span className="type-eyebrow">{section.eyebrow}</span>
        <h1 className="type-h2 mt-3.5 text-text">{section.pageTitle}</h1>
        <p className="type-body-md mt-5 max-w-2xl">{section.pageDescription}</p>

        <div className="r-stack mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {content.gallery.map((item) => (
            <figure
              key={item.caption}
              className="card-base card-tilt overflow-hidden rounded-2xl"
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={item.image}
                  alt={item.caption}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <figcaption className="px-6 py-5 text-[clamp(14px,1.6vw,18px)] font-semibold tracking-[-0.01em] text-text">
                {item.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}
