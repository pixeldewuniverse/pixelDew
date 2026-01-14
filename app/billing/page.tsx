"use client";
import Script from "next/script";
import AppShell from "@/components/AppShell";
import Footer from "@/components/Footer";
import { products } from "@/lib/products";

declare global {
  interface Window {
    LemonSqueezy?: {
      Url?: {
        Open: (url: string) => void;
      };
    };
  }
}

export default function BillingPage() {
  const openCheckout = (url?: string) => {
    if (!url) return;
    if (window.LemonSqueezy?.Url?.Open) {
      window.LemonSqueezy.Url.Open(url);
      return;
    }
    window.location.href = url;
  };
  const getCheckoutUrl = (envKey: string) => (process.env[envKey] as string | undefined) ?? "#";

  return (
    <AppShell>
      <Script src="https://app.lemonsqueezy.com/js/lemon.js" strategy="afterInteractive" />
      <div className="mx-auto max-w-4xl">
        <h1 className="font-arcade text-lg text-white">Buy Products</h1>
        <p className="mt-2 text-xs text-white/60">Checkout instantly with LemonSqueezy.</p>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="rounded-xl border border-dew-mint/30 bg-space-800/60 p-5 text-xs text-white/70 shadow-insetPixel"
            >
              <div className="font-arcade text-white">{product.name}</div>
              <div className="mt-3 text-2xl text-dew-mint">{product.price}</div>
              <div className="text-white/60">{product.category}</div>
              <button
                className="cta-button mt-4 inline-block rounded-md bg-dew-mint px-4 py-2 text-xs font-arcade text-space-900"
                onClick={() => openCheckout(getCheckoutUrl(product.checkoutUrlEnvKey))}
                aria-label={`Buy ${product.name}`}
              >
                Buy now
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </AppShell>
  );
}
