import { NextResponse } from "next/server";
import { validateContact } from "@/lib/contact";
import { saveLead } from "@/lib/leads";
import { clientIp, hit } from "@/lib/rate-limit";

const REQUESTS_PER_WINDOW = 5;
const WINDOW_MS = 10 * 60_000;

// Errors are codes ("tooMany", "general", field codes); the form shows them in the page's language.
export async function POST(request: Request) {
  const retryAfter = hit(`contact:${clientIp(request.headers)}`, REQUESTS_PER_WINDOW, WINDOW_MS);
  if (retryAfter) {
    return NextResponse.json({ error: "tooMany" }, { status: 429, headers: { "Retry-After": String(retryAfter) } });
  }

  let body: unknown;
  try {
    if (Number(request.headers.get("content-length") ?? 0) > 10_000) throw new Error("too large");
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "general" }, { status: 400 });
  }

  // Honeypot: a hidden field people never fill in. Bots often do. Pretend success so they don't retry.
  if (body && typeof body === "object" && (body as Record<string, unknown>).company) {
    return NextResponse.json({ ok: true });
  }

  const check = validateContact(body);
  if (!check.ok) return NextResponse.json({ errors: check.errors }, { status: 400 });

  try {
    await saveLead(check.data);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("saving contact lead failed", err); // full detail stays in the server log
    return NextResponse.json({ error: "general" }, { status: 500 });
  }
}
