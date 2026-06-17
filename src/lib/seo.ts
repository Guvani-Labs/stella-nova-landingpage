import { site, type Language } from "../site.config";
import { nap, SITE_ORIGIN } from "./site-nap";
import { buildSchemaGraph } from "./schema-graph";

export const SITE_NAME = site.name;
export const DEFAULT_OG_IMAGE = nap.ogImage;
export const DEFAULT_OG_IMAGE_ALT = site.ogImageAlt;

export type SeoConfig = {
  title: string;
  description: string;
  path: string;
  lang: Language;
  image?: string;
  imageAlt?: string;
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

  script.textContent = JSON.stringify(buildSchemaGraph(description, lang));
}

export function applySeo({
  title,
  description,
  path,
  lang,
  image = DEFAULT_OG_IMAGE,
  imageAlt = DEFAULT_OG_IMAGE_ALT,
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
  upsertMeta("property", "og:image:alt", imageAlt);

  upsertMeta("name", "twitter:card", "summary_large_image");
  upsertMeta("name", "twitter:title", title);
  upsertMeta("name", "twitter:description", description);
  upsertMeta("name", "twitter:image", image);
  upsertMeta("name", "twitter:image:alt", imageAlt);

  upsertJsonLd(description, lang);
}
