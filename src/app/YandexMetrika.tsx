'use client'

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';

declare global {
  interface Window {
    ym: (id: number, method: string, ...args: any[]) => void;
  }
}

interface YandexMetrikaProps {
  counterId: number;
}

export function YandexMetrika({ counterId }: YandexMetrikaProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

 useEffect(() => {
    const paramsString = searchParams ? searchParams.toString() : '';
    const url = pathname + (paramsString ? `?${paramsString}` : '');
    
    if (typeof window !== 'undefined' && window.ym) {
      window.ym(counterId, 'hit', url);
    }
  }, [pathname, searchParams, counterId]);

  return (
    <>
      <Script id="yandex-metrika" strategy="afterInteractive">
        {`
          (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
          m[i].l=1*new Date();
          for (var j = 0; j < document.querySelectorAll('script').length; j++) {if (document.querySelectorAll('script')[j].src === r) { return; }}
          k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
          (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

          ym(${counterId}, "init", {
            clickmap:true,
            trackLinks:true,
            accurateTrackBounce:true,
            webvisor:true
          });
        `}
      </Script>
    </>
  );
}