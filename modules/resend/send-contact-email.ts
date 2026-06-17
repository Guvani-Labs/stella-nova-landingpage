/**
 * Optional Resend email delivery for the contact form API.
 * Delete this folder and swap the sender in functions/api/contact.ts if the client
 * does not use Resend — see modules/resend/README.md.
 */

export interface ResendEnv {
  RESEND_API_KEY?: string;
  CONTACT_TO_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
}

export interface ContactEmailContent {
  to: string;
  from: string;
  replyTo: string;
  subject: string;
  text: string;
  html: string;
}

export interface ResendConfig {
  apiKey: string;
  to: string;
  from: string;
}

const DEFAULT_FROM = "Site contact <onboarding@resend.dev>";

export function getResendConfig(env: ResendEnv): ResendConfig | null {
  const apiKey = env.RESEND_API_KEY?.trim();
  const to = env.CONTACT_TO_EMAIL?.trim();
  const from = env.CONTACT_FROM_EMAIL?.trim() || DEFAULT_FROM;

  if (!apiKey || !to) {
    return null;
  }

  return { apiKey, to, from };
}

export async function sendContactEmailViaResend(
  apiKey: string,
  content: ContactEmailContent,
): Promise<{ ok: true } | { ok: false; status: number; errorText: string }> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from: content.from,
      to: [content.to],
      reply_to: content.replyTo,
      subject: content.subject,
      text: content.text,
      html: content.html,
    }),
  });

  if (!res.ok) {
    const errorText = await res.text().catch(() => "");
    return { ok: false, status: res.status, errorText };
  }

  return { ok: true };
}
