"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { IconType } from "react-icons";
import {
  FiAlignLeft,
  FiBell,
  FiCheckCircle,
  FiChevronRight,
  FiDroplet,
  FiExternalLink,
  FiEye,
  FiFlag,
  FiGlobe,
  FiImage,
  FiInbox,
  FiInfo,
  FiLayers,
  FiLoader,
  FiLogOut,
  FiSearch,
  FiSettings,
  FiShield,
  FiToggleLeft,
  FiUpload,
} from "react-icons/fi";
import { SectionCard } from "@/components/admin/section-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { siteSettingsSchema, type SiteSettings } from "@/lib/site-settings/schema";

type SaveState = "idle" | "saving" | "success" | "error";
type SettingsSection = keyof SiteSettings;
type UploadFieldPath =
  | "branding.logoUrl"
  | "branding.faviconUrl"
  | "branding.ogImageUrl"
  | "homepage.backgroundImageUrl";

const SETTINGS_SECTIONS: Array<{
  key: SettingsSection;
  label: string;
  icon: IconType;
  description: string;
}> = [
  { key: "general", label: "General", icon: FiInfo, description: "Core business profile" },
  { key: "branding", label: "Branding", icon: FiImage, description: "Visual assets and media" },
  { key: "homepage", label: "Homepage", icon: FiLayers, description: "Hero and CTA behavior" },
  { key: "seo", label: "SEO", icon: FiSearch, description: "Search defaults and metadata" },
  { key: "social", label: "Social Links", icon: FiGlobe, description: "External profile links" },
  { key: "theme", label: "Theme", icon: FiDroplet, description: "Theme policy settings" },
  { key: "features", label: "Feature Toggles", icon: FiToggleLeft, description: "Enable or disable product areas" },
  { key: "footer", label: "Footer", icon: FiFlag, description: "Footer text and copyright" },
  { key: "forms", label: "Forms / Lead Handling", icon: FiBell, description: "Lead destinations and webhooks" },
];

const SECTION_CONTENT: Record<SettingsSection, { title: string; description: string }> = {
  general: {
    title: "General Settings",
    description: "Manage your site's core identity and company contact profile.",
  },
  branding: {
    title: "Branding",
    description: "Set logo and image assets used across site metadata and previews.",
  },
  homepage: {
    title: "Homepage",
    description: "Control hero copy, CTA behavior, and primary background media.",
  },
  seo: {
    title: "SEO Defaults",
    description: "Set metadata defaults used by pages across the site.",
  },
  social: {
    title: "Social Profiles",
    description: "Link official social channels and messaging profiles.",
  },
  theme: {
    title: "Theme",
    description: "Define system default theme and whether users can switch themes.",
  },
  features: {
    title: "Feature Toggles",
    description: "Control feature visibility without changing deployment code.",
  },
  footer: {
    title: "Footer",
    description: "Control copyright copy and footer support content.",
  },
  forms: {
    title: "Forms / Lead Handling",
    description: "Configure where leads are delivered and integrations fire.",
  },
};

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
    </div>
  );
}

function ImageAssetField({
  label,
  htmlFor,
  fileInputId,
  value,
  uploading,
  onUrlChange,
  onUpload,
}: {
  label: string;
  htmlFor: string;
  fileInputId: string;
  value: string;
  uploading: boolean;
  onUrlChange: (value: string) => void;
  onUpload: (file: File | null) => void;
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={htmlFor}>{label}</Label>
      <div className="grid gap-2 md:grid-cols-[1fr_auto]">
        <Input
          id={htmlFor}
          placeholder="https://..."
          value={value}
          onChange={(event) => onUrlChange(event.target.value)}
        />
        <div className="flex items-center">
          <input
            id={fileInputId}
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={(event) => {
              const file = event.target.files?.[0] ?? null;
              onUpload(file);
              event.target.value = "";
            }}
          />
          <label
            htmlFor={fileInputId}
            className="inline-flex h-9 cursor-pointer items-center gap-2 rounded-md border border-input bg-background/80 px-3 text-sm font-medium shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            {uploading ? <FiLoader className="size-4 animate-spin" /> : <FiUpload className="size-4" />}
            {uploading ? "Uploading..." : "Upload"}
          </label>
        </div>
      </div>
      {value ? (
        <div className="overflow-hidden rounded-md border border-slate-200/80 bg-slate-100/70 dark:border-slate-700 dark:bg-slate-900/70">
          {/* External/admin-provided URLs may come from multiple hosts (Blob/custom CDN). */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt={`${label} preview`}
            className="h-32 w-full object-cover"
            loading="lazy"
          />
        </div>
      ) : null}
      <p className="text-xs text-muted-foreground">Accepted formats: image files up to 10MB.</p>
    </div>
  );
}

function ToggleField({
  label,
  description,
  checked,
  onCheckedChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-slate-200/80 bg-white/65 p-3 dark:border-slate-700 dark:bg-slate-900/65">
      <div className="pr-4">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}

function CardPanel({ children }: { children: React.ReactNode }) {
  return (
    <Card className="rounded-xl border border-slate-200/80 bg-white/75 p-3 shadow-sm backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/75">
      <div className="mb-3 flex items-center justify-between">
        <p className="inline-flex items-center gap-2 text-sm font-semibold">
          <FiShield className="size-4 text-cyan-700 dark:text-cyan-300" />
          Admin Navigation
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-xs font-medium text-cyan-700 hover:text-cyan-800 dark:text-cyan-300 dark:hover:text-cyan-200"
        >
          <FiExternalLink className="size-3.5" />
          View Site
        </Link>
      </div>
      <div className="mb-3 grid gap-1">
        <Link
          href="/admin/settings"
          className="inline-flex items-center gap-2 rounded-md bg-cyan-50/80 px-3 py-2 text-sm font-medium text-cyan-900 dark:bg-cyan-900/35 dark:text-cyan-100"
        >
          <FiSettings className="size-4" />
          Settings
        </Link>
        <Link
          href="/admin/leads"
          className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-cyan-50/80 hover:text-cyan-900 dark:text-slate-200 dark:hover:bg-cyan-900/35 dark:hover:text-cyan-100"
        >
          <FiInbox className="size-4" />
          Leads Inbox
        </Link>
      </div>
      {children}
      <Separator className="my-3" />
      <div className="inline-flex items-center gap-2 rounded-md bg-cyan-50/70 px-2 py-1 text-xs text-cyan-900 dark:bg-cyan-900/30 dark:text-cyan-100">
        <FiEye className="size-3.5" />
        Protected admin area
      </div>
    </Card>
  );
}

export function AdminSettingsManager({
  initialSettings,
}: {
  initialSettings: SiteSettings;
}) {
  const router = useRouter();
  const [settings, setSettings] = useState<SiteSettings>(initialSettings);
  const [activeSection, setActiveSection] = useState<SettingsSection>("general");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [feedback, setFeedback] = useState("");
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);
  const [uploadingField, setUploadingField] = useState<UploadFieldPath | null>(null);

  const saveBadge = useMemo(() => {
    if (saveState === "saving") return <Badge variant="secondary">Saving...</Badge>;
    if (saveState === "success") return <Badge variant="success">Saved</Badge>;
    if (saveState === "error") return <Badge variant="error">Failed</Badge>;
    return <Badge variant="outline">Draft</Badge>;
  }, [saveState]);

  const updateSection = <K extends SettingsSection>(
    section: K,
    patch: Partial<SiteSettings[K]>,
  ) => {
    setSettings((previous) => ({
      ...previous,
      [section]: {
        ...previous[section],
        ...patch,
      },
    }));
  };

  const updateKeywords = (value: string) => {
    const keywords = value
      .split(",")
      .map((part) => part.trim())
      .filter(Boolean);
    updateSection("seo", { keywords });
  };

  const handleImageUpload = async <
    S extends "branding" | "homepage",
    K extends keyof SiteSettings[S] & string,
  >({
    section,
    key,
    fieldPath,
    file,
  }: {
    section: S;
    key: K;
    fieldPath: UploadFieldPath;
    file: File | null;
  }) => {
    if (!file) {
      return;
    }

    setUploadingField(fieldPath);
    setValidationErrors([]);

    try {
      const formData = new FormData();
      formData.append("field", fieldPath);
      formData.append("file", file);

      const response = await fetch("/api/admin/media/upload", {
        method: "POST",
        body: formData,
      });

      const result = (await response.json()) as
        | { ok: true; data: { url: string; pathname: string } }
        | { ok: false; error?: string };

      if (!response.ok || !result.ok) {
        setSaveState("error");
        setFeedback(!result.ok && result.error ? result.error : "Image upload failed.");
        return;
      }

      const uploadedUrl = result.data.url;
      updateSection(section, { [key]: uploadedUrl } as Partial<SiteSettings[S]>);
      setSaveState("idle");
      setFeedback("Image uploaded. Click Save to persist this change.");
    } catch {
      setSaveState("error");
      setFeedback("Network or server error while uploading image.");
    } finally {
      setUploadingField(null);
    }
  };

  const handleSave = async () => {
    const parsed = siteSettingsSchema.safeParse(settings);
    if (!parsed.success) {
      setSaveState("error");
      setValidationErrors(
        parsed.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`),
      );
      setFeedback("Validation failed. Please review highlighted values.");
      return;
    }

    setSaveState("saving");
    setValidationErrors([]);
    setFeedback("");

    try {
      const response = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsed.data),
      });

      const result = (await response.json()) as
        | { ok: true; data: SiteSettings }
        | { ok: false; error?: string; issues?: Array<{ path: string; message: string }> };

      if (!response.ok || !result.ok) {
        const issues =
          !result.ok && result.issues
            ? result.issues.map((issue) => `${issue.path}: ${issue.message}`)
            : [];
        setValidationErrors(issues);
        setSaveState("error");
        setFeedback(!result.ok && result.error ? result.error : "Save failed.");
        return;
      }

      setSettings(result.data);
      setLastSavedAt(new Date().toLocaleString());
      setSaveState("success");
      setFeedback("Settings saved successfully.");
      setTimeout(() => {
        setSaveState("idle");
      }, 1500);
    } catch {
      setSaveState("error");
      setFeedback("Network or server error while saving settings.");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  };

  const currentSectionMeta =
    SETTINGS_SECTIONS.find((section) => section.key === activeSection) ?? SETTINGS_SECTIONS[0];

  return (
    <div className="min-h-screen bg-[linear-gradient(160deg,rgba(248,253,255,0.88)_0%,rgba(236,247,255,0.8)_45%,rgba(241,245,249,0.82)_100%)] text-slate-900 dark:bg-[linear-gradient(160deg,rgba(2,6,23,0.95)_0%,rgba(15,23,42,0.9)_45%,rgba(17,24,39,0.9)_100%)] dark:text-slate-100">
      <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/70 backdrop-blur-md dark:border-slate-700 dark:bg-slate-950/65">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-3 md:px-6">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileNavOpen(true)}
            >
              <FiAlignLeft className="size-4" />
            </Button>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300">
                Admin Manager
              </p>
              <h1 className="text-base font-semibold md:text-lg">Website Settings</h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {saveBadge}
            <Button
              onClick={handleSave}
              disabled={saveState === "saving"}
              size="sm"
              className="gap-2"
            >
              {saveState === "saving" ? (
                <>
                  <FiLoader className="size-4 animate-spin" />
                  Saving
                </>
              ) : (
                <>
                  <FiCheckCircle className="size-4" />
                  Save
                </>
              )}
            </Button>
            <Button variant="outline" size="sm" className="gap-2" onClick={handleLogout}>
              <FiLogOut className="size-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-6 md:grid-cols-[260px_1fr] md:px-6">
        <Tabs value={activeSection} onValueChange={(value) => setActiveSection(value as SettingsSection)} className="contents">
          <aside className="hidden md:block">
            <CardPanel>
              <TabsList>
                {SETTINGS_SECTIONS.map((section) => {
                  const Icon = section.icon;
                  return (
                    <TabsTrigger key={section.key} value={section.key}>
                      <Icon className="size-4" />
                      <span>{section.label}</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </CardPanel>
          </aside>

          <section className="space-y-4">
            <SectionCard
              title={currentSectionMeta.label}
              description={currentSectionMeta.description}
            >
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FiSettings className="size-4" />
                <span>Update values and click Save to persist.</span>
                {lastSavedAt ? <span className="ml-auto">Last saved: {lastSavedAt}</span> : null}
              </div>
            </SectionCard>

            {feedback ? (
              <SectionCard title="Status" description="Current save operation status.">
                <p
                  className={
                    saveState === "error"
                      ? "text-sm font-medium text-rose-700 dark:text-rose-300"
                      : "text-sm font-medium text-emerald-700 dark:text-emerald-300"
                  }
                >
                  {feedback}
                </p>
                {validationErrors.length ? (
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-rose-700 dark:text-rose-300">
                    {validationErrors.map((error) => (
                      <li key={error}>{error}</li>
                    ))}
                  </ul>
                ) : null}
              </SectionCard>
            ) : null}
            <TabsContent value="general">
              <SectionCard {...SECTION_CONTENT.general}>
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Site Name" htmlFor="general-site-name">
                    <Input id="general-site-name" value={settings.general.siteName} onChange={(event) => updateSection("general", { siteName: event.target.value })} />
                  </Field>
                  <Field label="Tagline" htmlFor="general-tagline">
                    <Input id="general-tagline" value={settings.general.tagline} onChange={(event) => updateSection("general", { tagline: event.target.value })} />
                  </Field>
                  <Field label="Company Name" htmlFor="general-company-name">
                    <Input id="general-company-name" value={settings.general.companyName} onChange={(event) => updateSection("general", { companyName: event.target.value })} />
                  </Field>
                  <Field label="Email" htmlFor="general-email">
                    <Input id="general-email" type="email" value={settings.general.email} onChange={(event) => updateSection("general", { email: event.target.value })} />
                  </Field>
                  <Field label="Phone" htmlFor="general-phone">
                    <Input id="general-phone" value={settings.general.phone} onChange={(event) => updateSection("general", { phone: event.target.value })} />
                  </Field>
                  <Field label="Address" htmlFor="general-address">
                    <Input id="general-address" value={settings.general.address} onChange={(event) => updateSection("general", { address: event.target.value })} />
                  </Field>
                </div>
              </SectionCard>
            </TabsContent>

            <TabsContent value="branding">
              <SectionCard {...SECTION_CONTENT.branding}>
                <div className="grid gap-4">
                  <ImageAssetField
                    label="Logo URL"
                    htmlFor="branding-logo"
                    fileInputId="branding-logo-file"
                    value={settings.branding.logoUrl}
                    uploading={uploadingField === "branding.logoUrl"}
                    onUrlChange={(value) => updateSection("branding", { logoUrl: value })}
                    onUpload={(file) =>
                      void handleImageUpload({
                        section: "branding",
                        key: "logoUrl",
                        fieldPath: "branding.logoUrl",
                        file,
                      })}
                  />
                  <ImageAssetField
                    label="Favicon URL"
                    htmlFor="branding-favicon"
                    fileInputId="branding-favicon-file"
                    value={settings.branding.faviconUrl}
                    uploading={uploadingField === "branding.faviconUrl"}
                    onUrlChange={(value) => updateSection("branding", { faviconUrl: value })}
                    onUpload={(file) =>
                      void handleImageUpload({
                        section: "branding",
                        key: "faviconUrl",
                        fieldPath: "branding.faviconUrl",
                        file,
                      })}
                  />
                  <ImageAssetField
                    label="Open Graph Image URL"
                    htmlFor="branding-og-image"
                    fileInputId="branding-og-image-file"
                    value={settings.branding.ogImageUrl}
                    uploading={uploadingField === "branding.ogImageUrl"}
                    onUrlChange={(value) => updateSection("branding", { ogImageUrl: value })}
                    onUpload={(file) =>
                      void handleImageUpload({
                        section: "branding",
                        key: "ogImageUrl",
                        fieldPath: "branding.ogImageUrl",
                        file,
                      })}
                  />
                </div>
              </SectionCard>
            </TabsContent>

            <TabsContent value="homepage">
              <SectionCard {...SECTION_CONTENT.homepage}>
                <div className="grid gap-4">
                  <Field label="Hero Title" htmlFor="homepage-hero-title"><Input id="homepage-hero-title" value={settings.homepage.heroTitle} onChange={(event) => updateSection("homepage", { heroTitle: event.target.value })} /></Field>
                  <Field label="Hero Subtitle" htmlFor="homepage-hero-subtitle"><Textarea id="homepage-hero-subtitle" rows={4} value={settings.homepage.heroSubtitle} onChange={(event) => updateSection("homepage", { heroSubtitle: event.target.value })} /></Field>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="CTA Text" htmlFor="homepage-cta-text"><Input id="homepage-cta-text" value={settings.homepage.ctaText} onChange={(event) => updateSection("homepage", { ctaText: event.target.value })} /></Field>
                    <Field label="CTA Link" htmlFor="homepage-cta-link"><Input id="homepage-cta-link" value={settings.homepage.ctaLink} onChange={(event) => updateSection("homepage", { ctaLink: event.target.value })} /></Field>
                  </div>
                  <ImageAssetField
                    label="Background Image URL"
                    htmlFor="homepage-bg-image"
                    fileInputId="homepage-bg-image-file"
                    value={settings.homepage.backgroundImageUrl}
                    uploading={uploadingField === "homepage.backgroundImageUrl"}
                    onUrlChange={(value) => updateSection("homepage", { backgroundImageUrl: value })}
                    onUpload={(file) =>
                      void handleImageUpload({
                        section: "homepage",
                        key: "backgroundImageUrl",
                        fieldPath: "homepage.backgroundImageUrl",
                        file,
                      })}
                  />
                </div>
              </SectionCard>
            </TabsContent>

            <TabsContent value="seo">
              <SectionCard {...SECTION_CONTENT.seo}>
                <div className="grid gap-4">
                  <Field label="Default Title" htmlFor="seo-title"><Input id="seo-title" value={settings.seo.defaultTitle} onChange={(event) => updateSection("seo", { defaultTitle: event.target.value })} /></Field>
                  <Field label="Default Description" htmlFor="seo-description"><Textarea id="seo-description" rows={4} value={settings.seo.defaultDescription} onChange={(event) => updateSection("seo", { defaultDescription: event.target.value })} /></Field>
                  <Field label="Keywords (comma separated)" htmlFor="seo-keywords"><Input id="seo-keywords" value={settings.seo.keywords.join(", ")} onChange={(event) => updateKeywords(event.target.value)} /></Field>
                  <Field label="Canonical URL" htmlFor="seo-canonical"><Input id="seo-canonical" placeholder="https://..." value={settings.seo.canonicalUrl} onChange={(event) => updateSection("seo", { canonicalUrl: event.target.value })} /></Field>
                </div>
              </SectionCard>
            </TabsContent>

            <TabsContent value="social">
              <SectionCard {...SECTION_CONTENT.social}>
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Facebook" htmlFor="social-facebook"><Input id="social-facebook" placeholder="https://..." value={settings.social.facebook} onChange={(event) => updateSection("social", { facebook: event.target.value })} /></Field>
                  <Field label="Instagram" htmlFor="social-instagram"><Input id="social-instagram" placeholder="https://..." value={settings.social.instagram} onChange={(event) => updateSection("social", { instagram: event.target.value })} /></Field>
                  <Field label="LinkedIn" htmlFor="social-linkedin"><Input id="social-linkedin" placeholder="https://..." value={settings.social.linkedin} onChange={(event) => updateSection("social", { linkedin: event.target.value })} /></Field>
                  <Field label="YouTube" htmlFor="social-youtube"><Input id="social-youtube" placeholder="https://..." value={settings.social.youtube} onChange={(event) => updateSection("social", { youtube: event.target.value })} /></Field>
                  <Field label="TikTok" htmlFor="social-tiktok"><Input id="social-tiktok" placeholder="https://..." value={settings.social.tiktok} onChange={(event) => updateSection("social", { tiktok: event.target.value })} /></Field>
                  <Field label="WhatsApp" htmlFor="social-whatsapp"><Input id="social-whatsapp" placeholder="+1..." value={settings.social.whatsapp} onChange={(event) => updateSection("social", { whatsapp: event.target.value })} /></Field>
                </div>
              </SectionCard>
            </TabsContent>

            <TabsContent value="theme">
              <SectionCard {...SECTION_CONTENT.theme}>
                <div className="grid gap-4">
                  <Field label="Default Theme" htmlFor="theme-default">
                    <select id="theme-default" value={settings.theme.defaultTheme} onChange={(event) => updateSection("theme", { defaultTheme: event.target.value as SiteSettings["theme"]["defaultTheme"] })} className="flex h-9 w-full rounded-md border border-input bg-background/80 px-3 py-1 text-sm shadow-xs transition-colors focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50">
                      <option value="system">System</option>
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                    </select>
                  </Field>
                  <ToggleField label="Allow Theme Toggle" description="When disabled, users cannot switch light/dark mode in the UI." checked={settings.theme.allowThemeToggle} onCheckedChange={(checked) => updateSection("theme", { allowThemeToggle: checked })} />
                </div>
              </SectionCard>
            </TabsContent>

            <TabsContent value="features">
              <SectionCard {...SECTION_CONTENT.features}>
                <div className="grid gap-3">
                  <ToggleField label="Enable Booking" description="Show booking flows and booking CTAs." checked={settings.features.enableBooking} onCheckedChange={(checked) => updateSection("features", { enableBooking: checked })} />
                  <ToggleField label="Enable Testimonials" description="Show testimonials sections where configured." checked={settings.features.enableTestimonials} onCheckedChange={(checked) => updateSection("features", { enableTestimonials: checked })} />
                  <ToggleField label="Enable Blog" description="Show blog navigation and content areas." checked={settings.features.enableBlog} onCheckedChange={(checked) => updateSection("features", { enableBlog: checked })} />
                  <ToggleField label="Enable Chat Button" description="Enable floating chat button integrations." checked={settings.features.enableChatButton} onCheckedChange={(checked) => updateSection("features", { enableChatButton: checked })} />
                  <ToggleField label="Enable Announcement Bar" description="Display announcement bar at top of public pages." checked={settings.features.enableAnnouncementBar} onCheckedChange={(checked) => updateSection("features", { enableAnnouncementBar: checked })} />
                </div>
              </SectionCard>
            </TabsContent>

            <TabsContent value="footer">
              <SectionCard {...SECTION_CONTENT.footer}>
                <div className="grid gap-4">
                  <Field label="Copyright" htmlFor="footer-copyright"><Input id="footer-copyright" value={settings.footer.copyright} onChange={(event) => updateSection("footer", { copyright: event.target.value })} /></Field>
                  <Field label="Footer Text" htmlFor="footer-text"><Textarea id="footer-text" rows={4} value={settings.footer.footerText} onChange={(event) => updateSection("footer", { footerText: event.target.value })} /></Field>
                </div>
              </SectionCard>
            </TabsContent>

            <TabsContent value="forms">
              <SectionCard {...SECTION_CONTENT.forms}>
                <div className="grid gap-4">
                  <Field label="Destination Email" htmlFor="forms-destination-email"><Input id="forms-destination-email" type="email" value={settings.forms.destinationEmail} onChange={(event) => updateSection("forms", { destinationEmail: event.target.value })} /></Field>
                  <Field label="Webhook URL" htmlFor="forms-webhook-url"><Input id="forms-webhook-url" placeholder="https://..." value={settings.forms.webhookUrl} onChange={(event) => updateSection("forms", { webhookUrl: event.target.value })} /></Field>
                  <ToggleField label="Enable Autoresponder" description="Enable automatic response after form submissions." checked={settings.forms.enableAutoresponder} onCheckedChange={(checked) => updateSection("forms", { enableAutoresponder: checked })} />
                </div>
              </SectionCard>
            </TabsContent>
          </section>
        </Tabs>
      </main>
      {mobileNavOpen ? (
        <div className="fixed inset-0 z-40 md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-slate-950/60"
            onClick={() => setMobileNavOpen(false)}
            aria-label="Close navigation"
          />
          <div className="absolute left-0 top-0 h-full w-[82%] max-w-[300px] border-r border-slate-700 bg-slate-950/96 p-4 text-slate-100 backdrop-blur-md">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-semibold">Settings Sections</p>
              <Button size="sm" variant="ghost" onClick={() => setMobileNavOpen(false)}>
                <FiChevronRight className="size-4" />
              </Button>
            </div>
            <div className="mb-3 grid gap-1">
              <Link
                href="/admin/settings"
                className="inline-flex items-center gap-2 rounded-md bg-cyan-700 px-3 py-2 text-sm text-cyan-50"
              >
                <FiSettings className="size-4" />
                Settings
              </Link>
              <Link
                href="/admin/leads"
                className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm text-slate-200 hover:bg-slate-800"
                onClick={() => setMobileNavOpen(false)}
              >
                <FiInbox className="size-4" />
                Leads Inbox
              </Link>
            </div>
            <Separator className="mb-3" />
            <div className="grid gap-1">
              {SETTINGS_SECTIONS.map((section) => {
                const Icon = section.icon;
                const isActive = section.key === activeSection;
                return (
                  <button
                    key={section.key}
                    type="button"
                    onClick={() => {
                      setActiveSection(section.key);
                      setMobileNavOpen(false);
                    }}
                    className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
                      isActive
                        ? "bg-cyan-700 text-cyan-50"
                        : "text-slate-200 hover:bg-slate-800"
                    }`}
                  >
                    <Icon className="size-4" />
                    {section.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
