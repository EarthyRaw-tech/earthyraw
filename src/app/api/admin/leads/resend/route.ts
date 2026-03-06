import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { isAdminRequestAuthenticated } from "@/lib/admin-auth";
import { buildContactConfirmationEmail } from "@/lib/contact-email-template";
import { sendEmail } from "@/lib/email";
import { getSiteSettings } from "@/lib/site-settings/store";

const resendSchema = z.object({
  email: z.string().trim().email("A valid email is required."),
  nameRole: z.string().trim().max(160).optional().default(""),
  company: z.string().trim().max(160).optional().default(""),
  phone: z.string().trim().max(80).optional().default(""),
  usersPcs: z.string().trim().max(80).optional().default(""),
  hasServer: z.string().trim().max(32).optional().default(""),
  issues: z.array(z.string().trim().max(200)).optional().default([]),
  message: z.string().trim().max(4000).optional().default(""),
  submittedAt: z.string().trim().max(120).optional().default(""),
  language: z.string().trim().max(8).optional().default("en"),
});

function unauthorized() {
  return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
}

export async function POST(request: NextRequest) {
  if (!isAdminRequestAuthenticated(request)) {
    return unauthorized();
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON payload." },
      { status: 400 },
    );
  }

  let parsed: z.infer<typeof resendSchema>;
  try {
    parsed = resendSchema.parse(payload);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { ok: false, error: error.issues[0]?.message ?? "Invalid payload." },
        { status: 400 },
      );
    }
    return NextResponse.json({ ok: false, error: "Invalid payload." }, { status: 400 });
  }

  const settings = await getSiteSettings();
  const siteName = settings.general.siteName || "Earthy Raw Technologies";
  const message = buildContactConfirmationEmail({
    language: parsed.language,
    siteName,
    details: {
      nameRole: parsed.nameRole,
      company: parsed.company,
      phone: parsed.phone,
      email: parsed.email,
      usersPcs: parsed.usersPcs,
      hasServer: parsed.hasServer,
      issues: parsed.issues,
      message: parsed.message,
      submittedAt: parsed.submittedAt,
    },
  });
  const result = await sendEmail({
    to: parsed.email,
    subject: message.subject,
    text: message.text,
    html: message.html,
  });

  if (!result.ok) {
    return NextResponse.json(
      {
        ok: false,
        error:
          result.reason === "not_configured"
            ? "SMTP is not configured."
            : "Could not send email.",
      },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
