# Abderrahmane Khbabez

Personal site and blog for [4bderrahmane.com](https://4bderrahmane.com).

This repo is a Next.js app that serves the main portfolio site, a technical MDX
blog, project links, SEO metadata, and a small kudos API for blog posts.

## What Is In Here

- Main site at `4bderrahmane.com`
- Blog content under `src/content/blog/*.mdx`
- Blog index and post pages under `src/app/blog`
- Projects page under `src/app/projects`
- Generated `robots.txt` and `sitemap.xml`
- Blog kudos API at `/blog/api/kudos/[slug]`
- Host-based routing in `src/proxy.ts`

Production routing is handled by one app:

- `4bderrahmane.com/*` serves the main site
- `blog.4bderrahmane.com/*` is rewritten internally to `/blog/*`
- `4bderrahmane.com/blog/*` redirects permanently to `blog.4bderrahmane.com/*`

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- MDX with `remark-gfm`
- Postgres for persistent app data

Next.js 16 has changed APIs and conventions compared with older versions. Before
changing framework-specific code, read the relevant local docs in
`node_modules/next/dist/docs/`.

## Requirements

- Node.js `>=20.9.0`
- npm

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Checks

```bash
npm run lint
npx tsc --noEmit
npm run build
```

To test the production build locally:

```bash
npm run build
npm run start
```

## Environment Variables

For production, set:

```bash
NEXT_PUBLIC_SITE_URL=https://4bderrahmane.com
NEXT_PUBLIC_BLOG_URL=https://blog.4bderrahmane.com
```

For persistent storage, connect a Postgres database through Vercel Marketplace
and set a pooled connection string:

```bash
DATABASE_URL=...
```

The app also accepts Vercel-style Postgres names if your integration provides
them instead:

```bash
POSTGRES_URL=...
POSTGRES_PRISMA_URL=...
POSTGRES_URL_NON_POOLING=...
```

If Postgres variables are missing, kudos falls back to an in-memory store. That
is useful for local development, but it resets on server restart and is not
suitable for production persistence.

## Content

Add or edit posts in `src/content/blog`. Each post is an MDX file and should
export a `metadata` object consumed by `src/lib/blog.ts`.

Personal details, social links, project links, and canonical site URLs live in
`src/lib/site.ts`.
