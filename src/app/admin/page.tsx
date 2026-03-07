import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { buildNoIndexMetadata } from "@/lib/seo";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export const metadata: Metadata = buildNoIndexMetadata(
  "Admin",
  "Private admin entry route.",
);

export default async function AdminIndexPage() {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    redirect("/admin/login?next=/admin/settings");
  }

  redirect("/admin/settings");
}
