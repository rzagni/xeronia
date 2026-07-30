# Xeronia contact form setup — email only

The contact form sends submissions directly to `contact@xeronia.ai` through a protected Firebase callable function. The sender is `Xeronia Website <website@send.xeronia.ai>` and the visitor's address is set as `Reply-To`.

No Firestore database is required.

## Protection included

- Firebase App Check using reCAPTCHA v3
- App Check enforcement on the callable Cloud Function
- hidden honeypot field
- minimum form-completion-time check
- server-side schema, email, and length validation
- Resend API key stored in Google Secret Manager

Because this version does not use a database or external rate-limit service, it does not provide durable per-IP rate limiting or duplicate suppression across Cloud Function instances.

## 1. Frontend environment configuration

Create `.env.local` in the project root using `.env.example` as the template. Add the Firebase Web App values and the public reCAPTCHA v3 site key.

Do not put the reCAPTCHA secret key or Resend API key in `.env.local`.

## 2. Configure App Check

In Firebase Console:

1. Open **App Check**.
2. Register the `Xeronia Website` web app with **reCAPTCHA (v3)**.
3. Paste the reCAPTCHA **secret key** into Firebase App Check.
4. Put the corresponding public **site key** in `.env.local` as `VITE_RECAPTCHA_SITE_KEY`.
5. Keep enforcement disabled until a successful test request appears in App Check metrics.

The function code uses `enforceAppCheck: true`. For the first deployment, either confirm App Check works locally or temporarily change it to `false`, deploy and test, then restore it to `true` and redeploy.

## 3. Configure Resend

In Resend, add and verify:

```text
send.xeronia.ai
```

Add the exact SPF and DKIM records Resend provides to Squarespace DNS. Using the sending subdomain avoids changing the existing Mailgun SPF record on the root domain.

Create a Resend API key with sending permission.

## 4. Store the server secret

From the project root:

```bash
firebase use
firebase functions:secrets:set RESEND_API_KEY
```

Confirm the active project is `xeronia-website`, then paste the Resend API key when prompted.

## 5. Install and build

```bash
npm install
npm --prefix functions install
npm run build:all
```

## 6. Deploy the function

```bash
firebase deploy --only functions
```

Cloud Functions deployment requires the Firebase project to use the Blaze billing plan because the function calls the external Resend API and uses Secret Manager.

## 7. Test before deploying Hosting

Run:

```bash
npm run dev
```

Submit a real message from the local contact page. Wait at least two seconds after the form appears before submitting.

Confirm:

1. The page displays its success state.
2. `contact@xeronia.ai` receives the email.
3. Replying targets the visitor's email address.
4. Firebase App Check metrics show a valid Functions request.
5. Cloud Functions logs show no App Check or Resend errors.

## 8. Deploy Hosting

```bash
npm run build
firebase deploy --only hosting
```

Then repeat the test at `https://xeronia.ai/contact`.
