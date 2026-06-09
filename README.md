# Guvani Site Starter Pro (Level 2)

Everything in **[guvani-site-starter](https://github.com/Guvani-Labs/guvani-site-starter)**, plus a **contact form** backed by **Cloudflare Pages Functions** and **Resend**.

Use this for client sites that need serverless email delivery without a full backend.

## Quick start for a new client

1. Click **Use this template** on GitHub (or clone and push to a new repo).
2. Update `src/site.config.ts` — name, domain, email, location.
3. Replace copy in `src/locales/`.
4. Update SEO files in `index.html` and `public/`.
5. Set up Resend (see below).

## Develop locally (with API)

```bash
npm install
cp .dev.vars.example .dev.vars   # add RESEND_API_KEY
npm run pages:dev
```

`pages:dev` runs Vite + Cloudflare Pages Functions together so `/api/contact` works locally.

Frontend-only (no API):

```bash
npm run dev
```

## Resend setup

1. Create a [Resend](https://resend.com) account and API key.
2. Verify your sending domain (or use `onboarding@resend.dev` for testing).
3. In Cloudflare Pages → Settings → Environment variables, add:
   - `RESEND_API_KEY`
   - `CONTACT_TO_EMAIL` — where inquiries are delivered
   - `CONTACT_FROM_EMAIL` — e.g. `Acme Co <hello@yourdomain.com>`

For local dev, copy `.dev.vars.example` to `.dev.vars` (gitignored).

## Deploy (Cloudflare Pages)

1. Push to GitHub and connect in Cloudflare Dashboard.
2. Build command: `npm run build`
3. Output directory: `dist`
4. Add the Resend environment variables above.

## API route

`POST /api/contact` — see `functions/api/contact.ts`.

Payload: `{ name, email, company?, message?, lang? }`

## Related templates

| Template | Use case |
|---|---|
| **guvani-site-starter** | Static landing sites (no form API) |
| **guvani-site-starter-pro** (this repo) | Sites with contact form + Resend |
| **guvani-app-starter** | Next.js apps with backend options |
