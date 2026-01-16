"use client";

import Link from "next/link";
import AppShell from "@/components/AppShell";
import Footer from "@/components/Footer";
import { products } from "@/lib/products";

export default function BillingPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-4xl">
        <h1 className="font-arcade text-lg text-white">Buy Products</h1>
        <p className="mt-2 text-xs text-white/60">Checkout instantly with Scalev.</p>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="rounded-xl border border-dew-mint/30 bg-space-800/60 p-5 text-xs text-white/70 shadow-insetPixel"
            >
              <div className="font-arcade text-white">{product.name}</div>
              <div className="mt-3 text-2xl text-dew-mint">{product.price}</div>
              <div className="text-white/60">{product.category}</div>
              <Link
                href={`/checkout?product=${product.slug}`}
                className="cta-button mt-4 inline-block rounded-md bg-dew-mint px-4 py-2 text-xs font-arcade text-space-900"
                aria-label={`Buy ${product.name}`}
              >
                Buy now
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </AppShell>
  );
}
