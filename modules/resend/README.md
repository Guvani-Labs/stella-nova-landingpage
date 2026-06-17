# Resend module (optional)

This folder is the **optional email delivery layer** for the contact form. The site template ships with a working contact form UI and a Cloudflare Pages Function at `POST /api/contact`. By default, that API route sends mail through [Resend](https://resend.com).

**Not every client needs Resend.** Some projects only show a `mailto:` link, use Formspree, or wire the form to another provider. Keep or remove this module per project.

## When to use

- Client wants inquiries delivered to an inbox without a full backend.
- You deploy on **Cloudflare Pages** and are fine managing a Resend account + domain verification.

## When to skip or remove

- Contact page is **email + phone only** (no form submission).
- Client uses **Formspree**, **Web3Forms**, **Make/Zapier**, or another service.
- Email goes through **guvani-app-starter** or another backend instead.

## Enable (Resend)

1. Create a [Resend](https://resend.com) account and API key.
2. Verify a sending domain (or use `onboarding@resend.dev` for testing).
3. Set environment variables (see `env.example`):
   - `RESEND_API_KEY`
   - `CONTACT_TO_EMAIL` — inbox that receives submissions
   - `CONTACT_FROM_EMAIL` — e.g. `Acme Co <hello@yourdomain.com>`
4. **Local dev:** copy vars into `.dev.vars` at the repo root (gitignored). Run `npm run pages:dev` so `/api/contact` is available.
5. **Production:** add the same vars in Cloudflare Pages → Settings → Environment variables.

The API route imports this module from `functions/api/contact.ts`:

```ts
import {
  getResendConfig,
  sendContactEmailViaResend,
} from "../../modules/resend/send-contact-email";
```

## Remove (no Resend)

Pick the approach that fits the client.

### A — Mailto-only contact page (simplest)

1. Delete this folder: `modules/resend/`
2. Delete `functions/api/contact.ts`
3. Replace `src/pages/ContactPage.tsx` with a static layout (email, phone, address — no `<form>` or `fetch("/api/contact")`).
4. Remove Resend vars from `.dev.vars` and Cloudflare Pages.
5. Optional: remove `pages:dev` from `package.json` if you no longer need Pages Functions locally.

### B — Keep the form, swap the sender

1. Delete this folder: `modules/resend/`
2. Implement a new sender (e.g. `modules/formspree/send-contact-email.ts` or inline in `functions/api/contact.ts`).
3. Update the import in `functions/api/contact.ts` to call your provider instead of `sendContactEmailViaResend`.
4. Remove Resend env vars; add vars for the new provider.

### C — Disable API, point form elsewhere

1. Change the form `action` / `fetch` URL in `ContactPage.tsx` to the external service.
2. Delete `functions/api/contact.ts` and this `modules/resend/` folder.

## Files in this module

| File | Purpose |
|------|---------|
| `send-contact-email.ts` | Resend API client |
| `env.example` | Required environment variables |
| `README.md` | This document |

Validation, i18n error messages, and HTML/text body formatting stay in `functions/api/contact.ts` so you can reuse them with another sender.
