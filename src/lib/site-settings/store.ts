import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import {
  defaultSiteSettings,
  siteSettingsPatchSchema,
  siteSettingsSchema,
  type SiteSettings,
  type SiteSettingsPatch,
} from "@/lib/site-settings/schema";

const SITE_SETTINGS_FILE = join(process.cwd(), "data", "site-settings.json");
// Temporary file-based persistence layer. Replace with a DB adapter when ready.
let hasWarnedReadOnlyStorage = false;

function mergeSiteSettings(base: SiteSettings, patch: SiteSettingsPatch): SiteSettings {
  return {
    general: { ...base.general, ...patch.general },
    branding: { ...base.branding, ...patch.branding },
    homepage: { ...base.homepage, ...patch.homepage },
    seo: {
      ...base.seo,
      ...patch.seo,
      keywords: patch.seo?.keywords ?? base.seo.keywords,
    },
    social: { ...base.social, ...patch.social },
    theme: { ...base.theme, ...patch.theme },
    features: { ...base.features, ...patch.features },
    footer: { ...base.footer, ...patch.footer },
    forms: { ...base.forms, ...patch.forms },
  };
}

async function ensureSettingsDirectory() {
  await mkdir(dirname(SITE_SETTINGS_FILE), { recursive: true });
}

async function writeSettingsFile(settings: SiteSettings) {
  await ensureSettingsDirectory();
  await writeFile(SITE_SETTINGS_FILE, `${JSON.stringify(settings, null, 2)}\n`, "utf8");
}

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const raw = await readFile(SITE_SETTINGS_FILE, "utf8");
    const parsedJson = JSON.parse(raw) as unknown;
    const patch = siteSettingsPatchSchema.parse(parsedJson);
    const merged = mergeSiteSettings(defaultSiteSettings, patch);
    const normalized = siteSettingsSchema.parse(merged);
    return normalized;
  } catch {
    if (!hasWarnedReadOnlyStorage) {
      try {
        await writeSettingsFile(defaultSiteSettings);
      } catch (error) {
        // On read-only filesystems (common in some deployments), fallback to defaults.
        hasWarnedReadOnlyStorage = true;
        console.warn("Could not initialize site-settings.json. Using defaults.", error);
      }
    }
    return defaultSiteSettings;
  }
}

export async function updateSiteSettings(
  input: SiteSettingsPatch,
): Promise<SiteSettings> {
  const patch = siteSettingsPatchSchema.parse(input);
  const current = await getSiteSettings();
  const merged = mergeSiteSettings(current, patch);
  const normalized = siteSettingsSchema.parse(merged);
  await writeSettingsFile(normalized);
  return normalized;
}
