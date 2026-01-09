const asciiArt = String.raw`
██████╗ ██╗██╗  ██╗███████╗██╗     ██████╗ ███████╗██╗    ██╗
██╔══██╗██║██║  ██║██╔════╝██║     ██╔══██╗██╔════╝██║    ██║
██████╔╝██║███████║█████╗  ██║     ██║  ██║█████╗  ██║ █╗ ██║
██╔═══╝ ██║██╔══██║██╔══╝  ██║     ██║  ██║██╔══╝  ██║███╗██║
██║     ██║██║  ██║███████╗███████╗██████╔╝███████╗╚███╔███╔╝
╚═╝     ╚═╝╚═╝  ╚═╝╚══════╝╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝
`;

export default function AsciiHero() {
  return (
    <section className="relative flex flex-col items-center gap-6 px-6 pt-6 text-center md:px-12">
      <pre
        className="glow-text animate-shimmer whitespace-pre-wrap text-[clamp(0.55rem,2vw,1.1rem)] font-pixel leading-[1.1] text-dew-mint"
        aria-label="PixelDew ASCII art"
      >
        {asciiArt}
        <span className="blink text-neon-cyan">█</span>
      </pre>
      <p className="max-w-xl text-sm text-white/70 md:text-base">
        A pixel-born studio for big ideas.
      </p>
    </section>
  );
}
