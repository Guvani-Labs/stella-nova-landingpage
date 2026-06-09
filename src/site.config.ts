/**
 * Site-wide constants — update these first when starting a new client project.
 */
export const site = {
  name: "Acme Co",
  shortName: "Acme",
  origin: "https://example.com",
  email: "hello@example.com",
  themeColor: "#0c0f14",
  languageStorageKey: "site_language",
  jsonLdScriptId: "site-jsonld",
  defaultLanguage: "sv" as const,
  routes: {
    contact: "/contact",
  },
  location: {
    city: "Stockholm",
    country: "SE",
    label: {
      sv: "Stockholm, Sverige",
      en: "Stockholm, Sweden",
    },
  },
  knowsAbout: [
    "Web development",
    "Design",
    "Digital marketing",
  ],
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
