import { SERVER_URL } from '@/shared/serverConfig';
import type { GoodByIdResponse, Product } from '@/entities/product/model/type';

export async function getGoods(): Promise<Product[]> {
  const res = await fetch(`${SERVER_URL}/api/goods`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Не удалось загрузить товары');
  }

  return res.json();
}

export async function getGoodById(id: string): Promise<GoodByIdResponse | null> {
  const res = await fetch(`${SERVER_URL}/api/goods/${encodeURIComponent(id)}`, {
    cache: 'no-store',
  });

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error('Не удалось загрузить товар');
  }

  return res.json();
}
