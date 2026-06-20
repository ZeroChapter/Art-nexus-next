export interface ProductSize {
  name: string;
  stock: number;
}

export interface Product {
  id: string;
  groupId: string;
  sku: string;
  name: string;
  price: number;
  colorName: string;
  colorCode: string;
  image: string[];
  size: ProductSize[];
  isNew: boolean;
  compound: string[];
  care: string[];
  description: string[];
  order: number;
}

export interface SelectedColor {
  colorName: string;
  colorCode: string;
}

export interface GoodByIdResponse {
  product: Product;
  relatedProducts: Product[];
}

export interface CarouselSlide {
  id: string | number;
  url: string;
  alt?: string;
  title?: string;
}
