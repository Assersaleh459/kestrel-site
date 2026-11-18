"use client";

import { useState } from "react";
import { Photo } from "@/components/photo";
import { photos } from "@/config/photos";
import { chip } from "@/components/ui";

type Project = { id: string; service: string; title: string; place: string; summary: string };
type Props = {
  projects: Project[];
  sample: string;
  photoAlt: Record<string, string>;
  services: { id: string; title: string }[];
  labels: { filter: string; all: string };
};

// Filter buttons + project cards. Without JavaScript all 6 projects still show.
export function ProjectList({ projects, services, labels, sample, photoAlt }: Props) {
  const [active, setActive] = useState<string>("all");
  const shown = active === "all" ? projects : projects.filter((p) => p.service === active);
  const serviceTitle = Object.fromEntries(services.map((s) => [s.id, s.title]));
  const options = [{ id: "all", title: labels.all }, ...services];

  return (
    <>
      <div role="group" aria-label={labels.filter} className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o.id}
            type="button"
            aria-pressed={active === o.id}
            onClick={() => setActive(o.id)}
            className="min-h-11 rounded-full border border-ink px-4 font-semibold hover:bg-soft aria-pressed:bg-ink aria-pressed:text-page"
          >
            {o.title}
          </button>
        ))}
      </div>

      <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
        {shown.map((p) => (
          <li key={p.id} className="overflow-hidden rounded-2xl border border-line bg-surface">
            {/* The photo shows only when this project has one (src/config/photos.ts). */}
            {photos[p.id] && (
              <Photo slot={p.id} alt={photoAlt[p.id]} sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw" className="aspect-[16/10]" />
            )}
            <div className="p-6">
              <p className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm font-semibold text-muted">
                <span className={chip}>{sample}</span>
                <span>
                  {serviceTitle[p.service]} · {p.place}
                </span>
              </p>
              <h2 className="mt-3 text-xl font-bold">{p.title}</h2>
              <p className="mt-2 text-muted">{p.summary}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
