import { createHmac, timingSafeEqual, randomUUID } from "crypto";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { upsertMockOrder } from "@/lib/mockOrders";

const SCALEV_WEBHOOK_SIGNING_SECRET = process.env.SCALEV_WEBHOOK_SIGNING_SECRET ?? "";

function verifySignature(rawBody: string, signature: string) {
  if (!SCALEV_WEBHOOK_SIGNING_SECRET) return false;
  const expected = createHmac("sha256", SCALEV_WEBHOOK_SIGNING_SECRET)
    .update(rawBody)
    .digest("base64");

  const expectedBuffer = Buffer.from(expected);
  const signatureBuffer = Buffer.from(signature);
  if (expectedBuffer.length !== signatureBuffer.length) return false;
  return timingSafeEqual(expectedBuffer, signatureBuffer);
}

export async function POST(request: NextRequest) {
  if (!SCALEV_WEBHOOK_SIGNING_SECRET) {
    return NextResponse.json(
      { ok: false, message: "Missing Scalev webhook signing secret." },
      { status: 500 }
    );
  }
  const rawBody = await request.text();
  const signature = request.headers.get("x-scalev-hmac-sha256") ?? "";

  if (!verifySignature(rawBody, signature)) {
    return NextResponse.json({ ok: false, message: "Invalid signature." }, { status: 401 });
  }

  let payload: unknown = {};
  if (rawBody) {
    try {
      payload = JSON.parse(rawBody) as unknown;
    } catch {
      payload = {};
    }
  }
  const data = payload as Record<string, unknown>;
  const status = (data.status ?? data.order_status ?? data.payment_status ?? "unknown") as string;
  const id = (data.order_unique_id ?? data.id ?? data.secret_slug ?? randomUUID()) as string;

  upsertMockOrder(String(id), String(status), data);

  return NextResponse.json({ ok: true });
}
