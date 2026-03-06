import { z } from "zod";

const optionalUrlSchema = z
  .string()
  .trim()
  .max(2048, "URL is too long.")
  .refine(
    (value) => value.length === 0 || /^https?:\/\/.+/i.test(value),
    "Must be a valid URL starting with http:// or https://",
  );

const optionalEmailSchema = z
  .string()
  .trim()
  .max(320, "Email is too long.")
  .refine(
    (value) => value.length === 0 || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    "Must be a valid email address.",
  );

export const generalSettingsSchema = z.object({
  siteName: z.string().trim().min(1, "Site name is required.").max(120),
  tagline: z.string().trim().max(180).default(""),
  companyName: z.string().trim().max(180).default(""),
  email: optionalEmailSchema.default(""),
  phone: z.string().trim().max(60).default(""),
  address: z.string().trim().max(240).default(""),
});

export const brandingSettingsSchema = z.object({
  logoUrl: optionalUrlSchema.default(""),
  faviconUrl: optionalUrlSchema.default(""),
  ogImageUrl: optionalUrlSchema.default(""),
});

export const homepageSettingsSchema = z.object({
  heroTitle: z.string().trim().max(180).default(""),
  heroSubtitle: z.string().trim().max(500).default(""),
  ctaText: z.string().trim().max(80).default(""),
  ctaLink: z.string().trim().max(300).default(""),
  backgroundImageUrl: optionalUrlSchema.default(""),
});

export const seoSettingsSchema = z.object({
  defaultTitle: z.string().trim().max(180).default(""),
  defaultDescription: z.string().trim().max(320).default(""),
  keywords: z.array(z.string().trim().min(1).max(60)).max(40).default([]),
  canonicalUrl: optionalUrlSchema.default(""),
});

export const socialSettingsSchema = z.object({
  facebook: optionalUrlSchema.default(""),
  instagram: optionalUrlSchema.default(""),
  linkedin: optionalUrlSchema.default(""),
  youtube: optionalUrlSchema.default(""),
  tiktok: optionalUrlSchema.default(""),
  whatsapp: z.string().trim().max(120).default(""),
});

export const themeSettingsSchema = z.object({
  defaultTheme: z.enum(["system", "light", "dark"]).default("system"),
  allowThemeToggle: z.boolean().default(true),
});

export const featureToggleSettingsSchema = z.object({
  enableBooking: z.boolean().default(false),
  enableTestimonials: z.boolean().default(true),
  enableBlog: z.boolean().default(false),
  enableChatButton: z.boolean().default(false),
  enableAnnouncementBar: z.boolean().default(false),
});

export const footerSettingsSchema = z.object({
  copyright: z.string().trim().max(180).default(""),
  footerText: z.string().trim().max(320).default(""),
});

export const formsSettingsSchema = z.object({
  destinationEmail: optionalEmailSchema.default(""),
  webhookUrl: optionalUrlSchema.default(""),
  enableAutoresponder: z.boolean().default(false),
});

export const siteSettingsSchema = z.object({
  general: generalSettingsSchema,
  branding: brandingSettingsSchema,
  homepage: homepageSettingsSchema,
  seo: seoSettingsSchema,
  social: socialSettingsSchema,
  theme: themeSettingsSchema,
  features: featureToggleSettingsSchema,
  footer: footerSettingsSchema,
  forms: formsSettingsSchema,
});

export const siteSettingsPatchSchema = z
  .object({
    general: generalSettingsSchema.partial().optional(),
    branding: brandingSettingsSchema.partial().optional(),
    homepage: homepageSettingsSchema.partial().optional(),
    seo: seoSettingsSchema.partial().optional(),
    social: socialSettingsSchema.partial().optional(),
    theme: themeSettingsSchema.partial().optional(),
    features: featureToggleSettingsSchema.partial().optional(),
    footer: footerSettingsSchema.partial().optional(),
    forms: formsSettingsSchema.partial().optional(),
  })
  .strict();

export type SiteSettings = z.infer<typeof siteSettingsSchema>;
export type SiteSettingsPatch = z.infer<typeof siteSettingsPatchSchema>;

export const defaultSiteSettings: SiteSettings = {
  general: {
    siteName: "Earthy Raw Technologies",
    tagline: "Comprehensive office IT and infrastructure delivery.",
    companyName: "Earthy Raw Technologies",
    email: "",
    phone: "",
    address: "",
  },
  branding: {
    logoUrl: "",
    faviconUrl: "",
    ogImageUrl: "",
  },
  homepage: {
    heroTitle: "Modern IT for real offices built for reliability and security.",
    heroSubtitle:
      "Software, infrastructure, support, and on-site execution from one team.",
    ctaText: "Schedule Assessment",
    ctaLink: "/contact",
    backgroundImageUrl: "",
  },
  seo: {
    defaultTitle: "Comprehensive IT Services + On-Site Office Modifications",
    defaultDescription:
      "End-to-end IT for offices: software, servers, networks, security, backups, support, SOPs, email/DNS, and on-site modifications.",
    keywords: ["it services", "office infrastructure", "network support"],
    canonicalUrl: "",
  },
  social: {
    facebook: "",
    instagram: "",
    linkedin: "",
    youtube: "",
    tiktok: "",
    whatsapp: "",
  },
  theme: {
    defaultTheme: "system",
    allowThemeToggle: true,
  },
  features: {
    enableBooking: false,
    enableTestimonials: true,
    enableBlog: false,
    enableChatButton: false,
    enableAnnouncementBar: false,
  },
  footer: {
    copyright: "(c) Earthy Raw Technologies",
    footerText: "Comprehensive IT services, support, and installation execution.",
  },
  forms: {
    destinationEmail: "",
    webhookUrl: "",
    enableAutoresponder: false,
  },
};

