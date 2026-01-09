const bits = [
  { id: "P", top: "12%", left: "8%", color: "text-neon-cyan" },
  { id: "D", top: "18%", left: "72%", color: "text-dew-mint" },
  { id: "W", top: "38%", left: "16%", color: "text-neon-blue" },
  { id: "X", top: "32%", left: "84%", color: "text-neon-magenta" },
  { id: "M", top: "56%", left: "10%", color: "text-dew-green" },
  { id: "N", top: "64%", left: "78%", color: "text-neon-cyan" },
  { id: "Z", top: "72%", left: "32%", color: "text-neon-blue" },
  { id: "Q", top: "10%", left: "42%", color: "text-neon-magenta" }
];

export default function FloatingBits() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {bits.map((bit, index) => (
        <span
          key={bit.id}
          className={`absolute text-xs font-pixel opacity-70 ${bit.color} ${
            index % 2 === 0 ? "animate-float" : "animate-drift"
          }`}
          style={{ top: bit.top, left: bit.left, animationDelay: `${index * 0.6}s` }}
        >
          {bit.id}
        </span>
      ))}
    </div>
  );
}
