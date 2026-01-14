"use client";

import { useEffect, useState } from "react";
import { CartItem, getCart, removeFromCart, clearCart } from "@/lib/cart";

export default function CartDrawer() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const update = () => setItems(getCart());
    update();
    window.addEventListener("pixeldew-cart", update);
    return () => window.removeEventListener("pixeldew-cart", update);
  }, []);

  const handleCheckout = async () => {
    if (items.length === 0) return;
    const payload = {
      customer_name: "PixelDew Customer",
      customer_phone: "000000000",
      customer_email: "hello@pixeldew.xyz",
      items: items.map((item) => ({
        variant_unique_id: item.variantUniqueId,
        quantity: item.quantity
      }))
    };

    const response = await fetch("/api/scalev/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) return;
    const data = (await response.json()) as { redirectUrl?: string };
    if (data.redirectUrl) {
      window.location.href = data.redirectUrl;
    }
  };

  const handleItemCheckout = (url?: string) => {
    if (!url || url === "#") return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 hidden md:block">
      <button
        className="cta-button rounded-full border border-dew-mint/40 bg-space-800/80 px-4 py-2 text-xs font-arcade text-dew-mint shadow-glow"
        onClick={() => setOpen((prev) => !prev)}
      >
        Cart ({items.length})
      </button>
      {open && (
        <div className="mt-3 w-72 rounded-xl border border-dew-mint/30 bg-space-800/90 p-4 text-xs text-white/70 shadow-glow">
          <div className="font-arcade text-white">Cart</div>
          <div className="mt-3 space-y-2">
            {items.length === 0 ? (
              <div className="text-white/50">Cart is empty.</div>
            ) : (
              items.map((item) => (
                <div key={item.variantUniqueId} className="flex items-center justify-between gap-2">
                  <div>
                    <div className="text-white">{item.name}</div>
                    <div className="text-[10px] text-white/50">{item.price} · Qty {item.quantity}</div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <button
                      className="rounded border border-white/20 px-2 py-1 text-[10px] text-white/60"
                      onClick={() => removeFromCart(item.variantUniqueId)}
                    >
                      Remove
                    </button>
                    <button
                      className="rounded border border-dew-mint/40 px-2 py-1 text-[10px] text-dew-mint"
                      onClick={() => handleItemCheckout(item.checkoutUrl)}
                    >
                      Buy now
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          <button
            className="cta-button mt-4 w-full rounded-md bg-dew-mint px-3 py-2 text-[11px] font-arcade text-space-900"
            onClick={handleCheckout}
          >
            Checkout Cart
          </button>
          <button
            className="mt-2 w-full rounded-md border border-white/20 px-3 py-2 text-[11px] text-white/60"
            onClick={clearCart}
          >
            Clear cart
          </button>
        </div>
      )}
    </div>
  );
}
