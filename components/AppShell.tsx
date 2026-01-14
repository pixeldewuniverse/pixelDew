"use client";

import { ReactNode, useState } from "react";
import CornerCallout from "@/components/CornerCallout";
import FloatingBits from "@/components/FloatingBits";
import Sidebar from "@/components/Sidebar";
import TopNav from "@/components/TopNav";
import CartDrawer from "@/components/CartDrawer";

export default function AppShell({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 noise" />
      <div className="pointer-events-none absolute inset-0 scanlines opacity-40" />
      <div className="pointer-events-none absolute inset-0 vignette" />
      <FloatingBits />
      <div className="relative z-10 flex min-h-screen flex-col">
        <TopNav onMenuToggle={() => setSidebarOpen((prev) => !prev)} />
        <div className="flex flex-1">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <main className="flex-1 px-6 pb-16 pt-4 md:px-10">{children}</main>
        </div>
        <CornerCallout />
        <CartDrawer />
      </div>
    </div>
  );
}
