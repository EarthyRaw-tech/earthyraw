import { put } from "@vercel/blob";

type SnapshotCategory = "site-settings" | "lead-submission";

function getBlobToken() {
  return process.env.BLOB_READ_WRITE_TOKEN?.trim() ?? "";
}

function safePathPart(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

export function isVercelBlobBackupConfigured() {
  return Boolean(getBlobToken());
}

export async function writeJsonSnapshotToVercelBlob({
  category,
  data,
  identifier,
}: {
  category: SnapshotCategory;
  data: unknown;
  identifier?: string;
}) {
  const token = getBlobToken();
  if (!token) {
    return;
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const idPart = identifier ? safePathPart(identifier) : "snapshot";
  const pathname = `site-backups/${category}/${timestamp}-${idPart}.json`;

  const payload = {
    category,
    createdAt: new Date().toISOString(),
    data,
  };

  await put(pathname, JSON.stringify(payload, null, 2), {
    token,
    access: "private",
    addRandomSuffix: false,
    contentType: "application/json",
  });
}
