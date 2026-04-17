'use client'

import React, { useState } from "react";
import './PhotoGalereyStyle.css';
import DotIcon from "@/shared/tsxIcons/DotIcon";

interface PhotoGalereyProps {
    images?: string[];
}

export const PhotoGalerey: React.FC<PhotoGalereyProps> = ({ images = [] }) => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    
    // ЭФФЕКТ УДАЛЕН. Индекс теперь сбрасывается через key в родителе.
    
    if (!images || images.length === 0) {
        return null;
    }

    return (
        <div className="galerey">
            <div className="main_image">
                <img src={images[currentIndex]} alt="Main product" />
            </div>
            
            <div className="galerey-pictures">
                {images.map((image, index) => (
                    <div className="miniature" key={index}>
                        <img 
                            src={image} 
                            alt={`Product view ${index + 1}`}
                            className={index === currentIndex ? 'active' : ''}
                            onClick={() => setCurrentIndex(index)} 
                        />
                    </div>
                ))}
            </div>

            {images.length > 5 && (
                <div className="dot-menu">
                    {images.map((_, index) => (
                        <DotIcon 
                            key={index} 
                            fill={index === currentIndex ? '#000000' : '#CCCCCC'}
                            onClick={() => setCurrentIndex(index)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};