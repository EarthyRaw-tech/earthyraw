import type { Metadata } from "next";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { SectionContent } from "@/components/site/section-content";
import { SiteShell } from "@/components/site/site-shell";
import { Button } from "@/components/ui/button";
import { automationAudiencePages } from "@/lib/automation-audience-pages";
import { buildPublicMetadata, getCanonicalOrigin } from "@/lib/seo";
import type { ContentSection } from "@/lib/site-content";
import { getSiteSettings } from "@/lib/site-settings/store";

export const revalidate = 300;

export const metadata: Metadata = buildPublicMetadata({
  title: "Automatizacion de procesos en Puerto Rico para oficinas y pymes",
  description:
    "Automatizacion de procesos en Puerto Rico: digitaliza tareas manuales, integra sistemas y mejora productividad con soluciones practicas para oficinas, clinicas y negocios.",
  path: "/automatizacion-de-procesos-puerto-rico",
});

const sections: ContentSection[] = [
  {
    title: "Que automatizamos",
    bullets: [
      "Flujos manuales repetitivos en operaciones y back-office",
      "Procesos de solicitudes, aprobaciones y seguimiento",
      "Integracion entre formularios, hojas de calculo y sistemas internos",
      "Alertas y reportes automaticos para visibilidad diaria",
    ],
  },
  {
    title: "Resultados esperados",
    bullets: [
      "Menos errores por digitacion manual",
      "Mayor velocidad de respuesta operativa",
      "Mejor control y trazabilidad por proceso",
      "Escalabilidad sin aumentar complejidad",
    ],
  },
  {
    title: "Automatizacion de procesos en Puerto Rico",
    paragraphs: [
      "Disenamos soluciones de automatizacion de procesos en Puerto Rico alineadas a la realidad de oficinas, pymes y equipos administrativos que necesitan ejecutar mas con menos friccion.",
    ],
  },
];

export default async function AutomatizacionPuertoRicoPage() {
  const siteSettings = await getSiteSettings();
  const siteName = siteSettings.general.siteName.trim() || "Earthy Raw Technologies";
  const canonicalOrigin =
    getCanonicalOrigin(siteSettings.seo.canonicalUrl) ||
    getCanonicalOrigin(process.env.NEXT_PUBLIC_SITE_URL ?? "");
  const pageUrl = canonicalOrigin
    ? `${canonicalOrigin}/automatizacion-de-procesos-puerto-rico`
    : undefined;

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Automatizacion de procesos en Puerto Rico",
    serviceType: "Automatizacion de procesos",
    description:
      "Diseno e implementacion de automatizacion de procesos para oficinas y pymes en Puerto Rico.",
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
        headline="Automatizacion de procesos para operar mejor y crecer con control."
        intro="Implementamos automatizaciones practicas para reducir trabajo manual, conectar herramientas y mejorar el rendimiento operativo de tu negocio."
        sections={sections}
      />

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/70">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
          Paginas de automatizacion por audiencia
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Explora estrategias por tipo de negocio para alinear la automatizacion con tu realidad operativa.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {automationAudiencePages.map((item) => (
            <Link
              key={item.slug}
              href={`/automatizacion-de-procesos-puerto-rico/${item.slug}`}
              className="inline-flex items-center justify-between rounded-xl border border-cyan-100 bg-cyan-50/74 px-4 py-3 text-sm font-medium text-cyan-900 transition hover:border-cyan-300 dark:border-cyan-900/50 dark:bg-cyan-900/24 dark:text-cyan-100"
            >
              <span>{item.spanish.label}</span>
              <FiArrowRight className="size-4" />
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-cyan-100 bg-cyan-50/74 p-6 backdrop-blur-sm dark:border-cyan-900/50 dark:bg-cyan-900/24">
        <h2 className="text-xl font-semibold text-cyan-900 dark:text-cyan-100">
          Habla con nuestro equipo
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-cyan-900/90 dark:text-cyan-100/80">
          Si buscas automatizacion de procesos en Puerto Rico, evaluamos tu flujo actual y te damos un plan de implementacion claro.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button asChild className="gap-2">
            <Link href="/contact">
              Solicitar evaluacion
              <FiArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="gap-2">
            <Link href="/process-automation-puerto-rico">
              View English version
              <FiArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>
    </SiteShell>
  );
}
