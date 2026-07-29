export type Locale = "en" | "es";

export const locales: Locale[] = ["en", "es"];

/** Canonical page keys shared by both language trees. */
export type PageKey = "home" | "services" | "approach" | "about" | "contact";

/** Path for every page key in every locale. Single source of truth for nav,
 *  language switching and the sitemap. */
export const routePaths: Record<Locale, Record<PageKey, string>> = {
  en: {
    home: "/",
    services: "/services",
    approach: "/approach",
    about: "/about",
    contact: "/contact",
  },
  es: {
    home: "/es",
    services: "/es/servicios",
    approach: "/es/enfoque",
    about: "/es/nosotros",
    contact: "/es/contacto",
  },
};

export const pageKeys: PageKey[] = ["home", "services", "approach", "about", "contact"];

export function otherLocale(locale: Locale): Locale {
  return locale === "en" ? "es" : "en";
}

export function pathFor(locale: Locale, page: PageKey): string {
  return routePaths[locale][page];
}
