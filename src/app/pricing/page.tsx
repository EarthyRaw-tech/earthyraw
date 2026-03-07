import type { Metadata } from "next";
import { StandardPageContent } from "@/components/pages/standard-page-content";
import { buildPublicMetadata } from "@/lib/seo";
import { pricingPage } from "@/lib/site-content";
import { getSiteSettings } from "@/lib/site-settings/store";

export const revalidate = 300;

export const metadata: Metadata = {
  ...buildPublicMetadata({
    title: pricingPage.seoTitle,
    description: pricingPage.metaDescription,
    path: "/pricing",
  }),
};

export default async function PricingPage() {
  const siteSettings = await getSiteSettings();
  return <StandardPageContent pageKey="pricing" active="pricing" siteSettings={siteSettings} />;
}
