"use client";

import dynamic from "next/dynamic";
import { PhotoCarousel } from "../../widgets/carusel/PhotoCarousel";
import "./MainPageStyle.css";
import { ProductCard } from "../../widgets/productCard/ProductCard";
import { Baner } from "../../widgets/baners/Baner";
import { Product } from "@/entities/product/model/type";
import { CarouselSlide } from "@/entities/carousel/api/getCarousel";

const PopUp = dynamic(
  () => import("../../widgets/popup/PopUp").then((m) => m.PopUp),
  { ssr: false },
);

const SizeMessage = dynamic(
  () =>
    import("../../entities/messages/SizeMessage").then((m) => m.SizeMessage),
  { ssr: false },
);

export const MainPage = ({
  initialProducts,
  initialSlides,
}: {
  initialProducts: Product[];
  initialSlides: CarouselSlide[];
}) => {
  const products: Product[] = initialProducts;

  let cardIndex = 0;
  const cards = products.flatMap((product) => {
    const inStoreColors =
      product.colors?.filter((c) => c.inStore === "true") ?? [];
    if (inStoreColors.length === 0) return [];

    return inStoreColors.map((color) => {
      const priority = cardIndex < 8;
      cardIndex += 1;
      return (
        <ProductCard
          key={`${product.id}-${color.colorCode}`}
          {...product}
          selectedColor={color}
          priority={priority}
        />
      );
    });
  });

  return (
    <>
      <main className="page">
        <PhotoCarousel initialSlides={initialSlides} />
        <div className="catalog_title">
          <h1 className="catalog_title-heading">
            Art Nexus — дизайнерская одежда российского бренда
          </h1>
        </div>
        <Baner />
        <div className="catalog">{cards}</div>

        <section className="seo-block" aria-label="О бренде и доставке">
          <h2>Дизайнерская одежда от российского бренда</h2>
          <p>
            Art Nexus&nbsp;&mdash; российский дизайнерский бренд, в&nbsp;котором
            форма и&nbsp;смысл соединяются в&nbsp;цельный образ. Мы&nbsp;создаём
            дизайнерскую одежду с выверенным кроем, тактильными материалами
            и&nbsp;вниманием к&nbsp;деталям &mdash; так, чтобы вещь работала
            в&nbsp;жизни, а&nbsp;не&nbsp;только на&nbsp;фото.
          </p>
          <p>
            В&nbsp;каталоге&nbsp;&mdash; эксклюзивная одежда ограниченных
            выпусков: выбирайте модели по&nbsp;цветам и&nbsp;размерам, смотрите
            карточки товаров и&nbsp;собирайте комплект под ваш ритм
            и&nbsp;стиль.
          </p>

          <h2>Доставка дизайнерской одежды по Москве и России</h2>
          <p>
            Мы&nbsp;доставляем заказы по&nbsp;России, а&nbsp;в&nbsp;Москве
            доступна доставка с примеркой&nbsp;&mdash; чтобы вы&nbsp;спокойно
            выбрали посадку и&nbsp;ощущения. Подробные условия смотрите
            на&nbsp;странице <a href="/delivery">доставка по Москве и России</a>
            .
          </p>

          <h2>Почему выбирают Art Nexus</h2>
          <ul>
            <li>Дизайнерский крой и продуманные силуэты</li>
            <li>Ограниченные коллекции и аккуратная отделка</li>
            <li>
              Прозрачные условия <a href="/payment">оплаты</a> и{" "}
              <a href="/return">возврата</a>
            </li>
            <li>
              История бренда и философия — <a href="/about">о Art Nexus</a>
            </li>
          </ul>
        </section>
        <PopUp>
          <SizeMessage />
        </PopUp>
      </main>
    </>
  );
};
