import { test } from "node:test";
import assert from "node:assert/strict";
import { validateContact } from "../src/lib/contact.ts";

const good = {
  name: "Test Person",
  phone: "+20 100 000 0000",
  email: "",
  service: "cctv",
  message: "Please call me about cameras for my villa.",
  lang: "en",
};

test("accepts a valid request, email optional", () => {
  const r = validateContact(good);
  assert.equal(r.ok, true);
  assert.equal(r.data.email, "");
});

test("accepts an Arabic name and Arabic-Indic digits", () => {
  const r = validateContact({ ...good, name: "محمد علي", phone: "٠١٠٠٠٠٠٠٠٠٠", lang: "ar" });
  assert.equal(r.ok, true);
  assert.equal(r.data.phone, "01000000000");
  assert.equal(r.data.lang, "ar");
});

test("empty form gives an error for every required field, not for email", () => {
  const r = validateContact({});
  assert.equal(r.ok, false);
  assert.deepEqual(Object.keys(r.errors).sort(), ["message", "name", "phone", "service"]);
});

test("rejects a bad email only when one is given", () => {
  assert.equal(validateContact({ ...good, email: "not-an-email" }).errors.email, "email");
  assert.equal(validateContact({ ...good, email: "a@b.co" }).ok, true);
});

test("phone needs 8 to 15 digits and no letters", () => {
  assert.equal(validateContact({ ...good, phone: "1234567" }).ok, false);
  assert.equal(validateContact({ ...good, phone: "1234567890123456" }).ok, false);
  assert.equal(validateContact({ ...good, phone: "0100abc0000" }).ok, false);
  assert.equal(validateContact({ ...good, phone: "0100-000-0000" }).ok, true);
});

test("rejects unknown service, too-short or too-long message, odd name characters", () => {
  assert.equal(validateContact({ ...good, service: "pizza" }).errors.service, "service");
  assert.equal(validateContact({ ...good, message: "hi" }).errors.message, "message");
  assert.equal(validateContact({ ...good, message: "x".repeat(1001) }).errors.message, "message");
  assert.equal(validateContact({ ...good, name: "<script>" }).errors.name, "name");
});

test("unknown lang falls back to en; non-object body is handled", () => {
  assert.equal(validateContact({ ...good, lang: "fr" }).data.lang, "en");
  assert.equal(validateContact(null).ok, false);
  assert.equal(validateContact("text").ok, false);
});
