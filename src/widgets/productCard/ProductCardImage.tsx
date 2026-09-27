"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface ProductCardImageProps {
  name: string;
  galleryImages: string[];
  isNew?: boolean;
  priority?: boolean;
}

export function ProductCardImage({
  name,
  galleryImages,
  isNew,
  priority = false,
}: ProductCardImageProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverGalleryEnabled, setHoverGalleryEnabled] = useState(false);
  const hasGallery = galleryImages.length > 1;
  const displayImage = galleryImages[activeIndex] ?? galleryImages[0];

  useEffect(() => {
    setHoverGalleryEnabled(
      window.matchMedia("(hover: hover) and (pointer: fine)").matches,
    );
  }, []);

  useEffect(() => {
    if (!hasGallery) return;
    galleryImages.slice(1).forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, [galleryImages, hasGallery]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!hoverGalleryEnabled || !hasGallery) return;

    const rect = event.currentTarget.getBoundingClientRect();
    if (rect.width <= 0) return;

    const x = Math.min(Math.max(event.clientX - rect.left, 0), rect.width);
    const index = Math.min(
      galleryImages.length - 1,
      Math.floor((x / rect.width) * galleryImages.length),
    );

    setActiveIndex((prev) => (prev === index ? prev : index));
  };

  const handleMouseLeave = () => {
    setActiveIndex(0);
  };

  if (!displayImage) return null;

  return (
    <div
      className={`product_card-image${hasGallery ? " product_card-image--has-gallery" : ""}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`mew_lable ${isNew ? "" : "hidden"}`}>NEW</div>
      <Image
        src={displayImage}
        alt={`${name} — дизайнерская одежда Art Nexus${hasGallery ? `, фото ${activeIndex + 1}` : ""}`}
        fill
        sizes="(max-width: 768px) 50vw, 245px"
        style={{ objectFit: "cover", objectPosition: "center" }}
        priority={priority && activeIndex === 0}
        loading={priority && activeIndex === 0 ? undefined : "lazy"}
      />
    </div>
  );
}
