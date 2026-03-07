import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_MAX_AGE_SECONDS,
  createAdminSessionToken,
  isAdminAuthConfigured,
  isAdminPasswordValid,
} from "@/lib/admin-auth";

const loginSchema = z.object({
  password: z.string().min(1, "Password is required."),
});

export async function POST(request: NextRequest) {
  let payload: z.infer<typeof loginSchema>;

  try {
    payload = loginSchema.parse(await request.json());
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request payload." },
      { status: 400 },
    );
  }

  if (!isAdminAuthConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Admin authentication is not configured." },
      { status: 500 },
    );
  }

  if (!isAdminPasswordValid(payload.password)) {
    return NextResponse.json(
      { ok: false, error: "Invalid credentials." },
      { status: 401 },
    );
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: ADMIN_SESSION_COOKIE,
    value: createAdminSessionToken(),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ADMIN_SESSION_MAX_AGE_SECONDS,
  });

  return response;
}
