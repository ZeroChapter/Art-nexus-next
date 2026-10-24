import React from "react";
import Link from "next/link";
import "./ProductcardStyle.css";
import { formatPrice } from "@/shared/lib/formatPrice";
import { getEffectivePrice, hasSalePrice } from "@/shared/lib/salePrice";
import { Product, ProductColor } from "@/entities/product/model/type";
import { getColorGalleryImages } from "./getColorGalleryImages";
import { ProductCardImage } from "./ProductCardImage";

interface ProductCardProps extends Product {
  selectedColor?: ProductColor | null;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  image,
  coast,
  saleCoast,
  name,
  colors,
  selectedColor,
  priority = false,
}) => {
  const effectiveColor = selectedColor ?? colors?.[0] ?? null;
  const onSale = hasSalePrice(coast, saleCoast);
  const displayPrice = getEffectivePrice(coast, saleCoast);

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
      aria-label={`${name}, цена ${formatPrice(displayPrice)}`}
    >
      <ProductCardImage
        name={name}
        galleryImages={galleryImages}
        onSale={onSale}
        priority={priority}
      />

      <div className="description_container">
        <h2 className="product-name" title={name}>
          {name}
        </h2>
        {onSale ? (
          <p className="product-price product-price--sale">
            <span className="product-price__sale">{formatPrice(saleCoast)}</span>
            <span className="product-price__old">{formatPrice(coast)}</span>
          </p>
        ) : (
          <p className="product-price">{formatPrice(coast)}</p>
        )}
      </div>
    </Link>
  );
};
