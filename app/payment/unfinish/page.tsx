"use client";

import AppShell from "@/components/AppShell";
import Footer from "@/components/Footer";
import PaymentResultCard from "@/components/payment/PaymentResultCard";

export default function PaymentUnfinishPage() {
  return (
    <AppShell>
      <PaymentResultCard
        title="Payment Not Finished"
        friendlyMessage="Your payment flow was not completed yet. Please check your latest order status below."
        expectedState="pending"
      />
      <Footer />
    </AppShell>
  );
}
