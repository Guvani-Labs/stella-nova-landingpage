import { site, type Language } from "../site.config";

export const SITE_ORIGIN = site.origin;
export const SITE_NAME = site.name;
export const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/og-image.svg`;

export type SeoConfig = {
  title: string;
  description: string;
  path: string;
  lang: Language;
  image?: string;
};

function upsertMeta(
  attr: "name" | "property",
  key: string,
  content: string,
): void {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string): void {
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function upsertJsonLd(description: string, lang: Language): void {
  let script = document.getElementById(
    site.jsonLdScriptId,
  ) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement("script");
    script.id = site.jsonLdScriptId;
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_ORIGIN}/#organization`,
        name: site.shortName,
        alternateName: SITE_NAME,
        url: SITE_ORIGIN,
        logo: `${SITE_ORIGIN}/favicon.svg`,
        email: site.email,
        description,
        address: {
          "@type": "PostalAddress",
          addressLocality: site.location.city,
          addressCountry: site.location.country,
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_ORIGIN}/#website`,
        name: site.shortName,
        alternateName: SITE_NAME,
        url: SITE_ORIGIN,
        publisher: { "@id": `${SITE_ORIGIN}/#organization` },
        inLanguage: lang === "sv" ? ["sv", "en"] : ["en", "sv"],
      },
      {
        "@type": "ProfessionalService",
        "@id": `${SITE_ORIGIN}/#service`,
        name: SITE_NAME,
        url: SITE_ORIGIN,
        email: site.email,
        image: DEFAULT_OG_IMAGE,
        description,
        parentOrganization: { "@id": `${SITE_ORIGIN}/#organization` },
        address: {
          "@type": "PostalAddress",
          addressLocality: site.location.city,
          addressCountry: site.location.country,
        },
        areaServed: {
          "@type": "Country",
          name: lang === "sv" ? "Sverige" : "Sweden",
        },
        knowsAbout: site.knowsAbout,
      },
    ],
  });
}

export function applySeo({
  title,
  description,
  path,
  lang,
  image = DEFAULT_OG_IMAGE,
}: SeoConfig): void {
  const url = path === "/" ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${path}`;

  document.title = title;
  document.documentElement.lang = lang;

  upsertMeta("name", "description", description);
  upsertMeta("name", "robots", "index, follow");
  upsertLink("canonical", url);

  upsertMeta("property", "og:type", "website");
  upsertMeta("property", "og:site_name", SITE_NAME);
  upsertMeta("property", "og:title", title);
  upsertMeta("property", "og:description", description);
  upsertMeta("property", "og:url", url);
  upsertMeta("property", "og:locale", lang === "sv" ? "sv_SE" : "en_US");
  upsertMeta("property", "og:image", image);

  upsertMeta("name", "twitter:card", "summary_large_image");
  upsertMeta("name", "twitter:title", title);
  upsertMeta("name", "twitter:description", description);
  upsertMeta("name", "twitter:image", image);

  upsertJsonLd(description, lang);
}
