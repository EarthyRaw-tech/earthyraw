import { appendFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import { NextRequest, NextResponse } from "next/server";
import { buildContactConfirmationEmail } from "@/lib/contact-email-template";
import { sendEmail } from "@/lib/email";
import { getSiteSettings } from "@/lib/site-settings/store";

export const runtime = "nodejs";

type ContactSubmission = {
  nameRole: string;
  company: string;
  phone: string;
  email: string;
  usersPcs: string;
  hasServer: string;
  issues: string[];
  message: string;
  language: string;
  website: string;
};

function asText(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return value.replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function asArray(value: unknown, maxItems: number, maxLength: number) {
  if (!Array.isArray(value)) return [] as string[];
  return value
    .map((entry) => asText(entry, maxLength))
    .filter(Boolean)
    .slice(0, maxItems);
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getInternalNotification({
  siteName,
  destinationEmail,
  record,
}: {
  siteName: string;
  destinationEmail: string;
  record: Record<string, unknown>;
}) {
  return {
    to: destinationEmail,
    subject: `New Contact Submission - ${siteName}`,
    text: [
      "A new contact submission was received.",
      "",
      JSON.stringify(record, null, 2),
    ].join("\n"),
  };
}

export async function POST(request: NextRequest) {
  let payload: Record<string, unknown>;

  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON payload." },
      { status: 400 },
    );
  }

  const submission: ContactSubmission = {
    nameRole: asText(payload.nameRole, 160),
    company: asText(payload.company, 160),
    phone: asText(payload.phone, 80),
    email: asText(payload.email, 160).toLowerCase(),
    usersPcs: asText(payload.usersPcs, 80),
    hasServer: asText(payload.hasServer, 32),
    issues: asArray(payload.issues, 25, 200),
    message: asText(payload.message, 4000),
    language: asText(payload.language, 8),
    website: asText(payload.website, 120),
  };

  // Honeypot field. If bots fill it, accept silently.
  if (submission.website) {
    return NextResponse.json({ ok: true });
  }

  if (!submission.nameRole || !submission.email || !submission.message) {
    return NextResponse.json(
      { ok: false, error: "Missing required fields." },
      { status: 400 },
    );
  }

  if (!isValidEmail(submission.email)) {
    return NextResponse.json(
      { ok: false, error: "Invalid email address." },
      { status: 400 },
    );
  }

  const siteSettings = await getSiteSettings();
  const siteName = siteSettings.general.siteName || "Earthy Raw Technologies";

  const record = {
    ...submission,
    destinationEmail: siteSettings.forms.destinationEmail,
    submittedAt: new Date().toISOString(),
    ip:
      request.headers
        .get("x-forwarded-for")
        ?.split(",")[0]
        ?.trim() ?? "unknown",
    userAgent: request.headers.get("user-agent") ?? "unknown",
  };

  try {
    const dataDir = join(process.cwd(), "data");
    await mkdir(dataDir, { recursive: true });
    await appendFile(
      join(dataDir, "contact-submissions.ndjson"),
      `${JSON.stringify(record)}\n`,
      "utf8",
    );
  } catch (error) {
    console.error("Could not persist contact submission", error);
  }

  if (siteSettings.forms.webhookUrl) {
    try {
      await fetch(siteSettings.forms.webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event: "contact_submission",
          data: record,
        }),
      });
    } catch (error) {
      console.error("Could not deliver contact submission webhook", error);
    }
  }

  const confirmation = buildContactConfirmationEmail({
    language: submission.language,
    siteName,
    details: {
      nameRole: submission.nameRole,
      company: submission.company,
      phone: submission.phone,
      email: submission.email,
      usersPcs: submission.usersPcs,
      hasServer: submission.hasServer,
      issues: submission.issues,
      message: submission.message,
      submittedAt: record.submittedAt,
    },
  });

  const confirmationResult = await sendEmail({
    to: submission.email,
    subject: confirmation.subject,
    text: confirmation.text,
    html: confirmation.html,
  });

  if (!confirmationResult.ok) {
    console.warn("Could not send confirmation email", confirmationResult.reason);
  }

  if (siteSettings.forms.destinationEmail) {
    const notification = getInternalNotification({
      siteName,
      destinationEmail: siteSettings.forms.destinationEmail,
      record,
    });

    const notificationResult = await sendEmail({
      to: notification.to,
      subject: notification.subject,
      text: notification.text,
      replyTo: submission.email,
    });

    if (!notificationResult.ok) {
      console.warn("Could not send destination notification email", notificationResult.reason);
    }
  }

  console.info("Contact form submission received", record);

  return NextResponse.json({ ok: true });
}
