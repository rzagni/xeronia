import { Globe, Mail, MapPin, Phone, UserRound } from "lucide-react";
import { copy } from "@/content/copy";
import { contact } from "@/config/site";
import type { Locale } from "@/lib/i18n";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/Sections";
import { Reveal } from "@/components/site/Reveal";
import { ContactForm } from "@/components/site/ContactForm";
import heroContact from "@/assets/hero-contact.jpg";

export function ContactPage({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const c = t.contact;

  const rows = [
    {
      icon: Mail,
      label: c.emailLabel,
      value: contact.email,
      href: `mailto:${contact.email}`,
    },
    ...(contact.executiveEmail
      ? [{
          icon: UserRound,
          label: c.executiveLabel,
          value: contact.executiveEmail,
          href: `mailto:${contact.executiveEmail}`,
        }]
      : []),
    ...(contact.phone
      ? [
          {
            icon: Phone,
            label: c.phoneLabel,
            value: contact.phone,
            href: `tel:${contact.phone.replace(/\s/g, "")}`,
          },
        ]
      : []),
    {
      icon: MapPin,
      label: c.locationLabel,
      value: contact.location.full,
      href: null,
    },
    {
      icon: Globe,
      label: c.websiteLabel,
      value: "xeronia.ai",
      href: contact.website,
    },
  ];

  return (
    <SiteLayout locale={locale} page="contact">
      <PageHero
        eyebrow={c.eyebrow}
        title={c.title}
        lede={c.lede}
        image={heroContact}
        imageAlt={t.heroAlts.contact}
      />

      <section className="section-y">
        <div className="container-x grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold text-navy">{c.form.message}</h2>
            <div className="mt-8">
              <ContactForm locale={locale} />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="rounded-xl border border-border bg-card p-7 shadow-card">
              <h2 className="font-display text-xl font-semibold text-navy">{c.detailsTitle}</h2>
              <ul className="mt-6 space-y-5">
                {rows.map(({ icon: Icon, label, value, href }) => (
                  <li key={label} className="flex items-start gap-3">
                    <Icon className="mt-1 size-4 shrink-0 text-steel" aria-hidden="true" />
                    <div className="min-w-0">
                      <p className="eyebrow">{label}</p>
                      {href ? (
                        <a
                          href={href}
                          {...(href.startsWith("http")
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                          className="link-underline text-base font-medium break-words text-navy"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-base font-medium text-navy">{value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}
