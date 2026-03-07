import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { writeJsonSnapshotToVercelBlob } from "@/lib/backup/json-snapshots";
import {
  defaultSiteSettings,
  siteSettingsPatchSchema,
  siteSettingsSchema,
  type SiteSettings,
  type SiteSettingsPatch,
} from "@/lib/site-settings/schema";
import { getSupabaseAdminClient, isSupabaseConfigured } from "@/lib/supabase/server";

const SITE_SETTINGS_FILE = join(process.cwd(), "data", "site-settings.json");
const SITE_SETTINGS_ROW_ID = "default";
let hasWarnedReadOnlyStorage = false;
let hasWarnedSupabaseRead = false;
let hasWarnedSupabaseWrite = false;
let hasWarnedSettingsHistory = false;

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

function normalizeSiteSettings(input: unknown): SiteSettings {
  const patch = siteSettingsPatchSchema.parse(input);
  const merged = mergeSiteSettings(defaultSiteSettings, patch);
  return siteSettingsSchema.parse(merged);
}

async function tryReadSettingsSeedFromFile() {
  try {
    const raw = await readFile(SITE_SETTINGS_FILE, "utf8");
    const parsedJson = JSON.parse(raw) as unknown;
    return normalizeSiteSettings(parsedJson);
  } catch {
    return null;
  }
}

async function getSiteSettingsFromFile() {
  try {
    const raw = await readFile(SITE_SETTINGS_FILE, "utf8");
    const parsedJson = JSON.parse(raw) as unknown;
    return normalizeSiteSettings(parsedJson);
  } catch {
    if (!hasWarnedReadOnlyStorage) {
      try {
        await writeSettingsFile(defaultSiteSettings);
      } catch (error) {
        hasWarnedReadOnlyStorage = true;
        console.warn("Could not initialize site-settings.json. Using defaults.", error);
      }
    }
    return defaultSiteSettings;
  }
}

async function getSiteSettingsFromSupabase() {
  const supabase = getSupabaseAdminClient();
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from("site_settings")
    .select("data")
    .eq("id", SITE_SETTINGS_ROW_ID)
    .maybeSingle();

  if (error) {
    if (!hasWarnedSupabaseRead) {
      hasWarnedSupabaseRead = true;
      console.warn("Could not read site settings from Supabase. Falling back to file.", error);
    }
    return null;
  }

  if (!data?.data) {
    const seedSettings = (await tryReadSettingsSeedFromFile()) ?? siteSettingsSchema.parse(defaultSiteSettings);
    const { error: upsertError } = await supabase.from("site_settings").upsert(
      {
        id: SITE_SETTINGS_ROW_ID,
        data: seedSettings,
      },
      { onConflict: "id" },
    );
    if (upsertError && !hasWarnedSupabaseRead) {
      hasWarnedSupabaseRead = true;
      console.warn("Could not initialize site settings row in Supabase.", upsertError);
    }
    return seedSettings;
  }

  try {
    return normalizeSiteSettings(data.data);
  } catch (error) {
    if (!hasWarnedSupabaseRead) {
      hasWarnedSupabaseRead = true;
      console.warn("Invalid site settings payload in Supabase. Using defaults.", error);
    }
    return defaultSiteSettings;
  }
}

async function persistSettingsToSupabase(settings: SiteSettings) {
  const supabase = getSupabaseAdminClient();
  if (!supabase) {
    return false;
  }

  const { error } = await supabase.from("site_settings").upsert(
    {
      id: SITE_SETTINGS_ROW_ID,
      data: settings,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "id" },
  );

  if (error) {
    if (!hasWarnedSupabaseWrite) {
      hasWarnedSupabaseWrite = true;
      console.warn("Could not update site settings in Supabase.", error);
    }
    throw new Error("Could not persist settings in Supabase.");
  }

  const { error: historyError } = await supabase.from("site_settings_history").insert({
    settings_id: SITE_SETTINGS_ROW_ID,
    data: settings,
  });

  if (historyError && !hasWarnedSettingsHistory) {
    hasWarnedSettingsHistory = true;
    console.warn(
      "Could not insert site settings history row. Ensure site_settings_history exists.",
      historyError,
    );
  }

  return true;
}

export async function getSiteSettings(): Promise<SiteSettings> {
  if (isSupabaseConfigured()) {
    const fromSupabase = await getSiteSettingsFromSupabase();
    if (fromSupabase) {
      return fromSupabase;
    }
  }

  return getSiteSettingsFromFile();
}

export async function updateSiteSettings(
  input: SiteSettingsPatch,
): Promise<SiteSettings> {
  const patch = siteSettingsPatchSchema.parse(input);
  const current = await getSiteSettings();
  const merged = mergeSiteSettings(current, patch);
  const normalized = siteSettingsSchema.parse(merged);

  const wroteToSupabase = await persistSettingsToSupabase(normalized);
  if (!wroteToSupabase) {
    await writeSettingsFile(normalized);
  } else {
    // Keep local mirror in dev where filesystem is writable.
    try {
      await writeSettingsFile(normalized);
    } catch {
      // Ignore mirror write failures in read-only deployments.
    }
  }

  try {
    await writeJsonSnapshotToVercelBlob({
      category: "site-settings",
      data: normalized,
      identifier: SITE_SETTINGS_ROW_ID,
    });
  } catch (error) {
    console.warn("Could not write site settings snapshot backup.", error);
  }

  return normalized;
}
