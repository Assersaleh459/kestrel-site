import { serviceIcons } from "./icons";

type Service = { id: string; title: string };

// Positions are physical (left/top), not start/end: the lines are drawn in the same physical space,
// and the picture is the same in both languages.
// Circle centres as a percentage of the picture (left, top). Labels sit on the outer side of each
// circle, so the dashed lines never cross a label. Top circles: label above. Bottom: label below.
const spots = [
  { left: 18, top: 22, labelAbove: true },
  { left: 82, top: 22, labelAbove: true },
  { left: 18, top: 78, labelAbove: false },
  { left: 82, top: 78, labelAbove: false },
];

// A picture of how the services connect: one phone in the middle, the four services around it.
// Decoration only (the service list next to it holds the same words), so it is hidden from screen readers.
export function ServiceHub({ services }: { services: Service[] }) {
  const items = services.slice(0, 4);

  return (
    <div aria-hidden className="relative mx-auto aspect-square w-full max-w-md">
      {/* Lines from the phone to each circle. Drawn first, so the phone and circles sit on top. */}
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full text-accent-text">
        {spots.map((s) => (
          <line
            key={`${s.left}-${s.top}`}
            x1="50"
            y1="50"
            x2={s.left}
            y2={s.top}
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="4 4"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>

      <div className="absolute left-1/2 top-1/2 z-10 w-24 -translate-x-1/2 -translate-y-1/2 rounded-[1.4rem] border-2 border-ink bg-surface p-2 sm:w-28">
        <div className="mx-auto mb-2 h-1 w-8 rounded-full bg-line" />
        <div className="grid grid-cols-2 gap-1.5">
          {items.map((s) => {
            const Icon = serviceIcons[s.id as keyof typeof serviceIcons];
            return (
              <span key={s.id} className="flex aspect-square items-center justify-center rounded-lg bg-soft text-ink">
                <Icon className="h-5 w-5" />
              </span>
            );
          })}
        </div>
        <div className="mx-auto mt-3 h-1.5 w-10 rounded-full bg-accent" />
        <div className="mx-auto mb-1 mt-2 h-1 w-6 rounded-full bg-line" />
      </div>

      {items.map((s, i) => {
        const Icon = serviceIcons[s.id as keyof typeof serviceIcons];
        const spot = spots[i];
        return (
          <div
            key={s.id}
            style={{ left: `${spot.left}%`, top: `${spot.top}%` }}
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-line bg-surface text-ink">
              <Icon className="h-7 w-7" />
            </span>
            <span
              className={`absolute left-1/2 w-32 -translate-x-1/2 text-center text-sm font-semibold leading-snug ${
                spot.labelAbove ? "bottom-full mb-2" : "top-full mt-2"
              }`}
            >
              {s.title}
            </span>
          </div>
        );
      })}
    </div>
  );
}
