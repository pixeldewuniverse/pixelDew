export type OrderStatus = "created" | "paid" | "cancelled" | "refunded" | "unknown";

export type MockOrder = {
  id: string;
  event: string;
  status: OrderStatus;
  payload: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
};

const orders: MockOrder[] = [];

export const recordOrderEvent = (event: string, payload: Record<string, unknown>) => {
  const id = (payload?.data as { id?: string })?.id ?? `order-${Date.now()}`;
  const status = (payload?.data as { status?: string })?.status ?? "unknown";
  const existing = orders.find((order) => order.id === id);
  const now = new Date().toISOString();

  if (existing) {
    existing.status = status as OrderStatus;
    existing.payload = payload;
    existing.event = event;
    existing.updatedAt = now;
    return existing;
  }

  const order: MockOrder = {
    id,
    event,
    status: status as OrderStatus,
    payload,
    createdAt: now,
    updatedAt: now
  };
  orders.unshift(order);
  return order;
};

export const listOrders = () => orders;
