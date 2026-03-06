import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { isAdminRequestAuthenticated } from "@/lib/admin-auth";
import { siteSettingsPatchSchema } from "@/lib/site-settings/schema";
import { getSiteSettings, updateSiteSettings } from "@/lib/site-settings/store";

export const runtime = "nodejs";

function unauthorized() {
  return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
}

export async function GET(request: NextRequest) {
  if (!isAdminRequestAuthenticated(request)) {
    return unauthorized();
  }

  const data = await getSiteSettings();
  return NextResponse.json({ ok: true, data });
}

export async function PUT(request: NextRequest) {
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

  try {
    const parsedPatch = siteSettingsPatchSchema.parse(payload);
    const data = await updateSiteSettings(parsedPatch);
    return NextResponse.json({ ok: true, data });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          ok: false,
          error: "Validation failed.",
          issues: error.issues.map((issue) => ({
            path: issue.path.join("."),
            message: issue.message,
          })),
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { ok: false, error: "Unexpected server error." },
      { status: 500 },
    );
  }
}
