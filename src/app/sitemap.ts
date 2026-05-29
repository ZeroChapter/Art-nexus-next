import type { MetadataRoute } from 'next';
import type { Product } from '@/entities/product/model/type';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://art-nexus.ru';
// Внутренний адрес API: бэкенд может жить отдельно от фронта. Задайте API_INTERNAL_URL
// в .env (например, http://backend:5000), иначе используется публичный домен.
const API_URL = process.env.API_INTERNAL_URL ?? SITE_URL;

// Sitemap пересобирается раз в час — не дёргаем API на каждый запрос бота.
export const revalidate = 3600;

async function safeGetProducts(): Promise<Array<{ id: string | number }>> {
  try {
    const res = await fetch(`${API_URL}/api/goods`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data: Product[] = await res.json();
    return data.map((p) => ({ id: p.id }));
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/delivery`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/payment`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/return`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  ];

  const products = await safeGetProducts();
  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${SITE_URL}/products/${p.id}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...productRoutes];
}
