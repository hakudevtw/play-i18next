const path = require("path");
const { createJiti } = require("jiti");
const jiti = createJiti(__filename);

const { LANGUAGES, FALLBACK_LNG, DEFAULT_NS } = jiti("./src/i18n/settings");

/** @type {import('next-i18next').UserConfig} */
module.exports = {
  fallbackLng: FALLBACK_LNG,
  defaultNS: DEFAULT_NS,
  i18n: {
    defaultLocale: FALLBACK_LNG,
    locales: LANGUAGES,
    localeDetection: false,
  },
  react: { useSuspense: false },
  lowerCaseLng: true,
  localePath: path.resolve("./src/i18n/locales"),
};
