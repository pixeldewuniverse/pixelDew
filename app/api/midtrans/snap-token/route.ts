import { NextResponse } from "next/server";
import Midtrans from "midtrans-client";
import { orderStore } from "@/lib/orderStore";

type SnapRequestBody = {
  orderId: string;
  amount: number;
  items?: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
};

const isValidItem = (item: NonNullable<SnapRequestBody["items"]>[number]) =>
  typeof item.id === "string" &&
  typeof item.name === "string" &&
  Number.isFinite(item.price) &&
  Number.isFinite(item.quantity) &&
  item.price > 0 &&
  item.quantity > 0;

export async function POST(request: Request) {
  const serverKey = process.env.MIDTRANS_SERVER_KEY;

  if (!serverKey) {
    return NextResponse.json(
      { error: "MIDTRANS_SERVER_KEY is not configured on the server." },
      { status: 500 }
    );
  }

  let body: SnapRequestBody;
  try {
    body = (await request.json()) as SnapRequestBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  if (
    !body ||
    typeof body.orderId !== "string" ||
    body.orderId.trim().length === 0 ||
    !Number.isFinite(body.amount) ||
    body.amount <= 0 ||
    (body.items && (!Array.isArray(body.items) || !body.items.every(isValidItem)))
  ) {
    return NextResponse.json(
      { error: "Invalid payload. Expected { orderId: string, amount: number, items?: [...] }." },
      { status: 400 }
    );
  }

  const snap = new Midtrans.Snap({
    isProduction: true,
    serverKey
  });

  const parameter = {
    transaction_details: {
      order_id: body.orderId,
      gross_amount: body.amount
    },
    ...(body.items ? { item_details: body.items } : {})
  };

  try {
    const transaction = await snap.createTransaction(parameter);
    if (!transaction?.token) {
      return NextResponse.json(
        { error: "Midtrans did not return a transaction token." },
        { status: 502 }
      );
    }

    const now = Date.now();
    orderStore.set(body.orderId, {
      order_id: body.orderId,
      status: "PENDING",
      gross_amount: body.amount,
      items: body.items,
      createdAt: now,
      updatedAt: now
    });

    return NextResponse.json({ token: transaction.token });
  } catch (error) {
    const err = error as {
      statusCode?: number;
      message?: string;
      ApiResponse?: unknown;
      response?: unknown;
    };

    return NextResponse.json(
      {
        error: "Failed to create Midtrans transaction.",
        details: {
          statusCode: err.statusCode ?? null,
          message: err.message ?? "Unknown Midtrans error",
          response: err.ApiResponse ?? err.response ?? null
        }
      },
      { status: err.statusCode && err.statusCode >= 400 ? err.statusCode : 502 }
    );
  }
}
