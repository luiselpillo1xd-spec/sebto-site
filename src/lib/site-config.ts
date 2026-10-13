/* Business facts live ONLY here (see HERMES.md). Fill these when the friend
   provides them; every CTA across the site reads them. Nothing else in the
   codebase may hard-code a phone number, name, or social handle. */

export const siteConfig = {
  /* PENDING — brand name arrives Phase 2; site ships a placeholder */
  businessName: process.env.NEXT_PUBLIC_BUSINESS_NAME ?? "",
  /* PENDING — expediente's phone field was blank */
  phone: process.env.NEXT_PUBLIC_PHONE ?? "",
  /* derived: digits only, country code first, e.g. "5215512345678" */
  whatsappNumber: "",
  /* PENDING — accounts don't exist yet (expediente task) */
  socials: [] as { label: string; url: string }[],
  email: "", // PENDING
};

/** Returns a wa.me link with a pre-filled message, or null while the number is
    unknown — callers render a visible "pending" state instead of a dead button. */
export function waLink(message: string): string | null {
  if (!siteConfig.whatsappNumber) return null;
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/* Deploy path prefix. Empty locally, "/<repo>" on GitHub Pages. */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefixes a root-relative public/ path with the deploy base path.
    Next applies basePath to JS/CSS automatically but NOT to plain string paths
    in markdown frontmatter or hand-written src="" — without this every image
    404s on a project-pages deploy while the page itself loads fine.
    Absolute URLs and already-prefixed paths pass through untouched. */
export function asset(path: string | undefined): string {
  if (!path) return "";
  if (/^(https?:)?\/\//.test(path)) return path;
  if (!path.startsWith("/")) return path;
  if (BASE_PATH && path.startsWith(BASE_PATH + "/")) return path;
  return `${BASE_PATH}${path}`;
}