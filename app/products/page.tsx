"use client";

import { useMemo, useState } from "react";
import AppShell from "@/components/AppShell";
import Footer from "@/components/Footer";
import { useCart } from "@/components/cart/CartProvider";
import { products } from "@/lib/products";

const categories = ["All", "Templates", "Planner", "Prompts", "UI Kit", "Bundle"] as const;
const sorts = ["Popular", "New", "Price"] as const;

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [sort, setSort] = useState<(typeof sorts)[number]>("Popular");
  const [addedSlug, setAddedSlug] = useState<string | null>(null);
  const { addItem } = useCart();

  const filtered = useMemo(() => {
    let result = products;
    if (category !== "All") {
      result = result.filter((product) => product.category === category);
    }
    if (search.trim()) {
      const query = search.toLowerCase();
      result = result.filter((product) => product.name.toLowerCase().includes(query));
    }
    if (sort === "Price") {
      result = [...result].sort((a, b) => parseInt(a.price) - parseInt(b.price));
    }
    if (sort === "New") {
      result = [...result].reverse();
    }
    return result;
  }, [search, category, sort]);

  const handleAddToCart = (slug: string) => {
    const product = products.find((item) => item.slug === slug);
    if (!product) return;
    addItem(product);
    setAddedSlug(slug);
    window.setTimeout(() => setAddedSlug((current) => (current === slug ? null : current)), 1400);
  };

  return (
    <AppShell>
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="font-arcade text-lg text-white">Products</h1>
            <p className="mt-2 text-xs text-white/60">Browse every PixelDew digital drop.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`rounded-full border px-3 py-1 text-[10px] uppercase tracking-widest transition ${
                  category === item ? "border-dew-mint text-dew-mint" : "border-white/20 text-white/60"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search products"
            className="w-full rounded-md border border-dew-mint/20 bg-space-900/60 px-3 py-2 text-xs text-white/80 md:max-w-xs"
          />
          <div className="flex gap-2">
            {sorts.map((item) => (
              <button
                key={item}
                onClick={() => setSort(item)}
                className={`rounded-md border px-3 py-2 text-[11px] ${
                  sort === item ? "border-neon-cyan text-neon-cyan" : "border-white/20 text-white/60"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="rounded-xl border border-dew-mint/30 bg-space-800/60 p-5 text-xs text-white/70 shadow-insetPixel"
            >
              <div className="flex items-center justify-between">
                <span className="font-arcade text-white">{product.name}</span>
                <span className="text-dew-mint">{product.price}</span>
              </div>
              <p className="mt-3 text-white/60">{product.description}</p>
              <div className="mt-4 flex flex-col gap-2">
                <a
                  href={`/products/${product.slug}`}
                  className="rounded-md border border-dew-mint/40 px-3 py-2 text-center text-[11px] text-dew-mint"
                >
                  View details
                </a>
                <button
                  type="button"
                  onClick={() => handleAddToCart(product.slug)}
                  className="rounded-md border border-neon-cyan/40 px-3 py-2 text-center text-[11px] text-neon-cyan"
                >
                  {addedSlug === product.slug ? "Added ✅" : "Add to cart"}
                </button>
                <a
                  href={`/products/${product.slug}`}
                  className="cta-button rounded-md bg-dew-mint px-3 py-2 text-center text-[11px] font-arcade text-space-900"
                >
                  Contact to buy
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </AppShell>
  );
}
