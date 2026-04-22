'use client'

import React, { useState } from "react";
import './PhotoGalereyStyle.css';
import DotIcon from "@/shared/tsxIcons/DotIcon";
import { PopUp } from "@/widgets/popup/PopUp";

interface PhotoGalereyProps {
    images?: string[];
}

export const PhotoGalerey: React.FC<PhotoGalereyProps> = ({ images = [] }) => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    
    // ЭФФЕКТ УДАЛЕН. Индекс теперь сбрасывается через key в родителе.
    
    if (!images || images.length === 0) {
        return null;
    }

    return (
        <div className="galerey">
            <PopUp
                variant="lightbox"
                popUpController={lightboxOpen}
                onClose={() => setLightboxOpen(false)}
            >
                <img src={images[currentIndex]} alt="" />
            </PopUp>
            <div
                className="main_image"
                role="button"
                tabIndex={0}
                onClick={() => setLightboxOpen(true)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setLightboxOpen(true);
                    }
                }}
                aria-label="Открыть фото на весь экран"
            >
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