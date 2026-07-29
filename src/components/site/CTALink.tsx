import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Locale, PageKey } from "@/lib/i18n";
import { pathFor } from "@/lib/i18n";

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold transition-all duration-200 active:scale-[0.98]";

const styles = {
  primary: "bg-primary text-primary-foreground shadow-sm hover:brightness-110 hover:shadow-md",
  outline: "border border-border bg-card text-navy hover:border-primary/50 hover:text-primary",
  ghostLight: "border border-white/25 text-navy-foreground hover:border-white/60 hover:bg-white/5",
} as const;

export function CTALink({
  locale,
  page,
  variant = "primary",
  children,
  withArrow = true,
  className,
}: {
  locale: Locale;
  page: PageKey;
  variant?: keyof typeof styles;
  children: React.ReactNode;
  withArrow?: boolean;
  className?: string;
}) {
  return (
    <a href={pathFor(locale, page)} className={cn(base, styles[variant], "group", className)}>
      {children}
      {withArrow ? (
        <ArrowRight
          className="size-4 transition-transform duration-200 group-hover:translate-x-1"
          aria-hidden="true"
        />
      ) : null}
    </a>
  );
}

export const buttonStyles = { base, styles };
