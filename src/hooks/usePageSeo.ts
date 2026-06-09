import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLanguage } from "./useLanguage";
import { useTranslation } from "../lib/i18n";
import { applySeo } from "../lib/seo";
import { resolveSeoPage } from "../site.config";

export function usePageSeo(): void {
  const { pathname } = useLocation();
  const { language } = useLanguage();
  const { t } = useTranslation();

  useEffect(() => {
    const page = resolveSeoPage(pathname);

    applySeo({
      title: t(`seo.${page}.title`),
      description: t(`seo.${page}.description`),
      path: pathname,
      lang: language,
    });
  }, [pathname, language, t]);
}
