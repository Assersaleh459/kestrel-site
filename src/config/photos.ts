// Photo slots. Empty = the page shows no photo there (no placeholder block).
// To add a photo: put the WebP file (under 150 KB) in public/images, then fill the slot with its
// path and real pixel size. The alt text for each slot is in src/messages/*.json under "photoAlt".
// Slot names: "hero", a project id (e.g. "villa-new-cairo") or a service id (e.g. "cctv").
export type Photo = { src: string; width: number; height: number };

export const photos: Partial<Record<string, Photo>> = {
  hero: { src: "/images/hero.webp", width: 1600, height: 900 },
  "villa-new-cairo": { src: "/images/villa-gate.webp", width: 1200, height: 750 },
  cctv: { src: "/images/cctv.webp", width: 1200, height: 750 },
  "smart-home": { src: "/images/smart-home.webp", width: 1200, height: 750 },
  networking: { src: "/images/networking.webp", width: 1200, height: 750 },
  "apartment-zamalek": { src: "/images/apartment-zamalek.webp", width: 1200, height: 750 },
  "clinic-heliopolis": { src: "/images/clinic-heliopolis.webp", width: 1200, height: 750 },
  "cafe-maadi": { src: "/images/cafe-maadi.webp", width: 1200, height: 750 },
  sound: { src: "/images/sound-studio.webp", width: 1200, height: 750 },
  "shop-6-october": { src: "/images/shop-camera.webp", width: 1200, height: 750 },
  "office-sheikh-zayed": { src: "/images/office-patch.webp", width: 1200, height: 750 },
};
