// Photo slots. Empty = the page shows no photo there (no placeholder block).
// To add a photo: put the WebP file (under 150 KB) in public/images, then fill the slot with its
// path and real pixel size. The alt text for each slot is in src/messages/*.json under "photoAlt".
// Slot names: "hero", a project id (e.g. "villa-new-cairo") or a service id (e.g. "cctv").
export type Photo = { src: string; width: number; height: number };

export const photos: Partial<Record<string, Photo>> = {
  // hero: { src: "/images/hero.webp", width: 1600, height: 900 },
};
