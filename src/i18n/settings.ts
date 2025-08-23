import { COOKIE_KEYS, HEADER_KEYS } from "../constants/storage-keys";

export const FALLBACK_LNG = "en";
export const LANGUAGES = [FALLBACK_LNG, "de", "it"];
export const DEFAULT_NS = "translation";

export const COOKIE_NAME = COOKIE_KEYS.I18Next;
export const HEADER_NAME = HEADER_KEYS.I18Next_CURRENT_LANGUAGE;

export type Language = (typeof LANGUAGES)[number];
