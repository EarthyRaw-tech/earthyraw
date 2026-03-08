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
  title: "Process automation Puerto Rico for offices and SMBs",
  description:
    "Process automation Puerto Rico: eliminate manual tasks, connect systems, and improve productivity with practical automation for offices, clinics, and growing businesses.",
  path: "/process-automation-puerto-rico",
});

const sections: ContentSection[] = [
  {
    title: "What we automate",
    bullets: [
      "Manual repetitive back-office workflows",
      "Request, approval, and follow-up process flows",
      "Integrations between forms, spreadsheets, and internal tools",
      "Automatic alerts and operational reporting",
    ],
  },
  {
    title: "Business outcomes",
    bullets: [
      "Fewer errors from manual data entry",
      "Faster operational response times",
      "Clearer process visibility and accountability",
      "Scalable operations without adding complexity",
    ],
  },
  {
    title: "Business process automation Puerto Rico",
    paragraphs: [
      "We design and implement business process automation in Puerto Rico for teams that need cleaner execution, fewer bottlenecks, and stronger day-to-day control.",
    ],
  },
];

export default async function ProcessAutomationPuertoRicoPage() {
  const siteSettings = await getSiteSettings();
  const siteName = siteSettings.general.siteName.trim() || "Earthy Raw Technologies";
  const canonicalOrigin =
    getCanonicalOrigin(siteSettings.seo.canonicalUrl) ||
    getCanonicalOrigin(process.env.NEXT_PUBLIC_SITE_URL ?? "");
  const pageUrl = canonicalOrigin
    ? `${canonicalOrigin}/process-automation-puerto-rico`
    : undefined;

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Business process automation Puerto Rico",
    serviceType: "Process automation",
    description:
      "Business process automation services for offices and SMBs in Puerto Rico.",
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Puerto Rico",
    },
    provider: {
      "@type": "Organization",
      name: siteName,
    },
    availableLanguage: ["en", "es"],
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
        headline="Process automation to improve operations and scale with control."
        intro="We implement practical automations that reduce manual work, connect tools, and improve operational performance."
        sections={sections}
      />

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/70">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
          Audience-specific automation pages
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Explore process automation strategies by audience to match your operational context.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {automationAudiencePages.map((item) => (
            <Link
              key={item.slug}
              href={`/process-automation-puerto-rico/${item.slug}`}
              className="inline-flex items-center justify-between rounded-xl border border-cyan-100 bg-cyan-50/74 px-4 py-3 text-sm font-medium text-cyan-900 transition hover:border-cyan-300 dark:border-cyan-900/50 dark:bg-cyan-900/24 dark:text-cyan-100"
            >
              <span>{item.english.label}</span>
              <FiArrowRight className="size-4" />
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-cyan-100 bg-cyan-50/74 p-6 backdrop-blur-sm dark:border-cyan-900/50 dark:bg-cyan-900/24">
        <h2 className="text-xl font-semibold text-cyan-900 dark:text-cyan-100">
          Talk to our team
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-cyan-900/90 dark:text-cyan-100/80">
          If you need process automation in Puerto Rico, we can review your current workflow and provide a practical implementation plan.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button asChild className="gap-2">
            <Link href="/contact">
              Request assessment
              <FiArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="gap-2">
            <Link href="/automatizacion-de-procesos-puerto-rico">
              Ver version en espanol
              <FiArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>
    </SiteShell>
  );
}
