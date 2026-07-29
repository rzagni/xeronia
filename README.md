# XERONIA Website

Official website for Xeronia Systems LLC.

## Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Firebase Hosting

This repository is independent of Lovable and does not require TanStack Start, Nitro, Cloudflare Workers, or a runtime server.

## Local development

```bash
nvm use 22
npm install
npm run dev
```

Open the local URL printed by Vite, normally `http://localhost:5173`.

## Production build

```bash
npm run build
npm run preview
```

The static production output is generated in `dist/`.

## Firebase Hosting

```bash
firebase use --add
npm run build
firebase deploy --only hosting
```

The contact form currently opens the visitor's configured email application. It does not yet submit through a Firebase Function or email provider.

## Contact form

The site now includes a Firebase Functions + App Check + reCAPTCHA Enterprise + Resend contact pipeline. Follow `CONTACT_FORM_SETUP.md` before deploying the function.
