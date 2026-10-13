import type { Metadata } from "next";
import "@/styles/globals.css";
import "@/styles/pages.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: {
    default: "Renta de inflables, fletes y mudanzas",
    template: "%s · Renta de inflables y fletes",
  },
  description:
    "Renta de castillos inflables y brincolín para fiestas, más servicio de fletes y mudanzas con camioneta de 3.5 toneladas. Juegos nuevos, precios claros, entrega en tu evento.",
  openGraph: {
    type: "website",
    locale: "es_MX",
    images: ["/img/trabajos/inflable-mario-ninos.webp"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-MX">
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
