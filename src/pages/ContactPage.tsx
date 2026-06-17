import { type FormEvent, useState } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { useTranslation } from "../lib/i18n";
import { nap } from "../lib/site-nap";

const img = (name: string) => `/images/${name}`;

type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

export function ContactPage() {
  const [state, setState] = useState<SubmitState>({ status: "idle" });
  const { t } = useTranslation();
  const { language } = useLanguage();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    const honeypot = String(fd.get("company_website") ?? "").trim();
    if (honeypot) {
      setState({ status: "success", message: t("contact.successHoneypot") });
      return;
    }

    const payload = {
      name: String(fd.get("name") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      company: String(fd.get("company") ?? "").trim(),
      message: String(fd.get("message") ?? "").trim(),
      lang: language,
    };

    setState({ status: "submitting" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
      } | null;
      if (!res.ok) {
        setState({
          status: "error",
          message:
            res.status === 400 && data?.error
              ? data.error!
              : t("contact.errorGeneric"),
        });
        return;
      }
      form.reset();
      setState({ status: "success", message: t("contact.success") });
    } catch {
      setState({ status: "error", message: t("contact.errorNetwork") });
    }
  }

  return (
    <section
      className="contact contact-page"
      id="kontakt"
      style={{ backgroundImage: `url(${img("stella-nova-2008-112.jpg")})` }}
      aria-label="Kontakt — anmäl intresse i Stella Nova"
    >
      <div className="contact-overlay" aria-hidden="true" />
      <div className="contact-inner reveal">
        <div className="contact-intro">
          <p className="eyebrow light">{t("contact.eyebrow")}</p>
          <h1 className="contact-title">{t("contact.title")}</h1>
          <p>{t("contact.lede")}</p>
          <div className="contact-meta">
            <p className="footer-label">{t("contact.location")}</p>
            <p>{nap.boat.locationLabel.sv}</p>
            <p className="footer-label">{t("contact.email")}</p>
            <a href={`mailto:${nap.email}`}>{nap.email}</a>
          </div>
        </div>

        <div className="contact-card">
          {state.status === "success" ? (
            <p className="notice success">{state.message}</p>
          ) : null}
          {state.status === "error" ? (
            <p className="notice error">{state.message}</p>
          ) : null}

          <form className="form" onSubmit={onSubmit}>
            <label className="field">
              <span>{t("contact.name")}</span>
              <input name="name" type="text" autoComplete="name" required />
            </label>
            <label className="field">
              <span>{t("contact.emailField")}</span>
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
              />
            </label>
            <label className="field">
              <span>{t("contact.phone")}</span>
              <input name="company" type="tel" autoComplete="tel" />
            </label>
            <label className="field">
              <span>{t("contact.message")}</span>
              <textarea
                name="message"
                rows={4}
                placeholder={t("contact.messagePlaceholder")}
              />
            </label>

            <div className="hp" aria-hidden="true">
              <label>
                <span>{t("contact.honeypot")}</span>
                <input
                  name="company_website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </label>
            </div>

            <button
              className="button primary block"
              type="submit"
              disabled={state.status === "submitting"}
            >
              {state.status === "submitting"
                ? t("contact.submitting")
                : t("contact.submit")}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
