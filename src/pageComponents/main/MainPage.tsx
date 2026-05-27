import { PhotoCarousel } from "../../widgets/carusel/PhotoCarousel";
import "./MainPageStyle.css";
import { ProductCard } from "../../widgets/productCard/ProductCard";
import { Baner } from "../../widgets/baners/Baner";
import { PopUp } from "../../widgets/popup/PopUp";
import { SizeMessage } from "../../entities/messages/SizeMessage";
import { Product } from "@/entities/product/model/type";

export const MainPage = ({
  initialProducts,
}: {
  initialProducts: Product[];
}) => {
  const products: Product[] = initialProducts;

  const cards = products.flatMap((product) => {
    const inStoreColors =
      product.colors?.filter((c) => c.inStore === "true") ?? [];
    if (inStoreColors.length === 0) return [];

    return inStoreColors.map((color) => (
      <ProductCard
        key={`${product.id}-${color.colorCode}`}
        {...product}
        selectedColor={color}
      />
    ));
  });

  return (
    <>
      <main className="page">
        <PhotoCarousel />
        <div className="catalog_title">
          <h1>
            коллекция <br /> весна-лето 2026
          </h1>
        </div>
        <Baner />
        <div className="catalog">{cards}</div>
        <PopUp>
          <SizeMessage />
        </PopUp>
      </main>
    </>
  );
};
