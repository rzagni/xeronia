import { useEffect } from "react";
import { HomePage } from "@/components/pages/HomePage";
import { ServicesPage } from "@/components/pages/ServicesPage";
import { ApproachPage } from "@/components/pages/ApproachPage";
import { AboutPage } from "@/components/pages/AboutPage";
import { ContactPage } from "@/components/pages/ContactPage";
import type { Locale, PageKey } from "@/lib/i18n";
import { copy } from "@/content/copy";
import { siteMeta } from "@/config/site";

const routes: Record<string, { locale: Locale; page: PageKey }> = {
  "/": { locale: "en", page: "home" },
  "/services": { locale: "en", page: "services" },
  "/approach": { locale: "en", page: "approach" },
  "/about": { locale: "en", page: "about" },
  "/contact": { locale: "en", page: "contact" },
  "/es": { locale: "es", page: "home" },
  "/es/": { locale: "es", page: "home" },
  "/es/servicios": { locale: "es", page: "services" },
  "/es/enfoque": { locale: "es", page: "approach" },
  "/es/nosotros": { locale: "es", page: "about" },
  "/es/contacto": { locale: "es", page: "contact" },
};

function normalizePath(pathname: string) {
  if (pathname.length > 1 && pathname.endsWith("/")) return pathname.slice(0, -1);
  return pathname;
}

export function App() {
  const path = normalizePath(window.location.pathname);
  const route = routes[path] ?? { locale: "en" as const, page: "home" as const };
  const { locale, page } = route;
  const t = copy[locale];

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = `${t.nav[page]} | ${siteMeta.name}`;
    window.scrollTo(0, 0);
  }, [locale, page, t.nav]);

  switch (page) {
    case "services":
      return <ServicesPage locale={locale} />;
    case "approach":
      return <ApproachPage locale={locale} />;
    case "about":
      return <AboutPage locale={locale} />;
    case "contact":
      return <ContactPage locale={locale} />;
    default:
      return <HomePage locale={locale} />;
  }
}
