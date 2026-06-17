import { nap, SITE_ORIGIN } from "./lib/site-nap";

/**
 * Site-wide constants — update NAP in src/lib/site-nap.ts first.
 */
export const site = {
  name: nap.displayName,
  shortName: nap.displayName,
  origin: SITE_ORIGIN,
  email: nap.email,
  themeColor: "#0c1824",
  languageStorageKey: "site_language",
  jsonLdScriptId: "site-jsonld",
  defaultLanguage: "sv" as const,
  ogImage: "/images/stella-nova-2008-298.jpg",
  ogImageAlt:
    "Stella Nova under gång i kvällsljus — klassisk 27-meters motoryacht till salu",
  routes: {
    contact: "/contact",
  },
  location: {
    city: nap.address.addressLocality,
    country: nap.address.addressCountry,
    label: nap.boat.locationLabel,
  },
  knowsAbout: nap.knowsAbout,
  boat: {
    name: nap.boat.name,
    yearBuilt: nap.boat.yearBuilt,
    lengthMeters: nap.boat.lengthMeters,
    builder: nap.boat.builder,
  },
} as const;

export type Language = "sv" | "en";

export const SEO_PAGES = {
  [site.routes.contact]: "contact",
  "/": "home",
} as const;

export type SeoPageKey = "home" | "contact";

export function resolveSeoPage(pathname: string): SeoPageKey {
  return pathname === site.routes.contact ? "contact" : "home";
}

export { SITE_ORIGIN };
