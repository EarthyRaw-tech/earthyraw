import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SitePreferencesProvider } from "@/components/providers/site-preferences-provider";
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
  const canonical = siteSettings.seo.canonicalUrl.trim();
  const faviconUrl = siteSettings.branding.faviconUrl.trim();
  const ogImageUrl = siteSettings.branding.ogImageUrl.trim();
  const keywords = siteSettings.seo.keywords.filter((keyword) => keyword.trim().length > 0);

  return {
    title: {
      default: defaultTitle,
      template: `%s | ${siteName}`,
    },
    description,
    keywords: keywords.length ? keywords : undefined,
    alternates: canonical ? { canonical } : undefined,
    openGraph: {
      title: defaultTitle,
      description,
      siteName,
      ...(canonical ? { url: canonical } : {}),
      ...(ogImageUrl ? { images: [{ url: ogImageUrl }] } : {}),
    },
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SitePreferencesProvider>{children}</SitePreferencesProvider>
      </body>
    </html>
  );
}
