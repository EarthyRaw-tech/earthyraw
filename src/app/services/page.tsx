import type { Metadata } from "next";
import { ServicesHubContent } from "@/components/pages/services-hub-content";
import { buildPublicMetadata, getCanonicalOrigin } from "@/lib/seo";
import { getSiteSettings } from "@/lib/site-settings/store";

export const revalidate = 300;

export const metadata: Metadata = {
  ...buildPublicMetadata({
    title:
      "Services - Software, IT Support, Servers, Networks, SOPs + On-Site Modifications",
    description:
      "Full service IT delivery: custom software, servers, support, networks/VPN, backups, SOPs, email/DNS/website, electrical safety, and on-site modifications for clean installs.",
    path: "/services",
  }),
};

export default async function ServicesHubPage() {
  const siteSettings = await getSiteSettings();
  const canonicalOrigin =
    getCanonicalOrigin(siteSettings.seo.canonicalUrl) ||
    getCanonicalOrigin(process.env.NEXT_PUBLIC_SITE_URL ?? "");

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        ...(canonicalOrigin ? { item: `${canonicalOrigin}/` } : {}),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        ...(canonicalOrigin ? { item: `${canonicalOrigin}/services` } : {}),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <ServicesHubContent siteSettings={siteSettings} />
    </>
  );
}
