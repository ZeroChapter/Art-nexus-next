import { CATALOG_REVALIDATE_SECONDS } from '@/shared/cacheConfig';
import { SERVER_URL } from '@/shared/serverConfig';

export async function getGoods() {
  const res = await fetch(`${SERVER_URL}/api/goods`, {
    next: { revalidate: CATALOG_REVALIDATE_SECONDS },
  });

  if (!res.ok) {
    throw new Error('Не удалось загрузить товары');
  }

  return res.json();
}
