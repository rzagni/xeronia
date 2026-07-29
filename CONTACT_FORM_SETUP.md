# Xeronia contact form setup

The implementation sends submissions to `contact@xeronia.ai` through a protected Firebase callable function. The sender is `Xeronia Website <website@send.xeronia.ai>` and the visitor's address is used as `Reply-To`.

## Protection included

- Firebase App Check with reCAPTCHA Enterprise
- App Check enforcement on the Cloud Function
- hidden honeypot field
- server-side schema and length validation
- per-IP rate limit: 5 accepted attempts per hour
- ten-minute duplicate suppression
- Firestore audit record for every valid inquiry
- Resend API key and rate-limit salt in Google Secret Manager

## 1. Register the Firebase Web App

The Hosting deployment did not require a Firebase Web App, but the client SDK and App Check do.

In Firebase Console:

1. Open Project settings.
2. Under **Your apps**, select the Web icon (`</>`).
3. App nickname: `Xeronia Website`.
4. Do not enable Firebase Hosting during app registration; Hosting is already configured.
5. Copy the Firebase configuration values into a local `.env` file using `.env.example` as the template.

Do not commit `.env`.

## 2. Create Firestore

In Firebase Console:

1. Build > Firestore Database > Create database.
2. Choose a production location close to the function region. The function is currently `us-west1`.
3. Deploy the deny-all client rules included in this project:

```bash
firebase deploy --only firestore
```

The Admin SDK used by the Cloud Function bypasses client security rules.

## 3. Configure App Check and reCAPTCHA Enterprise

In Firebase Console:

1. Security > App Check.
2. Select the `Xeronia Website` web app.
3. Register reCAPTCHA Enterprise.
4. Add these allowed domains to the reCAPTCHA Enterprise key:
   - `xeronia.ai`
   - `www.xeronia.ai`
   - `xeronia-website.web.app`
   - `localhost` for development, or use a debug token instead
5. Copy the site key to `VITE_RECAPTCHA_ENTERPRISE_SITE_KEY` in `.env`.

The function already uses `enforceAppCheck: true`; requests without a valid App Check token are rejected.

For local development, register an App Check debug token in the Firebase console and place it in `VITE_APPCHECK_DEBUG_TOKEN` in `.env.local`.

## 4. Configure Resend

Create a Resend account, then add and verify the sending subdomain:

```text
send.xeronia.ai
```

Using a subdomain avoids interfering with the existing Mailgun SPF record on `xeronia.ai`. Add the exact SPF and DKIM records shown by Resend to Squarespace DNS. Do not replace or duplicate the existing apex SPF record.

Create a Resend API key with sending permission.

## 5. Store server secrets

From the project root:

```bash
firebase functions:secrets:set RESEND_API_KEY
firebase functions:secrets:set CONTACT_RATE_LIMIT_SALT
```

For `CONTACT_RATE_LIMIT_SALT`, use a long random value. Generate one on macOS with:

```bash
openssl rand -hex 32
```

## 6. Install, build and deploy

```bash
npm install
npm --prefix functions install
npm run build:all
firebase deploy --only firestore,functions,hosting
```

Cloud Functions deployment requires the Firebase project to be on the Blaze billing plan because the function calls the external Resend API and uses Secret Manager.

## 7. Test

Submit from:

- `https://xeronia.ai/contact`
- the Spanish contact page
- a private/incognito browser window

Confirm:

1. The page shows a success message without opening an email client.
2. `contact@xeronia.ai` receives the message.
3. Replying targets the visitor's email address.
4. Firestore contains a document in `contactInquiries` with status `emailed`.
5. App Check metrics show valid requests.

## Operations

Valid inquiry records contain personal data. Establish a retention policy appropriate for Xeronia. The `_contactRateLimits` and `_contactDuplicates` collections include `expiresAt` fields; configure Firestore TTL policies for those fields so the documents are removed automatically.
