import { ArrowUpRight } from "lucide-react";
import { copy } from "@/content/copy";
import type { Locale } from "@/lib/i18n";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionHeading } from "@/components/site/Sections";
import { Reveal } from "@/components/site/Reveal";
import { CTALink } from "@/components/site/CTALink";
import { pathFor } from "@/lib/i18n";
import { EnergyValueChain, EnterpriseArchitectureVisual, TransformationFlow } from "@/components/visuals/EnterpriseVisuals";

export function HomePage({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const h = t.home;
  const energy = locale === "es"
    ? {
        eyebrow: "Práctica sectorial destacada",
        title: "Transformación para energía, petróleo, gas y petroquímica",
        body: "Conectamos plataformas empresariales, operaciones, activos, datos e inteligencia artificial para modernizar organizaciones intensivas en activos sin perder continuidad operacional.",
        cta: "Explorar capacidades",
      }
    : {
        eyebrow: "Featured industry practice",
        title: "Transformation for energy, oil, gas and petrochemicals",
        body: "We connect enterprise platforms, operations, assets, data and artificial intelligence to modernize asset-intensive organizations without losing operational continuity.",
        cta: "Explore capabilities",
      };

  return (
    <SiteLayout locale={locale} page="home">
      <section className="rule-grid relative overflow-hidden bg-navy text-navy-foreground">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_30%,rgba(59,130,246,0.18),transparent_38%)]" aria-hidden="true" />
        <div className="container-x relative grid min-h-[76svh] items-center gap-12 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:py-24 xl:min-h-[79svh]">
          <div className="reveal max-w-3xl">
            <p className="eyebrow text-steel">{h.eyebrow}</p>
            <h1 className="mt-6 font-display text-[3.25rem] leading-[0.96] font-semibold tracking-[-0.04em] sm:text-[4rem] lg:text-[4.8rem] xl:text-[5.35rem]">
              {h.title}
            </h1>
            <p className="mt-7 max-w-2xl text-xl leading-[1.65] text-navy-foreground/78 md:text-[1.35rem]">{h.lede}</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <CTALink locale={locale} page="contact">{t.cta.primary}</CTALink>
              <CTALink locale={locale} page="services" variant="ghostLight" withArrow={false}>{t.cta.secondary}</CTALink>
            </div>
          </div>
          <Reveal delay={120} className="hidden lg:block lg:scale-[1.05] xl:scale-[1.1]">
            <EnterpriseArchitectureVisual locale={locale} />
          </Reveal>
        </div>
        <div className="border-t border-white/10">
          <ul className="container-x flex flex-wrap gap-x-9 gap-y-3 py-5 text-sm font-semibold tracking-[0.11em] text-white/62 uppercase">
            {h.heroCapabilities.map((cap) => <li key={cap}>{cap}</li>)}
          </ul>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-x grid gap-6 md:grid-cols-3">
          {h.pillars.map((pillar, i) => (
            <Reveal as="article" key={pillar.title} delay={i * 90}>
              <div className="card-lift h-full rounded-xl border border-border bg-card p-7 shadow-card">
                <span className="font-display text-sm font-semibold text-primary">0{i + 1}</span>
                <h2 className="mt-4 font-display text-2xl font-semibold text-navy">{pillar.title}</h2>
                <p className="mt-3 text-base leading-7 text-muted-foreground">{pillar.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-y bg-surface">
        <div className="container-x">
          <Reveal><SectionHeading eyebrow={t.nav.services} title={h.practicesTitle} lede={h.practicesLede} /></Reveal>
          <ul className="mt-12 grid gap-6 md:grid-cols-2">
            {t.practices.map((practice, i) => (
              <Reveal as="li" key={practice.id} delay={i * 80}>
                <a href={`${pathFor(locale, "services")}#${practice.id}`} className="card-lift group flex h-full flex-col rounded-xl border border-border bg-card p-7 shadow-card">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-xl font-semibold text-navy">{practice.name}</h3>
                    <ArrowUpRight className="size-5 shrink-0 text-steel transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" aria-hidden="true" />
                  </div>
                  <p className="mt-3 text-base leading-7 text-muted-foreground">{practice.summary}</p>
                </a>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-y">
        <div className="container-x">
          <Reveal><SectionHeading eyebrow={t.nav.approach} title={h.lifecycleTitle} lede={h.lifecycleLede} /></Reveal>
          <Reveal delay={100} className="mt-10 rounded-2xl bg-navy p-3 md:p-4"><TransformationFlow locale={locale} /></Reveal>
          <div className="mt-8"><CTALink locale={locale} page="approach" variant="outline">{t.nav.approach}</CTALink></div>
        </div>
      </section>

      <section className="section-y bg-navy text-navy-foreground">
        <div className="container-x grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <Reveal>
            <p className="eyebrow text-steel">{energy.eyebrow}</p>
            <h2 className="mt-4 max-w-xl font-display text-4xl font-semibold leading-tight md:text-5xl">{energy.title}</h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/72">{energy.body}</p>
            <div className="mt-8"><CTALink locale={locale} page="services" variant="ghostLight">{energy.cta}</CTALink></div>
          </Reveal>
          <Reveal delay={120}><EnergyValueChain locale={locale} /></Reveal>
        </div>
      </section>

      <section className="section-y">
        <div className="container-x grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal><SectionHeading title={h.differenceTitle} eyebrow={t.nav.about} /></Reveal>
          <Reveal delay={100} className="space-y-5">
            {h.differenceBody.map((paragraph) => <p key={paragraph} className="text-lg leading-8 text-muted-foreground">{paragraph}</p>)}
            <CTALink locale={locale} page="about" variant="outline">{t.nav.about}</CTALink>
          </Reveal>
        </div>
      </section>

      <section className="section-y bg-surface">
        <div className="container-x">
          <Reveal>
            <div className="rounded-2xl border border-border bg-card px-8 py-14 text-center shadow-card md:px-16">
              <h2 className="mx-auto max-w-2xl font-display text-3xl font-semibold text-navy md:text-4xl">{h.ctaTitle}</h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">{h.ctaBody}</p>
              <div className="mt-9 flex justify-center"><CTALink locale={locale} page="contact">{t.cta.contact}</CTALink></div>
            </div>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}
