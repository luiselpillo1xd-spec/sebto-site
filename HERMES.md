# HERMES.md — Repo routing map

Read this first. It says where everything is, what it does, and where to edit. Product truth: [PRODUCT.md](PRODUCT.md). Build plan: [PRD.md](PRD.md).

## Ground rules
- **Language:** the site ships Spanish (`es-MX`). Repo/file/folder names stay English for tooling friendliness.
- **Never invent facts.** Prices, specs, and claims come only from `docs/Expediente.docx`. Brand name, phone, and socials are PENDING — they live in one config file, never scattered.
- **Real photos only** — `public/img/trabajos/` is the imagery source. No stock, no generated photos of equipment/people.
- **Design authority:** Impeccable skill (primary), Auteur (fallback). Design decisions live in `src/styles/BRAND.md`; the visual world/DESIGN.md file is created when the design phase starts.
- **Stack:** Next.js App Router, static export, GitHub Pages. No server features, no CMS, no accounts.

## Top level

| Path | What it is |
|---|---|
| `PRODUCT.md` | Product record (impeccable schema): users, purpose, constraints, principles. Update when product truth changes. |
| `PRD.md` | Build plan: architecture, content model, phases, acceptance criteria. |
| `HERMES.md` | This file. |
| `README.md` | Human setup/run/deploy instructions. |
| `docs/Expediente.docx` | **The source brief** — services, specs, prices, budget, tasks. The single source of factual truth. |
| `content/` | Site content as markdown (services catalog). The site cannot show anything that isn't here or in `src/lib/site-config`. |
| `src/` | Application code. Never hard-code content or business facts in here (except via `site-config`). |
| `public/` | Static assets. `public/img/trabajos/` holds the real work photos (originals). |
| `.github/workflows/` | GitHub Actions — build + deploy to Pages on push to `main`. |

## content/ — the CMS

| Path | What it is |
|---|---|
| `content/CONTENT.md` | How to add/edit a service. Frontmatter contract lives there. |
| `content/servicios/` | One `.md` per service (3 inflables + flete). Filename = URL slug. |

## src/

| Path | What it is |
|---|---|
| `src/app/` | Next.js routes: `/`, `/servicios`, `/servicios/[slug]`, `/galeria`, `/contacto`. |
| `src/lib/site-config.ts` | **The only place** with business facts (`siteConfig`: phone, WhatsApp, socials, name). Filling the phone here fixes every CTA. |
| `src/lib/content.ts` | Content loading: markdown parsing (gray-matter), frontmatter validation, catalog queries. The only code that reads `content/`. Re-exports `siteConfig`/`waLink` from `site-config.ts`. |
| `src/components/` | Reusable UI — see `WHY.md` there for intent. Key ones: `ServicePlacard`, `Photo`, `WhatsAppCTA`, `SpecTable`, `PriceSlot`, `Bunting`, `SiteHeader`, `SiteFooter`. |
| `src/styles/` | Design tokens + theme. `BRAND.md` holds brand voice, palette rationale, type choices. Components consume tokens; nothing else defines colors/spacing. |

## public/

| Path | What it is |
|---|---|
| `img/trabajos/` | The six real work photos (JPEG originals): inflable party shot, flete/mudanza shots, Programa Abasto truck shots. Phase 1 derives optimized webp from these. The Programa Abasto wrap is existing branding — never crop it out. |
| (later) | logo SVG, favicon — arrive in Phase 2 with the brand name. |

## Change workflow

1. Content change (price, new service, photo) → edit/add a `.md` in `content/servicios/` (+ image) → commit → push → auto-deploys.
2. Business facts (phone, socials, name) → edit `siteConfig` in `src/lib/content.ts` only → commit → push.
3. Code/design change → edit `src/` → `npm run build` locally to verify → commit → push.
4. Product/scope change → update `PRODUCT.md` + `PRD.md` in the same commit as the change they describe.
