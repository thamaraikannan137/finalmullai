import type ta from "../../messages/ta.json";

export type SiteContent = typeof ta;

export function getNewsItem(content: SiteContent, id: string) {
  return content.news.find((item) => item.id === id);
}

export function resolveNavHref(href: string, onHome: boolean) {
  if (href.startsWith("#")) {
    return onHome ? href : `/${href}`;
  }
  return href;
}
