'use client'
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import './HeaderComponentStyle.css';
import Link from 'next/link';
import { useAppContext } from "@/shared/AppContextProvider";

const PopUp = dynamic(
  () => import("@/widgets/popup/PopUp").then((m) => m.PopUp),
  { ssr: false },
);

const Bascket = dynamic(
  () => import("@/widgets/bascket/Bascet").then((m) => m.Bascket),
  { ssr: false },
);

export const HeaderComponent = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const { bascet } = useAppContext();
    const [showPopUp, setShowPopUp] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleClose = () => setShowPopUp(false);

    return (
        <header className={`big_head desktop-header ${isScrolled ? 'scrolled' : ''}`}>
            <div className="content-box"> 
                <div className="header-up">
                    <Link href="/" className="logo a" aria-label="На главную">
                        ART NEXUS
                    </Link>
                    
                    <div className="header-up_right">
                        <a href="tel:+79935021311" className="header-up_right_phone a">
                            +7 (993) 262-67-16
                        </a>
                        <button 
                            className="basket" 
                            onClick={() => bascet.length > 0 && setShowPopUp(true)}
                            aria-label={`Корзина, ${bascet.length} товаров`}
                        >
                            <span className="basket-counter" aria-hidden="true">{bascet.length}</span>
                            <img src="/basket.svg" alt="" className="basket-icon" aria-hidden="true"/>
                        </button>
                    </div>
                </div>
                
                <nav className="main-navigation" aria-label="Основное меню">
                    <ul>
                        <li><Link href="/delivery" className="a">ДОСТАВКА</Link></li>
                        <li><Link href="/payment" className="a">ОПЛАТА</Link></li>
                        <li><Link href="/return" className="a">ВОЗВРАТ</Link></li>
                        <li><Link href="/about" className="a">О НАС</Link></li>
                    </ul>
                </nav>
            </div>
            {showPopUp ? (
                <PopUp popUpController={showPopUp} onClose={handleClose}>
                    <Bascket />
                </PopUp>
            ) : null}
        </header>
    );
};