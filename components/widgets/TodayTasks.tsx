import { mockTasks } from "@/lib/mockData";

export default function TodayTasks() {
  const completed = mockTasks.filter((task) => task.done).length;
  const progress = Math.round((completed / mockTasks.length) * 100);

  return (
    <div className="rounded-xl border border-dew-mint/30 bg-space-800/60 p-4 text-xs text-white/80 shadow-insetPixel transition hover:shadow-glow">
      <div className="flex items-center justify-between">
        <span className="font-arcade text-white">Today Tasks</span>
        <span className="text-dew-mint">{progress}%</span>
      </div>
      <div className="mt-3 h-2 rounded-full bg-space-900/70">
        <div className="h-2 rounded-full bg-dew-mint" style={{ width: `${progress}%` }} />
      </div>
      <ul className="mt-3 space-y-2">
        {mockTasks.map((task) => (
          <li key={task.id} className="flex items-center gap-2">
            <span className="text-dew-mint">{task.done ? "▣" : "▢"}</span>
            <span className={task.done ? "text-white/60 line-through" : "text-white/80"}>{task.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
