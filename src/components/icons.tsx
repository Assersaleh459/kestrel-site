// Simple line icons drawn for this site (no icon package, no brand marks).
type IconProps = { className?: string };

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
  "aria-hidden": true,
};

export function CameraIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M3 7h12l3 3-3 3H3z" />
      <path d="M6 13v3H4m14-6 3-2v6l-3-2" />
    </svg>
  );
}

export function HomeIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M3 11 12 4l9 7" />
      <path d="M5 10v10h14V10" />
      <path d="M10 20v-5h4v5" />
    </svg>
  );
}

export function WifiIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M2.5 9a14 14 0 0 1 19 0" />
      <path d="M5.5 12.5a9.5 9.5 0 0 1 13 0" />
      <path d="M8.5 16a5 5 0 0 1 7 0" />
      <circle cx="12" cy="19" r="1" />
    </svg>
  );
}

export function SpeakerIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="6" y="3" width="12" height="18" rx="2" />
      <circle cx="12" cy="14" r="3" />
      <circle cx="12" cy="7" r="1" />
    </svg>
  );
}

export function CheckIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="m5 12 4 4 10-10" />
    </svg>
  );
}

// Points to the reading direction's "forward". Flipped in Arabic with rtl:-scale-x-100.
export function ArrowIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

export function MenuIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function LogoMark({ className }: IconProps) {
  // A shield with a stylised bird wing: the Kestrel mark.
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={className}>
      <path d="M16 2 4 7v8c0 7.5 5 12.5 12 15 7-2.5 12-7.5 12-15V7z" fill="currentColor" />
      <path d="M9 17c4-1 6-4 7-8 1 4 3 7 7 8-3 .5-5 2-7 5-2-3-4-4.5-7-5z" fill="var(--color-accent)" />
    </svg>
  );
}

export const serviceIcons = {
  cctv: CameraIcon,
  "smart-home": HomeIcon,
  networking: WifiIcon,
  sound: SpeakerIcon,
} as const;
