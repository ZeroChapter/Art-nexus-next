"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import "./PhotoCarouselStyle.css";
import { SERVER_URL } from "@/shared/serverConfig";

// КЭШ В ПАМЯТИ: данные не будут запрашиваться повторно при переходе по страницам
let cachedSlides: any[] | null = null;
let isFetching = false;

const DESKTOP_SCROLL_DURATION_MS = 160_000;
const MOBILE_SCROLL_DURATION_MS = 100_000;
const MOBILE_BREAKPOINT = 768;

const wrapTranslate = (x: number, setWidth: number): number => {
  if (setWidth <= 0) return x;
  let t = x;
  while (t <= -setWidth) t += setWidth;
  while (t > 0) t -= setWidth;
  return t;
};

export const PhotoCarousel: React.FC = () => {
  const [slides, setSlides] = useState<any[]>(cachedSlides || []);
  const [isLoading, setIsLoading] = useState<boolean>(!cachedSlides);
  const [translateX, setTranslateX] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const trackRef = useRef<HTMLDivElement>(null);
  const setWidthRef = useRef<number>(0);
  const translateXRef = useRef<number>(0);
  const isHoveredRef = useRef<boolean>(false);
  const isDraggingRef = useRef<boolean>(false);
  const dragRef = useRef({ startX: 0, startT: 0 });
  const rafRef = useRef<number>(0);

  translateXRef.current = translateX;

  // 1. Загрузка данных с кэшированием
  useEffect(() => {
    if (cachedSlides) return;
    if (isFetching) return;

    isFetching = true;
    fetch(`${SERVER_URL}/api/carousel`)
      .then((res) => res.json())
      .then((data) => {
        cachedSlides = data;
        setSlides(data);
        setIsLoading(false);
        isFetching = false;
      })
      .catch((err) => {
        console.error("Ошибка загрузки карусели:", err);
        setIsLoading(false);
        isFetching = false;
      });
  }, []);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);
    setIsMobile(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const updateSetWidth = useCallback(() => {
    const el = trackRef.current;

    if (!el || el.scrollWidth < 2) {
      requestAnimationFrame(updateSetWidth);
      return;
    }
    setWidthRef.current = el.scrollWidth / 2;
  }, []);

  useLayoutEffect(() => {
    if (isLoading || slides.length === 0) return;

    const el = trackRef.current;
    if (!el) return;

    updateSetWidth();
    const ro = new ResizeObserver(() => updateSetWidth());
    ro.observe(el);
    return () => ro.disconnect();
  }, [updateSetWidth, slides.length, isLoading]);

  // 3. Анимация (RequestAnimationFrame)
  useEffect(() => {
    if (isLoading || slides.length === 0) return;

    let last = performance.now();
    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      const w = setWidthRef.current;

      if (w > 0 && !isDraggingRef.current && !isHoveredRef.current) {
        const duration = isMobile
          ? MOBILE_SCROLL_DURATION_MS
          : DESKTOP_SCROLL_DURATION_MS;
        const pxPerMs = w / duration;
        setTranslateX((x) => wrapTranslate(x - pxPerMs * dt, w));
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isMobile, isLoading, slides.length]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== undefined && e.button !== 0) return;
    isDraggingRef.current = true;
    dragRef.current = {
      startX: e.clientX,
      startT: translateXRef.current,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const w = setWidthRef.current;
    const dx = e.clientX - dragRef.current.startX;
    setTranslateX(wrapTranslate(dragRef.current.startT + dx, w));
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (e.currentTarget.hasPointerCapture?.(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    isDraggingRef.current = false;
  };

  if (isLoading) return <div className="carousel-loader">Загрузка...</div>;
  if (slides.length === 0) return null;

  const renderSlides = (setIndex: 0 | 1) =>
    slides.map((slide, idx) => {
      const isAboveFold = setIndex === 0 && idx < 3;
      const alt =
        slide.alt ||
        slide.title ||
        `Коллекция Art Nexus — дизайнерская одежда${slide.id != null ? ` (${slide.id})` : ""}`;
      return (
        <img
          key={`${setIndex}-${slide.id}`}
          src={slide.url}
          alt={alt}
          className="carousel-image"
          draggable={false}
          loading={isAboveFold ? "eager" : "lazy"}
          fetchPriority={isAboveFold ? "high" : "auto"}
          decoding="async"
        />
      );
    });

  return (
    <div
      className="carousel-wrapper"
      onMouseEnter={() => {
        isHoveredRef.current = true;
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false;
      }}
    >
      <div
        ref={trackRef}
        className="carousel-container"
        style={{ transform: `translate3d(${translateX}px, 0, 0)` }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {renderSlides(0)}
        {renderSlides(1)}
      </div>
    </div>
  );
};
