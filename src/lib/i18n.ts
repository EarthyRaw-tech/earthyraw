export type SiteLanguage = "en" | "es";
export type MotionIntensity = "subtle" | "medium" | "strong";

export function isSiteLanguage(value: string): value is SiteLanguage {
  return value === "en" || value === "es";
}

export const uiCopy = {
  en: {
    nav: {
      home: "Home",
      services: "Services",
      process: "Process",
      pricing: "Pricing",
      contact: "Contact",
      about: "About",
      faq: "FAQ",
    },
    actions: {
      scheduleAssessment: "Schedule Assessment",
      scheduleOnsite: "Schedule an On-Site Assessment",
      requestQuote: "Request a Quote",
      viewServiceHub: "View Service Hub",
      viewDetails: "View details",
      submitRequest: "Submit Request",
      startAssessment: "Start with an on-site assessment.",
      viewProcess: "View Process",
    },
    sections: {
      comprehensiveDelivery: "Comprehensive IT Delivery",
      whatWeDo: "What We Do",
      howWeWork: "How We Work",
      outcomes: "Outcomes You Can Expect",
      bestFit: "Best Fit",
      fullStack: "What We Cover (Full Stack)",
      detailedServices: "Detailed Service Pages",
      detailedServicesIntro:
        "Each section below has its own dedicated page with scope, deliverables, and outcomes.",
      moreSections: "More Site Sections",
      servicesOverview: "Services Overview",
      serviceAreas: "Service Areas",
      oneTimeProjects: "One-time projects",
      oneTimeProjectsIntro: "Fix, upgrade, migrate, or install.",
      ongoingSupport: "Ongoing support",
      ongoingSupportIntro:
        "Helpdesk, patching, backup checks, and periodic reviews.",
      hybridDelivery: "Hybrid delivery",
      hybridDeliveryIntro:
        "Project implementation followed by a monthly stability plan.",
      startAssessmentIntro:
        "We identify quick wins, risk items, and priority actions before work starts.",
      faq: "FAQ",
      contact: "Contact",
      issueChecklist: "Issues checklist",
      message: "Message",
      servicesMenuViewAll: "View All Services",
      footerTagline:
        "Comprehensive IT services, support, and installation execution for real offices.",
      language: "Language",
      theme: "Theme",
      motion: "Motion",
      light: "Light",
      dark: "Dark",
      subtle: "Subtle",
      medium: "Medium",
      strong: "Strong",
      english: "English",
      spanish: "Spanish",
      tellUs:
        "Tell us about your environment and current priorities.",
      serviceDetail: "Service Detail",
    },
    fields: {
      nameRole: "Name / Role",
      company: "Company",
      phone: "Phone",
      email: "Email",
      usersPcs: "Number of users / PCs",
      hasServer: "Do you have a server?",
      yes: "Yes",
      no: "No",
    },
  },
  es: {
    nav: {
      home: "Inicio",
      services: "Servicios",
      process: "Proceso",
      pricing: "Precios",
      contact: "Contacto",
      about: "Nosotros",
      faq: "Preguntas",
    },
    actions: {
      scheduleAssessment: "Agendar evaluacion",
      scheduleOnsite: "Agendar evaluacion en sitio",
      requestQuote: "Solicitar cotizacion",
      viewServiceHub: "Ver servicios",
      viewDetails: "Ver detalles",
      submitRequest: "Enviar solicitud",
      startAssessment: "Comienza con una evaluacion en sitio.",
      viewProcess: "Ver proceso",
    },
    sections: {
      comprehensiveDelivery: "Entrega integral de TI",
      whatWeDo: "Que hacemos",
      howWeWork: "Como trabajamos",
      outcomes: "Resultados esperados",
      bestFit: "Ideal para",
      fullStack: "Cobertura completa",
      detailedServices: "Paginas detalladas de servicios",
      detailedServicesIntro:
        "Cada seccion tiene su pagina dedicada con alcance, entregables y resultados.",
      moreSections: "Mas secciones del sitio",
      servicesOverview: "Resumen de servicios",
      serviceAreas: "Areas de servicio",
      oneTimeProjects: "Proyectos puntuales",
      oneTimeProjectsIntro: "Corregir, mejorar, migrar o instalar.",
      ongoingSupport: "Soporte continuo",
      ongoingSupportIntro:
        "Mesa de ayuda, parches, verificacion de respaldos y revisiones periodicas.",
      hybridDelivery: "Modelo hibrido",
      hybridDeliveryIntro:
        "Implementacion inicial seguida por un plan mensual de estabilidad.",
      startAssessmentIntro:
        "Identificamos mejoras rapidas, riesgos y acciones prioritarias antes de iniciar.",
      faq: "Preguntas frecuentes",
      contact: "Contacto",
      issueChecklist: "Lista de problemas",
      message: "Mensaje",
      servicesMenuViewAll: "Ver todos los servicios",
      footerTagline:
        "Servicios TI integrales, soporte y ejecucion en sitio para oficinas reales.",
      language: "Idioma",
      theme: "Tema",
      motion: "Movimiento",
      light: "Claro",
      dark: "Oscuro",
      subtle: "Suave",
      medium: "Medio",
      strong: "Fuerte",
      english: "Ingles",
      spanish: "Espanol",
      tellUs:
        "Cuentanos sobre tu entorno y prioridades actuales.",
      serviceDetail: "Detalle del servicio",
    },
    fields: {
      nameRole: "Nombre / Cargo",
      company: "Empresa",
      phone: "Telefono",
      email: "Correo",
      usersPcs: "Cantidad de usuarios / PCs",
      hasServer: "Tienen servidor?",
      yes: "Si",
      no: "No",
    },
  },
} as const;
