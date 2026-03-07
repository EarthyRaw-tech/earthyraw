import type { Metadata } from "next";

type PublicMetadataInput = {
  title: string;
  description: string;
  path: string;
  imageUrl?: string;
};

function toPath(value: string) {
  return value.startsWith("/") ? value : `/${value}`;
}

export function getCanonicalOrigin(canonicalUrl: string) {
  const value = canonicalUrl.trim();
  if (!value) {
    return undefined;
  }

  try {
    return new URL(value).origin;
  } catch {
    return undefined;
  }
}

export function buildPublicMetadata({
  title,
  description,
  path,
  imageUrl,
}: PublicMetadataInput): Metadata {
  const canonicalPath = toPath(path);
  const normalizedImageUrl = imageUrl?.trim();
  const hasImage = Boolean(normalizedImageUrl);

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: canonicalPath,
      ...(hasImage ? { images: [{ url: normalizedImageUrl! }] } : {}),
    },
    twitter: {
      card: hasImage ? "summary_large_image" : "summary",
      title,
      description,
      ...(hasImage ? { images: [normalizedImageUrl!] } : {}),
    },
  };
}

export function buildNoIndexMetadata(
  title: string,
  description: string,
): Metadata {
  return {
    title,
    description,
    robots: {
      index: false,
      follow: false,
      nocache: true,
    },
  };
}
