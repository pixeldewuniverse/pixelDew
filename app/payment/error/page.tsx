"use client";

import AppShell from "@/components/AppShell";
import Footer from "@/components/Footer";
import PaymentResultCard from "@/components/payment/PaymentResultCard";

export default function PaymentErrorPage() {
  return (
    <AppShell>
      <PaymentResultCard
        title="Payment Error"
        friendlyMessage="Something went wrong during payment. Please check your verified order status below."
        expectedState="error"
      />
      <Footer />
    </AppShell>
  );
}
