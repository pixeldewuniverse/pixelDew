"use client";

import { useState } from "react";
import Script from "next/script";
import { useRouter } from "next/navigation";
import AppShell from "@/components/AppShell";
import Footer from "@/components/Footer";
import { products } from "@/lib/products";

declare global {
  interface Window {
    snap?: {
      pay: (
        token: string,
        callbacks: {
          onSuccess?: () => void;
          onPending?: () => void;
          onError?: () => void;
          onClose?: () => void;
        }
      ) => void;
    };
  }
}

type BillingClientProps = {
  isProduction: boolean;
};

type CustomerForm = {
  name: string;
  email: string;
  phone: string;
};

const parsePrice = (price: string) => {
  const numeric = Number(price.replace(/[^0-9]/g, ""));
  if (price.toLowerCase().includes("k")) {
    return numeric * 1000;
  }
  return numeric;
};

export default function BillingClient({ isProduction }: BillingClientProps) {
  const router = useRouter();
  const [customer, setCustomer] = useState<CustomerForm>({
    name: "",
    email: "",
    phone: ""
  });
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const snapSrc = isProduction
    ? "https://app.midtrans.com/snap/snap.js"
    : "https://app.sandbox.midtrans.com/snap/snap.js";

  const handlePay = async (productId: string) => {
    const product = products.find((item) => item.id === productId);
    if (!product) return;
    setProcessingId(productId);
    setError(null);

    if (!customer.name || !customer.email || !customer.phone) {
      setProcessingId(null);
      setError("Please fill in your name, email, and phone before checkout.");
      return;
    }

    try {
      const response = await fetch("/api/midtrans/snap-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          items: [
            {
              id: product.id,
              name: product.name,
              price: parsePrice(product.price),
              qty: 1
            }
          ],
          customer
        })
      });

      const rawBody = await response.text();
      let data: { ok?: boolean; token?: string; order_id?: string; error?: string; details?: unknown } = {};

      try {
        data = rawBody ? (JSON.parse(rawBody) as typeof data) : {};
      } catch {
        data = {};
      }

      if (!response.ok || !("ok" in data) || !data.ok || !data.token || !data.order_id) {
        throw new Error(
          "error" in data && data.error
            ? data.error
            : `Failed to create payment token. (HTTP ${response.status})`
        );
      }

      if (!window.snap) {
        throw new Error("Payment gateway is not ready yet.");
      }

      window.snap.pay(data.token, {
        onSuccess: () => router.push(`/payment/finish?order_id=${data.order_id}`),
        onPending: () => router.push(`/payment/unfinish?order_id=${data.order_id}`),
        onError: () => router.push(`/payment/error?order_id=${data.order_id}`),
        onClose: () => setProcessingId(null)
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <AppShell>
      <Script
        src={snapSrc}
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
        strategy="afterInteractive"
      />
      <div className="mx-auto max-w-4xl">
        <h1 className="font-arcade text-lg text-white">Buy Products</h1>
        <p className="mt-2 text-xs text-white/60">
          Checkout instantly with Midtrans Snap to unlock PixelDew drops.
        </p>
        <div className="mt-6 grid gap-6 md:grid-cols-[1.2fr_2fr]">
          <div className="rounded-xl border border-dew-mint/30 bg-space-800/60 p-5 text-xs text-white/70 shadow-insetPixel">
            <h2 className="font-arcade text-sm text-white">Customer Details</h2>
            <div className="mt-4 flex flex-col gap-3">
              <label className="text-[11px] text-white/60">
                Name
                <input
                  className="mt-1 w-full rounded-md border border-white/10 bg-space-900/70 px-3 py-2 text-xs text-white"
                  value={customer.name}
                  onChange={(event) =>
                    setCustomer((prev) => ({ ...prev, name: event.target.value }))
                  }
                  placeholder="PixelDew Explorer"
                />
              </label>
              <label className="text-[11px] text-white/60">
                Email
                <input
                  className="mt-1 w-full rounded-md border border-white/10 bg-space-900/70 px-3 py-2 text-xs text-white"
                  value={customer.email}
                  onChange={(event) =>
                    setCustomer((prev) => ({ ...prev, email: event.target.value }))
                  }
                  placeholder="you@pixeldew.xyz"
                  type="email"
                />
              </label>
              <label className="text-[11px] text-white/60">
                Phone
                <input
                  className="mt-1 w-full rounded-md border border-white/10 bg-space-900/70 px-3 py-2 text-xs text-white"
                  value={customer.phone}
                  onChange={(event) =>
                    setCustomer((prev) => ({ ...prev, phone: event.target.value }))
                  }
                  placeholder="+62 812 3456 7890"
                  type="tel"
                />
              </label>
              {error ? <p className="text-[11px] text-rose-200">{error}</p> : null}
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {products.map((product) => (
              <div
                key={product.id}
                className="rounded-xl border border-dew-mint/30 bg-space-800/60 p-5 text-xs text-white/70 shadow-insetPixel"
              >
                <div className="font-arcade text-white">{product.name}</div>
                <div className="mt-3 text-2xl text-dew-mint">{product.price}</div>
                <div className="text-white/60">{product.category}</div>
                <button
                  type="button"
                  className="cta-button mt-4 w-full rounded-md bg-dew-mint px-4 py-2 text-xs font-arcade text-space-900"
                  onClick={() => handlePay(product.id)}
                  disabled={processingId === product.id}
                >
                  {processingId === product.id ? "Processing..." : "Buy now"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </AppShell>
  );
}
