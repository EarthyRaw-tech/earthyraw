import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailContent } from "@/components/pages/service-detail-content";
import { buildNoIndexMetadata, buildPublicMetadata, getCanonicalOrigin } from "@/lib/seo";
import { servicePageBySlug, servicePages } from "@/lib/site-content";
import { getSiteSettings } from "@/lib/site-settings/store";

export const revalidate = 300;

type ServiceDetailProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return servicePages.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: ServiceDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const service = servicePageBySlug[slug];

  if (!service) {
    return buildNoIndexMetadata(
      "Service Not Found",
      "Requested service page could not be found.",
    );
  }

  return buildPublicMetadata({
    title: service.seoTitle,
    description: service.metaDescription,
    path: `/services/${slug}`,
  });
}

export default async function ServiceDetailPage({ params }: ServiceDetailProps) {
  const { slug } = await params;

  const service = servicePageBySlug[slug];
  if (!service) {
    notFound();
  }

  const siteSettings = await getSiteSettings();
  const siteName = siteSettings.general.siteName.trim() || "Earthy Raw Technologies";
  const canonicalOrigin =
    getCanonicalOrigin(siteSettings.seo.canonicalUrl) ||
    getCanonicalOrigin(process.env.NEXT_PUBLIC_SITE_URL ?? "");
  const serviceUrl = canonicalOrigin ? `${canonicalOrigin}/services/${slug}` : undefined;

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.menuLabel,
    description: service.metaDescription,
    ...(serviceUrl ? { url: serviceUrl } : {}),
    provider: {
      "@type": "Organization",
      name: siteName,
    },
  };

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
      {
        "@type": "ListItem",
        position: 3,
        name: service.menuLabel,
        ...(serviceUrl ? { item: serviceUrl } : {}),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <ServiceDetailContent slug={slug} siteSettings={siteSettings} />
    </>
  );
}
