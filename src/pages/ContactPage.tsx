import { type FormEvent, useState } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { useTranslation } from "../lib/i18n";
import { site } from "../site.config";

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
        const showApiError = res.status === 400 && data?.error;
        setState({
          status: "error",
          message: showApiError ? data.error! : t("contact.errorGeneric"),
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
    <div className="page contact-page">
      <header className="contact-head">
        <p className="eyebrow">{t("contact.eyebrow")}</p>
        <h1 className="contact-title">{t("contact.title")}</h1>
        <p className="lede">{t("contact.lede")}</p>
      </header>

      <div className="contact-grid">
        <aside className="contact-info">
          <div className="contact-info-block">
            <p className="footer-label">{t("contact.email")}</p>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </div>
          <div className="contact-info-block">
            <p className="footer-label">{t("contact.location")}</p>
            <p>{t("contact.locationValue")}</p>
          </div>
        </aside>

        <div className="contact-form-wrap">
          {state.status === "success" ? (
            <p className="notice success">{state.message}</p>
          ) : null}
          {state.status === "error" ? (
            <p className="notice error">{state.message}</p>
          ) : null}

          <form className="form contact-form" onSubmit={onSubmit}>
            <label className="field">
              <span>{t("contact.name")}</span>
              <input name="name" type="text" autoComplete="name" required />
            </label>
            <label className="field">
              <span>{t("contact.emailField")}</span>
              <input name="email" type="email" autoComplete="email" required />
            </label>
            <label className="field">
              <span>{t("contact.company")}</span>
              <input name="company" type="text" autoComplete="organization" />
            </label>
            <label className="field">
              <span>{t("contact.message")}</span>
              <textarea name="message" rows={6} />
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
              className="button primary contact-submit"
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
    </div>
  );
}
