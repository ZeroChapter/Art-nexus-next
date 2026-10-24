export interface ProductColor {
    colorCode: string;
    colorName: string;
    inStore: string;
    imageIndex: number;
}

/** Другой цвет того же товара (отдельная карточка в каталоге). */
export interface ProductColorVariant {
    productId: string;
    colorCode: string;
    colorName: string;
    inStore: string;
}

export interface ProductSize {
    name: string;
    inStore: string;
}

export interface Product {
    id: number | string;
    name: string;
    coast: number;
    /** Цена по скидке; если задана и меньше coast — товар в SALE */
    saleCoast?: number | null;
    description: string;
    image: string[][]; // Массив массивов путей к фото
    colors: ProductColor[];
    size: ProductSize[];
    isNew?: boolean;
}