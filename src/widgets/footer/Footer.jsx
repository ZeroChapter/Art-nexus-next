'use client';
import './FooterStyle.css'

export const Footer = () => {

    return (
        <footer>
            <div className="footer_grid">
                <div className="brand_block">
                    <img src="/logo.svg" alt="Логотип Art Nexus" className="brand_blok-logo"/>
                    <p className="brand_blok-name">ART NEXUS</p>
                    <p className="brand_blok-text">Связь в самом сердце <br/> Дизайнер: Леся Нечаева <br/> Муза: Сергей Нечаев</p>
                </div>
                <ul className="contact_blok">
                    <li>
                        <a href="https://t.me/ArtNexus_Manager" target="_blank" rel="noopener noreferrer">
                            Telegram: @ArtNexus_Manager
                        </a>
                    </li>
                    <li>
                        <a href="mailto:art.nexus.russia@gmail.com">art.nexus.russia@gmail.com</a>
                    </li>
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
               <a
                    href="https://www.instagram.com/artnexus.clothing?igsh=N2Zubm5nZXF5c3Zq"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram Art Nexus"
                >
                    <img src="/icons/inst.svg" alt="" />
                </a>
                <a
                    href="https://t.me/ArtNexusCloth"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Telegram Art Nexus"
                >
                    <img src="/icons/tg.svg" alt="" />
                </a>
            </div>
            </div>
        </footer>
    )

}
