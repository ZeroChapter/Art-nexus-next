import { ProductColor } from "@/entities/product/model/type";

export function getColorGalleryImages(
  image: string[][] | undefined,
  effectiveColor: ProductColor | null,
  colorIndexByOrder: number,
): string[] {
  if (!image?.length) return [];

  let variant: string[] | undefined;
  if (effectiveColor?.imageIndex != null) {
    variant = image[Number(effectiveColor.imageIndex)];
  } else if (colorIndexByOrder >= 0) {
    variant = image[colorIndexByOrder];
  } else {
    variant = image[0];
  }

  return (variant ?? []).filter(Boolean);
}
