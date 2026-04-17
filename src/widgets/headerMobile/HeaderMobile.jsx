'use client'
import './HeaderMobileStyle.css';
import { useState, useEffect } from "react";
import { useAppContext } from '@/shared/AppContextProvider'; // [CHECK PATH]
import Link from 'next/link'; // Заменили react-router-dom
import { PopUp } from '@/widgets/popup/PopUp'; // [CHECK PATH]
import { Bascket } from '@/widgets/bascket/Bascet'; // [CHECK PATH]
import { MobileMenu } from '@/widgets/mobileMenu/MobileMenu'; // [CHECK PATH]

export const HeaderMobile = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const { bascet } = useAppContext();
    const [showPopUp, setShowPopUp] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleClose = () => {
        setShowPopUp(false);
        setShowMenu(false);
    };

    return (
        <header className={`mobile-header ${isScrolled ? 'scrolled' : ''}`}>
            <div className='header-grid'>
                <button className='burger_button' onClick={() => setShowMenu(true)}>
                    <div className='line-one bb-line'></div>
                    <div className='line_two bb-line'></div>
                </button>
                <Link href="/" className="logo mobile a" aria-label="На главную">
                    ART NEXUS
                </Link>
                <div className="header-up_right">
                    <button 
                        className="basket down" 
                        onClick={() => bascet.length > 0 && setShowPopUp(true)}
                        aria-label={`Корзина, ${bascet.length} товаров`}
                    >
                        <span className="basket-counter" aria-hidden="true">{bascet.length}</span>
                        <img src="/basket.svg" alt="" className="basket-icon" aria-hidden="true"/>
                    </button>
                </div>
            </div>
            <PopUp popUpController={showPopUp} onClose={handleClose} >
                <Bascket />
            </PopUp>
            <MobileMenu isOpen={showMenu} onClose={() => setShowMenu(false)} />
        </header>
    )
}