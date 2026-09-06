# Novand — Astro + Tailwind corporate site

A static-first corporate site for an integrated technology infrastructure and systems company.

## Stack

- Astro
- TypeScript
- Tailwind CSS 4 via the official Vite plugin
- Astro content collections with typed Zod schemas
- Astro sitemap integration

## Start

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## Replace before launch

- `site` in `astro.config.mjs`
- contact placeholders in `src/data/site.ts`
- `public/robots.txt` sitemap hostname
- any illustrative project placeholders in `src/content/projects.json`
- Open Graph image metadata/assets if a brand social image is available
- form `action` in `src/pages/contact.astro`

The current project entries are intentionally marked as illustrative placeholders and do not assert real clients, outcomes, metrics, certifications, awards, or geographic presence.
