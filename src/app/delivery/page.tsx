import type { Metadata } from "next";
import { breadcrumbListJsonLd } from "@/shared/seo/jsonLd";
import DeliveryContent from "./DeliveryContent";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://art-nexus.ru";

export const metadata: Metadata = {
  title: "Доставка дизайнерской одежды по Москве и России — Art Nexus",
  description:
    "Доставка одежды Art Nexus по России и доставка с примеркой по Москве. Условия, сроки и способы получения заказа.",
  keywords: [
    "доставка одежды",
    "доставка с примеркой Москва",
    "доставка одежды по России",
    "доставка дизайнерской одежды",
    "Art Nexus доставка",
  ],
  alternates: { canonical: `${SITE_URL}/delivery` },
  openGraph: {
    title: "Доставка по Москве и России — Art Nexus",
    description:
      "Доставка одежды Art Nexus по России и доставка с примеркой по Москве.",
    url: `${SITE_URL}/delivery`,
    siteName: "Art Nexus",
    locale: "ru_RU",
    type: "article",
  },
};

export default function DeliveryPage() {
  const breadcrumbs = breadcrumbListJsonLd([
    { name: "Главная", item: `${SITE_URL}/` },
    { name: "Доставка", item: `${SITE_URL}/delivery` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <DeliveryContent />
    </>
  );
}
