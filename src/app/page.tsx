import type { Metadata } from "next";
import { HomePageContent } from "@/components/pages/home-page-content";
import { buildPublicMetadata } from "@/lib/seo";
import { homePage } from "@/lib/site-content";
import { getSiteSettings } from "@/lib/site-settings/store";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings();
  const title = siteSettings.seo.defaultTitle.trim() || homePage.seoTitle;
  const description = siteSettings.seo.defaultDescription.trim() || homePage.metaDescription;
  const ogImageUrl = siteSettings.branding.ogImageUrl.trim();

  return {
    ...buildPublicMetadata({
      title,
      description,
      path: "/",
      ...(ogImageUrl ? { imageUrl: ogImageUrl } : {}),
    }),
  };
}

export default async function HomePage() {
  const siteSettings = await getSiteSettings();
  return <HomePageContent siteSettings={siteSettings} />;
}
