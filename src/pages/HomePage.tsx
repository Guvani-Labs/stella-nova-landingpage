import { type FormEvent, useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const img = (name: string) => `/images/${name}`;

const STATS = [
  { value: "27,4 m", label: "Längd över allt" },
  { value: "1971", label: "Byggår" },
  { value: "2× Scania V8", label: "1 300 hk" },
  { value: "10–12", label: "Bäddar" },
  { value: "18 knop", label: "Toppfart" },
];

const HIGHLIGHTS = [
  {
    title: "Tidlös design",
    body: "Stålskrov, aluminiumöverbyggnad och linjer som vänder blickar i varje hamn. En båt som aldrig blir omodern.",
  },
  {
    title: "Totalrenoverad",
    body: "Genomgripande renovering 2003–2006 med nytt teakdäck, två nya Scania-motorer och inredning av Retsloffs snickeri i Stockholm.",
  },
  {
    title: "Plats för sällskap",
    body: "Salong för tolv gäster, sju hytter och 10–12 bäddar. Skapad för långa somrar, middagar och stora sällskap.",
  },
  {
    title: "Bastu & badkar",
    body: "Egen bastu ombord, badkar i ägarsviten och tre separata duschar. Ren lyx, även till sjöss.",
  },
];

const FEATURES = [
  {
    eyebrow: "Ägarsviten",
    title: "En svit värdig en greve",
    body: "Ägarhytten är klädd i varmt valnötsträ med eget en suite-badrum, gott om förvaring och en bädd att sjunka ner i. Här märks hantverket i varje detalj — precis som det var tänkt när båten en gång byggdes för greve Lennart Bernadotte.",
    image: "stella-nova-1.jpg",
    align: "left",
  },
  {
    eyebrow: "Spa ombord",
    title: "Bastu, badkar och stilla morgnar",
    body: "Värm upp i den egna bastun, kliv ner i badkaret i ägarsviten och njut av en lyx få båtar kan erbjuda. Centralvärme håller behaglig temperatur ombord — oavsett om det är högsommar eller sen höst i skärgården.",
    image: "stella-nova-2008-742.jpg",
    align: "right",
  },
  {
    eyebrow: "Kabyssen",
    title: "Ett kök för riktiga middagar",
    body: "Fullt utrustad kabyss med spis, ugn, diskmaskin och tvättmaskin. Allt för att laga, duka och leva ombord precis som hemma — vecka efter vecka, gäst efter gäst.",
    image: "stella-nova-ext-12.jpg",
    align: "left",
  },
  {
    eyebrow: "På däck",
    title: "Soldäck med skärgården runt knuten",
    body: "Generösa solbäddar, teakdäck och bord dukade med utsikt över vattnet. Stella Nova är byggd för det svenska sommarlivet — champagne i kylaren och Stockholms skärgård som fond.",
    image: "stella-nova-ext-9.jpg",
    align: "right",
  },
];

const GALLERY = [
  { src: "stella-nova-2008-298.jpg", alt: "Stella Nova under gång i kvällsljus" },
  { src: "stella-nova-11.jpg", alt: "Förpikshytt med ljusinsläpp" },
  { src: "stella-nova-ext-10.jpg", alt: "Dukat teakbord på däck med Stockholm i bakgrunden" },
  { src: "stella-nova-5.jpg", alt: "Ägarhytt med bädd och soffa" },
  { src: "stella-nova-2008-332.jpg", alt: "Akter med namnet Stella Nova och svensk flagg" },
  { src: "stella-nova-7.jpg", alt: "Badrum med badkar" },
  { src: "stella-nova-ext-8.jpg", alt: "Solbädd på fördäck med champagne" },
  { src: "stella-nova-2.jpg", alt: "Hytt med bokhylla och läslampa" },
  { src: "stella-nova-3.jpg", alt: "Gästbadrum med teakinredning" },
  { src: "stella-nova-8.jpg", alt: "Hytt med våningssäng" },
  { src: "stella-nova-10.jpg", alt: "Duschutrymme i hytt" },
  { src: "stella-nova-2008-112.jpg", alt: "Stella Nova i profil under gång" },
];

const SPECS: Array<[string, string]> = [
  ["Längd över allt", "27,4 m"],
  ["Bredd", "5,88 m"],
  ["Djupgående", "1,50 m"],
  ["Deplacement", "55 000 kg"],
  ["Skrov", "Stål"],
  ["Däck / överbyggnad", "Aluminium"],
  ["Byggår", "1971"],
  ["Varv", "Schiffswerft Hameln, Tyskland"],
  ["Motorer", "2× Scania V8 DI16 (2005)"],
  ["Effekt", "1 300 hk totalt"],
  ["Motortimmar", "ca 1 000 h"],
  ["Bränsle", "Diesel"],
  ["Toppfart", "18 knop"],
  ["Marschfart", "12 knop"],
  ["Hytter", "7"],
  ["Bäddar", "10–12"],
  ["Toaletter", "4"],
  ["Duschar", "3"],
  ["Generator", "Onan"],
  ["Navigation", "Radar, GPS, VHF, ekolod, autopilot"],
  ["Komfort", "Centralvärme, bastu, badkar, diskmaskin, tvättmaskin"],
  ["Vinterförvaring", "Inomhus"],
  ["Läge", "Saltsjöbaden, Sverige"],
];

type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

export function HomePage() {
  const [state, setState] = useState<SubmitState>({ status: "idle" });
  useScrollReveal();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    const honeypot = String(fd.get("company_website") ?? "").trim();
    if (honeypot) {
      setState({
        status: "success",
        message: "Tack! Din intresseanmälan har skickats.",
      });
      return;
    }

    const payload = {
      name: String(fd.get("name") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      company: String(fd.get("company") ?? "").trim(),
      message: String(fd.get("message") ?? "").trim(),
      lang: "sv",
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
              ? data.error
              : "Något gick fel. Försök igen om en stund.",
        });
        return;
      }
      form.reset();
      setState({
        status: "success",
        message:
          "Tack! Din intresseanmälan har skickats. Vi återkommer personligen inom kort.",
      });
    } catch {
      setState({
        status: "error",
        message:
          "Kunde inte ansluta. Kontrollera din uppkoppling och försök igen.",
      });
    }
  }

  return (
    <div className="home" id="top">
      {/* HERO */}
      <section
        className="hero"
        style={{ backgroundImage: `url(${img("stella-nova-ext-5-1.jpg")})` }}
      >
        <div className="hero-overlay" />
        <div className="hero-content reveal">
          <h1 className="hero-title">A true gentleman's yacht</h1>
          <p className="hero-lede">
            Stella Nova — en tidlös 27-meters motoryacht med själ, historia och
            en standard som inte byggs längre. Totalrenoverad, sjösäker och redo
            för nästa ägare.
          </p>
          <div className="hero-actions">
            <a href="#kontakt" className="button primary">
              Anmäl ditt intresse
            </a>
            <a href="#specifikation" className="button ghost">
              Se specifikation
            </a>
          </div>
        </div>
        <a href="#arvet" className="scroll-hint" aria-label="Scrolla ner">
          <span />
        </a>
      </section>

      {/* STAT STRIP */}
      <section className="stats reveal">
        {STATS.map((s) => (
          <div className="stat" key={s.label}>
            <span className="stat-value">{s.value}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </section>

      {/* ARVET / STORY */}
      <section className="story section" id="arvet">
        <div className="story-text reveal">
          <p className="eyebrow">Arvet</p>
          <h2>Byggd för en greve. Skapad för att bestå.</h2>
          <p>
            Stella Nova ritades och byggdes ursprungligen på det tyska varvet
            Schiffswerft Hameln för greve Lennart Bernadotte. Ett stålskrov med
            överbyggnad i aluminium, formgivet av en tid då båtar byggdes för att
            hålla i generationer — inte säsonger.
          </p>
          <p>
            Mellan 2003 och 2006 genomgick hon en fullständig renovering: nytt
            teakdäck, två nya Scania V8-motorer och en interiör nyrenoverad av
            Retsloffs snickeri i Stockholm. Resultatet är en yacht med klassisk
            själ och modern driftsäkerhet — vinterförvarad inomhus och
            omsorgsfullt vårdad.
          </p>
        </div>
        <div className="story-image reveal">
          <img
            src={img("stella-nova-ext-1.jpg")}
            alt="Teakdäck och detaljer ombord på Stella Nova"
            loading="lazy"
          />
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="section highlights-section">
        <div className="section-head reveal">
          <p className="eyebrow">Varför Stella Nova</p>
          <h2>En båt utöver det vanliga</h2>
        </div>
        <div className="highlights">
          {HIGHLIGHTS.map((h) => (
            <article className="highlight reveal" key={h.title}>
              <h3>{h.title}</h3>
              <p>{h.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* BANNER */}
      <section
        className="banner reveal"
        style={{ backgroundImage: `url(${img("stella-nova-ext-7.jpg")})` }}
      >
        <div className="banner-overlay" />
        <p className="banner-quote">
          “Tidlös elegans, byggd i stål — en yacht med historia få kan mäta sig
          med.”
        </p>
      </section>

      {/* LIVET OMBORD */}
      <section className="section" id="ombord">
        <div className="section-head reveal">
          <p className="eyebrow">Livet ombord</p>
          <h2>Lyx i varje detalj</h2>
        </div>
        <div className="features">
          {FEATURES.map((f) => (
            <article className={`feature feature-${f.align} reveal`} key={f.title}>
              <div className="feature-media">
                <img src={img(f.image)} alt={f.title} loading="lazy" />
              </div>
              <div className="feature-text">
                <p className="eyebrow">{f.eyebrow}</p>
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* GALLERI */}
      <section className="section gallery-section" id="galleri">
        <div className="section-head reveal">
          <p className="eyebrow">Galleri</p>
          <h2>Stella Nova i bild</h2>
        </div>
        <div className="gallery">
          {GALLERY.map((g, i) => (
            <figure
              className={`gallery-item reveal${i % 5 === 0 ? " tall" : ""}`}
              key={g.src}
            >
              <img src={img(g.src)} alt={g.alt} loading="lazy" />
            </figure>
          ))}
        </div>
      </section>

      {/* SPECIFIKATION */}
      <section className="specs-section" id="specifikation">
        <div className="specs-inner">
          <div className="section-head reveal">
            <p className="eyebrow dark">Specifikation</p>
            <h2>Tekniska data</h2>
          </div>
          <dl className="specs reveal">
            {SPECS.map(([k, v]) => (
              <div className="spec-row" key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* KONTAKT */}
      <section
        className="contact"
        id="kontakt"
        style={{ backgroundImage: `url(${img("stella-nova-2008-112.jpg")})` }}
      >
        <div className="contact-overlay" />
        <div className="contact-inner reveal">
          <div className="contact-intro">
            <p className="eyebrow light">Kontakt</p>
            <h2>Anmäl ditt intresse</h2>
            <p>
              Vill du veta mer eller boka en privat visning? Lämna dina uppgifter
              så återkommer vi personligen — utan förpliktelser.
            </p>
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
                <span>Namn</span>
                <input name="name" type="text" autoComplete="name" required />
              </label>
              <label className="field">
                <span>E-post</span>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                />
              </label>
              <label className="field">
                <span>Telefon</span>
                <input name="company" type="tel" autoComplete="tel" />
              </label>
              <label className="field">
                <span>Meddelande</span>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Berätta gärna kort om ditt intresse…"
                />
              </label>

              <div className="hp" aria-hidden="true">
                <label>
                  <span>Lämna tomt</span>
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
                  ? "Skickar…"
                  : "Skicka intresseanmälan"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
