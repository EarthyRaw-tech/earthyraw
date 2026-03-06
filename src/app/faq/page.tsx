import type { Metadata } from "next";
import { FaqPageContent } from "@/components/pages/faq-page-content";
import { faqPage } from "@/lib/site-content";
import { getSiteSettings } from "@/lib/site-settings/store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: faqPage.seoTitle,
  description: faqPage.metaDescription,
};

export default async function FaqPage() {
  const siteSettings = await getSiteSettings();
  return <FaqPageContent siteSettings={siteSettings} />;
}
