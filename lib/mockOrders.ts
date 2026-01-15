export type MockOrderRecord = {
  id: string;
  status: string;
  payload: unknown;
  updatedAt: string;
};

const store = new Map<string, MockOrderRecord>();

export function upsertMockOrder(id: string, status: string, payload: unknown) {
  const record: MockOrderRecord = {
    id,
    status,
    payload,
    updatedAt: new Date().toISOString()
  };
  store.set(id, record);
  return record;
}

export function getMockOrder(id: string) {
  return store.get(id) ?? null;
}

export function listMockOrders() {
  return Array.from(store.values());
}
