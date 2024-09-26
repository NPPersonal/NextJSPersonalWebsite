import createMiddleware from "next-intl/middleware";
import { routing, locales } from "./i18n/routing";
import { NextRequest } from "next/server";

const handleI18nRouting = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // only handle for route /, locale/
  // where locale is defined in routing
  const shouldHandle =
    pathname === "/" ||
    new RegExp(`^/(${locales.join("|")})(/.*)?$`).test(
      request.nextUrl.pathname
    );
  if (!shouldHandle) return;

  return handleI18nRouting(request);
}
