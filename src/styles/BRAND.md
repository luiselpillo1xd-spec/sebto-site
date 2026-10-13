# src/styles/ — design system & brand

This folder is the single source of visual truth. Components consume tokens from here; nothing else in `src/` defines a color, font, or spacing value.

## Files (Phase 1)

- `tokens.css` — color palette, type scale, spacing scale, radii, shadows (planned; created when the design phase starts).
- `globals.css` — base reset, typography defaults, token wiring.

## Brand voice & identity

**Name: PENDING** (flexible per user — design around a placeholder wordmark). **Logo: does not exist yet** — creating it is an explicit expediente task, so it gets designed in the Impeccable design phase, not improvised here.

What IS binding today (from the expediente + user decisions):

- **Voice: friendly, direct, local Mexican Spanish.** A family-run business talking like a person: warm, concrete, zero corporate jargon. Think "te llevamos tu mudanza" not "soluciones logísticas integrales".
- **Real photos are the identity for now** — bright, candid, documentary shots of the castle at real parties and the truck mid-job. Design frames them; it never competes with them.
- **The Programa Abasto Tlalpan wrap is existing real-world branding** — its yellow/red/blue palette is part of the friend's visual world; the site's palette should feel compatible with it, not clash.
- **No trademarked borrowed marks** — the site's own brand never uses Nintendo/Marvel imagery even though the inflables are themed.

Palette, typography pairing, and logo direction get decided and documented here during the design phase (Impeccable primary, Auteur fallback), following that skill's rules: committed non-default choices, WCAG-checked contrast, written rationale — not category reflexes.

## Decided: La Feria de Pueblo (Impeccable seed e44665cb)

The visual world is locked and built (Phase 1). Direction contract lives in `.impeccable/surfaces/src-app-page-tsx.md`; `DESIGN.md` gets written by the finish documenter from the built result.

**Palette** (enamel paints on daylight canvas — scene: phone outdoors/in a bright room, so light ground):
- `--canvas #FBF4E4` ground · `--ink #26201A` text · `--ink-soft #5C5142` secondary (tinted, never gray)
- `--rojo #C1272D` primary brand · `--amarillo #F2B705` placards/price · `--azul #14568C` links/focus · bunting-only `--verde #2F7A4F`, `--rosa #D46A8A`

**Type**: display **Alfa Slab One** (fairground wood-type slab) + body **Archivo** (grotesk, variable, tabular numerals) — both self-hosted woff2 in `fonts/`, no runtime CDN. Why not defaults: a slab display is the fair placard's own voice; Inter/system sans were refused as category reflex.

**Signature vocabulary**: numbered atracción placards with ruled end-label blocks (identical field order), ticket-stub CTAs with punched notches + perforation, bunting strips as dividers (one authored motion: the sway), awning stripe bands, one fixed tabular price slot.

**Raised by the challenger hand**: photo authority (full-bleed hero), end-label grammar, totem price slots, tally-board specs, material continuity (one canvas ground runs the page).

## Constraints that already apply

- WCAG AA contrast (≥4.5:1 body text) — non-negotiable.
- `prefers-reduced-motion` respected by every animation.
- Spanish-language typography: correct accents, `lang="es-MX"`, hyphenation considered for long words.
- Mobile-first: designed at 390px first, scaled up.
