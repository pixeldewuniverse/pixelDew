\"use client\";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from \"react\";

export type CartItem = {
  id: string;
  name: string;
  price: string;
  quantity: number;
  scalevVariantUniqueId: string;
};

type CartContextValue = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  subtotal: number;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);
const CART_KEY = \"pixeldew-cart\";

const parsePrice = (price: string) => parseInt(price.replace(/\\D/g, \"\"), 10) || 0;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    if (typeof window === \"undefined\") return;
    const stored = window.localStorage.getItem(CART_KEY);
    if (stored) {
      try {
        setItems(JSON.parse(stored) as CartItem[]);
      } catch {
        setItems([]);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === \"undefined\") return;
    window.localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((item: CartItem) => {
    setItems((prev) => {
      const existing = prev.find((entry) => entry.id === item.id);
      if (existing) {
        return prev.map((entry) =>
          entry.id === item.id ? { ...entry, quantity: entry.quantity + item.quantity } : entry
        );
      }
      return [item, ...prev];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const updateQty = useCallback((id: string, qty: number) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: Math.max(qty, 1) } : item))
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const subtotal = useMemo(() => {
    return items.reduce((total, item) => total + parsePrice(item.price) * item.quantity, 0);
  }, [items]);

  const value = useMemo(
    () => ({ items, addItem, removeItem, updateQty, clearCart, subtotal }),
    [items, addItem, removeItem, updateQty, clearCart, subtotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error(\"useCart must be used within CartProvider\");
  }
  return context;
};
