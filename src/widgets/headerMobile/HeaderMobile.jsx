'use client'
import './HeaderMobileStyle.css';
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useAppContext } from '@/shared/AppContextProvider';
import Link from 'next/link';

const PopUp = dynamic(
  () => import('@/widgets/popup/PopUp').then((m) => m.PopUp),
  { ssr: false },
);

const Bascket = dynamic(
  () => import('@/widgets/bascket/Bascet').then((m) => m.Bascket),
  { ssr: false },
);

const MobileMenu = dynamic(
  () => import('@/widgets/mobileMenu/MobileMenu').then((m) => m.MobileMenu),
  { ssr: false },
);

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
            {showPopUp ? (
                <PopUp popUpController={showPopUp} onClose={handleClose}>
                    <Bascket />
                </PopUp>
            ) : null}
            {showMenu ? (
                <MobileMenu isOpen={showMenu} onClose={() => setShowMenu(false)} />
            ) : null}
        </header>
    )
}