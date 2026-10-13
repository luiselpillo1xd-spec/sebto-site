import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Photo from "@/components/Photo";
import PriceSlot from "@/components/PriceSlot";
import SpecTable from "@/components/SpecTable";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import { getService, getServices } from "@/lib/content";

export function generateStaticParams() {
  return getServices().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return { title: service.title, description: service.excerpt };
}

export default async function ServicioDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return (
    <>
      {service.thumbnail && (
        <div className="detail-hero">
          <Photo
            src={service.thumbnail.replace("-800", "")}
            alt={`${service.title} — foto real del trabajo`}
            eager
          />
        </div>
      )}
      <div className="container page-head">
        <p style={{ marginBottom: "var(--space-4)" }}>
          <Link href="/servicios/" className="back-link">
            ← Todas las atracciones
          </Link>
        </p>
        <h1>{service.title}</h1>
      </div>
      <div className="container detail-grid" style={{ paddingBottom: "var(--space-8)" }}>
        <article className="prose">
          {service.body.split("\n\n").map((block, i) => {
            if (block.startsWith("## ")) {
              return <h2 key={i}>{block.slice(3)}</h2>;
            }
            if (block.startsWith("- ")) {
              return (
                <ul key={i}>
                  {block.split("\n").map((li, j) => (
                    <li key={j}>{li.replace(/^- /, "")}</li>
                  ))}
                </ul>
              );
            }
            return <p key={i}>{block}</p>;
          })}
        </article>
        <aside className="detail-panel" aria-label="Ficha del servicio">
          <PriceSlot priceFrom={service.priceFrom} />
          <SpecTable specs={service.specs} duration={service.duration} />
          <WhatsAppCTA
            message={service.waMessage}
            label={`Apartar ${service.title.toLowerCase()}`}
          />
        </aside>
      </div>
    </>
  );
}
