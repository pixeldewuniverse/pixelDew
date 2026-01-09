"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import AppShell from "@/components/AppShell";
import Footer from "@/components/Footer";
import CreditModal from "@/components/CreditModal";
import { creditCosts } from "@/lib/credits";
import { getProject, getStore, updateCredits, updateProject } from "@/lib/store";

const previewCopy = {
  landing: {
    title: "PixelDew Landing Draft",
    body: "A neon-glow landing page with hero, CTA, and product highlights."
  },
  ebook: {
    title: "PixelDew Workbook Draft",
    body: "A 12-page workbook with exercises, checklists, and summaries."
  }
};

export default function StudioPreviewPage() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId") || "";
  const [project, setProject] = useState(() => (projectId ? getProject(projectId) : undefined));
  const [modalOpen, setModalOpen] = useState(false);
  const [missingCredits, setMissingCredits] = useState(0);

  useEffect(() => {
    setProject(projectId ? getProject(projectId) : undefined);
    const handleUpdate = () => setProject(projectId ? getProject(projectId) : undefined);
    window.addEventListener("pixeldew-store", handleUpdate);
    return () => window.removeEventListener("pixeldew-store", handleUpdate);
  }, [projectId]);

  const preview = useMemo(() => {
    if (!project) return previewCopy.landing;
    return project.type === "ebook" ? previewCopy.ebook : previewCopy.landing;
  }, [project]);

  const consumeCredits = (action: string, cost: number, output?: string) => {
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
        outputs: output ? [output, ...current.outputs] : current.outputs,
        ledger: [
          {
            id: `${Date.now()}-${action}`,
            timestamp: new Date().toISOString(),
            action,
            credits: -cost
          },
          ...current.ledger
        ]
      }));
    }
  };

  if (!project) {
    return (
      <AppShell>
        <div className="mx-auto max-w-2xl text-center text-white/70">
          Project not found. Please start a new build in the studio.
        </div>
        <Footer />
      </AppShell>
    );
  }

  return (
    <AppShell>
      <CreditModal open={modalOpen} onClose={() => setModalOpen(false)} missing={missingCredits} />
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="flex-1">
            <div className="rounded-xl border border-dew-mint/30 bg-space-800/60 p-6 text-xs text-white/70 shadow-insetPixel">
              <div className="text-[10px] text-white/50">Preview</div>
              <h2 className="mt-2 font-arcade text-white">{preview.title}</h2>
              <p className="mt-3 text-white/60">{preview.body}</p>
              <div className="mt-6 rounded-lg border border-neon-cyan/30 bg-space-900/60 p-4 text-[11px]">
                <div className="text-neon-cyan">Generated output</div>
                <div className="mt-2 text-white/70">{project.outputs[0] || "No output yet."}</div>
              </div>
            </div>
          </div>
          <div className="w-full max-w-sm">
            <div className="rounded-xl border border-dew-mint/30 bg-space-800/60 p-6 text-xs text-white/70 shadow-insetPixel">
              <div className="font-arcade text-white">Actions</div>
              <div className="mt-4 space-y-2">
                <button
                  className="w-full rounded-md border border-dew-mint/40 px-3 py-2 text-left hover:border-dew-mint"
                  onClick={() => consumeCredits("Generate Draft", creditCosts.generate, "Draft generated")}
                >
                  Generate Draft (-{creditCosts.generate})
                </button>
                <button
                  className="w-full rounded-md border border-dew-mint/40 px-3 py-2 text-left hover:border-dew-mint"
                  onClick={() => consumeCredits("Create Variation", creditCosts.variation, "Variation created")}
                >
                  Create Variation (-{creditCosts.variation})
                </button>
                <button
                  className="w-full rounded-md border border-dew-mint/40 px-3 py-2 text-left hover:border-dew-mint"
                  onClick={() => consumeCredits("Request Revision", creditCosts.revision, "Revision queued")}
                >
                  Request Revision (-{creditCosts.revision})
                </button>
                <button
                  className="w-full rounded-md border border-neon-cyan/40 px-3 py-2 text-left hover:border-neon-cyan"
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
            <div className="mt-4 rounded-xl border border-dew-mint/30 bg-space-800/60 p-4 text-[11px] text-white/70">
              <div className="text-white/60">Latest activity</div>
              <div className="mt-2">{project.ledger[0]?.action || "No actions yet."}</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </AppShell>
  );
}
