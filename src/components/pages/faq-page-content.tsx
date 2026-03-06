"use client";

import { FiChevronDown, FiHelpCircle } from "react-icons/fi";
import { useSitePreferences } from "@/components/providers/site-preferences-provider";
import { Reveal } from "@/components/site/reveal";
import { SiteShell } from "@/components/site/site-shell";
import { uiCopy } from "@/lib/i18n";
import { getLocalizedContent } from "@/lib/site-content-localized";
import type { SiteSettings } from "@/lib/site-settings/schema";

export function FaqPageContent({ siteSettings }: { siteSettings: SiteSettings }) {
  const { language } = useSitePreferences();
  const copy = uiCopy[language];
  const { faq } = getLocalizedContent(language);

  return (
    <SiteShell active="faq" siteSettings={siteSettings}>
      <section className="space-y-6">
        <Reveal>
          <header className="rounded-3xl border border-cyan-100 bg-white/72 p-8 shadow-sm backdrop-blur-sm dark:border-cyan-900/50 dark:bg-slate-900/72">
            <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-700 dark:text-cyan-300">
              <FiHelpCircle className="size-4" />
              {copy.sections.faq}
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 md:text-4xl">
              {faq.headline}
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-700 dark:text-slate-300 md:text-lg">
              {faq.intro}
            </p>
          </header>
        </Reveal>

        {faq.sections.map((section, index) => (
          <Reveal key={section.title} delayMs={index * 70}>
            <details className="group rounded-2xl border border-slate-200 bg-white/72 p-5 shadow-sm backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/72" open>
              <summary className="list-none cursor-pointer text-lg font-semibold text-slate-900 dark:text-slate-100">
                <span className="inline-flex items-center gap-2">
                  <FiChevronDown className="size-4 text-cyan-700 transition group-open:rotate-180 dark:text-cyan-300" />
                  {section.title}
                </span>
              </summary>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph} className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                  {paragraph}
                </p>
              ))}
            </details>
          </Reveal>
        ))}
      </section>
    </SiteShell>
  );
}

