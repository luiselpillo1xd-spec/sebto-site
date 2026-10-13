import Link from "next/link";
import Bunting from "@/components/Bunting";
import Photo from "@/components/Photo";
import PriceSlot from "@/components/PriceSlot";
import ServicePlacard from "@/components/ServicePlacard";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import { getServices } from "@/lib/content";
import { asset } from "@/lib/site-config";

const HOME_GALLERY_RAW = [
  {
    src: "/img/trabajos/flete-mudanza-muebles-800.webp",
    caption: "Muebles protegidos y listos para la mudanza",
    alt: "Interior de la camioneta con muebles empacados y protegidos con plástico durante una mudanza",
  },
  {
    src: "/img/trabajos/flete-equipo-trabajando-800.webp",
    caption: "Cargando la camioneta en la calle",
    alt: "Equipo de trabajo cargando muebles en la camioneta de mudanzas en una calle de la ciudad",
  },
  {
    src: "/img/trabajos/abasto-camioneta-bodega-800.webp",
    caption: "Nuestra camioneta de reparto",
    alt: "Camioneta del Programa Abasto Tlalpan estacionada frente a la bodega de abasto",
  },
  {
    src: "/img/trabajos/flete-interior-caja-01-800.webp",
    caption: "Caja lista para tu encargo",
    alt: "Interior de la caja de la camioneta con cajas de cartón y muebles tapados",
  },
];

/* basePath is not applied to plain string paths — prefix every photo. */
const HOME_GALLERY = HOME_GALLERY_RAW.map((p) => ({ ...p, src: asset(p.src) }));

export default function HomePage() {
  const services = getServices();
  return (
    <>
      <section className="hero">
        <Photo
          src={asset("/img/trabajos/inflable-mario-ninos.webp")}
          alt="Niños brincando en un castillo inflable durante una fiesta infantil"
          className="hero__photo"
          eager
        />
        <div className="hero__scrim" aria-hidden="true" />
        <Bunting className="hero__bunting" />
        <div className="container hero__inner">
          <p className="hero__kicker">Fiestas · Mudanzas · Fletes</p>
          <h1 className="hero__title">
            Renta de
            <br />
            inflables
          </h1>
          <p className="hero__sub">
            Juegos nuevos para tu fiesta y camioneta para tu mudanza. Fotos reales,
            precios claros.
          </p>
          <div className="hero__actions">
            <PriceSlot priceFrom={650} />
            <WhatsAppCTA message="Hola, me interesa rentar un inflable para una fiesta." />
          </div>
        </div>
      </section>

      <section className="section container" aria-labelledby="board-title">
        <div className="board-head">
          <h2 id="board-title">Atracciones</h2>
          <p className="board-head__note">Todos los juegos están nuevos.</p>
        </div>
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

      <div className="container">
        <Bunting />
      </div>

      <section className="section container" aria-labelledby="gallery-title">
        <div className="board-head">
          <h2 id="gallery-title">Trabajos reales</h2>
          <p className="board-head__note">
            <Link href="/galeria/" className="back-link">
              Ver toda la galería
            </Link>
          </p>
        </div>
        <div className="gallery-strip">
          {HOME_GALLERY.map((photo) => (
            <figure className="gallery-frame" key={photo.src}>
              <Photo src={photo.src} alt={photo.alt} />
              <figcaption>{photo.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="section section--tight container" aria-labelledby="abasto-title">
        <div className="abasto">
          <Photo
            src={asset("/img/trabajos/abasto-camioneta-lateral-800.webp")}
            alt="Lateral completo de la camioneta del Programa Abasto Tlalpan con su rotulación"
          />
          <div className="abasto__body">
            <h2 id="abasto-title">También operamos el Programa Abasto Tlalpan</h2>
            <p>
              Nuestras camionetas también llevan producto a la mesa de las familias:
              un proyecto de abasto que apoya a la economía familiar en Tlalpan.
            </p>
            <p>
              Si tu negocio o tu comunidad necesita abasto, escríbenos y platicamos.
            </p>
          </div>
        </div>
      </section>

      <section className="contact-band" aria-labelledby="cta-title">
        <div className="container contact-band__inner">
          <h2 id="cta-title">¿Listo para tu fiesta o tu mudanza?</h2>
          <p>
            Escríbenos por WhatsApp con la fecha y el lugar. Te confirmamos
            disponibilidad y precio el mismo día.
          </p>
          <WhatsAppCTA
            message="Hola, me interesa su servicio. ¿Me ayudan con disponibilidad y precios?"
            variant="amber"
          />
        </div>
      </section>
    </>
  );
}
