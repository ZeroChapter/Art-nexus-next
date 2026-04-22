'use client'
import React, { useState, useEffect, useRef, useCallback } from "react";
import './PopUpStyle.css';

export const PopUp = ({ 
    children, 
    popUpController,
    onClose,
    variant = 'modal',
}) => { 
    const [shouldRender, setShouldRender] = useState(popUpController);
    const contentRef = useRef(null);

    useEffect(() => {
        setShouldRender(popUpController)
    }, [popUpController]);

    const handleClose = useCallback(() => {
        const el = contentRef.current;
        if (el) {
            el.style.animation =
                variant === 'lightbox'
                    ? 'lightboxHide 0.25s ease forwards'
                    : 'popupHide 0.3s forwards';
        }

        const delay = variant === 'lightbox' ? 250 : 300;
        setTimeout(() => {
            setShouldRender(false);
            if (onClose) onClose();
        }, delay);
    }, [onClose, variant]);

    useEffect(() => {
        const closeByKey = (e) => {
            if (e.key === 'Escape' && shouldRender) {
                handleClose();
            }
        };
        window.addEventListener('keydown', closeByKey);
        return () => window.removeEventListener('keydown', closeByKey);
    }, [shouldRender, handleClose]);

    useEffect(() => {
        if (shouldRender && contentRef.current) {
            contentRef.current.style.animation = '';
        }
    }, [shouldRender]);

    useEffect(() => {
    if (shouldRender) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'unset';
    }
    
    return () => {
        document.body.style.overflow = 'unset';
    };
}, [shouldRender])
    
    if (!shouldRender) {
        return null;
    }

    const overlayClass = variant === 'lightbox' ? 'overlay overlay_lightbox' : 'overlay';
    const windowClass =
        variant === 'lightbox' ? 'content_window content_window_lightbox' : 'content_window';

    return (
        <div className={variant === 'lightbox' ? 'popup-root popup-root_lightbox' : 'popup-root'}>
            <div className={overlayClass} role="presentation" />
            <div className={windowClass} ref={contentRef}>
                <div className="window-close">
                    <button type="button" className="cross" onClick={handleClose} aria-label="Закрыть">
                        <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                            <rect y="13.7661" width="19.3638" height="2" transform="rotate(-45.31 0 13.7661)" />
                            <rect x="13.6864" y="15.1014" width="19.3556" height="2" transform="rotate(-135 13.6864 15.1014)" />
                        </svg>
                    </button>
                </div>
                <div
                    className="pop-up-content"
                    onClick={
                        variant === 'lightbox'
                            ? (e) => {
                                  if (e.target === e.currentTarget) handleClose();
                              }
                            : undefined
                    }
                    role={variant === 'lightbox' ? 'presentation' : undefined}
                >
                    {children}
                </div>
            </div>
        </div>
    );
};