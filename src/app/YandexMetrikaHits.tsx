"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

declare global {
  interface Window {
    ym?: (id: number, method: string, ...args: unknown[]) => void;
  }
}

interface YandexMetrikaHitsProps {
  counterId: number;
}

export function YandexMetrikaHits({ counterId }: YandexMetrikaHitsProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!counterId || Number.isNaN(counterId)) return;

    const paramsString = searchParams?.toString() ?? "";
    const url = pathname + (paramsString ? `?${paramsString}` : "");

    const sendHit = () => {
      window.ym?.(counterId, "hit", url);
    };

    if (window.ym) {
      sendHit();
      return;
    }

    const onReady = () => {
      sendHit();
      window.removeEventListener("yandex-metrika-ready", onReady);
    };

    window.addEventListener("yandex-metrika-ready", onReady);

    return () => {
      window.removeEventListener("yandex-metrika-ready", onReady);
    };
  }, [pathname, searchParams, counterId]);

  return null;
}
