import { Award, Check, Globe2, Layers3, Lightbulb, X } from "lucide-react";
import { copy } from "@/content/copy";
import { contact } from "@/config/site";
import type { Locale } from "@/lib/i18n";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero, SectionHeading } from "@/components/site/Sections";
import { Reveal } from "@/components/site/Reveal";
import { CTALink } from "@/components/site/CTALink";
import heroAbout from "@/assets/hero-about.jpg";

export function AboutPage({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const a = t.about;
  const leadership = locale === "es"
    ? {
        eyebrow: "Liderazgo",
        title: "Experiencia ejecutiva, profundidad técnica y mentalidad de constructor",
        body: "XERONIA está dirigida por Renzo Zagni, ejecutivo de tecnología, arquitecto empresarial, líder de inteligencia artificial y emprendedor con más de veinte años de experiencia global. Su trayectoria combina liderazgo en Oracle, arquitectura empresarial multinube, creación de productos para petróleo y gas, transformación de aplicaciones empresariales y entrega de soluciones de IA.",
        facts: [
          ["120.000+", "usuarios soportados por plataformas empresariales críticas"],
          ["300+", "profesionales liderados en organizaciones tecnológicas globales"],
          ["15", "sitios globales cubiertos por estrategias de arquitectura empresarial"],
          ["Patentes", "innovación aplicada en integración y automatización empresarial"],
        ],
        note: "La experiencia previa de liderazgo pertenece a Renzo Zagni y no implica que sus antiguos empleadores sean clientes o socios de XERONIA.",
      }
    : {
        eyebrow: "Leadership",
        title: "Executive experience, technical depth and a builder's mindset",
        body: "XERONIA is led by Renzo Zagni, a technology executive, enterprise architect, AI leader and entrepreneur with more than twenty years of global experience. His background combines leadership at Oracle, multi-cloud enterprise architecture, product development for oil and gas, enterprise-application transformation and delivery of production AI solutions.",
        facts: [
          ["120,000+", "users supported by mission-critical enterprise platforms"],
          ["300+", "professionals led across global technology organizations"],
          ["15", "global sites covered by enterprise architecture strategies"],
          ["Patents", "applied innovation in enterprise integration and automation"],
        ],
        note: "Prior leadership experience belongs to Renzo Zagni and does not imply that former employers are XERONIA clients or partners.",
      };

  return (
    <SiteLayout locale={locale} page="about">
      <PageHero eyebrow={a.eyebrow} title={a.title} lede={a.lede} image={heroAbout} imageAlt={t.heroAlts.about} />

      <section className="section-y">
        <div className="container-x grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <Reveal className="space-y-5">
            {a.body.map((paragraph) => <p key={paragraph} className="text-lg leading-8 text-muted-foreground">{paragraph}</p>)}
          </Reveal>
          <Reveal delay={100}>
            <dl className="rounded-xl border border-border bg-card p-7 shadow-card">
              <div className="flex flex-col gap-1 border-b border-border pb-4"><dt className="eyebrow">{t.contact.locationLabel}</dt><dd className="text-sm font-medium text-navy">{contact.location.full}</dd></div>
              <div className="flex flex-col gap-1 border-b border-border py-4"><dt className="eyebrow">{t.contact.emailLabel}</dt><dd className="text-sm font-medium text-navy"><a href={`mailto:${contact.email}`} className="link-underline break-all">{contact.email}</a></dd></div>

            </dl>
          </Reveal>
        </div>
      </section>

      <section className="section-y bg-navy text-navy-foreground">
        <div className="container-x">
          <Reveal><SectionHeading eyebrow={leadership.eyebrow} title={leadership.title} lede={leadership.body} tone="dark" /></Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {leadership.facts.map(([value, label], i) => {
              const Icon = [Globe2, Layers3, Lightbulb, Award][i];
              return (
                <Reveal key={value} delay={i * 70}>
                  <div className="h-full rounded-xl border border-white/12 bg-white/[0.04] p-6">
                    <Icon className="size-5 text-steel" aria-hidden="true" />
                    <p className="mt-6 font-display text-3xl font-semibold text-white">{value}</p>
                    <p className="mt-2 text-sm leading-relaxed text-white/58">{label}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <p className="mt-6 max-w-3xl text-xs leading-relaxed text-white/40">{leadership.note}</p>
        </div>
      </section>

      <section className="section-y bg-surface">
        <div className="container-x grid gap-6 md:grid-cols-2">
          <Reveal><div className="h-full rounded-xl border border-border bg-card p-7 shadow-card"><h2 className="font-display text-xl font-semibold text-navy">{a.notTitle}</h2><ul className="mt-5 space-y-3">{a.not.map((item) => <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground"><X className="mt-0.5 size-4 shrink-0 text-destructive" aria-hidden="true" /><span>{item}</span></li>)}</ul></div></Reveal>
          <Reveal delay={100}><div className="h-full rounded-xl border border-border bg-card p-7 shadow-card"><h2 className="font-display text-xl font-semibold text-navy">{a.isTitle}</h2><ul className="mt-5 space-y-3">{a.is.map((item) => <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground"><Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" /><span>{item}</span></li>)}</ul></div></Reveal>
        </div>
      </section>

      <section className="bg-navy text-navy-foreground"><div className="container-x flex flex-col items-start gap-6 py-16 md:flex-row md:items-center md:justify-between md:py-20"><h2 className="max-w-xl font-display text-2xl font-semibold md:text-3xl">{t.home.ctaTitle}</h2><CTALink locale={locale} page="contact">{t.cta.contact}</CTALink></div></section>
    </SiteLayout>
  );
}
