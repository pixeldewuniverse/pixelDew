import { NextResponse } from "next/server";
import crypto from "crypto";
import { recordOrderEvent } from "@/lib/mockOrders";

const allowedEvents = new Set([
  "order.created",
  "order.payment_status_changed",
  "order.status_changed",
  "order.epayment_created"
]);

const isPaidStatus = (status?: string) => {
  if (!status) return false;
  const normalized = status.toLowerCase();
  return ["paid", "settled", "success"].includes(normalized);
};

export async function POST(request: Request) {
  const secret = process.env.SCALEV_WEBHOOK_SIGNING_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Missing webhook secret" }, { status: 500 });
  }

  const signature = request.headers.get("X-Scalev-Hmac-Sha256") ?? "";
  const rawBody = await request.text();
  const expected = crypto.createHmac("sha256", secret).update(rawBody).digest("base64");

  if (signature !== expected) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const payload = JSON.parse(rawBody) as Record<string, unknown>;
  const event = (payload?.event as string) ?? "unknown";

  if (!allowedEvents.has(event)) {
    return NextResponse.json({ received: true });
  }

  const data = payload?.data as { secret_slug?: string; status?: string } | undefined;
  const secretSlug = data?.secret_slug ?? "unknown";
  const rawStatus = data?.status ?? "unknown";
  const status = isPaidStatus(rawStatus) ? "paid" : rawStatus.toLowerCase() === "created" ? "created" : "unknown";

  recordOrderEvent(secretSlug, payload, status);

  return NextResponse.json({ received: true });
}
