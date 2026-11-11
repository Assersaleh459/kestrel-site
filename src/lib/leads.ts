import { neon } from "@neondatabase/serverless";
import { promises as fs } from "fs";
import path from "path";
import type { ContactInput } from "./contact";

// Same pattern as car-offer-form.
export type Lead = ContactInput & { createdAt: string }; // ISO time

// Where leads go: Neon Postgres when DATABASE_URL is set, else a local JSON file.
// The JSON file is for `npm run dev` on your PC only: Vercel's disk is read-only.
function store() {
  if (process.env.DATABASE_URL) return "neon" as const;
  if (process.env.VERCEL) throw new Error("DATABASE_URL is not set on Vercel; leads cannot be saved.");
  return "file" as const;
}

export async function saveLead(input: ContactInput): Promise<void> {
  const lead: Lead = { ...input, createdAt: new Date().toISOString() };
  if (store() === "neon") {
    const sql = await db();
    await sql`
      INSERT INTO contact_leads (created_at, name, phone, email, service, message, lang)
      VALUES (${lead.createdAt}, ${lead.name}, ${lead.phone}, ${lead.email}, ${lead.service},
              ${lead.message}, ${lead.lang})`;
    return;
  }
  const leads = await readFile();
  leads.push(lead);
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(leads, null, 2));
}

// Newest first.
export async function listLeads(limit = 500): Promise<Lead[]> {
  if (store() === "neon") {
    const sql = await db();
    const rows = await sql`
      SELECT created_at, name, phone, email, service, message, lang
      FROM contact_leads ORDER BY created_at DESC LIMIT ${limit}`;
    return rows.map((r) => ({
      createdAt: new Date(r.created_at).toISOString(),
      name: r.name,
      phone: r.phone,
      email: r.email,
      service: r.service,
      message: r.message,
      lang: r.lang,
    }));
  }
  const leads = await readFile();
  return leads.sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, limit);
}

// --- Neon ---
let tableReady: Promise<void> | null = null;

async function db() {
  const sql = neon(process.env.DATABASE_URL!);
  // Creates the table on first use, once per server instance, so there is no manual setup step.
  tableReady ??= sql`
    CREATE TABLE IF NOT EXISTS contact_leads (
      id         bigserial PRIMARY KEY,
      created_at timestamptz NOT NULL DEFAULT now(),
      name       text NOT NULL,
      phone      text NOT NULL,
      email      text NOT NULL,
      service    text NOT NULL,
      message    text NOT NULL,
      lang       text NOT NULL
    )`.then(
    () => undefined,
    (err) => {
      tableReady = null; // try again next time
      throw err;
    },
  );
  await tableReady;
  return sql;
}

// --- Local JSON file (dev only) ---
const FILE = path.join(process.cwd(), "data", "leads.json");

async function readFile(): Promise<Lead[]> {
  try {
    return JSON.parse(await fs.readFile(FILE, "utf8")) as Lead[];
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw err;
  }
}
