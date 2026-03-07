import type { MetadataRoute } from "next";
import { getCanonicalOrigin } from "@/lib/seo";
import { servicePages } from "@/lib/site-content";
import { getSiteSettings } from "@/lib/site-settings/store";

const STATIC_PUBLIC_PATHS = [
  "/",
  "/about",
  "/services",
  "/process",
  "/pricing",
  "/faq",
  "/contact",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteSettings = await getSiteSettings();
  const canonicalOrigin = getCanonicalOrigin(siteSettings.seo.canonicalUrl);
  if (!canonicalOrigin) {
    return [];
  }

  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = STATIC_PUBLIC_PATHS.map((path) => ({
    url: `${canonicalOrigin}${path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "daily" : "weekly",
    priority: path === "/" ? 1 : path === "/services" ? 0.9 : 0.8,
  }));

  const serviceDetailPages: MetadataRoute.Sitemap = servicePages.map((service) => ({
    url: `${canonicalOrigin}/services/${service.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticPages, ...serviceDetailPages];
}
