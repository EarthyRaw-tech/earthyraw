import type { Metadata } from "next";
import { FaqPageContent } from "@/components/pages/faq-page-content";
import { buildPublicMetadata, getCanonicalOrigin } from "@/lib/seo";
import { faqPage } from "@/lib/site-content";
import { getSiteSettings } from "@/lib/site-settings/store";

export const revalidate = 300;

export const metadata: Metadata = {
  ...buildPublicMetadata({
    title: faqPage.seoTitle,
    description: faqPage.metaDescription,
    path: "/faq",
  }),
};

export default async function FaqPage() {
  const siteSettings = await getSiteSettings();
  const canonicalOrigin =
    getCanonicalOrigin(siteSettings.seo.canonicalUrl) ||
    getCanonicalOrigin(process.env.NEXT_PUBLIC_SITE_URL ?? "");

  const mainEntity = faqPage.sections
    .filter((section) => section.paragraphs?.[0])
    .map((section) => ({
      "@type": "Question",
      name: section.title,
      acceptedAnswer: {
        "@type": "Answer",
        text: section.paragraphs![0],
      },
    }));

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    ...(canonicalOrigin ? { url: `${canonicalOrigin}/faq` } : {}),
    mainEntity,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <FaqPageContent siteSettings={siteSettings} />
    </>
  );
}
