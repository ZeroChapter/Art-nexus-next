/** Кеш ответов API в Data Cache Next.js (товары, карусель). В dev — без кеша, чтобы правки из админки были видны сразу. */
export const CATALOG_REVALIDATE_SECONDS =
  process.env.NODE_ENV === "development" ? 0 : 3600;

/**
 * 0 — HTML не кешируется на CDN/прокси (s-maxage=0).
 * Данные каталога по-прежнему берутся из fetch cache (CATALOG_REVALIDATE_SECONDS).
 */
export const PAGE_REVALIDATE_SECONDS = 0;
