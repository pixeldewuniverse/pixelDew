import Link from "next/link";
import AppShell from "@/components/AppShell";
import Footer from "@/components/Footer";

export default function PaymentUnfinishPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-2xl text-center text-xs text-white/70">
        <h1 className="font-arcade text-xl text-neon-cyan">Payment Pending</h1>
        <p className="mt-3">
          Your payment is still processing. You can complete it anytime from the Midtrans popup or try
          again below.
        </p>
        <div className="mt-6 flex flex-col items-center gap-3">
          <Link
            href="/billing"
            className="cta-button rounded-md bg-dew-mint px-4 py-2 text-xs font-arcade text-space-900"
          >
            Return to Billing
          </Link>
          <Link href="/" className="text-[11px] text-white/60">
            Return to Home
          </Link>
        </div>
      </div>
      <Footer />
    </AppShell>
  );
}
