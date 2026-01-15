"use client";

import { useMemo, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import Script from "next/script";
import AppShell from "@/components/AppShell";
import Footer from "@/components/Footer";
import { products } from "@/lib/products";

type CheckoutOption = {
  name: string;
  price: string;
  description: string;
  envKey: string;
};

const checkoutOptions: CheckoutOption[] = [
  {
    name: "Starter Credits",
    price: "149k",
    description: "Perfect for first-time creators.",
    envKey: "NEXT_PUBLIC_LEMON_PRODUCT_URL_STARTER_PACK"
  },
  {
    name: "Builder",
    price: "299k",
    description: "Extra templates + commercial usage.",
    envKey: "NEXT_PUBLIC_LEMON_PRODUCT_URL_CREATOR"
  },
  {
    name: "Pro",
    price: "499k",
    description: "Unlock premium packs + updates.",
    envKey: "NEXT_PUBLIC_LEMON_PRODUCT_URL_PRO"
  },
  {
    name: "Studio",
    price: "899k",
    description: "Full library access for teams.",
    envKey: "NEXT_PUBLIC_LEMON_PRODUCT_URL_STUDIO"
  }
];

type QuickCheckoutForm = {
  name: string;
  phone: string;
  email: string;
};

type CheckoutStatus = {
  loading: boolean;
  error: string | null;
};

export default function CheckoutClient() {
  const searchParams = useSearchParams();
  const productSlug = searchParams.get("product");
  const product = useMemo(
    () => products.find((item) => item.slug === productSlug),
    [productSlug]
  );
  const [form, setForm] = useState<QuickCheckoutForm>({
    name: "",
    phone: "",
    email: ""
  });
  const [status, setStatus] = useState<CheckoutStatus>({ loading: false, error: null });

  const openCheckout = (envKey: string) => {
    const url = process.env[envKey] as string | undefined;
    if (!url) return;
    if (window.LemonSqueezy?.Url?.Open) {
      window.LemonSqueezy.Url.Open(url);
      return;
    }
    window.location.href = url;
  };

  const handleFieldChange = (key: keyof QuickCheckoutForm) => (event: ChangeEvent<HTMLInputElement>) => {
    setForm((current) => ({ ...current, [key]: event.target.value }));
  };

  const handlePayNow = async (event: FormEvent) => {
    event.preventDefault();
    if (!product) return;
    setStatus({ loading: true, error: null });
    try {
      const response = await fetch("/api/scalev/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          customer_name: form.name,
          customer_phone: form.phone,
          customer_email: form.email,
          variant_unique_id: product.scalevVariantUniqueId
        })
      });

      const data = (await response.json()) as { secret_slug?: string; message?: string };
      if (!response.ok) {
        throw new Error(data.message ?? "Checkout failed. Please try again.");
      }
      if (!data.secret_slug) {
        throw new Error("Checkout failed. Missing confirmation.");
      }
      const base = (process.env.NEXT_PUBLIC_SCALEV_PUBLIC_ORDER_BASE ?? "").replace(/\/$/, "");
      if (!base) {
        throw new Error("Missing public order base.");
      }
      window.location.href = `${base}/${data.secret_slug}/success`;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Checkout failed.";
      setStatus({ loading: false, error: message });
      return;
    }
    setStatus({ loading: false, error: null });
  };

  const renderQuickCheckout = () => {
    if (!productSlug) return null;
    if (!product) {
      return (
        <div className="rounded-xl border border-rose-400/40 bg-space-800/60 p-6 text-xs text-rose-200 shadow-insetPixel">
          Product not found.
        </div>
      );
    }

    return (
      <div className="rounded-xl border border-dew-mint/30 bg-space-800/60 p-6 text-xs text-white/70 shadow-insetPixel">
        <div className="flex items-center justify-between">
          <h2 className="font-arcade text-white">Quick Checkout</h2>
          <span className="text-[10px] text-dew-mint">1 item</span>
        </div>
        <div className="mt-4 space-y-3 rounded-lg border border-white/10 bg-space-900/60 p-4">
          <div className="flex items-center justify-between">
            <span className="font-arcade text-white">{product.name}</span>
            <span className="text-dew-mint">{product.price}</span>
          </div>
          <div className="flex items-center justify-between text-[10px] text-white/50">
            <span>Qty</span>
            <span>1</span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-white/70">
            <span>Subtotal</span>
            <span className="text-dew-mint">{product.price}</span>
          </div>
        </div>
        <form className="mt-6 grid gap-3" onSubmit={handlePayNow}>
          <div className="grid gap-2">
            <label className="text-[10px] uppercase tracking-widest text-white/50">Name</label>
            <input
              value={form.name}
              onChange={handleFieldChange("name")}
              required
              className="rounded-md border border-white/10 bg-space-900/60 px-3 py-2 text-xs text-white/80"
              placeholder="Pixeldew buyer"
            />
          </div>
          <div className="grid gap-2">
            <label className="text-[10px] uppercase tracking-widest text-white/50">Phone</label>
            <input
              value={form.phone}
              onChange={handleFieldChange("phone")}
              required
              className="rounded-md border border-white/10 bg-space-900/60 px-3 py-2 text-xs text-white/80"
              placeholder="+62..."
            />
          </div>
          <div className="grid gap-2">
            <label className="text-[10px] uppercase tracking-widest text-white/50">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={handleFieldChange("email")}
              required
              className="rounded-md border border-white/10 bg-space-900/60 px-3 py-2 text-xs text-white/80"
              placeholder="hello@pixeldew.xyz"
            />
          </div>
          {status.error && <div className="text-[11px] text-rose-200">{status.error}</div>}
          <button
            type="submit"
            disabled={status.loading}
            className="cta-button rounded-md bg-dew-mint px-4 py-2 text-[11px] font-arcade text-space-900 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status.loading ? "Processing..." : "Pay now"}
          </button>
        </form>
      </div>
    );
  };

  return (
    <AppShell>
      <Script src="https://app.lemonsqueezy.com/js/lemon.js" strategy="afterInteractive" />
      <div className="mx-auto max-w-5xl">
        <h1 className="font-arcade text-lg text-white">Checkout</h1>
        <p className="mt-2 text-xs text-white/60">Pick a pack or product link to complete your purchase.</p>
        <div className="mt-6 grid gap-6">
          {productSlug ? (
            renderQuickCheckout()
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
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
                    Checkout
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </AppShell>
  );
}
