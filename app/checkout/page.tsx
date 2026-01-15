"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import AppShell from "@/components/AppShell";
import Footer from "@/components/Footer";
import { products } from "@/lib/products";

const checkoutOptions = [
  {
    name: "Starter",
    price: "149k",
    description: "Perfect for first-time creators.",
    envKey: "NEXT_PUBLIC_SCALEV_CHECKOUT_STARTER"
  },
  {
    name: "Builder",
    price: "299k",
    description: "Extra templates + commercial usage.",
    envKey: "NEXT_PUBLIC_SCALEV_CHECKOUT_BUILDER"
  },
  {
    name: "Pro",
    price: "499k",
    description: "Unlock premium packs + updates.",
    envKey: "NEXT_PUBLIC_SCALEV_CHECKOUT_PRO"
  },
  {
    name: "Studio",
    price: "899k",
    description: "Full library access for teams.",
    envKey: "NEXT_PUBLIC_SCALEV_CHECKOUT_STUDIO"
  }
];

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const productSlug = searchParams.get("product");
  const product = useMemo(
    () => (productSlug ? products.find((item) => item.slug === productSlug) : null),
    [productSlug]
  );
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openCheckout = (envKey: string) => {
    const url = process.env[envKey] as string | undefined;
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const parsePrice = (price: string) => parseInt(price.replace(/\D/g, ""), 10) || 0;

  const handleQuickCheckout = async () => {
    if (!product) return;
    if (!customerName.trim() || !customerPhone.trim() || !customerEmail.trim()) {
      setErrorMessage("Please complete your contact details before checkout.");
      return;
    }
    setErrorMessage("");
    setIsSubmitting(true);

    const response = await fetch("/api/scalev/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customer_name: customerName,
        customer_phone: customerPhone,
        customer_email: customerEmail,
        payment_method: "invoice",
        items: [
          {
            variant_unique_id: product.scalevVariantUniqueId,
            quantity: 1
          }
        ]
      })
    });

    if (!response.ok) {
      const data = (await response.json()) as { message?: string };
      setErrorMessage(data.message ?? "Unable to start checkout. Please try again.");
      setIsSubmitting(false);
      return;
    }

    const data = (await response.json()) as { redirectUrl?: string };
    if (data.redirectUrl) {
      window.location.href = data.redirectUrl;
    }
    setIsSubmitting(false);
  };

  return (
    <AppShell>
      <div className="mx-auto max-w-5xl">
        <h1 className="font-arcade text-lg text-white">Checkout</h1>
        <p className="mt-2 text-xs text-white/60">Pick a Scalev package to complete your purchase.</p>
        {productSlug ? (
          product ? (
            <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
              <div className="rounded-xl border border-dew-mint/30 bg-space-800/60 p-6 text-xs text-white/70 shadow-insetPixel">
                <div className="text-[10px] uppercase tracking-widest text-white/50">Quick Checkout</div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-arcade text-white">{product.name}</span>
                  <span className="text-dew-mint">{product.price}</span>
                </div>
                <div className="mt-3 text-white/60">Qty: 1</div>
                <div className="mt-4 text-xs text-white/70">
                  Subtotal: {parsePrice(product.price).toLocaleString()}k
                </div>
              </div>
              <div className="rounded-xl border border-dew-mint/30 bg-space-800/60 p-6 text-xs text-white/70 shadow-insetPixel">
                <div className="font-arcade text-white">Customer details</div>
                <div className="mt-4 grid gap-4">
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
                <button
                  className="cta-button mt-5 w-full rounded-md bg-dew-mint px-4 py-2 text-[11px] font-arcade text-space-900 disabled:cursor-not-allowed disabled:opacity-60"
                  onClick={handleQuickCheckout}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Starting checkout..." : "Pay now"}
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-6 rounded-xl border border-rose-300/30 bg-space-800/60 p-6 text-xs text-rose-200 shadow-insetPixel">
              Product not found.
            </div>
          )
        ) : (
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {checkoutOptions.map((option) => (
              <div
                key={option.name}
                className="rounded-xl border border-dew-mint/30 bg-space-800/60 p-6 text-xs text-white/70 shadow-insetPixel"
              >
                <div className="flex items-center justify-between">
                  <span className="font-arcade text-white">{option.name}</span>
                  <span className="text-dew-mint">{option.price}</span>
                </div>
                <p className="mt-3 text-white/60">{option.description}</p>
                <button
                  className="cta-button mt-4 rounded-md bg-dew-mint px-4 py-2 text-[11px] font-arcade text-space-900"
                  onClick={() => openCheckout(option.envKey)}
                >
                  Pay via Scalev
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </AppShell>
  );
}
