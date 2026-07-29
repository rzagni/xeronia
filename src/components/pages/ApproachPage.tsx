import { copy } from "@/content/copy";
import type { Locale } from "@/lib/i18n";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero, SectionHeading } from "@/components/site/Sections";
import { Reveal } from "@/components/site/Reveal";
import { CTALink } from "@/components/site/CTALink";
import heroApproach from "@/assets/hero-approach.jpg";

export function ApproachPage({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const a = t.approach;

  return (
    <SiteLayout locale={locale} page="approach">
      <PageHero
        eyebrow={a.eyebrow}
        title={a.title}
        lede={a.lede}
        image={heroApproach}
        imageAlt={t.heroAlts.approach}
      />

      <section className="section-y" aria-labelledby="phases-heading">
        <div className="container-x">
          <h2 id="phases-heading" className="sr-only">
            {a.eyebrow}
          </h2>
          <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {a.phases.map((phase, i) => (
              <Reveal as="li" key={phase.step} delay={i * 80}>
                <article className="card-lift h-full rounded-xl border border-border bg-card p-7 shadow-card">
                  <span className="font-display text-3xl font-semibold text-secondary-foreground/25">
                    {phase.step}
                  </span>
                  <h3 className="mt-4 font-display text-xl font-semibold text-navy">
                    {phase.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {phase.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-y bg-surface">
        <div className="container-x grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <SectionHeading title={a.principlesTitle} eyebrow={t.nav.approach} />
          </Reveal>
          <ul className="grid gap-5 sm:grid-cols-2">
            {a.principles.map((principle, i) => (
              <Reveal as="li" key={principle.title} delay={i * 70}>
                <div className="h-full border-l-2 border-primary/40 pl-5">
                  <h3 className="font-display text-base font-semibold text-navy">
                    {principle.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {principle.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-navy text-navy-foreground">
        <div className="container-x flex flex-col items-start gap-6 py-16 md:flex-row md:items-center md:justify-between md:py-20">
          <h2 className="max-w-xl font-display text-2xl font-semibold md:text-3xl">
            {t.home.ctaTitle}
          </h2>
          <CTALink locale={locale} page="contact">
            {t.cta.contact}
          </CTALink>
        </div>
      </section>
    </SiteLayout>
  );
}
