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

const METRIKA_POLL_MS = 100;
const METRIKA_POLL_TIMEOUT_MS = 10_000;

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

    if (typeof window.ym === "function") {
      sendHit();
      return;
    }

    const onReady = () => {
      sendHit();
    };

    window.addEventListener("yandex-metrika-ready", onReady);

    const interval = window.setInterval(() => {
      if (typeof window.ym === "function") {
        sendHit();
        window.clearInterval(interval);
      }
    }, METRIKA_POLL_MS);

    const timeout = window.setTimeout(() => {
      window.clearInterval(interval);
    }, METRIKA_POLL_TIMEOUT_MS);

    return () => {
      window.removeEventListener("yandex-metrika-ready", onReady);
      window.clearInterval(interval);
      window.clearTimeout(timeout);
    };
  }, [pathname, searchParams, counterId]);

  return null;
}
