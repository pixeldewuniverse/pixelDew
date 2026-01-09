export default function CornerCallout() {
  return (
    <aside className="static mt-6 w-full px-6 md:fixed md:bottom-6 md:right-6 md:mt-0 md:w-64">
      <div className="pixel-border rounded-lg bg-space-800/80 p-4 text-xs text-white/80 shadow-glow">
        <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-sm border border-neon-cyan/60 bg-space-900 text-lg">
          :)
        </div>
        <p className="font-arcade">
          PixelDew builds the <span className="border-b border-dew-mint">bits</span> you don&apos;t want to build.
        </p>
      </div>
    </aside>
  );
}
