"use client";

import AppShell from "@/components/AppShell";
import Footer from "@/components/Footer";
import { useCart } from "@/components/cart/CartProvider";

export default function CartPage() {
  const { items, count, updateQuantity, removeItem, clear } = useCart();

  return (
    <AppShell>
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-arcade text-lg text-white">Cart</h1>
            <p className="mt-2 text-xs text-white/60">Review your PixelDew drops before checkout.</p>
          </div>
          {count > 0 && (
            <button
              type="button"
              onClick={clear}
              className="rounded-md border border-rose-400/40 px-3 py-2 text-[10px] text-rose-200"
            >
              Clear
            </button>
          )}
        </div>
        <div className="mt-6 space-y-4">
          {items.length === 0 ? (
            <div className="rounded-xl border border-white/10 bg-space-800/60 p-6 text-xs text-white/60">
              Your cart is empty.
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.slug}
                className="rounded-xl border border-dew-mint/30 bg-space-800/60 p-5 text-xs text-white/70 shadow-insetPixel"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-arcade text-white">{item.name}</div>
                    <div className="mt-1 text-white/60">{item.price}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.slug)}
                    className="text-[10px] text-rose-200"
                  >
                    Remove
                  </button>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/50">Qty</label>
                    <input
                      type="number"
                      min={1}
                      max={99}
                      value={item.quantity}
                      onChange={(event) => updateQuantity(item.slug, Number(event.target.value))}
                      className="w-16 rounded-md border border-white/10 bg-space-900/60 px-2 py-1 text-xs text-white/80"
                    />
                  </div>
                  <div className="text-[11px] text-white/60">Subtotal: {item.price}</div>
                </div>
              </div>
            ))
          )}
        </div>
        {count > 0 && (
          <a
            href="/billing"
            className="cta-button mt-6 inline-flex rounded-md bg-dew-mint px-4 py-2 text-[11px] font-arcade text-space-900"
          >
            Proceed to checkout
          </a>
        )}
      </div>
      <Footer />
    </AppShell>
  );
}
