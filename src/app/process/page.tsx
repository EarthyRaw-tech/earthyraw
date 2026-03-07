import type { Metadata } from "next";
import { StandardPageContent } from "@/components/pages/standard-page-content";
import { buildPublicMetadata } from "@/lib/seo";
import { processPage } from "@/lib/site-content";
import { getSiteSettings } from "@/lib/site-settings/store";

export const revalidate = 300;

export const metadata: Metadata = {
  ...buildPublicMetadata({
    title: processPage.seoTitle,
    description: processPage.metaDescription,
    path: "/process",
  }),
};

export default async function ProcessPage() {
  const siteSettings = await getSiteSettings();
  return <StandardPageContent pageKey="process" active="process" siteSettings={siteSettings} />;
}
