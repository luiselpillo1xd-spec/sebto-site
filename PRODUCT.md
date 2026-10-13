# Product

<!-- impeccable:product-schema 1 -->

## Platform
web

## Stack
Next.js (App Router) with static export (`output: 'export'`), deployed to GitHub Pages via GitHub Actions. All catalog content authored as markdown files inside the repo. Chosen by the user after being offered Astro, Eleventy, and plain HTML/CSS alternatives. Tradeoff accepted: static export means no server features (API routes, auth) on GitHub Pages; a future host migration (Vercel/Cloudflare) unlocks those without a rewrite.

## Users
- **Primary: families in CDMX planning a kids' party** who want to rent a bounce castle ("castillo inflable"). They arrive on a phone, from a social link or a WhatsApp forward, and need: what's available, size/kid capacity, starting price, and a one-tap way to ask availability.
- **Secondary: people and small businesses needing a move/haul** (fletes y mudanzas) with a 3.5-ton truck — they need proof the operation is real (photos of loaded trucks) and a fast contact path.
- **Tertiary: community/social-program contacts** who recognize the friend's separate "Programa Abasto Tlalpan" project and want to reach the operator.

## Product Purpose
Conversion surface for a two-line local services business: **renta de inflables para fiestas** + **fletes y mudanzas**. The site exists to turn a visitor into a WhatsApp inquiry. Success = any visitor can reach a specific service and start a WhatsApp chat with a pre-filled message in two taps or fewer.

## Positioning
Local, family-run operator with **new equipment** ("todos los juegos están nuevos"), transparent **starting prices**, honest specs (dimensions, kid capacity, rental duration), and real proof photos. The visible tie to the community food program "Programa Abasto Tlalpan" (a separate project of the same operator, shown as an "otro proyecto" block) is trust a generic rental listing cannot copy.

## Operating Context
- Content is edited manually: edit a markdown file in `content/`, commit, push. No CMS, no admin panel, no accounts.
- Deploy target: GitHub Pages (static files only). Push to `main` deploys automatically. Git history is the change tracker.
- The business's real-world workflow (delivery, setup, pickup) happens offline; the site only generates inquiries — no booking calendar, no payments, in scope now or later.
- Social presence (Facebook, Instagram, TikTok) is a listed task in the expediente but does not exist yet — the footer ships with the social section ready and empty.

## Capabilities and Constraints
- **Sections:** home (brand intro + services grid + gallery + contact), services catalog (3 inflables + flete/mudanza), photo gallery, contact. Articles, tenders, and podcast from the earlier Sebto-derived model are all explicitly replaced by this brief.
- **Prices:** starting prices shown publicly on service cards ("desde $650"), exact quote via WhatsApp (user decision).
- **Language:** Spanish, UI + content (`es-MX`). No i18n routing; structure stays language-ready via a single strings layer.
- **Image-driven navigation** (kept from the Sebto reference): large real photos as entry points, minimal text menus.
- **Mobile-first:** visitors arrive on phones from social/WhatsApp; every CTA is thumb-reachable.
- **Scalable:** adding a new service = one markdown file + photos, no code changes; the gallery grows by dropping files in a folder.
- **Phone number: PENDING** — the expediente's phone field was blank. Every CTA reads one config value; filling it in one place fixes the whole site.
- **Brand name: PENDING, flexible** — the name exists but is delivered later; design uses a placeholder wordmark that swaps trivially.

## Brand Commitments
- **Fresh identity, created in this project** — the expediente lists "Crear logo" as a task, so no logo exists yet. Palette, typography, and logo direction happen in the design phase under the Impeccable skill (Auteur as fallback authority); the name slot stays flexible per the user's decision.
- **Real photos only** — the friend's actual work photos in `public/img/trabajos/` are the imagery. No stock, no generated photos of equipment or people.
- The "Programa Abasto Tlalpan" wrap on the trucks is existing real-world branding: shown as-is, never cropped out or recolored.
- Spanish voice: friendly, direct, local — refined in the design phase (`src/styles/BRAND.md`).

## Evidence on Hand
- `docs/Expediente.docx` — the source brief: budget $1,600; services and specs (Mario Bros castle 3×2 m, 6 kids, $650/6 hrs; Avengers castle 4×3 m, 10 kids/6 hrs; brincolín 2.5 m tall × 4.5 m diameter, 8 kids/24 hrs; 3.5-ton truck, dry box 3×2.5×2 m); tasks: create logo, create Facebook/IG/TikTok.
- `public/img/trabajos/` — six real work photos: castle-with-kids party shot, four truck/moving shots (two showing the Programa Abasto wrap), one cargo-interior shot.
- `Projects/sebto_structure.md` — the original structural reference (image-grid navigation, consistent footer); pattern inspiration only.
- **Absent, must not be fabricated:** brand name, phone number, social account URLs, logo, prices beyond the expediente's, service-area claims beyond what the expediente implies.

## Product Principles
1. **WhatsApp-first** — every service card ends in a chat, not a form.
2. **Proof over polish** — real photos of real jobs carry the page; design frames them, never replaces them.
3. **Honest specs** — dimensions, capacity, duration, and starting price visible before contact; no "consulte" walls.
4. **One-person editable** — the owner (or the user) can change any price or add any service without touching code.
5. **Mobile-first, static-forever** — fast on cheap phones; no server dependencies until a real booking feature demands them.

## Accessibility & Inclusion
WCAG AA contrast, full keyboard navigation with visible focus states, `prefers-reduced-motion` respected, `lang="es-MX"` semantics. Tap targets ≥44px (phone-first audience). WhatsApp/phone links usable by assistive tech. All photos get descriptive Spanish alt text.
