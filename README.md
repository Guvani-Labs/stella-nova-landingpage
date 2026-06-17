# Stella Nova Landing Page

Client site for **Stella Nova** — a classic 27 m motor yacht for sale in Saltsjöbaden, Sweden.

**SEO:** Nivå 1–4 implemented in code (FAQ, GBP, Eniro, Hitta excluded). Status: `docs/seo-status.md` (local, gitignored).

**Agents:** Internal Guvani docs in `docs/` (gitignored). Resend: **[modules/resend/README.md](modules/resend/README.md)**.

## Quick start

1. Update `src/lib/site-nap.ts` — NAP, email, location (used by UI + schema).
2. Update `src/locales/` for page copy and `seo.*` titles.
3. `index.html`, `public/sitemap.xml`, `public/robots.txt`, `public/llms.txt` — keep in sync with `site-nap.ts`.
4. Set up Resend — see [modules/resend/README.md](modules/resend/README.md).

## Develop locally (with API)

```bash
npm install
cp .dev.vars.example .dev.vars   # add Resend vars — see modules/resend/env.example
npm run pages:dev
```

`pages:dev` runs Vite + Cloudflare Pages Functions together so `/api/contact` works locally.

Frontend-only (no API):

```bash
npm run dev
```

## Deploy (Cloudflare Pages)

1. Push to GitHub and connect in Cloudflare Dashboard.
2. Build command: `npm run build`
3. Output directory: `dist`
4. Add Resend environment variables — see [modules/resend/README.md](modules/resend/README.md).

## API route

`POST /api/contact` — see `functions/api/contact.ts`.

Payload: `{ name, email, company?, message?, lang? }`

Returns `{ ok: true }` or `{ ok: false, error?: string }`. Requires the Resend module and env vars; otherwise responds with 503.

## Project structure

```
src/
  lib/site-nap.ts      # NAP + yacht facts (schema + UI source)
  lib/schema-graph.ts  # JSON-LD graph (AEO/GEO + local)
  lib/yacht-sections.ts
  lib/seo.ts
  pages/HomePage.tsx   # includes #fakta (citable facts) + #forsaljning
  pages/ContactPage.tsx
functions/
  api/contact.ts
modules/resend/
public/
  llms.txt             # AI crawlers (AEO/GEO)
  sitemap.xml, robots.txt, images/
docs/                  # gitignored — SEO checklists, roadmap, GSC instructions
```
