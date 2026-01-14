"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/AppShell";
import Footer from "@/components/Footer";
import { getStore, Project } from "@/lib/store";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const update = () => setProjects(getStore().projects);
    update();
    window.addEventListener("pixeldew-store", update);
    return () => window.removeEventListener("pixeldew-store", update);
  }, []);

  return (
    <AppShell>
      <div className="mx-auto max-w-4xl">
        <h1 className="font-arcade text-lg text-white">Projects</h1>
        <p className="mt-2 text-xs text-white/60">Track every build run inside PixelDew Build Studio.</p>
        <div className="mt-6 space-y-4">
          {projects.length === 0 ? (
            <div className="rounded-xl border border-dew-mint/30 bg-space-800/60 p-6 text-xs text-white/60 shadow-insetPixel">
              No projects yet. Start a build in the studio.
            </div>
          ) : (
            projects.map((project) => (
              <a
                key={project.id}
                href={`/projects/${project.id}`}
                className="flex flex-col gap-2 rounded-xl border border-dew-mint/30 bg-space-800/60 p-5 text-xs text-white/70 shadow-insetPixel transition hover:shadow-glow"
              >
                <div className="font-arcade text-white">{project.name}</div>
                <div className="text-white/60">{project.type.toUpperCase()} · {new Date(project.createdAt).toLocaleDateString()}</div>
                <div className="text-dew-mint">View details →</div>
              </a>
            ))
          )}
        </div>
      </div>
      <Footer />
    </AppShell>
  );
}
