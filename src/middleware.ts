import { NextResponse, type NextRequest } from "next/server";
import getSession from "./functions/getSession";

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const url = request.nextUrl.clone();

  if (session) {
    if (request.nextUrl.pathname.includes("/sign")) {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  } else {
    if (!request.nextUrl.pathname.includes("/sign")) {
      url.pathname = "/signin";
      return NextResponse.redirect(url);
    }
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
