'use client';

import { AppContextProvider } from '@/shared/AppContextProvider'; // поправьте путь под ваш проект
import { DynamicComponentProvider } from '@/entities/ComponentContext'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppContextProvider initialBasket={[]}>
      <DynamicComponentProvider>
        {children}
      </DynamicComponentProvider>
    </AppContextProvider>
  );
}