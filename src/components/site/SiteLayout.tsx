import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { copy } from "@/content/copy";
import type { Locale, PageKey } from "@/lib/i18n";

export function SiteLayout({
  locale,
  page,
  children,
}: {
  locale: Locale;
  page: PageKey;
  children: ReactNode;
}) {
  const t = copy[locale];

  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="sr-only rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60]"
      >
        {t.skipToContent}
      </a>
      <Header locale={locale} page={page} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer locale={locale} />
    </div>
  );
}
