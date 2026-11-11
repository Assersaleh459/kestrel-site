import { notFound } from "next/navigation";

// Any unknown address under /en or /ar shows the 404 page in that language.
export default function Missing() {
  notFound();
}
