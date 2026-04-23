import { MainPage } from "@/pageComponents/main/MainPage";
import { getGoods } from "@/entities/product/api/getGoods";
import { Metadata } from "next";
import { Product } from "@/entities/product/model/type";

export const metadata: Metadata = {
  title: 'Art Nexus — эксклюзивная дизайнерская одежда',
  description: 'Интернет-магазин Art Nexus. Уникальная одежда, созданная с философией гармонии и свободы. Откройте для себя наш каталог.',
  keywords: ['Art Nexus', 'дизайнерская одежда', 'стиль', 'бренд', 'одежда с философией', 'интернет магазин'],
  openGraph: {
    title: 'Art Nexus — дизайнерская одежда и искусство связи',
    description: 'Интернет-магазин Art Nexus. Уникальная одежда, созданная с философией гармонии и свободы.',
    url: 'https://art-nexus.ru',
    siteName: 'Art Nexus',
    locale: 'ru_RU',
    type: 'website',
  },
};

export default async function Page() {
  const products: Product[] = await getGoods();
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Store',
    name: 'Art Nexus',
    description: 'Интернет-магазин дизайнерской одежды.',
    url: 'https://art-nexus.ru',
  };

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Art Nexus',
    url: 'https://art-nexus.ru',
    email: 'art.nexus.russia@gmail.com',
    telephone: '+79932626716',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      
      <MainPage initialProducts={products} />
    </>
  );
}