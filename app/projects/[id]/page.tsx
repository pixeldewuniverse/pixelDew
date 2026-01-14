"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AppShell from "@/components/AppShell";
import CreditModal from "@/components/CreditModal";
import Footer from "@/components/Footer";
import { creditCosts } from "@/lib/credits";
import { getProject, getStore, updateCredits, updateProject } from "@/lib/store";

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params.id as string;
  const [project, setProject] = useState(() => getProject(projectId));
  const [modalOpen, setModalOpen] = useState(false);
  const [missingCredits, setMissingCredits] = useState(0);

  useEffect(() => {
    const update = () => setProject(getProject(projectId));
    update();
    window.addEventListener("pixeldew-store", update);
    return () => window.removeEventListener("pixeldew-store", update);
  }, [projectId]);

  const consumeCredits = (action: string, cost: number, output: string) => {
    const store = getStore();
    if (store.credits < cost) {
      setMissingCredits(cost - store.credits);
      setModalOpen(true);
      return;
    }
    updateCredits(-cost);
    if (project) {
      updateProject(project.id, (current) => ({
        ...current,
        outputs: [output, ...current.outputs],
        ledger: [
          { id: `${Date.now()}-${action}`, timestamp: new Date().toISOString(), action, credits: -cost },
          ...current.ledger
        ]
      }));
    }
  };

  if (!project) {
    return (
      <AppShell>
        <div className="mx-auto max-w-2xl text-center text-white/70">Project not found.</div>
        <Footer />
      </AppShell>
    );
  }

  return (
    <AppShell>
      <CreditModal open={modalOpen} onClose={() => setModalOpen(false)} missing={missingCredits} />
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="flex-1 rounded-xl border border-dew-mint/30 bg-space-800/60 p-6 text-xs text-white/70 shadow-insetPixel">
            <div className="font-arcade text-white">{project.name}</div>
            <p className="mt-2 text-white/60">{project.brief}</p>
            <div className="mt-4 text-[11px] text-white/50">Style: {project.style}</div>
            <div className="mt-6 rounded-lg border border-neon-cyan/30 bg-space-900/60 p-4">
              <div className="text-neon-cyan">Latest output</div>
              <div className="mt-2 text-white/70">{project.outputs[0] || "No output generated."}</div>
            </div>
          </div>
          <div className="w-full max-w-sm space-y-4">
            <div className="rounded-xl border border-dew-mint/30 bg-space-800/60 p-5 text-xs text-white/70 shadow-insetPixel">
              <div className="font-arcade text-white">Export Actions</div>
              <div className="mt-3 space-y-2">
                <button
                  className="w-full rounded-md border border-dew-mint/40 px-3 py-2 text-left hover:border-dew-mint"
                  onClick={() =>
                    consumeCredits(
                      project.type === "ebook" ? "Export PDF" : "Export ZIP",
                      creditCosts.export,
                      project.type === "ebook" ? "PDF export ready" : "ZIP export ready"
                    )
                  }
                >
                  Export {project.type === "ebook" ? "PDF" : "ZIP"} (-{creditCosts.export})
                </button>
                <button
                  className="w-full rounded-md border border-neon-magenta/40 px-3 py-2 text-left hover:border-neon-magenta"
                  onClick={() => consumeCredits("Deploy", creditCosts.deploy, "Deploy scheduled")}
                >
                  Deploy (-{creditCosts.deploy})
                </button>
                <button
                  className="w-full rounded-md border border-dew-mint/40 px-3 py-2 text-left hover:border-dew-mint"
                  onClick={() => consumeCredits("Commercial License", creditCosts.license, "License unlocked")}
                >
                  Commercial License (-{creditCosts.license})
                </button>
              </div>
            </div>
            <div className="rounded-xl border border-dew-mint/30 bg-space-800/60 p-5 text-[11px] text-white/70 shadow-insetPixel">
              <div className="text-white">Credit Ledger</div>
              <div className="mt-3 space-y-2">
                {project.ledger.length === 0 ? (
                  <div className="text-white/50">No credit usage yet.</div>
                ) : (
                  project.ledger.map((entry) => (
                    <div key={entry.id} className="flex flex-col gap-1 border-b border-white/5 pb-2">
                      <div className="flex items-center justify-between">
                        <span>{entry.action}</span>
                        <span className="text-dew-mint">{entry.credits}</span>
                      </div>
                      <span className="text-[10px] text-white/50">
                        {new Date(entry.timestamp).toLocaleString()}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </AppShell>
  );
}
