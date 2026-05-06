'use client'

import React, { useCallback, useEffect, useRef, useState } from "react";
import './PhotoGalereyStyle.css';
import DotIcon from "@/shared/tsxIcons/DotIcon";
import { PopUp } from "@/widgets/popup/PopUp";

interface PhotoGalereyProps {
    images?: string[];
}

export const PhotoGalerey: React.FC<PhotoGalereyProps> = ({ images = [] }) => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);

    const touchStartXRef = useRef<number | null>(null);
    const touchStartYRef = useRef<number | null>(null);
    const imagesCount = images?.length ?? 0;
    
    // ЭФФЕКТ УДАЛЕН. Индекс теперь сбрасывается через key в родителе.

    const goPrev = useCallback(() => {
        if (imagesCount <= 0) return;
        setCurrentIndex((prev) => (prev - 1 + imagesCount) % imagesCount);
    }, [imagesCount]);

    const goNext = useCallback(() => {
        if (imagesCount <= 0) return;
        setCurrentIndex((prev) => (prev + 1) % imagesCount);
    }, [imagesCount]);

    useEffect(() => {
        if (!lightboxOpen) return;
        if (imagesCount <= 1) return;

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                goPrev();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                goNext();
            }
        };

        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [goNext, goPrev, imagesCount, lightboxOpen]);

    const onTouchStart = (e: React.TouchEvent) => {
        if (imagesCount <= 1) return;
        if (e.touches.length !== 1) return;
        touchStartXRef.current = e.touches[0].clientX;
        touchStartYRef.current = e.touches[0].clientY;
    };

    const onTouchEnd = (e: React.TouchEvent) => {
        if (imagesCount <= 1) return;
        const startX = touchStartXRef.current;
        const startY = touchStartYRef.current;
        touchStartXRef.current = null;
        touchStartYRef.current = null;

        if (startX === null || startY === null) return;
        if (e.changedTouches.length !== 1) return;

        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        const dx = endX - startX;
        const dy = endY - startY;

        // Считаем свайпом только выраженное горизонтальное движение
        if (Math.abs(dx) < 40) return;
        if (Math.abs(dx) < Math.abs(dy) * 1.2) return;

        if (dx > 0) goPrev();
        else goNext();
    };

    if (!images || imagesCount === 0) {
        return null;
    }

    return (
        <div className="galerey">
            <PopUp
                variant="lightbox"
                popUpController={lightboxOpen}
                onClose={() => setLightboxOpen(false)}
            >
                <div
                    className="lightbox-media"
                    onTouchStart={onTouchStart}
                    onTouchEnd={onTouchEnd}
                    role="presentation"
                >
                    {imagesCount > 1 && (
                        <button
                            type="button"
                            className="lightbox-nav lightbox-nav_prev"
                            onClick={(e) => {
                                e.stopPropagation();
                                goPrev();
                            }}
                            aria-label="Предыдущее фото"
                        >
                            <span aria-hidden="true">‹</span>
                        </button>
                    )}

                    <img src={images[currentIndex]} alt={`Фото товара ${currentIndex + 1}`} />

                    {imagesCount > 1 && (
                        <button
                            type="button"
                            className="lightbox-nav lightbox-nav_next"
                            onClick={(e) => {
                                e.stopPropagation();
                                goNext();
                            }}
                            aria-label="Следующее фото"
                        >
                            <span aria-hidden="true">›</span>
                        </button>
                    )}
                </div>
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
                <img src={images[currentIndex]} alt={`Фото товара ${currentIndex + 1}`} />
            </div>
            
            <div className="galerey-pictures">
                {images.map((image, index) => (
                    <div className="miniature" key={index}>
                        <img 
                            src={image} 
                            alt={`Миниатюра фото ${index + 1}`}
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