/* The price slot: one fixed tabular format for every price
   on the site (totem discipline — readable at a glance). */
export default function PriceSlot({ priceFrom }: { priceFrom?: number }) {
  if (priceFrom === undefined) {
    return <span className="price-slot price-slot--consult tnum">Consultar</span>;
  }
  return (
    <span className="price-slot tnum">
      <span className="price-slot__from">Desde</span>${priceFrom}
    </span>
  );
}
