"use client";

import { useState } from "react";

const newMenuItems = ["New Project", "New Prompt", "Upload Asset"];

export default function TopNav({ onMenuToggle }: { onMenuToggle: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between px-6 py-5 md:px-10">
      <div className="flex items-center gap-3 text-xs font-arcade tracking-wider text-dew-mint">
        <span className="grid h-8 w-8 place-items-center rounded-sm border border-dew-mint/40 bg-space-800/60 shadow-glow">
          <svg aria-hidden="true" viewBox="0 0 32 32" className="h-5 w-5" fill="none">
            <rect x="2" y="2" width="12" height="12" fill="#2CFF8F" />
            <rect x="18" y="2" width="12" height="12" fill="#18E6FF" />
            <rect x="2" y="18" width="12" height="12" fill="#5B8CFF" />
            <rect x="18" y="18" width="12" height="12" fill="#FF3BD4" />
          </svg>
        </span>
        <span>PixelDew</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative hidden md:block">
          <button
            className="rounded-md border border-dew-mint/40 px-3 py-2 text-xs font-arcade text-dew-mint transition hover:border-dew-mint hover:text-white"
            aria-label="Create new"
            onClick={() => setMenuOpen((open) => !open)}
          >
            New ▾
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-44 rounded-md border border-dew-mint/30 bg-space-800/90 p-2 text-xs text-white shadow-glow">
              {newMenuItems.map((item) => (
                <button
                  key={item}
                  className="w-full rounded px-2 py-2 text-left hover:bg-space-900/70"
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
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
        <button
          className="flex h-9 w-9 items-center justify-center rounded-md border border-dew-mint/40 text-dew-mint md:hidden"
          onClick={onMenuToggle}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>
    </nav>
  );
}
