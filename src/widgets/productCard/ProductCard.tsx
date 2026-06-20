"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import "./ProductcardStyle.css";
import { useFormatPrice } from "@/entities/hooks/useFormatPrice";
import { Product } from "@/entities/product/model/type";

interface ProductCardProps extends Product {
  colorCount?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  image,
  price,
  name,
  isNew,
  colorCode,
  colorCount = 1,
}) => {
  const formatPrice = useFormatPrice();

  const colorStyle = {
    backgroundColor: colorCode || "#ccc",
  };

  const previewImage = image?.[0];

  return (
    <Link
      href={`/products/${id}`}
      className="product_card"
      aria-label={`${name}, цена ${formatPrice(price)}`}
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
        <h2 className="product-name" title={name}>
          {name}
        </h2>
        <div className="color_container">
          <div className="colorSquer" style={colorStyle}></div>+{colorCount}
        </div>
        <p>{formatPrice(price)}</p>
      </div>
    </Link>
  );
};
