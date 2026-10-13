/* Decorative bunting pennants — the feria's rope of flags.
   Authored SVG, one consistent geometry, palette colors only.
   Sway animation lives in globals.css (reduced-motion aware). */
const COLORS = ["var(--rojo)", "var(--amarillo)", "var(--azul)", "var(--verde)", "var(--rosa)"];

export default function Bunting({ className = "" }: { className?: string }) {
  const pennants = Array.from({ length: 30 }, (_, i) => {
    const x = i * 40;
    const fill = COLORS[i % COLORS.length];
    return <path key={i} d={`M ${x} 0 L ${x + 34} 0 L ${x + 17} 22 Z`} fill={fill} />;
  });
  return (
    <svg
      className={`bunting-band ${className}`}
      viewBox="0 0 1200 24"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="0" y="0" width="1200" height="2.5" fill="var(--ink)" />
      {pennants}
    </svg>
  );
}
