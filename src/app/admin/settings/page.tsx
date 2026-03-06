import { redirect } from "next/navigation";
import { AdminSettingsManager } from "@/components/admin/admin-settings-manager";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getSiteSettings } from "@/lib/site-settings/store";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin Settings",
  description: "Admin dashboard to manage website settings.",
};

export default async function AdminSettingsPage() {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    redirect("/admin/login?next=/admin/settings");
  }

  const settings = await getSiteSettings();
  return <AdminSettingsManager initialSettings={settings} />;
}
