import { CATALOG_REVALIDATE_SECONDS } from '@/shared/cacheConfig';
import { SERVER_URL } from '@/shared/serverConfig';

export interface CarouselSlide {
  id?: string | number;
  url: string;
  alt?: string;
  title?: string;
}

export async function getCarouselSlides(): Promise<CarouselSlide[]> {
  try {
    const res = await fetch(`${SERVER_URL}/api/carousel`, {
      next: { revalidate: CATALOG_REVALIDATE_SECONDS },
    });

    if (!res.ok) return [];

    return res.json();
  } catch {
    return [];
  }
}
