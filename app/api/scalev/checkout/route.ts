import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SCALEV_CHECKOUT_URL = process.env.SCALEV_CHECKOUT_URL;
const SCALEV_STORE_UNIQUE_ID = process.env.SCALEV_STORE_UNIQUE_ID;
const SCALEV_API_KEY = process.env.SCALEV_API_KEY;

export async function POST(request: NextRequest) {
  if (!SCALEV_CHECKOUT_URL || !SCALEV_STORE_UNIQUE_ID) {
    return NextResponse.json(
      { message: "Scalev configuration is missing." },
      { status: 500 }
    );
  }

  const body = (await request.json()) as {
    customer_name?: string;
    customer_phone?: string;
    customer_email?: string;
    variant_unique_id?: string;
  };

  if (!body.customer_name || !body.customer_phone || !body.customer_email || !body.variant_unique_id) {
    return NextResponse.json({ message: "Missing checkout fields." }, { status: 400 });
  }

  const payload = {
    store_unique_id: SCALEV_STORE_UNIQUE_ID,
    customer_name: body.customer_name,
    customer_phone: body.customer_phone,
    customer_email: body.customer_email,
    ordervariants: [
      {
        quantity: 1,
        variant_unique_id: body.variant_unique_id
      }
    ],
    payment_method: "invoice"
  };

  const response = await fetch(SCALEV_CHECKOUT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(SCALEV_API_KEY ? { Authorization: `Bearer ${SCALEV_API_KEY}` } : {})
    },
    body: JSON.stringify(payload)
  });

  const data = await response.json().catch(() => ({ message: "Invalid response." }));

  return NextResponse.json(data, { status: response.ok ? 200 : response.status });
}
