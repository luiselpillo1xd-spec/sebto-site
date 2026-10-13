# Renta de Inflables + Fletes (working title)

Spanish-language (es-MX) conversion site for a local services business: **renta de inflables para fiestas** + **fletes y mudanzas**. Image-driven, mobile-first, WhatsApp-first. Content authored as markdown in this repo, deployed statically to GitHub Pages.

> **Status: Phase 0 (planning complete).** The site itself is not built yet. Product truth: [PRODUCT.md](PRODUCT.md) · Build plan: [PRD.md](PRD.md) · Repo map: [HERMES.md](HERMES.md) · Source brief: `docs/Expediente.docx`.

## Stack

Next.js (App Router, static export) · services content in `content/servicios/` · GitHub Actions → GitHub Pages.

## Setup (works once Phase 1 scaffolding lands)

```bash
npm install
npm run dev      # local dev server
npm run build    # static export check
```

## Deploy

Push to `main` → GitHub Actions builds and publishes to GitHub Pages. First-time setup: repo Settings → Pages → Source: **GitHub Actions**.

## Adding content

See [content/CONTENT.md](content/CONTENT.md). Short version: add a service `.md` with frontmatter (specs/price/photo), push, done. Business facts (phone, name, socials) go in `src/lib/site-config.ts` — one file, every CTA updates.
