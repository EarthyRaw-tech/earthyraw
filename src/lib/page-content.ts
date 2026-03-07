import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import { buildNoIndexMetadata } from "@/lib/seo";

type PageKey = "home" | "legacyHome" | "legacyLatest";

const PAGE_CONFIG: Record<
  PageKey,
  { htmlPath: string; cssPath: string; metadata: Metadata }
> = {
  home: {
    htmlPath: "src/content/home.html",
    cssPath: "src/content/home.css",
    metadata: {
      title:
        "TechCare Infrastructure - IT & Office Solutions for Medical & Professional Offices",
      description:
        "Comprehensive IT and infrastructure services for medical and professional offices. From software development to cable management and office modifications.",
    },
  },
  legacyHome: {
    htmlPath: "src/content/legacy_site.html",
    cssPath: "src/content/legacy_site.css",
    metadata: buildNoIndexMetadata(
      "Earthy Raw Technologies - Legacy Home",
      "Legacy copy of the original Earthy Raw homepage.",
    ),
  },
  legacyLatest: {
    htmlPath: "src/content/legacy_latest.html",
    cssPath: "src/content/legacy_latest.css",
    metadata: buildNoIndexMetadata(
      "Earthy Raw Technologies - Legacy Latest",
      "Legacy copy of the latest Earthy Raw variation.",
    ),
  },
};

export function getPageBundle(key: PageKey) {
  const config = PAGE_CONFIG[key];
  return {
    html: readFileSync(join(process.cwd(), config.htmlPath), "utf8"),
    css: readFileSync(join(process.cwd(), config.cssPath), "utf8"),
  };
}

export function getPageMetadata(key: PageKey): Metadata {
  return PAGE_CONFIG[key].metadata;
}
