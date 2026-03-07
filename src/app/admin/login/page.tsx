import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { buildNoIndexMetadata } from "@/lib/seo";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export const metadata: Metadata = buildNoIndexMetadata(
  "Admin Login",
  "Secure login for Earthy Raw admin management.",
);

export default async function AdminLoginPage() {
  const authenticated = await isAdminAuthenticated();
  if (authenticated) {
    redirect("/admin/settings");
  }

  return <AdminLoginForm />;
}
