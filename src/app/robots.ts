import type { MetadataRoute } from "next";
import { getCanonicalOrigin } from "@/lib/seo";
import { getSiteSettings } from "@/lib/site-settings/store";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const siteSettings = await getSiteSettings();
  const canonicalOrigin = getCanonicalOrigin(siteSettings.seo.canonicalUrl);

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/legacy_", "/legacy_home", "/legacy_latest"],
      },
    ],
    ...(canonicalOrigin
      ? {
          sitemap: `${canonicalOrigin}/sitemap.xml`,
          host: canonicalOrigin,
        }
      : {}),
  };
}
