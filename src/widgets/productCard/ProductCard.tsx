import React from "react";
import Link from "next/link";
import "./ProductcardStyle.css";
import { formatPrice } from "@/shared/lib/formatPrice";
import { Product, ProductColor } from "@/entities/product/model/type";
import { getColorGalleryImages } from "./getColorGalleryImages";
import { ProductCardImage } from "./ProductCardImage";

interface ProductCardProps extends Product {
  isNew?: boolean;
  selectedColor?: ProductColor | null;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  image,
  coast,
  name,
  isNew,
  colors,
  selectedColor,
  priority = false,
}) => {
  const effectiveColor = selectedColor ?? colors?.[0] ?? null;

  const productPath = `/products/${encodeURIComponent(String(id))}`;
  const href = effectiveColor?.colorCode
    ? `${productPath}?color=${encodeURIComponent(effectiveColor.colorCode)}`
    : productPath;

  const colorIndexByOrder = effectiveColor?.colorCode
    ? (colors ?? []).findIndex((c) => c.colorCode === effectiveColor.colorCode)
    : -1;

  const galleryImages = getColorGalleryImages(
    image,
    effectiveColor,
    colorIndexByOrder,
  );

  return (
    <Link
      href={href}
      className="product_card"
      aria-label={`${name}, цена ${formatPrice(coast)}`}
    >
      <ProductCardImage
        name={name}
        galleryImages={galleryImages}
        isNew={isNew}
        priority={priority}
      />

      <div className="description_container">
        <h2 className="product-name" title={name}>
          {name}
        </h2>
        <p className="product-price">{formatPrice(coast)}</p>
      </div>
    </Link>
  );
};
