import type { Metadata } from "next";
import { ContactPageContent } from "@/components/pages/contact-page-content";
import { buildPublicMetadata } from "@/lib/seo";
import { contactPage } from "@/lib/site-content";
import { getSiteSettings } from "@/lib/site-settings/store";

export const revalidate = 300;

export const metadata: Metadata = {
  ...buildPublicMetadata({
    title: contactPage.seoTitle,
    description: contactPage.metaDescription,
    path: "/contact",
  }),
};

export default async function ContactPage() {
  const siteSettings = await getSiteSettings();
  return <ContactPageContent siteSettings={siteSettings} />;
}
