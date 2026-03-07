import type { Metadata } from "next";
import { StandardPageContent } from "@/components/pages/standard-page-content";
import { buildPublicMetadata } from "@/lib/seo";
import { aboutPage } from "@/lib/site-content";
import { getSiteSettings } from "@/lib/site-settings/store";

export const revalidate = 300;

export const metadata: Metadata = {
  ...buildPublicMetadata({
    title: aboutPage.seoTitle,
    description: aboutPage.metaDescription,
    path: "/about",
  }),
};

export default async function AboutPage() {
  const siteSettings = await getSiteSettings();
  return <StandardPageContent pageKey="about" active="about" siteSettings={siteSettings} />;
}
