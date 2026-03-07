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

function getAdminEnv(name: "ADMIN_SESSION_SECRET" | "ADMIN_PASSWORD") {
  const value = process.env[name]?.trim();
  if (value && value.length > 0) {
    return value;
  }

  return null;
}

export function isAdminAuthConfigured() {
  return Boolean(getAdminEnv("ADMIN_PASSWORD") && getAdminEnv("ADMIN_SESSION_SECRET"));
}

function getSessionSecret() {
  return getAdminEnv("ADMIN_SESSION_SECRET");
}

export function getAdminPassword() {
  const password = getAdminEnv("ADMIN_PASSWORD");
  if (!password) {
    throw new Error("ADMIN_PASSWORD is required.");
  }
  return password;
}

function sign(value: string) {
  const sessionSecret = getSessionSecret();
  if (!sessionSecret) {
    return null;
  }

  return createHmac("sha256", sessionSecret)
    .update(value)
    .digest("base64url");
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
  if (!signatureSegment) {
    throw new Error("ADMIN_SESSION_SECRET is required.");
  }
  return `${payloadSegment}.${signatureSegment}`;
}

export function isAdminPasswordValid(password: string) {
  if (!password) return false;
  const configuredPassword = getAdminEnv("ADMIN_PASSWORD");
  if (!configuredPassword) {
    return false;
  }
  return password === configuredPassword;
}

export function isAdminSessionTokenValid(token: string | undefined): boolean {
  if (!token) return false;
  const [payloadSegment, signatureSegment] = token.split(".");
  if (!payloadSegment || !signatureSegment) return false;

  const expectedSignature = sign(payloadSegment);
  if (!expectedSignature) return false;
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
