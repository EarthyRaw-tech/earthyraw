import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowRight } from "react-icons/fi";
import { SectionContent } from "@/components/site/section-content";
import { SiteShell } from "@/components/site/site-shell";
import { Button } from "@/components/ui/button";
import {
  automationAudienceBySlug,
  automationAudiencePages,
} from "@/lib/automation-audience-pages";
import {
  buildNoIndexMetadata,
  buildPublicMetadata,
  getCanonicalOrigin,
} from "@/lib/seo";
import { getSiteSettings } from "@/lib/site-settings/store";

export const revalidate = 300;

type AudienceRouteProps = {
  params: Promise<{ audience: string }>;
};

export function generateStaticParams() {
  return automationAudiencePages.map((item) => ({ audience: item.slug }));
}

export async function generateMetadata({
  params,
}: AudienceRouteProps): Promise<Metadata> {
  const { audience } = await params;
  const content = automationAudienceBySlug[audience];
  if (!content) {
    return buildNoIndexMetadata(
      "Pagina no encontrada",
      "La pagina de automatizacion solicitada no existe.",
    );
  }

  return buildPublicMetadata({
    title: content.spanish.title,
    description: content.spanish.description,
    path: `/automatizacion-de-procesos-puerto-rico/${content.slug}`,
  });
}

export default async function AutomatizacionAudiencePage({
  params,
}: AudienceRouteProps) {
  const { audience } = await params;
  const content = automationAudienceBySlug[audience];
  if (!content) {
    notFound();
  }

  const siteSettings = await getSiteSettings();
  const siteName = siteSettings.general.siteName.trim() || "Earthy Raw Technologies";
  const canonicalOrigin =
    getCanonicalOrigin(siteSettings.seo.canonicalUrl) ||
    getCanonicalOrigin(process.env.NEXT_PUBLIC_SITE_URL ?? "");
  const pageUrl = canonicalOrigin
    ? `${canonicalOrigin}/automatizacion-de-procesos-puerto-rico/${content.slug}`
    : undefined;

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: content.spanish.title,
    serviceType: "Automatizacion de procesos",
    description: content.spanish.description,
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Puerto Rico",
    },
    provider: {
      "@type": "Organization",
      name: siteName,
    },
    availableLanguage: ["es", "en"],
    ...(pageUrl ? { url: pageUrl } : {}),
  };

  return (
    <SiteShell active="services" siteSettings={siteSettings}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <SectionContent
        eyebrow="Puerto Rico"
        headline={content.spanish.headline}
        intro={content.spanish.intro}
        sections={content.spanish.sections}
      />

      <section className="mt-8 rounded-2xl border border-cyan-100 bg-cyan-50/74 p-6 backdrop-blur-sm dark:border-cyan-900/50 dark:bg-cyan-900/24">
        <h2 className="text-xl font-semibold text-cyan-900 dark:text-cyan-100">
          Necesitas mapear este flujo para tu equipo?
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-cyan-900/90 dark:text-cyan-100/80">
          Evaluamos tu proceso actual y te entregamos un plan claro de
          implementacion con prioridades y siguientes pasos.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button asChild className="gap-2">
            <Link href="/contact">
              Solicitar evaluacion
              <FiArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="gap-2">
            <Link href={`/process-automation-puerto-rico/${content.slug}`}>
              View English version
              <FiArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>
    </SiteShell>
  );
}
