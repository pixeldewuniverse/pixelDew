import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import Midtrans from "midtrans-client";
import { orderStore, type CustomerInfo, type OrderItem } from "@/lib/orderStore";

type SnapRequestBody = {
  items: OrderItem[];
  customer: CustomerInfo;
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

const calculateGrossAmount = (items: OrderItem[]) =>
  items.reduce((total, item) => total + item.price * item.qty, 0);

export async function POST(request: Request) {
  const body = (await request.json()) as SnapRequestBody;

  if (!body?.items?.length) {
    return NextResponse.json({ error: "Items are required" }, { status: 400 });
  }

  const orderId = `${randomUUID()}-${Date.now()}`;
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

  orderStore.create({
    orderId,
    items: body.items,
    customer: body.customer ?? {
      name: "PixelDew Customer",
      email: "",
      phone: ""
    },
    grossAmount
  });

  return NextResponse.json({ token: transaction.token, order_id: orderId });
}
