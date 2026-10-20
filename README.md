# Brian The Tree Guy

React/TypeScript website for Brian The Tree Guy in Englewood, Florida. The existing layouts, images, phone links, routes and gallery fallback are retained.

## Runtime

Firebase Hosting serves `dist/public`. There is no separate application server, PostgreSQL database, account store or Replit runtime. Services and the API gallery list are public static content under `client/public/data`; the service records and empty API gallery list preserve the exact responses from the retired in-memory server. The existing nine gallery fallback images remain unchanged.

The client reads `/data/services.json` and `/data/gallery.json` in development and production. Firebase Hosting also preserves the old `/api/services` and `/api/gallery` URLs as rewrites to those same files. All other routes use the existing SPA.

## Develop and build

Run `npm ci`, `npm run check`, then `npm run build`. Use `npm run dev` for local development and `npm run preview` to inspect the built site. The canonical Firebase project is `brian-the-tree-guy-v2`; production deployment uses Fluba's existing Authorization Engine Main identity.

## Retirement, 2026-10-20

Removed unused SQL schemas/migration commands, database/session/auth scaffold packages, Replit Vite plugins and the standalone Express host. No customer records or cloud resources were deleted. Contact remains a phone/email link; no message or payment is sent during checks.
