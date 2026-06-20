import ta from "../../messages/ta.json";
import en from "../../messages/en.json";
import type { SiteContent } from "./content";

export const messagesByLocale: Record<"ta" | "en", SiteContent> = {
  ta,
  en,
};

export function getContent(locale: string): SiteContent {
  return messagesByLocale[locale as "ta" | "en"] ?? ta;
}
