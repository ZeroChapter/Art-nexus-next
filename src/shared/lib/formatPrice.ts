export function formatPrice(price: string | number | null | undefined): string {
  if (price == null) return '';

  const priceString = String(price);

  if (priceString.length <= 3) {
    return `${priceString} ₽`;
  }

  return `${priceString.slice(0, -3)} ${priceString.slice(-3)} ₽`;
}
