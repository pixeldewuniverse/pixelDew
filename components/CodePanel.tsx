const codeLines = [
  { type: "comment", text: "// Objective: Generate a PixelDew landing experience" },
  { type: "line", text: "class PixelDewAgent {" },
  { type: "line", text: "  constructor(seed: 'dewbit') {}" },
  { type: "line", text: "  async run() {" },
  { type: "string", text: "    await ignite('neon-mint');" },
  { type: "line", text: "    return render('pixel-ui');" },
  { type: "line", text: "  }" },
  { type: "line", text: "}" },
  { type: "line", text: "" },
  { type: "line", text: "new PixelDewAgent().run();" }
];

export default function CodePanel() {
  return (
    <section className="relative mx-auto mt-10 w-full max-w-4xl px-6 pb-16 md:px-12">
      <div className="relative overflow-hidden rounded-xl bg-space-800/70 p-6 md:p-8 pixel-border shadow-insetPixel">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-dew-mint/10 to-transparent animate-shimmer" />
        </div>
        <div className="relative flex flex-col gap-4 md:flex-row">
          <div className="flex h-16 w-16 items-end justify-center md:h-20 md:w-20">
            <svg viewBox="0 0 64 64" className="h-16 w-16" aria-hidden="true">
              <rect x="4" y="4" width="56" height="56" rx="6" fill="#12002B" stroke="#2CFF8F" strokeWidth="2" />
              <rect x="16" y="20" width="10" height="10" fill="#2CFF8F" />
              <rect x="38" y="20" width="10" height="10" fill="#18E6FF" />
              <rect x="20" y="38" width="24" height="8" fill="#FF3BD4" />
            </svg>
          </div>
          <pre className="relative w-full overflow-x-auto text-xs text-white/80 md:text-sm">
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
        </div>
      </div>
    </section>
  );
}
