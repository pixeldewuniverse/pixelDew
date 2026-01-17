import { NextResponse } from "next/server";
import { createHash } from "crypto";
import { orderStore } from "@/lib/orderStore";

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
  const isSettled = status === "settlement" || status === "capture";
  const isFailed = ["cancel", "deny", "expire"].includes(status);

  if (isSettled) {
    orderStore.markPaid(payload.order_id);
  } else if (isFailed) {
    orderStore.markFailed(payload.order_id);
  }

  return NextResponse.json({ received: true });
}
