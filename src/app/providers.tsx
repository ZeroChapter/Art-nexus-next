'use client';

import { AppContextProvider } from '@/shared/AppContextProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppContextProvider initialBasket={[]}>
      {children}
    </AppContextProvider>
  );
}
