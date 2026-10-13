import type { Metadata } from "next";
import WhatsAppCTA from "@/components/WhatsAppCTA";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Escríbenos por WhatsApp para rentar un inflable o agendar un flete o mudanza.",
};

const CHANNELS = [
  { name: "WhatsApp", status: "pendiente" },
  { name: "Teléfono", status: "pendiente" },
  { name: "Facebook", status: "próximamente" },
  { name: "Instagram", status: "próximamente" },
  { name: "TikTok", status: "próximamente" },
];

export default function ContactoPage() {
  return (
    <>
      <div className="container page-head">
        <h1>Contacto</h1>
        <p>
          Estamos montando este sitio. Los canales oficiales se activan pronto;
          mientras tanto, esto es lo que necesitamos saber cuando nos escribas.
        </p>
      </div>
      <div className="container stack-7" style={{ paddingBottom: "var(--space-8)" }}>
        <section aria-labelledby="canales-title">
          <h2 id="canales-title" className="section-title">
            Canales
          </h2>
          <ul className="channel-list">
            {CHANNELS.map((channel) => (
              <li key={channel.name}>
                {channel.name}
                <span className="pending-tag">{channel.status}</span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="datos-title">
          <h2 id="datos-title" className="section-title">
            Qué información enviar
          </h2>
          <div className="prose">
            <ul>
              <li>El servicio que necesitas: inflable, brincolín, flete o mudanza.</li>
              <li>La fecha y, si es fiesta, la dirección del evento.</li>
              <li>Para mudanzas: qué se mueve y de dónde a dónde.</li>
            </ul>
            <p>Con eso te confirmamos disponibilidad y precio.</p>
          </div>
          <div style={{ marginTop: "var(--space-5)" }}>
            <WhatsAppCTA
              message="Hola, me interesa su servicio. Les comparto los detalles de mi evento / mudanza."
              label="Escribir por WhatsApp"
            />
          </div>
        </section>
      </div>
    </>
  );
}
