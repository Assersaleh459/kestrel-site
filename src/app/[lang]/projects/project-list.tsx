"use client";

import { useState } from "react";
import { serviceIcons } from "@/components/icons";

type Project = { id: string; service: string; title: string; place: string; summary: string };
type Props = {
  projects: Project[];
  services: { id: string; title: string }[];
  labels: { filter: string; all: string };
};

// Filter buttons + project cards. Without JavaScript all 6 projects still show.
export function ProjectList({ projects, services, labels }: Props) {
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
            className="min-h-11 rounded-full border border-dark px-4 font-semibold hover:bg-soft aria-pressed:bg-dark aria-pressed:text-white"
          >
            {o.title}
          </button>
        ))}
      </div>

      <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
        {shown.map((p) => {
          const Icon = serviceIcons[p.service as keyof typeof serviceIcons];
          return (
            <li key={p.id} className="overflow-hidden rounded-2xl border border-line bg-surface">
              <div aria-hidden className="flex aspect-[16/10] items-center justify-center bg-dark-soft">
                <Icon className="h-12 w-12 text-accent" />
              </div>
              <div className="p-6">
                <p className="text-sm font-semibold text-muted">
                  {serviceTitle[p.service]} · {p.place}
                </p>
                <h2 className="mt-2 text-xl font-bold">{p.title}</h2>
                <p className="mt-2 text-muted">{p.summary}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
