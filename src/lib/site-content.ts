export type ContentSection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  note?: string;
};

export type ServicePage = {
  slug: string;
  menuLabel: string;
  seoTitle: string;
  metaDescription: string;
  headline: string;
  intro: string;
  sections: ContentSection[];
};

export type StandardPage = {
  seoTitle: string;
  metaDescription: string;
  headline: string;
  intro: string;
  sections: ContentSection[];
};

export const servicePages: ServicePage[] = [
  {
    slug: "programming-automation",
    menuLabel: "Programming & Automation",
    seoTitle:
      "Programming & Automation — Custom Tools to Improve Office Workflows",
    metaDescription:
      "Custom software development and automation: dashboards, internal tools, workflow automation, integrations, and ongoing improvements designed for office operations.",
    headline:
      "Custom software that removes manual work and improves accuracy.",
    intro:
      "We build practical tools for offices that need cleaner workflows, fewer manual tasks, and better operational visibility.",
    sections: [
      {
        title: "What This Solves",
        bullets: [
          "Repetitive manual entry",
          "Disconnected spreadsheets and inconsistent processes",
          "Too much time spent tracking tasks, documents, and requests",
          "Lack of visibility due to missing dashboards and reporting",
        ],
      },
      {
        title: "What We Build",
        bullets: [
          "Internal dashboards for operations visibility",
          "Request and intake forms connected to workflow tracking",
          "Staff tools for scheduling, task assignments, and status updates",
          "Automation for notifications and approvals",
          "Simple portals for customers or staff when needed",
        ],
      },
      {
        title: "Integrations",
        paragraphs: [
          "We connect systems based on available vendor APIs and access levels to reduce duplicate entry and improve flow between tools.",
        ],
      },
      {
        title: "Deliverables",
        bullets: [
          "Requirements and workflow mapping",
          "Database design when needed",
          "Web UI and admin panels",
          "Role-based access controls when required",
          "Documentation and handoff notes",
          "Optional maintenance plan",
        ],
      },
      {
        title: "Outcome",
        paragraphs: [
          "Faster processes, fewer errors, better tracking, and less dependence on a single person managing spreadsheets.",
        ],
      },
    ],
  },
  {
    slug: "server-technical-services",
    menuLabel: "Server Technical Services",
    seoTitle: "Server Technical Services — Stability, Security, and Maintainability",
    metaDescription:
      "Server installation, configuration, maintenance, patching, security hardening, remote configuration, and environment assessment for reliable office systems.",
    headline: "Servers that stay stable because they are maintained correctly.",
    intro:
      "We stabilize and secure server environments so offices can operate without recurring outages and avoidable incidents.",
    sections: [
      {
        title: "What This Covers",
        bullets: [
          "Server installation and configuration",
          "Patch management and updates",
          "Security hardening with practical controls",
          "Performance and reliability tuning",
          "Secure remote administration when needed",
        ],
      },
      {
        title: "Environment Assessment",
        bullets: [
          "Dust and humidity risk",
          "Airflow and temperature concerns",
          "Physical access control",
          "Cable organization and safe placement",
        ],
      },
      {
        title: "Deliverables",
        bullets: [
          "Current-state review of hardware, OS, roles, services, and storage",
          "Risk and priority list",
          "Implementation plan for patching, access controls, and backup",
          "Configuration and maintenance documentation",
        ],
      },
      {
        title: "Outcome",
        paragraphs: [
          "Less downtime, fewer surprises, and a server environment your team can support long-term.",
        ],
      },
    ],
  },
  {
    slug: "desktop-end-user-support",
    menuLabel: "Desktop & End-User Support",
    seoTitle: "Desktop Support — Helpdesk, Standardization, and Staff Training",
    metaDescription:
      "Responsive desktop support: troubleshooting, software management, workstation standardization, user training, plus laptop and mobile device support.",
    headline:
      "Support that reduces downtime instead of creating endless tickets.",
    intro:
      "We provide responsive support and workstation standards that keep teams productive and reduce repeated issues.",
    sections: [
      {
        title: "What We Handle",
        bullets: [
          "Daily troubleshooting",
          "Software installation and updates",
          "Standardized workstation setup",
          "Printer, scanner, and peripheral issues",
          "Laptop and mobile device support",
        ],
      },
      {
        title: "End-User Training",
        paragraphs: [
          "We provide practical user training so teams work faster, avoid common mistakes, and know how to triage issues before opening support requests.",
        ],
      },
      {
        title: "Deliverables",
        bullets: [
          "Defined support process and request handling",
          "Recommended workstation baseline",
          "Documentation of common fixes",
          "Optional onboarding and offboarding workflows",
        ],
      },
      {
        title: "Outcome",
        paragraphs: [
          "Fewer interruptions and better confidence across the office.",
        ],
      },
    ],
  },
  {
    slug: "network-infrastructure-vpn",
    menuLabel: "Network Infrastructure & VPN",
    seoTitle: "Network Infrastructure & VPN — Secure, Reliable Connectivity",
    metaDescription:
      "Network design, firewall/router configuration, cable management, segmentation/VLANs, periodic assessments, and secure VPN remote access.",
    headline: "A network designed for reliability, not luck.",
    intro:
      "We design and maintain office networks that prioritize uptime, secure access, and long-term maintainability.",
    sections: [
      {
        title: "What We Do",
        bullets: [
          "Network design and implementation",
          "Firewall and router configuration",
          "Wi-Fi planning and improvements",
          "VLANs and segmentation when appropriate",
          "Cable management and organized network areas",
          "Periodic network reviews and cleanup",
        ],
      },
      {
        title: "VPN Secure Remote Access",
        bullets: [
          "VPN setup for remote staff",
          "Site-to-site secure connectivity when needed",
          "Access controls to restrict internal system access",
        ],
      },
      {
        title: "Deliverables",
        bullets: [
          "Network assessment summary",
          "Prioritized fixes and improvements",
          "Configuration documentation",
          "As-built notes for physical and logical topology",
        ],
      },
      {
        title: "Outcome",
        paragraphs: [
          "Fewer outages, better performance, and safer remote access.",
        ],
      },
    ],
  },
  {
    slug: "backup-disaster-recovery",
    menuLabel: "Backup & Disaster Recovery",
    seoTitle: "Backup & Disaster Recovery — Protect Data and Reduce Downtime",
    metaDescription:
      "Reliable backups, verification, retention planning, and practical disaster recovery strategy for office systems, servers, and critical data.",
    headline: "Backups that work and a plan to recover fast.",
    intro:
      "We implement realistic backup and disaster recovery programs with clear recovery priorities and routine verification.",
    sections: [
      {
        title: "What We Implement",
        bullets: [
          "Backup strategy based on business-critical systems",
          "Backup destination and retention guidance",
          "Verification routines and recurring checks",
          "Recovery planning for restore order and execution",
        ],
      },
      {
        title: "Why This Matters",
        paragraphs: [
          "Many offices discover backup gaps only during incidents. We focus on clarity, verification, and repeatable recovery steps.",
        ],
      },
      {
        title: "Deliverables",
        bullets: [
          "Backup scope and protection map",
          "Recovery priorities and step-by-step workflow",
          "SOP for backup verification",
          "Recommended review schedule",
        ],
      },
      {
        title: "Outcome",
        paragraphs: [
          "Reduced data-loss risk and predictable recovery when incidents happen.",
        ],
      },
    ],
  },
  {
    slug: "electrical-it-power-safety-onsite-construction",
    menuLabel: "Electrical & IT Power Safety + On-Site Construction",
    seoTitle: "Electrical + On-Site Office Modifications for IT Installations",
    metaDescription:
      "IT power safety checks, load analysis, UPS guidance, and in-house office modifications for routing conduit/tubes/cables, repairs, and installation finishing.",
    headline:
      "We do not just recommend upgrades. We complete the physical work needed to install them correctly.",
    intro:
      "Our team combines IT infrastructure execution with in-house certified construction technician capability for office installation requirements.",
    sections: [
      {
        title: "Electrical and IT Power Safety",
        bullets: [
          "Circuit load analysis for IT equipment",
          "Power strip and multiplug assessment with replacement guidance",
          "Power distribution layout improvements",
          "UPS sizing and placement recommendations on request",
        ],
      },
      {
        title: "In-House Office Modifications",
        bullets: [
          "Wall and ceiling access with restoration for routing",
          "Conduit or tubing pathways for structured cabling",
          "Cable route creation, finishing, and cleanup",
          "General office repairs related to technology upgrades",
        ],
      },
      {
        title: "Construction Trades Supported",
        bullets: [
          "Electrical work for IT-related safety and layout",
          "Masonry",
          "Carpentry",
          "Gypsum board and drywall",
          "Plumbing support related to installations",
          "Welding",
          "Cabinetmaking",
        ],
        note:
          "When work requires licensed trades, permits, inspections, or engineering approval, we coordinate or recommend the appropriate specialist.",
      },
      {
        title: "Outcome",
        paragraphs: [
          "Faster project completion, fewer vendors, and cleaner installations with better long-term maintainability.",
        ],
      },
    ],
  },
  {
    slug: "sops-documentation",
    menuLabel: "SOPs & Documentation",
    seoTitle:
      "SOPs & Documentation — Repeatable Processes and Operational Control",
    metaDescription:
      "SOPs and documentation aligned to office needs: backups, patching, access control, onboarding/offboarding, remote support, and repeatable IT controls.",
    headline: "Documentation that keeps your office stable even when staff changes.",
    intro:
      "We produce practical SOPs and operational documentation aligned to your day-to-day reality and compliance expectations.",
    sections: [
      {
        title: "What We Create",
        bullets: [
          "SOPs tied to real operations and compliance needs",
          "Documentation for repeatable IT tasks and controls",
        ],
      },
      {
        title: "Common SOP Topics",
        bullets: [
          "User onboarding and offboarding",
          "Password and access control practices",
          "Backup verification workflows",
          "Patch and update routines",
          "Remote access and safe support rules",
          "Change control for system updates",
        ],
      },
      {
        title: "Deliverables",
        bullets: [
          "Step-by-step SOP documents",
          "Ownership assignment by role",
          "Suggested review cadence",
        ],
      },
      {
        title: "Outcome",
        paragraphs: [
          "Operational consistency, lower risk, and smoother transitions during staff changes.",
        ],
      },
    ],
  },
  {
    slug: "web-presence-communication",
    menuLabel: "Web Presence & Communication",
    seoTitle: "Web Presence — Domain/DNS, Website, and Secure Email Setup",
    metaDescription:
      "Domain and DNS management, website setup/maintenance, secure email configuration and management, plus deliverability guidance when needed.",
    headline: "Professional online presence and reliable communication configured correctly.",
    intro:
      "We manage domains, DNS, websites, and email so offices remain reachable and present a consistent professional image.",
    sections: [
      {
        title: "Domain and DNS",
        bullets: [
          "Domain configuration and DNS management",
          "Change control to prevent DNS-caused outages",
        ],
      },
      {
        title: "Website",
        bullets: [
          "Professional website setup and maintenance",
          "Core page architecture and contact flow",
          "Content updates and ongoing changes",
        ],
      },
      {
        title: "Email Services",
        bullets: [
          "Secure email setup and management",
          "Sending and receiving reliability support",
          "Deliverability guidance including SPF, DKIM, and DMARC basics",
        ],
      },
      {
        title: "Outcome",
        paragraphs: [
          "Stable communication channels and fewer domain or email disruptions.",
        ],
      },
    ],
  },
];

export const servicePageBySlug = Object.fromEntries(
  servicePages.map((service) => [service.slug, service]),
) as Record<string, ServicePage>;

export const processPage: StandardPage = {
  seoTitle:
    "Process — On-Site Assessment → Action Plan → Implementation + Support",
  metaDescription:
    "We start with an on-site assessment to understand workflows and infrastructure, then deliver a prioritized plan and implement improvements with documentation.",
  headline: "A practical three-step process that keeps projects clear and executable.",
  intro:
    "We combine business workflow analysis with infrastructure reality so recommendations are implementable in real office environments.",
  sections: [
    {
      title: "Step 1 — Initial On-Site Assessment",
      bullets: [
        "Daily workflows and pain points",
        "Staff feedback and operational blockers",
        "Hardware, software, and network architecture",
        "Server environment including dust, humidity, airflow, and access",
        "Electrical loads, multiplugs, and power layout",
        "Cabling pathways and routing options",
        "SOP and documentation requirements",
      ],
    },
    {
      title: "Step 2 — Action Plan",
      bullets: [
        "Quick wins",
        "Security and backup risk priorities",
        "Medium-term reliability and scalability roadmap",
        "Budget-aligned options",
      ],
    },
    {
      title: "Step 3 — Implementation + Support",
      bullets: [
        "Execute improvements",
        "Document all changes",
        "Standardize systems and controls",
        "Provide ongoing support to maintain stability",
      ],
    },
  ],
};

export const pricingPage: StandardPage = {
  seoTitle: "Pricing — Transparent Scope After On-Site Assessment",
  metaDescription:
    "Pricing depends on scope. After an assessment, we provide a clear breakdown for one-time projects, ongoing support, and add-ons.",
  headline: "Transparent pricing based on actual scope.",
  intro:
    "After the assessment, you receive a clear breakdown so you only pay for what your environment actually needs.",
  sections: [
    {
      title: "One-Time Projects",
      bullets: [
        "Server setup and stabilization",
        "Network improvements and VPN deployment",
        "Backup and recovery implementation",
        "Cabling organization and pathway work",
        "Office modifications needed for installations",
      ],
    },
    {
      title: "Ongoing Support",
      bullets: [
        "Helpdesk support",
        "Maintenance and patching",
        "Backup verification routines",
        "Periodic network and security reviews",
        "Documentation updates",
      ],
    },
    {
      title: "Add-Ons",
      bullets: [
        "SOP development",
        "Website, domain, and email management",
        "Expanded automation and custom software",
      ],
    },
  ],
};

export const contactPage: StandardPage = {
  seoTitle: "Contact — Schedule an On-Site Assessment or Request a Quote",
  metaDescription:
    "Contact us to schedule an assessment or request a quote for IT services, servers, networks, security, backups, SOPs, email/DNS, and office modifications for clean installs.",
  headline: "Tell us what you need. We will respond with clear next steps.",
  intro:
    "Use this intake structure so we can scope your environment accurately and respond with useful recommendations.",
  sections: [
    {
      title: "Recommended Form Fields",
      bullets: [
        "Name and role",
        "Company",
        "Phone and email",
        "Number of users and PCs",
        "Server present (yes/no)",
      ],
    },
    {
      title: "Issues Checklist",
      bullets: [
        "Slow computers",
        "Network or Wi-Fi problems",
        "Backup concerns",
        "Email issues",
        "Security concerns",
        "Need automation or software",
        "VPN and remote access",
        "Office cabling and cable management",
        "Electrical load and UPS planning",
        "Office modifications needed for routing",
        "Repairs related to drywall, carpentry, masonry, welding, cabinetmaking, or plumbing support",
      ],
    },
  ],
};

export const faqPage: StandardPage = {
  seoTitle: "FAQ — IT Support, Security, Backups, and On-Site Modifications",
  metaDescription:
    "Common questions about our IT services, assessment process, support model, documentation, and on-site installation modifications.",
  headline: "Frequently asked questions.",
  intro:
    "Direct answers to the most common questions about service scope, delivery model, and implementation requirements.",
  sections: [
    {
      title: "Do you offer both on-site and remote support?",
      paragraphs: [
        "Yes. We use remote support for speed and schedule on-site visits when physical work or direct inspection is needed.",
      ],
    },
    {
      title: "Do you do cabling and cable pathway work?",
      paragraphs: [
        "Yes. We handle cable routing, organization, and pathway work including conduit or tubing when needed.",
      ],
    },
    {
      title: "Do you provide documentation and SOPs?",
      paragraphs: [
        "Yes. SOP creation and operational documentation are core services to keep environments stable.",
      ],
    },
    {
      title: "How do you price projects?",
      paragraphs: [
        "After assessment, we provide a clear scope-based breakdown.",
      ],
    },
    {
      title: "Do you do construction work too?",
      paragraphs: [
        "Yes. We provide in-house certified construction technician capability for common installation-related modifications. When tasks require licensed trades, permits, inspections, or engineering sign-off, we coordinate the appropriate specialist.",
      ],
    },
  ],
};

export const aboutPage: StandardPage = {
  seoTitle: "About — Comprehensive Office IT + Infrastructure Delivery",
  metaDescription:
    "We combine software, infrastructure, security, support, and office modification capability to deliver complete IT outcomes for medical and professional offices.",
  headline: "One team for software, infrastructure, support, and installation execution.",
  intro:
    "We work best with offices that need predictable operations, secure systems, and practical execution from planning through deployment.",
  sections: [
    {
      title: "Best Fit Environments",
      bullets: [
        "Medical and professional offices",
        "Multi-workstation environments with servers, scanners, and printers",
        "Businesses needing secure remote access and responsive support",
      ],
    },
    {
      title: "What Makes Us Different",
      bullets: [
        "End-to-end delivery from software to infrastructure",
        "Security and reliability built into implementation",
        "Documentation and SOP discipline",
        "In-house office modification capability to avoid vendor delays",
      ],
    },
  ],
};

export const homePage = {
  seoTitle: "Comprehensive IT Services + On-Site Office Modifications",
  metaDescription:
    "End-to-end IT for offices: software, servers, networks, security, backups, support, SOPs, email/DNS, plus in-house office modifications to complete installs cleanly.",
  heroHeadline:
    "Modern IT for real offices built for reliability and security.",
  heroIntro:
    "We deliver software, infrastructure, and support that reduce downtime and improve operations. We also provide in-house certified construction technician capability to complete common office modifications required for clean IT installations, so projects do not stall waiting on extra vendors.",
  whatWeDo:
    "We support offices that need reliable day-to-day operations, secure systems, consistent support, and a single team that can execute both IT work and required on-site modifications.",
  outcomes: [
    "Fewer interruptions and random failures",
    "Cleaner infrastructure with organized cabling and documented systems",
    "Reduced security risk through practical controls",
    "Faster workflows through automation and better tools",
    "A plan that scales as the office grows",
  ],
  fullStackCoverage: [
    "Programming & Automation",
    "Server Technical Services",
    "Desktop & End-User Support",
    "Network Infrastructure & VPN",
    "Backup & Disaster Recovery",
    "Electrical & IT Power Safety",
    "On-Site Office Modifications & Repairs",
    "SOPs & Documentation",
    "Web Presence & Communication",
  ],
  processSteps: [
    "On-Site Assessment of systems, workflows, environment, power, and cabling pathways",
    "Action Plan with priorities, options, and scope",
    "Implementation plus ongoing support with documented changes",
  ],
  bestFit: [
    "Medical and professional offices",
    "Multi-workstation environments with servers, printers, and scanners",
    "Businesses needing secure remote access and responsive support",
  ],
};
