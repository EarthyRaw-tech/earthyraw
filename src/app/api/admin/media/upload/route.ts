import { randomUUID } from "node:crypto";
import { put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { isAdminRequestAuthenticated } from "@/lib/admin-auth";

export const runtime = "nodejs";

const MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024;
const uploadFieldSchema = z.enum([
  "branding.logoUrl",
  "branding.faviconUrl",
  "branding.ogImageUrl",
  "homepage.backgroundImageUrl",
]);

const fieldToDirectory: Record<z.infer<typeof uploadFieldSchema>, string> = {
  "branding.logoUrl": "branding/logo",
  "branding.faviconUrl": "branding/favicon",
  "branding.ogImageUrl": "branding/og",
  "homepage.backgroundImageUrl": "homepage/background",
};

function unauthorized() {
  return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
}

function sanitizeFilename(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9.-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 120);
}

function extensionFromFile(file: File) {
  if (file.type === "image/png") return "png";
  if (file.type === "image/jpeg") return "jpg";
  if (file.type === "image/webp") return "webp";
  if (file.type === "image/gif") return "gif";
  if (file.type === "image/avif") return "avif";
  if (file.type === "image/svg+xml") return "svg";
  if (file.type === "image/x-icon" || file.type === "image/vnd.microsoft.icon") return "ico";

  const filename = file.name.toLowerCase();
  const parts = filename.split(".");
  if (parts.length > 1) {
    return sanitizeFilename(parts.at(-1) ?? "png") || "png";
  }
  return "png";
}

export async function POST(request: NextRequest) {
  if (!isAdminRequestAuthenticated(request)) {
    return unauthorized();
  }

  const token = process.env.BLOB_READ_WRITE_TOKEN?.trim();
  if (!token) {
    return NextResponse.json(
      { ok: false, error: "BLOB_READ_WRITE_TOKEN is not configured." },
      { status: 500 },
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid multipart form payload." },
      { status: 400 },
    );
  }

  const fieldRaw = formData.get("field");
  const parsedField = uploadFieldSchema.safeParse(
    typeof fieldRaw === "string" ? fieldRaw : "",
  );
  if (!parsedField.success) {
    return NextResponse.json(
      { ok: false, error: "Invalid target field." },
      { status: 400 },
    );
  }

  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json(
      { ok: false, error: "Image file is required." },
      { status: 400 },
    );
  }

  if (!file.type.startsWith("image/")) {
    return NextResponse.json(
      { ok: false, error: "Only image uploads are allowed." },
      { status: 400 },
    );
  }

  if (file.size <= 0 || file.size > MAX_IMAGE_SIZE_BYTES) {
    return NextResponse.json(
      { ok: false, error: "Image must be between 1 byte and 10MB." },
      { status: 400 },
    );
  }

  const field = parsedField.data;
  const extension = extensionFromFile(file);
  const filenameBase = sanitizeFilename(file.name.replace(/\.[^.]+$/, "")) || "asset";
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const pathname = `site-media/${fieldToDirectory[field]}/${timestamp}-${randomUUID()}-${filenameBase}.${extension}`;

  try {
    const blob = await put(pathname, file, {
      token,
      access: "public",
      addRandomSuffix: false,
      contentType: file.type || "application/octet-stream",
    });

    return NextResponse.json({
      ok: true,
      data: {
        url: blob.url,
        pathname: blob.pathname,
      },
    });
  } catch (error) {
    console.error("Blob upload failed", error);
    return NextResponse.json(
      { ok: false, error: "Could not upload image to Blob." },
      { status: 500 },
    );
  }
}
