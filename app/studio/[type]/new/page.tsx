"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import AppShell from "@/components/AppShell";
import Footer from "@/components/Footer";
import { addProject, Project, ProjectType } from "@/lib/store";

const styles = ["Neon Mint", "Cyan Glow", "Magenta Pulse", "Deep Space"];

export default function StudioWizardPage() {
  const router = useRouter();
  const params = useParams();
  const type = (params.type as ProjectType) || "landing";
  const [brief, setBrief] = useState("");
  const [style, setStyle] = useState(styles[0]);

  const label = useMemo(() => (type === "ebook" ? "Ebook/Workbook" : "Landing Page"), [type]);

  const handleCreate = () => {
    if (!brief.trim()) return;
    const id = `pd-${Date.now()}`;
    const project: Project = {
      id,
      name: `${label} · ${new Date().toLocaleDateString()}`,
      type,
      brief,
      style,
      createdAt: new Date().toISOString(),
      outputs: [],
      ledger: []
    };
    addProject(project);
    router.push(`/studio/${type}/preview?projectId=${id}`);
  };

  return (
    <AppShell>
      <div className="mx-auto max-w-3xl">
        <h1 className="font-arcade text-lg text-white">New {label} Project</h1>
        <p className="mt-2 text-xs text-white/60">Tell PixelDew what to build and pick a style preset.</p>
        <div className="mt-6 rounded-xl border border-dew-mint/30 bg-space-800/60 p-6 text-xs text-white/70 shadow-insetPixel">
          <label className="text-[11px] text-white/60">Project brief</label>
          <textarea
            className="mt-2 min-h-[140px] w-full rounded-md border border-dew-mint/20 bg-space-900/60 p-3 text-xs text-white/80"
            placeholder="Describe your product, target audience, and desired tone..."
            value={brief}
            onChange={(event) => setBrief(event.target.value)}
          />
          <div className="mt-4">
            <div className="text-[11px] text-white/60">Style preset</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {styles.map((preset) => (
                <button
                  key={preset}
                  className={`rounded-md border px-3 py-2 text-[11px] ${
                    preset === style
                      ? "border-dew-mint bg-dew-mint/10 text-dew-mint"
                      : "border-white/20 text-white/70"
                  }`}
                  onClick={() => setStyle(preset)}
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>
          <button
            className="cta-button mt-6 rounded-md bg-dew-mint px-4 py-2 text-xs font-arcade text-space-900"
            onClick={handleCreate}
            aria-label="Create project"
          >
            Continue to Preview
          </button>
        </div>
      </div>
      <Footer />
    </AppShell>
  );
}
