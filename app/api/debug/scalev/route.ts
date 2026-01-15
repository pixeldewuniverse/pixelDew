import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    scalevApiBase: Boolean(process.env.SCALEV_API_BASE),
    scalevApiKey: Boolean(process.env.SCALEV_API_KEY),
    scalevStoreUniqueId: Boolean(process.env.SCALEV_STORE_UNIQUE_ID),
    scalevPaymentMethod: Boolean(process.env.SCALEV_PAYMENT_METHOD),
    scalevPublicOrderBase: Boolean(process.env.NEXT_PUBLIC_SCALEV_PUBLIC_ORDER_BASE),
    scalevWebhookSigningSecret: Boolean(process.env.SCALEV_WEBHOOK_SIGNING_SECRET)
  });
}
