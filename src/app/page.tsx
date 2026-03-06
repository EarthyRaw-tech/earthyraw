import type { Metadata } from "next";
import { HomePageContent } from "@/components/pages/home-page-content";
import { homePage } from "@/lib/site-content";
import { getSiteSettings } from "@/lib/site-settings/store";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings();
  return {
    title: siteSettings.seo.defaultTitle.trim() || homePage.seoTitle,
    description: siteSettings.seo.defaultDescription.trim() || homePage.metaDescription,
  };
}

export default async function HomePage() {
  const siteSettings = await getSiteSettings();
  return <HomePageContent siteSettings={siteSettings} />;
}
