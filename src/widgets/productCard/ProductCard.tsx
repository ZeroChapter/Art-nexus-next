import React from "react";
import Image from "next/image";
import Link from "next/link";
import "./ProductcardStyle.css";
import { formatPrice } from "@/shared/lib/formatPrice";
import { Product, ProductColor } from "@/entities/product/model/type";

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

  const colorStyle = {
    backgroundColor: effectiveColor?.colorCode || "#ccc",
  };

  const productPath = `/products/${encodeURIComponent(String(id))}`;
  const href = effectiveColor?.colorCode
    ? `${productPath}?color=${encodeURIComponent(effectiveColor.colorCode)}`
    : productPath;

  const colorIndexByOrder = effectiveColor?.colorCode
    ? (colors ?? []).findIndex((c) => c.colorCode === effectiveColor.colorCode)
    : -1;

  const previewImageByIndex =
    effectiveColor && effectiveColor.imageIndex != null && effectiveColor.imageIndex !== ''
      ? image?.[Number(effectiveColor.imageIndex)]?.[0]
      : undefined;

  const previewImageByOrder =
    colorIndexByOrder >= 0 ? image?.[colorIndexByOrder]?.[0] : undefined;

  const previewImage =
    previewImageByIndex ?? previewImageByOrder ?? image?.[0]?.[0];

  return (
    <Link
      href={href}
      className="product_card"
      aria-label={`${name}, цена ${formatPrice(coast)}`}
    >
      <div className="product_card-image">
        <div className={`mew_lable ${isNew ? "" : "hidden"}`}>NEW</div>
        {previewImage ? (
          <Image
            src={previewImage}
            alt={`${name} — дизайнерская одежда Art Nexus`}
            fill
            sizes="(max-width: 768px) 50vw, 245px"
            style={{ objectFit: "cover", objectPosition: "center" }}
            priority={priority}
            loading={priority ? undefined : "lazy"}
          />
        ) : null}
      </div>

      <div className="description_container">
        <h2 className="product-name" title={name}>
          {name}
        </h2>
        <div className="color_container">
          <div className="colorSquer" style={colorStyle}></div>+
          {colors?.length || 0}
        </div>
        <p>{formatPrice(coast)}</p>
      </div>
    </Link>
  );
};
