export type OrderStatus = "PENDING" | "PAID" | "FAILED";

export type Order = {
  order_id: string;
  status: OrderStatus;
  gross_amount?: number;
  items?: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  customer?: {
    name: string;
    email: string;
    phone: string;
  };
  createdAt: number;
  updatedAt: number;
};

export const orderStore = new Map<string, Order>();
