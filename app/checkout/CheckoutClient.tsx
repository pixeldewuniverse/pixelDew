"use client";

import { useMemo, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import AppShell from "@/components/AppShell";
import Footer from "@/components/Footer";
import { products } from "@/lib/products";

type QuickCheckoutForm = {
  name: string;
  phone: string;
  email: string;
};

type CheckoutStatus = {
  loading: boolean;
  error: string | null;
};

type CheckoutResponse = {
  ok: boolean;
  secret_slug?: string;
  redirectUrl?: string;
  message?: string;
  error?: string;
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

  const handleFieldChange = (key: keyof QuickCheckoutForm) => (event: ChangeEvent<HTMLInputElement>) => {
    setForm((current) => ({ ...current, [key]: event.target.value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (status.loading) return;
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
          items: [
            {
              quantity: 1,
              variant_unique_id: product.scalevVariantUniqueId
            }
          ]
        })
      });

      const text = await response.text();
      const data = (text ? JSON.parse(text) : {}) as CheckoutResponse;
      if (!response.ok || !data.ok) {
        throw new Error(
          data.message ??
            data.error ??
            "Checkout failed. Please try again."
        );
      }
      if (!data.redirectUrl) {
        throw new Error("Checkout failed. Missing redirect URL.");
      }
      window.location.href = data.redirectUrl;
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
        <form className="mt-6 grid gap-3" onSubmit={handleSubmit}>
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
          <div className="text-[10px] text-white/40">Powered by Scalev</div>
        </form>
      </div>
    );
  };

  return (
    <AppShell>
      <div className="mx-auto max-w-5xl">
        <h1 className="font-arcade text-lg text-white">Checkout</h1>
        <p className="mt-2 text-xs text-white/60">Pick a pack or product link to complete your purchase.</p>
        <div className="mt-6 grid gap-6">
          {productSlug ? (
            renderQuickCheckout()
          ) : (
            <div className="grid gap-4">
              <div className="rounded-xl border border-dew-mint/30 bg-space-800/60 p-5 text-xs text-white/70 shadow-insetPixel">
                <div className="text-white/60">Quick checkout requires a product.</div>
                <div className="mt-2 text-[11px] text-white/50">Choose a product to continue.</div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {products.map((item) => (
                  <Link
                    key={item.id}
                    href={`/checkout?product=${item.slug}`}
                    className="rounded-xl border border-dew-mint/30 bg-space-800/60 p-5 text-xs text-white/70 shadow-insetPixel"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-arcade text-white">{item.name}</span>
                      <span className="text-dew-mint">{item.price}</span>
                    </div>
                    <div className="mt-2 text-white/60">Pay with Scalev</div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </AppShell>
  );
}
