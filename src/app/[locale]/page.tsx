import { setRequestLocale } from "next-intl/server";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { DemandsSection } from "@/components/sections/DemandsSection";
import { FarmersSection } from "@/components/sections/FarmersSection";
import { GalleryPreviewSection } from "@/components/sections/GalleryPreviewSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { IssueSection } from "@/components/sections/IssueSection";
import { JoinSection } from "@/components/sections/JoinSection";
import { LeadersSection } from "@/components/sections/LeadersSection";
import { NewsPreviewSection } from "@/components/sections/NewsPreviewSection";
import { VideoSection } from "@/components/sections/VideoSection";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <AboutSection />
      <LeadersSection />
      <DemandsSection />
      <IssueSection />
      <FarmersSection />
      <NewsPreviewSection />
      <VideoSection />
      <GalleryPreviewSection />
      <JoinSection />
      <ContactSection />
    </>
  );
}
