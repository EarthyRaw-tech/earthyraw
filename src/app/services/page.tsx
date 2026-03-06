import type { Metadata } from "next";
import { ServicesHubContent } from "@/components/pages/services-hub-content";
import { getSiteSettings } from "@/lib/site-settings/store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title:
    "Services - Software, IT Support, Servers, Networks, SOPs + On-Site Modifications",
  description:
    "Full service IT delivery: custom software, servers, support, networks/VPN, backups, SOPs, email/DNS/website, electrical safety, and on-site modifications for clean installs.",
};

export default async function ServicesHubPage() {
  const siteSettings = await getSiteSettings();
  return <ServicesHubContent siteSettings={siteSettings} />;
}
