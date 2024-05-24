import { NextResponse } from "next/server";
import { auth } from "./app/auth";
import {
  DEFAULT_LOGIN,
  adminRoutePrefix,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "./routes";

export default auth((req) => {
  const isLoogedIn = !!req.auth;

  const IsApiAuthPrefix = req.nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoutes = publicRoutes.includes(req.nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(req.nextUrl.pathname);
  if (IsApiAuthPrefix) {
    return null;
  }

  if (isAuthRoute) {
    if (isLoogedIn) {
      return NextResponse.rewrite(new URL(DEFAULT_LOGIN, req.nextUrl));
    }
    return null;
  }
  if (!isLoogedIn && !isPublicRoutes) {
    return NextResponse.rewrite(new URL("/login", req.nextUrl));
  }
  if (isLoogedIn) {
    if (
      req.auth?.user?.role !== "admin" &&
      req.nextUrl.pathname.startsWith(adminRoutePrefix)
    ) {
      return Response.rewrite(new URL("/", req.nextUrl));
    }
    return null;
  }
  return null;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
