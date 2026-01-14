export type OrderStatus = "created" | "paid" | "failed" | "refunded" | "unknown";

export type MockOrder = {
  secretSlug: string;
  status: OrderStatus;
  customer?: Record<string, unknown>;
  items?: Array<Record<string, unknown>>;
  updatedAt: string;
};

const orders = new Map<string, MockOrder>();

export const recordOrderEvent = (secretSlug: string, payload: Record<string, unknown>, status: OrderStatus) => {
  const existing = orders.get(secretSlug);
  const now = new Date().toISOString();
  const order: MockOrder = {
    secretSlug,
    status,
    customer: (payload?.customer as Record<string, unknown>) ?? existing?.customer,
    items: (payload?.items as Array<Record<string, unknown>>) ?? existing?.items,
    updatedAt: now
  };
  orders.set(secretSlug, order);
  return order;
};

export const listOrders = () => Array.from(orders.values());
