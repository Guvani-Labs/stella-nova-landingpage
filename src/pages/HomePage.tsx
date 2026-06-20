import { Link } from "react-router-dom";
import { site } from "../site.config";

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
    alt: "Ägarsvit ombord på Stella Nova med valnötsträ och säng",
    body: "Ägarhytten är klädd i varmt valnötsträ med eget en suite-badrum, gott om förvaring och en bädd att sjunka ner i. Här märks hantverket i varje detalj — precis som det var tänkt när båten en gång byggdes för greve Lennart Bernadotte.",
    image: "stella-nova-1.jpg",
    align: "left",
  },
  {
    eyebrow: "Spa ombord",
    title: "Bastu, badkar och stilla morgnar",
    alt: "Badrum med badkar i ägarsviten på Stella Nova",
    body: "Värm upp i den egna bastun, kliv ner i badkaret i ägarsviten och njut av en lyx få båtar kan erbjuda. Centralvärme håller behaglig temperatur ombord — oavsett om det är högsommar eller sen höst i skärgården.",
    image: "stella-nova-2008-742.jpg",
    align: "right",
  },
  {
    eyebrow: "Kabyssen",
    title: "Ett kök för riktiga middagar",
    alt: "Fullt utrustad kabyss på Stella Nova med spis och diskmaskin",
    body: "Fullt utrustad kabyss med spis, ugn, diskmaskin och tvättmaskin. Allt för att laga, duka och leva ombord precis som hemma — vecka efter vecka, gäst efter gäst.",
    image: "stella-nova-ext-12.jpg",
    align: "left",
  },
  {
    eyebrow: "På däck",
    title: "Soldäck med skärgården runt knuten",
    alt: "Teakdäck på Stella Nova med solbäddar och skärgårdsutsikt",
    body: "Generösa solbäddar, teakdäck och bord dukade med utsikt över vattnet. Stella Nova är byggd för det svenska sommarlivet — champagne i kylaren och Stockholms skärgård som fond.",
    image: "stella-nova-ext-9.jpg",
    align: "right",
  },
];

const GALLERY = [
  {
    src: "stella-nova-2008-298.jpg",
    alt: "Stella Nova under gång i kvällsljus — klassisk 27-meters motoryacht till salu",
  },
  {
    src: "stella-nova-11.jpg",
    alt: "Förpikshytt med ljusinsläpp ombord på Stella Nova",
  },
  {
    src: "stella-nova-ext-10.jpg",
    alt: "Dukat teakbord på däck med Stockholm i bakgrunden",
  },
  {
    src: "stella-nova-5.jpg",
    alt: "Ägarhytt med bädd och soffa på Stella Nova",
  },
  {
    src: "stella-nova-2008-332.jpg",
    alt: "Akter på Stella Nova med namnskylt och svensk flagg",
  },
  {
    src: "stella-nova-7.jpg",
    alt: "Badrum med badkar ombord på Stella Nova",
  },
  {
    src: "stella-nova-ext-8.jpg",
    alt: "Solbädd på fördäck med champagne på Stella Nova",
  },
  {
    src: "stella-nova-2.jpg",
    alt: "Hytt med bokhylla och läslampa på Stella Nova",
  },
  {
    src: "stella-nova-3.jpg",
    alt: "Gästbadrum med teakinredning på Stella Nova",
  },
  {
    src: "stella-nova-8.jpg",
    alt: "Hytt med våningssäng på Stella Nova",
  },
  {
    src: "stella-nova-10.jpg",
    alt: "Duschutrymme i hytt på Stella Nova",
  },
  {
    src: "stella-nova-2008-112.jpg",
    alt: "Stella Nova i profil under gång i skärgården",
  },
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

/** Citable facts for AEO/GEO — visible on page, no separate FAQ route. */
const FACTS: Array<{ q: string; a: string }> = [
  {
    q: "Vad är Stella Nova?",
    a: "Stella Nova är en klassisk 27,4 meters stålskrovig motoryacht från 1971, totalrenoverad 2003–2006 och till salu i Saltsjöbaden.",
  },
  {
    q: "Vem byggde Stella Nova?",
    a: "Båten byggdes på Schiffswerft Hameln i Tyskland och ritades ursprungligen för greve Lennart Bernadotte.",
  },
  {
    q: "Var ligger båten?",
    a: "Stella Nova ligger i Saltsjöbaden, Stockholms skärgård, Sverige.",
  },
  {
    q: "Vilka motorer har Stella Nova?",
    a: "Två Scania V8 DI16 från 2005 med totalt cirka 1 300 hk.",
  },
  {
    q: "Hur många gäster ryms ombord?",
    a: "Salong för tolv personer, sju hytter och 10–12 bäddar.",
  },
  {
    q: "Är Stella Nova till salu?",
    a: "Ja. Yachten säljs privat. Anmäl intresse via kontaktformuläret för visning eller mer information.",
  },
  {
    q: "Vad kostar Stella Nova?",
    a: "Pris på förfrågan. Kontakta säljaren via webbplatsen för offert och privat visning.",
  },
];

export function HomePage() {
  return (
    <div className="home" id="top">
      <section
        className="hero"
        style={{ backgroundImage: `url(${img("stella-nova-ext-5-1.jpg")})` }}
        aria-label="Stella Nova — klassisk motoryacht till salu"
      >
        <div className="hero-overlay" aria-hidden="true" />
        <div className="hero-content reveal">
          <h1 className="hero-title">
            Stella Nova — klassisk motoryacht till salu
          </h1>
          <p className="hero-tagline">A true gentleman's yacht</p>
          <p className="hero-lede">
            Stella Nova — en tidlös 27-meters motoryacht med själ, historia och
            en standard som inte byggs längre. Totalrenoverad, sjösäker och redo
            för nästa ägare.
          </p>
          <div className="hero-actions">
            <Link to={site.routes.contact} className="button primary">
              Anmäl ditt intresse
            </Link>
            <a href="#specifikation" className="button ghost">
              Se specifikation
            </a>
          </div>
        </div>
        <a href="#arvet" className="scroll-hint" aria-label="Scrolla ner">
          <span />
        </a>
      </section>

      <section className="stats reveal" aria-label="Stella Nova i siffror">
        {STATS.map((s) => (
          <div className="stat" key={s.label}>
            <span className="stat-value">{s.value}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </section>

      <section className="section facts-section" id="fakta">
        <div className="section-head reveal">
          <p className="eyebrow">Snabb fakta</p>
          <h2>Stella Nova i korthet</h2>
          <p className="section-lede">
            Tydliga fakta om yachten — för köpare, sökningar och AI-svar.
          </p>
        </div>
        <dl className="facts reveal">
          {FACTS.map((item) => (
            <div className="fact-row" key={item.q}>
              <dt>{item.q}</dt>
              <dd>{item.a}</dd>
            </div>
          ))}
        </dl>
      </section>

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
            alt="Teakdäck och detaljer ombord på den klassiska motoryachten Stella Nova, byggd 1971"
            loading="lazy"
            decoding="async"
            width={960}
            height={720}
          />
        </div>
      </section>

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

      <section
        className="banner reveal"
        style={{ backgroundImage: `url(${img("stella-nova-ext-7.jpg")})` }}
        aria-label="Stella Nova under gång"
      >
        <div className="banner-overlay" aria-hidden="true" />
        <p className="banner-quote">
          “Tidlös elegans, byggd i stål — en yacht med historia få kan mäta sig
          med.”
        </p>
      </section>

      <section className="section" id="ombord">
        <div className="section-head reveal">
          <p className="eyebrow">Livet ombord</p>
          <h2>Lyx i varje detalj</h2>
        </div>
        <div className="features">
          {FEATURES.map((f) => (
            <article className={`feature feature-${f.align} reveal`} key={f.title}>
              <div className="feature-media">
                <img
                  src={img(f.image)}
                  alt={f.alt}
                  loading="lazy"
                  decoding="async"
                  width={960}
                  height={640}
                />
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
              <img
                src={img(g.src)}
                alt={g.alt}
                loading="lazy"
                decoding="async"
                width={800}
                height={600}
              />
            </figure>
          ))}
        </div>
      </section>

      <section className="section trust-section" id="forsaljning">
        <div className="trust-inner reveal">
          <p className="eyebrow">Om försäljningen</p>
          <h2>Privat försäljning — seriösa förfrågningar välkomnas</h2>
          <p>
            Stella Nova säljs som privat annons. Vi återkommer personligen till
            varje seriös intresseanmälan och kan ordna privat visning i
            Saltsjöbaden efter överenskommelse.
          </p>
          <ul className="trust-list">
            <li>Pris meddelas på förfrågan</li>
            <li>Privat visning kan bokas för kvalificerade köpare</li>
            <li>Fullständig specifikation och historik finns på denna webbplats</li>
            <li>Kontakt sker via formuläret — inga automatiska massutskick</li>
          </ul>
          <Link to={site.routes.contact} className="button primary">
            Anmäl ditt intresse
          </Link>
        </div>
      </section>

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
          <div className="specs-cta reveal">
            <Link to={site.routes.contact} className="button primary">
              Anmäl ditt intresse
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
