export type OrderStatus = "PENDING" | "PAID" | "FAILED";

export type Order = {
  order_id: string;
  gross_amount: number;
  items: any[];
  customer: any;
  status: OrderStatus;
  createdAt: number;
  updatedAt: number;
};

export const orderStore = new Map<string, Order>();
