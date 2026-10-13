# PRD — Renta de Inflables + Fletes (working title; brand name pending)

> Product truth lives in [PRODUCT.md](PRODUCT.md); this document is the **build plan** — architecture, scope, phases, and acceptance criteria. Repo navigation lives in [HERMES.md](HERMES.md).
> Status: **Phase 1 build complete locally** (2026-10-12): all routes built, typecheck clean, 11/11 pages prerendered, 18 captures clean (390/768/1440), detector zero findings, GitHub Actions workflow written but **never run**. Not yet committed to git (zero commits) and no remote configured. Pending: GitHub repo + Pages setup, Phase 2 brand inputs (name, phone, 2 photos, 3 prices).

## 1. Summary

A Spanish-language (es-MX) conversion site for a local services business with two lines: **renta de inflables para fiestas** (3 units) and **fletes y mudanzas** (3.5-ton truck). Image-driven, mobile-first, WhatsApp-first. Content (services, prices, specs, gallery) is authored as markdown/photos in this repo and deployed statically to GitHub Pages. Visually a fresh identity designed under the Impeccable skill (Auteur as fallback authority). Structurally inspired by Sebto.media's image-grid navigation; the media-outlet content model is replaced.

## 2. Decided (durable)

| Decision | Value |
|---|---|
| Stack | Next.js App Router, static export (`output: 'export'`) |
| Hosting | GitHub Pages via GitHub Actions (push to `main` → deploy) |
| Content | Markdown files in `content/`, frontmatter-driven, edited via git only |
| Language | Spanish, `es-MX`; i18n-ready structure, no i18n routing in Phase 1 |
| Sections | Home · Servicios (inflables + fletes) · Galería · Contacto. No articles/tenders/podcast |
| Navigation model | Image-grid homepage (real photos as entry points), minimal text menus |
| Pricing model | Starting prices public ("desde $650"), exact quote via WhatsApp |
| Primary conversion | WhatsApp deep link with pre-filled message, from every service |
| Identity | Fresh, created in-project (expediente task: "Crear logo"); placeholder wordmark until name arrives |
| Accounts/CMS | Out of scope — manual markdown is the CMS |

## 3. Architecture

```
/                    home: brand intro + services image grid + gallery strip + "otro proyecto" + contact
/servicios           full catalog listing
/servicios/[slug]    service detail: photo(s), spec table, "desde" price, WhatsApp CTA (pre-filled msg)
/galeria             photo gallery (all of public/img/trabajos/, grouped by category)
/contacto            phone, WhatsApp, social links (config-driven), service area note
```

- **Content layer:** `src/lib/` loads `content/servicios/*.md` at build time (gray-matter + markdown renderer). Build-time validation fails on malformed frontmatter instead of shipping broken pages.
- **Design world:** "La Feria de Pueblo" — the Mexican feria (striped booth canvas, bunting, hand-set placards, ticket-stub CTAs). Locked under the Impeccable skill; tokens in `src/styles/tokens.css`, rationale in `DESIGN.md`.
- **Site config (single source):** `src/lib/site-config.ts` — phone number, WhatsApp number, email, social URLs (empty array until accounts exist), business name placeholder. The blank expediente phone field becomes one value here, never scattered. `src/lib/content.ts` re-exports it so content and config can be imported from one place.
- **Design system:** tokens (color, type scale, spacing) in `src/styles/`; components consume tokens only.
- **Specs as data:** dimensions/capacity/duration live in frontmatter → rendered as a spec table; changing a price never touches markup.
- **Image handling:** Phase 1 ships optimized webp derived from `public/img/trabajos/` originals (ffmpeg available); graceful designed fallback when a service lacks a photo.
- **Scalability:** catalog grows by files (new inflable = one .md + photos); gallery grows by folder; hundreds of images stay static-hosted.

## 4. Content model

```yaml
# content/servicios/<slug>.md
title: "Castillo inflable Mario Bros"
category: inflable          # inflable | flete
price_from: 650             # MXN, optional — omit = "Consultar"
duration: "6 hrs de renta"  # human string
specs:                      # rendered as a spec table
  dimensiones: "3 × 2 m"
  capacidad: "6 niños"
excerpt: "Una línea para la tarjeta."
thumbnail: /img/trabajos/inflable-mario-ninos.webp
gallery: []                 # optional extra photos
featured: true              # shows on homepage grid
wa_message: "Hola! Me interesa el castillo Mario Bros"   # pre-filled WhatsApp text
draft: false
```

Source of truth for specs/prices: `docs/Expediente.docx`. Prices/descriptions may only come from it — nothing invented.

## 5. Phases

**Phase 0 — Planning (done).** Expediente absorbed, docs rewritten, real photos imported to `public/img/trabajos/`, git repo live.

**Phase 1 — Skeleton + design system + core pages.** *(code complete; deploy half outstanding)*
Scaffold Next.js (static export), tokens + type system, layout (header/footer/WhatsApp CTA), homepage with services grid, `/servicios` + detail templates populated with the 4 real services from the expediente, `/galeria` with the 6 real photos, GH Pages pipeline. Placeholder wordmark.
*Acceptance:* ✅ every route renders at 390/768/1440 without overflow (18/18 captures clean); ✅ design detector zero findings; ✅ adding a new service = one markdown file + photos (proven — removing `content/servicios/` fails the build with `generateStaticParams()` returning an empty array); ✅ every service card reaches WhatsApp in ≤2 taps (renders a visible "pending" state while the number is unknown); ⬜ **outstanding: push to `main` deploys** — no commit, no remote, workflow never executed.

**Phase 2 — Brand + real data finalization.**
Name arrives → wordmark, favicon, title, OG images. Phone arrives → `src/lib/site-config.ts` filled, WhatsApp flows verified live. *(Design direction already decided and implemented — "La Feria de Pueblo", see `DESIGN.md`; remaining here is the logo/wordmark and final palette tuning once the name lands.)* Alt text in Spanish verified. Local SEO: `LocalBusiness` schema, es-MX metadata, sitemap.
*Acceptance:* friend approves the live site; every service page converts to a real WhatsApp chat; LCP < 2.5s on mobile; no "PENDING" markers left in rendered pages.

**Phase 3 — Future (explicitly out of scope now).**
"Novedades" posts section (cheap add: one content folder + one route), analytics, TikTok/FB/IG links as accounts get created, booking calendar (requires host migration), FAQ page, reviews/testimonials.

## 6. Pending external inputs

- **Brand name** — flexible per user; placeholder until delivered. Blocks Phase 2 finalization only.
- **Phone/WhatsApp number** — expediente field blank. Blocks live conversion testing.
- **Social account URLs** — accounts don't exist yet (expediente task). Footer ready, empty.
- **Service area / city claims** — expediente doesn't state coverage; site claims none until told.

## 7. Risks

- **Static export ceiling** — a future booking feature needs a host change. Accepted; documented in PRODUCT.md.
- **Trademarked themes** — the castles are Mario Bros/Avengers themed; photos of the physical units are fine to show, but the *site's own* brand must not borrow Nintendo/Marvel marks (logo, name, copy).
- **Placeholder-name debt** — cheap to swap before launch, expensive after indexing; freeze name + slugs at Phase 2.
- **Photo volume** — image-driven design with phone-camera originals: optimization (webp, sized) is a Phase 1 requirement, not polish.
