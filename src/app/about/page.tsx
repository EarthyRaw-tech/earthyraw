import type { Metadata } from "next";
import { StandardPageContent } from "@/components/pages/standard-page-content";
import { aboutPage } from "@/lib/site-content";
import { getSiteSettings } from "@/lib/site-settings/store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: aboutPage.seoTitle,
  description: aboutPage.metaDescription,
};

export default async function AboutPage() {
  const siteSettings = await getSiteSettings();
  return <StandardPageContent pageKey="about" active="about" siteSettings={siteSettings} />;
}
