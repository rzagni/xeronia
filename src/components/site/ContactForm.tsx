import { useState, type FormEvent } from "react";
import { contact } from "@/config/site";
import { copy } from "@/content/copy";
import type { Locale } from "@/lib/i18n";
import { buttonStyles } from "./CTALink";
import { cn } from "@/lib/utils";

interface Errors {
  name?: string;
  email?: string;
  message?: string;
}

export function ContactForm({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const f = t.contact.form;
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const company = String(data.get("company") ?? "").trim();
    const interest = String(data.get("interest") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const next: Errors = {};
    if (!name) next.name = f.required;
    if (!email) next.email = f.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = f.invalidEmail;
    if (!message) next.message = f.required;

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const body = [
      `${f.name}: ${name}`,
      `${f.email}: ${email}`,
      company ? `${f.company}: ${company}` : null,
      interest ? `${f.interest}: ${interest}` : null,
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    const subject = `${t.contact.eyebrow} — ${company || name}`;
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  const field =
    "mt-2 w-full rounded-md border border-input bg-card px-3.5 py-3 text-base text-foreground transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none";
  const label = "block text-sm font-medium text-navy";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={label}>
            {f.name} <span aria-hidden="true">*</span>
          </label>
          <input
            id="cf-name"
            name="name"
            autoComplete="name"
            required
            placeholder={f.namePlaceholder}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "cf-name-error" : undefined}
            className={cn(field, errors.name && "border-destructive")}
          />
          {errors.name ? (
            <p id="cf-name-error" className="mt-2 text-sm text-destructive">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="cf-email" className={label}>
            {f.email} <span aria-hidden="true">*</span>
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            placeholder={f.emailPlaceholder}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "cf-email-error" : undefined}
            className={cn(field, errors.email && "border-destructive")}
          />
          {errors.email ? (
            <p id="cf-email-error" className="mt-2 text-sm text-destructive">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="cf-company" className={label}>
            {f.company}
          </label>
          <input
            id="cf-company"
            name="company"
            autoComplete="organization"
            placeholder={f.companyPlaceholder}
            className={field}
          />
        </div>

        <div>
          <label htmlFor="cf-interest" className={label}>
            {f.interest}
          </label>
          <select id="cf-interest" name="interest" defaultValue="" className={field}>
            <option value="">{f.interestPlaceholder}</option>
            {t.practices.map((practice) => (
              <option key={practice.id} value={practice.name}>
                {practice.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="cf-message" className={label}>
          {f.message} <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="cf-message"
          name="message"
          rows={5}
          required
          placeholder={f.messagePlaceholder}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "cf-message-error" : undefined}
          className={cn(field, "resize-y", errors.message && "border-destructive")}
        />
        {errors.message ? (
          <p id="cf-message-error" className="mt-2 text-sm text-destructive">
            {errors.message}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" className={cn(buttonStyles.base, buttonStyles.styles.primary)}>
          {f.submit}
        </button>
        <p className="max-w-sm text-xs leading-relaxed text-muted-foreground">{f.helper}</p>
      </div>

      <p aria-live="polite" className="text-sm text-primary">
        {sent ? f.success : ""}
      </p>
    </form>
  );
}
