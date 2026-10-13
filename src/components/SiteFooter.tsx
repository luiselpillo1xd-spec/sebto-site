/* Footer: awning edge on top, honest pending states for the
   contact channels that don't exist yet. */
import Bunting from "./Bunting";

const PENDING_SOCIALS = ["Facebook", "Instagram", "TikTok"];

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <Bunting />
      <div className="container site-footer__inner">
        <div>
          <p className="site-footer__brand">Nombre pendiente</p>
          <p className="site-footer__note">
            Renta de inflables, fletes y mudanzas. Datos de contacto por confirmar.
          </p>
        </div>
        <div className="site-footer__col">
          <p className="site-footer__label">Redes sociales</p>
          <ul className="site-footer__pending">
            {PENDING_SOCIALS.map((s) => (
              <li key={s}>
                {s} <span className="pending-tag">próximamente</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="site-footer__col">
          <p className="site-footer__label">Contacto</p>
          <ul className="site-footer__pending">
            <li>
              WhatsApp <span className="pending-tag">pendiente</span>
            </li>
            <li>
              Teléfono <span className="pending-tag">pendiente</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="site-footer__base">
        <div className="container">
          <small>© 2026 · Sitio en montaje — nombre, teléfono y redes por confirmar.</small>
        </div>
      </div>
    </footer>
  );
}
