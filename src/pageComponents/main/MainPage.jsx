// import React, { useState, useEffect } from "react";
import { PhotoCarousel } from "../../widgets/carusel/PhotoCarousel";
import './MainPageStyle.css'
import { ProductCard } from "../../widgets/productCard/ProductCard";
// import { useMetaTags } from "../../entities/hooks/useMetaTags";
import { PopUp } from "../../widgets/popup/PopUp";
import { SizeMessage } from "../../entities/messages/SizeMessage";


export const MainPage = ({ initialProducts }) => {

    const products = initialProducts;


    // useMetaTags({
    //     title: 'ART NEXUS | Эксклюзивная одежда',
    //     description: 'Магазин уникальной одежды от российских дизайнеров. Премиальное качество, доставка по всей России',
    //     keywords: 'дизайнерские вещи, уникальные вещи, дизайнерская одежда, российские дизайнеры, женская одежда, скидки, премиальное качество,',
    //     robots: 'index, follow',
    //     canonical: 'https://artnexus.ru',
    //     'og:type': 'website',
    //     'og:title': 'ART NEXUS | Эксклюзивная одежда',
    //     'og:description': 'Магазин уникальной одежды от российских дизайнеров',
    //     'og:image': '/images/collection-preview.jpg',
    //     'og:url': 'https://artnexus.ru',
    //     'twitter:card': 'summary_large_image',
    //     'twitter:title': 'ART NEXUS',
    //     'twitter:description': 'Эксклюзивная одежда',
    //     'twitter:image': '/images/collection-preview.jpg',
    // });


    return (
        <>
        <main className="page">
            <PhotoCarousel/>
            <div className="catalog_title">
                <h1>коллекция <br/> весна-лето 2026</h1>
            </div>
            <div className="catalog">
                {products.map((product) => {
                    if (product.colors.find(color => color.inStore === 'true')) {
                        return <ProductCard key={product.id} {...product}/>
                    }  
                })}
            </div>
            <PopUp>
                <SizeMessage/>
            </PopUp>
        </main>
        </>
    );
    
};