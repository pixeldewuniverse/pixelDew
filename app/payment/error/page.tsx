import Link from "next/link";
import AppShell from "@/components/AppShell";
import Footer from "@/components/Footer";

export default function PaymentErrorPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-2xl text-center text-xs text-white/70">
        <h1 className="font-arcade text-xl text-purple-300">Payment Error</h1>
        <p className="mt-3">
          Something went wrong while processing the payment. Please try again or reach out for help.
        </p>
        <div className="mt-6 flex flex-col items-center gap-3">
          <Link
            href="/billing"
            className="cta-button rounded-md bg-dew-mint px-4 py-2 text-xs font-arcade text-space-900"
          >
            Try Again
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
