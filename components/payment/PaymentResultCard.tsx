"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

type OrderStatus = "PENDING" | "PAID" | "FAILED";

type StatusResponse = {
  ok: boolean;
  order?: {
    order_id: string;
    status: OrderStatus;
  };
  error?: string;
};

type PaymentResultCardProps = {
  title: string;
  friendlyMessage: string;
  expectedState: "success" | "pending" | "error";
};

const badgeStyles: Record<string, string> = {
  PAID: "border-emerald-400/40 bg-emerald-500/20 text-emerald-200",
  PENDING: "border-amber-400/40 bg-amber-500/20 text-amber-200",
  FAILED: "border-rose-400/40 bg-rose-500/20 text-rose-200",
  UNKNOWN: "border-white/20 bg-white/10 text-white/80"
};

export default function PaymentResultCard({
  title,
  friendlyMessage,
  expectedState
}: PaymentResultCardProps) {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");

  const [loading, setLoading] = useState(true);
  const [statusResult, setStatusResult] = useState<StatusResponse | null>(null);

  useEffect(() => {
    const readStatus = async () => {
      if (!orderId) {
        setStatusResult({ ok: false, error: "Missing order_id in callback URL." });
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/orders/status?order_id=${encodeURIComponent(orderId)}`, {
          method: "GET",
          cache: "no-store"
        });
        const raw = await res.text();

        let parsed: StatusResponse = { ok: false, error: "Invalid server response." };
        try {
          parsed = raw ? (JSON.parse(raw) as StatusResponse) : parsed;
        } catch {
          parsed = { ok: false, error: "Unable to parse order status response." };
        }

        if (!res.ok && !parsed.error) {
          parsed.error = `Failed to load order status (HTTP ${res.status}).`;
        }

        setStatusResult(parsed);
      } catch {
        setStatusResult({ ok: false, error: "Network error while checking order status." });
      } finally {
        setLoading(false);
      }
    };

    readStatus();
  }, [orderId]);

  const status = statusResult?.order?.status ?? "UNKNOWN";

  const statusSummary = useMemo(() => {
    if (!statusResult?.ok) {
      return {
        message: "We could not verify this order yet.",
        className: badgeStyles.UNKNOWN
      };
    }

    if (status === "PAID") {
      return {
        message: "Payment verified. Your order is marked as paid.",
        className: badgeStyles.PAID
      };
    }

    if (status === "PENDING") {
      return {
        message: "Payment is still pending. Please complete or wait for confirmation.",
        className: badgeStyles.PENDING
      };
    }

    return {
      message: "Payment failed or expired. Please try again.",
      className: badgeStyles.FAILED
    };
  }, [statusResult, status]);

  const accent =
    expectedState === "success"
      ? "text-dew-mint"
      : expectedState === "pending"
        ? "text-amber-200"
        : "text-rose-200";

  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-dew-mint/30 bg-space-800/70 p-6 text-xs text-white/80 shadow-insetPixel">
      <h1 className={`font-arcade text-xl ${accent}`}>{title}</h1>
      <p className="mt-3 text-white/65">{friendlyMessage}</p>

      <div className="mt-5 rounded-xl border border-white/15 bg-space-900/80 p-4">
        {loading ? (
          <p className="text-[11px] text-white/60">Checking order status...</p>
        ) : (
          <div className="space-y-3 text-[11px]">
            <div>
              <span className="text-white/50">Order ID:</span> {orderId ?? "-"}
            </div>
            {statusResult?.ok ? (
              <>
                <span className={`inline-flex rounded-full border px-2 py-1 font-medium ${statusSummary.className}`}>
                  {status}
                </span>
                <p className="text-white/70">{statusSummary.message}</p>
              </>
            ) : (
              <p className="text-rose-200">{statusResult?.error ?? "Order not found."}</p>
            )}
          </div>
        )}
      </div>

      <div className="mt-6">
        <Link
          href="/"
          className="inline-flex rounded-md border border-dew-mint/40 bg-dew-mint/90 px-4 py-2 font-arcade text-[11px] text-space-900 transition hover:bg-dew-mint"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
