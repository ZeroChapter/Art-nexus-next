import { Product } from '@/entities/product/model/type';
import ProductPage from '@/pageComponents/productPage/ProductPage';
import { getGoodById } from '@/entities/product/api/getGoods';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { breadcrumbListJsonLd } from '@/shared/seo/jsonLd';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://art-nexus.ru';

function productDescription(product: Product): string {
  if (product.description?.length) {
    return product.description.join(' ');
  }
  return `Описание товара ${product.name} от бренда Art Nexus.`;
}

function hasStock(product: Product): boolean {
  return (product.size ?? []).some((s) => s.stock > 0);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const data = await getGoodById(id);

  if (!data) {
    return { title: 'Товар не найден | Art Nexus' };
  }

  const { product, relatedProducts } = data;
  const url = `${SITE_URL}/products/${id}`;
  const description = productDescription(product);
  const imageUrl = product.image?.[0];

  const colorNames = [product, ...relatedProducts]
    .map((p) => p.colorName)
    .filter(Boolean);
  const sizeNames = (product.size ?? [])
    .map((s) => s.name)
    .filter(Boolean);

  return {
    title: `${product.name} — купить дизайнерскую одежду Art Nexus`,
    description,
    keywords: [
      product.name,
      'Art Nexus',
      'дизайнерская одежда',
      'купить дизайнерскую одежду',
      'купить дизайнерскую одежду в Москве',
      'российский бренд',
      'российский дизайнерский бренд',
      ...colorNames,
      ...sizeNames,
    ],
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

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getGoodById(id);

  if (!data) {
    notFound();
  }

  const { product, relatedProducts } = data;
  const url = `${SITE_URL}/products/${id}`;
  const description = productDescription(product);
  const images = (product.image ?? []).filter(Boolean);
  const availability = hasStock(product)
    ? 'https://schema.org/InStock'
    : 'https://schema.org/OutOfStock';

  const breadcrumbs = breadcrumbListJsonLd([
    { name: 'Главная', item: `${SITE_URL}/` },
    { name: product.name, item: url },
  ]);

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description,
    image: images,
    sku: product.sku,
    mpn: product.sku,
    brand: { '@type': 'Brand', name: 'Art Nexus' },
    offers: {
      '@type': 'Offer',
      url,
      priceCurrency: 'RUB',
      price: product.price,
      availability,
      itemCondition: 'https://schema.org/NewCondition',
      seller: { '@type': 'Organization', name: 'Art Nexus' },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <ProductPage
        key={product.id}
        product={product}
        relatedProducts={relatedProducts}
      />
    </>
  );
}
