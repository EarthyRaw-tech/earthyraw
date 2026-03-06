"use client";

import { SectionContent } from "@/components/site/section-content";
import { SiteShell } from "@/components/site/site-shell";
import { useSitePreferences } from "@/components/providers/site-preferences-provider";
import { getLocalizedContent } from "@/lib/site-content-localized";
import { uiCopy } from "@/lib/i18n";
import type { SiteSettings } from "@/lib/site-settings/schema";

type StandardPageKey = "process" | "pricing" | "about";

export function StandardPageContent({
  pageKey,
  active,
  siteSettings,
}: {
  pageKey: StandardPageKey;
  active: "process" | "pricing" | "about";
  siteSettings: SiteSettings;
}) {
  const { language } = useSitePreferences();
  const content = getLocalizedContent(language);
  const copy = uiCopy[language];
  const page = content[pageKey];

  return (
    <SiteShell active={active} siteSettings={siteSettings}>
      <SectionContent
        eyebrow={
          pageKey === "process"
            ? copy.nav.process
            : pageKey === "pricing"
              ? copy.nav.pricing
              : copy.nav.about
        }
        headline={page.headline}
        intro={page.intro}
        sections={page.sections}
      />
    </SiteShell>
  );
}

