import { promises as fs } from "fs";
import path from "path";

export type ServerLedgerEntry = {
  id: string;
  timestamp: string;
  action: string;
  credits: number;
};

export type ServerUser = {
  userId: string;
  email?: string;
  credits: number;
  ledger: ServerLedgerEntry[];
};

type ServerStore = {
  users: Record<string, ServerUser>;
};

const STORE_PATH = path.join(process.cwd(), "data", "server-store.json");

const readStore = async (): Promise<ServerStore> => {
  try {
    const raw = await fs.readFile(STORE_PATH, "utf-8");
    return JSON.parse(raw) as ServerStore;
  } catch {
    const initial: ServerStore = { users: {} };
    await fs.mkdir(path.dirname(STORE_PATH), { recursive: true });
    await fs.writeFile(STORE_PATH, JSON.stringify(initial, null, 2));
    return initial;
  }
};

const writeStore = async (store: ServerStore) => {
  await fs.mkdir(path.dirname(STORE_PATH), { recursive: true });
  await fs.writeFile(STORE_PATH, JSON.stringify(store, null, 2));
};

export const addServerCredits = async ({
  userId,
  email,
  credits,
  action
}: {
  userId: string;
  email?: string;
  credits: number;
  action: string;
}) => {
  const store = await readStore();
  const existing = store.users[userId] ?? { userId, email, credits: 0, ledger: [] };
  const updated: ServerUser = {
    ...existing,
    email: email ?? existing.email,
    credits: existing.credits + credits,
    ledger: [
      {
        id: `${Date.now()}-${action}`,
        timestamp: new Date().toISOString(),
        action,
        credits
      },
      ...existing.ledger
    ]
  };
  store.users[userId] = updated;
  await writeStore(store);
  return updated;
};
