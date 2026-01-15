const commandLines = [
  { type: "line", text: "const cart = createCart('neon-mint');" },
  { type: "line", text: "cart.add('Content Calendar');" },
  { type: "string", text: "cart.checkout('scalev');" }
];

export default function CommandCenterPanel() {
  return (
    <div className="mt-8 rounded-xl border border-dew-mint/30 bg-space-800/60 p-5 text-[11px] text-white/70 shadow-insetPixel">
      <div className="text-white/40">command center</div>
      <div className="mt-3 space-y-1 font-mono text-[11px]">
        {commandLines.map((line, index) => (
          <div key={index} className={line.type === "string" ? "text-neon-cyan" : "text-white/70"}>
            {line.text}
          </div>
        ))}
      </div>
    </div>
  );
}
