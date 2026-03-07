import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  FiArrowLeft,
  FiGlobe,
  FiInbox,
  FiMail,
  FiPhone,
  FiServer,
  FiUser,
} from "react-icons/fi";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResendConfirmationButton } from "@/components/admin/resend-confirmation-button";
import { buildNoIndexMetadata } from "@/lib/seo";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getContactSubmissions } from "@/lib/contact-submissions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildNoIndexMetadata(
  "Admin Leads",
  "Submitted contact requests and lead intake records.",
);

function formatDate(value: string) {
  if (!value) return "Unknown";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleString();
}

export default async function AdminLeadsPage() {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    redirect("/admin/login?next=/admin/leads");
  }

  const leads = await getContactSubmissions(200);

  return (
    <div className="min-h-screen bg-[linear-gradient(160deg,rgba(248,253,255,0.88)_0%,rgba(236,247,255,0.8)_45%,rgba(241,245,249,0.82)_100%)] text-slate-900 dark:bg-[linear-gradient(160deg,rgba(2,6,23,0.95)_0%,rgba(15,23,42,0.9)_45%,rgba(17,24,39,0.9)_100%)] dark:text-slate-100">
      <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/70 backdrop-blur-md dark:border-slate-700 dark:bg-slate-950/65">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-3 md:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300">
              Admin Manager
            </p>
            <h1 className="inline-flex items-center gap-2 text-base font-semibold md:text-lg">
              <FiInbox className="size-4" />
              Lead Inbox
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild size="sm" variant="outline" className="gap-2">
              <Link href="/admin/settings">
                <FiArrowLeft className="size-4" />
                Settings
              </Link>
            </Button>
            <Button asChild size="sm" variant="outline" className="gap-2">
              <Link href="/">
                <FiGlobe className="size-4" />
                View Site
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl space-y-4 px-4 py-6 md:px-6">
        <Card className="border-slate-200/80 bg-white/75 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/75">
          <CardHeader>
            <CardTitle>Contact Submissions</CardTitle>
            <CardDescription>
              {leads.length} total {leads.length === 1 ? "submission" : "submissions"} loaded.
            </CardDescription>
          </CardHeader>
        </Card>

        {leads.length === 0 ? (
          <Card className="border-slate-200/80 bg-white/75 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/75">
            <CardContent className="pt-6 text-sm text-muted-foreground">
              No submissions yet. Submit the contact form on the public site and refresh this page.
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {leads.map((lead, index) => (
              <Card
                key={`${lead.submittedAt}-${lead.email}-${index}`}
                className="border-slate-200/80 bg-white/75 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/75"
              >
                <CardHeader className="pb-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline">{formatDate(lead.submittedAt)}</Badge>
                    {lead.language ? <Badge variant="secondary">{lead.language.toUpperCase()}</Badge> : null}
                    {lead.hasServer ? <Badge variant="outline">Server: {lead.hasServer}</Badge> : null}
                  </div>
                  <CardTitle className="text-base">
                    {lead.nameRole || "Unnamed submission"}
                  </CardTitle>
                  <CardDescription>{lead.company || "No company provided"}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="grid gap-2 md:grid-cols-2">
                    <p className="inline-flex items-center gap-2">
                      <FiMail className="size-4 text-cyan-700 dark:text-cyan-300" />
                      <span>{lead.email || "No email"}</span>
                    </p>
                    <p className="inline-flex items-center gap-2">
                      <FiPhone className="size-4 text-cyan-700 dark:text-cyan-300" />
                      <span>{lead.phone || "No phone"}</span>
                    </p>
                    <p className="inline-flex items-center gap-2">
                      <FiUser className="size-4 text-cyan-700 dark:text-cyan-300" />
                      <span>Users/PCs: {lead.usersPcs || "N/A"}</span>
                    </p>
                    <p className="inline-flex items-center gap-2">
                      <FiServer className="size-4 text-cyan-700 dark:text-cyan-300" />
                      <span>Destination: {lead.destinationEmail || "Not configured"}</span>
                    </p>
                  </div>

                  <ResendConfirmationButton
                    email={lead.email}
                    nameRole={lead.nameRole}
                    company={lead.company}
                    phone={lead.phone}
                    usersPcs={lead.usersPcs}
                    hasServer={lead.hasServer}
                    issues={lead.issues}
                    message={lead.message}
                    submittedAt={lead.submittedAt}
                    language={lead.language || "en"}
                  />

                  {lead.issues.length ? (
                    <div className="flex flex-wrap gap-2">
                      {lead.issues.map((issue) => (
                        <Badge key={issue} variant="outline">
                          {issue}
                        </Badge>
                      ))}
                    </div>
                  ) : null}

                  <div className="rounded-lg border border-slate-200/80 bg-slate-50/80 p-3 text-slate-700 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-200">
                    {lead.message || "No message provided."}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
