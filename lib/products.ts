export type ProductCategory = "Templates" | "Planner" | "Prompts" | "UI Kit" | "Bundle";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  price: string;
  description: string;
  badges: string[];
  features: string[];
  checkoutUrlEnvKey: string;
};

export const products: Product[] = [
  {
    id: "prod-calendar",
    slug: "pixeldew-content-calendar",
    name: "PixelDew Content Calendar",
    category: "Planner",
    price: "149k",
    description: "A 12-week pixel planner with channel strategy, drops, and tracking sheets.",
    badges: ["Best Seller"],
    features: ["12-week calendar", "Channel strategy", "Metric tracker"],
    checkoutUrlEnvKey: "NEXT_PUBLIC_LEMON_PRODUCT_URL_CALENDAR"
  },
  {
    id: "prod-flow",
    slug: "dew-flow-planner-sunset-harbor",
    name: "Dew Flow Planner (Sunset Harbor)",
    category: "Planner",
    price: "129k",
    description: "Visualize launches, tasks, and approvals with a neon-friendly flow canvas.",
    badges: ["New"],
    features: ["Flow canvas", "Approval lanes", "Weekly sprints"],
    checkoutUrlEnvKey: "NEXT_PUBLIC_LEMON_PRODUCT_URL_FLOW"
  },
  {
    id: "prod-prompt",
    slug: "prompt-pack-ads-copywriting",
    name: "Prompt Pack: Ads & Copywriting",
    category: "Prompts",
    price: "99k",
    description: "50 high-converting prompts for ads, hooks, and conversion copy.",
    badges: [],
    features: ["50 prompts", "Ad hooks", "Conversion copy"],
    checkoutUrlEnvKey: "NEXT_PUBLIC_LEMON_PRODUCT_URL_PROMPTS"
  },
  {
    id: "prod-ui",
    slug: "pixel-ui-kit",
    name: "Pixel UI Kit",
    category: "UI Kit",
    price: "199k",
    description: "Neon mint UI components, grids, and buttons for PixelDew-ready layouts.",
    badges: ["Best Seller"],
    features: ["120+ components", "Dark UI", "Figma ready"],
    checkoutUrlEnvKey: "NEXT_PUBLIC_LEMON_PRODUCT_URL_UI"
  },
  {
    id: "bundle-creator",
    slug: "bundle-creator-pack",
    name: "Bundle: Creator Pack",
    category: "Bundle",
    price: "299k",
    description: "Everything you need to ship: calendar, prompt pack, and UI kit.",
    badges: ["Bundle"],
    features: ["Calendar + prompts + UI kit", "Commercial license", "Updates included"],
    checkoutUrlEnvKey: "NEXT_PUBLIC_LEMON_PRODUCT_URL_CREATOR"
  }
];

export const bundles = products.filter((product) => product.category === "Bundle");
