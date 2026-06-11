import { useEffect, useState } from "react";
import { HomePage } from "./pages/HomePage";

const NAV = [
  { href: "#arvet", label: "Arvet" },
  { href: "#ombord", label: "Livet ombord" },
  { href: "#galleri", label: "Galleri" },
  { href: "#specifikation", label: "Specifikation" },
];

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`layout${scrolled ? " scrolled" : ""}`}>
      <header className="header">
        <a href="#top" className="logo">
          <span className="logo-mark">Stella&nbsp;Nova</span>
          <span className="logo-sub">Classic Motor Yacht</span>
        </a>

        <nav className={`nav${menuOpen ? " open" : ""}`}>
          {NAV.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
            </a>
          ))}
          <a href="#kontakt" className="nav-cta" onClick={() => setMenuOpen(false)}>
            Anmäl intresse
          </a>
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
        <HomePage />
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <span className="logo-mark">Stella Nova</span>
            <p>Klassisk motoryacht · Byggd 1971</p>
          </div>
          <div className="footer-meta">
            <p>Saltsjöbaden, Sverige</p>
            <p>
              © {new Date().getFullYear()} Stella Nova. A true gentleman's yacht.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
