"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import AppShell from "@/components/AppShell";
import Footer from "@/components/Footer";
import { creditPackages } from "@/lib/credits";
import { getStore, updateCredits } from "@/lib/store";

declare global {
  interface Window {
    LemonSqueezy?: {
      Url?: {
        Open: (url: string, options?: { email?: string; customData?: Record<string, string> }) => void;
      };
    };
  }
}

export default function BillingPage() {
  const [credits, setCredits] = useState(0);
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const update = () => {
      const store = getStore();
      setCredits(store.credits);
      setUserId(store.userId);
      setEmail(store.email);
    };
    update();
    window.addEventListener("pixeldew-store", update);
    return () => window.removeEventListener("pixeldew-store", update);
  }, []);

  const checkoutUrls: Record<string, string | undefined> = {
    LEMON_URL_STARTER: process.env.NEXT_PUBLIC_LEMON_URL_STARTER,
    LEMON_URL_BUILDER: process.env.NEXT_PUBLIC_LEMON_URL_BUILDER,
    LEMON_URL_PRO: process.env.NEXT_PUBLIC_LEMON_URL_PRO,
    LEMON_URL_STUDIO: process.env.NEXT_PUBLIC_LEMON_URL_STUDIO
  };

  const handleCheckout = (url?: string) => {
    if (!url) return;
    if (window.LemonSqueezy?.Url?.Open) {
      window.LemonSqueezy.Url.Open(url, { email, customData: { userId, email } });
      return;
    }
    window.location.href = url;
  };

  return (
    <AppShell>
      <Script src="https://app.lemonsqueezy.com/js/lemon.js" strategy="afterInteractive" />
      <div className="mx-auto max-w-4xl">
        <h1 className="font-arcade text-lg text-white">Buy Credits</h1>
        <p className="mt-2 text-xs text-white/60">Choose a pack to keep your studio running.</p>
        <div className="mt-4 text-xs text-dew-mint">Current balance: {credits} credits</div>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {creditPackages.map((pack) => (
            <div
              key={pack.id}
              className="rounded-xl border border-dew-mint/30 bg-space-800/60 p-5 text-xs text-white/70 shadow-insetPixel"
            >
              <div className="font-arcade text-white">{pack.label}</div>
              <div className="mt-3 text-2xl text-dew-mint">{pack.credits}</div>
              <div className="text-white/60">Credits</div>
              <button
                className="cta-button mt-4 inline-block rounded-md bg-dew-mint px-4 py-2 text-xs font-arcade text-space-900"
                onClick={() => handleCheckout(checkoutUrls[pack.envKey])}
                aria-label={`Buy ${pack.label} credits`}
              >
                Buy {pack.price}
              </button>
            </div>
          ))}
        </div>
        <div className="mt-8 rounded-xl border border-neon-cyan/30 bg-space-800/60 p-5 text-xs text-white/70">
          <div className="font-arcade text-white">Developer Mode</div>
          <p className="mt-2 text-white/60">Use this button to simulate adding credits while building the MVP.</p>
          <button
            className="cta-button mt-4 rounded-md border border-neon-cyan/40 px-4 py-2 text-xs font-arcade text-neon-cyan"
            onClick={() => updateCredits(50)}
          >
            Add 50 Credits
          </button>
        </div>
      </div>
      <Footer />
    </AppShell>
  );
}
