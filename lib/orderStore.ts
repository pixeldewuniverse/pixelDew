import { randomUUID } from "crypto";

export type OrderItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
};

export type CustomerInfo = {
  name: string;
  email: string;
  phone: string;
};

export type OrderStatus = "pending" | "paid" | "failed";

export type OrderRecord = {
  orderId: string;
  items: OrderItem[];
  customer: CustomerInfo;
  grossAmount: number;
  status: OrderStatus;
  downloadToken?: string;
  updatedAt: string;
};

type OrderStore = {
  orders: Map<string, OrderRecord>;
};

const globalForOrders = globalThis as typeof globalThis & {
  __pixeldewOrders?: OrderStore;
};

const store: OrderStore =
  globalForOrders.__pixeldewOrders ?? {
    orders: new Map()
  };

globalForOrders.__pixeldewOrders = store;

export const orderStore = {
  create(order: Omit<OrderRecord, "status" | "updatedAt">) {
    const record: OrderRecord = {
      ...order,
      status: "pending",
      updatedAt: new Date().toISOString()
    };
    store.orders.set(record.orderId, record);
    return record;
  },
  markPaid(orderId: string) {
    const order = store.orders.get(orderId);
    if (!order) return null;
    const updated: OrderRecord = {
      ...order,
      status: "paid",
      downloadToken: order.downloadToken ?? randomUUID(),
      updatedAt: new Date().toISOString()
    };
    store.orders.set(orderId, updated);
    return updated;
  },
  markFailed(orderId: string) {
    const order = store.orders.get(orderId);
    if (!order) return null;
    const updated: OrderRecord = {
      ...order,
      status: "failed",
      updatedAt: new Date().toISOString()
    };
    store.orders.set(orderId, updated);
    return updated;
  }
};
