export type ProjectType = "landing" | "ebook";

export type ProjectLedgerEntry = {
  id: string;
  timestamp: string;
  action: string;
  credits: number;
};

export type Project = {
  id: string;
  name: string;
  type: ProjectType;
  brief: string;
  style: string;
  createdAt: string;
  outputs: string[];
  ledger: ProjectLedgerEntry[];
};

export type Store = {
  userId: string;
  email: string;
  credits: number;
  projects: Project[];
};

const STORE_KEY = "pixeldew-store";
const INITIAL_STORE: Store = {
  userId: "guest",
  email: "demo@pixeldew.xyz",
  credits: 20,
  projects: []
};

const isBrowser = () => typeof window !== "undefined";
const generateId = () => (isBrowser() && "randomUUID" in window.crypto ? window.crypto.randomUUID() : `pd-${Date.now()}`);

export const getStore = (): Store => {
  if (!isBrowser()) return INITIAL_STORE;
  const raw = window.localStorage.getItem(STORE_KEY);
  if (!raw) {
    const seeded = { ...INITIAL_STORE, userId: generateId() };
    window.localStorage.setItem(STORE_KEY, JSON.stringify(seeded));
    return seeded;
  }
  try {
    const parsed = JSON.parse(raw) as Store;
    if (!parsed.userId) {
      const updated = { ...parsed, userId: generateId(), email: parsed.email || INITIAL_STORE.email };
      window.localStorage.setItem(STORE_KEY, JSON.stringify(updated));
      return updated;
    }
    return parsed;
  } catch {
    const seeded = { ...INITIAL_STORE, userId: generateId() };
    window.localStorage.setItem(STORE_KEY, JSON.stringify(seeded));
    return seeded;
  }
};

export const saveStore = (store: Store) => {
  if (!isBrowser()) return;
  window.localStorage.setItem(STORE_KEY, JSON.stringify(store));
  window.dispatchEvent(new CustomEvent("pixeldew-store"));
};

export const updateCredits = (delta: number) => {
  const store = getStore();
  store.credits = Math.max(store.credits + delta, 0);
  saveStore(store);
  return store.credits;
};

export const addProject = (project: Project) => {
  const store = getStore();
  store.projects = [project, ...store.projects];
  saveStore(store);
};

export const updateProject = (projectId: string, updater: (project: Project) => Project) => {
  const store = getStore();
  store.projects = store.projects.map((project) => (project.id === projectId ? updater(project) : project));
  saveStore(store);
};

export const getProject = (projectId: string) => {
  const store = getStore();
  return store.projects.find((project) => project.id === projectId);
};
