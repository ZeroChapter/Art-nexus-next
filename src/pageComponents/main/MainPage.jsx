// import React, { useState, useEffect } from "react";
import { PhotoCarousel } from "../../widgets/carusel/PhotoCarousel";
import './MainPageStyle.css'
import { ProductCard } from "../../widgets/productCard/ProductCard";
import { Baner } from "../../widgets/baners/Baner";
import { PopUp } from "../../widgets/popup/PopUp";
import { SizeMessage } from "../../entities/messages/SizeMessage";


export const MainPage = ({ initialProducts }) => {

    const products = initialProducts;


    return (
        <>
        <main className="page">
            <PhotoCarousel/>
            <div className="catalog_title">
                <h1>коллекция <br/> весна-лето 2026</h1>
            </div>
            <Baner />
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