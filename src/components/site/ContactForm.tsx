import { useRef, useState, type FormEvent } from "react";
import { copy } from "@/content/copy";
import type { Locale } from "@/lib/i18n";
import { sendContactInquiry } from "@/services/contact";
import { buttonStyles } from "./CTALink";
import { cn } from "@/lib/utils";

interface Errors {
  name?: string;
  email?: string;
  message?: string;
}

type SubmissionState = "idle" | "sending" | "success" | "error";

export function ContactForm({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const f = t.contact.form;
  const formStartedAt = useRef(Date.now());
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<SubmissionState>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const company = String(data.get("company") ?? "").trim();
    const interest = String(data.get("interest") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const website = String(data.get("website") ?? "").trim();

    const next: Errors = {};
    if (!name) next.name = f.required;
    if (!email) next.email = f.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = f.invalidEmail;
    if (!message) next.message = f.required;

    setErrors(next);
    setStatus("idle");
    if (Object.keys(next).length > 0) return;

    setStatus("sending");
    try {
      await sendContactInquiry({
        name,
        email,
        company,
        interest,
        message,
        website,
        locale,
        startedAt: formStartedAt.current,
      });
      form.reset();
      formStartedAt.current = Date.now();
      setStatus("success");
    } catch (error) {
      console.error("Contact form submission failed", error);
      setStatus("error");
    }
  }

  const field =
    "mt-2 w-full rounded-md border border-input bg-card px-3.5 py-3 text-base text-foreground transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none";
  const label = "block text-sm font-medium text-navy";
  const sending = status === "sending";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="cf-website">Website</label>
        <input
          id="cf-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

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
            maxLength={120}
            disabled={sending}
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
            maxLength={254}
            disabled={sending}
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
            maxLength={160}
            disabled={sending}
            placeholder={f.companyPlaceholder}
            className={field}
          />
        </div>

        <div>
          <label htmlFor="cf-interest" className={label}>
            {f.interest}
          </label>
          <select
            id="cf-interest"
            name="interest"
            defaultValue=""
            disabled={sending}
            className={field}
          >
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
          minLength={10}
          maxLength={5000}
          disabled={sending}
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
        <button
          type="submit"
          disabled={sending}
          className={cn(
            buttonStyles.base,
            buttonStyles.styles.primary,
            "disabled:cursor-wait disabled:opacity-60",
          )}
        >
          {sending ? f.sending : f.submit}
        </button>
        <p className="max-w-sm text-xs leading-relaxed text-muted-foreground">{f.helper}</p>
      </div>

      <p
        aria-live="polite"
        role={status === "error" ? "alert" : "status"}
        className={cn(
          "min-h-5 text-sm",
          status === "error" ? "text-destructive" : "text-primary",
        )}
      >
        {status === "success" ? f.success : status === "error" ? f.error : ""}
      </p>
    </form>
  );
}
