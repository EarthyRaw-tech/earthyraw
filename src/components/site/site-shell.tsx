"use client";

import Link from "next/link";
import type { ComponentType, ReactNode } from "react";
import { FiArrowRight, FiBriefcase, FiChevronDown, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa6";
import { useSitePreferences } from "@/components/providers/site-preferences-provider";
import { AnimatedBackdrop } from "@/components/site/animated-backdrop";
import { SiteControls } from "@/components/site/site-controls";
import { Button } from "@/components/ui/button";
import { getServiceIcon, navIcons, type NavIconKey } from "@/lib/icon-map";
import { uiCopy } from "@/lib/i18n";
import { getLocalizedContent } from "@/lib/site-content-localized";
import type { SiteSettings } from "@/lib/site-settings/schema";
import { cn } from "@/lib/utils";

type NavKey =
  | "home"
  | "services"
  | "process"
  | "pricing"
  | "contact"
  | "about"
  | "faq";

type SiteShellProps = {
  children: ReactNode;
  active?: NavKey;
  siteSettings: SiteSettings;
};

const topLinks: Array<{ key: NavKey; href: string }> = [
  { key: "home", href: "/" },
  { key: "process", href: "/process" },
  { key: "pricing", href: "/pricing" },
  { key: "contact", href: "/contact" },
  { key: "about", href: "/about" },
  { key: "faq", href: "/faq" },
];

function NavLink({
  href,
  label,
  active,
  icon: Icon,
}: {
  href: string;
  label: string;
  active: boolean;
  icon: ComponentType<{ className?: string }>;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition",
        active
          ? "bg-cyan-900 text-cyan-50"
          : "text-slate-700 hover:bg-cyan-50 hover:text-cyan-900 dark:text-slate-200 dark:hover:bg-cyan-900/30 dark:hover:text-cyan-100",
      )}
    >
      <Icon className="size-4 shrink-0" />
      {label}
    </Link>
  );
}

export function SiteShell({ children, active, siteSettings }: SiteShellProps) {
  const year = new Date().getFullYear();
  const { language } = useSitePreferences();
  const copy = uiCopy[language];
  const ServicesIcon = navIcons.services;
  const { services } = getLocalizedContent(language);
  const siteName = siteSettings.general.siteName.trim() || "Earthy Raw Technologies";
  const companyName = siteSettings.general.companyName.trim() || siteName;
  const footerText = siteSettings.footer.footerText.trim() || copy.sections.footerTagline;
  const heritageStatement =
    language === "es"
      ? "Empresa puertorriquena nativa con mas de 30 anos de experiencia."
      : "Native Puerto Rican company with more than 30 years of experience.";

  const contactEmail =
    siteSettings.general.email.trim() || siteSettings.forms.destinationEmail.trim();
  const contactPhone = siteSettings.general.phone.trim();
  const contactAddress = siteSettings.general.address.trim();
  const contactPhoneHref = contactPhone
    ? `tel:${contactPhone.replace(/[^\d+]/g, "")}`
    : "";
  const ctaText = siteSettings.homepage.ctaText.trim() || copy.actions.scheduleAssessment;
  const ctaHref = siteSettings.homepage.ctaLink.trim() || "/contact";

  const footerCopyright = siteSettings.footer.copyright.trim()
    ? siteSettings.footer.copyright
        .trim()
        .replaceAll("{{year}}", String(year))
        .replaceAll("{year}", String(year))
    : `(c) ${year} ${companyName}`;

  const whatsappRaw = siteSettings.social.whatsapp.trim();
  const whatsappHref = whatsappRaw.startsWith("http")
    ? whatsappRaw
    : (() => {
        const digits = whatsappRaw.replace(/[^\d]/g, "");
        return digits ? `https://wa.me/${digits}` : "";
      })();

  const socialLinks = [
    { key: "facebook", label: "Facebook", href: siteSettings.social.facebook.trim(), icon: FaFacebookF },
    { key: "instagram", label: "Instagram", href: siteSettings.social.instagram.trim(), icon: FaInstagram },
    { key: "linkedin", label: "LinkedIn", href: siteSettings.social.linkedin.trim(), icon: FaLinkedinIn },
    { key: "youtube", label: "YouTube", href: siteSettings.social.youtube.trim(), icon: FaYoutube },
    { key: "tiktok", label: "TikTok", href: siteSettings.social.tiktok.trim(), icon: FaTiktok },
    { key: "whatsapp", label: "WhatsApp", href: whatsappHref, icon: FaWhatsapp },
  ].filter((item) => item.href.length > 0);

  return (
    <div className="relative min-h-screen overflow-x-hidden text-slate-900 dark:text-slate-100">
      <AnimatedBackdrop />

      <header className="sticky top-0 z-30 border-b border-cyan-100/80 bg-white/62 backdrop-blur-md dark:border-cyan-900/50 dark:bg-slate-950/62">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-4 md:px-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-cyan-900 dark:text-cyan-200"
            >
              <FiBriefcase className="size-4" />
              {siteName}
            </Link>
            <div className="flex flex-wrap items-center gap-2">
              <SiteControls />
              <Button asChild size="sm" className="gap-2">
                <Link href={ctaHref}>
                  {ctaText}
                  <FiArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>

          <nav className="flex flex-wrap items-center gap-2">
            <details className="relative">
              <summary
                className={cn(
                  "list-none cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition",
                  active === "services"
                    ? "bg-cyan-900 text-cyan-50"
                    : "text-slate-700 hover:bg-cyan-50 hover:text-cyan-900 dark:text-slate-200 dark:hover:bg-cyan-900/30 dark:hover:text-cyan-100",
                )}
              >
                <span className="inline-flex items-center gap-2">
                  <ServicesIcon className="size-4 shrink-0" />
                  {copy.nav.services}
                  <FiChevronDown className="size-3.5 shrink-0" />
                </span>
              </summary>
              <div className="absolute left-0 top-12 z-20 w-[22rem] rounded-2xl border border-cyan-100 bg-white/72 p-3 shadow-xl backdrop-blur-md dark:border-cyan-900/50 dark:bg-slate-900/72">
                <Link
                  href="/services"
                  className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-semibold text-cyan-900 hover:bg-cyan-50 dark:text-cyan-200 dark:hover:bg-cyan-900/40"
                >
                  <span className="inline-flex items-center gap-2">
                    <ServicesIcon className="size-4 shrink-0" />
                    {copy.sections.servicesMenuViewAll}
                  </span>
                  <FiArrowRight className="size-4" />
                </Link>
                <div className="mt-1 grid gap-1">
                  {services.map((service) => {
                    const ServiceIcon = getServiceIcon(service.slug);
                    return (
                      <Link
                        key={service.slug}
                        href={`/services/${service.slug}`}
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-cyan-50 hover:text-cyan-900 dark:text-slate-200 dark:hover:bg-cyan-900/30 dark:hover:text-cyan-100"
                      >
                        <ServiceIcon className="size-4 shrink-0 text-cyan-700 dark:text-cyan-300" />
                        {service.menuLabel}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </details>

            {topLinks.map((link) => (
              <NavLink
                key={link.key}
                href={link.href}
                label={copy.nav[link.key]}
                active={active === link.key}
                icon={navIcons[link.key as NavIconKey]}
              />
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6">{children}</main>

      <footer className="border-t border-cyan-100 bg-white/62 backdrop-blur-md dark:border-cyan-900/50 dark:bg-slate-950/62">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-slate-600 dark:text-slate-300 md:flex-row md:items-center md:justify-between md:px-6">
          <div className="space-y-2">
            <p>{footerText}</p>
            <p className="font-medium text-slate-700 dark:text-slate-200">{heritageStatement}</p>
            {contactEmail || contactPhone || contactAddress ? (
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-700 dark:text-slate-200">
                {contactEmail ? (
                  <a href={`mailto:${contactEmail}`} className="inline-flex items-center gap-1.5 hover:text-cyan-700 dark:hover:text-cyan-300">
                    <FiMail className="size-3.5" />
                    {contactEmail}
                  </a>
                ) : null}
                {contactPhone ? (
                  <a
                    href={contactPhoneHref || undefined}
                    className="inline-flex items-center gap-1.5 hover:text-cyan-700 dark:hover:text-cyan-300"
                  >
                    <FiPhone className="size-3.5" />
                    {contactPhone}
                  </a>
                ) : null}
                {contactAddress ? (
                  <span className="inline-flex items-center gap-1.5">
                    <FiMapPin className="size-3.5" />
                    {contactAddress}
                  </span>
                ) : null}
              </div>
            ) : null}
            {socialLinks.length ? (
              <div className="flex flex-wrap items-center gap-2">
                {socialLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.key}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={item.label}
                      className="inline-flex size-8 items-center justify-center rounded-full border border-cyan-200 bg-white/72 text-cyan-900 transition hover:border-cyan-400 hover:text-cyan-700 dark:border-cyan-800 dark:bg-slate-900/70 dark:text-cyan-200 dark:hover:border-cyan-600"
                    >
                      <Icon className="size-4" />
                    </a>
                  );
                })}
              </div>
            ) : null}
          </div>
          <p>{footerCopyright}</p>
        </div>
      </footer>
    </div>
  );
}

