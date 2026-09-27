"use client";

import { useCallback, useRef, useState } from "react";

const LOUPE_SIZE = 248;
const LOUPE_ZOOM = 2.75;
const LOUPE_OFFSET = 28;

interface LightboxZoomImageProps {
  src: string;
  alt: string;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  swipeEnabled?: boolean;
}

export function LightboxZoomImage({
  src,
  alt,
  onSwipeLeft,
  onSwipeRight,
  swipeEnabled = true,
}: LightboxZoomImageProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [loupeActive, setLoupeActive] = useState(false);
  const [loupePos, setLoupePos] = useState({ x: 0, y: 0 });
  const [bg, setBg] = useState({ size: "0px 0px", position: "0px 0px" });
  const swipeRef = useRef<{ x: number; y: number } | null>(null);
  const pointerDownRef = useRef(false);

  const hideLoupe = useCallback(() => {
    setLoupeActive(false);
  }, []);

  const updateLoupe = useCallback(
    (clientX: number, clientY: number) => {
      const img = imgRef.current;
      const stage = stageRef.current;
      if (!img || !stage) return;

      const rect = img.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;

      const inside =
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom;

      if (!inside) {
        setLoupeActive(false);
        return;
      }

      const stageRect = stage.getBoundingClientRect();
      const relX = (clientX - rect.left) / rect.width;
      const relY = (clientY - rect.top) / rect.height;

      const bgW = rect.width * LOUPE_ZOOM;
      const bgH = rect.height * LOUPE_ZOOM;
      const bgX = -(relX * bgW - LOUPE_SIZE / 2);
      const bgY = -(relY * bgH - LOUPE_SIZE / 2);

      let lensX = clientX - stageRect.left + LOUPE_OFFSET;
      let lensY = clientY - stageRect.top + LOUPE_OFFSET;

      lensX = Math.min(
        Math.max(lensX, 8),
        stageRect.width - LOUPE_SIZE - 8,
      );
      lensY = Math.min(
        Math.max(lensY, 8),
        stageRect.height - LOUPE_SIZE - 8,
      );

      setLoupePos({ x: lensX, y: lensY });
      setBg({
        size: `${bgW}px ${bgH}px`,
        position: `${bgX}px ${bgY}px`,
      });
      setLoupeActive(true);
    },
    [],
  );

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;

    if (e.pointerType === "mouse") {
      pointerDownRef.current = true;
      updateLoupe(e.clientX, e.clientY);
      stageRef.current?.setPointerCapture(e.pointerId);
      return;
    }

    if (swipeEnabled) {
      swipeRef.current = { x: e.clientX, y: e.clientY };
    }
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse" && pointerDownRef.current) {
      updateLoupe(e.clientX, e.clientY);
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") {
      pointerDownRef.current = false;
      hideLoupe();
      if (stageRef.current?.hasPointerCapture(e.pointerId)) {
        stageRef.current.releasePointerCapture(e.pointerId);
      }
      return;
    }

    const swipe = swipeRef.current;
    swipeRef.current = null;
    if (!swipe || !swipeEnabled) return;

    const dx = e.clientX - swipe.x;
    const dy = e.clientY - swipe.y;
    if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy) * 1.2) return;

    if (dx > 0) onSwipeRight?.();
    else onSwipeLeft?.();
  };

  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    updateLoupe(e.touches[0].clientX, e.touches[0].clientY);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    updateLoupe(e.touches[0].clientX, e.touches[0].clientY);
  };

  const onTouchEnd = () => {
    hideLoupe();
    swipeRef.current = null;
  };

  return (
    <div
      ref={stageRef}
      className="lightbox-loupe-stage"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      role="presentation"
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        draggable={false}
        className="lightbox-loupe-image"
      />

      {loupeActive ? (
        <div
          className="lightbox-loupe-lens"
          style={{
            left: loupePos.x,
            top: loupePos.y,
            width: LOUPE_SIZE,
            height: LOUPE_SIZE,
            backgroundImage: `url(${src})`,
            backgroundSize: bg.size,
            backgroundPosition: bg.position,
          }}
          aria-hidden
        />
      ) : null}
    </div>
  );
}
