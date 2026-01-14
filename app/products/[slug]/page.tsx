import AppShell from "@/components/AppShell";
import Footer from "@/components/Footer";
import { useCart } from "@/lib/cartContext";
import { products } from "@/lib/products";

type PageProps = { params: { slug: string } };

export default function ProductDetailPage({ params }: PageProps) {
  const product = products.find((item) => item.slug === params.slug);
  const { addItem } = useCart();

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
              <a
                href={product.scalevCheckoutUrl}
                className="cta-button mt-4 block rounded-md bg-dew-mint px-4 py-2 text-center text-[11px] font-arcade text-space-900"
                target="_blank"
                rel="noreferrer"
              >
                Buy now
              </a>
              <button
                className="mt-3 w-full rounded-md border border-dew-mint/40 px-4 py-2 text-[11px] text-dew-mint"
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
                <a
                  key={item.id}
                  href={`/products/${item.slug}`}
                  className="rounded-xl border border-dew-mint/30 bg-space-800/60 p-4 text-xs text-white/70 shadow-insetPixel"
                >
                  <div className="font-arcade text-white">{item.name}</div>
                  <div className="mt-2 text-white/60">{item.price}</div>
                </a>
              ))}
          </div>
        </div>
      </div>
      <Footer />
    </AppShell>
  );
}
