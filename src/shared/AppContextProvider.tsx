import React, {
  useState,
  useCallback,
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
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

const BASKET_STORAGE_KEY = "art-nexus-basket-v1";

function readBasketFromLocalStorage(): BasketItem[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(BASKET_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return null;
    return parsed as BasketItem[];
  } catch {
    return null;
  }
}

function writeBasketToLocalStorage(items: BasketItem[]) {
  if (typeof window === "undefined") return;
  try {
    if (items.length === 0) {
      window.localStorage.removeItem(BASKET_STORAGE_KEY);
      return;
    }
    window.localStorage.setItem(BASKET_STORAGE_KEY, JSON.stringify(items));
  } catch {
    // ignore quota / privacy mode errors
  }
}

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
  const [bascet, setBascet] = useState<BasketItem[]>(() => props || []);
  const [toast, setToast] = useState<{ name: string; image: string; price: number } | null>(null);
  const [toastId, setToastId] = useState(0);
  const basketPersistReadyRef = useRef(false);
  const basketStorageHydratedRef = useRef(false);
 
  const setBascetStore = useCallback((arr: BasketItem[]) => {
    setBascet(arr);
  }, []);

  useLayoutEffect(() => {
    if (basketStorageHydratedRef.current) return;
    basketStorageHydratedRef.current = true;

    const stored = readBasketFromLocalStorage();
    if (stored && stored.length > 0) {
      const seed = props || [];
      const sameLength = stored.length === seed.length;
      const sameJson = sameLength && JSON.stringify(stored) === JSON.stringify(seed);
      if (!sameJson) {
        queueMicrotask(() => setBascet(stored));
      }
    }

    basketPersistReadyRef.current = true;
  // Intentionally run once on mount: compare against the initial SSR snapshot (`props` from first render),
  // then hydrate from localStorage on the client.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!basketPersistReadyRef.current) return;
    writeBasketToLocalStorage(bascet);
  }, [bascet]);

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