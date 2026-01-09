"use client";

const menuItems = [
  "Overview",
  "Projects",
  "Content Calendar",
  "Flow Planner",
  "Prompt Library",
  "Asset Vault",
  "Automations",
  "Settings"
];

export default function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <>
      <div
        className={`fixed inset-0 z-20 bg-black/40 transition md:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={`z-30 h-full w-60 shrink-0 border-r border-dew-mint/20 bg-space-800/40 px-4 py-6 text-xs text-white/80 backdrop-blur md:static md:translate-x-0 ${
          isOpen ? "fixed left-0 top-0 translate-x-0" : "fixed left-0 top-0 -translate-x-full"
        } transition-transform md:h-auto md:w-56`}
      >
        <div className="mb-6 text-[10px] font-arcade text-dew-mint/80">App Overview</div>
        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => (
            <button
              key={item}
              className={`flex items-center gap-2 rounded-md px-3 py-2 text-left transition hover:text-white ${
                item === "Overview"
                  ? "bg-space-900/70 text-white shadow-glow"
                  : "text-white/70"
              }`}
            >
              <span className="text-dew-mint">▣</span>
              {item}
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
}
