import {
  aboutPage,
  contactPage,
  faqPage,
  homePage,
  pricingPage,
  processPage,
  servicePageBySlug,
  servicePages,
} from "@/lib/site-content";
import {
  aboutPageEs,
  contactPageEs,
  faqPageEs,
  homePageEs,
  pricingPageEs,
  processPageEs,
  servicePageBySlugEs,
  servicePagesEs,
} from "@/lib/site-content-es";
import type { SiteLanguage } from "@/lib/i18n";
import type { ServicePage, StandardPage } from "@/lib/site-content";

type HomePageModel = typeof homePage;

type LocalizedContentBundle = {
  home: HomePageModel;
  services: ServicePage[];
  serviceBySlug: Record<string, ServicePage>;
  process: StandardPage;
  pricing: StandardPage;
  contact: StandardPage;
  faq: StandardPage;
  about: StandardPage;
  issues: readonly string[];
};

const issuesEn = [
  "Slow computers",
  "Network/Wi-Fi problems",
  "Backup concerns",
  "Email issues",
  "Security concerns",
  "Need automation/software",
  "VPN/remote access",
  "Office cabling / cable management",
  "Electrical load / UPS planning",
  "Office modifications needed (conduit/tubes, wall/ceiling access)",
  "Repairs (drywall/gypsum, carpentry, masonry, welding, cabinetmaking, plumbing-related needs)",
] as const;

const issuesEs = [
  "Computadoras lentas",
  "Problemas de red/Wi-Fi",
  "Preocupaciones de respaldo",
  "Problemas de correo",
  "Preocupaciones de seguridad",
  "Necesidad de automatizacion/software",
  "VPN/acceso remoto",
  "Cableado y gestion de cables en oficina",
  "Carga electrica/planificacion UPS",
  "Modificaciones de oficina (conduit/tubos, acceso pared/cielo)",
  "Reparaciones (drywall/gypsum, carpinteria, albanileria, soldadura, ebanisteria, necesidades de plomeria)",
] as const;

const bundleEn: LocalizedContentBundle = {
  home: homePage,
  services: servicePages,
  serviceBySlug: servicePageBySlug,
  process: processPage,
  pricing: pricingPage,
  contact: contactPage,
  faq: faqPage,
  about: aboutPage,
  issues: issuesEn,
};

const bundleEs: LocalizedContentBundle = {
  home: homePageEs,
  services: servicePagesEs,
  serviceBySlug: servicePageBySlugEs,
  process: processPageEs,
  pricing: pricingPageEs,
  contact: contactPageEs,
  faq: faqPageEs,
  about: aboutPageEs,
  issues: issuesEs,
};

export function getLocalizedContent(language: SiteLanguage): LocalizedContentBundle {
  return language === "es" ? bundleEs : bundleEn;
}

