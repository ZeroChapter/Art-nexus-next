export function hasSalePrice(
  coast: number,
  saleCoast?: number | null,
): saleCoast is number {
  return (
    typeof saleCoast === "number" &&
    Number.isFinite(saleCoast) &&
    saleCoast > 0 &&
    saleCoast < coast
  );
}

export function getEffectivePrice(
  coast: number,
  saleCoast?: number | null,
): number {
  return hasSalePrice(coast, saleCoast) ? saleCoast : coast;
}
