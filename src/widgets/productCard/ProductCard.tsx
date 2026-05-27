"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "./ProductcardStyle.css";
import { useFormatPrice } from "@/entities/hooks/useFormatPrice";
import { Product, ProductColor } from "@/entities/product/model/type";

interface ProductCardProps extends Product {
  isNew?: boolean;
  selectedColor?: ProductColor | null;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  image,
  coast,
  name,
  isNew,
  colors,
  selectedColor,
}) => {
  const router = useRouter();
  const formatPrice = useFormatPrice();

  const effectiveColor = selectedColor ?? colors?.[0] ?? null;

  const colorStyle = {
    backgroundColor: effectiveColor?.colorCode || "#ccc",
  };

  const handleClick = () => {
    if (effectiveColor?.colorCode) {
      router.push(
        `/products/${id}?color=${encodeURIComponent(effectiveColor.colorCode)}`,
      );
      return;
    }
    router.push(`/products/${id}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (effectiveColor?.colorCode) {
        router.push(
          `/products/${id}?color=${encodeURIComponent(effectiveColor.colorCode)}`,
        );
        return;
      }
      router.push(`/products/${id}`);
    }
  };

  const colorIndexByOrder = effectiveColor?.colorCode
    ? (colors ?? []).findIndex((c) => c.colorCode === effectiveColor.colorCode)
    : -1;

  const previewImageByIndex =
    effectiveColor && typeof effectiveColor.imageIndex === "number"
      ? image?.[effectiveColor.imageIndex]?.[0]
      : undefined;

  const previewImageByOrder =
    colorIndexByOrder >= 0 ? image?.[colorIndexByOrder]?.[0] : undefined;

  const previewImage =
    previewImageByIndex ?? previewImageByOrder ?? image?.[0]?.[0];

  return (
    <div
      className="product_card"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="link"
      tabIndex={0}
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
          />
        ) : null}
      </div>

      <div className="description_container">
        <h2 className="product-name">{name}</h2>
        <div className="color_container">
          <div className="colorSquer" style={colorStyle}></div>+
          {colors?.length || 0}
        </div>
        <p>{formatPrice(coast)}</p>
      </div>
    </div>
  );
};
