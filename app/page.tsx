"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/AppShell";
import CommandCenterPanel from "@/components/CommandCenterPanel";
import Footer from "@/components/Footer";
import PixelTitle from "@/components/PixelTitle";
import ContentCalendar from "@/components/widgets/ContentCalendar";
import PromptLibrary from "@/components/widgets/PromptLibrary";
import RecentProjects from "@/components/widgets/RecentProjects";
import TodayTasks from "@/components/widgets/TodayTasks";

const quickLogs = [
  "Initializing command stream...",
  "Routing tasks to Flow Planner...",
  "Generating weekly plan...",
  "Run complete ✅"
];

export default function HomePage() {
  const [runId, setRunId] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    if (runId === 0) return;
    let index = 0;
    setLogs([]);
    const interval = setInterval(() => {
      setLogs((prev) => [...prev, quickLogs[index]]);
      index += 1;
      if (index >= quickLogs.length) {
        clearInterval(interval);
      }
    }, 600);

    return () => clearInterval(interval);
  }, [runId]);

  return (
    <AppShell>
      <div className="mx-auto max-w-5xl">
        <PixelTitle />
        <div className="mt-4 flex flex-col items-center gap-2 text-center text-xs text-white/60 md:text-sm">
          <span className="font-arcade text-neon-cyan">pixeldew.xyz</span>
          <p className="max-w-2xl">A pixel-born studio for big ideas.</p>
        </div>
        <div className="mt-6 rounded-xl border border-dew-mint/30 bg-space-800/60 p-4 text-xs text-white/80 shadow-insetPixel">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2 font-arcade text-dew-mint">
              <span className="text-white/60">Command</span>
              <span>&gt;</span>
              <span className="text-white/80">generate weekly plan for PixelDew</span>
            </div>
            <button
              className="cta-button rounded-md bg-dew-mint px-4 py-2 text-xs font-arcade text-space-900 shadow-glow"
              onClick={() => setRunId((prev) => prev + 1)}
              aria-label="Run command"
            >
              Run
            </button>
          </div>
          <div className="mt-3 rounded-md border border-neon-cyan/20 bg-space-900/60 p-3 text-[11px] text-white/70">
            {logs.length === 0 ? "Awaiting command..." : logs.map((log) => <div key={log}>{log}</div>)}
          </div>
        </div>
        <CommandCenterPanel runId={runId} />
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <TodayTasks />
          <ContentCalendar />
          <RecentProjects />
          <PromptLibrary />
        </div>
      </div>
      <Footer />
    </AppShell>
  );
}
