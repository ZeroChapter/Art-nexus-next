'use client'

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from 'next/navigation';
import { PhotoGalerey } from "@/widgets/photoGalerey/PhotoGalerey";
import { useFormatPrice } from "@/entities/hooks/useFormatPrice";
import { useRecomendation } from '@/entities/hooks/useRocomendation'
import { ProductCard } from "@/widgets/productCard/ProductCard";
import { PopUp } from "@/widgets/popup/PopUp";
import { SizeMessage } from "@/entities/messages/SizeMessage";
import { useAppContext } from "@/shared/AppContextProvider";
import { DeliveryMessage } from "@/entities/messages/DeliveryMessage";
import { CompoundMessage } from "@/entities/messages/CompoundMessage";
import { Product, ProductColor, ProductSize } from "@/entities/product/model/type";
import './ProductPageStyle.css';
import { SERVER_URL } from "@/shared/serverConfig";

interface ProductPageProps {
    initialProduct?: Product;
}

export const ProductPage: React.FC<ProductPageProps> = ({ initialProduct }) => {
    const params = useParams<{ id: string }>();
    const id = params?.id;
    const router = useRouter();

    const [product, setProduct] = useState<Product | null>(initialProduct || null);
    const [activColor, setActivColor] = useState<ProductColor | null>(() => 
        initialProduct?.colors?.find(c => c.inStore === 'true') || null
    );
    const [activSize, setActiveSize] = useState<ProductSize | null>(() => 
        initialProduct?.size?.find(s => s.inStore === 'true') || null
    );
    
    const [showPopUp, setShowPopUp] = useState<boolean>(false);
    const [messageComponent, setMessageComponent] = useState<React.ReactNode>(null);

    const formatPrice = useFormatPrice();
    const [allGoods, setAllGoods] = useState<Product[]>([]);

    useEffect(() => {
        fetch(`${SERVER_URL}/api/goods`)
            .then(res => res.json())
            .then(data => {
                setAllGoods(data); 
            
                const found = data.find((item: Product) => item.id.toString() === id);
                setProduct(found);
            });
    }, [id]);

    const getRecomendation = useRecomendation(allGoods);
    const recomendationCards = getRecomendation(4);

    const { addToBascet } = useAppContext();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [id]);

    useEffect(() => {
        if (product) return;
        if (!id) return;
        
        fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/goods`)
            .then(res => res.json())
            .then(data => {
                const found = data.find((item: Product) => item.id.toString() === id);
                if (found) {
                    setProduct(found);
                    setActivColor(found.colors?.find((c: ProductColor) => c.inStore === 'true') || null);
                    setActiveSize(found.size?.find((s: ProductSize) => s.inStore === 'true') || null);
                }
            })
            .catch(err => console.error(err));
    }, [id, product]);

    if (!product) return <main className="page"><div>Загрузка...</div></main>;

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
                    {recomendationCards && recomendationCards.length > 0 ? (
                        recomendationCards.map((card: Product, index: number) => (
                            <article key={card.id || index} role="listitem">
                                <ProductCard {...card} />
                            </article>
                        ))
                    ) : (
                        <p>Нет рекомендаций</p>
                    )}
                </div>
            </section>

            <PopUp popUpController={showPopUp} onClose={() => setShowPopUp(false)}>
                {messageComponent}
            </PopUp>
        </main>
    );
};