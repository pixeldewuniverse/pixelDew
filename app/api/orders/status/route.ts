import { NextResponse } from "next/server";
import { orderStore } from "@/lib/orderStore";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get("order_id");

  if (!orderId) {
    return NextResponse.json({ ok: false, error: "order_id is required" }, { status: 400 });
  }

  const order = orderStore.get(orderId);
  if (!order) {
    return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true, order });
}
