import type { Metadata } from "next";
import "./globals.css";
import CartProvider from "@/components/cart/CartProvider";
import FloatingCartButton from "@/components/cart/FloatingCartButton";
import AdminDebugPanel from "@/components/debug/AdminDebugPanel";

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
    <html lang="en">
      <body className="bg-space-900 text-white antialiased font-body">
        <CartProvider>
          {children}
          <FloatingCartButton />
          <AdminDebugPanel />
        </CartProvider>
      </body>
    </html>
  );
}
