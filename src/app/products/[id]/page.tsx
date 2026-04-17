import { Product } from "@/entities/product/model/type";
import ProductPage from "@/pageComponents/productPage/ProductPage";
import { SERVER_URL } from "@/shared/serverConfig";
import { notFound } from "next/navigation";
import { Metadata } from "next";

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

  return {
    title: `${product.name} | Купить одежду Art Nexus`, 
    description: product.description || `Описание товара ${product.name} от бренда Art Nexus.`,
    keywords: [product.name, 'Art Nexus', 'дизайнерская одежда', 'купить одежду'],
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.image ? [
        {
          url: product.image[0][0], 
          width: 800,         
          height: 600,
          alt: product.name,
        }
      ] : [], 
    },
  };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return <ProductPage initialProduct={product} />;
}