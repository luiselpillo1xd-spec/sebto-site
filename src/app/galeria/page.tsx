import type { Metadata } from "next";
import Photo from "@/components/Photo";
import { asset } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Galería",
  description: "Fotos reales de trabajos anteriores: fiestas con inflables y mudanzas con camioneta.",
};

const PHOTOS_RAW = [
  {
    src: "/img/trabajos/inflable-mario-ninos-800.webp",
    full: "/img/trabajos/inflable-mario-ninos.webp",
    caption: "Fiesta infantil con castillo inflable",
    alt: "Dos niños brincando en el castillo inflable durante una fiesta en un patio",
  },
  {
    src: "/img/trabajos/flete-mudanza-muebles-800.webp",
    full: "/img/trabajos/flete-mudanza-muebles.webp",
    caption: "Muebles protegidos para la mudanza",
    alt: "Muebles empacados con plástico y cobijas dentro de la camioneta durante una mudanza",
  },
  {
    src: "/img/trabajos/flete-equipo-trabajando-800.webp",
    full: "/img/trabajos/flete-equipo-trabajando.webp",
    caption: "Equipo cargando en la calle",
    alt: "Tres trabajadores cargando muebles a la camioneta de mudanzas en una calle",
  },
  {
    src: "/img/trabajos/flete-interior-caja-01-800.webp",
    full: "/img/trabajos/flete-interior-caja-01.webp",
    caption: "Interior de la caja de la camioneta",
    alt: "Interior de la caja de la camioneta con cajas de cartón y muebles tapados",
  },
  {
    src: "/img/trabajos/abasto-camioneta-lateral-800.webp",
    full: "/img/trabajos/abasto-camioneta-lateral.webp",
    caption: "Camioneta del Programa Abasto Tlalpan",
    alt: "Lateral de la camioneta rotulada del Programa Abasto Tlalpan con frutas y verduras",
  },
  {
    src: "/img/trabajos/abasto-camioneta-bodega-800.webp",
    full: "/img/trabajos/abasto-camioneta-bodega.webp",
    caption: "En la bodega de abasto",
    alt: "Camioneta del Programa Abasto Tlalpan estacionada frente a una bodega de carga",
  },
];

/* basePath is not applied to plain string paths — prefix every photo. */
const PHOTOS = PHOTOS_RAW.map((p) => ({ ...p, src: asset(p.src), full: asset(p.full) }));

export default function GaleriaPage() {
  return (
    <>
      <div className="container page-head">
        <h1>Galería</h1>
        <p>
          Fotos reales de trabajos anteriores: fiestas con inflables, mudanzas
          cargadas y las camionetas del Programa Abasto Tlalpan.
        </p>
      </div>
      <section className="container" aria-label="Fotos de trabajos" style={{ paddingBottom: "var(--space-8)" }}>
        <div className="gallery-grid">
          {PHOTOS.map((photo) => (
            <figure className="gallery-frame" key={photo.src}>
              <a href={photo.full} target="_blank" rel="noopener noreferrer">
                <Photo src={photo.src} alt={photo.alt} />
              </a>
              <figcaption>{photo.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}
