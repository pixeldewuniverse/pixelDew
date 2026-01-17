import BillingClient from "@/components/BillingClient";

export default function BillingPage() {
  const isProduction = process.env.MIDTRANS_IS_PRODUCTION === "true";

  return <BillingClient isProduction={isProduction} />;
}
