/**
 * Central configuration for XERONIA.
 *
 * All contact information, external links and feature flags live here so the
 * rest of the application never hardcodes them.
 */

export const contact = {
  company: "XERONIA",
  legalName: "Xeronia Systems LLC",
  /** Public inbox shown across the site. */
  email: "contact@xeronia.ai",
  /** Direct executive contact. Leave empty to keep it off the public site. */
  executiveEmail: "" as string,
  /** Set to a full E.164 string (e.g. "+1 415 555 0123") to display phone links. */
  phone: "" as string,
  location: {
    city: "San Francisco ",
    region: "California",
    country: "USA",
    full: "San Francisco, California, USA",
  },
  website: "https://xeronia.ai",
  /** Public company LinkedIn URL. Leave empty to hide all LinkedIn references. */
  linkedin: "" as string,
} as const;

export const featureFlags = {
  /**
   * Oracle Partner Network branding.
   * false -> every Oracle Partner mark, badge and claim stays hidden.
   * true  -> renders the OraclePartnerBadge slot where the official
   *          Oracle Partner Network artwork can be dropped in.
   */
  oraclePartnerApproved: false,
} as const;

export const siteMeta = {
  name: "XERONIA",
  url: contact.website,
  tagline: {
    en: "Enterprise Technology, AI & Digital Transformation",
    es: "Tecnología Empresarial, IA y Transformación Digital",
  },
} as const;
