import { CATALOG_REVALIDATE_SECONDS } from '@/shared/cacheConfig';
import { SERVER_URL } from '@/shared/serverConfig';
import { Product } from '@/entities/product/model/type';

export async function getGoodsList(): Promise<Product[]> {
  const res = await fetch(`${SERVER_URL}/api/goods/list`, {
    next: { revalidate: CATALOG_REVALIDATE_SECONDS },
  });

  if (!res.ok) {
    throw new Error('Не удалось загрузить каталог');
  }

  return res.json();
}

export interface ProductDetailResponse {
  product: Product;
  relatedProducts: Product[];
}

function normalizeProductId(id: string): string {
  try {
    return decodeURIComponent(id);
  } catch {
    return id;
  }
}

export async function getProductById(id: string): Promise<ProductDetailResponse> {
  const productId = normalizeProductId(id);
  const res = await fetch(`${SERVER_URL}/api/goods/${encodeURIComponent(productId)}`, {
    next: { revalidate: CATALOG_REVALIDATE_SECONDS },
  });

  if (res.status === 404) {
    throw new Error('Товар не найден');
  }

  if (!res.ok) {
    throw new Error('Не удалось загрузить товар');
  }

  return res.json();
}
