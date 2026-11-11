"use client";

import { useRef, useState, type FormEvent } from "react";
import { LIMITS, validateContact, type ContactErrors, type ContactField } from "@/lib/contact";

type Texts = {
  name: string; phone: string; email: string; optional: string; service: string;
  servicePlaceholder: string; serviceOther: string; message: string; submit: string; sending: string;
  successTitle: string; successText: string; sendAnother: string;
  errors: Record<ContactField | "tooMany" | "general" | "summary", string>;
};
type Props = { lang: "en" | "ar"; t: Texts; services: { id: string; title: string }[] };

const input =
  "mt-2 block w-full rounded-xl border border-muted bg-surface px-4 py-3 text-base text-ink aria-invalid:border-red-700 aria-invalid:ring-1 aria-invalid:ring-red-700";

export function ContactForm({ lang, t, services }: Props) {
  const [errors, setErrors] = useState<ContactErrors>({});
  const [formError, setFormError] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const body = { ...data, lang };

    const check = validateContact(body);
    if (!check.ok) return showErrors(check.errors);

    setStatus("sending");
    setFormError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok) {
        setErrors({});
        setStatus("sent");
        return;
      }
      setStatus("idle");
      if (json.errors) return showErrors(json.errors);
      setFormError(json.error === "tooMany" ? t.errors.tooMany : t.errors.general);
    } catch {
      setStatus("idle");
      setFormError(t.errors.general);
    }
  }

  function showErrors(found: ContactErrors) {
    setErrors(found);
    setFormError(t.errors.summary);
    // Move focus to the first wrong field so keyboard and screen-reader users land on it.
    const first = Object.keys(found)[0];
    requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus());
  }

  if (status === "sent") {
    return (
      <div role="status" className="rounded-2xl border border-line bg-surface p-8 text-center">
        <h2 className="text-2xl font-bold">{t.successTitle}</h2>
        <p className="mt-2 text-lg text-muted">{t.successText}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 min-h-11 rounded-full border border-dark px-5 font-semibold hover:bg-soft"
        >
          {t.sendAnother}
        </button>
      </div>
    );
  }

  const field = (name: ContactField) => ({
    id: name,
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
    onChange: () => errors[name] && setErrors((prev) => ({ ...prev, [name]: undefined })),
  });
  const errorText = (name: ContactField) =>
    errors[name] && (
      <p id={`${name}-error`} className="mt-2 font-medium text-red-800">
        {t.errors[name]}
      </p>
    );

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-5 rounded-2xl border border-line bg-surface p-6 sm:p-8">
      {formError && (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 font-medium text-red-800">
          {formError}
        </p>
      )}

      <div>
        <label htmlFor="name" className="font-semibold">{t.name}</label>
        <input {...field("name")} type="text" autoComplete="name" maxLength={LIMITS.nameMax} className={input} />
        {errorText("name")}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="font-semibold">{t.phone}</label>
          {/* Phone numbers are typed left to right, also on the Arabic page. */}
          <input {...field("phone")} type="tel" dir="ltr" autoComplete="tel" inputMode="tel" maxLength={22} className={`${input} rtl:text-right`} />
          {errorText("phone")}
        </div>
        <div>
          <label htmlFor="email" className="font-semibold">
            {t.email} <span className="font-normal text-muted">{t.optional}</span>
          </label>
          <input {...field("email")} type="email" dir="ltr" autoComplete="email" maxLength={LIMITS.emailMax} className={`${input} rtl:text-right`} />
          {errorText("email")}
        </div>
      </div>

      <div>
        <label htmlFor="service" className="font-semibold">{t.service}</label>
        <select {...field("service")} defaultValue="" className={input}>
          <option value="" disabled>{t.servicePlaceholder}</option>
          {services.map((s) => (
            <option key={s.id} value={s.id}>{s.title}</option>
          ))}
          <option value="other">{t.serviceOther}</option>
        </select>
        {errorText("service")}
      </div>

      <div>
        <label htmlFor="message" className="font-semibold">{t.message}</label>
        <textarea {...field("message")} rows={5} maxLength={LIMITS.messageMax} className={input} />
        {errorText("message")}
      </div>

      {/* Honeypot: hidden from people and screen readers; bots that fill it are ignored. */}
      <div aria-hidden className="absolute -start-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-dark px-6 font-semibold text-white hover:bg-dark-soft disabled:opacity-70 sm:w-auto"
      >
        {status === "sending" ? t.sending : t.submit}
      </button>
    </form>
  );
}
