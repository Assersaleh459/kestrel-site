import { NextResponse, type NextRequest } from "next/server";

// Every page lives under /en or /ar. An address without a language (e.g. /services or /xyz)
// goes to the English version, which shows the page or the English 404 page.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (/^\/(en|ar)(\/|$)/.test(pathname)) return;

  const url = request.nextUrl.clone();
  url.pathname = `/en${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next.js internals, /api, /admin and files with an extension (icon.svg, robots.txt...).
  matcher: ["/((?!_next|api|admin|.*\\..*).*)"],
};
