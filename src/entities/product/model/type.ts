export interface ProductColor {
    colorCode: string;
    colorName: string;
    inStore: string;
    imageIndex: number;
}

export interface ProductSize {
    name: string;
    inStore: string;
}

export interface Product {
    id: number | string;
    name: string;
    coast: number;
    description: string;
    image: string[][]; // Массив массивов путей к фото
    colors: ProductColor[];
    size: ProductSize[];
}