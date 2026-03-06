import type { Metadata } from "next";
import { ContactPageContent } from "@/components/pages/contact-page-content";
import { contactPage } from "@/lib/site-content";
import { getSiteSettings } from "@/lib/site-settings/store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: contactPage.seoTitle,
  description: contactPage.metaDescription,
};

export default async function ContactPage() {
  const siteSettings = await getSiteSettings();
  return <ContactPageContent siteSettings={siteSettings} />;
}
