# content/ — the site's CMS

Everything the site's catalog shows lives here as markdown. Business facts (phone, name, socials) do NOT live here — they're in `src/lib/site-config.ts`.

## Layout

- `servicios/` — one `.md` per service. The filename becomes the URL slug: `castillo-mario-bros.md` → `/servicios/castillo-mario-bros`.

## Adding a service

1. Copy the contract below into `servicios/<slug>.md` (lowercase, hyphenated filename, no accents/spaces).
2. Photos go in `public/img/trabajos/` and are referenced as `/img/trabajos/<file>`.
3. Commit + push. The build validates the frontmatter and fails loudly if required fields are missing.

```yaml
---
title: "Castillo inflable Mario Bros"
order: 1                 # position on the board (1 = first); default 99 sorts last
category: inflable       # inflable | flete
price_from: 650          # MXN — omit the line entirely = "Consultar"
duration: "6 hrs de renta"
specs:
  dimensiones: "3 × 2 m"
  capacidad: "6 niños"
excerpt: "Una línea corta para la tarjeta del catálogo."
thumbnail: /img/trabajos/inflable-mario-ninos-800.webp   # OPTIONAL — missing = designed "Foto pendiente" fallback card
gallery: []                 # optional: ["/img/trabajos/otra-foto.webp"]
featured: true              # reserved: homepage highlight
wa_message: "Hola! Me interesa el castillo inflable Mario Bros"
draft: false
---
Optional markdown body for extra details below the specs table.
```

## Rules

- **Specs and prices come only from `docs/Expediente.docx`.** If a new service isn't in the expediente, get the real numbers from the friend first — never invent dimensions, capacity, or prices.
- `draft: true` keeps unfinished entries out of the site — the safe way to work in the repo.
- Every entry needs a thumbnail (image-driven navigation depends on it); if a photo is genuinely missing, use the designed fallback card rather than shipping a blank rectangle.
- `wa_message` is what the visitor's WhatsApp opens with — write it in natural, friendly Spanish, specific to that service.
- Content is written in **Spanish (es-MX)**. Voice guidance lives in `src/styles/BRAND.md`.

## Current catalog (from the expediente)

| Slug | Service | Key spec | Price |
|---|---|---|---|
| `castillo-mario-bros` | Castillo inflable Mario Bros | 3×2 m, 6 niños, 6 hrs | $650 |
| `castillo-avengers` | Castillo inflable Avengers | 4×3 m, 10 niños, 6 hrs | consultar |
| `brincolin` | Brincolín | 2.5 m alto × 4.5 m diámetro, 8 niños, 24 hrs | consultar |
| `fletes-mudanzas` | Fletes y mudanzas | camioneta 3.5 t, caja seca 3×2.5×2 m | consultar |

*(Prices marked "consultar" because the expediente lists only the $650 figure — the rest get real numbers from the friend; they are not invented.)*
