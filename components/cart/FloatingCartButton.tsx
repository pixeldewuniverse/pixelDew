"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useCart } from "@/lib/cartContext";

export default function FloatingCartButton() {
  const { items } = useCart();
  const itemCount = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items]
  );

  if (itemCount <= 0) return null;

  return (
    <Link
      href="/cart"
      className="fixed left-4 bottom-4 z-50 flex animate-cartPop items-center gap-3 rounded-full border border-dotted border-dew-mint/70 bg-space-900/80 px-4 py-3 text-[11px] text-white/80 shadow-glow backdrop-blur-md transition hover:shadow-glow"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-dew-mint/40 bg-space-800/70">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-dew-mint"
          aria-hidden="true"
        >
          <circle cx="9" cy="20" r="1" />
          <circle cx="17" cy="20" r="1" />
          <path d="M3 4h2l2.4 12.3a2 2 0 0 0 2 1.7h7.6a2 2 0 0 0 2-1.7L21 8H7" />
        </svg>
      </span>
      <span className="font-arcade text-white">Cart</span>
      <span className="flex h-6 min-w-[24px] items-center justify-center rounded-full bg-dew-mint px-2 text-[10px] font-arcade text-space-900">
        {itemCount}
      </span>
    </Link>
  );
}
