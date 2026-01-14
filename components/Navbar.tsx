export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-5 md:px-12">
      <div className="flex items-center gap-3 text-xs font-arcade tracking-wider text-dew-mint">
        <span className="grid h-8 w-8 place-items-center rounded-sm border border-dew-mint/40 bg-space-800/60 shadow-glow">
          <svg
            aria-hidden="true"
            viewBox="0 0 32 32"
            className="h-5 w-5"
            fill="none"
          >
            <rect x="2" y="2" width="12" height="12" fill="#2CFF8F" />
            <rect x="18" y="2" width="12" height="12" fill="#18E6FF" />
            <rect x="2" y="18" width="12" height="12" fill="#5B8CFF" />
            <rect x="18" y="18" width="12" height="12" fill="#FF3BD4" />
          </svg>
        </span>
        <span>PixelDew</span>
      </div>
      <div className="flex items-center gap-3">
        <button
          className="rounded-md border border-dew-mint/50 px-4 py-2 text-xs font-arcade text-dew-mint transition hover:border-dew-mint hover:text-white"
          aria-label="View PixelDew plans"
        >
          Plans
        </button>
        <button
          className="cta-button rounded-md bg-dew-mint px-4 py-2 text-xs font-arcade text-space-900 shadow-glow"
          aria-label="Try PixelDew"
        >
          Try PixelDew
        </button>
      </div>
    </nav>
  );
}
