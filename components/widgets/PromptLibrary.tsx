"use client";

import { useState } from "react";
import { mockPrompts } from "@/lib/mockData";

export default function PromptLibrary() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(text);
      setTimeout(() => setCopied(null), 1200);
    } catch (error) {
      console.error("Copy failed", error);
    }
  };

  return (
    <div className="rounded-xl border border-neon-cyan/30 bg-space-800/60 p-4 text-xs text-white/80 shadow-insetPixel transition hover:shadow-glow">
      <div className="flex items-center justify-between">
        <span className="font-arcade text-white">Prompt Library</span>
        <span className="text-[10px] text-white/50">{mockPrompts.length} prompts</span>
      </div>
      <div className="mt-3 space-y-2">
        {mockPrompts.map((prompt) => (
          <div key={prompt} className="flex items-center justify-between gap-2 rounded-md border border-white/10 bg-space-900/60 p-2">
            <span className="text-[11px] text-white/70">{prompt}</span>
            <button
              className="rounded border border-dew-mint/40 px-2 py-1 text-[10px] text-dew-mint hover:border-dew-mint"
              onClick={() => handleCopy(prompt)}
              aria-label={`Copy prompt ${prompt}`}
            >
              {copied === prompt ? "Copied" : "Copy"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
