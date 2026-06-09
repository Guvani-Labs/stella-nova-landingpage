import { site, type Language } from "../site.config";

export const LANGUAGE_STORAGE_KEY = site.languageStorageKey;

export function readStoredLanguage(): Language {
  if (typeof localStorage === "undefined") return site.defaultLanguage;
  const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  return stored === "en" ? "en" : site.defaultLanguage;
}
