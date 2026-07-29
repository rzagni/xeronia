import {
  BrainCircuit,
  Building2,
  Cloud,
  Database,
  Factory,
  GitBranch,
  Layers3,
  Rocket,
  ShieldCheck,
  Workflow,
  Gauge,
  Compass,
} from "lucide-react";
import type { Locale } from "@/lib/i18n";

const labels = {
  en: {
    business: "Business",
    applications: "Applications",
    data: "Data",
    ai: "AI & Analytics",
    integration: "Integration",
    cloud: "Cloud",
    security: "Security",
    strategy: "Strategy",
    architecture: "Architecture",
    implementation: "Implementation",
    optimization: "Optimization",
    upstream: "Explore",
    production: "Produce",
    downstream: "Process",
    transport: "Transport",
    market: "Market",
    enterprise: "Enterprise platforms",
    intelligence: "Data & intelligence",
  },
  es: {
    business: "Negocio",
    applications: "Aplicaciones",
    data: "Datos",
    ai: "IA y Analítica",
    integration: "Integración",
    cloud: "Nube",
    security: "Seguridad",
    strategy: "Estrategia",
    architecture: "Arquitectura",
    implementation: "Implementación",
    optimization: "Optimización",
    upstream: "Explorar",
    production: "Producir",
    downstream: "Procesar",
    transport: "Transportar",
    market: "Mercado",
    enterprise: "Plataformas empresariales",
    intelligence: "Datos e inteligencia",
  },
};

export function EnterpriseArchitectureVisual({ locale }: { locale: Locale }) {
  const l = labels[locale];
  const nodes = [
    { label: l.applications, Icon: Layers3, className: "left-1/2 top-[3%] -translate-x-1/2" },
    { label: l.business, Icon: Building2, className: "left-[2%] top-[20%]" },
    { label: l.data, Icon: Database, className: "right-[2%] top-[20%]" },
    { label: l.integration, Icon: GitBranch, className: "left-[1%] bottom-[19%]" },
    { label: l.cloud, Icon: Cloud, className: "left-1/2 bottom-[2%] -translate-x-1/2" },
    { label: l.security, Icon: ShieldCheck, className: "right-[1%] bottom-[19%]" },
  ];

  return (
    <div className="hero-visual-shell relative mx-auto aspect-[1.18/1] w-full max-w-[44rem] overflow-hidden rounded-[2rem] border border-white/20 bg-[#0b1f45]/72 shadow-[0_32px_100px_rgba(0,0,0,0.34)] backdrop-blur-sm">
      <div className="absolute inset-0 enterprise-mesh opacity-90" aria-hidden="true" />
      <div className="absolute inset-[9%] rounded-full border border-primary/25" aria-hidden="true" />
      <div className="hero-orbit absolute inset-[18%] rounded-full border border-primary/35" aria-hidden="true" />
      <div className="hero-orbit hero-orbit-reverse absolute inset-[29%] rounded-full border border-dashed border-steel/45" aria-hidden="true" />
      <svg className="absolute inset-0 size-full" viewBox="0 0 800 680" aria-hidden="true">
        <defs>
          <linearGradient id="heroLine" x1="0" x2="1">
            <stop offset="0" stopColor="rgba(74,149,255,.15)" />
            <stop offset=".5" stopColor="rgba(74,149,255,.9)" />
            <stop offset="1" stopColor="rgba(74,149,255,.15)" />
          </linearGradient>
        </defs>
        <g stroke="url(#heroLine)" strokeWidth="2" fill="none" className="hero-lines">
          <path d="M400 340 L400 92" />
          <path d="M400 340 L150 175" />
          <path d="M400 340 L650 175" />
          <path d="M400 340 L145 510" />
          <path d="M400 340 L400 600" />
          <path d="M400 340 L655 510" />
        </g>
        {["400,92", "150,175", "650,175", "145,510", "400,600", "655,510"].map((point) => {
          const [cx, cy] = point.split(",");
          return <circle key={point} cx={cx} cy={cy} r="6" fill="#5da3ff" className="hero-node-pulse" />;
        })}
      </svg>

      <div className="absolute left-1/2 top-1/2 flex size-40 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-primary/70 bg-[#071735]/95 text-center shadow-[0_0_110px_rgba(45,129,255,0.48)] md:size-48">
        <div className="absolute inset-3 rounded-full border border-primary/30" aria-hidden="true" />
        <BrainCircuit className="size-11 text-primary" aria-hidden="true" />
        <span className="mt-3 max-w-24 text-center text-[0.78rem] font-bold uppercase tracking-[0.12em] text-white md:text-sm">{l.ai}</span>
      </div>

      {nodes.map(({ label, Icon, className }, index) => (
        <div
          key={label}
          className={`hero-capability-node absolute ${className} flex min-w-32 items-center gap-2.5 rounded-xl border border-white/20 bg-[#081a3b]/92 px-4 py-3 shadow-xl backdrop-blur md:min-w-36`}
          style={{ animationDelay: `${index * 140}ms` }}
        >
          <Icon className="size-5 text-primary" aria-hidden="true" />
          <span className="text-sm font-semibold text-white/90">{label}</span>
        </div>
      ))}
    </div>
  );
}

export function TransformationFlow({ locale }: { locale: Locale }) {
  const l = labels[locale];
  const steps = [
    { title: l.strategy, Icon: Compass },
    { title: l.architecture, Icon: Layers3 },
    { title: l.implementation, Icon: Rocket },
    { title: l.optimization, Icon: Gauge },
  ];
  return (
    <div className="relative grid overflow-hidden rounded-2xl border border-white/15 bg-white/[0.045] md:grid-cols-4">
      {steps.map(({ title, Icon }, i) => (
        <div key={title} className="group relative border-b border-white/10 p-6 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0 lg:p-7">
          <div className="flex items-start gap-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-primary/45 bg-primary/12 text-primary transition-transform duration-300 group-hover:scale-105">
              <Icon className="size-6" aria-hidden="true" />
            </span>
            <div>
              <span className="text-xs font-bold tracking-[0.16em] text-white/50">0{i + 1}</span>
              <p className="mt-1 font-display text-lg font-semibold text-white">{title}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function EnergyValueChain({ locale }: { locale: Locale }) {
  const l = labels[locale];
  const stages = [l.upstream, l.production, l.downstream, l.transport, l.market];
  return (
    <div className="overflow-hidden rounded-2xl border border-white/15 bg-white/[0.045] shadow-2xl shadow-black/15">
      <div className="grid sm:grid-cols-5">
        {stages.map((stage, i) => (
          <div key={stage} className="group relative border-b border-white/10 p-5 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
            <div className="flex size-11 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 transition-transform duration-300 group-hover:-translate-y-1">
              <Factory className="size-6 text-primary" aria-hidden="true" />
            </div>
            <p className="mt-5 text-sm font-bold uppercase tracking-[0.08em] text-white/90">{stage}</p>
            <span className="absolute right-4 top-4 font-display text-3xl font-semibold text-white/[0.08]">0{i + 1}</span>
          </div>
        ))}
      </div>
      <div className="grid border-t border-white/10 md:grid-cols-2">
        <div className="flex items-center gap-3 p-5"><Workflow className="size-5 text-primary" /><span className="text-base text-white/75">{l.enterprise}</span></div>
        <div className="flex items-center gap-3 border-t border-white/10 p-5 md:border-l md:border-t-0"><BrainCircuit className="size-5 text-primary" /><span className="text-base text-white/75">{l.intelligence}</span></div>
      </div>
    </div>
  );
}

export function OracleEcosystemVisual({ locale }: { locale: Locale }) {
  const title = locale === "es" ? "Ecosistema empresarial Oracle" : "Oracle enterprise ecosystem";
  const items = ["Fusion Cloud", "E-Business Suite", "ERP · SCM · HCM · EPM", "OCI", "Integration · SOA", "Database · Analytics"];
  return (
    <div className="rounded-2xl border border-border bg-card p-7 shadow-card">
      <p className="eyebrow">{title}</p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {items.map((item, i) => (
          <div key={item} className="flex items-center gap-3 rounded-lg border border-border bg-surface px-4 py-4">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-navy text-xs font-semibold text-white">{i + 1}</span>
            <span className="text-base font-medium text-navy">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
