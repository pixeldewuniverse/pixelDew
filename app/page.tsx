import AsciiHero from "@/components/AsciiHero";
import CodePanel from "@/components/CodePanel";
import CornerCallout from "@/components/CornerCallout";
import FloatingBits from "@/components/FloatingBits";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 noise" />
      <div className="pointer-events-none absolute inset-0 scanlines opacity-40" />
      <FloatingBits />
      <main className="relative z-10">
        <Navbar />
        <AsciiHero />
        <div className="mt-4 flex flex-col items-center gap-2 px-6 text-center text-xs text-white/60 md:text-sm">
          <span className="font-arcade text-neon-cyan">pixeldew.xyz</span>
          <p className="max-w-2xl">
            PixelDew Universe ships autonomous creative tooling that feels like a co-op arcade for your product team.
          </p>
        </div>
        <CodePanel />
        <CornerCallout />
        <Footer />
      </main>
    </div>
  );
}
