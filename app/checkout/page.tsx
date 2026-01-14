"use client";

import Script from "next/script";
import AppShell from "@/components/AppShell";
import Footer from "@/components/Footer";

const checkoutOptions = [
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

export default function CheckoutPage() {
  const openCheckout = (envKey: string) => {
    const url = process.env[envKey] as string | undefined;
    if (!url) return;
    if (window.LemonSqueezy?.Url?.Open) {
      window.LemonSqueezy.Url.Open(url);
      return;
    }
    window.location.href = url;
  };

  return (
    <AppShell>
      <Script src="https://app.lemonsqueezy.com/js/lemon.js" strategy="afterInteractive" />
      <div className="mx-auto max-w-5xl">
        <h1 className="font-arcade text-lg text-white">Checkout</h1>
        <p className="mt-2 text-xs text-white/60">Pick a pack or product link to complete your purchase.</p>
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
                Checkout
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </AppShell>
  );
}
