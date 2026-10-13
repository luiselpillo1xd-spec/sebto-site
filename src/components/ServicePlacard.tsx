/* One atracción on the fair's board: photo (or designed fallback),
   numbered end-label, spec rows, price slot, WhatsApp ticket. */
import Link from "next/link";
import type { Service } from "@/lib/content";
import Photo from "./Photo";
import PriceSlot from "./PriceSlot";
import SpecTable from "./SpecTable";
import WhatsAppCTA from "./WhatsAppCTA";

const ALT: Record<string, string> = {
  inflable: "Castillo inflable en una fiesta infantil",
  flete: "Camioneta de flete cargada para una mudanza",
};

export default function ServicePlacard({
  service,
  index,
  wide = false,
}: {
  service: Service;
  index: number;
  wide?: boolean;
}) {
  const num = String(index + 1).padStart(2, "0");
  return (
    <article className={`placard${wide ? " placard--wide" : ""}`}>
      {service.thumbnail ? (
        <Photo
          src={service.thumbnail}
          alt={`${service.title} — foto real del trabajo`}
          className="placard__photo"
        />
      ) : (
        <div className="placard__fallback" role="img" aria-label={`${service.title} — foto pendiente`}>
          <span>Foto pendiente</span>
        </div>
      )}
      <div className="end-label">
        <div className="end-label__head">
          <span className="end-label__num tnum" aria-hidden="true">
            {num}
          </span>
          <h3 className="end-label__title">
            <Link href={`/servicios/${service.slug}/`} className="placard__title-link">
              {service.title}
            </Link>
          </h3>
        </div>
        <SpecTable specs={service.specs} duration={service.duration} />
        <p className="end-label__excerpt">{service.excerpt}</p>
        <div className="placard__footer">
          <PriceSlot priceFrom={service.priceFrom} />
          <WhatsAppCTA message={service.waMessage} label="Apartar" />
        </div>
      </div>
    </article>
  );
}
