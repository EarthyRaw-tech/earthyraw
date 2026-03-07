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

function parseIntegerEnv(name: string, fallback: number, min: number, max: number) {
  const parsed = Number(process.env[name]);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(max, Math.max(min, Math.floor(parsed)));
}

function sleep(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

function getSmtpConfig() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM;
  const secure = process.env.SMTP_SECURE === "true";
  const timeoutMs = parseIntegerEnv("SMTP_TIMEOUT_MS", 10_000, 1_000, 60_000);
  const retries = parseIntegerEnv("SMTP_RETRIES", 1, 0, 3);

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

  return { host, port, secure, auth, from, timeoutMs, retries };
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
    connectionTimeout: config.timeoutMs,
    greetingTimeout: config.timeoutMs,
    socketTimeout: config.timeoutMs,
  });

  return cachedTransporter;
}

export async function sendEmail(input: SendEmailInput) {
  const transporter = getTransporter();
  const config = getSmtpConfig();

  if (!transporter || !config) {
    return { ok: false as const, reason: "not_configured" as const };
  }

  const maxAttempts = config.retries + 1;
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
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
      const reason = error instanceof Error ? error.message : "unknown_error";
      if (attempt >= maxAttempts) {
        console.error("Email send failed", { attempt, maxAttempts, reason });
        return { ok: false as const, reason: "send_failed" as const };
      }
      await sleep(250 * attempt);
    }
  }

  return { ok: false as const, reason: "send_failed" as const };
}
