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