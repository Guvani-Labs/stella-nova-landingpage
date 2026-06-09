import { useEffect, useState } from "react";
import { NavLink, Route, Routes, useLocation } from "react-router-dom";
import { LanguageSwitcher } from "./components/LanguageSwitcher";
import { usePageSeo } from "./hooks/usePageSeo";
import { useTranslation } from "./lib/i18n";
import { ContactPage } from "./pages/ContactPage";
import { HomePage } from "./pages/HomePage";
import { site } from "./site.config";

export default function App() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const { t } = useTranslation();
  usePageSeo();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/") {
      setScrolled(true);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  const isHome = pathname === "/";

  return (
    <div
      className={`layout${scrolled ? " scrolled" : ""}${
        isHome ? "" : " offset"
      }`}
    >
      <header className="header">
        <NavLink to="/" className="logo" end>
          {site.shortName}
        </NavLink>
        <nav className="nav">
          <NavLink to="/" end>
            {t("nav.home")}
          </NavLink>
          <NavLink to={site.routes.contact}>{t("nav.contact")}</NavLink>
          <LanguageSwitcher />
        </nav>
      </header>
      <main className="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path={site.routes.contact} element={<ContactPage />} />
        </Routes>
      </main>
      <footer className="footer">
        <div className="footer-grid">
          <div>
            <p className="footer-label">{t("footer.contact")}</p>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </div>
          <div>
            <p className="footer-label">{t("footer.location")}</p>
            <p>{t("footer.locationValue")}</p>
          </div>
        </div>
        <p className="footer-meta">
          {t("footer.copyright", { year: new Date().getFullYear() })}
        </p>
      </footer>
    </div>
  );
}
