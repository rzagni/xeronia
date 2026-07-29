import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { copy } from "@/content/copy";
import { pageKeys, pathFor, otherLocale, type Locale, type PageKey } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function Header({ locale, page }: { locale: Locale; page: PageKey }) {
  const t = copy[locale];
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const other = otherLocale(locale);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [page, locale]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        scrolled
          ? "border-border bg-background/85 backdrop-blur-md"
          : "border-transparent bg-background",
      )}
    >
      <div className="container-x flex h-16 items-center justify-between gap-4 md:h-20">
        <a
          href={pathFor(locale, "home")}
          className="font-display text-xl font-semibold tracking-[0.18em] text-navy uppercase"
          aria-label={`XERONIA — ${t.nav.home}`}
        >
          Xeronia
        </a>

        <nav aria-label={t.navAria} className="hidden items-center gap-8 lg:flex">
          {pageKeys
            .filter((key) => key !== "home")
            .map((key) => (
              <a
                key={key}
                href={pathFor(locale, key)}
                className={cn(
                  "link-underline text-[0.95rem] font-medium transition-colors",
                  page === key ? "text-primary" : "text-foreground/75 hover:text-navy",
                )}
                aria-current={page === key ? "page" : undefined}
              >
                {t.nav[key]}
              </a>
            ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={pathFor(other, page)}
            aria-label={t.languageLabel}
            className="hidden rounded-md border border-border px-3 py-2 text-sm font-semibold tracking-wide text-foreground/80 transition-colors hover:border-primary/40 hover:text-primary sm:inline-flex"
          >
            {t.languageName}
          </a>
          <a
            href={pathFor(locale, "contact")}
            className="hidden rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:brightness-110 hover:shadow-md active:scale-[0.98] lg:inline-flex"
          >
            {t.cta.primary}
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-border text-navy transition-colors hover:bg-secondary lg:hidden"
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          aria-label={t.navAria}
          className="border-t border-border bg-background lg:hidden"
        >
          <ul className="container-x flex flex-col py-2">
            {pageKeys.map((key) => (
              <li key={key}>
                <a
                  href={pathFor(locale, key)}
                  className={cn(
                    "flex min-h-12 items-center border-b border-border/60 text-base font-medium",
                    page === key ? "text-primary" : "text-foreground",
                  )}
                  aria-current={page === key ? "page" : undefined}
                >
                  {t.nav[key]}
                </a>
              </li>
            ))}
            <li>
              <a
                href={pathFor(other, page)}
                aria-label={t.languageLabel}
                className="flex min-h-12 items-center text-base font-medium text-foreground/80"
              >
                {t.languageName}
              </a>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
