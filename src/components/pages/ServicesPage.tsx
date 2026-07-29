import { copy } from "@/content/copy";
import type { Locale } from "@/lib/i18n";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero, SectionHeading } from "@/components/site/Sections";
import { Reveal } from "@/components/site/Reveal";
import { CTALink } from "@/components/site/CTALink";
import { OraclePartnerBadge } from "@/components/site/OraclePartnerBadge";
import { EnergyValueChain, OracleEcosystemVisual } from "@/components/visuals/EnterpriseVisuals";
import heroServices from "@/assets/hero-services.jpg";

export function ServicesPage({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const energy = locale === "es"
    ? {
        eyebrow: "Experiencia sectorial",
        title: "Tecnología para organizaciones intensivas en activos",
        lede: "Aplicamos arquitectura empresarial, ERP, gestión de activos, integración, nube, datos e IA en toda la cadena de valor de energía, petróleo, gas y petroquímica.",
      }
    : {
        eyebrow: "Industry expertise",
        title: "Technology for asset-intensive enterprises",
        lede: "We apply enterprise architecture, ERP, asset management, integration, cloud, data and AI across the energy, oil, gas and petrochemical value chain.",
      };

  return (
    <SiteLayout locale={locale} page="services">
      <PageHero eyebrow={t.services.eyebrow} title={t.services.title} lede={t.services.lede} image={heroServices} imageAlt={t.heroAlts.services}>
        <CTALink locale={locale} page="contact" variant="ghostLight">{t.cta.primary}</CTALink>
      </PageHero>

      {t.practices.map((practice, index) => (
        <section key={practice.id} id={practice.id} className={index % 2 === 1 ? "section-y bg-surface" : "section-y"} aria-labelledby={`${practice.id}-heading`}>
          <div className="container-x grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <Reveal>
              <p className="eyebrow">{String(index + 1).padStart(2, "0")} / {String(t.practices.length).padStart(2, "0")}</p>
              <h2 id={`${practice.id}-heading`} className="mt-3 font-display text-3xl font-semibold text-navy md:text-4xl">{practice.name}</h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">{practice.summary}</p>
              {practice.id === "enterprise-technology" ? <div className="mt-8"><OracleEcosystemVisual locale={locale} /><OraclePartnerBadge className="mt-6" /></div> : null}
            </Reveal>

            <ul className="grid gap-5 sm:grid-cols-2">
              {practice.services.map((service, i) => (
                <Reveal as="li" key={service.title} delay={i * 70}>
                  <article className="card-lift h-full rounded-xl border border-border bg-card p-6 shadow-card">
                    <h3 className="font-display text-base font-semibold text-navy">{service.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
                  </article>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <section className="section-y bg-navy text-navy-foreground">
        <div className="container-x grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <Reveal><SectionHeading eyebrow={energy.eyebrow} title={energy.title} lede={energy.lede} tone="dark" /></Reveal>
          <Reveal delay={100}><EnergyValueChain locale={locale} /></Reveal>
        </div>
      </section>

      <section className="bg-surface">
        <div className="container-x flex flex-col items-start gap-6 py-16 md:flex-row md:items-center md:justify-between md:py-20">
          <h2 className="max-w-xl font-display text-2xl font-semibold text-navy md:text-3xl">{t.home.ctaTitle}</h2>
          <CTALink locale={locale} page="contact">{t.cta.contact}</CTALink>
        </div>
      </section>
    </SiteLayout>
  );
}
