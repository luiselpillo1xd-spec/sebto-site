/* WhatsApp conversion ticket. The site's single CTA shape.
   When the number exists it opens a pre-filled chat; until then
   it renders an honest "pending" ticket instead of a dead link. */
import { waLink } from "@/lib/content";

export default function WhatsAppCTA({
  message,
  label = "Aparta tu fecha por WhatsApp",
  variant = "rojo",
}: {
  message: string;
  label?: string;
  variant?: "rojo" | "amber";
}) {
  const href = waLink(message);

  if (!href) {
    return (
      <span
        className="ticket ticket--pending"
        aria-disabled="true"
        title="Número de WhatsApp pendiente de confirmar"
      >
        <span className="ticket__main">{label}</span>
        <span className="ticket__stub">Pendiente</span>
      </span>
    );
  }

  return (
    <a
      className={`ticket${variant === "amber" ? " ticket--amber" : ""}`}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="ticket__main">{label}</span>
      <span className="ticket__stub">WhatsApp</span>
    </a>
  );
}
