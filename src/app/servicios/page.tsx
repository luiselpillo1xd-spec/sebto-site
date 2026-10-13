import type { Metadata } from "next";
import ServicePlacard from "@/components/ServicePlacard";
import { getServices } from "@/lib/content";

export const metadata: Metadata = {
  title: "Atracciones",
  description:
    "Catálogo de castillos inflables, brincolín y servicio de fletes y mudanzas: dimensiones, capacidad y precios.",
};

export default function ServiciosPage() {
  const services = getServices();
  return (
    <>
      <div className="container page-head">
        <h1>Atracciones</h1>
        <p>
          Castillos inflables, brincolín y camioneta de fletes. Cada ficha trae
          dimensiones, capacidad y precio desde. Todos los juegos están nuevos.
        </p>
      </div>
      <section className="container" aria-label="Catálogo de servicios" style={{ paddingBottom: "var(--space-8)" }}>
        <div className="board">
          {services.map((service, i) => (
            <ServicePlacard
              key={service.slug}
              service={service}
              index={i}
              wide={service.category === "flete"}
            />
          ))}
        </div>
      </section>
    </>
  );
}
