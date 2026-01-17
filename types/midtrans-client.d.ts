declare module "midtrans-client" {
  type SnapOptions = {
    isProduction: boolean;
    serverKey: string;
    clientKey?: string;
  };

  export class Snap {
    constructor(options: SnapOptions);
    createTransaction(payload: Record<string, unknown>): Promise<{ token: string }>;
  }

  const Midtrans: {
    Snap: typeof Snap;
  };

  export default Midtrans;
}
