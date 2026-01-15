"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/cart/CartProvider";

export default function FloatingCartButton() {
  const router = useRouter();
  const { count } = useCart();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (count > 0) {
      const frame = window.requestAnimationFrame(() => setVisible(true));
      return () => window.cancelAnimationFrame(frame);
    }
    setVisible(false);
  }, [count]);

  if (count === 0) return null;

  return (
    <button
      type="button"
      onClick={() => router.push("/cart")}
      className={`fixed left-4 bottom-4 z-50 flex items-center gap-2 rounded-full border border-dotted border-dew-mint/60 bg-space-900/80 px-4 py-2 text-[11px] font-arcade text-white shadow-[0_0_12px_rgba(138,255,227,0.25)] backdrop-blur transition-all duration-200 hover:shadow-[0_0_18px_rgba(138,255,227,0.45)] ${
        visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
      }`}
      aria-label="Open cart"
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-full border border-dew-mint/40 bg-space-800/70">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M6 6h14l-2 9H8L6 6Z" />
          <path d="M6 6L4 3H2" />
          <path d="M9 19a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
          <path d="M17 19a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
        </svg>
      </span>
      <span>Cart</span>
      <span className="flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-dew-mint px-1 text-[10px] text-space-900">
        {count}
      </span>
    </button>
  );
}
