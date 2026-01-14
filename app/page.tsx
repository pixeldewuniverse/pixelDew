"use client";

import { useMemo, useState } from "react";
import AppShell from "@/components/AppShell";
import CommandCenterPanel from "@/components/CommandCenterPanel";
import Footer from "@/components/Footer";
import PixelTitle from "@/components/PixelTitle";
import { useCart } from "@/lib/cartContext";
import { products } from "@/lib/products";

const filters = ["All", "Templates", "Planner", "Prompts", "UI Kit"] as const;

const bundles = [
  {
    name: "Starter Pack",
    price: "249k",
    original: "399k",
    items: ["Content Calendar", "Prompt Pack", "Launch checklist"],
    checkoutUrl: process.env.NEXT_PUBLIC_SCALEV_CHECKOUT_STARTER ?? "#"
  },
  {
    name: "Creator Pack",
    price: "299k",
    original: "499k",
    items: ["Planner + UI Kit", "Prompt Pack", "Commercial license"],
    checkoutUrl: process.env.NEXT_PUBLIC_SCALEV_CHECKOUT_STUDIO ?? "#"
  }
];

const testimonials = [
  {
    name: "Alya T.",
    role: "Growth Designer",
    quote: "PixelDew calendars cut our planning time in half. The glow is a bonus."
  },
  {
    name: "Rafi M.",
    role: "Indie Founder",
    quote: "Prompt Pack langsung bikin copy-nya jadi. Praktis dan rapih."
  },
  {
    name: "Nisa K.",
    role: "Product Lead",
    quote: "UI kit-nya langsung klik. Rasanya premium tapi playful."
  }
];

const faqs = [
  {
    question: "Apakah produk ini bisa dipakai tim?",
    answer: "Bisa. Setiap produk punya license personal & commercial sesuai paket yang dipilih."
  },
  {
    question: "Format file apa saja?",
    answer: "Mayoritas produk tersedia dalam format PDF, Notion, atau Figma-ready."
  },
  {
    question: "Ada update gratis?",
    answer: "Iya, untuk produk bundle dan UI kit kami sertakan update periodik."
  },
  {
    question: "Bisa refund?",
    answer: "Untuk file digital, refund tidak tersedia. Tapi kami bantu kalau ada issue akses."
  },
  {
    question: "Checkout pakai apa?",
    answer: "Checkout menggunakan Scalev dengan opsi pembayaran yang fleksibel."
  },
  {
    question: "Bisa request custom?",
    answer: "Bisa, hubungi kami untuk custom pack atau studio collaboration."
  }
];

export default function HomePage() {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("All");
  const { addItem } = useCart();

  const filteredProducts = useMemo(() => {
    if (activeFilter === "All") return products.filter((product) => product.category !== "Bundle");
    return products.filter((product) => product.category === activeFilter);
  }, [activeFilter]);

  return (
    <AppShell>
      <div className="mx-auto max-w-6xl">
        <PixelTitle />
        <div className="mt-4 flex flex-col items-center gap-2 text-center text-xs text-white/60 md:text-sm">
          <span className="font-arcade text-neon-cyan">pixeldew.xyz</span>
          <p className="max-w-xl">A pixel-born studio for big ideas.</p>
        </div>
        <div className="mt-6 text-center text-sm text-white/70 md:text-base">
          Premium digital products for creators, teams, and pixel-obsessed builders.
        </div>
        <CommandCenterPanel />

        <section className="mt-12">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h2 className="font-arcade text-lg text-white">Digital Products</h2>
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-full border px-3 py-1 text-[10px] uppercase tracking-widest transition ${
                    activeFilter === filter
                      ? "border-dew-mint text-dew-mint"
                      : "border-white/20 text-white/60"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="rounded-xl border border-dew-mint/30 bg-space-800/60 p-5 text-xs text-white/70 shadow-insetPixel"
              >
                <div className="flex items-center justify-between">
                  <span className="font-arcade text-white">{product.name}</span>
                  <span className="text-dew-mint">{product.price}</span>
                </div>
                <p className="mt-3 text-white/60">{product.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.badges.map((badge) => (
                    <span
                      key={badge}
                      className="rounded-full border border-neon-cyan/40 px-2 py-1 text-[10px] text-neon-cyan"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex flex-col gap-2">
                  <a
                    href={`/products/${product.slug}`}
                    className="rounded-md border border-dew-mint/40 px-3 py-2 text-center text-[11px] text-dew-mint"
                  >
                    View details
                  </a>
                  <a
                    href={product.scalevCheckoutUrl}
                    className="cta-button rounded-md bg-dew-mint px-3 py-2 text-center text-[11px] font-arcade text-space-900"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Buy now
                  </a>
                  <button
                    className="rounded-md border border-dew-mint/40 px-3 py-2 text-[11px] text-dew-mint"
                    onClick={() =>
                      addItem({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        quantity: 1,
                        scalevVariantUniqueId: product.scalevVariantUniqueId
                      })
                    }
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14 grid gap-6 lg:grid-cols-2">
          {bundles.map((bundle) => (
            <div
              key={bundle.name}
              className="rounded-xl border border-neon-cyan/30 bg-space-800/60 p-6 text-xs text-white/70 shadow-insetPixel"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-arcade text-white">{bundle.name}</h3>
                <div className="text-right">
                  <div className="text-white/40 line-through">{bundle.original}</div>
                  <div className="text-lg text-dew-mint">{bundle.price}</div>
                </div>
              </div>
              <ul className="mt-4 space-y-2 text-white/60">
                {bundle.items.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
              <a
                href={bundle.checkoutUrl}
                className="cta-button mt-4 inline-block rounded-md bg-dew-mint px-4 py-2 text-[11px] font-arcade text-space-900"
                target="_blank"
                rel="noreferrer"
              >
                Get Bundle
              </a>
            </div>
          ))}
        </section>

        <section className="mt-14 grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="rounded-xl border border-dew-mint/30 bg-space-800/60 p-5 text-xs text-white/70 shadow-insetPixel"
            >
              <p className="text-white/60">“{testimonial.quote}”</p>
              <div className="mt-4 text-white">{testimonial.name}</div>
              <div className="text-[10px] text-white/50">{testimonial.role}</div>
            </div>
          ))}
        </section>

        <section className="mt-14 rounded-xl border border-dew-mint/30 bg-space-800/60 p-6 text-xs text-white/70 shadow-insetPixel">
          <h3 className="font-arcade text-white">FAQ</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-lg border border-white/10 bg-space-900/60 p-4">
                <div className="text-white">{faq.question}</div>
                <div className="mt-2 text-white/60">{faq.answer}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </AppShell>
  );
}
