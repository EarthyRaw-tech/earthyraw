"use client";

import Link from "next/link";
import {
  FiArrowRight,
  FiCheckCircle,
  FiCompass,
  FiTarget,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";
import { useSitePreferences } from "@/components/providers/site-preferences-provider";
import { Reveal } from "@/components/site/reveal";
import { SiteShell } from "@/components/site/site-shell";
import { Button } from "@/components/ui/button";
import { getCoverageIcon, getServiceIcon } from "@/lib/icon-map";
import { uiCopy } from "@/lib/i18n";
import { getLocalizedContent } from "@/lib/site-content-localized";
import type { SiteSettings } from "@/lib/site-settings/schema";

const sectionLinks = [
  { href: "/process", key: "process" },
  { href: "/pricing", key: "pricing" },
  { href: "/contact", key: "contact" },
  { href: "/faq", key: "faq" },
] as const;

export function HomePageContent({ siteSettings }: { siteSettings: SiteSettings }) {
  const { language } = useSitePreferences();
  const copy = uiCopy[language];
  const { home, services } = getLocalizedContent(language);
  const heroTitle = siteSettings.homepage.heroTitle.trim() || home.heroHeadline;
  const heroSubtitle = siteSettings.homepage.heroSubtitle.trim() || home.heroIntro;
  const heroCtaText = siteSettings.homepage.ctaText.trim() || copy.actions.scheduleOnsite;
  const heroCtaHref = siteSettings.homepage.ctaLink.trim() || "/contact";
  const heroBackgroundUrl = siteSettings.homepage.backgroundImageUrl.trim();
  const heroBackgroundStyle = heroBackgroundUrl
    ? {
        backgroundImage: `linear-gradient(160deg, rgba(255,255,255,0.86), rgba(255,255,255,0.64)), url(${heroBackgroundUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : undefined;

  return (
    <SiteShell active="home" siteSettings={siteSettings}>
      <Reveal>
        <section className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <div
            className="rounded-3xl border border-cyan-100 bg-white/72 p-8 shadow-md backdrop-blur-sm dark:border-cyan-900/50 dark:bg-slate-900/72"
            style={heroBackgroundStyle}
          >
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-700 dark:text-cyan-300">
              <FiCompass className="size-4" />
              {copy.sections.comprehensiveDelivery}
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 md:text-5xl">
              {heroTitle}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-slate-700 dark:text-slate-300 md:text-lg">
              {heroSubtitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="gap-2">
                <Link href={heroCtaHref}>
                  {heroCtaText}
                  <FiArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="gap-2">
                <Link href="/pricing">
                  {copy.actions.requestQuote}
                  <FiArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>

          <aside className="rounded-3xl border border-slate-200 bg-slate-900/74 p-6 text-slate-100 shadow-md backdrop-blur-sm dark:border-slate-700">
            <h2 className="inline-flex items-center gap-2 text-lg font-semibold">
              <FiTrendingUp className="size-5 text-cyan-300" />
              {copy.sections.whatWeDo}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">{home.whatWeDo}</p>
            <div className="mt-6 rounded-2xl bg-slate-800/62 p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-cyan-300">
                {copy.sections.howWeWork}
              </p>
              <ol className="mt-3 grid gap-2 text-sm text-slate-200">
                {home.processSteps.map((step) => (
                  <li key={step} className="flex items-start gap-2">
                    <FiCheckCircle className="mt-0.5 size-4 shrink-0 text-cyan-300" />
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </section>
      </Reveal>

      <section className="mt-10 grid gap-5 md:grid-cols-2">
        <Reveal>
          <article className="rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/70">
            <h2 className="inline-flex items-center gap-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">
              <FiTrendingUp className="size-6 text-cyan-700 dark:text-cyan-300" />
              {copy.sections.outcomes}
            </h2>
            <ul className="mt-4 grid gap-2">
              {home.outcomes.map((outcome) => (
                <li
                  key={outcome}
                  className="flex items-start gap-2 rounded-lg bg-slate-50/82 px-3 py-2 text-sm text-slate-700 dark:bg-slate-800/72 dark:text-slate-200"
                >
                  <FiCheckCircle className="mt-0.5 size-4 shrink-0 text-cyan-700 dark:text-cyan-300" />
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </article>
        </Reveal>

        <Reveal delayMs={80}>
          <article className="rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/70">
            <h2 className="inline-flex items-center gap-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">
              <FiTarget className="size-6 text-cyan-700 dark:text-cyan-300" />
              {copy.sections.bestFit}
            </h2>
            <ul className="mt-4 grid gap-2">
              {home.bestFit.map((fit) => (
                <li
                  key={fit}
                  className="flex items-start gap-2 rounded-lg bg-slate-50/82 px-3 py-2 text-sm text-slate-700 dark:bg-slate-800/72 dark:text-slate-200"
                >
                  <FiUsers className="mt-0.5 size-4 shrink-0 text-cyan-700 dark:text-cyan-300" />
                  <span>{fit}</span>
                </li>
              ))}
            </ul>
          </article>
        </Reveal>
      </section>

      <Reveal>
        <section className="mt-10 rounded-3xl border border-cyan-100 bg-white/70 p-6 shadow-sm backdrop-blur-sm dark:border-cyan-900/50 dark:bg-slate-900/70 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="inline-flex items-center gap-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
              <FiCompass className="size-6 text-cyan-700 dark:text-cyan-300" />
              {copy.sections.fullStack}
            </h2>
            <Button asChild variant="outline" className="gap-2">
              <Link href="/services">
                {copy.actions.viewServiceHub}
                <FiArrowRight className="size-4" />
              </Link>
            </Button>
          </div>

          <ul className="mt-6 grid gap-3 md:grid-cols-2">
            {home.fullStackCoverage.map((item) => {
              const CoverageIcon = getCoverageIcon(item);
              return (
                <li
                  key={item}
                  className="flex items-start gap-2 rounded-xl bg-cyan-50/78 px-3 py-3 text-sm text-cyan-900 dark:bg-cyan-900/28 dark:text-cyan-100"
                >
                  <CoverageIcon className="mt-0.5 size-4 shrink-0" />
                  <span>{item}</span>
                </li>
              );
            })}
          </ul>
        </section>
      </Reveal>

      <section className="mt-10">
        <Reveal>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            {copy.sections.detailedServices}
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300">{copy.sections.detailedServicesIntro}</p>
        </Reveal>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const ServiceIcon = getServiceIcon(service.slug);
            return (
              <Reveal key={service.slug} delayMs={index * 45}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group block rounded-2xl border border-slate-200 bg-white/70 p-5 shadow-sm backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-cyan-200 hover:shadow-md dark:border-slate-700 dark:bg-slate-900/70"
                >
                  <p className="inline-flex items-center gap-2 text-lg font-semibold text-slate-900 group-hover:text-cyan-900 dark:text-slate-100 dark:group-hover:text-cyan-200">
                    <ServiceIcon className="size-5 text-cyan-700 dark:text-cyan-300" />
                    {service.menuLabel}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{service.intro}</p>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="mt-10">
        <Reveal>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            {copy.sections.moreSections}
          </h2>
        </Reveal>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {sectionLinks.map((link, index) => (
            <Reveal key={link.href} delayMs={index * 70}>
              <Link
                href={link.href}
                className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white/70 p-5 text-sm font-medium text-slate-700 shadow-sm backdrop-blur-sm transition hover:border-cyan-200 hover:text-cyan-900 hover:shadow-md dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:text-cyan-200"
              >
                <span>{copy.nav[link.key]}</span>
                <FiArrowRight className="size-4" />
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}

