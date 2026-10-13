/* Header: the fair board's top edge. The wordmark sits on an
   unpainted plaque until the brand name arrives (Phase 2). */
import Link from "next/link";

const NAV = [
  { href: "/servicios/", label: "Atracciones" },
  { href: "/galeria/", label: "Galería" },
  { href: "/contacto/", label: "Contacto" },
];

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link href="/" className="wordmark" aria-label="Inicio — nombre del negocio pendiente">
          <span className="wordmark__plaque">Nombre pendiente</span>
        </Link>
        <nav className="site-nav" aria-label="Principal">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="site-nav__link">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
