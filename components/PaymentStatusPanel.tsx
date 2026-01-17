"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type OrderStatus = "PENDING" | "PAID" | "FAILED";

type OrderResponse = {
  ok: boolean;
  order?: {
    order_id: string;
    gross_amount: number;
    status: OrderStatus;
    updatedAt: number;
  };
  error?: string;
};

type PaymentStatusPanelProps = {
  accentClassName: string;
  title: string;
  description: string;
};

export default function PaymentStatusPanel({
  accentClassName,
  title,
  description
}: PaymentStatusPanelProps) {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");
  const [status, setStatus] = useState<OrderResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      if (!orderId) {
        setStatus({ ok: false, error: "Missing order_id" });
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/orders/status?order_id=${orderId}`);
        const data = (await response.json()) as OrderResponse;
        setStatus(data);
      } catch (error) {
        setStatus({ ok: false, error: "Unable to fetch order status." });
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, [orderId]);

  const statusLabel = status?.order?.status ?? "UNKNOWN";

  return (
    <div className="rounded-xl border border-dew-mint/30 bg-space-800/70 p-6 text-xs text-white/70 shadow-insetPixel">
      <h1 className={`font-arcade text-xl ${accentClassName}`}>{title}</h1>
      <p className="mt-3 text-white/60">{description}</p>
      <div className="mt-5 rounded-lg border border-white/10 bg-space-900/60 p-4">
        {loading ? (
          <p className="text-[11px] text-white/60">Checking order status...</p>
        ) : status?.ok ? (
          <div className="space-y-2 text-[11px] text-white/70">
            <div>
              <span className="text-white/50">Order ID:</span> {status.order?.order_id}
            </div>
            <div>
              <span className="text-white/50">Status:</span> {statusLabel}
            </div>
            <div>
              <span className="text-white/50">Last update:</span>{" "}
              {status.order?.updatedAt ? new Date(status.order.updatedAt).toLocaleString() : "-"}
            </div>
          </div>
        ) : (
          <p className="text-[11px] text-rose-200">{status?.error ?? "Order not found."}</p>
        )}
      </div>
    </div>
  );
}
