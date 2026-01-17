"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import AppShell from "@/components/AppShell";
import Footer from "@/components/Footer";
import { useCart } from "@/components/cart/CartProvider";
import { products } from "@/lib/products";

export default function ProductDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = typeof params.slug === "string" ? params.slug : params.slug?.[0];
  const product = products.find((item) => item.slug === slug);
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    if (!product) return;
    addItem(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  };

  if (!product) {
    return (
      <AppShell>
        <div className="mx-auto max-w-3xl text-center text-white/70">Product not found.</div>
        <Footer />
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
          <div className="rounded-xl border border-dew-mint/30 bg-space-800/60 p-6 text-xs text-white/70 shadow-insetPixel">
            <div className="text-[10px] uppercase tracking-widest text-white/50">{product.category}</div>
            <h1 className="mt-2 font-arcade text-white">{product.name}</h1>
            <p className="mt-3 text-white/60">{product.description}</p>
            <div className="mt-6 h-48 rounded-lg border border-neon-cyan/30 bg-gradient-to-br from-space-900 via-space-800 to-space-900" />
            <div className="mt-6">
              <h3 className="font-arcade text-white">What you get</h3>
              <ul className="mt-3 space-y-2 text-white/60">
                {product.features.map((feature) => (
                  <li key={feature}>• {feature}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="space-y-4">
            <div className="rounded-xl border border-dew-mint/30 bg-space-800/60 p-6 text-xs text-white/70 shadow-insetPixel">
              <div className="text-white/60">Price</div>
              <div className="mt-2 text-2xl text-dew-mint">{product.price}</div>
              <div className="mt-4 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="rounded-md border border-neon-cyan/40 px-4 py-2 text-center text-[11px] text-neon-cyan"
                >
                  {added ? "Added ✅" : "Add to cart"}
                </button>
                <a
                  href="/billing"
                  className="cta-button block rounded-md bg-dew-mint px-4 py-2 text-center text-[11px] font-arcade text-space-900"
                >
                  Buy now
                </a>
              </div>
            </div>
            <div className="rounded-xl border border-neon-cyan/30 bg-space-800/60 p-6 text-xs text-white/70 shadow-insetPixel">
              <h3 className="font-arcade text-white">Compatibility</h3>
              <ul className="mt-3 space-y-2 text-white/60">
                <li>• Canva</li>
                <li>• Notion</li>
                <li>• Google Sheets</li>
                <li>• PDF</li>
              </ul>
            </div>
            <div className="rounded-xl border border-dew-mint/30 bg-space-800/60 p-6 text-xs text-white/70 shadow-insetPixel">
              <h3 className="font-arcade text-white">License</h3>
              <p className="mt-3 text-white/60">Personal & Commercial license included.</p>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <h2 className="font-arcade text-white">Related products</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products
              .filter((item) => item.slug !== product.slug)
              .slice(0, 3)
              .map((item) => (
                <Link
                  key={item.id}
                  href={`/products/${item.slug}`}
                  className="rounded-xl border border-dew-mint/30 bg-space-800/60 p-4 text-xs text-white/70 shadow-insetPixel"
                >
                  <div className="font-arcade text-white">{item.name}</div>
                  <div className="mt-2 text-white/60">{item.price}</div>
                </Link>
              ))}
          </div>
        </div>
      </div>
      <Footer />
    </AppShell>
  );
}
