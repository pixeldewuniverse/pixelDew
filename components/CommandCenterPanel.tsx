"use client";

import { useEffect, useState } from "react";
import { mockRecentRuns } from "@/lib/mockData";

const codeLines = [
  { type: "comment", text: "// Objective: Orchestrate PixelDew command center" },
  { type: "line", text: "class PixelDewCommandCenter {" },
  { type: "line", text: "  connect(stream: 'dewbit') {}" },
  { type: "line", text: "  async execute(command: string) {" },
  { type: "string", text: "    await sync('neon-mint');" },
  { type: "line", text: "    return render('dashboard');" },
  { type: "line", text: "  }" },
  { type: "line", text: "}" },
  { type: "line", text: "" },
  { type: "line", text: "new PixelDewCommandCenter().execute();" }
];

const logSequence = [
  "Booting dewbit kernel...",
  "Syncing neon mint channels...",
  "Mapping project constellation...",
  "Command complete: overview ready ✅"
];

export default function CommandCenterPanel({ runId }: { runId: number }) {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    if (runId === 0) return;
    let index = 0;
    setLogs([]);
    const interval = setInterval(() => {
      setLogs((prev) => [...prev, logSequence[index]]);
      index += 1;
      if (index >= logSequence.length) {
        clearInterval(interval);
      }
    }, 700);

    return () => clearInterval(interval);
  }, [runId]);

  return (
    <section className="relative mt-8 w-full">
      <div className="relative overflow-hidden rounded-xl bg-space-800/70 p-6 md:p-8 pixel-border shadow-insetPixel">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-dew-mint/10 to-transparent animate-shimmer" />
        </div>
        <div className="relative flex flex-col gap-6 md:flex-row md:items-start">
          <div className="flex h-16 w-16 items-end justify-center md:h-20 md:w-20">
            <svg viewBox="0 0 64 64" className="h-16 w-16" aria-hidden="true">
              <rect x="4" y="4" width="56" height="56" rx="6" fill="#12002B" stroke="#2CFF8F" strokeWidth="2" />
              <rect x="16" y="20" width="10" height="10" fill="#2CFF8F" />
              <rect x="38" y="20" width="10" height="10" fill="#18E6FF" />
              <rect x="20" y="38" width="24" height="8" fill="#FF3BD4" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="text-xs font-arcade text-dew-mint/80">Command Center</div>
            <pre className="mt-3 w-full overflow-x-auto text-xs text-white/80 md:text-sm">
              <code>
                {codeLines.map((line, index) => {
                  let className = "text-white/80";
                  if (line.type === "comment") className = "text-dew-green";
                  if (line.type === "string") className = "text-neon-cyan";
                  return (
                    <span key={`${line.text}-${index}`} className={`${className} block`}>
                      {line.text}
                    </span>
                  );
                })}
              </code>
            </pre>
            <div className="mt-4 rounded-lg border border-dew-mint/20 bg-space-900/50 p-3 text-[11px] text-white/70">
              {logs.length === 0 ? "Awaiting next run..." : logs.map((log) => <div key={log}>{log}</div>)}
            </div>
          </div>
          <div className="w-full max-w-xs space-y-4 text-xs text-white/70 md:max-w-[220px]">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-dew-mint/70">Recent Runs</div>
              <ul className="mt-2 space-y-2">
                {mockRecentRuns.map((run) => (
                  <li key={run.id} className="flex items-center justify-between">
                    <span>{run.label}</span>
                    <span className="text-dew-mint">{run.status}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-neon-cyan/30 bg-space-900/60 p-3">
              <div className="text-[10px] uppercase tracking-widest text-neon-cyan/70">Last Output</div>
              <p className="mt-2 text-[11px]">3 new automations queued · 2 assets synced · 1 prompt archived.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
