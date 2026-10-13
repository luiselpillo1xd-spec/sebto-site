/* End-label grammar: every service shows its specs as the same
   ruled list, same field order, tabular numerals everywhere. */
export default function SpecTable({
  specs,
  duration,
}: {
  specs: Record<string, string>;
  duration?: string;
}) {
  const rows: [string, string][] = Object.entries(specs);
  if (duration) rows.push(["Duración", duration]);
  return (
    <dl className="end-label__rows">
      {rows.map(([term, value]) => (
        <div className="end-label__row" key={term}>
          <dt>{term}</dt>
          <dd className="tnum">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
