import { NextRequest, NextResponse } from "next/server";
import { buildContactConfirmationEmail } from "@/lib/contact-email-template";
import { saveContactSubmission } from "@/lib/contact-submissions";
import { sendEmail } from "@/lib/email";
import { getSiteSettings } from "@/lib/site-settings/store";
import { getSupabaseAdminClient, isSupabaseConfigured } from "@/lib/supabase/server";

export const runtime = "nodejs";

type RateLimitEntry = { count: number; resetAt: number };

const CONTACT_RATE_LIMIT_WINDOW_MS = 60_000;
const CONTACT_RATE_LIMIT_MAX_REQUESTS = 6;
const WEBHOOK_TIMEOUT_MS = 8_000;
const WEBHOOK_MAX_ATTEMPTS = 2;

const contactRateLimitStore = new Map<string, RateLimitEntry>();
let hasWarnedSupabaseRateLimit = false;

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

function sleep(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

function getRequestIp(request: NextRequest) {
  return (
    request.headers
      .get("x-forwarded-for")
      ?.split(",")[0]
      ?.trim() ?? "unknown"
  );
}

function checkContactRateLimitInMemory(ip: string) {
  const now = Date.now();

  if (contactRateLimitStore.size > 5000) {
    for (const [key, entry] of contactRateLimitStore) {
      if (entry.resetAt <= now) {
        contactRateLimitStore.delete(key);
      }
    }
  }

  const existing = contactRateLimitStore.get(ip);
  if (!existing || existing.resetAt <= now) {
    contactRateLimitStore.set(ip, {
      count: 1,
      resetAt: now + CONTACT_RATE_LIMIT_WINDOW_MS,
    });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  existing.count += 1;
  contactRateLimitStore.set(ip, existing);

  if (existing.count > CONTACT_RATE_LIMIT_MAX_REQUESTS) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }

  return { allowed: true, retryAfterSeconds: 0 };
}

async function checkContactRateLimit(ip: string) {
  const windowSeconds = Math.floor(CONTACT_RATE_LIMIT_WINDOW_MS / 1000);

  if (isSupabaseConfigured()) {
    const supabase = getSupabaseAdminClient();
    if (supabase) {
      const { data, error } = await supabase.rpc("increment_contact_rate_limit", {
        p_key: `contact:${ip}`,
        p_window_seconds: windowSeconds,
        p_limit: CONTACT_RATE_LIMIT_MAX_REQUESTS,
      });

      if (!error) {
        const row = Array.isArray(data) ? data[0] : data;
        if (row && typeof row.allowed === "boolean") {
          return {
            allowed: row.allowed,
            retryAfterSeconds: Math.max(0, row.retry_after_seconds ?? 0),
          };
        }
      } else if (!hasWarnedSupabaseRateLimit) {
        hasWarnedSupabaseRateLimit = true;
        console.warn("Supabase rate limit RPC failed. Falling back to in-memory limiter.", error);
      }
    }
  }

  return checkContactRateLimitInMemory(ip);
}

async function deliverWebhookWithRetry(url: string, record: Record<string, unknown>) {
  let lastError: unknown;

  for (let attempt = 1; attempt <= WEBHOOK_MAX_ATTEMPTS; attempt += 1) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), WEBHOOK_TIMEOUT_MS);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event: "contact_submission",
          data: record,
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`Webhook responded with status ${response.status}`);
      }

      return;
    } catch (error) {
      lastError = error;
      if (attempt < WEBHOOK_MAX_ATTEMPTS) {
        await sleep(250 * attempt);
      }
    } finally {
      clearTimeout(timeoutId);
    }
  }

  throw lastError ?? new Error("Webhook delivery failed.");
}

export async function POST(request: NextRequest) {
  const requestIp = getRequestIp(request);
  const rateLimit = await checkContactRateLimit(requestIp);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please wait and try again." },
      {
        status: 429,
        headers: {
          "Retry-After": String(rateLimit.retryAfterSeconds),
        },
      },
    );
  }

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
    ip: requestIp,
    userAgent: request.headers.get("user-agent") ?? "unknown",
  };

  try {
    await saveContactSubmission(record);
  } catch (error) {
    console.error("Could not persist contact submission", error);
  }

  if (siteSettings.forms.webhookUrl) {
    try {
      await deliverWebhookWithRetry(siteSettings.forms.webhookUrl, record);
    } catch (error) {
      console.error("Could not deliver contact submission webhook", {
        reason: error instanceof Error ? error.message : "unknown_error",
      });
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

  console.info("Contact form submission received", {
    submittedAt: record.submittedAt,
    language: submission.language || "en",
    hasServer: submission.hasServer || "unknown",
    issueCount: submission.issues.length,
    destinationEmailConfigured: Boolean(siteSettings.forms.destinationEmail),
  });

  return NextResponse.json({ ok: true });
}
