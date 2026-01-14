const asciiTitle = String.raw`
██████╗ ██╗██╗  ██╗███████╗██╗     ██████╗ ███████╗██╗    ██╗
██╔══██╗██║██║  ██║██╔════╝██║     ██╔══██╗██╔════╝██║    ██║
██████╔╝██║███████║█████╗  ██║     ██║  ██║█████╗  ██║ █╗ ██║
██╔═══╝ ██║██╔══██║██╔══╝  ██║     ██║  ██║██╔══╝  ██║███╗██║
██║     ██║██║  ██║███████╗███████╗██████╔╝███████╗╚███╔███╔╝
╚═╝     ╚═╝╚═╝  ╚═╝╚══════╝╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝
`;

export default function PixelTitle() {
  return (
    <div className="text-center">
      <pre
        className="glow-text animate-shimmer whitespace-pre-wrap text-[clamp(0.5rem,2vw,1.1rem)] font-pixel leading-[1.1] text-dew-mint"
        aria-label="PixelDew ASCII title"
      >
        {asciiTitle}
      </pre>
    </div>
  );
}
