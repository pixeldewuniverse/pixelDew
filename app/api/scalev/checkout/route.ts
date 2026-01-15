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
      { ok: false, error: "Missing Scalev server configuration", missingKeys },
      { status: 500 }
    );
  }

  const body = (await request.json()) as {
    customer_name?: string;
    customer_phone?: string;
    customer_email?: string;
    items?: Array<{ quantity: number; variant_unique_id: string }>;
  };

  if (!body.customer_name || !body.customer_phone || !body.customer_email) {
    return NextResponse.json({ ok: false, message: "Missing customer fields." }, { status: 400 });
  }

  if (!body.items || !Array.isArray(body.items) || body.items.length === 0) {
    return NextResponse.json({ ok: false, message: "Missing order items." }, { status: 400 });
  }

  const ordervariants = body.items.map((item) => ({
    quantity: item.quantity,
    variant_unique_id: item.variant_unique_id
  }));

  const payload = {
    store_unique_id: SCALEV_STORE_UNIQUE_ID,
    customer_name: body.customer_name,
    customer_phone: body.customer_phone,
    customer_email: body.customer_email,
    ordervariants,
    payment_method: SCALEV_PAYMENT_METHOD
  };

  const response = await fetch(`${SCALEV_API_BASE.replace(/\/$/, "")}/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${SCALEV_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const data = (await response.json().catch(() => ({ message: "Invalid response." }))) as {
    secret_slug?: string;
    message?: string;
  };

  if (!response.ok) {
    return NextResponse.json(
      { ok: false, message: data.message ?? "Scalev checkout failed." },
      { status: response.status }
    );
  }

  if (!data.secret_slug) {
    return NextResponse.json(
      { ok: false, message: "Scalev response missing secret slug." },
      { status: 502 }
    );
  }

  const base = SCALEV_PUBLIC_ORDER_BASE.replace(/\/$/, "");
  const redirectUrl = `${base}/${data.secret_slug}/success`;

  return NextResponse.json({ ok: true, secret_slug: data.secret_slug, redirectUrl });
}
