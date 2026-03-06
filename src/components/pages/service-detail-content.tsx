"use client";

import { SectionContent } from "@/components/site/section-content";
import { SiteShell } from "@/components/site/site-shell";
import { useSitePreferences } from "@/components/providers/site-preferences-provider";
import { getLocalizedContent } from "@/lib/site-content-localized";
import { uiCopy } from "@/lib/i18n";
import type { SiteSettings } from "@/lib/site-settings/schema";

export function ServiceDetailContent({
  slug,
  siteSettings,
}: {
  slug: string;
  siteSettings: SiteSettings;
}) {
  const { language } = useSitePreferences();
  const content = getLocalizedContent(language);
  const copy = uiCopy[language];
  const service = content.serviceBySlug[slug];

  if (!service) {
    return (
      <SiteShell active="services" siteSettings={siteSettings}>
        <div className="rounded-2xl border border-slate-200 bg-white/72 p-6 text-slate-700 shadow-sm backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/72 dark:text-slate-200">
          Service not found.
        </div>
      </SiteShell>
    );
  }

  return (
    <SiteShell active="services" siteSettings={siteSettings}>
      <SectionContent
        eyebrow={copy.sections.serviceDetail}
        headline={service.headline}
        intro={service.intro}
        sections={service.sections}
      />
    </SiteShell>
  );
}

