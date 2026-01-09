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
  { id: "starter", label: "Starter", credits: 50, price: "$19" },
  { id: "builder", label: "Builder", credits: 150, price: "$49" },
  { id: "studio", label: "Studio", credits: 400, price: "$99" }
];
