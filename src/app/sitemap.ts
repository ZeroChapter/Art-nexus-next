import type { MetadataRoute } from 'next';
import type { Product } from '@/entities/product/model/type';
import { SERVER_URL } from '@/shared/serverConfig';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://art-nexus.ru';

async function safeGetProducts(): Promise<Array<{ id: string | number; updatedAt?: string }>> {
  try {
    const res = await fetch(`${SERVER_URL}/api/goods`, { cache: 'no-store' });
    if (!res.ok) return [];
    const data: Product[] = await res.json();
    return data.map((p) => ({ id: p.id }));
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: 'daily', priority: 1 },
    { url: `${SITE_URL}/about`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/delivery`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/payment`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/return`, changeFrequency: 'monthly', priority: 0.6 },
  ];

  const products = await safeGetProducts();
  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${SITE_URL}/products/${p.id}`,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...productRoutes];
}

