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
SCALEV_API_BASE=https://api.scalev.id/v2
SCALEV_API_KEY=
SCALEV_STORE_UNIQUE_ID=
SCALEV_PAYMENT_METHOD=invoice
SCALEV_WEBHOOK_SIGNING_SECRET=
NEXT_PUBLIC_SCALEV_PUBLIC_ORDER_BASE=https://app.scalev.id/order/public
NEXT_PUBLIC_ADMIN_DEBUG_TOKEN=
```

## Webhooks

Point Scalev webhooks to:

```
/api/webhooks/scalev
```
