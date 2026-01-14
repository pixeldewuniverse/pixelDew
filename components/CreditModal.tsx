"use client";

export default function CreditModal({
  open,
  onClose,
  missing
}: {
  open: boolean;
  onClose: () => void;
  missing: number;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="w-full max-w-sm rounded-xl border border-dew-mint/40 bg-space-800/90 p-6 text-center text-xs text-white/80 shadow-glow">
        <h3 className="font-arcade text-white">Not enough credits</h3>
        <p className="mt-2 text-white/60">You need {missing} more credits to run this action.</p>
        <div className="mt-4 flex flex-col gap-2">
          <a
            href="/billing"
            className="cta-button rounded-md bg-dew-mint px-4 py-2 text-xs font-arcade text-space-900"
          >
            Buy Credits
          </a>
          <button
            className="rounded-md border border-dew-mint/40 px-4 py-2 text-xs font-arcade text-dew-mint"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
