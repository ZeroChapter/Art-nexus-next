'use client' 
import './MobileMenu.css';
import Link from 'next/link';

export const MobileMenu = ({ isOpen, onClose }) => {
    return (
        <div className={`menu-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}>
            <div className="menu-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>×</button>
                <nav className="menu-nav">
                    <li><Link href="/delivery" onClick={onClose}>ДОСТАВКА</Link></li>
                    <li><Link href="/payment" onClick={onClose}>ОПЛАТА</Link></li>
                    <li><Link href="/return" onClick={onClose}>ОПЛАТА</Link></li>
                    <li><Link href="/about" onClick={onClose}>О НАС</Link></li>
                </nav>
            </div>
        </div>
    );
};