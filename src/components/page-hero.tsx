// The dark band at the top of every inner page, with the page's only <h1>.
export function PageHero({ title, intro }: { title: string; intro: string }) {
  return (
    <section className="bg-dark text-white">
      <div className="mx-auto max-w-6xl px-4 pb-14 pt-10 sm:px-6 md:pb-20 md:pt-14">
        <h1 className="text-4xl font-bold leading-tight sm:text-5xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-lg text-white/80">{intro}</p>
      </div>
    </section>
  );
}
