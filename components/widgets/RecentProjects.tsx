import { mockProjects } from "@/lib/mockData";

export default function RecentProjects() {
  return (
    <div className="rounded-xl border border-dew-mint/30 bg-space-800/60 p-4 text-xs text-white/80 shadow-insetPixel transition hover:shadow-glow">
      <div className="font-arcade text-white">Recent Projects</div>
      <div className="mt-3 space-y-3">
        {mockProjects.map((project) => (
          <div key={project.name} className="rounded-md border border-white/10 bg-space-900/60 p-3">
            <div className="flex items-center justify-between text-[11px]">
              <span>{project.name}</span>
              <span className="text-dew-mint">{project.progress}%</span>
            </div>
            <div className="mt-2 h-2 rounded-full bg-space-800">
              <div className="h-2 rounded-full bg-dew-mint" style={{ width: `${project.progress}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
