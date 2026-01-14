export type CartItem = {
  variantUniqueId: string;
  name: string;
  price: string;
  quantity: number;
  checkoutUrl: string;
};

const CART_KEY = "pixeldew-cart";

const isBrowser = () => typeof window !== "undefined";

export const getCart = (): CartItem[] => {
  if (!isBrowser()) return [];
  const raw = window.localStorage.getItem(CART_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as CartItem[];
  } catch {
    return [];
  }
};

export const saveCart = (items: CartItem[]) => {
  if (!isBrowser()) return;
  window.localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent("pixeldew-cart"));
};

export const addToCart = (item: CartItem) => {
  const items = getCart();
  const existing = items.find((entry) => entry.variantUniqueId === item.variantUniqueId);
  if (existing) {
    existing.quantity += item.quantity;
    saveCart([...items]);
    return;
  }
  saveCart([item, ...items]);
};

export const removeFromCart = (variantUniqueId: string) => {
  const items = getCart().filter((item) => item.variantUniqueId !== variantUniqueId);
  saveCart(items);
};

export const clearCart = () => saveCart([]);
