import { NextResponse } from "next/server";
import Midtrans from "midtrans-client";
import { orderStore, type Order } from "@/lib/orderStore";

type SnapRequestBody = {
  items: Array<{
    id: string;
    name: string;
    price: number;
    qty: number;
  }>;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
};

const getSnapClient = () => {
  const serverKey = process.env.MIDTRANS_SERVER_KEY;
  const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY;
  if (!serverKey) {
    throw new Error("MIDTRANS_SERVER_KEY is not set");
  }

  return new Midtrans.Snap({
    isProduction: process.env.MIDTRANS_IS_PRODUCTION === "true",
    serverKey,
    clientKey
  });
};

const calculateGrossAmount = (items: SnapRequestBody["items"]) =>
  items.reduce((total, item) => total + item.price * item.qty, 0);

const isValidItem = (item: SnapRequestBody["items"][number]) =>
  typeof item.id === "string" &&
  typeof item.name === "string" &&
  Number.isFinite(item.price) &&
  Number.isFinite(item.qty) &&
  item.price > 0 &&
  item.qty > 0;

export async function POST(request: Request) {
  const body = (await request.json()) as SnapRequestBody;

  const hasValidCustomer =
    body?.customer &&
    typeof body.customer.name === "string" &&
    typeof body.customer.email === "string" &&
    typeof body.customer.phone === "string";

  if (!body?.items?.length || !body.items.every(isValidItem) || !hasValidCustomer) {
    return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
  }

  const orderId = `PD-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const grossAmount = calculateGrossAmount(body.items);

  if (!Number.isFinite(grossAmount) || grossAmount <= 0) {
    return NextResponse.json({ error: "Invalid gross amount" }, { status: 400 });
  }

  const snap = getSnapClient();

  const transaction = await snap.createTransaction({
    transaction_details: {
      order_id: orderId,
      gross_amount: grossAmount
    },
    item_details: body.items.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.qty
    })),
    customer_details: {
      first_name: body.customer?.name ?? "PixelDew Customer",
      email: body.customer?.email ?? "",
      phone: body.customer?.phone ?? ""
    }
  });

  const now = Date.now();
  const order: Order = {
    order_id: orderId,
    gross_amount: grossAmount,
    items: body.items,
    customer: body.customer,
    status: "PENDING",
    createdAt: now,
    updatedAt: now
  };
  orderStore.set(orderId, order);

  return NextResponse.json({ ok: true, token: transaction.token, order_id: orderId });
}
