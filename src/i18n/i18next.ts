import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next/initReactI18next";
import { FALLBACK_LNG, LANGUAGES, DEFAULT_NS } from "./settings";
import type { Language } from "./settings";

const runsOnServerSide = typeof window === "undefined";

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend(
      (language: Language, namespace: string) => import(`./locales/${language}/${namespace}.json`)
    )
  )
  .init({
    debug: true,
    lowerCaseLng: true,
    supportedLngs: LANGUAGES,
    fallbackLng: FALLBACK_LNG,
    lng: undefined, // let detect the language on client side
    fallbackNS: DEFAULT_NS,
    defaultNS: DEFAULT_NS,
    detection: {
      order: ["path", "htmlTag", "cookie", "navigator"],
    },
    preload: runsOnServerSide ? LANGUAGES : [],
  });

export default i18next;
