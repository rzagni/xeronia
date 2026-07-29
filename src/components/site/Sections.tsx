import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function PageHero({
  eyebrow,
  title,
  lede,
  image,
  imageAlt,
  children,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  image?: string;
  imageAlt?: string;
  children?: ReactNode;
}) {
  return (
    <section className="rule-grid relative overflow-hidden bg-navy text-navy-foreground">
      {image ? (
        <img
          src={image}
          alt={imageAlt ?? ""}
          width={1600}
          height={912}
          fetchPriority="high"
          decoding="async"
          className="pointer-events-none absolute inset-0 size-full object-cover opacity-30"
        />
      ) : null}
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0",
          image
            ? "bg-gradient-to-r from-navy via-navy/90 to-navy/45"
            : "pointer-events-none -top-40 -right-32 size-[32rem] rounded-full bg-primary/15 blur-3xl inset-auto",
        )}
      />
      <div className="container-x relative py-20 md:py-28">
        <Reveal className="max-w-3xl">
          <p className="eyebrow text-steel">{eyebrow}</p>
          <h1 className="mt-5 font-display text-4xl leading-[1.08] font-semibold md:text-5xl lg:text-[3.4rem]">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-foreground/75">{lede}</p>
          {children ? <div className="mt-9">{children}</div> : null}
        </Reveal>
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  className,
  tone = "light",
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2
        className={cn(
          "mt-3 font-display text-3xl font-semibold md:text-4xl",
          tone === "dark" ? "text-navy-foreground" : "text-navy",
        )}
      >
        {title}
      </h2>
      {lede ? (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed md:text-lg",
            tone === "dark" ? "text-navy-foreground/70" : "text-muted-foreground",
          )}
        >
          {lede}
        </p>
      ) : null}
    </div>
  );
}
