'use client'
import "@/app/informationStyle.css"
import { useRouter } from "next/navigation";
import { DeliveryMessage } from "../../entities/messages/DeliveryMessage";

export default function Delivery() {

    const router = useRouter(); 

    return (
        <div className="content more-margin">
            
            <div className="void">
            </div>
            <section className="information_block">
                <article className="block">
                    <button 
                        className="arrow_button mobile-visible left-more"  
                        onClick={() => router.back()}
                        aria-label="Вернуться назад"
                    >
                        <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M31 6.70703H2" stroke="black" strokeWidth="2"/>
                            <path d="M7.94238 0.707032L2 6.64941L7.94238 12.5918" stroke="black" stroke-width="2"/>
                        </svg>
                    </button>
                    <DeliveryMessage />
                </article>
            </section>
        </div>
    )
}