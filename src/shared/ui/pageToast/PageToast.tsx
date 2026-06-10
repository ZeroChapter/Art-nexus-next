import "./PageToast.css";
import { useFormatPrice } from "@/entities/hooks/useFormatPrice";
import React, { useEffect, useMemo, useRef, useState } from "react";

interface PageToastProps {
  name: string;
  image: string;
  price: number;
  durationMs?: number;
  onDone?: () => void;
}

export const PageToast = ({
  name,
  image,
  price,
  durationMs = 3000,
  onDone,
}: PageToastProps) => {
  const formatPrice = useFormatPrice();
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(true);
  const timerRef = useRef<number | null>(null);

  const formattedPrice = useMemo(
    () => formatPrice(price),
    [formatPrice, price],
  );

  const clearTimer = () => {
    if (timerRef.current != null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const startTimer = () => {
    clearTimer();
    timerRef.current = window.setTimeout(() => {
      setIsOpen(false);
      window.setTimeout(() => {
        setIsMounted(false);
        onDone?.();
      }, 320);
    }, durationMs);
  };

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setIsOpen(true));
    startTimer();
    return () => {
      window.cancelAnimationFrame(id);
      clearTimer();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isMounted) return null;

  return (
    <div
      className={`page-toast ${isOpen ? "page-toast_open" : ""}`}
      onMouseEnter={() => clearTimer()}
      onMouseLeave={() => startTimer()}
      onTouchStart={() => startTimer()}
    >
      <div className="page-toast-content">
        <img src={image} alt={name} className="page-toast-content_image" />
        <div className="page-toast-content_text">
          <div className="toast-basket-icon-container">
            <img
              src="/basketWhite.svg"
              alt=""
              className="toast-basket-icon"
              aria-hidden="true"
            />
            <p className="toast-basket-icon-text">Добавлено в корзину</p>
          </div>
          <p className="toast-basket-icon-name">{name}</p>
          <p className="toast-basket-icon-price">{formattedPrice}</p>
        </div>
      </div>
    </div>
  );
};
