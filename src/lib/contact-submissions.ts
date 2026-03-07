import { appendFile, mkdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { writeJsonSnapshotToVercelBlob } from "@/lib/backup/json-snapshots";
import { getSupabaseAdminClient, isSupabaseConfigured, type SupabaseDatabase } from "@/lib/supabase/server";

const CONTACT_SUBMISSIONS_FILE = join(process.cwd(), "data", "contact-submissions.ndjson");
let hasWarnedReadStorage = false;
let hasWarnedSupabaseRead = false;
let hasWarnedSupabaseWrite = false;

export type ContactSubmission = {
  nameRole: string;
  company: string;
  phone: string;
  email: string;
  usersPcs: string;
  hasServer: string;
  issues: string[];
  message: string;
  language: string;
  destinationEmail: string;
  submittedAt: string;
  ip: string;
  userAgent: string;
};

type LeadSubmissionRow = SupabaseDatabase["public"]["Tables"]["lead_submissions"]["Row"];

function asText(value: unknown, maxLength = 5000) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

function asStringArray(value: unknown) {
  if (!Array.isArray(value)) return [] as string[];
  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeSubmission(value: unknown): ContactSubmission {
  const raw = (value ?? {}) as Record<string, unknown>;
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
    submittedAt: asText(raw.submittedAt, 120),
    ip: asText(raw.ip, 120),
    userAgent: asText(raw.userAgent, 500),
  };
}

function parseSubmissionLine(line: string): ContactSubmission | null {
  try {
    const raw = JSON.parse(line) as unknown;
    return normalizeSubmission(raw);
  } catch {
    return null;
  }
}

function mapSupabaseRowToSubmission(row: LeadSubmissionRow): ContactSubmission {
  const payload = (typeof row.payload === "object" && row.payload !== null
    ? row.payload
    : {}) as Record<string, unknown>;

  return normalizeSubmission({
    nameRole: row.name_role || payload.nameRole,
    company: row.company || payload.company,
    phone: row.phone || payload.phone,
    email: row.email || payload.email,
    usersPcs: row.users_pcs || payload.usersPcs,
    hasServer: row.has_server || payload.hasServer,
    issues: row.issues?.length ? row.issues : payload.issues,
    message: row.message || payload.message,
    language: row.language || payload.language,
    destinationEmail: row.destination_email || payload.destinationEmail,
    submittedAt: row.submitted_at || payload.submittedAt,
    ip: row.ip || payload.ip,
    userAgent: row.user_agent || payload.userAgent,
  });
}

async function getContactSubmissionsFromFile(limit: number) {
  try {
    const raw = await readFile(CONTACT_SUBMISSIONS_FILE, "utf8");
    const lines = raw
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const scopedLines = lines.slice(-Math.max(1, limit));
    const parsed = scopedLines
      .map(parseSubmissionLine)
      .filter((item): item is ContactSubmission => item !== null);

    // Show newest first in admin.
    return parsed.reverse();
  } catch {
    if (!hasWarnedReadStorage) {
      hasWarnedReadStorage = true;
      console.warn("Could not read local contact submissions file.");
    }
    return [];
  }
}

async function getContactSubmissionsFromSupabase(limit: number) {
  const supabase = getSupabaseAdminClient();
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from("lead_submissions")
    .select(
      "id,name_role,company,phone,email,users_pcs,has_server,issues,message,language,destination_email,submitted_at,ip,user_agent,payload,created_at",
    )
    .order("submitted_at", { ascending: false })
    .limit(limit);

  if (error) {
    if (!hasWarnedSupabaseRead) {
      hasWarnedSupabaseRead = true;
      console.warn("Could not read contact submissions from Supabase. Falling back to file.", error);
    }
    return null;
  }

  return (data ?? []).map(mapSupabaseRowToSubmission);
}

async function writeContactSubmissionToFile(submission: ContactSubmission) {
  const dataDir = join(process.cwd(), "data");
  await mkdir(dataDir, { recursive: true });
  await appendFile(CONTACT_SUBMISSIONS_FILE, `${JSON.stringify(submission)}\n`, "utf8");
}

async function writeContactSubmissionToSupabase(submission: ContactSubmission) {
  const supabase = getSupabaseAdminClient();
  if (!supabase) {
    return false;
  }

  const { error } = await supabase.from("lead_submissions").upsert(
    {
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
    },
    {
      onConflict: "email,submitted_at",
      ignoreDuplicates: true,
    },
  );

  if (error) {
    if (!hasWarnedSupabaseWrite) {
      hasWarnedSupabaseWrite = true;
      console.warn("Could not write contact submission to Supabase.", error);
    }
    throw new Error("Could not persist contact submission to Supabase.");
  }

  return true;
}

export async function saveContactSubmission(input: ContactSubmission) {
  const normalized = normalizeSubmission(input);
  const wroteToSupabase = await writeContactSubmissionToSupabase(normalized);

  if (!wroteToSupabase) {
    await writeContactSubmissionToFile(normalized);
  } else {
    // Keep local mirror in development for debugging and migration safety.
    try {
      await writeContactSubmissionToFile(normalized);
    } catch {
      // Ignore mirror write failures for read-only filesystems.
    }
  }

  try {
    await writeJsonSnapshotToVercelBlob({
      category: "lead-submission",
      data: normalized,
      identifier: normalized.email || normalized.submittedAt,
    });
  } catch (error) {
    console.warn("Could not write lead snapshot backup.", error);
  }

  return normalized;
}

export async function getContactSubmissions(limit = 100): Promise<ContactSubmission[]> {
  const safeLimit = Math.min(500, Math.max(1, Math.floor(limit)));

  if (isSupabaseConfigured()) {
    const fromSupabase = await getContactSubmissionsFromSupabase(safeLimit);
    if (fromSupabase) {
      return fromSupabase;
    }
  }

  return getContactSubmissionsFromFile(safeLimit);
}
