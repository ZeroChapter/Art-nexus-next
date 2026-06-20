'use client'

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { formatPrice } from "@/shared/lib/formatPrice";
import { ProductCard } from "@/widgets/productCard/ProductCard";
import { useAppContext } from "@/shared/AppContextProvider";
import { Product, ProductColor, ProductSize } from "@/entities/product/model/type";
import './ProductPageStyle.css';

const PhotoGalerey = dynamic(
  () => import("@/widgets/photoGalerey/PhotoGalerey").then((m) => m.PhotoGalerey),
  { ssr: false, loading: () => <div className="gallery-placeholder" aria-hidden="true" /> },
);

const PopUp = dynamic(
  () => import("@/widgets/popup/PopUp").then((m) => m.PopUp),
  { ssr: false },
);

const SizeMessage = dynamic(
  () => import("@/entities/messages/SizeMessage").then((m) => m.SizeMessage),
  { ssr: false },
);

const DeliveryMessage = dynamic(
  () => import("@/entities/messages/DeliveryMessage").then((m) => m.DeliveryMessage),
  { ssr: false },
);

const CompoundMessage = dynamic(
  () => import("@/entities/messages/CompoundMessage").then((m) => m.CompoundMessage),
  { ssr: false },
);

interface ProductPageProps {
    initialProduct: Product;
    recommendations: Product[];
}

const ProductPage: React.FC<ProductPageProps> = ({ initialProduct, recommendations }) => {
    const params = useParams<{ id: string }>();
    const id = params?.id;
    const router = useRouter();
    const searchParams = useSearchParams();
    const requestedColorCode = searchParams.get('color');
    const appliedColorCodeRef = useRef<string | null>(null);

    const [activColor, setActivColor] = useState<ProductColor | null>(() =>
        initialProduct.colors?.find(c => c.inStore === 'true') || null
    );
    const [activSize, setActiveSize] = useState<ProductSize | null>(() =>
        initialProduct.size?.find(s => s.inStore === 'true') || null
    );

    const [showPopUp, setShowPopUp] = useState<boolean>(false);
    const [messageComponent, setMessageComponent] = useState<React.ReactNode>(null);

    const { addToBascet } = useAppContext();

    const product = initialProduct;

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [id]);

    useEffect(() => {
        if (!requestedColorCode) return;
        if (appliedColorCodeRef.current === requestedColorCode) return;

        const match = product.colors?.find((c) => c.colorCode === requestedColorCode) ?? null;
        if (!match) return;

        appliedColorCodeRef.current = requestedColorCode;
        queueMicrotask(() => setActivColor(match));
    }, [product, requestedColorCode]);

    const { image, coast, name, size, colors, description } = product;

    const formatSizeName = (name: string) => name.replace(/([a-z])([A-Z])/g, '$1 $2');

    const renderSizeInfo = (sizes: ProductSize[]) => {
        if (!sizes?.length) return <p className="one_size_string">Размер не указан</p>;

        if (sizes.length === 1) {
            const isLong = sizes[0].name.length > 3;
            return (
                <div className="one_size_string">
                    <span className="mobile-hidden">Размер:</span>
                    <div className={`one_size_string-label ${isLong ? 'long-text' : ''}`}>
                        {formatSizeName(sizes[0].name)}
                    </div>
                    <span className="mobile-hidden">(one size)</span>
                </div>
            );
        }

        return (
            <div className="size_string">
                {sizes.map((item, index) => {
                    const isLong = item.name.length > 3;
                    return (
                        <button key={index} onClick={() => setActiveSize(item)}
                            className={`color_item ${activSize?.name === item.name ? 'activColor' : ''} ${item.inStore === 'true' ? '' : 'disable_size'} ${isLong ? 'long-text' : ''}`}>
                            {formatSizeName(item.name)}
                        </button>
                    );
                })}
            </div>
        );
    };

    const attGoodsToBasket = () => {
        if (!activColor || !activSize) return;
        addToBascet({
            id: product.id, name: product.name, price: coast,
            selectedSize: activSize, selectedColor: activColor,
            image: image[activColor.imageIndex][0]
        });
    };

    return (
        <main className="page product-page">
            <div className="product-page--content">
                <button className="arrow_button mobile-visible" onClick={() => router.back()}>
                    <svg width="20" height="14" viewBox="0 0 20 14" fill="none"><path d="M31 6.70703H2" stroke="black" strokeWidth="2"/><path d="M7.94238 0.707032L2 6.64941L7.94238 12.5918" stroke="black" strokeWidth="2"/></svg>
                </button>

                <section className="left_block">
                    <PhotoGalerey key={activColor?.colorCode} images={image[activColor?.imageIndex ?? 0] || []} />
                </section>

                <section className="right_block">
                    <button className="arrow_button desctop-visible" onClick={() => router.back()}>
                        <svg width="42" height="14" viewBox="0 0 42 14" fill="none"><path d="M41.4143 6.70711H1.41431" stroke="currentColor" strokeWidth="2"/><path d="M7.35669 0.707108L1.41431 6.64949L7.35669 12.5919" stroke="currentColor" strokeWidth="2"/></svg>
                    </button>

                    <article className="content__information_block">
                        <header className="name_block">
                            <h1>{name}</h1>
                            <p className="product-price">{formatPrice(coast)}</p>
                        </header>
                        <hr />
                        <p className="collor_name">{activColor?.colorName || 'Цвет не выбран'}</p>
                        <div className="collors_button">
                            {colors.map((item, index) => (
                                <button key={index} style={{ backgroundColor: item.colorCode }}
                                    className={`color_item ${item.colorCode === activColor?.colorCode ? 'activColor' : ''} ${item.inStore !== 'true' ? 'disable_color' : ''}`}
                                    onClick={() => setActivColor(item)} disabled={item.inStore !== 'true'} />
                            ))}
                        </div>
                        <div className="size_container">
                            <div>{renderSizeInfo(size)}</div>
                            <button className="size_help" onClick={() => { setMessageComponent(<SizeMessage/>); setShowPopUp(true)}}>
                                <img src="/icons/helpIcon.svg" alt="Помощь"/> <span>Как выбрать размер</span>
                            </button>
                        </div>
                        <button className="add_btn" onClick={attGoodsToBasket}>Добавить в корзину</button>
                    </article>

                    <section className="description_block">
                        <div className="description_block-title">
                            <button onClick={() => { setMessageComponent(<CompoundMessage prop={product} />); setShowPopUp(true) }}>Состав и уход</button>
                            <button onClick={() => { setMessageComponent(<DeliveryMessage />); setShowPopUp(true) }}>Доставка</button>
                        </div>
                        <p className="paragraf">{description}</p>
                        <h2 className="recomendation-title">Возможно, вас заинтересует</h2>
                    </section>
                </section>
            </div>

            <section className="recomendation">
                <div className="recomendation-cards" role="list">
                    {recommendations.length > 0 ? (
                        recommendations.map((card: Product, index: number) => (
                            <article key={card.id || index} role="listitem">
                                <ProductCard {...card} />
                            </article>
                        ))
                    ) : (
                        <p>Нет рекомендаций</p>
                    )}
                </div>
            </section>

            {showPopUp ? (
                <PopUp popUpController={showPopUp} onClose={() => setShowPopUp(false)}>
                    {messageComponent}
                </PopUp>
            ) : null}
        </main>
    );
};
export default ProductPage;
