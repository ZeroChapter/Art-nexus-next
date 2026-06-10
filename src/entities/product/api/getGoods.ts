import { SERVER_URL } from '@/shared/serverConfig';

export async function getGoods() {
  const res = await fetch(`${SERVER_URL}/api/goods`, {
    cache: 'no-store'
  });

  if (!res.ok) {
    throw new Error('Не удалось загрузить товары');
  }

  return res.json();
}
