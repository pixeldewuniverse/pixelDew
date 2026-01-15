import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        space: {
          900: "#12002B",
          800: "#160033"
        },
        dew: {
          mint: "#2CFF8F",
          green: "#22D36B"
        },
        neon: {
          cyan: "#18E6FF",
          blue: "#5B8CFF",
          magenta: "#FF3BD4"
        }
      },
      boxShadow: {
        glow: "0 0 25px rgba(44, 255, 143, 0.45)",
        glowBlue: "0 0 25px rgba(24, 230, 255, 0.45)",
        insetPixel: "inset 0 0 0 1px rgba(255, 255, 255, 0.08), inset 0 0 25px rgba(24, 230, 255, 0.12)"
      },
      fontFamily: {
        pixel: ["var(--font-press-start)", "ui-monospace", "SFMono-Regular", "monospace"],
        body: ["'Megapixel'", "ui-monospace", "SFMono-Regular", "monospace"],
        arcade: ["'Arcade Gamer'", "var(--font-press-start)", "ui-monospace", "SFMono-Regular", "monospace"]
      },
      animation: {
        float: "float 12s ease-in-out infinite",
        drift: "drift 18s ease-in-out infinite",
        shimmer: "shimmer 6s ease-in-out infinite",
        scan: "scan 10s linear infinite",
        cartPop: "cartPop 0.25s ease-out"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" }
        },
        drift: {
          "0%, 100%": { transform: "translate(0px, 0px)" },
          "50%": { transform: "translate(8px, -10px)" }
        },
        shimmer: {
          "0%": { opacity: "0.65" },
          "50%": { opacity: "1" },
          "100%": { opacity: "0.65" }
        },
        scan: {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "0 200%" }
        },
        cartPop: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      }
    }
  },
  plugins: []
};

export default config;
