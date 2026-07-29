import { createHash } from "node:crypto";
import { getApps, initializeApp } from "firebase-admin/app";
import {
  FieldValue,
  Timestamp,
  getFirestore,
} from "firebase-admin/firestore";
import { HttpsError, onCall } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";
import { logger } from "firebase-functions";
import { Resend } from "resend";
import { z } from "zod";

if (getApps().length === 0) initializeApp();

const db = getFirestore();
const resendApiKey = defineSecret("RESEND_API_KEY");
const rateLimitSalt = defineSecret("CONTACT_RATE_LIMIT_SALT");

const CONTACT_RECIPIENT = "contact@xeronia.ai";
const CONTACT_SENDER = "Xeronia Website <website@send.xeronia.ai>";
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const DUPLICATE_WINDOW_MS = 10 * 60 * 1000;

const inquirySchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(254),
  company: z.string().trim().max(160).default(""),
  interest: z.string().trim().max(160).default(""),
  message: z.string().trim().min(10).max(5000),
  website: z.string().trim().max(500).default(""),
  locale: z.enum(["en", "es"]).default("en"),
  startedAt: z.number().int().positive(),
});

function hash(value: string, salt: string): string {
  return createHash("sha256").update(`${salt}:${value}`).digest("hex");
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function clientIp(rawRequest: { ip?: string; socket?: { remoteAddress?: string } }): string {
  return rawRequest.ip || rawRequest.socket?.remoteAddress || "unknown";
}

async function enforceRateLimit(ipHash: string): Promise<void> {
  const ref = db.collection("_contactRateLimits").doc(ipHash);
  const now = Timestamp.now();

  await db.runTransaction(async (transaction) => {
    const snapshot = await transaction.get(ref);
    const data = snapshot.data() as
      | { count?: number; windowStartedAt?: Timestamp }
      | undefined;
    const windowStartedAt = data?.windowStartedAt;
    const windowExpired =
      !windowStartedAt || now.toMillis() - windowStartedAt.toMillis() >= RATE_LIMIT_WINDOW_MS;

    if (windowExpired) {
      transaction.set(ref, {
        count: 1,
        windowStartedAt: now,
        expiresAt: Timestamp.fromMillis(now.toMillis() + RATE_LIMIT_WINDOW_MS * 2),
      });
      return;
    }

    const count = data?.count ?? 0;
    if (count >= RATE_LIMIT_MAX) {
      throw new HttpsError(
        "resource-exhausted",
        "Too many contact requests. Please try again later.",
      );
    }

    transaction.update(ref, {
      count: count + 1,
      expiresAt: Timestamp.fromMillis(now.toMillis() + RATE_LIMIT_WINDOW_MS * 2),
    });
  });
}

export const submitContactInquiry = onCall(
  {
    region: "us-west1",
    memory: "256MiB",
    timeoutSeconds: 30,
    enforceAppCheck: true,
    secrets: [resendApiKey, rateLimitSalt],
  },
  async (request) => {
    const parsed = inquirySchema.safeParse(request.data);
    if (!parsed.success) {
      throw new HttpsError("invalid-argument", "Please review the form fields.");
    }

    const inquiry = parsed.data;

    // Honeypot: silently acknowledge bot submissions without sending or storing them.
    if (inquiry.website) {
      logger.info("Contact honeypot triggered");
      return { ok: true };
    }

    // Very fast submissions are usually automated. Silently accept to avoid teaching bots.
    const elapsedMs = Date.now() - inquiry.startedAt;
    if (elapsedMs >= 0 && elapsedMs < 1500) {
      logger.info("Contact form submitted implausibly fast");
      return { ok: true };
    }

    const salt = rateLimitSalt.value();
    const ipHash = hash(clientIp(request.rawRequest), salt);
    const emailHash = hash(inquiry.email.toLowerCase(), salt);
    await enforceRateLimit(ipHash);

    const duplicateHash = hash(
      `${inquiry.email.toLowerCase()}|${inquiry.message.toLowerCase()}`,
      salt,
    );
    const duplicateRef = db.collection("_contactDuplicates").doc(duplicateHash);
    const duplicate = await duplicateRef.get();
    const duplicateCreatedAt = duplicate.data()?.createdAt as Timestamp | undefined;
    if (
      duplicateCreatedAt &&
      Date.now() - duplicateCreatedAt.toMillis() < DUPLICATE_WINDOW_MS
    ) {
      return { ok: true };
    }

    const inquiryRef = db.collection("contactInquiries").doc();
    const createdAt = Timestamp.now();
    await inquiryRef.set({
      name: inquiry.name,
      email: inquiry.email,
      emailHash,
      company: inquiry.company || null,
      interest: inquiry.interest || null,
      message: inquiry.message,
      locale: inquiry.locale,
      status: "received",
      source: "xeronia.ai",
      createdAt,
      updatedAt: createdAt,
    });

    const subjectCompany = inquiry.company || inquiry.name;
    const safe = {
      name: escapeHtml(inquiry.name),
      email: escapeHtml(inquiry.email),
      company: escapeHtml(inquiry.company || "Not provided"),
      interest: escapeHtml(inquiry.interest || "Not specified"),
      message: escapeHtml(inquiry.message).replaceAll("\n", "<br>"),
    };

    try {
      const resend = new Resend(resendApiKey.value());
      const { data, error } = await resend.emails.send({
        from: CONTACT_SENDER,
        to: [CONTACT_RECIPIENT],
        replyTo: inquiry.email,
        subject: `Xeronia website inquiry — ${subjectCompany}`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:680px;margin:0 auto;color:#172033">
            <h1 style="font-size:24px;margin-bottom:24px">New Xeronia website inquiry</h1>
            <table style="border-collapse:collapse;width:100%;margin-bottom:24px">
              <tr><td style="padding:8px 12px;font-weight:700;vertical-align:top">Name</td><td style="padding:8px 12px">${safe.name}</td></tr>
              <tr><td style="padding:8px 12px;font-weight:700;vertical-align:top">Email</td><td style="padding:8px 12px"><a href="mailto:${safe.email}">${safe.email}</a></td></tr>
              <tr><td style="padding:8px 12px;font-weight:700;vertical-align:top">Company</td><td style="padding:8px 12px">${safe.company}</td></tr>
              <tr><td style="padding:8px 12px;font-weight:700;vertical-align:top">Interest</td><td style="padding:8px 12px">${safe.interest}</td></tr>
            </table>
            <div style="padding:18px;background:#f5f7fa;border-radius:8px;line-height:1.6">${safe.message}</div>
            <p style="font-size:12px;color:#667085;margin-top:24px">Inquiry ID: ${inquiryRef.id}</p>
          </div>
        `,
        text: [
          "New Xeronia website inquiry",
          `Name: ${inquiry.name}`,
          `Email: ${inquiry.email}`,
          `Company: ${inquiry.company || "Not provided"}`,
          `Interest: ${inquiry.interest || "Not specified"}`,
          "",
          inquiry.message,
          "",
          `Inquiry ID: ${inquiryRef.id}`,
        ].join("\n"),
      });

      if (error) throw new Error(error.message);

      await inquiryRef.update({
        status: "emailed",
        emailProvider: "resend",
        emailId: data?.id ?? null,
        updatedAt: FieldValue.serverTimestamp(),
      });
      await duplicateRef.set({
        createdAt,
        expiresAt: Timestamp.fromMillis(createdAt.toMillis() + DUPLICATE_WINDOW_MS * 2),
      });

      return { ok: true };
    } catch (error) {
      logger.error("Failed to send contact inquiry email", error);
      await inquiryRef.update({
        status: "email_failed",
        updatedAt: FieldValue.serverTimestamp(),
      });
      throw new HttpsError(
        "internal",
        "We could not send your message. Please try again.",
      );
    }
  },
);
