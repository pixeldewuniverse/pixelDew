# PixelDew Build Studio

PixelDew Build Studio MVP built with Next.js App Router, TypeScript, and TailwindCSS.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run start
```

## Deploy (Vercel)

```bash
vercel
```

Alternatively, connect the repo on Vercel and use the default Next.js settings.

## Environment Variables

```bash
NEXT_PUBLIC_SCALEV_CHECKOUT_STARTER=...
NEXT_PUBLIC_SCALEV_CHECKOUT_BUILDER=...
NEXT_PUBLIC_SCALEV_CHECKOUT_PRO=...
NEXT_PUBLIC_SCALEV_CHECKOUT_STUDIO=...
NEXT_PUBLIC_SCALEV_PUBLIC_ORDER_BASE=https://app.scalev.id/order/public
SCALEV_API_BASE=https://api.scalev.id/v2
SCALEV_API_KEY=...
SCALEV_STORE_UNIQUE_ID=store_xxx
SCALEV_WEBHOOK_SIGNING_SECRET=...
SCALEV_PAYMENT_METHOD=invoice
```

## Webhooks

Point Scalev webhooks to:

```
/api/webhooks/scalev
```
