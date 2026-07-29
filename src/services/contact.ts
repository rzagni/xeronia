import { httpsCallable } from "firebase/functions";
import { functions } from "@/lib/firebase";
import type { Locale } from "@/lib/i18n";

export interface ContactInquiry {
  name: string;
  email: string;
  company: string;
  interest: string;
  message: string;
  website: string;
  locale: Locale;
  startedAt: number;
}

interface ContactResult {
  ok: boolean;
}

const submitContactInquiry = httpsCallable<ContactInquiry, ContactResult>(
  functions,
  "submitContactInquiry",
);

export async function sendContactInquiry(inquiry: ContactInquiry): Promise<void> {
  const result = await submitContactInquiry(inquiry);
  if (!result.data.ok) {
    throw new Error("Contact submission was not accepted.");
  }
}
