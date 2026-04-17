import { MainPage } from "@/pages/main/MainPage";
import { getGoods } from "@/entities/product/api/getGoods";
import { Metadata } from "next";

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
  const products = await getGoods();
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Store',
    name: 'Art Nexus',
    description: 'Интернет-магазин дизайнерской одежды.',
    url: 'https://art-nexus.ru',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <MainPage initialProducts={products} />
    </>
  );
}