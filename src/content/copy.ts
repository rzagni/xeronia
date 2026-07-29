import type { Locale, PageKey } from "@/lib/i18n";

export interface ServiceItem {
  title: string;
  description: string;
}

export interface Practice {
  id: string;
  name: string;
  summary: string;
  services: ServiceItem[];
}

export interface PageMeta {
  title: string;
  description: string;
}

interface Copy {
  nav: Record<PageKey, string>;
  navAria: string;
  skipToContent: string;
  languageLabel: string;
  languageName: string;
  cta: {
    primary: string;
    secondary: string;
    contact: string;
  };
  meta: Record<PageKey, PageMeta>;
  heroAlts: Record<PageKey, string>;
  home: {
    eyebrow: string;
    title: string;
    lede: string;
    heroImageAlt: string;
    heroCapabilities: string[];
    pillars: { title: string; description: string }[];
    practicesTitle: string;
    practicesLede: string;
    lifecycleTitle: string;
    lifecycleLede: string;
    lifecycle: string[];
    differenceTitle: string;
    differenceBody: string[];
    ctaTitle: string;
    ctaBody: string;
  };
  services: {
    eyebrow: string;
    title: string;
    lede: string;
  };
  approach: {
    eyebrow: string;
    title: string;
    lede: string;
    phases: { step: string; title: string; description: string }[];
    principlesTitle: string;
    principles: { title: string; description: string }[];
  };
  about: {
    eyebrow: string;
    title: string;
    lede: string;
    body: string[];
    notTitle: string;
    not: string[];
    isTitle: string;
    is: string[];
  };
  contact: {
    eyebrow: string;
    title: string;
    lede: string;
    detailsTitle: string;
    emailLabel: string;
    executiveLabel: string;
    phoneLabel: string;
    locationLabel: string;
    linkedinLabel: string;
    websiteLabel: string;
    form: {
      name: string;
      namePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      company: string;
      companyPlaceholder: string;
      interest: string;
      interestPlaceholder: string;
      message: string;
      messagePlaceholder: string;
      submit: string;
      required: string;
      invalidEmail: string;
      success: string;
      helper: string;
    };
  };
  footer: {
    blurb: string;
    navTitle: string;
    contactTitle: string;
    rights: string;
  };
  practices: Practice[];
}

const enPractices: Practice[] = [
  {
    id: "enterprise-technology",
    name: "Enterprise Technology",
    summary:
      "Strategy, implementation and optimization of the platforms that run the business.",
    services: [
      {
        title: "Enterprise Strategy & Technology Advisory",
        description:
          "Technology strategies aligned with business objectives, operating models, investment priorities and long-term transformation roadmaps.",
      },
      {
        title: "Enterprise Applications & ERP",
        description:
          "Plan, implement, modernize, optimize and govern ERP, CRM, SCM, HCM, EPM and industry-specific platforms.",
      },
      {
        title: "Oracle Enterprise Solutions",
        description:
          "Architecture, implementation, upgrades, integration and optimization across Oracle Fusion Cloud, E-Business Suite, Database, Analytics, Integration, SOA and OCI.",
      },
      {
        title: "Cloud Transformation",
        description:
          "Cloud strategy, migration, hybrid and multi-cloud architecture, governance, resiliency, disaster recovery and operational optimization.",
      },
      {
        title: "Technology Modernization",
        description:
          "Application modernization, legacy transformation, portfolio rationalization, platform consolidation and technology roadmaps.",
      },
    ],
  },
  {
    id: "enterprise-architecture",
    name: "Enterprise Architecture",
    summary:
      "Coherent business, application, data and security architecture that survives contact with delivery.",
    services: [
      {
        title: "Enterprise Architecture",
        description:
          "Business, application, data, technology and security architecture aligned to strategy through proven governance frameworks.",
      },
      {
        title: "Systems Integration",
        description:
          "Integration architecture, APIs, middleware, microservices and event-driven patterns across enterprise and cloud landscapes.",
      },
      {
        title: "Solution Design & Technical Leadership",
        description:
          "End-to-end solution blueprints, non-functional design, technology selection and hands-on technical leadership through delivery.",
      },
      {
        title: "Architecture Governance & Assurance",
        description:
          "Design authority, architecture review boards, standards, reference models and independent assurance of complex programs.",
      },
    ],
  },
  {
    id: "ai-data",
    name: "Artificial Intelligence & Data",
    summary: "From data foundations to production AI that executives can trust and govern.",
    services: [
      {
        title: "AI Strategy & Adoption",
        description:
          "Use-case identification, value cases, operating model, responsible-AI guardrails and enterprise adoption roadmaps.",
      },
      {
        title: "Applied AI & Automation",
        description:
          "Generative AI, intelligent automation and decision support embedded into enterprise processes and applications.",
      },
      {
        title: "Data Architecture & Analytics",
        description:
          "Data platforms, warehouses and lakehouses, master data, pipelines, analytics and executive reporting.",
      },
      {
        title: "AI Governance & Risk",
        description:
          "Model governance, data privacy, security controls, auditability and regulatory alignment for AI at scale.",
      },
    ],
  },
  {
    id: "digital-transformation",
    name: "Digital Transformation & Delivery",
    summary:
      "Program leadership that turns transformation strategy into measurable business outcomes.",
    services: [
      {
        title: "Digital Transformation",
        description:
          "Operating-model change, process redesign, digital experience and value realization across the enterprise.",
      },
      {
        title: "Program & Delivery Leadership",
        description:
          "Program governance, delivery assurance, vendor and systems-integrator oversight, and recovery of at-risk initiatives.",
      },
      {
        title: "Assessment & Due Diligence",
        description:
          "Technology assessments, current-state reviews, cost and risk analysis, and pre- and post-transaction diligence.",
      },
      {
        title: "Optimization & Continuous Improvement",
        description:
          "Post-go-live optimization, performance tuning, run-cost reduction and continuous improvement of enterprise platforms.",
      },
    ],
  },
];

const esPractices: Practice[] = [
  {
    id: "enterprise-technology",
    name: "Tecnología Empresarial",
    summary:
      "Estrategia, implementación y optimización de las plataformas que sostienen el negocio.",
    services: [
      {
        title: "Estrategia Empresarial y Asesoría Tecnológica",
        description:
          "Estrategias tecnológicas alineadas a los objetivos del negocio, modelos operativos, prioridades de inversión y hojas de ruta de transformación.",
      },
      {
        title: "Aplicaciones Empresariales y ERP",
        description:
          "Planificación, implementación, modernización, optimización y gobierno de ERP, CRM, SCM, HCM, EPM y plataformas sectoriales.",
      },
      {
        title: "Soluciones Empresariales Oracle",
        description:
          "Arquitectura, implementación, actualizaciones, integración y optimización en Oracle Fusion Cloud, E-Business Suite, Database, Analytics, Integration, SOA y OCI.",
      },
      {
        title: "Transformación a la Nube",
        description:
          "Estrategia y migración a la nube, arquitectura híbrida y multinube, gobierno, resiliencia, recuperación ante desastres y optimización operativa.",
      },
      {
        title: "Modernización Tecnológica",
        description:
          "Modernización de aplicaciones, transformación de sistemas heredados, racionalización de portafolio y consolidación de plataformas.",
      },
    ],
  },
  {
    id: "enterprise-architecture",
    name: "Arquitectura Empresarial",
    summary:
      "Arquitectura coherente de negocio, aplicaciones, datos y seguridad, sostenible en la ejecución.",
    services: [
      {
        title: "Arquitectura Empresarial",
        description:
          "Arquitectura de negocio, aplicaciones, datos, tecnología y seguridad alineada a la estrategia con marcos de gobierno probados.",
      },
      {
        title: "Integración de Sistemas",
        description:
          "Arquitectura de integración, APIs, middleware, microservicios y patrones orientados a eventos en entornos empresariales y cloud.",
      },
      {
        title: "Diseño de Soluciones y Liderazgo Técnico",
        description:
          "Diseño integral de soluciones, requisitos no funcionales, selección tecnológica y liderazgo técnico durante la ejecución.",
      },
      {
        title: "Gobierno y Aseguramiento de Arquitectura",
        description:
          "Autoridad de diseño, comités de arquitectura, estándares, modelos de referencia y aseguramiento independiente de programas complejos.",
      },
    ],
  },
  {
    id: "ai-data",
    name: "Inteligencia Artificial y Datos",
    summary:
      "Desde los cimientos de datos hasta IA en producción que la dirección puede gobernar y confiar.",
    services: [
      {
        title: "Estrategia y Adopción de IA",
        description:
          "Identificación de casos de uso, casos de valor, modelo operativo, principios de IA responsable y hojas de ruta de adopción.",
      },
      {
        title: "IA Aplicada y Automatización",
        description:
          "IA generativa, automatización inteligente y soporte a la decisión integrados en procesos y aplicaciones empresariales.",
      },
      {
        title: "Arquitectura de Datos y Analítica",
        description:
          "Plataformas de datos, data warehouses y lakehouses, datos maestros, pipelines, analítica e informes ejecutivos.",
      },
      {
        title: "Gobierno y Riesgo de IA",
        description:
          "Gobierno de modelos, privacidad, controles de seguridad, auditabilidad y cumplimiento regulatorio para IA a escala.",
      },
    ],
  },
  {
    id: "digital-transformation",
    name: "Transformación Digital y Ejecución",
    summary:
      "Liderazgo de programas que convierte la estrategia en resultados de negocio medibles.",
    services: [
      {
        title: "Transformación Digital",
        description:
          "Cambio de modelo operativo, rediseño de procesos, experiencia digital y realización de valor en toda la organización.",
      },
      {
        title: "Liderazgo de Programas y Entrega",
        description:
          "Gobierno de programas, aseguramiento de la entrega, supervisión de proveedores e integradores y recuperación de iniciativas en riesgo.",
      },
      {
        title: "Evaluación y Due Diligence",
        description:
          "Evaluaciones tecnológicas, revisión de estado actual, análisis de costo y riesgo, y diligencia previa y posterior a transacciones.",
      },
      {
        title: "Optimización y Mejora Continua",
        description:
          "Optimización post-implementación, ajuste de rendimiento, reducción del costo operativo y mejora continua de plataformas.",
      },
    ],
  },
];

const en: Copy = {
  nav: {
    home: "Home",
    services: "Services",
    approach: "Approach",
    about: "About",
    contact: "Contact",
  },
  navAria: "Primary",
  skipToContent: "Skip to main content",
  languageLabel: "Change language",
  languageName: "Español",
  cta: {
    primary: "Start a conversation",
    secondary: "Explore services",
    contact: "Contact XERONIA",
  },
  meta: {
    home: {
      title: "XERONIA — Enterprise Technology, AI & Digital Transformation",
      description:
        "XERONIA is a premium enterprise consulting firm partnering with executive leadership to design, implement, modernize and optimize enterprise technology, AI and digital transformation.",
    },
    services: {
      title: "Services — Enterprise Technology & AI Consulting | XERONIA",
      description:
        "Four practice areas: enterprise technology, enterprise architecture, artificial intelligence & data, and digital transformation & delivery.",
    },
    approach: {
      title: "Approach — Strategy Through Measurable Outcomes | XERONIA",
      description:
        "How XERONIA delivers across the full transformation lifecycle: strategy, assessment, architecture, design, implementation, integration and optimization.",
    },
    about: {
      title: "About XERONIA — Executive Advisory Meets Hands-On Delivery",
      description:
        "XERONIA combines executive advisory, enterprise architecture and hands-on implementation. Not a staffing firm, not a commodity systems integrator.",
    },
    contact: {
      title: "Contact XERONIA — Enterprise Technology Consulting",
      description:
        "Talk with XERONIA about enterprise technology, Oracle solutions, AI and digital transformation initiatives.",
    },
  },
  heroAlts: {
    home: "Rows of enterprise server cabinets in a dark data center hall",
    services:
      "Enterprise operations command center with wall displays of system topology and telemetry",
    approach:
      "Layered enterprise architecture schematic showing channels, services, data and integration tiers",
    about: "Petrochemical processing facility and steel pipework structures at dusk",
    contact: "Geometric glass and steel facade of a corporate tower at blue hour",
  },
  home: {
    eyebrow: "Enterprise Technology, AI & Digital Transformation",
    title: "Transforming enterprise technology for the AI era.",
    lede: "From strategy and architecture through implementation and optimization, XERONIA designs and delivers the platforms, data and intelligent capabilities that run the modern enterprise.",
    heroImageAlt:
      "Abstract isometric lattice of translucent planes and luminous connection nodes representing enterprise architecture",
    heroCapabilities: [
      "Enterprise Technology",
      "Artificial Intelligence",
      "Enterprise Architecture",
      "Cloud",
      "Integration",
      "Transformation",
    ],
    pillars: [
      {
        title: "Executive advisory",
        description:
          "We work at the leadership level — strategy, investment priorities and operating models, not slideware.",
      },
      {
        title: "Enterprise architecture",
        description:
          "Business, application, data and security architecture designed to hold up under real delivery pressure.",
      },
      {
        title: "Hands-on delivery",
        description:
          "Technical leadership and implementation that carries decisions all the way to measurable outcomes.",
      },
    ],
    practicesTitle: "Four practice areas",
    practicesLede:
      "Deep capability across the platforms, architectures and programs that define modern enterprises.",
    lifecycleTitle: "Value across the full lifecycle",
    lifecycleLede:
      "We stay engaged from the first strategic question through continuous improvement after go-live.",
    lifecycle: [
      "Strategy",
      "Assessment",
      "Enterprise Architecture",
      "Solution Design",
      "Implementation",
      "Systems Integration",
      "Program Leadership",
      "Optimization",
      "Continuous Improvement",
    ],
    differenceTitle: "A different kind of partner",
    differenceBody: [
      "Traditional consulting firms stop at strategy. Implementation firms start after the hard decisions are made. XERONIA does both.",
      "We combine executive advisory, enterprise architecture, technical leadership and hands-on implementation so complex initiatives move from concept to measurable business outcomes without losing intent along the way.",
    ],
    ctaTitle: "Let's discuss your transformation agenda.",
    ctaBody:
      "Bring us the initiative that matters most this year — modernization, Oracle, cloud, AI or a program that needs to get back on track.",
  },
  services: {
    eyebrow: "Services",
    title: "End-to-end enterprise technology services.",
    lede: "Strategy, architecture, implementation, modernization and optimization — organized into four strategic practice areas.",
  },
  approach: {
    eyebrow: "Approach",
    title: "From strategic intent to operating reality.",
    lede: "A disciplined, executive-led method that keeps architecture, delivery and business value connected at every phase.",
    phases: [
      {
        step: "01",
        title: "Align",
        description:
          "Clarify business objectives, constraints and success measures with executive stakeholders before any technology decision is made.",
      },
      {
        step: "02",
        title: "Assess",
        description:
          "Evaluate the current landscape — applications, data, integration, cloud, cost and risk — and establish an evidence-based baseline.",
      },
      {
        step: "03",
        title: "Architect",
        description:
          "Design the target architecture and transition states, with governance, standards and non-functional requirements defined up front.",
      },
      {
        step: "04",
        title: "Deliver",
        description:
          "Lead implementation and integration with hands-on technical leadership, delivery assurance and transparent program governance.",
      },
      {
        step: "05",
        title: "Optimize",
        description:
          "Tune performance, reduce run cost and drive continuous improvement against the outcomes agreed at the start.",
      },
    ],
    principlesTitle: "Operating principles",
    principles: [
      {
        title: "Outcomes over activity",
        description: "Every engagement is measured against business results, not effort or headcount.",
      },
      {
        title: "Architecture before acceleration",
        description: "Speed is only valuable when the underlying design can carry it.",
      },
      {
        title: "Senior people, on the work",
        description: "The people who advise are the people who deliver.",
      },
      {
        title: "Transparent governance",
        description: "Clear decisions, documented trade-offs, no surprises at steering committee.",
      },
    ],
  },
  about: {
    eyebrow: "About",
    title: "Premium enterprise consulting, without the distance.",
    lede: "XERONIA partners with executive leadership on the initiatives that define the next decade of the business.",
    body: [
      "We advise, architect and deliver enterprise technology, artificial intelligence and digital transformation programs for organizations where the stakes and the complexity are both high.",
      "Our work spans strategy, architecture, implementation, modernization and optimization — with senior practitioners engaged from the first workshop through post-go-live improvement.",
      "Based in the San Francisco Bay Area, we work with leadership teams across North America and Latin America in English and Spanish.",
    ],
    notTitle: "What we are not",
    not: [
      "A staffing company",
      "A body shop",
      "A commodity systems integrator",
      "A strategy deck with no delivery behind it",
    ],
    isTitle: "What we are",
    is: [
      "An executive-level advisory partner",
      "An enterprise architecture practice",
      "A hands-on implementation and integration team",
      "Accountable for measurable business outcomes",
    ],
  },
  contact: {
    eyebrow: "Contact",
    title: "Start a conversation.",
    lede: "Tell us about the initiative you are planning, delivering or rescuing. We respond personally.",
    detailsTitle: "Direct contact",
    emailLabel: "General inquiries",
    executiveLabel: "Executive contact",
    phoneLabel: "Phone",
    locationLabel: "Location",
    linkedinLabel: "LinkedIn",
    websiteLabel: "Website",
    form: {
      name: "Full name",
      namePlaceholder: "",
      email: "Work email",
      emailPlaceholder: "",
      company: "Company",
      companyPlaceholder: "Company name",
      interest: "Area of interest",
      interestPlaceholder: "Select a practice area",
      message: "How can we help?",
      messagePlaceholder: "Briefly describe your initiative, timeline and current challenges.",
      submit: "Send message",
      required: "This field is required.",
      invalidEmail: "Enter a valid email address.",
      success: "Your email client is opening with the message ready to send.",
      helper:
        "Submitting opens a pre-filled email to our team. Prefer to write directly? Use the address above.",
    },
  },
  footer: {
    blurb:
      "Enterprise technology, artificial intelligence and digital transformation consulting for executive leadership.",
    navTitle: "Navigate",
    contactTitle: "Contact",
    rights: "All rights reserved.",
  },
  practices: enPractices,
};

const es: Copy = {
  nav: {
    home: "Inicio",
    services: "Servicios",
    approach: "Enfoque",
    about: "Nosotros",
    contact: "Contacto",
  },
  navAria: "Principal",
  skipToContent: "Ir al contenido principal",
  languageLabel: "Cambiar idioma",
  languageName: "English",
  cta: {
    primary: "Iniciar una conversación",
    secondary: "Ver servicios",
    contact: "Contactar a XERONIA",
  },
  meta: {
    home: {
      title: "XERONIA — Tecnología Empresarial, IA y Transformación Digital",
      description:
        "XERONIA es una firma de consultoría empresarial premium que acompaña a la alta dirección para diseñar, implementar, modernizar y optimizar tecnología empresarial, IA y transformación digital.",
    },
    services: {
      title: "Servicios — Consultoría en Tecnología Empresarial e IA | XERONIA",
      description:
        "Cuatro áreas de práctica: tecnología empresarial, arquitectura empresarial, inteligencia artificial y datos, y transformación digital y ejecución.",
    },
    approach: {
      title: "Enfoque — De la Estrategia a Resultados Medibles | XERONIA",
      description:
        "Cómo XERONIA entrega valor en todo el ciclo de transformación: estrategia, evaluación, arquitectura, diseño, implementación, integración y optimización.",
    },
    about: {
      title: "Nosotros — Asesoría Ejecutiva y Ejecución Real | XERONIA",
      description:
        "XERONIA combina asesoría ejecutiva, arquitectura empresarial e implementación práctica. No somos una firma de staffing ni un integrador genérico.",
    },
    contact: {
      title: "Contacto — Consultoría en Tecnología Empresarial | XERONIA",
      description:
        "Conversemos sobre sus iniciativas de tecnología empresarial, soluciones Oracle, IA y transformación digital.",
    },
  },
  heroAlts: {
    home: "Filas de gabinetes de servidores empresariales en una sala de centro de datos en penumbra",
    services:
      "Centro de mando de operaciones empresariales con pantallas de topología de sistemas y telemetría",
    approach:
      "Esquema de arquitectura empresarial por capas: canales, servicios, datos e integración",
    about: "Instalación petroquímica y estructuras de tuberías de acero al anochecer",
    contact: "Fachada geométrica de vidrio y acero de una torre corporativa a la hora azul",
  },
  home: {
    eyebrow: "Tecnología Empresarial, IA y Transformación Digital",
    title: "Transformamos la tecnología empresarial para la era de la IA.",
    lede: "Desde la estrategia y la arquitectura hasta la implementación y optimización, XERONIA diseña y entrega las plataformas, los datos y las capacidades inteligentes que impulsan la empresa moderna.",
    heroImageAlt:
      "Retícula isométrica abstracta de planos translúcidos y nodos luminosos que representan la arquitectura empresarial",
    heroCapabilities: [
      "Tecnología Empresarial",
      "Inteligencia Artificial",
      "Arquitectura Empresarial",
      "Nube",
      "Integración",
      "Transformación",
    ],
    pillars: [
      {
        title: "Asesoría ejecutiva",
        description:
          "Trabajamos al nivel de la dirección: estrategia, prioridades de inversión y modelos operativos, no presentaciones.",
      },
      {
        title: "Arquitectura empresarial",
        description:
          "Arquitectura de negocio, aplicaciones, datos y seguridad diseñada para resistir la presión real de la ejecución.",
      },
      {
        title: "Ejecución práctica",
        description:
          "Liderazgo técnico e implementación que llevan las decisiones hasta resultados medibles.",
      },
    ],
    practicesTitle: "Cuatro áreas de práctica",
    practicesLede:
      "Capacidad profunda en las plataformas, arquitecturas y programas que definen a las empresas modernas.",
    lifecycleTitle: "Valor en todo el ciclo de vida",
    lifecycleLede:
      "Acompañamos desde la primera pregunta estratégica hasta la mejora continua posterior a la puesta en marcha.",
    lifecycle: [
      "Estrategia",
      "Evaluación",
      "Arquitectura Empresarial",
      "Diseño de Solución",
      "Implementación",
      "Integración de Sistemas",
      "Liderazgo de Programas",
      "Optimización",
      "Mejora Continua",
    ],
    differenceTitle: "Un socio diferente",
    differenceBody: [
      "Las consultoras tradicionales se detienen en la estrategia. Las firmas de implementación entran cuando las decisiones difíciles ya se tomaron. XERONIA hace ambas.",
      "Combinamos asesoría ejecutiva, arquitectura empresarial, liderazgo técnico e implementación práctica para que las iniciativas complejas pasen del concepto a resultados de negocio medibles sin perder la intención original.",
    ],
    ctaTitle: "Conversemos sobre su agenda de transformación.",
    ctaBody:
      "Tráiganos la iniciativa más importante del año: modernización, Oracle, nube, IA o un programa que necesita retomar el rumbo.",
  },
  services: {
    eyebrow: "Servicios",
    title: "Servicios integrales de tecnología empresarial.",
    lede: "Estrategia, arquitectura, implementación, modernización y optimización, organizados en cuatro áreas de práctica.",
  },
  approach: {
    eyebrow: "Enfoque",
    title: "De la intención estratégica a la realidad operativa.",
    lede: "Un método disciplinado y liderado por la dirección que mantiene conectadas arquitectura, ejecución y valor de negocio en cada fase.",
    phases: [
      {
        step: "01",
        title: "Alinear",
        description:
          "Clarificamos objetivos, restricciones y métricas de éxito con la dirección antes de cualquier decisión tecnológica.",
      },
      {
        step: "02",
        title: "Evaluar",
        description:
          "Analizamos el panorama actual —aplicaciones, datos, integración, nube, costo y riesgo— y establecemos una línea base basada en evidencia.",
      },
      {
        step: "03",
        title: "Arquitecturar",
        description:
          "Diseñamos la arquitectura objetivo y los estados de transición, con gobierno, estándares y requisitos no funcionales definidos desde el inicio.",
      },
      {
        step: "04",
        title: "Ejecutar",
        description:
          "Lideramos la implementación e integración con liderazgo técnico práctico, aseguramiento de la entrega y gobierno transparente.",
      },
      {
        step: "05",
        title: "Optimizar",
        description:
          "Ajustamos el rendimiento, reducimos el costo operativo e impulsamos la mejora continua frente a los resultados acordados.",
      },
    ],
    principlesTitle: "Principios de trabajo",
    principles: [
      {
        title: "Resultados sobre actividad",
        description: "Cada proyecto se mide por resultados de negocio, no por esfuerzo o personas.",
      },
      {
        title: "Arquitectura antes que velocidad",
        description: "La velocidad solo aporta valor si el diseño puede sostenerla.",
      },
      {
        title: "Perfiles senior en el trabajo",
        description: "Quienes asesoran son quienes ejecutan.",
      },
      {
        title: "Gobierno transparente",
        description: "Decisiones claras, compromisos documentados y ninguna sorpresa en el comité.",
      },
    ],
  },
  about: {
    eyebrow: "Nosotros",
    title: "Consultoría empresarial premium, sin distancia.",
    lede: "XERONIA acompaña a la alta dirección en las iniciativas que definen la próxima década del negocio.",
    body: [
      "Asesoramos, diseñamos y ejecutamos programas de tecnología empresarial, inteligencia artificial y transformación digital en organizaciones donde la complejidad y lo que está en juego son altos.",
      "Nuestro trabajo abarca estrategia, arquitectura, implementación, modernización y optimización, con profesionales senior involucrados desde el primer taller hasta la mejora posterior a la puesta en marcha.",
      "Con base en el Área de la Bahía de San Francisco, trabajamos con equipos directivos en Norteamérica y Latinoamérica, en inglés y español.",
    ],
    notTitle: "Lo que no somos",
    not: [
      "Una empresa de staffing",
      "Un proveedor de recursos por hora",
      "Un integrador de sistemas genérico",
      "Una presentación estratégica sin ejecución detrás",
    ],
    isTitle: "Lo que sí somos",
    is: [
      "Un socio asesor a nivel ejecutivo",
      "Una práctica de arquitectura empresarial",
      "Un equipo de implementación e integración práctico",
      "Responsables de resultados de negocio medibles",
    ],
  },
  contact: {
    eyebrow: "Contacto",
    title: "Iniciemos una conversación.",
    lede: "Cuéntenos sobre la iniciativa que está planificando, ejecutando o rescatando. Respondemos personalmente.",
    detailsTitle: "Contacto directo",
    emailLabel: "Consultas generales",
    executiveLabel: "Contacto ejecutivo",
    phoneLabel: "Teléfono",
    locationLabel: "Ubicación",
    linkedinLabel: "LinkedIn",
    websiteLabel: "Sitio web",
    form: {
      name: "Nombre completo",
      namePlaceholder: "",
      email: "Correo corporativo",
      emailPlaceholder: "",
      company: "Empresa",
      companyPlaceholder: "Nombre de la empresa",
      interest: "Área de interés",
      interestPlaceholder: "Seleccione un área de práctica",
      message: "¿Cómo podemos ayudar?",
      messagePlaceholder: "Describa brevemente su iniciativa, plazos y desafíos actuales.",
      submit: "Enviar mensaje",
      required: "Este campo es obligatorio.",
      invalidEmail: "Ingrese un correo electrónico válido.",
      success: "Se está abriendo su cliente de correo con el mensaje listo para enviar.",
      helper:
        "Al enviar se abre un correo prellenado a nuestro equipo. ¿Prefiere escribir directamente? Use la dirección indicada.",
    },
  },
  footer: {
    blurb:
      "Consultoría en tecnología empresarial, inteligencia artificial y transformación digital para la alta dirección.",
    navTitle: "Navegación",
    contactTitle: "Contacto",
    rights: "Todos los derechos reservados.",
  },
  practices: esPractices,
};

export const copy: Record<Locale, Copy> = { en, es };

export type { Copy };
