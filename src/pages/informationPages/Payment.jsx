import React from "react";
import "./informationStyle.css"
import { PhotoCarousel } from "../../widgets/carusel/PhotoCarousel";
import { useNavigate } from "react-router-dom";

export const Payment = () => {

    const navigation = useNavigate();

    return (
        <div className="content more-margin">
            <div className="void">
            </div>
            <section className="information_block">
                <article className="block">
                     <button 
                        className="arrow_button mobile-visible left-more"  
                        onClick={() => navigation(-1)}
                        aria-label="Вернуться назад"
                    >
                        <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M31 6.70703H2" stroke="black" stroke-width="2"/>
                            <path d="M7.94238 0.707032L2 6.64941L7.94238 12.5918" stroke="black" stroke-width="2"/>
                        </svg>
                    </button>
                    <h1>Оплата</h1>
                    <p>
                        После оформления заказа с вами свяжется наш менеджер. <br />
                        Вы сможете выбрать удобный способ оплаты. 
                    </p>
                </article>
            </section>
        </div>
    )
}