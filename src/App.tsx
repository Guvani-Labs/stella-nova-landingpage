import { useEffect, useState } from "react";
import { Link, NavLink, Route, Routes, useLocation } from "react-router-dom";
import { usePageSeo } from "./hooks/usePageSeo";
import { useScrollReveal } from "./hooks/useScrollReveal";
import { nap } from "./lib/site-nap";
import { YACHT_SECTIONS, sectionPath } from "./lib/yacht-sections";
import { ContactPage } from "./pages/ContactPage";
import { HomePage } from "./pages/HomePage";
import { site } from "./site.config";

export default function App() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isHome = pathname === "/";

  usePageSeo();
  useScrollReveal(pathname);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  return (
    <div className={`layout${scrolled ? " scrolled" : ""}${isHome ? "" : " offset"}`}>
      <header className="header">
        <Link to="/" className="logo" onClick={() => setMenuOpen(false)}>
          <span className="logo-mark">Stella&nbsp;Nova</span>
          <span className="logo-sub">Classic Motor Yacht</span>
        </Link>

        <nav className={`nav${menuOpen ? " open" : ""}`} aria-label="Huvudmeny">
          {YACHT_SECTIONS.map((item) => (
            <a
              key={item.id}
              href={sectionPath(`#${item.id}`, isHome)}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <NavLink
            to={site.routes.contact}
            className="nav-cta"
            onClick={() => setMenuOpen(false)}
          >
            Anmäl intresse
          </NavLink>
        </nav>

        <button
          type="button"
          className={`menu-toggle${menuOpen ? " open" : ""}`}
          aria-label="Meny"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      <main className="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path={site.routes.contact} element={<ContactPage />} />
        </Routes>
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <span className="logo-mark">Stella Nova</span>
            <p>Klassisk motoryacht · Byggd 1971 · Säljes</p>
          </div>

          <div className="footer-links">
            <p className="footer-label">På sidan</p>
            <ul>
              {YACHT_SECTIONS.map((item) => (
                <li key={item.id}>
                  <Link to={item.path}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-contact">
            <p className="footer-label">Kontakt</p>
            <p>{nap.boat.locationLabel.sv}</p>
            <a href={`mailto:${nap.email}`}>{nap.email}</a>
            <p>
              <Link to={site.routes.contact}>Anmäl intresse</Link>
            </p>
          </div>
        </div>
        <p className="footer-copy">
          © {new Date().getFullYear()} Stella Nova. A true gentleman's yacht.
        </p>
      </footer>
    </div>
  );
}
