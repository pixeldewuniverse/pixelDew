"use client";

import AppShell from "@/components/AppShell";
import Footer from "@/components/Footer";
import PaymentResultCard from "@/components/payment/PaymentResultCard";

export default function PaymentFinishPage() {
  return (
    <AppShell>
      <PaymentResultCard
        title="Payment Successful"
        friendlyMessage="Thanks for your purchase. We are verifying your Midtrans payment status now."
        expectedState="success"
      />
      <Footer />
    </AppShell>
  );
}
