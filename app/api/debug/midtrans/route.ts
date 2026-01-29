import { NextResponse } from "next/server";

export async function GET() {
  const serverKey = process.env.MIDTRANS_SERVER_KEY;
  const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY;
  const isProduction = process.env.MIDTRANS_IS_PRODUCTION;

  const prefixLength = 12;

  return NextResponse.json({
    ok: true,
    hasServerKey: Boolean(serverKey),
    hasClientKey: Boolean(clientKey),
    isProduction: isProduction ?? "",
    serverKeyPrefix: serverKey ? serverKey.slice(0, prefixLength) : "",
    clientKeyPrefix: clientKey ? clientKey.slice(0, prefixLength) : ""
  });
}
