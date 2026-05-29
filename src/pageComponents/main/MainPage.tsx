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
          <h1 className="catalog_title-heading">
            Art Nexus — дизайнерская одежда российского бренда
          </h1>
        </div>
        <Baner />
        <div className="catalog">{cards}</div>

        <section className="seo-block" aria-label="О бренде и доставке">
          <h2>Дизайнерская одежда от российского бренда</h2>
          <p>
            Art Nexus — российский дизайнерский бренд, в котором форма и смысл
            соединяются в цельный образ. Мы создаём дизайнерскую одежду с
            выверенным кроем, тактильными материалами и вниманием к деталям —
            так, чтобы вещь работала в жизни, а не только на фото.
          </p>
          <p>
            В каталоге — эксклюзивная одежда ограниченных выпусков: выбирайте
            модели по цветам и размерам, смотрите карточки товаров и собирайте
            комплект под ваш ритм и стиль.
          </p>

          <h2>Доставка дизайнерской одежды по Москве и России</h2>
          <p>
            Мы доставляем заказы по России, а в Москве доступна доставка с
            примеркой — чтобы вы спокойно выбрали посадку и ощущения. Подробные
            условия смотрите на странице{" "}
            <a href="/delivery">доставка по Москве и России</a>.
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
