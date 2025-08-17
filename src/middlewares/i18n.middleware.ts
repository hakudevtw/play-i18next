import { NextResponse, type NextRequest, type NextFetchEvent } from "next/server";
import acceptLanguage from "accept-language";
import { FALLBACK_LNG, LANGUAGES, COOKIE_NAME, HEADER_NAME } from "@/i18n/settings";
import type { CustomMiddleware } from "./chain";

acceptLanguage.languages(LANGUAGES);

// TODO update cookies, rewrite default lng
export function withI18n(middleware: CustomMiddleware): CustomMiddleware {
  return async (request: NextRequest, event: NextFetchEvent, response: NextResponse) => {
    let lng;

    // Try to get language from cookie
    if (request.cookies.has(COOKIE_NAME))
      lng = acceptLanguage.get(request.cookies.get(COOKIE_NAME)!.value);

    // If no cookie, check the Accept-Language header
    if (!lng) lng = acceptLanguage.get(request.headers.get("Accept-Language"));

    // Default to fallback language if still undefined
    if (!lng) lng = FALLBACK_LNG;

    // Check if the language is already in the path
    const lngInPath = LANGUAGES.find((loc) => request.nextUrl.pathname.startsWith(`/${loc}`));

    // Set the header
    response.headers.set(HEADER_NAME, lngInPath || lng);

    // If the language is not in the path, redirect to include it
    if (!lngInPath && !request.nextUrl.pathname.startsWith("/_next")) {
      if (lng === FALLBACK_LNG) {
        return NextResponse.rewrite(
          new URL(`/${lng}${request.nextUrl.pathname}${request.nextUrl.search}`, request.url)
        );
      }

      return NextResponse.redirect(
        new URL(`/${lng}${request.nextUrl.pathname}${request.nextUrl.search}`, request.url)
      );
    }

    // If a referer exists, try to detect the language from there and set the cookie accordingly
    if (request.headers.has("referer")) {
      const refererUrl = new URL(request.headers.get("referer")!);
      const lngInReferer = LANGUAGES.find((l) => refererUrl.pathname.startsWith(`/${l}`));
      if (lngInReferer) response.cookies.set(COOKIE_NAME, lngInReferer);
    }

    // Call next middleware with the same request & response
    return middleware(request, event, response);
  };
}
