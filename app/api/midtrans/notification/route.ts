import { NextResponse } from "next/server";
import { createHash } from "crypto";
import { orderStore, type OrderStatus } from "@/lib/orderStore";

type MidtransNotification = {
  order_id: string;
  status_code: string;
  gross_amount: string;
  signature_key: string;
  transaction_status: string;
  fraud_status?: string;
};

const verifySignature = (payload: MidtransNotification, serverKey: string) => {
  const rawSignature = `${payload.order_id}${payload.status_code}${payload.gross_amount}${serverKey}`;
  const expected = createHash("sha512").update(rawSignature).digest("hex");
  return expected === payload.signature_key;
};

export async function POST(request: Request) {
  const serverKey = process.env.MIDTRANS_SERVER_KEY;
  if (!serverKey) {
    return NextResponse.json({ error: "Server key not configured" }, { status: 500 });
  }

  const payload = (await request.json()) as MidtransNotification;

  if (!verifySignature(payload, serverKey)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const status = payload.transaction_status;
  let nextStatus: OrderStatus | null = null;

  if (status === "settlement" || status === "capture") {
    nextStatus = "PAID";
  } else if (status === "pending") {
    nextStatus = "PENDING";
  } else if (["deny", "cancel", "expire", "failure"].includes(status)) {
    nextStatus = "FAILED";
  }

  if (nextStatus) {
    const order = orderStore.get(payload.order_id);
    if (order) {
      orderStore.set(payload.order_id, {
        ...order,
        status: nextStatus,
        updatedAt: Date.now()
      });
    }
  }

  return NextResponse.json({ ok: true });
}
