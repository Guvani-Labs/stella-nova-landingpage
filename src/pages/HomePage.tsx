import { NavLink } from "react-router-dom";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useTranslation } from "../lib/i18n";
import { site } from "../site.config";

export function HomePage() {
  const { t } = useTranslation();
  useScrollReveal();

  return (
    <div className="page home-page">
      <section className="hero reveal">
        <p className="eyebrow">{t("home.eyebrow")}</p>
        <h1 className="hero-title">{t("home.title")}</h1>
        <p className="lede">{t("home.lede")}</p>
        <div className="hero-actions">
          <NavLink to={site.routes.contact} className="button primary">
            {t("home.cta")}
          </NavLink>
        </div>
      </section>

      <section className="section reveal">
        <p className="eyebrow">{t("home.servicesEyebrow")}</p>
        <h2>{t("home.servicesTitle")}</h2>
        <div className="grid-3">
          <article className="card">
            <h3>{t("home.serviceOneTitle")}</h3>
            <p>{t("home.serviceOneBody")}</p>
          </article>
          <article className="card">
            <h3>{t("home.serviceTwoTitle")}</h3>
            <p>{t("home.serviceTwoBody")}</p>
          </article>
          <article className="card">
            <h3>{t("home.serviceThreeTitle")}</h3>
            <p>{t("home.serviceThreeBody")}</p>
          </article>
        </div>
      </section>
    </div>
  );
}
