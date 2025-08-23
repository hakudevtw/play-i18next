/**
 * TODO After migrating all pages to app router
 * 1. Remove i18n config in /next-config.js
 * 2. Remove /next-i18next.config.js
 * 2. Remove isPagesRouter condition in /middlewares/i18n.middleware.ts
 * 3. Remove this file
 * 4. Uninstall next-i18next package
 * 5. Remove jiti package if not used in other places
 * 6. Change /src/i18n/settings to change back using alias
 *    -> relative path is used to support jiti importing ts files into js files
 */

import { LANGUAGES, HEADER_NAME } from "./settings";
import type { Language } from "./settings";
import type { GetServerSideProps } from "next";

const LOCALE_REGEX = new RegExp(`^/(${LANGUAGES.join("|")})(?=/|$)`);

const APP_ROUTER_PATHS = ["/"];

export function getServerSideLang(context: Parameters<GetServerSideProps>[0]) {
  return context.req.headers[HEADER_NAME] as Language;
}

export function isPagesRouter(pathname: string) {
  const withoutLocale = removeLocale(pathname);
  const isMigrated = APP_ROUTER_PATHS.some((prefix) => {
    if (prefix === "/") return withoutLocale === "/";
    return withoutLocale.startsWith(prefix);
  });
  return !isMigrated;
}

export function removeLocale(pathname: string) {
  return pathname.replace(LOCALE_REGEX, "") || "/";
}
