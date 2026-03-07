import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";

function requireEnv(name) {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

function asText(value, maxLength = 5000) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

function asStringArray(value) {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item) => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeSubmission(value) {
  const raw = value ?? {};
  return {
    nameRole: asText(raw.nameRole, 160),
    company: asText(raw.company, 160),
    phone: asText(raw.phone, 80),
    email: asText(raw.email, 160).toLowerCase(),
    usersPcs: asText(raw.usersPcs, 80),
    hasServer: asText(raw.hasServer, 32),
    issues: asStringArray(raw.issues).slice(0, 25).map((item) => item.slice(0, 200)),
    message: asText(raw.message, 4000),
    language: asText(raw.language, 8) || "en",
    destinationEmail: asText(raw.destinationEmail, 160),
    submittedAt: asText(raw.submittedAt, 120) || new Date().toISOString(),
    ip: asText(raw.ip, 120),
    userAgent: asText(raw.userAgent, 500),
  };
}

function toLeadRow(submission) {
  return {
    name_role: submission.nameRole,
    company: submission.company,
    phone: submission.phone,
    email: submission.email,
    users_pcs: submission.usersPcs,
    has_server: submission.hasServer,
    issues: submission.issues,
    message: submission.message,
    language: submission.language,
    destination_email: submission.destinationEmail,
    submitted_at: submission.submittedAt,
    ip: submission.ip,
    user_agent: submission.userAgent,
    payload: submission,
  };
}

async function readJsonFile(filepath) {
  const raw = await readFile(filepath, "utf8");
  return JSON.parse(raw);
}

async function run() {
  const supabaseUrl = requireEnv("SUPABASE_URL");
  const supabaseServiceRoleKey = requireEnv("SUPABASE_SERVICE_ROLE_KEY");

  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  const settingsPath = join(process.cwd(), "data", "site-settings.json");
  if (existsSync(settingsPath)) {
    const siteSettings = await readJsonFile(settingsPath);
    const { error } = await supabase.from("site_settings").upsert(
      {
        id: "default",
        data: siteSettings,
      },
      { onConflict: "id" },
    );

    if (error) {
      throw new Error(`Could not backfill site settings: ${error.message}`);
    }

    console.log("Backfilled site settings from data/site-settings.json");
  } else {
    console.log("Skipping site settings backfill (data/site-settings.json not found).");
  }

  const leadsPath = join(process.cwd(), "data", "contact-submissions.ndjson");
  if (!existsSync(leadsPath)) {
    console.log("Skipping leads backfill (data/contact-submissions.ndjson not found).");
    return;
  }

  const rawLeads = await readFile(leadsPath, "utf8");
  const submissions = rawLeads
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      try {
        return normalizeSubmission(JSON.parse(line));
      } catch {
        return null;
      }
    })
    .filter((entry) => entry !== null);

  if (!submissions.length) {
    console.log("No valid lead rows found in local NDJSON.");
    return;
  }

  const BATCH_SIZE = 200;
  for (let index = 0; index < submissions.length; index += BATCH_SIZE) {
    const batch = submissions.slice(index, index + BATCH_SIZE).map(toLeadRow);
    const { error } = await supabase.from("lead_submissions").upsert(batch, {
      onConflict: "email,submitted_at",
      ignoreDuplicates: true,
    });

    if (error) {
      throw new Error(`Could not backfill lead submissions: ${error.message}`);
    }
  }

  console.log(`Backfilled ${submissions.length} lead submission(s).`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
