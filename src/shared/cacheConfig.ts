/** Кеш ответов API в Data Cache Next.js (товары, карусель). */
export const CATALOG_REVALIDATE_SECONDS = 3600;

/**
 * 0 — HTML не кешируется на CDN/прокси (s-maxage=0).
 * Данные каталога по-прежнему берутся из fetch cache (CATALOG_REVALIDATE_SECONDS).
 */
export const PAGE_REVALIDATE_SECONDS = 0;
