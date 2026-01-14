import { NextResponse } from "next/server";
import crypto from "crypto";
import { addServerCredits } from "@/lib/serverStore";

const creditMap = {
  starter: 30,
  builder: 80,
  pro: 200,
  studio: 500
};

const getCreditsFromVariant = (variantName?: string) => {
  if (!variantName) return undefined;
  const lower = variantName.toLowerCase();
  if (lower.includes("starter")) return creditMap.starter;
  if (lower.includes("builder")) return creditMap.builder;
  if (lower.includes("pro")) return creditMap.pro;
  if (lower.includes("studio")) return creditMap.studio;
  return undefined;
};

const safeCompare = (a: string, b: string) => {
  const bufferA = Buffer.from(a, "utf-8");
  const bufferB = Buffer.from(b, "utf-8");
  if (bufferA.length !== bufferB.length) return false;
  return crypto.timingSafeEqual(bufferA, bufferB);
};

export async function POST(request: Request) {
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Missing webhook secret" }, { status: 500 });
  }

  const signature = request.headers.get("X-Signature") || "";
  const eventName = request.headers.get("X-Event-Name") || "";
  const rawBody = await request.text();
  const digest = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");

  if (!safeCompare(signature, digest)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const payload = JSON.parse(rawBody);
  if (eventName !== "order_created") {
    return NextResponse.json({ received: true });
  }

  const attributes = payload?.data?.attributes ?? {};
  const customData = attributes?.custom_data ?? payload?.meta?.custom_data ?? {};
  const userId = customData.userId || customData.user_id || "guest";
  const email = customData.email || attributes?.user_email;
  const variantName = attributes?.first_order_item?.variant_name || attributes?.variant_name;
  const credits = getCreditsFromVariant(variantName) ?? 0;

  if (credits > 0) {
    await addServerCredits({
      userId,
      email,
      credits,
      action: `LemonSqueezy ${variantName || "purchase"}`
    });
  }

  return NextResponse.json({ received: true });
}
