import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Anek_Tamil, Space_Grotesk } from "next/font/google";
import { routing, type Locale } from "@/i18n/routing";
import type { SiteContent } from "@/lib/content";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "../globals.css";

const anekTamil = Anek_Tamil({
  variable: "--font-anek-tamil",
  subsets: ["latin", "tamil"],
  weight: ["300", "400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`../../../messages/${locale}.json`))
    .default as SiteContent;

  return {
    title: messages.meta.title,
    description: messages.meta.description,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${anekTamil.variable} ${spaceGrotesk.variable} min-h-screen bg-white text-text antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
