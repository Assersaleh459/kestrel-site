import { getDictionary } from "@/lib/i18n";
import { chip } from "./ui";

// Where we work and how fast we reply. Used on Home and About (text lives under "area" in the messages).
export async function ServiceArea() {
  const t = await getDictionary();
  const a = t.area;

  return (
    <section className="bg-soft">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:py-20 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold sm:text-4xl">{a.title}</h2>
          <p className="mt-3 max-w-xl text-lg text-muted">{a.text}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {a.places.map((place) => (
              <li key={place} className="rounded-full border border-ink/30 bg-surface px-4 py-2 font-semibold">
                {place}
              </li>
            ))}
          </ul>
        </div>
        <div className="self-start border-s-4 border-ink ps-6">
          <h3 className="text-xl font-bold">{a.replyTitle}</h3>
          <p className="mt-2 text-lg">{a.reply}</p>
          <p className="mt-3">
            <span className={chip}>{a.replyNote}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
