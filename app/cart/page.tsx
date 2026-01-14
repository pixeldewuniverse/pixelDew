"use client";

import { useState } from "react";
import AppShell from "@/components/AppShell";
import Footer from "@/components/Footer";
import { useCart } from "@/lib/cartContext";

export default function CartPage() {
  const { items, removeItem, updateQty, subtotal, clearCart } = useCart();
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCheckout = async () => {
    if (items.length === 0) {
      setErrorMessage("Your cart is empty.");
      return;
    }
    if (!customerName.trim() || !customerPhone.trim() || !customerEmail.trim()) {
      setErrorMessage("Please complete your contact details before checkout.");
      return;
    }
    setErrorMessage("");
    setIsSubmitting(true);
    const payload = {
      customer_name: customerName,
      customer_phone: customerPhone,
      customer_email: customerEmail,
      items: items.map((item) => ({
        variant_unique_id: item.scalevVariantUniqueId,
        quantity: item.quantity
      }))
    };

    const response = await fetch("/api/scalev/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const data = (await response.json()) as { message?: string };
      setErrorMessage(data.message ?? "Unable to start checkout. Please try again.");
      setIsSubmitting(false);
      return;
    }
    const data = (await response.json()) as { redirectUrl?: string };
    if (data.redirectUrl) {
      clearCart();
      window.location.href = data.redirectUrl;
    }
    setIsSubmitting(false);
  };

  return (
    <AppShell>
      <div className="mx-auto max-w-4xl">
        <h1 className="font-arcade text-lg text-white">Cart</h1>
        <p className="mt-2 text-xs text-white/60">Review your selection before checkout.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <label className="text-[11px] text-white/60">
            Name
            <input
              value={customerName}
              onChange={(event) => setCustomerName(event.target.value)}
              className="mt-2 w-full rounded-md border border-dew-mint/20 bg-space-900/60 px-3 py-2 text-xs text-white/80"
              required
            />
          </label>
          <label className="text-[11px] text-white/60">
            Phone
            <input
              value={customerPhone}
              onChange={(event) => setCustomerPhone(event.target.value)}
              className="mt-2 w-full rounded-md border border-dew-mint/20 bg-space-900/60 px-3 py-2 text-xs text-white/80"
              required
            />
          </label>
          <label className="text-[11px] text-white/60">
            Email
            <input
              type="email"
              value={customerEmail}
              onChange={(event) => setCustomerEmail(event.target.value)}
              className="mt-2 w-full rounded-md border border-dew-mint/20 bg-space-900/60 px-3 py-2 text-xs text-white/80"
              required
            />
          </label>
        </div>
        {errorMessage ? <p className="mt-4 text-xs text-rose-200">{errorMessage}</p> : null}
        <div className="mt-6 space-y-3">
          {items.length === 0 ? (
            <div className="rounded-xl border border-dew-mint/30 bg-space-800/60 p-5 text-xs text-white/60 shadow-insetPixel">
              Your cart is empty.
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-dew-mint/30 bg-space-800/60 p-4 text-xs text-white/70 shadow-insetPixel"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="font-arcade text-white">{item.name}</div>
                    <div className="text-white/60">{item.price}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(event) => updateQty(item.id, Number(event.target.value))}
                      className="w-16 rounded-md border border-white/20 bg-space-900/60 px-2 py-1 text-xs text-white/80"
                    />
                    <button
                      className="rounded-md border border-white/20 px-3 py-2 text-[11px] text-white/60"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="mt-6 text-xs text-white/60">Subtotal: {subtotal.toLocaleString()}k</div>
        <button
          className="cta-button mt-6 rounded-md bg-dew-mint px-4 py-2 text-[11px] font-arcade text-space-900 disabled:cursor-not-allowed disabled:opacity-60"
          onClick={handleCheckout}
          disabled={isSubmitting || items.length === 0}
        >
          {isSubmitting ? "Starting checkout..." : "Checkout Cart"}
        </button>
        <button
          className="mt-3 rounded-md border border-white/20 px-4 py-2 text-[11px] text-white/60"
          onClick={clearCart}
        >
          Clear cart
        </button>
      </div>
      <Footer />
    </AppShell>
  );
}
