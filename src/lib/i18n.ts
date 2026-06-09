import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../locales/en.json";
import sv from "../locales/sv.json";
import { readStoredLanguage } from "./language-storage";
import { site, type Language } from "../site.config";

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    sv: { translation: sv },
  },
  lng: readStoredLanguage(),
  fallbackLng: site.defaultLanguage,
  supportedLngs: ["en", "sv"],
  interpolation: { escapeValue: true },
  react: { useSuspense: false },
});

export function setI18nLanguage(language: Language): void {
  if (i18n.language === language) return;
  void i18n.changeLanguage(language);
}

export default i18n;
export { useTranslation } from "react-i18next";
