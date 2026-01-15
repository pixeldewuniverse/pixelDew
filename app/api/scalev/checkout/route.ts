import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const {
    customer_name,
    customer_phone,
    customer_email,
    items,
    payment_method
  }: {
    customer_name: string;
    customer_phone: string;
    customer_email: string;
    items: { variant_unique_id: string; quantity: number }[];
    payment_method?: string;
  } = body;

  if (
    !customer_name?.trim() ||
    !customer_phone?.trim() ||
    !customer_email?.trim() ||
    !Array.isArray(items) ||
    items.length === 0
  ) {
    return NextResponse.json({ ok: false, message: "Missing required checkout data." }, { status: 400 });
  }

  const apiBase = process.env.SCALEV_API_BASE;
  const apiKey = process.env.SCALEV_API_KEY;
  const storeUniqueId = process.env.SCALEV_STORE_UNIQUE_ID;
  const paymentMethod = payment_method ?? process.env.SCALEV_PAYMENT_METHOD ?? "invoice";
  const publicOrderBase = process.env.NEXT_PUBLIC_SCALEV_PUBLIC_ORDER_BASE;

  if (!apiBase || !apiKey || !storeUniqueId || !paymentMethod || !publicOrderBase) {
    return NextResponse.json({ ok: false, message: "Scalev env missing" }, { status: 500 });
  }

  const response = await fetch(`${apiBase}/order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      store_unique_id: storeUniqueId,
      customer_name,
      customer_phone,
      customer_email,
      ordervariants: items,
      payment_method: paymentMethod
    })
  });

  if (!response.ok) {
    return NextResponse.json({ ok: false, message: "Scalev order failed" }, { status: 500 });
  }

  const data = (await response.json()) as { secret_slug?: string };
  const secret_slug = data.secret_slug ?? "";
  const redirectUrl = `${publicOrderBase}/${secret_slug}/success`;

  return NextResponse.json({ ok: true, secret_slug, redirectUrl });
}
