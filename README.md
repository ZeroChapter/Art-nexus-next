# Art Nexus — storefront

Next.js 16 public website for [Art Nexus](https://art-nexus.ru).

## Stack

- Next.js 16 (App Router), React 19, TypeScript
- Server-side catalog fetching, `next/image`, JSON-LD

## Quick start

```bash
cp .env.example .env
npm install
npm run dev
```

Requires the [backend API](../Art-nexus-back) running on port 5000 (or set URLs in `.env`).

## Environment

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Public site URL (SEO, sitemap) |
| `NEXT_PUBLIC_API_URL` | API URL for client-side requests |
| `API_INTERNAL_URL` | API URL for SSR (Docker / server) |
| `NEXT_PUBLIC_YANDEX_METRIKA_ID` | Yandex.Metrika counter |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Google Search Console |
| `NEXT_PUBLIC_YANDEX_VERIFICATION` | Yandex Webmaster |

## Build

MongoDB and the API must be reachable at build time if pages are statically generated:

```bash
npm run build
npm start
```

## Production deploy (server)

Host nginx proxies `art-nexus.ru` to Next.js on port `3001` and `/api/*` to the backend on `3000`.

Example `.env` on the server:

```env
NEXT_PUBLIC_SITE_URL=https://art-nexus.ru
NEXT_PUBLIC_API_URL=https://art-nexus.ru
API_INTERNAL_URL=http://127.0.0.1:3000
NEXT_PUBLIC_YANDEX_METRIKA_ID=your_counter_id
PORT=3001
```

Deploy or redeploy:

```bash
chmod +x scripts/deploy-next.sh
./scripts/deploy-next.sh
```

## Security

- No secrets in source — configuration via `.env`
- Read-only access to the catalog API; orders use public `POST /api/orders`
- Admin CRUD is protected by `ADMIN_API_KEY` on the backend (admin panel only)

## Related repos

- **Art-nexus-back** — Express API
- **ArtNexusAdmin** — local admin panel (Vite + React)
