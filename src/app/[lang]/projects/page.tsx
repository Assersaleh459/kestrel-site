import type { Metadata } from "next";
import { getDictionary, getLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/page-hero";
import { ProjectList } from "./project-list";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getDictionary();
  return pageMetadata(await getLocale(), "projects", t.meta.projectsTitle, t.meta.projectsDescription, t.meta.siteName);
}

export default async function ProjectsPage() {
  const t = await getDictionary();
  const p = t.projectsPage;

  return (
    <>
      <PageHero title={p.title} intro={p.intro} />
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <ProjectList
          projects={t.projects.items}
          services={t.services.items.map(({ id, title }) => ({ id, title }))}
          labels={{ filter: p.filterLabel, all: p.all }}
        />
      </div>
    </>
  );
}
