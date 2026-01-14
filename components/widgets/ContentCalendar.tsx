import { mockCalendar } from "@/lib/mockData";

export default function ContentCalendar() {
  return (
    <div className="rounded-xl border border-neon-cyan/30 bg-space-800/60 p-4 text-xs text-white/80 shadow-insetPixel transition hover:shadow-glow">
      <div className="font-arcade text-white">Content Calendar</div>
      <div className="mt-3 grid grid-cols-7 gap-2">
        {mockCalendar.map((day) => (
          <div key={day.day} className="rounded-md border border-white/10 bg-space-900/60 p-2 text-center">
            <div className="text-[10px] text-white/60">{day.day}</div>
            <div
              className={`mt-2 rounded-full px-1 text-[9px] ${
                day.status === "Draft"
                  ? "bg-dew-mint/20 text-dew-mint"
                  : day.status === "Scheduled"
                    ? "bg-neon-cyan/20 text-neon-cyan"
                    : "bg-neon-magenta/20 text-neon-magenta"
              }`}
            >
              {day.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
