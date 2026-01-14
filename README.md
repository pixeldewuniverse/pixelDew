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
NEXT_PUBLIC_LEMON_PRODUCT_URL_CALENDAR=...
NEXT_PUBLIC_LEMON_PRODUCT_URL_FLOW=...
NEXT_PUBLIC_LEMON_PRODUCT_URL_PROMPTS=...
NEXT_PUBLIC_LEMON_PRODUCT_URL_UI=...
NEXT_PUBLIC_LEMON_PRODUCT_URL_LANDING=...
NEXT_PUBLIC_LEMON_PRODUCT_URL_WEBDESIGN=...
NEXT_PUBLIC_LEMON_PRODUCT_URL_CREATOR=...
NEXT_PUBLIC_LEMON_PRODUCT_URL_STARTER_PACK=...
NEXT_PUBLIC_LEMON_PRODUCT_URL_PRO=...
NEXT_PUBLIC_LEMON_PRODUCT_URL_STUDIO=...
LEMONSQUEEZY_WEBHOOK_SECRET=...
```

## Webhooks

Point LemonSqueezy webhooks to:

```
/api/webhooks/lemonsqueezy
```
