import { NextRequest, NextResponse } from "next/server";
import { checkSession } from "./lib/api/serverApi";
import { User } from "@/types/user";

interface SessionData {
  user: User;
  tokens: { accessToken: string; refreshToken: string };
}

export default async function proxy(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const { pathname } = request.nextUrl;

  const isPrivateRoute =
    pathname.startsWith("/notes") || pathname.startsWith("/profile");
  const isAuthRoute =
    pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up");

  let user = null;
  let newTokens = null;

  if (!accessToken && refreshToken && isPrivateRoute) {
    try {
      const response = await checkSession(refreshToken);
      if (response.status === 200) {
        const data = response.data as SessionData;
        user = data.user;
        newTokens = data.tokens;
      }
    } catch {
      console.error("Refresh failed");
    }
  }

  const isAuthenticated = !!accessToken || !!user;

  if (isPrivateRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const response = NextResponse.next();
  if (newTokens) {
    response.cookies.set("accessToken", newTokens.accessToken, {
      httpOnly: true,
      path: "/",
    });
    response.cookies.set("refreshToken", newTokens.refreshToken, {
      httpOnly: true,
      path: "/",
    });
  }
  return response;
}
