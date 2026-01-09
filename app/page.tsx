import AppShell from "@/components/AppShell";
import Footer from "@/components/Footer";
import PixelTitle from "@/components/PixelTitle";

export default function HomePage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-4xl text-center">
        <PixelTitle />
        <div className="mt-4 flex flex-col items-center gap-2 text-xs text-white/60 md:text-sm">
          <span className="font-arcade text-neon-cyan">pixeldew.xyz</span>
          <p className="max-w-xl">A pixel-born studio for big ideas.</p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-sm text-white/70 md:text-base">
          PixelDew Build Studio turns briefs into deployable products with credits for drafting, exporting, and
          deploying.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 md:flex-row">
          <a
            href="/studio"
            className="cta-button rounded-md bg-dew-mint px-6 py-3 text-xs font-arcade text-space-900 shadow-glow"
          >
            Start Building
          </a>
          <a
            href="/billing"
            className="rounded-md border border-dew-mint/50 px-6 py-3 text-xs font-arcade text-dew-mint"
          >
            Buy Credits
          </a>
        </div>
      </div>
      <Footer />
    </AppShell>
  );
}
