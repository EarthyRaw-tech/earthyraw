import { createHmac, timingSafeEqual } from "node:crypto";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

export const ADMIN_SESSION_COOKIE = "earthyraw_admin_session";
export const ADMIN_SESSION_MAX_AGE_SECONDS = 60 * 60 * 12;

type AdminSessionPayload = {
  sub: "admin";
  exp: number;
};

function toBase64Url(input: string) {
  return Buffer.from(input, "utf8").toString("base64url");
}

function fromBase64Url(input: string) {
  return Buffer.from(input, "base64url").toString("utf8");
}

function getRequiredAdminEnv(name: "ADMIN_SESSION_SECRET" | "ADMIN_PASSWORD", fallback: string) {
  const value = process.env[name];
  if (value && value.length > 0) {
    return value;
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error(`${name} is required in production.`);
  }

  return fallback;
}

function getSessionSecret() {
  return getRequiredAdminEnv(
    "ADMIN_SESSION_SECRET",
    "earthyraw-dev-session-secret",
  );
}

export function getAdminPassword() {
  return getRequiredAdminEnv("ADMIN_PASSWORD", "admin123");
}

function sign(value: string) {
  return createHmac("sha256", getSessionSecret()).update(value).digest("base64url");
}

function encodePayload(payload: AdminSessionPayload) {
  return toBase64Url(JSON.stringify(payload));
}

function decodePayload(payloadSegment: string): AdminSessionPayload | null {
  try {
    const parsed = JSON.parse(fromBase64Url(payloadSegment)) as AdminSessionPayload;
    if (parsed.sub !== "admin" || typeof parsed.exp !== "number") {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function createAdminSessionToken(now = Date.now()): string {
  const payload: AdminSessionPayload = {
    sub: "admin",
    exp: Math.floor(now / 1000) + ADMIN_SESSION_MAX_AGE_SECONDS,
  };

  const payloadSegment = encodePayload(payload);
  const signatureSegment = sign(payloadSegment);
  return `${payloadSegment}.${signatureSegment}`;
}

export function isAdminPasswordValid(password: string) {
  if (!password) return false;
  return password === getAdminPassword();
}

export function isAdminSessionTokenValid(token: string | undefined): boolean {
  if (!token) return false;
  const [payloadSegment, signatureSegment] = token.split(".");
  if (!payloadSegment || !signatureSegment) return false;

  const expectedSignature = sign(payloadSegment);
  const providedBuffer = Buffer.from(signatureSegment);
  const expectedBuffer = Buffer.from(expectedSignature);
  if (providedBuffer.length !== expectedBuffer.length) return false;
  if (!timingSafeEqual(providedBuffer, expectedBuffer)) return false;

  const payload = decodePayload(payloadSegment);
  if (!payload) return false;

  const now = Math.floor(Date.now() / 1000);
  return payload.exp > now;
}

export function isAdminRequestAuthenticated(request: NextRequest) {
  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  return isAdminSessionTokenValid(token);
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  return isAdminSessionTokenValid(token);
}
