import type { Metadata } from "next";
import { StandardPageContent } from "@/components/pages/standard-page-content";
import { processPage } from "@/lib/site-content";
import { getSiteSettings } from "@/lib/site-settings/store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: processPage.seoTitle,
  description: processPage.metaDescription,
};

export default async function ProcessPage() {
  const siteSettings = await getSiteSettings();
  return <StandardPageContent pageKey="process" active="process" siteSettings={siteSettings} />;
}
