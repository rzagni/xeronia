"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitContactInquiry = void 0;
const https_1 = require("firebase-functions/v2/https");
const params_1 = require("firebase-functions/params");
const firebase_functions_1 = require("firebase-functions");
const resend_1 = require("resend");
const zod_1 = require("zod");
const resendApiKey = (0, params_1.defineSecret)("RESEND_API_KEY");
const CONTACT_RECIPIENT = "contact@xeronia.ai";
const CONTACT_SENDER = "Xeronia Website <website@xeronia.ai>";
const inquirySchema = zod_1.z.object({
    name: zod_1.z.string().trim().min(1).max(120),
    email: zod_1.z.string().trim().email().max(254),
    company: zod_1.z.string().trim().max(160).default(""),
    interest: zod_1.z.string().trim().max(160).default(""),
    message: zod_1.z.string().trim().min(10).max(5000),
    website: zod_1.z.string().trim().max(500).default(""),
    locale: zod_1.z.enum(["en", "es"]).default("en"),
    startedAt: zod_1.z.number().int().positive(),
});
function escapeHtml(value) {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}
exports.submitContactInquiry = (0, https_1.onCall)({
    region: "us-west1",
    memory: "256MiB",
    timeoutSeconds: 30,
    enforceAppCheck: true,
    secrets: [resendApiKey],
}, async (request) => {
    const parsed = inquirySchema.safeParse(request.data);
    if (!parsed.success) {
        throw new https_1.HttpsError("invalid-argument", "Please review the form fields.");
    }
    const inquiry = parsed.data;
    // Honeypot: silently acknowledge bot submissions without sending email.
    if (inquiry.website) {
        firebase_functions_1.logger.info("Contact honeypot triggered");
        return { ok: true };
    }
    // Very fast submissions are usually automated. Silently accept to avoid teaching bots.
    const elapsedMs = Date.now() - inquiry.startedAt;
    if (elapsedMs >= 0 && elapsedMs < 1500) {
        firebase_functions_1.logger.info("Contact form submitted implausibly fast");
        return { ok: true };
    }
    const subjectCompany = inquiry.company || inquiry.name;
    const submittedAt = new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
        timeStyle: "long",
        timeZone: "America/Los_Angeles",
    }).format(new Date());
    const safe = {
        name: escapeHtml(inquiry.name),
        email: escapeHtml(inquiry.email),
        company: escapeHtml(inquiry.company || "Not provided"),
        interest: escapeHtml(inquiry.interest || "Not specified"),
        message: escapeHtml(inquiry.message).replaceAll("\n", "<br>"),
        submittedAt: escapeHtml(submittedAt),
    };
    try {
        const resend = new resend_1.Resend(resendApiKey.value());
        const { error } = await resend.emails.send({
            from: CONTACT_SENDER,
            to: [CONTACT_RECIPIENT],
            replyTo: inquiry.email,
            subject: `Xeronia website inquiry — ${subjectCompany}`,
            html: `
          <div style="background:#f4f6f8;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;color:#172033">
            <div style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #e3e8ef;border-radius:12px;overflow:hidden">
              <div style="background:#111827;padding:24px 28px">
                <div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#cbd5e1">Xeronia</div>
                <h1 style="margin:8px 0 0;font-size:24px;line-height:1.3;color:#ffffff">New website inquiry</h1>
              </div>

              <div style="padding:28px">
                <table role="presentation" style="border-collapse:collapse;width:100%;margin-bottom:24px">
                  <tr>
                    <td style="width:120px;padding:9px 12px 9px 0;font-size:13px;font-weight:700;color:#64748b;vertical-align:top">Name</td>
                    <td style="padding:9px 0;font-size:15px;color:#172033">${safe.name}</td>
                  </tr>
                  <tr>
                    <td style="width:120px;padding:9px 12px 9px 0;font-size:13px;font-weight:700;color:#64748b;vertical-align:top">Email</td>
                    <td style="padding:9px 0;font-size:15px"><a href="mailto:${safe.email}" style="color:#2563eb;text-decoration:none">${safe.email}</a></td>
                  </tr>
                  <tr>
                    <td style="width:120px;padding:9px 12px 9px 0;font-size:13px;font-weight:700;color:#64748b;vertical-align:top">Company</td>
                    <td style="padding:9px 0;font-size:15px;color:#172033">${safe.company}</td>
                  </tr>
                  <tr>
                    <td style="width:120px;padding:9px 12px 9px 0;font-size:13px;font-weight:700;color:#64748b;vertical-align:top">Interest</td>
                    <td style="padding:9px 0;font-size:15px;color:#172033">${safe.interest}</td>
                  </tr>
                </table>

                <div style="font-size:13px;font-weight:700;color:#64748b;margin-bottom:8px">Message</div>
                <div style="padding:18px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;font-size:15px;line-height:1.65;color:#172033">${safe.message}</div>

                <div style="margin-top:24px;padding-top:18px;border-top:1px solid #e2e8f0;font-size:12px;line-height:1.6;color:#64748b">
                  Submitted from xeronia.ai<br>
                  ${safe.submittedAt}
                </div>
              </div>
            </div>
          </div>
        `,
            text: [
                "New Xeronia website inquiry",
                `Name: ${inquiry.name}`,
                `Email: ${inquiry.email}`,
                `Company: ${inquiry.company || "Not provided"}`,
                `Interest: ${inquiry.interest || "Not specified"}`,
                "",
                "Message:",
                inquiry.message,
                "",
                "Submitted from: xeronia.ai",
                `Submitted at: ${submittedAt}`,
            ].join("\n"),
        });
        if (error)
            throw new Error(error.message);
        return { ok: true };
    }
    catch (error) {
        firebase_functions_1.logger.error("Failed to send contact inquiry email", error);
        throw new https_1.HttpsError("internal", "We could not send your message. Please try again.");
    }
});
//# sourceMappingURL=index.js.map