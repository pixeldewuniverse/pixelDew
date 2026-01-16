

import { useEffect, useMemo, useState } from "react";

type EnvStatus = {
  scalevApiBase: boolean;
  scalevApiKey: boolean;
  scalevStoreUniqueId: boolean;
  scalevPaymentMethod: boolean;
  scalevPublicOrderBase: boolean;
  scalevWebhookSigningSecret?: boolean;
};

type RouteStatus = {
  checkout: boolean | null;
  webhook: boolean | null;
};

type DebugState = {
  env: EnvStatus | null;
  routes: RouteStatus;
  error: string | null;
};

const token = process.env.NEXT_PUBLIC_ADMIN_DEBUG_TOKEN;

export default function AdminDebugPanel() {
  const [state, setState] = useState<DebugState>({
    env: null,
    routes: { checkout: null, webhook: null },
    error: null
  });

  const enabled = useMemo(() => {
    if (!token) return false;
    if (typeof window === "undefined") return false;
    const url = new URL(window.location.href);
    return url.searchParams.get("debugToken") === token;
  }, []);

  useEffect(() => {
    if (!enabled) return;
    let active = true;

    const fetchDebug = async () => {
      try {
        const [envRes, checkoutRes, webhookRes] = await Promise.all([
          fetch("/api/debug/scalev"),
          fetch("/api/scalev/checkout", { method: "OPTIONS" }),
          fetch("/api/webhooks/scalev", { method: "OPTIONS" })
        ]);

        const envText = await envRes.text();
        const envData = (envText ? JSON.parse(envText) : null) as EnvStatus | null;

        if (!active) return;
        setState({
          env: envData,
          routes: {
            checkout: envRes.ok ? checkoutRes.status !== 404 : null,
            webhook: envRes.ok ? webhookRes.status !== 404 : null
          },
          error: envRes.ok ? null : "Failed to load env status."
        });
      } catch (error) {
        if (!active) return;
        const message = error instanceof Error ? error.message : "Failed to load debug status.";
        setState((prev) => ({ ...prev, error: message }));
      }
    };

    fetchDebug();
    return () => {
      active = false;
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="fixed right-4 bottom-4 z-50 w-[280px] rounded-xl border border-neon-cyan/40 bg-space-900/90 p-4 text-[10px] text-white/70 shadow-insetPixel backdrop-blur">
      <div className="font-arcade text-white">Admin Debug</div>
      <div className="mt-2 text-white/50">Scalev status</div>
      {state.error && <div className="mt-2 text-rose-200">{state.error}</div>}
      <div className="mt-3 space-y-1">
        <div className="text-white/40">Routes</div>
        <div>Checkout: {state.routes.checkout === null ? "—" : state.routes.checkout ? "OK" : "Missing"}</div>
        <div>Webhook: {state.routes.webhook === null ? "—" : state.routes.webhook ? "OK" : "Missing"}</div>
      </div>
      <div className="mt-3 space-y-1">
        <div className="text-white/40">Env</div>
        <div>API Base: {state.env?.scalevApiBase ? "OK" : "Missing"}</div>
        <div>API Key: {state.env?.scalevApiKey ? "OK" : "Missing"}</div>
        <div>Store ID: {state.env?.scalevStoreUniqueId ? "OK" : "Missing"}</div>
        <div>Payment Method: {state.env?.scalevPaymentMethod ? "OK" : "Missing"}</div>
        <div>Public Order Base: {state.env?.scalevPublicOrderBase ? "OK" : "Missing"}</div>
      </div>
    </div>
  );
}
