'use client';
import './FooterStyle.css'

export const Footer = () => {

    return (
        <footer>
            <div className="footer_grid">
                <div className="brand_block">
                    <img src="/logo.svg" alt="изоброжение не доступно" className="brand_blok-logo"/>
                    <p className="brand_blok-name">ART NEXUS</p>
                    <p className="brand_blok-text">Связь в самом сердце <br/> Дизайнер: Леся Нечаева <br/> Муза: Сергей Нечаев</p>
                </div>
                <ul className="contact_blok">
                    <li>Telegram: @ArtNexus_Manager</li>
                    <li>art.nexus.russia@gmail.com</li>
                    <li>Поддержка: 7 дней в неделю, с 9.00 до 21.00</li>
                </ul>
                <div className="information_blok">
                    <p>
                        ИП Нечаев С. ИНН 772583816860, <br/>ОГРН 326774600131831 <br/> 
                    </p>
                </div>
            </div>
            <hr />
            <div className="footer_end">
            <p>Политика обработки персональных данных</p>
            <div className="icon_bar">
               <img 
                    src="/icons/inst.svg" 
                    alt="Instagram ART NEXUS" 
                    style={{ cursor: 'pointer' }}
                    onClick={() => window.open('https://www.instagram.com/artnexus.clothing?igsh=N2Zubm5nZXF5c3Zq', '_blank', 'noopener,noreferrer')}
                />
                <img 
                    src="/icons/tg.svg" 
                    alt="Telegram" 
                    style={{ cursor: 'pointer' }}
                    onClick={() => window.open('https://t.me/ArtNexusCloth', '_blank', 'noopener,noreferrer')} 
                />
            </div>
            </div>
        </footer>
    )

}