import AppShell from "@/components/AppShell";
import Footer from "@/components/Footer";
import PixelTitle from "@/components/PixelTitle";

const productTypes = [
  {
    id: "landing",
    title: "Landing Page Builder",
    description: "Export a ready-to-deploy Next.js landing experience."
  },
  {
    id: "ebook",
    title: "Ebook/Workbook Builder",
    description: "Generate a branded PDF workbook with chapters and exercises."
  }
];

export default function StudioPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-5xl">
        <PixelTitle />
        <div className="mt-4 text-center text-xs text-white/60 md:text-sm">
          Pick a product type to start building in PixelDew Build Studio.
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {productTypes.map((product) => (
            <a
              key={product.id}
              href={`/studio/${product.id}/new`}
              className="rounded-xl border border-dew-mint/30 bg-space-800/60 p-6 text-left text-xs text-white/70 shadow-insetPixel transition hover:shadow-glow"
            >
              <h3 className="font-arcade text-white">{product.title}</h3>
              <p className="mt-3 text-white/60">{product.description}</p>
              <span className="mt-6 inline-block text-dew-mint">Start →</span>
            </a>
          ))}
        </div>
      </div>
      <Footer />
    </AppShell>
  );
}
