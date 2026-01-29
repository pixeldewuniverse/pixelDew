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

const getSnapClient = (options: {
  serverKey: string;
  clientKey: string;
  isProduction: boolean;
}) =>
  new Midtrans.Snap({
    isProduction: options.isProduction,
    serverKey: options.serverKey,
    clientKey: options.clientKey
  });

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
  const serverKey = process.env.MIDTRANS_SERVER_KEY;
  const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY;
  const isProduction = process.env.MIDTRANS_IS_PRODUCTION === "true";
  const missing = [
    !serverKey ? "MIDTRANS_SERVER_KEY" : null,
    !clientKey ? "NEXT_PUBLIC_MIDTRANS_CLIENT_KEY" : null,
    !process.env.MIDTRANS_IS_PRODUCTION ? "MIDTRANS_IS_PRODUCTION" : null
  ].filter(Boolean);

  if (missing.length > 0) {
    return NextResponse.json(
      {
        ok: false,
        error: "Missing Midtrans configuration",
        missing
      },
      { status: 500 }
    );
  }

  const safeServerKey = serverKey ?? "";
  const safeClientKey = clientKey ?? "";

  const isSandboxKey = safeServerKey.startsWith("SB-");
  if ((isSandboxKey && isProduction) || (!isSandboxKey && !isProduction)) {
    return NextResponse.json(
      {
        ok: false,
        error: "Midtrans env mismatch",
        details: {
          isProd: isProduction,
          isProductionValue: process.env.MIDTRANS_IS_PRODUCTION ?? "",
          serverKeyPrefix: safeServerKey.slice(0, 12)
        }
      },
      { status: 500 }
    );
  }

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

  const snap = getSnapClient({ serverKey: safeServerKey, clientKey: safeClientKey, isProduction });

  let transaction: { token: string };
  try {
    transaction = await snap.createTransaction({
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
  } catch (error) {
    const message = error instanceof Error ? error.message : "Midtrans request failed.";
    const errorWithMeta = error as {
      statusCode?: number;
      ApiResponse?: unknown;
      response?: unknown;
    };
    return NextResponse.json(
      {
        ok: false,
        error: "Failed to create Midtrans transaction.",
        details: {
          message,
          statusCode: errorWithMeta.statusCode ?? null,
          response: errorWithMeta.ApiResponse ?? errorWithMeta.response ?? null
        }
      },
      { status: 502 }
    );
  }

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
