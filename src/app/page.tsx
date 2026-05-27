import { MainPage } from "@/pageComponents/main/MainPage";
import { getGoods } from "@/entities/product/api/getGoods";
import { Metadata } from "next";
import { Product } from "@/entities/product/model/type";

export const metadata: Metadata = {
  title:
    "Дизайнерская одежда Art Nexus — российский бренд с доставкой по Москве и России",
  description:
    "Art Nexus — российский дизайнерский бренд. Дизайнерская одежда: уникальный крой, продуманные материалы, доставка по Москве и России.",
  keywords: [
    "дизайнерская одежда",
    "дизайнерский бренд",
    "дизайнерская одежда Москва",
    "российский дизайнерский бренд",
    "купить дизайнерскую одежду",
    "женская дизайнерская одежда",
    "эксклюзивная одежда",
    "Art Nexus",
  ],
  alternates: {
    canonical: "https://art-nexus.ru/",
  },
  openGraph: {
    title: "Art Nexus — дизайнерская одежда российского бренда",
    description:
      "Art Nexus — российский дизайнерский бренд. Дизайнерская одежда: уникальный крой и доставка по Москве и России.",
    url: "https://art-nexus.ru",
    siteName: "Art Nexus",
    locale: "ru_RU",
    type: "website",
    images: [
      { url: "/og-default.svg", width: 1200, height: 630, alt: "Art Nexus" },
    ],
  },
};

export default async function Page() {
  const products: Product[] = await getGoods();
  const siteUrl = "https://art-nexus.ru";

  const onlineStoreJsonLd = {
    "@context": "https://schema.org",
    "@type": "OnlineStore",
    name: "Art Nexus",
    url: siteUrl,
    description:
      "Интернет-магазин дизайнерской одежды Art Nexus. Российский дизайнерский бренд.",
    areaServed: "RU",
    currenciesAccepted: "RUB",
    paymentAccepted: ["Cash", "Card", "Online"],
    priceRange: "₽₽₽",
  };

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Art Nexus",
    url: siteUrl,
    logo: `${siteUrl}/favicon.svg`,
    email: "art.nexus.russia@gmail.com",
    telephone: "+79932626716",
    areaServed: "RU",
    availableLanguage: ["ru"],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+79932626716",
        contactType: "customer service",
        availableLanguage: ["ru"],
      },
    ],
    sameAs: [
      // TODO: add real social profiles (VK/Instagram/Pinterest/etc.)
      "https://t.me/ArtNexus_Manager",
    ],
  };

  const webSiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Art Nexus",
    url: siteUrl,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(onlineStoreJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
      />

      <MainPage initialProducts={products} />
    </>
  );
}
