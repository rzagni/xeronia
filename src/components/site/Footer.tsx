import { Mail, MapPin, Phone } from "lucide-react";
import { contact } from "@/config/site";
import { copy } from "@/content/copy";
import { OraclePartnerBadge } from "./OraclePartnerBadge";
import { pageKeys, pathFor, type Locale } from "@/lib/i18n";

export function Footer({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-navy text-navy-foreground">
      <div className="container-x grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1.2fr] md:py-20">
        <div className="max-w-sm">
          <p className="font-display text-lg font-semibold tracking-[0.18em] uppercase">Xeronia</p>
          <p className="mt-4 text-base leading-7 text-navy-foreground/70">{t.footer.blurb}</p>
          <OraclePartnerBadge className="mt-8" />
        </div>

        <nav aria-label={t.footer.navTitle}>
          <h2 className="text-xs font-semibold tracking-[0.14em] uppercase text-navy-foreground/50">
            {t.footer.navTitle}
          </h2>
          <ul className="mt-5 space-y-3">
            {pageKeys.map((key) => (
              <li key={key}>
                <a
                  href={pathFor(locale, key)}
                  className="link-underline text-base text-navy-foreground/80 transition-colors hover:text-navy-foreground"
                >
                  {t.nav[key]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-xs font-semibold tracking-[0.14em] uppercase text-navy-foreground/50">
            {t.footer.contactTitle}
          </h2>
          <ul className="mt-5 space-y-4 text-base text-navy-foreground/80">
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-steel" aria-hidden="true" />
              <a href={`mailto:${contact.email}`} className="link-underline break-all">
                {contact.email}
              </a>
            </li>
            {contact.phone ? (
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-steel" aria-hidden="true" />
                <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="link-underline">
                  {contact.phone}
                </a>
              </li>
            ) : null}
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-steel" aria-hidden="true" />
              <span>{contact.location.full}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-2 py-6 text-xs text-navy-foreground/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {contact.company}. {t.footer.rights}
          </p>
          <p>{contact.location.full}</p>
        </div>
      </div>
    </footer>
  );
}
