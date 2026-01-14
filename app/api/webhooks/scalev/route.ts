import { NextResponse } from "next/server";
import { recordOrderEvent } from "@/lib/mockOrders";

const allowedEvents = new Set([
  "order.created",
  "order.payment_status_changed",
  "order.status_changed",
  "order.epayment_created"
]);

export async function POST(request: Request) {
  const payload = await request.json().catch(() => ({}));
  const event = (payload?.event as string) ?? "unknown";

  if (allowedEvents.has(event)) {
    recordOrderEvent(event, payload as Record<string, unknown>);
  }

  return NextResponse.json({ received: true });
}
