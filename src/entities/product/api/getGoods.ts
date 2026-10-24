import { CATALOG_REVALIDATE_SECONDS } from '@/shared/cacheConfig';
import { SERVER_URL } from '@/shared/serverConfig';
import { Product, ProductColorVariant } from '@/entities/product/model/type';

function catalogFetchInit() {
  if (process.env.NODE_ENV === "development") {
    return { cache: "no-store" as const };
  }
  return { next: { revalidate: CATALOG_REVALIDATE_SECONDS } };
}

export async function getGoodsList(): Promise<Product[]> {
  const res = await fetch(`${SERVER_URL}/api/goods/list`, catalogFetchInit());

  if (!res.ok) {
    throw new Error('Не удалось загрузить каталог');
  }

  return res.json();
}

export interface ProductDetailResponse {
  product: Product;
  relatedProducts: Product[];
  colorVariants: ProductColorVariant[];
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
  const res = await fetch(
    `${SERVER_URL}/api/goods/${encodeURIComponent(productId)}`,
    catalogFetchInit(),
  );

  if (res.status === 404) {
    throw new Error('Товар не найден');
  }

  if (!res.ok) {
    throw new Error('Не удалось загрузить товар');
  }

  return res.json();
}
