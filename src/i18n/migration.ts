/**
 * TODO After migrating all pages to app router
 * 1. Remove i18n config in next-config.js
 * 2. Remove isPagesRouter in /middlewares/i18n.middleware.ts
 * 3. Remove this file
 * 4. Uninstall next-i18next package
 */

import { LANGUAGES } from "./settings";

const LOCALE_REGEX = new RegExp(`^/(${LANGUAGES.join("|")})(?=/|$)`);

const APP_ROUTER_PATHS = ["/"];

export function isPagesRouter(pathname: string) {
  const withoutLocale = pathname.replace(LOCALE_REGEX, "") || "/";
  console.log("🍃 ~ isPagesRouter ~ withoutLocale:", withoutLocale);
  const isMigrated = APP_ROUTER_PATHS.some((prefix) => {
    if (prefix === "/") return withoutLocale === "/";
    return withoutLocale.startsWith(prefix);
  });
  console.log("🍃 ~ isPagesRouter ~ isMigrate:", isMigrated);
  return !isMigrated;
}
