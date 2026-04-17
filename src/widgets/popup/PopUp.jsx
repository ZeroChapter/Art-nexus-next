'use client'
import React, { useState, useEffect } from "react";
import './PopUpStyle.css';

export const PopUp = ({ 
    children, 
    popUpController,
    onClose }) => { 
    const [shouldRender, setShouldRender] = useState(popUpController);

    useEffect(() => {
        setShouldRender(popUpController)
    }, [popUpController]);

    const handleClose = () => {
        const contentWindow = document.querySelector('.content_window');
        if (contentWindow) {
            contentWindow.style.animation = 'popupHide 0.3s forwards';
        }
        
        setTimeout(() => {
            setShouldRender(false);
            if (onClose) onClose();
        }, 300);
    };

    const closeByKey = () => {
        if(event.key === 'Escape') {
            handleClose()
        }
    };

    useEffect(() => {
    window.addEventListener('keydown', closeByKey);

    return () => {
      window.removeEventListener('keydown', closeByKey);
    };
  }, []);

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

    return (
        <div>
            <div className="overlay"></div>
            <div className="content_window">
                <div className="window-close">
                    <button className="cross" onClick={handleClose}>
                        <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                            <rect y="13.7661" width="19.3638" height="2" transform="rotate(-45.31 0 13.7661)" />
                            <rect x="13.6864" y="15.1014" width="19.3556" height="2" transform="rotate(-135 13.6864 15.1014)" />
                        </svg>
                    </button>
                </div>
                <div className="pop-up-content">
                    {children} 
                </div>
            </div>
        </div>
    );
};