/// <reference types="@cloudflare/workers-types" />

interface ContactPayload {
  name: string;
  email: string;
  company?: string;
  message?: string;
  lang?: string;
}

interface Env {
  RESEND_API_KEY?: string;
  CONTACT_TO_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
}

const MAX = { name: 120, email: 254, company: 160, message: 8000 } as const;

type Lang = "en" | "sv";

const MSG: Record<Lang, Record<string, string>> = {
  sv: {
    name: "Ange ett namn.",
    email: "Ange en giltig e-postadress.",
    company: "Företagsnamnet är för långt.",
    message: "Meddelandet är för långt.",
    serverError: "Något gick fel. Försök igen om en stund.",
    sendFailed: "Något gick fel. Försök igen om en stund.",
    subject: "Ny förfrågan från",
    noMessage: "(Inget meddelande)",
    nameLabel: "Namn",
    emailLabel: "E-post",
    companyLabel: "Företag",
    messageLabel: "Meddelande",
    heading: "Ny förfrågan",
  },
  en: {
    name: "Please enter a name.",
    email: "Please enter a valid email address.",
    company: "Company name is too long.",
    message: "Message is too long.",
    serverError: "Something went wrong. Please try again shortly.",
    sendFailed: "Something went wrong. Please try again shortly.",
    subject: "New inquiry from",
    noMessage: "(No message)",
    nameLabel: "Name",
    emailLabel: "Email",
    companyLabel: "Company",
    messageLabel: "Message",
    heading: "New inquiry",
  },
};

function resolveLang(raw: unknown): Lang {
  return raw === "en" ? "en" : "sv";
}

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  if (
    request.headers.get("content-type")?.split(";")[0]?.trim() !==
    "application/json"
  ) {
    console.error("Contact API: invalid Content-Type");
    return json({ ok: false, error: MSG.sv.serverError }, 415);
  }

  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    console.error("Contact API: invalid JSON body");
    return json({ ok: false, error: MSG.sv.serverError }, 400);
  }

  const lang = resolveLang(body.lang);
  const m = MSG[lang];

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const company = typeof body.company === "string" ? body.company.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name || name.length > MAX.name) {
    return json({ ok: false, error: m.name }, 400);
  }
  if (!email || email.length > MAX.email || !email.includes("@")) {
    return json({ ok: false, error: m.email }, 400);
  }
  if (company.length > MAX.company) {
    return json({ ok: false, error: m.company }, 400);
  }
  if (message.length > MAX.message) {
    return json({ ok: false, error: m.message }, 400);
  }

  const to = env.CONTACT_TO_EMAIL?.trim();
  const apiKey = env.RESEND_API_KEY?.trim();
  const from =
    env.CONTACT_FROM_EMAIL?.trim() || "Site contact <onboarding@resend.dev>";

  if (!apiKey || !to) {
    console.error("Contact API: missing RESEND_API_KEY or CONTACT_TO_EMAIL");
    return json({ ok: false, error: m.serverError }, 503);
  }

  const messageBody = message || m.noMessage;
  const subject = `${m.subject} ${name}`;
  const text = [
    `${m.nameLabel}: ${name}`,
    `${m.emailLabel}: ${email}`,
    company ? `${m.companyLabel}: ${company}` : null,
    "",
    messageBody,
  ]
    .filter(Boolean)
    .join("\n");

  const html = `
    <h2>${escapeHtml(m.heading)}</h2>
    <p><strong>${escapeHtml(m.nameLabel)}:</strong> ${escapeHtml(name)}</p>
    <p><strong>${escapeHtml(m.emailLabel)}:</strong> ${escapeHtml(email)}</p>
    ${
      company
        ? `<p><strong>${escapeHtml(m.companyLabel)}:</strong> ${escapeHtml(company)}</p>`
        : ""
    }
    <p><strong>${escapeHtml(m.messageLabel)}:</strong></p>
    <pre style="white-space:pre-wrap;font-family:system-ui,sans-serif">${escapeHtml(
      messageBody,
    )}</pre>
  `;

  const resend = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject,
      text,
      html,
    }),
  });

  if (!resend.ok) {
    const errText = await resend.text().catch(() => "");
    console.error("Resend error", resend.status, errText);
    return json({ ok: false, error: m.sendFailed }, 502);
  }

  return json({ ok: true });
};

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
