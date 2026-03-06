import type { Metadata } from "next";
import { StandardPageContent } from "@/components/pages/standard-page-content";
import { pricingPage } from "@/lib/site-content";
import { getSiteSettings } from "@/lib/site-settings/store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: pricingPage.seoTitle,
  description: pricingPage.metaDescription,
};

export default async function PricingPage() {
  const siteSettings = await getSiteSettings();
  return <StandardPageContent pageKey="pricing" active="pricing" siteSettings={siteSettings} />;
}
