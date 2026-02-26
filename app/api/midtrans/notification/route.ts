import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const serverKey = process.env.MIDTRANS_SERVER_KEY;
    if (!serverKey) {
      return NextResponse.json(
        { error: "Server key not configured" },
        { status: 500 }
      );
    }

    // Validate signature
    const hash = crypto
      .createHash("sha512")
      .update(
        body.order_id +
          body.status_code +
          body.gross_amount +
          serverKey
      )
      .digest("hex");

    if (hash !== body.signature_key) {
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 403 }
      );
    }

    const transactionStatus = body.transaction_status;
    const orderId = body.order_id;

    console.log("Midtrans Webhook:", orderId, transactionStatus);

    // TODO: Update order status in database here

  if (nextStatus) {
    const now = Date.now();
    const existing = orderStore.get(payload.order_id);

    orderStore.set(payload.order_id, {
      order_id: payload.order_id,
      status: nextStatus,
      gross_amount: Number(payload.gross_amount),
      createdAt: existing?.createdAt ?? now,
      updatedAt: now,
      ...(existing ?? {})
    });
  }
}
