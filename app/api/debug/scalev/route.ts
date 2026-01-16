import { NextResponse } from "next/server";

export function GET() {
  const status = {
    scalevApiBase: Boolean(process.env.SCALEV_API_BASE),
    scalevApiKey: Boolean(process.env.SCALEV_API_KEY),
    scalevStoreUniqueId: Boolean(process.env.SCALEV_STORE_UNIQUE_ID),
    scalevPaymentMethod: Boolean(process.env.SCALEV_PAYMENT_METHOD),
    scalevPublicOrderBase: Boolean(process.env.NEXT_PUBLIC_SCALEV_PUBLIC_ORDER_BASE),
    scalevWebhookSigningSecret: Boolean(process.env.SCALEV_WEBHOOK_SIGNING_SECRET)
  };
  const missing = [
    !status.scalevApiBase ? "SCALEV_API_BASE" : null,
    !status.scalevApiKey ? "SCALEV_API_KEY" : null,
    !status.scalevStoreUniqueId ? "SCALEV_STORE_UNIQUE_ID" : null,
    !status.scalevPaymentMethod ? "SCALEV_PAYMENT_METHOD" : null,
    !status.scalevPublicOrderBase ? "NEXT_PUBLIC_SCALEV_PUBLIC_ORDER_BASE" : null
  ].filter(Boolean);

  return NextResponse.json({ ...status, missing });
}
