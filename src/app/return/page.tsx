import type { Metadata } from "next";
import { breadcrumbListJsonLd } from "@/shared/seo/jsonLd";
import ReturnContent from "./ReturnContent";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://art-nexus.ru";

export const metadata: Metadata = {
  title: "Возврат и обмен одежды — Art Nexus",
  description:
    "Условия возврата и обмена дизайнерской одежды Art Nexus. Срок возврата 14 дней, требования к товару и контакты.",
  keywords: [
    "возврат одежды",
    "возврат одежды интернет-магазин",
    "обмен одежды",
    "возврат Art Nexus",
    "условия возврата дизайнерской одежды",
  ],
  alternates: { canonical: `${SITE_URL}/return` },
  openGraph: {
    title: "Возврат и обмен — Art Nexus",
    description:
      "Условия возврата и обмена одежды в интернет-магазине Art Nexus.",
    url: `${SITE_URL}/return`,
    siteName: "Art Nexus",
    locale: "ru_RU",
    type: "article",
  },
};

export default function ReturnPage() {
  const breadcrumbs = breadcrumbListJsonLd([
    { name: "Главная", item: `${SITE_URL}/` },
    { name: "Возврат и обмен", item: `${SITE_URL}/return` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <ReturnContent />
    </>
  );
}
