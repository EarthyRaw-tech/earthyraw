import { readFile } from "node:fs/promises";
import { join } from "node:path";

const CONTACT_SUBMISSIONS_FILE = join(process.cwd(), "data", "contact-submissions.ndjson");

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

function asText(value: unknown) {
  return typeof value === "string" ? value : "";
}

function asStringArray(value: unknown) {
  if (!Array.isArray(value)) return [] as string[];
  return value.filter((item): item is string => typeof item === "string");
}

function parseSubmissionLine(line: string): ContactSubmission | null {
  try {
    const raw = JSON.parse(line) as Record<string, unknown>;
    return {
      nameRole: asText(raw.nameRole),
      company: asText(raw.company),
      phone: asText(raw.phone),
      email: asText(raw.email),
      usersPcs: asText(raw.usersPcs),
      hasServer: asText(raw.hasServer),
      issues: asStringArray(raw.issues),
      message: asText(raw.message),
      language: asText(raw.language),
      destinationEmail: asText(raw.destinationEmail),
      submittedAt: asText(raw.submittedAt),
      ip: asText(raw.ip),
      userAgent: asText(raw.userAgent),
    };
  } catch {
    return null;
  }
}

export async function getContactSubmissions(limit = 100): Promise<ContactSubmission[]> {
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
    return [];
  }
}
