import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  getMaintenanceBypassSecret,
  isMaintenanceEnabled,
  MAINTENANCE_COOKIE,
} from "@/shared/maintenanceConfig";

const PUBLIC_FILE = /\.[^/]+$/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname.startsWith("/manifest") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const bypassSecret = getMaintenanceBypassSecret();
  const accessKey = request.nextUrl.searchParams.get("site_access");

  if (accessKey && bypassSecret && accessKey === bypassSecret) {
    const url = request.nextUrl.clone();
    url.searchParams.delete("site_access");
    const response = NextResponse.redirect(url);
    response.cookies.set(MAINTENANCE_COOKIE, "1", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
    return response;
  }

  if (!isMaintenanceEnabled()) {
    return NextResponse.next();
  }

  const hasBypass = request.cookies.get(MAINTENANCE_COOKIE)?.value === "1";

  if (hasBypass || pathname === "/maintenance") {
    return NextResponse.next();
  }

  const maintenanceUrl = request.nextUrl.clone();
  maintenanceUrl.pathname = "/maintenance";
  maintenanceUrl.search = "";
  return NextResponse.redirect(maintenanceUrl);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
