import { Product } from "@/entities/product/model/type";
import ProductPage from "@/pageComponents/productPage/ProductPage";
import { SERVER_URL } from "@/shared/serverConfig";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { breadcrumbListJsonLd } from "@/shared/seo/jsonLd";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://art-nexus.ru';

async function getProduct(id: string) {
  const response = await fetch(`${SERVER_URL}/api/goods`, { cache: 'no-store' });
  if (!response.ok) return null;
  const data = await response.json();
  return data.find((item: Product) => String(item.id) === String(id)) || null;
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return { title: "Товар не найден | Art Nexus" };
  }

  const url = `${SITE_URL}/products/${id}`;
  const description = product.description || `Описание товара ${product.name} от бренда Art Nexus.`;
  const imageUrl = product.image?.[0]?.[0];

  return {
    title: `${product.name} | Купить одежду Art Nexus`, 
    description,
    keywords: [product.name, 'Art Nexus', 'дизайнерская одежда', 'купить одежду'],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: product.name,
      description,
      url,
      siteName: 'Art Nexus',
      locale: 'ru_RU',
      type: 'website',
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: 1200,
              height: 1200,
              alt: product.name,
            },
          ]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  const breadcrumbs = breadcrumbListJsonLd([
    { name: 'Главная', item: `${SITE_URL}/` },
    { name: product.name, item: `${SITE_URL}/products/${id}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <ProductPage initialProduct={product} />
    </>
  );
}