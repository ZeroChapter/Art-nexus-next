import { useCallback } from 'react';

export const useFormatPrice = () => {
  const formatPrice = useCallback((price) => {
    if (price == null) return '';
    
    const priceString = String(price);
    
    if (priceString.length <= 3) {
      return priceString + ' ₽';
    }
    
    return priceString.slice(0, -3) + ' ' + priceString.slice(-3) + ' ₽';
  }, []);

  return formatPrice;
};