import { Product } from '@/entities/product/model/type';

export function pickRecommendations(
  products: Product[],
  currentId: string | number,
  count = 4,
): Product[] {
  return products
    .filter((product) => String(product.id) !== String(currentId))
    .filter((product) => product.colors?.some((color) => color.inStore === 'true'))
    .slice(0, count);
}
