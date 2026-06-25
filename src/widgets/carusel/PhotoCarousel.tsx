"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import "./PhotoCarouselStyle.css";
import type { CarouselSlide } from "@/entities/carousel/api/getCarousel";

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

interface PhotoCarouselProps {
  initialSlides?: CarouselSlide[];
}

export const PhotoCarousel: React.FC<PhotoCarouselProps> = ({
  initialSlides = [],
}) => {
  const [slides] = useState<CarouselSlide[]>(initialSlides);
  const [translateX, setTranslateX] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isPageVisible, setIsPageVisible] = useState<boolean>(true);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const setWidthRef = useRef<number>(0);
  const translateXRef = useRef<number>(0);
  const isHoveredRef = useRef<boolean>(false);
  const isDraggingRef = useRef<boolean>(false);
  const dragRef = useRef({ startX: 0, startT: 0 });
  const rafRef = useRef<number>(0);

  translateXRef.current = translateX;

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);
    setIsMobile(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const onVisibilityChange = () => {
      setIsPageVisible(document.visibilityState === "visible");
    };
    onVisibilityChange();
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: "100px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const updateSetWidth = useCallback(function measureSetWidth() {
    const el = trackRef.current;

    if (!el || el.scrollWidth < 2) {
      requestAnimationFrame(measureSetWidth);
      return;
    }
    setWidthRef.current = el.scrollWidth / 2;
  }, []);

  useLayoutEffect(() => {
    if (slides.length === 0) return;

    const el = trackRef.current;
    if (!el) return;

    updateSetWidth();
    const ro = new ResizeObserver(() => updateSetWidth());
    ro.observe(el);
    return () => ro.disconnect();
  }, [updateSetWidth, slides.length]);

  useEffect(() => {
    if (slides.length === 0) return;

    let last = performance.now();
    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      const w = setWidthRef.current;
      const shouldAnimate =
        isPageVisible &&
        isVisible &&
        w > 0 &&
        !isDraggingRef.current &&
        !isHoveredRef.current;

      if (shouldAnimate) {
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
  }, [isMobile, isPageVisible, isVisible, slides.length]);

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

  if (slides.length === 0) return null;

  const renderSlides = (setIndex: 0 | 1) =>
    slides.map((slide, idx) => {
      const isAboveFold = setIndex === 0 && idx < 3;
      const alt =
        slide.alt ||
        slide.title ||
        `Коллекция Art Nexus — дизайнерская одежда${slide.id != null ? ` (${slide.id})` : ""}`;
      return (
        <Image
          key={`${setIndex}-${slide.id ?? idx}`}
          src={slide.url}
          alt={alt}
          width={600}
          height={400}
          className="carousel-image"
          draggable={false}
          priority={isAboveFold}
          loading={isAboveFold ? undefined : "lazy"}
          sizes="(max-width: 768px) 100vw, 600px"
        />
      );
    });

  return (
    <div
      ref={wrapperRef}
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
