export default function CommandCenterPanel() {
  const codeLines = [
    { type: "comment", text: "// Objective: Launch the PixelDew digital shop" },
    { type: "line", text: "const cart = createCart('neon-mint');" },
    { type: "line", text: "cart.add('Content Calendar');" },
    { type: "string", text: "cart.checkout('lemonsqueezy');" }
  ];

  return (
    <section className="relative mt-10 w-full">
      <div className="relative overflow-hidden rounded-xl bg-space-800/70 p-6 md:p-8 pixel-border shadow-insetPixel">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-dew-mint/10 to-transparent animate-shimmer" />
        </div>
        <div className="relative">
          <div className="text-xs font-arcade text-dew-mint/80">Command Panel</div>
          <pre className="mt-3 w-full overflow-x-auto text-xs text-white/80 md:text-sm">
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
