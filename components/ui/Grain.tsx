/**
 * Fixed film grain. Kept beneath interactive chrome and almost imperceptible.
 */
export default function Grain() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-40 opacity-[0.06] mix-blend-soft-light"
    >
      <svg className="h-full w-full">
        <filter id="tblack-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.82"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#tblack-grain)" />
      </svg>
    </div>
  );
}
