import type { ServicePage, StandardPage } from "@/lib/site-content";

export const servicePagesEs: ServicePage[] = [
  {
    slug: "programming-automation",
    menuLabel: "Programacion y automatizacion",
    seoTitle:
      "Programacion y automatizacion - Herramientas personalizadas para mejorar flujos de oficina",
    metaDescription:
      "Desarrollo de software y automatizacion: paneles, herramientas internas, flujos automatizados, integraciones y mejoras continuas para operaciones de oficina.",
    headline:
      "Software personalizado que elimina trabajo manual y mejora la precision.",
    intro:
      "Creamos herramientas practicas para oficinas que necesitan procesos mas limpios, menos tareas manuales y mejor visibilidad operativa.",
    sections: [
      {
        title: "Que resuelve",
        bullets: [
          "Ingreso manual repetitivo",
          "Hojas de calculo desconectadas y procesos inconsistentes",
          "Demasiado tiempo en seguimiento de tareas, documentos y solicitudes",
          "Falta de visibilidad por ausencia de paneles y reportes",
        ],
      },
      {
        title: "Que construimos",
        bullets: [
          "Paneles internos para visibilidad operativa",
          "Formularios de solicitud conectados a seguimiento de flujo",
          "Herramientas para agenda, asignacion y estado de tareas",
          "Automatizacion de notificaciones y aprobaciones",
          "Portales simples para clientes o personal cuando aplica",
        ],
      },
      {
        title: "Integraciones",
        paragraphs: [
          "Conectamos sistemas segun APIs y niveles de acceso disponibles para reducir duplicidad y mejorar el flujo entre herramientas.",
        ],
      },
      {
        title: "Entregables",
        bullets: [
          "Levantamiento de requisitos y mapeo de flujos",
          "Diseno de base de datos cuando sea necesario",
          "UI web y paneles administrativos",
          "Control de acceso por roles cuando se requiera",
          "Documentacion y notas de entrega",
          "Plan de mantenimiento opcional",
        ],
      },
      {
        title: "Resultado",
        paragraphs: [
          "Procesos mas rapidos, menos errores, mejor seguimiento y menor dependencia de una sola persona para manejar hojas de calculo.",
        ],
      },
    ],
  },
  {
    slug: "server-technical-services",
    menuLabel: "Servicios tecnicos de servidores",
    seoTitle: "Servicios tecnicos de servidores - Estabilidad, seguridad y mantenibilidad",
    metaDescription:
      "Instalacion y configuracion de servidores, mantenimiento, parches, endurecimiento de seguridad, administracion remota y evaluacion ambiental.",
    headline: "Servidores estables porque se mantienen correctamente.",
    intro:
      "Estabilizamos y aseguramos ambientes de servidores para evitar caidas recurrentes e incidentes prevenibles.",
    sections: [
      {
        title: "Cobertura",
        bullets: [
          "Instalacion y configuracion de servidores",
          "Gestion de parches y actualizaciones",
          "Endurecimiento de seguridad con controles practicos",
          "Ajustes de rendimiento y confiabilidad",
          "Administracion remota segura cuando se necesite",
        ],
      },
      {
        title: "Evaluacion del entorno",
        bullets: [
          "Riesgo por polvo y humedad",
          "Flujo de aire y temperatura",
          "Control de acceso fisico",
          "Organizacion de cableado y ubicacion segura",
        ],
      },
      {
        title: "Entregables",
        bullets: [
          "Revision del estado actual de hardware, sistema operativo y servicios",
          "Lista de riesgos y prioridades",
          "Plan de implementacion para parches, accesos y respaldos",
          "Documentacion de configuracion y mantenimiento",
        ],
      },
      {
        title: "Resultado",
        paragraphs: [
          "Menos tiempo fuera de servicio, menos sorpresas y un entorno de servidores sostenible a largo plazo.",
        ],
      },
    ],
  },
  {
    slug: "desktop-end-user-support",
    menuLabel: "Soporte desktop y usuario final",
    seoTitle: "Soporte desktop - Mesa de ayuda, estandarizacion y capacitacion",
    metaDescription:
      "Soporte desktop responsivo: resolucion de incidentes, gestion de software, estandarizacion de estaciones, capacitacion y soporte para laptops y moviles.",
    headline: "Soporte que reduce caidas en lugar de generar tickets eternos.",
    intro:
      "Brindamos soporte responsivo y estandares de estaciones de trabajo para mantener productividad y reducir fallas repetitivas.",
    sections: [
      {
        title: "Que atendemos",
        bullets: [
          "Resolucion diaria de incidentes",
          "Instalacion y actualizacion de software",
          "Estandarizacion de estaciones de trabajo",
          "Problemas de impresoras, scanners y perifericos",
          "Soporte para laptops y dispositivos moviles",
        ],
      },
      {
        title: "Capacitacion al usuario",
        paragraphs: [
          "Damos capacitacion practica para que el equipo trabaje mas rapido, evite errores comunes y sepa como diagnosticar antes de abrir un ticket.",
        ],
      },
      {
        title: "Entregables",
        bullets: [
          "Proceso de soporte definido",
          "Linea base recomendada para estaciones",
          "Documentacion de soluciones frecuentes",
          "Flujo opcional de onboarding y offboarding",
        ],
      },
      {
        title: "Resultado",
        paragraphs: [
          "Menos interrupciones y mayor confianza del personal frente a los sistemas.",
        ],
      },
    ],
  },
  {
    slug: "network-infrastructure-vpn",
    menuLabel: "Infraestructura de red y VPN",
    seoTitle: "Infraestructura de red y VPN - Conectividad segura y confiable",
    metaDescription:
      "Diseno e implementacion de red, firewall/router, cableado, segmentacion, revisiones periodicas y acceso remoto seguro por VPN.",
    headline: "Una red diseniada para confiabilidad, no para suerte.",
    intro:
      "Disenamos y mantenemos redes de oficina enfocadas en continuidad, acceso seguro y mantenibilidad.",
    sections: [
      {
        title: "Que hacemos",
        bullets: [
          "Diseno e implementacion de red",
          "Configuracion de firewall y router",
          "Planificacion y mejora de Wi-Fi",
          "Segmentacion y VLAN cuando aplica",
          "Orden de cableado y areas de red organizadas",
          "Revisiones periodicas y limpieza de red",
        ],
      },
      {
        title: "VPN y acceso remoto seguro",
        bullets: [
          "Implementacion de VPN para personal remoto",
          "Conectividad segura entre sitios cuando aplique",
          "Controles de acceso para restringir sistemas internos",
        ],
      },
      {
        title: "Entregables",
        bullets: [
          "Resumen de evaluacion de red",
          "Lista priorizada de mejoras",
          "Documentacion de configuracion",
          "Notas as-built de topologia fisica y logica",
        ],
      },
      {
        title: "Resultado",
        paragraphs: [
          "Menos caidas, mejor rendimiento y acceso remoto mas seguro.",
        ],
      },
    ],
  },
  {
    slug: "backup-disaster-recovery",
    menuLabel: "Respaldo y recuperacion",
    seoTitle: "Respaldo y recuperacion - Protege datos y reduce inactividad",
    metaDescription:
      "Respaldos confiables, verificacion, politicas de retencion y estrategia practica de recuperacion para sistemas y datos criticos.",
    headline: "Respaldos que funcionan y un plan para recuperar rapido.",
    intro:
      "Implementamos programas realistas de respaldo y recuperacion con prioridades claras y verificacion continua.",
    sections: [
      {
        title: "Que implementamos",
        bullets: [
          "Estrategia de respaldo segun sistemas criticos",
          "Recomendaciones de destino y retencion",
          "Rutinas de verificacion periodica",
          "Plan de recuperacion con orden de restauracion",
        ],
      },
      {
        title: "Por que importa",
        paragraphs: [
          "Muchas oficinas descubren fallas de respaldo durante incidentes. Nos enfocamos en claridad, verificacion y recuperacion repetible.",
        ],
      },
      {
        title: "Entregables",
        bullets: [
          "Mapa de alcance de proteccion",
          "Prioridades de recuperacion paso a paso",
          "SOP de verificacion de respaldos",
          "Calendario recomendado de revisiones",
        ],
      },
      {
        title: "Resultado",
        paragraphs: [
          "Menor riesgo de perdida de datos y recuperacion predecible ante incidentes.",
        ],
      },
    ],
  },
  {
    slug: "electrical-it-power-safety-onsite-construction",
    menuLabel: "Seguridad electrica TI y construccion en sitio",
    seoTitle: "Electrico + modificaciones en oficina para instalaciones TI",
    metaDescription:
      "Revision de seguridad electrica TI, analisis de carga, guia de UPS y modificaciones en sitio para rutas de tuberia, conduits y cables.",
    headline:
      "No solo recomendamos mejoras. Ejecutamos el trabajo fisico para instalarlas bien.",
    intro:
      "Combinamos ejecucion de infraestructura TI con capacidad de tecnico de construccion certificado para requerimientos de oficina.",
    sections: [
      {
        title: "Seguridad electrica y potencia TI",
        bullets: [
          "Analisis de carga por circuito para equipos TI",
          "Revision de regletas y multitomas con recomendaciones",
          "Mejora de distribucion electrica para TI",
          "Recomendaciones de dimensionamiento y ubicacion de UPS",
        ],
      },
      {
        title: "Modificaciones en oficina",
        bullets: [
          "Apertura y cierre de pared o cielo para ruteo",
          "Canalizaciones en conduit o tuberia para cableado",
          "Creacion de rutas de cable, terminado y limpieza",
          "Reparaciones generales relacionadas a mejoras tecnologicas",
        ],
      },
      {
        title: "Oficios soportados",
        bullets: [
          "Trabajo electrico orientado a seguridad TI",
          "Albanileria",
          "Carpinteria",
          "Gypsum y drywall",
          "Apoyo de plomeria para instalacion",
          "Soldadura",
          "Ebanisteria",
        ],
        note:
          "Cuando una tarea requiere licencias, permisos, inspecciones o aprobacion de ingenieria, coordinamos o recomendamos el especialista adecuado.",
      },
      {
        title: "Resultado",
        paragraphs: [
          "Proyectos mas rapidos, menos proveedores y mejores instalaciones para mantenimiento futuro.",
        ],
      },
    ],
  },
  {
    slug: "sops-documentation",
    menuLabel: "SOPs y documentacion",
    seoTitle: "SOPs y documentacion - Procesos repetibles y control operativo",
    metaDescription:
      "SOPs y documentacion alineadas a oficina: respaldos, parches, control de acceso, onboarding/offboarding, soporte remoto y controles repetibles.",
    headline:
      "Documentacion que mantiene estable tu oficina incluso con cambios de personal.",
    intro:
      "Creamos SOPs y documentacion operativa alineada a la realidad del dia a dia y requerimientos de cumplimiento.",
    sections: [
      {
        title: "Que creamos",
        bullets: [
          "SOPs alineadas a operacion y cumplimiento",
          "Documentacion para tareas y controles TI repetibles",
        ],
      },
      {
        title: "Temas comunes de SOP",
        bullets: [
          "Onboarding y offboarding de usuarios",
          "Practicas de contrasenias y accesos",
          "Verificacion de respaldos",
          "Rutinas de parches y actualizaciones",
          "Reglas de acceso remoto y soporte seguro",
          "Control de cambios para actualizaciones de sistemas",
        ],
      },
      {
        title: "Entregables",
        bullets: [
          "Documentos SOP paso a paso",
          "Asignacion de responsables por rol",
          "Cadencia recomendada de revision",
        ],
      },
      {
        title: "Resultado",
        paragraphs: [
          "Consistencia operativa, menor riesgo y transiciones mas fluidas ante cambios de personal.",
        ],
      },
    ],
  },
  {
    slug: "web-presence-communication",
    menuLabel: "Presencia web y comunicacion",
    seoTitle: "Presencia web - Dominio/DNS, sitio web y correo seguro",
    metaDescription:
      "Gestion de dominio y DNS, implementacion y mantenimiento web, configuracion de correo seguro y guia de entregabilidad.",
    headline: "Presencia profesional en linea y comunicacion confiable bien configurada.",
    intro:
      "Administramos dominio, DNS, web y correo para que la oficina siga conectada y proyecte una imagen profesional.",
    sections: [
      {
        title: "Dominio y DNS",
        bullets: [
          "Configuracion de dominio y gestion DNS",
          "Control de cambios para evitar caidas por DNS",
        ],
      },
      {
        title: "Sitio web",
        bullets: [
          "Implementacion y mantenimiento de sitio profesional",
          "Estructura base de paginas y flujo de contacto",
          "Actualizaciones de contenido y cambios continuos",
        ],
      },
      {
        title: "Servicios de correo",
        bullets: [
          "Configuracion y administracion de correo seguro",
          "Soporte de confiabilidad en envio y recepcion",
          "Guia de entregabilidad con SPF, DKIM y DMARC basico",
        ],
      },
      {
        title: "Resultado",
        paragraphs: [
          "Canales de comunicacion estables y menos interrupciones por problemas de dominio o correo.",
        ],
      },
    ],
  },
];

export const servicePageBySlugEs = Object.fromEntries(
  servicePagesEs.map((service) => [service.slug, service]),
) as Record<string, ServicePage>;

export const processPageEs: StandardPage = {
  seoTitle:
    "Proceso - Evaluacion en sitio a plan de accion e implementacion con soporte",
  metaDescription:
    "Comenzamos con una evaluacion en sitio para entender flujos e infraestructura, luego entregamos plan priorizado e implementamos con documentacion.",
  headline: "Proceso practico de tres pasos para ejecutar con claridad.",
  intro:
    "Combinamos analisis de operacion con realidad de infraestructura para recomendaciones que realmente se pueden implementar.",
  sections: [
    {
      title: "Paso 1 - Evaluacion inicial en sitio",
      bullets: [
        "Flujos diarios y puntos de dolor",
        "Retroalimentacion del personal y bloqueos operativos",
        "Arquitectura de hardware, software y red",
        "Entorno de servidores: polvo, humedad, flujo de aire y acceso",
        "Cargas electricas, multitomas y distribucion",
        "Rutas de cableado y opciones de canalizacion",
        "Necesidades de SOP y documentacion",
      ],
    },
    {
      title: "Paso 2 - Plan de accion",
      bullets: [
        "Mejoras rapidas",
        "Prioridades de seguridad y respaldo",
        "Hoja de ruta de confiabilidad y escalabilidad",
        "Opciones alineadas a presupuesto",
      ],
    },
    {
      title: "Paso 3 - Implementacion y soporte",
      bullets: [
        "Ejecutar mejoras",
        "Documentar cambios",
        "Estandarizar sistemas y controles",
        "Soporte continuo para mantener estabilidad",
      ],
    },
  ],
};

export const pricingPageEs: StandardPage = {
  seoTitle: "Precios - Alcance transparente despues de evaluacion en sitio",
  metaDescription:
    "El precio depende del alcance. Despues de evaluar, entregamos desglose claro para proyectos puntuales, soporte continuo y adicionales.",
  headline: "Precio transparente segun alcance real.",
  intro:
    "Luego de la evaluacion, recibes un desglose claro para pagar solo lo que tu entorno realmente necesita.",
  sections: [
    {
      title: "Proyectos puntuales",
      bullets: [
        "Implementacion y estabilizacion de servidores",
        "Mejoras de red y despliegue de VPN",
        "Implementacion de respaldo y recuperacion",
        "Orden de cableado y trabajos de canalizacion",
        "Modificaciones de oficina necesarias para instalar",
      ],
    },
    {
      title: "Soporte continuo",
      bullets: [
        "Mesa de ayuda",
        "Mantenimiento y parches",
        "Rutinas de verificacion de respaldo",
        "Revisiones periodicas de red y seguridad",
        "Actualizacion de documentacion",
      ],
    },
    {
      title: "Adicionales",
      bullets: [
        "Desarrollo de SOPs",
        "Administracion de sitio web, dominio y correo",
        "Automatizacion y software personalizado ampliado",
      ],
    },
  ],
};

export const contactPageEs: StandardPage = {
  seoTitle: "Contacto - Agenda evaluacion en sitio o solicita cotizacion",
  metaDescription:
    "Contactanos para agendar evaluacion o cotizacion de servicios TI, servidores, redes, seguridad, respaldos, SOPs, correo/DNS y modificaciones de oficina.",
  headline: "Cuentanos que necesitas. Responderemos con pasos claros.",
  intro:
    "Usa este formato de levantamiento para que podamos dimensionar tu entorno y responder con recomendaciones utiles.",
  sections: [
    {
      title: "Campos recomendados",
      bullets: [
        "Nombre y cargo",
        "Empresa",
        "Telefono y correo",
        "Numero de usuarios y PCs",
        "Servidor presente (si/no)",
      ],
    },
    {
      title: "Lista de problemas",
      bullets: [
        "Computadoras lentas",
        "Problemas de red o Wi-Fi",
        "Problemas de respaldo",
        "Problemas de correo",
        "Problemas de seguridad",
        "Necesidad de automatizacion o software",
        "VPN y acceso remoto",
        "Cableado y orden de cables",
        "Carga electrica y plan de UPS",
        "Modificaciones de oficina para ruteo",
        "Reparaciones de drywall, carpinteria, albanileria, soldadura, ebanisteria o apoyo de plomeria",
      ],
    },
  ],
};

export const faqPageEs: StandardPage = {
  seoTitle: "FAQ - Soporte TI, seguridad, respaldos y modificaciones en sitio",
  metaDescription:
    "Preguntas comunes sobre servicios TI, evaluacion, modelo de soporte, documentacion y modificaciones en sitio para instalaciones.",
  headline: "Preguntas frecuentes.",
  intro:
    "Respuestas directas a consultas comunes sobre alcance, modalidad de servicio y requerimientos de implementacion.",
  sections: [
    {
      title: "Ofrecen soporte en sitio y remoto?",
      paragraphs: [
        "Si. Usamos soporte remoto para velocidad y agendamos visitas cuando hay trabajo fisico o inspeccion directa.",
      ],
    },
    {
      title: "Realizan cableado y rutas de cable?",
      paragraphs: [
        "Si. Realizamos ruteo, organizacion y canalizacion con conduit o tuberia cuando se necesita.",
      ],
    },
    {
      title: "Entregan documentacion y SOPs?",
      paragraphs: [
        "Si. La creacion de SOPs y documentacion operativa es parte central de nuestros servicios.",
      ],
    },
    {
      title: "Como cotizan proyectos?",
      paragraphs: ["Despues de evaluar, entregamos un desglose claro por alcance."],
    },
    {
      title: "Tambien hacen trabajo de construccion?",
      paragraphs: [
        "Si. Tenemos capacidad de tecnico de construccion certificado para modificaciones comunes relacionadas a instalaciones TI. Cuando se requieren licencias, permisos, inspecciones o firma de ingenieria, coordinamos al especialista adecuado.",
      ],
    },
  ],
};

export const aboutPageEs: StandardPage = {
  seoTitle: "Nosotros - Entrega integral TI e infraestructura para oficinas",
  metaDescription:
    "Combinamos software, infraestructura, seguridad, soporte y modificaciones de oficina para resultados TI completos en oficinas medicas y profesionales.",
  headline:
    "Un solo equipo para software, infraestructura, soporte y ejecucion de instalaciones.",
  intro:
    "Trabajamos mejor con oficinas que necesitan operacion predecible, sistemas seguros y ejecucion practica desde planificacion hasta despliegue.",
  sections: [
    {
      title: "Entornos ideales",
      bullets: [
        "Oficinas medicas y profesionales",
        "Entornos multiestacion con servidores, scanners e impresoras",
        "Negocios que requieren acceso remoto seguro y soporte rapido",
      ],
    },
    {
      title: "Que nos diferencia",
      bullets: [
        "Entrega de punta a punta desde software hasta infraestructura",
        "Seguridad y confiabilidad incorporadas en la implementacion",
        "Disciplina de SOPs y documentacion",
        "Capacidad interna de modificacion de oficina para evitar demoras por terceros",
      ],
    },
  ],
};

export const homePageEs = {
  seoTitle: "Servicios TI integrales y modificaciones de oficina en sitio",
  metaDescription:
    "TI de extremo a extremo para oficinas: software, servidores, redes, seguridad, respaldos, soporte, SOPs, correo/DNS y modificaciones de oficina en sitio.",
  heroHeadline:
    "TI moderna para oficinas reales, enfocada en seguridad y confiabilidad.",
  heroIntro:
    "Entregamos software, infraestructura y soporte para reducir interrupciones y mejorar operaciones. Tambien contamos con capacidad de tecnico de construccion certificado para completar modificaciones comunes en oficina y ejecutar instalaciones limpias sin depender de mas proveedores.",
  whatWeDo:
    "Apoyamos oficinas que necesitan operacion diaria confiable, sistemas seguros, soporte consistente y un solo equipo que ejecute TI y modificaciones fisicas en sitio.",
  outcomes: [
    "Menos interrupciones y fallas aleatorias",
    "Infraestructura mas limpia con cableado ordenado y sistemas documentados",
    "Menor riesgo de seguridad con controles practicos",
    "Flujos de trabajo mas rapidos gracias a automatizacion y mejores herramientas",
    "Plan de crecimiento escalable para la oficina",
  ],
  fullStackCoverage: [
    "Programacion y automatizacion",
    "Servicios tecnicos de servidores",
    "Soporte desktop y usuario final",
    "Infraestructura de red y VPN",
    "Respaldo y recuperacion",
    "Seguridad electrica TI",
    "Modificaciones y reparaciones en sitio",
    "SOPs y documentacion",
    "Presencia web y comunicacion",
  ],
  processSteps: [
    "Evaluacion en sitio de sistemas, flujos, entorno, energia y rutas de cableado",
    "Plan de accion con prioridades, opciones y alcance",
    "Implementacion y soporte continuo con cambios documentados",
  ],
  bestFit: [
    "Oficinas medicas y profesionales",
    "Entornos multiestacion con servidores, impresoras y scanners",
    "Negocios que requieren acceso remoto seguro y soporte rapido",
  ],
};

