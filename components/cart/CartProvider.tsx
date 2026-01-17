"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { Product } from "@/lib/products";

type CartItem = {
  id: string;
  slug: string;
  name: string;
  price: string;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  addItem: (product: Product) => void;
  removeItem: (slug: string) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "pixeldew-cart";

function normalizeQuantity(quantity: number) {
  if (Number.isNaN(quantity) || quantity < 1) return 1;
  return Math.min(quantity, 99);
}

export default function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return;
    try {
      const parsed = JSON.parse(stored) as CartItem[];
      if (Array.isArray(parsed)) {
        setItems(
          parsed.map((item) => ({
            ...item,
            quantity: normalizeQuantity(item.quantity)
          }))
        );
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((product: Product) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.slug === product.slug);
      if (!existing) {
        return [
          ...prev,
          {
            id: product.id,
            slug: product.slug,
            name: product.name,
            price: product.price,
            quantity: 1
          }
        ];
      }
      return prev.map((item) =>
        item.slug === product.slug
          ? { ...item, quantity: normalizeQuantity(item.quantity + 1) }
          : item
      );
    });
  }, []);

  const removeItem = useCallback((slug: string) => {
    setItems((prev) => prev.filter((item) => item.slug !== slug));
  }, []);

  const updateQuantity = useCallback((slug: string, quantity: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.slug === slug ? { ...item, quantity: normalizeQuantity(quantity) } : item
      )
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const count = useMemo(() => items.reduce((total, item) => total + item.quantity, 0), [items]);

  const value = useMemo(
    () => ({
      items,
      count,
      addItem,
      removeItem,
      updateQuantity,
      clear
    }),
    [items, count, addItem, removeItem, updateQuantity, clear]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}

export type { CartItem };
