import { useCallback } from 'react';
import { Product } from '../product/model/type';

export const useRecomendation = (allProducts: Product[]) => {
    return useCallback((count: number) => {
        if (!allProducts || allProducts.length === 0) return [];
        
        return [...allProducts]
            .sort(() => Math.random() - 0.5)
            .slice(0, count);
    }, [allProducts]);
};