# DESIGN.md — La Feria de Pueblo

The design world as **built**. Tokens live in `src/styles/tokens.css`; this file explains why they are what they are, so the system survives without re-deriving it.

Direction locked under the **impeccable** skill (auteur as fallback authority). Assigned from a roll of seven grounded candidates; **Rótulo de Camión** (hand-painted truck signage) was the runner-up and remains a legitimate alternate if the client rejects the feria read.

---

## 1. The world

The **Mexican feria** — the town fair. Striped booth canvas, bunting strung between poles, attraction boards with hand-set placards, price boards, ticket stubs.

Chosen because the product literally belongs there: bounce castles are feria attractions. The alternative, hand-painted truck signage, was competitive and more predictable; feria won on cultural grounding for a **kids' party** business.

**Honest risk, stated at lock time:** feria slides into cheap-carnival cliché if stripes stay decorative. The guardrail is that stripes are structural (booth dividers), real photography carries full-bleed weight, and the canvas material is restrained rather than festive-bright.

## 2. Ground and color

One continuous ground runs the whole page; sections are **booths on it**, not isolated strips.

| Token | Value | Role |
|---|---|---|
| `--canvas` | `#fbf4e4` | warm daylight canvas — the awning ground |
| `--canvas-deep` | `#f3e8cd` | second tone for banding |
| `--ink` | `#26201a` | warm near-black, all body text |
| `--ink-soft` | `#5c5142` | secondary, **tinted from the hue — never gray** |
| `--rojo` | `#c1272d` | enamel red — primary brand color |
| `--amarillo` | `#f2b705` | enamel yellow — the placard color |
| `--azul` | `#14568c` | enamel blue — links, focus, accents |
| `--verde` / `--rosa` | `#2f7a4f` / `#d46a8a` | bunting — **decorative only, rosa never text** |

Enamel rojo/amarillo/azul on daylight canvas are the actual fairground colors, and they match the friend's existing truck wrap (Programa Abasto) — his own branding, not borrowed.

Contrast discipline: `amarillo-deep` (`#8a6800`) and `rojo-deep` exist because raw yellow on canvas fails AA for small text. **Decorative color never carries text.**

## 3. Type

- **Display:** Alfa Slab One — condensed wood-type, the fairground placard.
- **Body:** Archivo — humanist grotesk, carries all data and specs.

Both **self-hosted** (`src/styles/fonts/`, woff2). No runtime font CDN — a third-party request is a privacy and performance liability on a small business site.

Scale is fluid via `clamp()`, floor `--text-xs: 0.8125rem` (13px). **Rendered text never goes under 12px** — enforced by the DOM probe in `scripts/shoot.mjs`, not by eye.

## 4. Component vocabulary

| Pattern | What it is |
|---|---|
| **Atracción board** | the services listing — numbered `01`, `02`, `03`, `04` like fairground attractions |
| **Placard** | `ServicePlacard` — a service as a booth sign: photo, title, specs, price |
| **End-label** | one ruled info block, **identical field order on every service** |
| **Totem slot** | `PriceSlot` — all prices and measurements in one fixed tabular format, readable at a glance |
| **Ticket stub** | `WhatsAppCTA` — perforated-edge button carrying a pre-filled message |
| **Bunting band** | `Bunting` — strip dividers between sections |
| **Photo wall** | `galeria` — the fairground photo wall |

## 5. Voice

Warm, direct, neighborly. Mexican Spanish (`es-MX`), plain words, no marketing gloss. The site speaks like someone who rents these every weekend, not a rental company's landing page. Prices are honest ("desde $650", or **"Consultar"** when the expediente didn't state one) — never invented to look complete. See `src/styles/BRAND.md`.

## 6. Conversion

WhatsApp is the single conversion path, on every service, in ≤2 taps. While the number is unknown, `waLink()` returns `null` and the CTA renders a **visible pending state** — a visible gap beats a dead button.

## 7. Rules for future work

1. **Tokens only.** No hard-coded colors, spacing, or font sizes in components. New value → new token.
2. **Decorative color never carries text.** If it must, use the `-deep` variant.
3. **Prices trace to the expediente.** Unknown price renders "Consultar". A wrong number is worse than a missing one.
4. **One canvas.** Sections are booths on the same ground; don't isolate them into their own backgrounds.
5. **Verify by eye, not by detector.** A clean detector shipped a wrong hero photo, an invisible CTA, and a wordmark cropped mid-word in one session.

## 8. Status

Phase 1 complete. Placeholder wordmark pending the brand name; logo, favicon, and OG images land with it. See `PRD.md` §6 for pending client inputs.