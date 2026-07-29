# Firebase Hosting Deployment

## Requirements

- Node.js 22.12 or newer
- Firebase CLI
- Access to the `xeronia-6dea6` Firebase project

## First-time setup

```bash
nvm use 22
npm install
firebase login
firebase use --add
```

Select `xeronia-6dea6` and use the alias `default`.

## Build and deploy

```bash
npm run build
firebase deploy --only hosting
```

Firebase Hosting serves the static files from `dist/` and rewrites application routes to `index.html`.

## Preview before deployment

```bash
npm run build
npm run preview
```
