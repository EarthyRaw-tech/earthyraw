import nodemailer, { type Transporter } from "nodemailer";

type SendEmailInput = {
  to: string;
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
};

let cachedTransporter: Transporter | null = null;
let hasLoggedMissingConfig = false;

function getSmtpConfig() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM;
  const secure = process.env.SMTP_SECURE === "true";

  if (!host || !port || !from) {
    return null;
  }

  const auth =
    user && pass
      ? {
          user,
          pass,
        }
      : undefined;

  return { host, port, secure, auth, from };
}

export function isEmailConfigured() {
  return getSmtpConfig() !== null;
}

function getTransporter() {
  if (cachedTransporter) {
    return cachedTransporter;
  }

  const config = getSmtpConfig();
  if (!config) {
    if (!hasLoggedMissingConfig) {
      console.warn("SMTP not configured. Email sending is disabled.");
      hasLoggedMissingConfig = true;
    }
    return null;
  }

  cachedTransporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: config.auth,
  });

  return cachedTransporter;
}

export async function sendEmail(input: SendEmailInput) {
  const transporter = getTransporter();
  const config = getSmtpConfig();

  if (!transporter || !config) {
    return { ok: false as const, reason: "not_configured" as const };
  }

  try {
    await transporter.sendMail({
      from: config.from,
      to: input.to,
      subject: input.subject,
      text: input.text,
      html: input.html,
      ...(input.replyTo ? { replyTo: input.replyTo } : {}),
    });

    return { ok: true as const };
  } catch (error) {
    console.error("Email send failed", error);
    return { ok: false as const, reason: "send_failed" as const };
  }
}
