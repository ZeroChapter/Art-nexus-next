import type { Metadata } from "next";
import { breadcrumbListJsonLd } from "@/shared/seo/jsonLd";
import PaymentContent from "./PaymentContent";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://art-nexus.ru";

export const metadata: Metadata = {
  title: "Оплата заказа — Art Nexus",
  description:
    "Как оплатить заказ в интернет-магазине дизайнерской одежды Art Nexus. Способы оплаты и условия.",
  keywords: [
    "оплата заказа",
    "оплата дизайнерской одежды",
    "способы оплаты Art Nexus",
    "интернет-магазин одежды оплата",
  ],
  alternates: { canonical: `${SITE_URL}/payment` },
  openGraph: {
    title: "Оплата заказа — Art Nexus",
    description:
      "Способы оплаты заказа в интернет-магазине дизайнерской одежды Art Nexus.",
    url: `${SITE_URL}/payment`,
    siteName: "Art Nexus",
    locale: "ru_RU",
    type: "article",
  },
};

export default function PaymentPage() {
  const breadcrumbs = breadcrumbListJsonLd([
    { name: "Главная", item: `${SITE_URL}/` },
    { name: "Оплата", item: `${SITE_URL}/payment` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <PaymentContent />
    </>
  );
}
