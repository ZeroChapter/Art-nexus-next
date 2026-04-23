import React, { useState, useCallback, createContext, useContext, ReactNode } from "react";
import { ProductColor, ProductSize } from "@/entities/product/model/type";
import { PageToast } from "@/shared/ui/pageToast/PageToast";

// 1. Интерфейс товара в корзине
export interface BasketItem {
  id: string | number;
  name: string;
  price: number;
  selectedSize: ProductSize;
  selectedColor: ProductColor;
  image: string;
  quantity: number;
  uniqueId: number;
}

// 2. Интерфейс контекста
interface AppContextType {
  bascet: BasketItem[];
  setBascetStore: (arr: BasketItem[]) => void;
  addToBascet: (product: Omit<BasketItem, 'quantity' | 'uniqueId'>) => void;
  removeFromBascet: (indexOrId: number) => void;
  removeSpecificItem: (productId: string | number, selectedSize: ProductSize, selectedColor: ProductColor) => void;
  removeAllByParams: (productId: string | number, selectedSize: ProductSize, selectedColor: ProductColor) => void;
  decrementQuantity: (index: number) => void;
  clearBascet: () => void;
  toast: { name: string; image: string; price: number } | null;
  toastId: number;
  clearToast: () => void;
}

const Context = createContext<AppContextType | null>(null);

interface ProviderProps {
  children: ReactNode;
  initialBasket?: BasketItem[];
}

export const AppContextProvider = ({ children, initialBasket = [] }: ProviderProps) => {
  const context = useCreateAppContext(initialBasket);
  return (
    <Context.Provider value={context}>
      {context.toast ? (
        <PageToast
          key={context.toastId}
          name={context.toast.name}
          image={context.toast.image}
          price={context.toast.price}
          onDone={context.clearToast}
        />
      ) : null}
      {children}
    </Context.Provider>
  );
};

export function useAppContext(): AppContextType {
  const context = useContext(Context);
  if (!context) throw new Error('Use app context within provider!');
  return context;
};

export const useCreateAppContext = (props: BasketItem[]): AppContextType => {
  const [bascet, setBascet] = useState<BasketItem[]>(props || []);
  const [toast, setToast] = useState<{ name: string; image: string; price: number } | null>(null);
  const [toastId, setToastId] = useState(0);
 
  const setBascetStore = useCallback((arr: BasketItem[]) => {
    setBascet(arr);
  }, []);

  const addToBascet = useCallback((product: Omit<BasketItem, 'quantity' | 'uniqueId'>) => {
    setBascet(prevBascet => [
      ...prevBascet, 
      { 
        ...product, 
        quantity: 1,  
        uniqueId: Date.now() + Math.random() 
      }
    ]);

    // Если добавили новый товар до окончания таймера — тост перезапустится
    setToast({ name: product.name, image: product.image, price: product.price });
    setToastId(Date.now() + Math.random());
  }, []);

  const removeFromBascet = useCallback((indexOrId: number) => {
    setBascet(prevBascet => 
      prevBascet.filter((_, index) => index !== indexOrId)
    );
  }, []);

  const removeSpecificItem = useCallback((productId: string | number, selectedSize: ProductSize, selectedColor: ProductColor) => {
    setBascet(prevBascet => {
      const indexToRemove = prevBascet.findIndex(
        item => item.id === productId && 
                item.selectedSize.name === selectedSize.name && 
                item.selectedColor.colorCode === selectedColor.colorCode
      );
      
      if (indexToRemove !== -1) {
        return prevBascet.filter((_, index) => index !== indexToRemove);
      }
      return prevBascet;
    });
  }, []);

  const removeAllByParams = useCallback((productId: string | number, selectedSize: ProductSize, selectedColor: ProductColor) => {
    setBascet(prevBascet => 
      prevBascet.filter(item => 
        !(item.id === productId && 
          item.selectedSize.name === selectedSize.name && 
          item.selectedColor.colorCode === selectedColor.colorCode)
      )
    );
  }, []);

  const decrementQuantity = useCallback((index: number) => {
    setBascet(prevBascet => 
      prevBascet.filter((_, i) => i !== index)
    );
  }, []);

  const clearBascet = useCallback(() => {
    setBascet([]);
  }, []);

  const clearToast = useCallback(() => {
    setToast(null);
  }, []);

  return {
    bascet,
    setBascetStore,
    addToBascet,
    removeFromBascet,
    removeSpecificItem,
    removeAllByParams,
    decrementQuantity,
    clearBascet,
    toast,
    toastId,
    clearToast,
  };
};