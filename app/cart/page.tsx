"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/AppShell";
import Footer from "@/components/Footer";
import { CartItem, getCart, removeFromCart } from "@/lib/cart";

export default function CartPage() {
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

  return (
    <AppShell>
      <div className="mx-auto max-w-4xl">
        <h1 className="font-arcade text-lg text-white">Cart</h1>
        <p className="mt-2 text-xs text-white/60">Review your selection before checkout.</p>
        <div className="mt-6 space-y-3">
          {items.length === 0 ? (
            <div className="rounded-xl border border-dew-mint/30 bg-space-800/60 p-5 text-xs text-white/60 shadow-insetPixel">
              Your cart is empty.
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.variantUniqueId}
                className="rounded-xl border border-dew-mint/30 bg-space-800/60 p-4 text-xs text-white/70 shadow-insetPixel"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-arcade text-white">{item.name}</div>
                    <div className="text-white/60">{item.price}</div>
                  </div>
                  <button
                    className="rounded-md border border-white/20 px-3 py-2 text-[11px] text-white/60"
                    onClick={() => removeFromCart(item.variantUniqueId)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        <button
          className="cta-button mt-6 rounded-md bg-dew-mint px-4 py-2 text-[11px] font-arcade text-space-900"
          onClick={handleCheckout}
        >
          Checkout Cart
        </button>
      </div>
      <Footer />
    </AppShell>
  );
}
