'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import './ProductcardStyle.css';
import { useFormatPrice } from "@/entities/hooks/useFormatPrice";
import { Product, ProductColor } from "@/entities/product/model/type";

interface ProductCardProps extends Product {
    isNew?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
    id,
    image,
    coast,
    name,
    isNew,
    colors
}) => {
    const router = useRouter();
    const formatPrice = useFormatPrice();

    const colorStyle = {
        backgroundColor: colors?.[0]?.colorCode || '#ccc'
    };

    const handleClick = () => {
        router.push(`/products/${id}`);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            router.push(`/products/${id}`);
        }
    };

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
                <div className={`mew_lable ${isNew ? '' : 'hidden'}`}>NEW</div>
                {/* Безопасное обращение к массиву изображений */}
                <img src={image?.[0]?.[0] || ''} alt={name}/>
            </div>
            
            <div className="description_container">
                <h2 className="product-name">{name}</h2>
                <div className="color_container">
                    <div className="colorSquer" style={colorStyle}></div>
                    +{colors?.length || 0}    
                </div>
                <p>{formatPrice(coast)}</p>
            </div>
        </div>
    );
};