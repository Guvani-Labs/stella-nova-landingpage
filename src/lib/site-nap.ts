/**
 * Central NAP + entity facts — single source for UI and JSON-LD.
 * Keep footer, contact page, and schema in sync with this file.
 *
 * Private one-off yacht sale — no business org number or product GTIN.
 */
export const SITE_ORIGIN = "https://stellanova-yacht.se";

export const nap = {
  displayName: "Stella Nova",
  email: "kontakt@stellanova-yacht.se",
  telephone: null as string | null,
  url: SITE_ORIGIN,
  logo: `${SITE_ORIGIN}/favicon.svg`,
  ogImage: `${SITE_ORIGIN}/images/stella-nova-2008-298.jpg`,
  address: {
    addressLocality: "Saltsjöbaden",
    addressRegion: "Stockholms län",
    addressCountry: "SE",
  },
  areaServed: {
    sv: "Stockholms skärgård och Sverige",
    en: "Stockholm archipelago and Sweden",
  },
  sameAs: [] as readonly string[],
  seller: {
    label: {
      sv: "Privat säljare",
      en: "Private seller",
    },
    description: {
      sv: "Privat försäljning av motoryachten Stella Nova i Saltsjöbaden.",
      en: "Private sale of the motor yacht Stella Nova in Saltsjöbaden.",
    },
  },
  knowsAbout: [
    "Klassiska motoryachter",
    "Yachtförsäljning",
    "Stockholms skärgård",
    "Totalrenoverade yachts",
    "Stålskrov",
    "Motoryacht till salu",
  ],
  boat: {
    name: "Stella Nova",
    yearBuilt: 1971,
    lengthMeters: 27.4,
    beamMeters: 5.88,
    builder: "Schiffswerft Hameln",
    originalOwner: "Greve Lennart Bernadotte",
    refitYears: "2003–2006",
    engines: "2× Scania V8 DI16 (1 300 hk)",
    locationLabel: {
      sv: "Saltsjöbaden, Sverige",
      en: "Saltsjöbaden, Sweden",
    },
  },
  listing: {
    status: {
      sv: "Till salu",
      en: "For sale",
    },
    contactPath: "/contact",
  },
} as const;

export type NapLanguage = "sv" | "en";

export function napLocationLabel(lang: NapLanguage): string {
  return nap.boat.locationLabel[lang];
}
