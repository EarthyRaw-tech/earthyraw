"use client";

import Link from "next/link";
import {
  FiActivity,
  FiArrowRight,
  FiCheckCircle,
  FiClock,
  FiLayers,
  FiRefreshCw,
} from "react-icons/fi";
import { useSitePreferences } from "@/components/providers/site-preferences-provider";
import { Reveal } from "@/components/site/reveal";
import { SiteShell } from "@/components/site/site-shell";
import { Button } from "@/components/ui/button";
import { getServiceIcon } from "@/lib/icon-map";
import { uiCopy } from "@/lib/i18n";
import { getLocalizedContent } from "@/lib/site-content-localized";
import type { SiteSettings } from "@/lib/site-settings/schema";

export function ServicesHubContent({ siteSettings }: { siteSettings: SiteSettings }) {
  const { language } = useSitePreferences();
  const copy = uiCopy[language];
  const { services } = getLocalizedContent(language);

  return (
    <SiteShell active="services" siteSettings={siteSettings}>
      <Reveal>
        <section className="rounded-3xl border border-cyan-100 bg-white/70 p-8 shadow-sm backdrop-blur-sm dark:border-cyan-900/50 dark:bg-slate-900/70">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-700 dark:text-cyan-300">
            <FiLayers className="size-4" />
            {copy.sections.servicesOverview}
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 md:text-4xl">
            {language === "es"
              ? "Mejoras tecnologicas de punta a punta para confiabilidad, seguridad y usabilidad."
              : "End-to-end technology improvements for reliability, security, and usability."}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-700 dark:text-slate-300 md:text-lg">
            {language === "es"
              ? "Entregamos desde ingenieria de software hasta implementacion de infraestructura, con un alcance practico para operaciones reales."
              : "We deliver from software engineering through infrastructure implementation with a practical scope that matches real office operations."}
          </p>
        </section>
      </Reveal>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        <Reveal>
          <article className="rounded-2xl border border-slate-200 bg-white/70 p-5 shadow-sm backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/70">
            <h2 className="inline-flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
              <FiActivity className="size-5 text-cyan-700 dark:text-cyan-300" />
              {copy.sections.oneTimeProjects}
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              {copy.sections.oneTimeProjectsIntro}
            </p>
          </article>
        </Reveal>
        <Reveal delayMs={80}>
          <article className="rounded-2xl border border-slate-200 bg-white/70 p-5 shadow-sm backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/70">
            <h2 className="inline-flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
              <FiClock className="size-5 text-cyan-700 dark:text-cyan-300" />
              {copy.sections.ongoingSupport}
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              {copy.sections.ongoingSupportIntro}
            </p>
          </article>
        </Reveal>
        <Reveal delayMs={160}>
          <article className="rounded-2xl border border-slate-200 bg-white/70 p-5 shadow-sm backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/70">
            <h2 className="inline-flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
              <FiRefreshCw className="size-5 text-cyan-700 dark:text-cyan-300" />
              {copy.sections.hybridDelivery}
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              {copy.sections.hybridDeliveryIntro}
            </p>
          </article>
        </Reveal>
      </section>

      <section className="mt-8">
        <Reveal>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            {copy.sections.serviceAreas}
          </h2>
        </Reveal>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {services.map((service, index) => {
            const ServiceIcon = getServiceIcon(service.slug);
            return (
              <Reveal key={service.slug} delayMs={index * 50}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group block rounded-2xl border border-slate-200 bg-white/70 p-5 shadow-sm backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-cyan-200 hover:shadow-md dark:border-slate-700 dark:bg-slate-900/70"
                >
                  <p className="inline-flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
                    <ServiceIcon className="size-5 text-cyan-700 dark:text-cyan-300" />
                    {service.menuLabel}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {service.intro}
                  </p>
                  <p className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-cyan-800 dark:text-cyan-200">
                    <FiCheckCircle className="size-4" />
                    {copy.actions.viewDetails}
                    <FiArrowRight className="size-4" />
                  </p>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      <Reveal>
        <section className="mt-10 rounded-2xl border border-cyan-100 bg-cyan-50/74 p-6 backdrop-blur-sm dark:border-cyan-900/50 dark:bg-cyan-900/24">
          <h2 className="text-xl font-semibold text-cyan-900 dark:text-cyan-100">
            {copy.actions.startAssessment}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-cyan-900/90 dark:text-cyan-100/80">
            {copy.sections.startAssessmentIntro}
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button asChild className="gap-2">
              <Link href="/contact">
                {copy.actions.scheduleAssessment}
                <FiArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="gap-2">
              <Link href="/process">
                {copy.actions.viewProcess}
                <FiArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </section>
      </Reveal>
    </SiteShell>
  );
}

