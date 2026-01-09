export const creditCosts = {
  generate: 5,
  variation: 3,
  revision: 2,
  export: 10,
  deploy: 15,
  license: 10
};

export type CreditAction = keyof typeof creditCosts;

export const creditPackages = [
  { id: "starter", label: "Starter", credits: 30, price: "$15", envKey: "LEMON_URL_STARTER" },
  { id: "builder", label: "Builder", credits: 80, price: "$39", envKey: "LEMON_URL_BUILDER" },
  { id: "pro", label: "Pro", credits: 200, price: "$89", envKey: "LEMON_URL_PRO" },
  { id: "studio", label: "Studio", credits: 500, price: "$149", envKey: "LEMON_URL_STUDIO" }
];
