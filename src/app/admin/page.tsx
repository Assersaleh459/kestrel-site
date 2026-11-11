import { cookies } from "next/headers";
import { Suspense } from "react";
import { isValidSession, SESSION_COOKIE } from "@/lib/auth";
import { listLeads } from "@/lib/leads";
import { dictionaryFor } from "@/lib/i18n";
import { logout } from "./actions";
import { LoginForm } from "./login-form";

export default function AdminPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:py-10">
      <Suspense fallback={<p className="text-muted">Loading…</p>}>
        <AdminContent />
      </Suspense>
    </main>
  );
}

const serviceNames: Record<string, string> = {
  ...Object.fromEntries(dictionaryFor("en").services.items.map((s) => [s.id, s.title])),
  other: "Something else",
};

// The session check happens here on the server, on every request.
async function AdminContent() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!isValidSession(token)) return <LoginForm />;

  let leads;
  try {
    leads = await listLeads();
  } catch (err) {
    console.error("listing leads failed", err);
    return <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 font-medium text-red-800">Could not load leads. Check the server log.</p>;
  }

  const when = (iso: string) =>
    new Date(iso).toLocaleString("en-GB", { timeZone: "Africa/Cairo", dateStyle: "medium", timeStyle: "short" });
  const link = "font-medium underline underline-offset-4";

  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Contact requests</h1>
          <p className="text-sm text-muted">{leads.length} in total · newest first · Cairo time</p>
        </div>
        <form action={logout}>
          <button className="min-h-11 rounded-xl border border-muted bg-surface px-4 text-sm font-semibold hover:bg-soft">
            Log out
          </button>
        </form>
      </div>

      {leads.length === 0 ? (
        <p className="mt-8 rounded-2xl border border-dashed border-muted p-10 text-center text-muted">
          No requests yet. Send the form on the Contact page to see one here.
        </p>
      ) : (
        <ul className="mt-6 grid gap-3">
          {leads.map((l, i) => (
            <li key={`${l.createdAt}-${i}`} className="rounded-2xl border border-line bg-surface p-4 sm:p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <p className="text-lg font-semibold">{l.name}</p>
                <p className="text-sm text-muted">{when(l.createdAt)}</p>
              </div>
              <p className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
                <a className={link} href={`tel:${l.phone.replace(/[\s-]/g, "")}`} dir="ltr">{l.phone}</a>
                {l.email && <a className={`${link} break-all`} href={`mailto:${l.email}`}>{l.email}</a>}
              </p>
              <p className="mt-2 flex flex-wrap gap-2 text-sm">
                <span className="rounded-full bg-soft px-2.5 py-0.5 font-semibold">{serviceNames[l.service] ?? l.service}</span>
                <span className="rounded-full bg-soft px-2.5 py-0.5 font-semibold">{l.lang === "ar" ? "Arabic page" : "English page"}</span>
              </p>
              {/* Shown as plain text: React escapes it, so a message can never inject HTML. */}
              <p className="mt-3 whitespace-pre-line break-words" dir="auto">{l.message}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
