import { NextResponse } from "next/server";
import { HEADER_KEYS } from "@/constants/storage-keys";
import { CustomMiddleware } from "./chain";
import type { NextFetchEvent, NextRequest } from "next/server";

export function withBase(middleware: CustomMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const headers = new Headers(request.headers);
    headers.set(HEADER_KEYS.CURRENT_PATH, request.nextUrl.pathname);

    // The first middleware in the chain has to create the response
    // object and pass it down the chain.
    const response = NextResponse.next();

    return middleware(request, event, response);
  };
}
