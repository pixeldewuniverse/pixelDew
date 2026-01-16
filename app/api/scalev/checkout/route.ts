import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SCALEV_API_BASE = process.env.SCALEV_API_BASE;
const SCALEV_STORE_UNIQUE_ID = process.env.SCALEV_STORE_UNIQUE_ID;
const SCALEV_API_KEY = process.env.SCALEV_API_KEY;
const SCALEV_PAYMENT_METHOD = process.env.SCALEV_PAYMENT_METHOD ?? "invoice";
const SCALEV_PUBLIC_ORDER_BASE = process.env.NEXT_PUBLIC_SCALEV_PUBLIC_ORDER_BASE;

export async function POST(request: NextRequest) {
  const missingKeys = [
    !SCALEV_API_BASE ? "SCALEV_API_BASE" : null,
    !SCALEV_API_KEY ? "SCALEV_API_KEY" : null,
    !SCALEV_STORE_UNIQUE_ID ? "SCALEV_STORE_UNIQUE_ID" : null,
    !SCALEV_PAYMENT_METHOD ? "SCALEV_PAYMENT_METHOD" : null,
    !SCALEV_PUBLIC_ORDER_BASE ? "NEXT_PUBLIC_SCALEV_PUBLIC_ORDER_BASE" : null
  ].filter(Boolean) as string[];

  if (missingKeys.length > 0) {
    console.warn("Missing Scalev server configuration keys:", missingKeys.join(", "));
    return NextResponse.json(
      { ok: false, error: "Missing Scalev server configuration", missing: missingKeys },
      { status: 500 }
    );
  }
  const scalevApiBase = SCALEV_API_BASE as string;
  const scalevApiKey = SCALEV_API_KEY as string;
  const scalevStoreUniqueId = SCALEV_STORE_UNIQUE_ID as string;
  const scalevPaymentMethod = SCALEV_PAYMENT_METHOD as string;
  const scalevPublicOrderBase = SCALEV_PUBLIC_ORDER_BASE as string;

  const rawBody = await request.text();
  let body: {
    customer_name?: string;
    customer_phone?: string;
    customer_email?: string;
    items?: Array<{ quantity: number; variant_unique_id: string }>;
  };
  try {
    body = rawBody ? (JSON.parse(rawBody) as typeof body) : {};
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON payload" }, { status: 400 });
  }

  if (!body.customer_name || !body.customer_phone || !body.customer_email) {
    return NextResponse.json({ ok: false, error: "Missing customer fields" }, { status: 400 });
  }

  if (!body.items || !Array.isArray(body.items) || body.items.length === 0) {
    return NextResponse.json({ ok: false, error: "Missing order items" }, { status: 400 });
  }

  const invalidItem = body.items.find(
    (item) =>
      !item ||
      typeof item.variant_unique_id !== "string" ||
      item.variant_unique_id.trim().length === 0 ||
      typeof item.quantity !== "number" ||
      item.quantity <= 0
  );
  if (invalidItem) {
    return NextResponse.json({ ok: false, error: "Invalid order item" }, { status: 400 });
  }

  const ordervariants = body.items.map((item) => ({
    quantity: item.quantity,
    variant_unique_id: item.variant_unique_id
  }));

  const payload = {
    store_unique_id: scalevStoreUniqueId,
    customer_name: body.customer_name,
    customer_phone: body.customer_phone,
    customer_email: body.customer_email,
    ordervariants,
    payment_method: scalevPaymentMethod
  };

  const response = await fetch(`${scalevApiBase.replace(/\/$/, "")}/order`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${scalevApiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  type ScalevResponse = {
    id?: number;
    secret_slug?: string;
    data?: { id?: number; secret_slug?: string };
  };
  const responseText = await response.text();
  let parsed: ScalevResponse | null = null;
  try {
    parsed = responseText ? (JSON.parse(responseText) as ScalevResponse) : null;
  } catch {
    console.warn("Scalev checkout returned non-JSON response text:", responseText);
    parsed = null;
  }

  if (!response.ok) {
    console.warn("Scalev checkout failed with status:", response.status);
    return NextResponse.json(
      {
        ok: false,
        error: "Scalev order failed",
        status: response.status,
        details: parsed ?? responseText
      },
      { status: 502 }
    );
  }

  const secretSlug = parsed?.secret_slug ?? parsed?.data?.secret_slug;
  const orderId = parsed?.data?.id ?? parsed?.id;
  if (!secretSlug) {
    return NextResponse.json(
      {
        ok: false,
        error: "Scalev response missing secret_slug",
        details: parsed ?? responseText
      },
      { status: 502 }
    );
  }
  if (!orderId) {
    return NextResponse.json(
      {
        ok: false,
        error: "Scalev response missing order id",
        details: parsed ?? responseText
      },
      { status: 502 }
    );
  }

  const paymentResponse = await fetch(
    `${scalevApiBase.replace(/\/$/, "")}/order/${orderId}/payment`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${scalevApiKey}`,
        "Content-Type": "application/json"
      }
    }
  );
  const paymentText = await paymentResponse.text();
  let paymentParsed: unknown = null;
  try {
    paymentParsed = paymentText ? JSON.parse(paymentText) : null;
  } catch {
    paymentParsed = paymentText;
  }
  if (!paymentResponse.ok) {
    return NextResponse.json(
      {
        ok: false,
        error: "Scalev payment request failed",
        status: paymentResponse.status,
        details: paymentParsed
      },
      { status: 502 }
    );
  }

  const base = scalevPublicOrderBase.replace(/\/$/, "");
  const redirectUrl = `${base}/${secretSlug}/success`;

  return NextResponse.json({ ok: true, secret_slug: secretSlug, redirectUrl });
}
