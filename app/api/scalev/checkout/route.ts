import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const API_BASE = process.env.SCALEV_API_BASE;
    const API_KEY = process.env.SCALEV_API_KEY;
    const STORE_ID = process.env.SCALEV_STORE_UNIQUE_ID;
    const PAYMENT_METHOD = process.env.SCALEV_PAYMENT_METHOD || "invoice";
    const PUBLIC_BASE = process.env.NEXT_PUBLIC_SCALEV_PUBLIC_ORDER_BASE;

    if (!API_BASE || !API_KEY || !STORE_ID || !PUBLIC_BASE) {
      return NextResponse.json(
        { ok: false, error: "Missing Scalev server configuration" },
        { status: 500 }
      );
    }
    

    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
    }

    const { customer_name, customer_phone, customer_email, items } = body;

    if (!customer_name || !customer_phone || !customer_email) {
      return NextResponse.json(
        { ok: false, error: "Missing customer fields" },
        { status: 400 }
      );
    }
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { ok: false, error: "No items provided" },
        { status: 400 }
      );
    }
    for (const it of items) {
      if (!it?.variant_unique_id || !it?.quantity) {
        return NextResponse.json(
          { ok: false, error: "Invalid items format" },
          { status: 400 }
        );
      }
    }

    const payload = {
      store_unique_id: STORE_ID,
      customer_name,
      customer_phone,
      customer_email,
      ordervariants: items,
      payment_method: PAYMENT_METHOD,
    };

    const scalevRes = await fetch(`${API_BASE}/order`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const text = await scalevRes.text();
    let data: any = null;
    try {
      data = JSON.parse(text);
    } catch {
      // leave data null
    }

    if (!scalevRes.ok) {
      return NextResponse.json(
        { ok: false, error: "Scalev order failed", status: scalevRes.status, details: data ?? text },
        { status: 502 }
      );
    }
  

    const secret_slug = data?.secret_slug || data?.data?.secret_slug;
    if (!secret_slug) {
      return NextResponse.json(
        { ok: false, error: "Scalev response missing secret_slug", details: data ?? text },
        { status: 502 }
      );
    }

    const redirectUrl = `${PUBLIC_BASE}/${secret_slug}/success`;
    return NextResponse.json({ ok: true, secret_slug, redirectUrl });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: "Server error", details: String(e?.message ?? e) },
      { status: 500 }
    );
    const res = await fetch("/api/scalev/checkout", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload),
});

const text = await res.text();
let data: any;
try {
  data = JSON.parse(text);
} catch {
  throw new Error(`Invalid response from server: ${text.slice(0, 200)}`);
}

if (!res.ok || !data?.ok) {
  throw new Error(data?.error || "Checkout failed");
}

window.location.href = data.redirectUrl;


  }
}
