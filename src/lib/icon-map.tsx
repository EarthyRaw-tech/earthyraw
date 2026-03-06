import type { IconType } from "react-icons";
import {
  FiActivity,
  FiAlertCircle,
  FiBookOpen,
  FiCheckCircle,
  FiCode,
  FiCpu,
  FiDollarSign,
  FiFileText,
  FiFolder,
  FiGitBranch,
  FiGlobe,
  FiGrid,
  FiHardDrive,
  FiHelpCircle,
  FiHome,
  FiInfo,
  FiLayers,
  FiMonitor,
  FiPhoneCall,
  FiShield,
  FiTool,
  FiWifi,
  FiZap,
} from "react-icons/fi";

export type NavIconKey =
  | "home"
  | "services"
  | "process"
  | "pricing"
  | "contact"
  | "about"
  | "faq";

export const navIcons: Record<NavIconKey, IconType> = {
  home: FiHome,
  services: FiGrid,
  process: FiGitBranch,
  pricing: FiDollarSign,
  contact: FiPhoneCall,
  about: FiInfo,
  faq: FiHelpCircle,
};

const serviceIcons: Record<string, IconType> = {
  "programming-automation": FiCode,
  "server-technical-services": FiCpu,
  "desktop-end-user-support": FiMonitor,
  "network-infrastructure-vpn": FiWifi,
  "backup-disaster-recovery": FiHardDrive,
  "electrical-it-power-safety-onsite-construction": FiZap,
  "sops-documentation": FiBookOpen,
  "web-presence-communication": FiGlobe,
};

export function getServiceIcon(slug: string): IconType {
  return serviceIcons[slug] ?? FiLayers;
}

export function getCoverageIcon(label: string): IconType {
  const text = label.toLowerCase();

  if (
    text.includes("programming") ||
    text.includes("automation") ||
    text.includes("programacion") ||
    text.includes("automatizacion")
  ) {
    return FiCode;
  }
  if (text.includes("server") || text.includes("servidor")) return FiCpu;
  if (
    text.includes("desktop") ||
    text.includes("end-user") ||
    text.includes("usuario final")
  ) {
    return FiMonitor;
  }
  if (text.includes("network") || text.includes("vpn") || text.includes("red")) {
    return FiWifi;
  }
  if (
    text.includes("backup") ||
    text.includes("recovery") ||
    text.includes("respaldo") ||
    text.includes("recuperacion")
  ) {
    return FiHardDrive;
  }
  if (
    text.includes("electrical") ||
    text.includes("power") ||
    text.includes("electrica")
  ) {
    return FiZap;
  }
  if (
    text.includes("on-site") ||
    text.includes("repair") ||
    text.includes("modificaciones") ||
    text.includes("reparaciones")
  ) {
    return FiTool;
  }
  if (
    text.includes("sop") ||
    text.includes("documentation") ||
    text.includes("documentacion")
  ) {
    return FiBookOpen;
  }
  if (
    text.includes("web") ||
    text.includes("communication") ||
    text.includes("comunicacion")
  ) {
    return FiGlobe;
  }

  return FiLayers;
}

export function getSectionIcon(title: string): IconType {
  const text = title.toLowerCase();

  if (text.includes("solve") || text.includes("matters")) return FiAlertCircle;
  if (text.includes("build") || text.includes("create")) return FiTool;
  if (text.includes("integrations")) return FiGitBranch;
  if (text.includes("assessment") || text.includes("review")) return FiActivity;
  if (text.includes("deliverables")) return FiFileText;
  if (text.includes("outcome")) return FiCheckCircle;
  if (text.includes("faq")) return FiHelpCircle;
  if (text.includes("pricing")) return FiDollarSign;
  if (text.includes("topics")) return FiFolder;

  return FiShield;
}
