import { NextRequest, NextResponse } from "next/server";

export default async function proxy(request: NextRequest) {
  const session = request.cookies.get("accessToken")?.value;

  const { pathname } = request.nextUrl;

  const isPrivateRoute =
    pathname.startsWith("/notes") || pathname.startsWith("/profile");
  const isAuthRoute =
    pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up");

  if (isPrivateRoute && !session) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Додано базові шляхи /notes та /profile для точного спрацювання
  matcher: [
    "/notes",
    "/notes/:path*",
    "/profile",
    "/profile/:path*",
    "/sign-in",
    "/sign-up",
  ],
};
