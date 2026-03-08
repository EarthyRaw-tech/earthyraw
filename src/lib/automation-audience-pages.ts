import type { ContentSection } from "@/lib/site-content";

type AudienceCopy = {
  label: string;
  title: string;
  description: string;
  headline: string;
  intro: string;
  sections: ContentSection[];
};

export type AutomationAudiencePage = {
  slug: string;
  english: AudienceCopy;
  spanish: AudienceCopy;
};

export const automationAudiencePages: AutomationAudiencePage[] = [
  {
    slug: "medical-office",
    english: {
      label: "Medical Office",
      title: "Medical office process automation Puerto Rico",
      description:
        "Medical office process automation in Puerto Rico for scheduling, intake, follow-up, and reporting workflows that reduce manual bottlenecks.",
      headline: "Medical office process automation for cleaner daily operations.",
      intro:
        "We help medical offices reduce repetitive admin work and improve response times through practical workflow automation.",
      sections: [
        {
          title: "What we automate in medical offices",
          bullets: [
            "Patient intake and form workflows",
            "Appointment reminders and follow-up triggers",
            "Internal routing of requests and approvals",
            "Operational reporting for managers",
          ],
        },
        {
          title: "Expected outcomes",
          bullets: [
            "Less manual coordination between front desk and staff",
            "Fewer process errors and missed follow-ups",
            "Faster response to patients and internal teams",
            "Improved visibility into daily workload",
          ],
        },
      ],
    },
    spanish: {
      label: "Oficina Medica",
      title: "Automatizacion de procesos para oficina medica en Puerto Rico",
      description:
        "Automatizacion de procesos para oficinas medicas en Puerto Rico: agenda, intake, seguimiento y reportes para reducir friccion operativa.",
      headline: "Automatizacion de procesos para oficina medica con operacion mas fluida.",
      intro:
        "Ayudamos a oficinas medicas a reducir tareas administrativas repetitivas y mejorar tiempos de respuesta con automatizacion practica.",
      sections: [
        {
          title: "Que automatizamos en oficina medica",
          bullets: [
            "Flujo de intake y formularios de pacientes",
            "Recordatorios de citas y seguimiento",
            "Ruteo interno de solicitudes y aprobaciones",
            "Reportes operativos para supervision",
          ],
        },
        {
          title: "Resultados esperados",
          bullets: [
            "Menos coordinacion manual entre recepcion y equipo",
            "Menos errores y menos seguimientos perdidos",
            "Respuesta mas rapida a pacientes y personal",
            "Mayor visibilidad de la carga diaria",
          ],
        },
      ],
    },
  },
  {
    slug: "restaurant",
    english: {
      label: "Restaurant",
      title: "Restaurant process automation Puerto Rico",
      description:
        "Restaurant process automation in Puerto Rico, including workflow automatization for orders, prep coordination, inventory checks, and daily reporting.",
      headline: "Restaurant process automation that improves speed and consistency.",
      intro:
        "We implement automation and process control so restaurant teams spend less time on manual coordination and more time on service quality.",
      sections: [
        {
          title: "What we automate in restaurants",
          bullets: [
            "Order routing and prep-stage notifications",
            "Inventory alerts and stock-check workflows",
            "Issue reporting between floor and kitchen",
            "Daily summary reporting for operations",
          ],
        },
        {
          title: "Expected outcomes",
          bullets: [
            "Faster coordination during peak hours",
            "Fewer missed tasks and handoff delays",
            "Better operational visibility for managers",
            "More consistent execution across shifts",
          ],
        },
      ],
    },
    spanish: {
      label: "Restaurante",
      title: "Automatizacion de procesos para restaurante en Puerto Rico",
      description:
        "Automatizacion de procesos para restaurantes en Puerto Rico: ordenes, coordinacion de preparacion, inventario y reportes diarios.",
      headline: "Automatizacion de procesos para restaurante con mas velocidad y consistencia.",
      intro:
        "Implementamos automatizacion y control de flujo para que el equipo invierta menos tiempo en coordinacion manual y mas en servicio.",
      sections: [
        {
          title: "Que automatizamos en restaurantes",
          bullets: [
            "Ruteo de ordenes y notificaciones por etapa",
            "Alertas de inventario y verificacion de stock",
            "Reporte de incidencias entre salon y cocina",
            "Reportes diarios para operacion",
          ],
        },
        {
          title: "Resultados esperados",
          bullets: [
            "Coordinacion mas rapida en horas pico",
            "Menos tareas omitidas y menos atrasos",
            "Mas visibilidad para gerencia",
            "Ejecucion mas consistente por turno",
          ],
        },
      ],
    },
  },
  {
    slug: "legal-office",
    english: {
      label: "Legal Office",
      title: "Legal office process automation Puerto Rico",
      description:
        "Legal office process automation in Puerto Rico for intake, case workflow tracking, reminders, and document-related task routing.",
      headline: "Legal office process automation for stronger case operations.",
      intro:
        "We automate repetitive legal-office workflows so teams can reduce administrative friction and keep case execution organized.",
      sections: [
        {
          title: "What we automate in legal operations",
          bullets: [
            "Client intake workflow and status tracking",
            "Task routing across legal and support roles",
            "Deadline and follow-up reminders",
            "Operational dashboards for active matters",
          ],
        },
      ],
    },
    spanish: {
      label: "Bufete / Oficina Legal",
      title: "Automatizacion de procesos para oficina legal en Puerto Rico",
      description:
        "Automatizacion de procesos para oficinas legales en Puerto Rico: intake, seguimiento de casos, recordatorios y ruteo de tareas documentales.",
      headline: "Automatizacion de procesos para oficina legal con mejor control operativo.",
      intro:
        "Automatizamos flujos repetitivos de oficina legal para reducir friccion administrativa y mantener ejecucion organizada.",
      sections: [
        {
          title: "Que automatizamos en operacion legal",
          bullets: [
            "Intake de clientes y seguimiento de estado",
            "Ruteo de tareas entre roles legales y administrativos",
            "Recordatorios de fechas y seguimientos",
            "Paneles operativos de asuntos activos",
          ],
        },
      ],
    },
  },
  {
    slug: "accounting-office",
    english: {
      label: "Accounting Office",
      title: "Accounting office process automation Puerto Rico",
      description:
        "Accounting office process automation in Puerto Rico for document intake, review workflows, approvals, and recurring reporting cycles.",
      headline: "Accounting process automation for predictable execution.",
      intro:
        "We help accounting teams automate recurring process steps and reduce manual bottlenecks in routine operational flows.",
      sections: [
        {
          title: "What we automate in accounting teams",
          bullets: [
            "Document intake and validation flows",
            "Review and approval routing",
            "Recurring task schedules and reminders",
            "Progress and completion reporting",
          ],
        },
      ],
    },
    spanish: {
      label: "Oficina de Contabilidad",
      title: "Automatizacion de procesos para oficina de contabilidad en Puerto Rico",
      description:
        "Automatizacion de procesos para contabilidad en Puerto Rico: intake documental, revisiones, aprobaciones y reportes recurrentes.",
      headline: "Automatizacion de procesos contables para ejecucion predecible.",
      intro:
        "Ayudamos a equipos de contabilidad a automatizar pasos recurrentes y reducir friccion manual en la operacion diaria.",
      sections: [
        {
          title: "Que automatizamos en contabilidad",
          bullets: [
            "Flujos de intake y validacion documental",
            "Ruteo de revisiones y aprobaciones",
            "Tareas recurrentes con recordatorios",
            "Reportes de progreso y cierre",
          ],
        },
      ],
    },
  },
  {
    slug: "retail-operations",
    english: {
      label: "Retail Operations",
      title: "Retail process automation Puerto Rico",
      description:
        "Retail process automation in Puerto Rico for store operations, stock workflows, order handling, and routine management reporting.",
      headline: "Retail process automation for smoother store execution.",
      intro:
        "We streamline key retail workflows so teams can respond faster, track tasks clearly, and reduce avoidable process delays.",
      sections: [
        {
          title: "What we automate in retail",
          bullets: [
            "Store request and issue workflows",
            "Stock notifications and replenishment triggers",
            "Task routing across shifts or locations",
            "Daily operational summaries",
          ],
        },
      ],
    },
    spanish: {
      label: "Operaciones Retail",
      title: "Automatizacion de procesos retail en Puerto Rico",
      description:
        "Automatizacion de procesos retail en Puerto Rico para operaciones de tienda, inventario, manejo de ordenes y reportes de gestion.",
      headline: "Automatizacion de procesos retail para una operacion mas fluida.",
      intro:
        "Optimizamos flujos clave de retail para responder mas rapido, dar trazabilidad a tareas y reducir atrasos evitables.",
      sections: [
        {
          title: "Que automatizamos en retail",
          bullets: [
            "Solicitudes e incidencias de tienda",
            "Alertas de inventario y reabastecimiento",
            "Ruteo de tareas entre turnos o localidades",
            "Resumenes operativos diarios",
          ],
        },
      ],
    },
  },
  {
    slug: "professional-services",
    english: {
      label: "Professional Services",
      title: "Business process automation Puerto Rico for professional services",
      description:
        "Business process automation in Puerto Rico for professional service firms: intake, workflow tracking, approvals, and service delivery coordination.",
      headline: "Business process automation for professional service teams.",
      intro:
        "We design practical automation for firms that need consistent delivery, clearer workflow ownership, and less manual coordination.",
      sections: [
        {
          title: "What we automate in service firms",
          bullets: [
            "Client request intake and triage",
            "Workflow ownership and status updates",
            "Approval and handoff checkpoints",
            "Operational reporting by service line",
          ],
        },
      ],
    },
    spanish: {
      label: "Servicios Profesionales",
      title: "Automatizacion de procesos para servicios profesionales en Puerto Rico",
      description:
        "Automatizacion de procesos en Puerto Rico para firmas de servicios profesionales: intake, seguimiento de flujo, aprobaciones y coordinacion operativa.",
      headline: "Automatizacion de procesos para equipos de servicios profesionales.",
      intro:
        "Disenamos automatizaciones practicas para firmas que necesitan entrega consistente, claridad de responsables y menos coordinacion manual.",
      sections: [
        {
          title: "Que automatizamos en firmas de servicios",
          bullets: [
            "Intake y triage de solicitudes de clientes",
            "Responsables de flujo y actualizaciones de estado",
            "Puntos de aprobacion y handoff",
            "Reportes operativos por linea de servicio",
          ],
        },
      ],
    },
  },
];

export const automationAudienceBySlug = Object.fromEntries(
  automationAudiencePages.map((audience) => [audience.slug, audience]),
) as Record<string, AutomationAudiencePage>;
