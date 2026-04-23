'use client'
import "@/app/informationStyle.css"
import { useRouter } from "next/navigation";
import { breadcrumbListJsonLd } from "@/shared/seo/jsonLd";

export default function Return() {

    const router = useRouter();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://art-nexus.ru';
    const breadcrumbs = breadcrumbListJsonLd([
        { name: 'Главная', item: `${siteUrl}/` },
        { name: 'Возврат и обмен', item: `${siteUrl}/return` },
    ]);

    return (
        <div className="content more-margin">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
            />
            <div className="void">
            </div>
            <section className="information_block">
                <article className="page-information-block">
                     <button 
                        className="arrow_button mobile-visible left-more"  
                         onClick={() => router.back()}
                        aria-label="Вернуться назад"
                    >
                        <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M31 6.70703H2" stroke="black" strokeWidth="2"/>
                            <path d="M7.94238 0.707032L2 6.64941L7.94238 12.5918" stroke="black" strokeWidth="2"/>
                        </svg>
                    </button>
                    <h1>Возврат и обмен</h1>
                    <p>
                        Товар, заказанный в интернет-магазине и не подошедший по каким-либо причинам, может быть возвращен в течение 14 дней.
                        <br/><br/>
                        Возврат товара возможен в случае, если соблюдены следующие условия:
                        товар не был в употреблении (отсутствие следов эксплуатации и носки, 
                        наличие оригинальной и неповрежденной упаковки и ярлыков);
                        имеется подтверждение приобретения его в нашем интернет-магазине;
                        сохранены потребительские свойства и товарный вид.
                        <br />
                        Для возврата товара, пожалуйста, свяжитесь c нами удобным для вас способом. <br />
                        <br />
                        art.nexus.russia@gmail.com <br />
                        тел. +7 (993) 262-67-16 <br />
                        @ArtNexus_Manager - Telegram<br />
                        Мы дорожим своей репутацией и трепетно относимся к каждому заказу!
                    </p>
                </article>
            </section>
        </div>
    )
}