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
```

## Webhooks

Point Scalev webhooks to:

```
/api/webhooks/scalev
```
