# src/components/ — reusable UI

Every component here consumes design tokens from `src/styles/` only — no hard-coded colors, spacing, or font sizes. If a component needs a new token, add it to the tokens file, don't inline a value. Business facts (phone, name, socials) come from `src/lib/site-config.ts`, never hard-coded.

## Planned components (Phase 1)

| Component | Why it exists |
|---|---|
| `SiteHeader` | Minimal nav (placeholder wordmark + Servicios/Galería/Contacto). The homepage grid does most navigation; the header stays quiet. |
| `SiteFooter` | Contact + social links (empty set until accounts exist) + "Programa Abasto Tlalpan" credit. Config-driven so link changes never touch markup. |
| `ServiceCard` | One service in the homepage grid / catalog: real photo, title, key spec, "desde" price, WhatsApp CTA. The site's workhorse — every card is a conversion path. |
| `SpecTable` | Renders the frontmatter `specs` map (dimensiones, capacidad, duración) as a clean table. One renderer for every service page. |
| `WhatsAppCTA` | The conversion button: `wa.me` link with the service's pre-filled message. Renders a visible "pending" state until the number exists in site-config, without breaking layout. |
| `GalleryGrid` | The gallery page + homepage strip: real work photos, lazy-loaded, Spanish alt text. |
| `OtherProjectBlock` | The "Programa Abasto Tlalpan" trust block on the homepage — a separate project of the same operator, shown as-is with its existing wrap visible. |
| `SiteHeader`/`SiteFooter` | Shared shell across every route — one visual system, no drift. |

## Conventions

- Server components by default; add `"use client"` only when interaction demands it (static export punishes unnecessary client JS).
- Service detail pages render the optional markdown body through one shared renderer — one place to fix long-form typography.
- Photos: never hard-code `<img>` — one `Photo` component owns sizing, lazy loading, and alt text.
- The Mario Bros/Avengers theming belongs to the physical inflables only; no Nintendo/Marvel marks in the site's own UI.
