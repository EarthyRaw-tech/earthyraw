import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SitePreferencesProvider } from "@/components/providers/site-preferences-provider";
import { getCanonicalOrigin } from "@/lib/seo";
import { getSiteSettings } from "@/lib/site-settings/store";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const FALLBACK_TITLE = "Comprehensive IT Services + On-Site Office Modifications";
const FALLBACK_DESCRIPTION =
  "End-to-end IT for offices: software, servers, networks, security, backups, support, SOPs, email/DNS, plus in-house office modifications to complete installs cleanly.";

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings();

  const siteName = siteSettings.general.siteName.trim() || "Earthy Raw Technologies";
  const defaultTitle = siteSettings.seo.defaultTitle.trim() || FALLBACK_TITLE;
  const description = siteSettings.seo.defaultDescription.trim() || FALLBACK_DESCRIPTION;
  const canonicalOrigin =
    getCanonicalOrigin(siteSettings.seo.canonicalUrl) ||
    getCanonicalOrigin(process.env.NEXT_PUBLIC_SITE_URL ?? "");
  const faviconUrl = siteSettings.branding.faviconUrl.trim();
  const ogImageUrl = siteSettings.branding.ogImageUrl.trim();
  const googleSiteVerification =
    process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim() ?? "";
  const bingSiteVerification =
    process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION?.trim() ?? "";
  const keywords = siteSettings.seo.keywords.filter((keyword) => keyword.trim().length > 0);
  const verification =
    googleSiteVerification || bingSiteVerification
      ? {
          ...(googleSiteVerification ? { google: googleSiteVerification } : {}),
          ...(bingSiteVerification
            ? { other: { "msvalidate.01": bingSiteVerification } }
            : {}),
        }
      : undefined;

  return {
    ...(canonicalOrigin ? { metadataBase: new URL(canonicalOrigin) } : {}),
    title: {
      default: defaultTitle,
      template: `%s | ${siteName}`,
    },
    description,
    keywords: keywords.length ? keywords : undefined,
    alternates: { canonical: "/" },
    openGraph: {
      title: defaultTitle,
      description,
      siteName,
      type: "website",
      url: "/",
      ...(ogImageUrl ? { images: [{ url: ogImageUrl }] } : {}),
    },
    twitter: {
      card: ogImageUrl ? "summary_large_image" : "summary",
      title: defaultTitle,
      description,
      ...(ogImageUrl ? { images: [ogImageUrl] } : {}),
    },
    ...(verification ? { verification } : {}),
    ...(faviconUrl
      ? {
          icons: {
            icon: faviconUrl,
            shortcut: faviconUrl,
            apple: faviconUrl,
          },
        }
      : {}),
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteSettings = await getSiteSettings();
  const siteName = siteSettings.general.siteName.trim() || "Earthy Raw Technologies";
  const canonicalOrigin =
    getCanonicalOrigin(siteSettings.seo.canonicalUrl) ||
    getCanonicalOrigin(process.env.NEXT_PUBLIC_SITE_URL ?? "");
  const logoUrl = siteSettings.branding.logoUrl.trim();
  const socialProfiles = [
    siteSettings.social.facebook.trim(),
    siteSettings.social.instagram.trim(),
    siteSettings.social.linkedin.trim(),
    siteSettings.social.youtube.trim(),
    siteSettings.social.tiktok.trim(),
  ].filter(Boolean);

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    ...(canonicalOrigin ? { url: canonicalOrigin } : {}),
    ...(logoUrl ? { logo: logoUrl } : {}),
    ...(siteSettings.general.email.trim()
      ? { email: siteSettings.general.email.trim() }
      : {}),
    ...(siteSettings.general.phone.trim()
      ? { telephone: siteSettings.general.phone.trim() }
      : {}),
    ...(socialProfiles.length > 0 ? { sameAs: socialProfiles } : {}),
  };
  const organizationJsonLdHtml = JSON.stringify(organizationJsonLd).replace(
    /</g,
    "\\u003c",
  );

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: organizationJsonLdHtml }}
        />
        <SitePreferencesProvider>{children}</SitePreferencesProvider>
      </body>
    </html>
  );
}
