import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cartContext";

const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start"
});

export const metadata: Metadata = {
  title: "PixelDew Universe",
  description: "PixelDew Universe landing page"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={pressStart.variable}>
      <body className="bg-space-900 text-white antialiased font-body">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
