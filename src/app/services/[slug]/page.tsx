import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailContent } from "@/components/pages/service-detail-content";
import { servicePageBySlug, servicePages } from "@/lib/site-content";
import { getSiteSettings } from "@/lib/site-settings/store";

export const dynamic = "force-dynamic";

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
    return {
      title: "Service Not Found",
      description: "Requested service page could not be found.",
    };
  }

  return {
    title: service.seoTitle,
    description: service.metaDescription,
  };
}

export default async function ServiceDetailPage({ params }: ServiceDetailProps) {
  const { slug } = await params;

  if (!servicePageBySlug[slug]) {
    notFound();
  }

  const siteSettings = await getSiteSettings();
  return <ServiceDetailContent slug={slug} siteSettings={siteSettings} />;
}
