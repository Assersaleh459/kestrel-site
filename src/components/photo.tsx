import Image from "next/image";
import { photos } from "@/config/photos";

// A photo that fills its box (the box has a fixed shape, so nothing jumps while it loads).
// Renders nothing when the slot has no photo yet.
export function Photo({
  slot,
  alt,
  sizes,
  priority = false,
  className = "",
}: {
  slot: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const photo = photos[slot];
  if (!photo) return null;
  return (
    <div className={`relative overflow-hidden bg-soft ${className}`}>
      <Image src={photo.src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
    </div>
  );
}
