// Contact form checks, shared by the form (quick feedback) and /api/contact (the real gate).
// Errors are short codes; the page turns them into English or Arabic text from the message files.
// No imports, so the unit tests can run this file directly with node --test.

export const SERVICE_IDS = ["cctv", "smart-home", "networking", "sound", "other"] as const;
export type ServiceId = (typeof SERVICE_IDS)[number];

export type ContactInput = {
  name: string;
  phone: string; // as typed, trimmed (spaces and dashes allowed)
  email: string; // "" when not given
  service: ServiceId;
  message: string;
  lang: "en" | "ar";
};

export type ContactField = "name" | "phone" | "email" | "service" | "message";
export type ContactErrors = Partial<Record<ContactField, ContactField>>;

type Result = { ok: true; data: ContactInput } | { ok: false; errors: ContactErrors };

export const LIMITS = { nameMin: 2, nameMax: 80, messageMin: 10, messageMax: 1000, emailMax: 120 };

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
// Arabic-Indic digits (٠-٩) count as digits too: people type them on Arabic keyboards.
const toLatinDigits = (s: string) => s.replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660));
const NAME = /^[\p{L}\p{M} .'-]+$/u; // letters (any language), spaces and . ' -
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^\+?[\d\s-]{8,22}$/;

export function validateContact(body: unknown): Result {
  const b = (body && typeof body === "object" ? body : {}) as Record<string, unknown>;
  const errors: ContactErrors = {};

  const name = str(b.name).replace(/\s+/g, " ");
  if (name.length < LIMITS.nameMin || name.length > LIMITS.nameMax || !NAME.test(name)) errors.name = "name";

  const phone = toLatinDigits(str(b.phone));
  const digits = phone.replace(/\D/g, "").length;
  if (!PHONE.test(phone) || digits < 8 || digits > 15) errors.phone = "phone";

  const email = str(b.email).toLowerCase();
  if (email && (email.length > LIMITS.emailMax || !EMAIL.test(email))) errors.email = "email";

  const service = str(b.service);
  if (!(SERVICE_IDS as readonly string[]).includes(service)) errors.service = "service";

  const message = str(b.message);
  if (message.length < LIMITS.messageMin || message.length > LIMITS.messageMax) errors.message = "message";

  const lang = b.lang === "ar" ? "ar" : "en";

  if (Object.keys(errors).length) return { ok: false, errors };
  return { ok: true, data: { name, phone, email, service: service as ServiceId, message, lang } };
}
