import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export const metadata = {
  title: "Admin Login",
  description: "Secure login for Earthy Raw admin management.",
};

export default async function AdminLoginPage() {
  const authenticated = await isAdminAuthenticated();
  if (authenticated) {
    redirect("/admin/settings");
  }

  return <AdminLoginForm />;
}
